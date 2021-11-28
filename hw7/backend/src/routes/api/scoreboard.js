import { Router } from "express";
import ScoreCard from "../../models/ScoreCard.js";

const router = Router();

router.post('/create-card', async (req, res) => {
    try {
        const newcard = new ScoreCard(req.body);
        const existing = await ScoreCard.findOne({ name: newcard.name, subject: newcard.subject });
        if (existing) {
            await ScoreCard.updateOne({ name: newcard.name, subject: newcard.subject, }, { score: newcard.score });
            res.send({ card: newcard, message: `Updating (${newcard.name}, ${newcard.subject}, ${newcard.score})\n` });
        }
        else {
            res.send({ card: newcard, message: `Adding (${newcard.name}, ${newcard.subject}, ${newcard.score})\n` });
            await newcard.save();
        }
    }
    catch (e) {
        res.send({ message: "SOMETHING WRONG!\n" });
    }
});


router.delete('/clear-db', async (req, res) => {
    try {
        await ScoreCard.deleteMany({});
        res.send({ message: 'Delete all' });
    }
    catch (e) {
        res.send({ message: "SOMETHING WRONG!\n" });
    }
});

router.post('/query-cards', async function (req, res) {
    try {
        const request = req.body;
        if (request.type === 'name') {
            const msg = await ScoreCard.find({ name: request.string });
            if (msg.length >= 1) {
                const messages = [];
                for (let i = 0; i < msg.length; i++) {
                    messages.push([`name: ${msg[i].name} subject: ${msg[i].subject} score: ${msg[i].score}`]);
                }
                res.send({ messages: messages });
            }
            else {
                res.send({ message: request.type + ' ' + request.string + ' not found!' });
            }
        }
        else {
            const msg = await ScoreCard.find({ subject: request.string });
            if (msg.length >= 1) {
                const messages = [];
                for (let i = 0; i < msg.length; i++) {
                    messages.push([`name: ${msg[i].name} subject: ${msg[i].subject} score: ${msg[i].score}`]);
                }
                res.send({ messages: messages });
            }
            else {
                res.send({ message: request.type + ' ' + request.string + ' not found!' });
            }
        }
    }
    catch (e) {
        res.send({ message: "SOMETHING WRONG!\n" });
    }
});




export default router;