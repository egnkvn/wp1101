import { Input, Modal } from "antd";
import { useState } from "react";
const ChatModal = ({ visible, onCreate, onCancel }) => {
    const [username, setUsername] = useState("");
    return (
        <Modal
            visible={visible}
            onOk={() => { onCreate(username) }}
            onCancel={onCancel}
        >
            <Input value={username} onChange={(e) => setUsername(e.target.value)}
                placeholder="Type Name." ></Input>
        </Modal>
    )
}

export default ChatModal;