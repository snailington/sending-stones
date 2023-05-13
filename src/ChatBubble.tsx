import "./ChatBubble.css"
import {MsgRPC} from "magic-circle-api";

function ChatBubble({message}: {message: MsgRPC}) {
    return (
        <div className="chat-bubble">
            <div className="author">{message.author}</div>
            <div className="body">{message.text}</div>
            <div className="total">{message.metadata?.total}</div>
        </div>
    )
}

export default ChatBubble;