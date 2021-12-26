import { makeName } from './utility'

const Subscription = {
    message: {
        async subscribe(parent, { from, to }, { db, pubsub }, info) {
            const chatBoxname = makeName(from, to);
            const chatBox = await db.ChatBoxModel.findOne({ name: chatBoxname });

            if (!chatBox) {
                throw new Error('chatBox not found');
            }

            return pubsub.asyncIterator(`chatBox ${chatBox.name}`);
        }
    }
};

export { Subscription as default };
