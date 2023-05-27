import {useEffect, useState} from "react";
import MessageBubble from "./MessageBubble.tsx";
import MagicCircle, {Message} from "magic-circle-api"
import OBR from "@owlbear-rodeo/sdk";
import "./MessageBox.css";

function MessageBox() {
    const [messageLog, setMessageLog] = useState(new Array<Message>());
    const [unread, setUnread] = useState(-1);

    useEffect(() => MagicCircle.onMessage(messageLog[0], async (msgs) => {
        setMessageLog([...(msgs.reverse()), ...messageLog]);
        if(!await OBR.action.isOpen()) {
            const nowUnread = unread + 1;
            if(nowUnread > 0) {
                OBR.action.setBadgeText(nowUnread.toString());
            }
            setUnread(nowUnread);
        }
    }), [unread, messageLog]);

    useEffect(() => OBR.action.onOpenChange((isOpen) => {
        setUnread(0);
        if(isOpen) OBR.action.setBadgeText(undefined);
    }), []);

    return (
        <div className="chat-box">
            {messageLog.map((m) => <MessageBubble key={m.id} message={m} />)}
        </div>
    );
}

export default MessageBox;