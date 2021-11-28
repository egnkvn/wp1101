import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
dotenv.config();

mongoose.connect(
    // 'mongodb+srv://enginekevin:kevin777@cluster0.kemnp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {
    console.log('Mongoose connect');
});

// const mongo = {
//     connect: connectmongo,
// }

// export default mongo;
