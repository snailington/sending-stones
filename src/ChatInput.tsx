import "./ChatInput.css";
import {FormEvent, useRef} from "react";
import MagicCircle from "magic-circle-api";
import {CommandParser} from "./Commands/CommandParser.ts"

export function ChatInput() {
    const chatRef: any = useRef();

    function onSubmit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        const value = chatRef.current.value;
        if(value == "") return;
        MagicCircle.sendMessage(value);
        chatRef.current.value = "";
    }

    function onInput(evt: InputEvent<HTMLInputElement>) {
        const cmd = new CommandParser(evt.data);
    }

    return (
        <form className="chat-input" onSubmit={onSubmit}>
            <input ref={chatRef} type="text" onInput={onInput}></input>
            <button type="submit"></button>
        </form>
    );
}