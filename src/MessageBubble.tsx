import "./MessageBubble.css"
import {DiceMessage, Message} from "magic-circle-api"
import ChatBubble from "./Bubbles/ChatBubble.tsx";
import DiceBubble from "./Bubbles/DiceBubble.tsx";

// Generic message container, 
function MessageBubble({message}: {message: Message}) {
    switch(message.type) {
        case "dice":
            return <DiceBubble message={message as DiceMessage} />;
        default:
            return <ChatBubble message={message} />;
    }
}

export default MessageBubble;