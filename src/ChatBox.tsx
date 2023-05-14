import {useEffect, useState} from "react";
import ChatBubble from "./ChatBubble.tsx";

import "./ChatBox.css";

import MagicCircle, {Message} from "magic-circle-api"

function ChatBox() {
    const [messageLog, setMessageLog] = useState(new Array<Message>());
    
    useEffect(() => MagicCircle.onMessage(messageLog[0]?.time, (msgs) => {
        setMessageLog([...(msgs.reverse()), ...messageLog]);
    }), [messageLog]);
    
    return (
        <div className="chat-box">
            {messageLog.map((m) => <ChatBubble key={m.time} message={m} />)}
        </div>
    );
}

export default ChatBox;