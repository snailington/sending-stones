import {Message} from "magic-circle-api";
import BubbleWrapper from "./BubbleWrapper.tsx";
import "./ChatBubble.css";

export default function ChatBubble({message}: {message: Message}) {
    return (
        <BubbleWrapper message={message}>
            <div className="msg-header">
                <div className="msg-author">{message.author}</div>
            </div>
            <div className="msg-body">
                <div className="msg-text">{message.text}</div>
            </div>
        </BubbleWrapper>
    );
}