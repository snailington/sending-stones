import "./ChatInput.css";
import {FormEvent, useRef} from "react";
import MagicCircle from "magic-circle-api";

export function ChatInput() {
    const chatRef: any = useRef();

    function submit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        const value = chatRef.current.value;
        if(value == "") return;
        MagicCircle.sendMessage(value);
        chatRef.current.value = "";
    }

    return (
        <form className="chat-input" onSubmit={submit}>
            <input ref={chatRef} type="text"></input>
            <button type="submit"></button>
        </form>
    );
}