import http from 'http';
import express from 'express';
import dotenv from "dotenv-defaults";
import mongoose from 'mongoose';
import { WebSocketServer } from 'ws'
import { initData, sendData, sendStatus } from './wssConnect.js';
import Message from './models/message.js';

dotenv.config();

mongoose.connect(
    // 'mongodb+srv://enginekevin:kevin777@cluster0.kemnp.mongodb.net/Chat?retryWrites=true&w=majority',
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const db = mongoose.connection
const broadcastMessage = (data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
};


db.once('open', () => {

    console.log('MongoDB connected!')
    wss.on('connection', (ws) => {
        initData(ws);
        ws.onmessage = async (byteString) => {
            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            switch (task) {
                case 'input': {
                    const { name, body } = payload
                    const message
                        = new Message({ name, body })
                    try {
                        await message.save();
                    } catch (e) {
                        throw new Error
                            ("Message DB save error: " + e);
                    }
                    broadcastMessage(['output', [payload]], {
                        type: 'success',
                        msg: 'Message sent.'
                    })
                    break;
                }
                case 'clear': {
                    Message.deleteMany({}, () => broadcastMessage(['cleared'], {
                        type: 'info',
                        msg: 'Message cache cleared.'
                    }))
                    break;
                }
                default: break;
            }
        }
    })
    const PORT = process.env.port || 4000

    server.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    })
})
