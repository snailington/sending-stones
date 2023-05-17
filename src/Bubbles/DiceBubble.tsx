import {Message, RollInfo} from "magic-circle-api";

export default function DiceBubble({message}: {message: Message}) {
    const rollInfo = message.metadata as RollInfo;

    let diceString = "";
    for(const diceType of new Set(rollInfo.dice)) {
        const count = rollInfo.dice.reduce((acc: number, d) => d == diceType ? acc + 1 : 0, 0);
        diceString += `${count}d${diceType} `;
    }
    diceString = diceString.trimEnd() + (rollInfo.modifier == 0 ? "" :
        (rollInfo.modifier > 0 ? `+` : "") + rollInfo.modifier);

    return (
        <div className="chat-bubble">
            <div className="msg-header">
                <div className="msg-author">{message.author}</div>
            </div>
            <div className="msg-body">
                <div className="msg-total">{message.metadata.total}</div>
                <div className="msg-text">{message.text}</div>
            </div>
            <div className="msg-footer">
                {diceString}
                {rollInfo.results ? ` = [${rollInfo.results.join(', ')}]`: ""}
            </div>
        </div>
    );
}