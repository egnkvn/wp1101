import { checkChatBox, makeName } from "./utility";

const Query = {
  chatBox(parent, { name1, name2 }, { db }, info) {
    const chatboxName = makeName(name1, name2);
    const chatbox = checkChatBox(db, chatboxName);
    return chatbox;
  }
};

export { Query as default };
