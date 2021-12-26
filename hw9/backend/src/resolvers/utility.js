const makeName = (name1, name2) => {
    return [name1, name2].sort().join("_");
};
// make sure calling checkUser beforehand
const newUser = (db, name) => {
    return new db.UserModel({ name }).save();
};
const newChatBox = (db, chatBoxName) => {
    return new db.ChatBoxModel({ name: chatBoxName }).save();
};
const newMessage = (db, sender, body) => {
    return new db.MessageModel({ sender, body }).save();
}
// return the found chatBox (can be null)
const checkChatBox = (db, chatBoxName, errFunc) => {
    if (!chatBoxName) throw new Error("Missing chatBox name for " + errFunc);
    return db.ChatBoxModel.findOne({ name: chatBoxName });
};

const checkMessage = async (db, from, to, message, errFunc) => {
    const chatBoxName = makeName(from, to);
    return {
        chatBox: await checkChatBox(db, chatBoxName, errFunc),
        sender: await checkUser(db, from, errFunc),
        to: await checkUser(db, to, errFunc),
    };
};
// return the found user (can be null)
const checkUser = (db, name, errFunc) => {
    if (!name) throw new Error("Missing user name for " + errFunc);
    return db.UserModel.findOne({ name });
};

export { makeName, newUser, newChatBox, newMessage, checkUser, checkMessage, checkChatBox }





