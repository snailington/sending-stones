import MagicCircle, {DiceMessage} from "magic-circle-api";
import "./DiceBubble.css";

export default function DiceBubble({message}: {message: DiceMessage}) {
    return (
        <div className="chat-bubble">
            <div className="msg-total">{message.metadata.total}</div>
            <div className="msg-header">
                <div className="msg-author">{message.author}</div>
            </div>
            <div className="msg-body">

                <div className="msg-text">{message.text}</div>
            </div>
            <div className="msg-footer">
                <div className="msg-tags">{message.metadata.tags?.join(' ')}</div>
                <div className="msg-dicestring">{MagicCircle.toDiceString(message.metadata)}</div>
                <div className="msg-results">{message.metadata.results ? ` = [${message.metadata.results.join(', ')}]`: ""}</div>
            </div>
        </div>
    );
}