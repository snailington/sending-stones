import {Message} from "magic-circle-api";

export default function ChatBubble({message}: {message: Message}) {
    return (
        <div className="chat-bubble">
            <div className="msg-header">
                <div className="msg-author">{message.author}</div>
            </div>
            <div className="msg-body">
                <div className="msg-text">{message.text}</div>
            </div>
        </div>
    );
}