import {useEffect, useState} from "react";
import ChatBubble from "./ChatBubble.tsx";

import "./ChatBox.css";
import {onMessage} from "./client.ts";
import {MsgRPC} from "./RPC.ts";

function ChatBox() {
    const [messageLog, setMessageLog] = useState(new Array<MsgRPC>());
    
    useEffect(() => onMessage(messageLog[0]?.time, (msg) => {
        setMessageLog([msg, ...messageLog]);
    }), [messageLog]);
    
    return (
        <div className="chat-box">
            {messageLog.map((m) => <ChatBubble key={m.time} message={m} />)}
        </div>
    );
}

export default ChatBox;