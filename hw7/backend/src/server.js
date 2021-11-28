import express from 'express';
import cors from 'cors';
import './mongo.js';
import routes from './routes/index.js';
import dotenv from "dotenv-defaults";


dotenv.config();

const app = express();

// init middleware
app.use(cors());
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json());
// define routes
app.use('/', routes);

// mongo.connect();

// define server
const port = process.env.PORT || 5000
app.listen(port || 5000, () =>
    console.log(`Example app listening on port ${port}`),
);