import {Message} from "magic-circle-api";

export default function DiceBubble({message}: {message: Message}) {
    return (
        <div className="chat-bubble">
            <div className="msg-header">
                <div className="msg-author">{message.author}</div>
            </div>
            <div className="msg-body">
                <div className="msg-total">{message.metadata.total}</div>
                <div className="msg-text">{message.text}</div>
            </div>
        </div>
    );
}