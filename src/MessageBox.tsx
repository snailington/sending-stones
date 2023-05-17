import {useEffect, useState} from "react";
import MessageBubble from "./MessageBubble.tsx";

import "./MessageBox.css";

import MagicCircle, {Message} from "magic-circle-api"

function MessageBox() {
    const [messageLog, setMessageLog] = useState(new Array<Message>());
    
    useEffect(() => MagicCircle.onMessage(messageLog[0], (msgs) => {
        setMessageLog([...(msgs.reverse()), ...messageLog]);
    }), [messageLog]);
    
    return (
        <div className="chat-box">
            {messageLog.map((m) => <MessageBubble key={m.id} message={m} />)}
        </div>
    );
}

export default MessageBox;