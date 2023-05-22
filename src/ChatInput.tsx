import "./ChatInput.css";
import {FormEvent, useRef, useState} from "react";
import MagicCircle from "magic-circle-api";
import {CommandParser} from "./commands/CommandParser.ts"

export function ChatInput() {
    const [command, setCommand] = useState<CommandParser>();

    const chatRef: any = useRef();

    function onSubmit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        if(chatRef.current.value == "") return;
        if(chatRef.current.value[0] == '/') {
            console.log(command, chatRef.current.value);
            if(command?.execute()) {
                chatRef.current.value = "";
                setCommand(undefined);
            }
        } else {
            MagicCircle.sendMessage(chatRef.current.value).then(() =>
                chatRef.current.value = "");
        }
    }

    function onInput(evt: FormEvent<HTMLInputElement>) {
        const cmd = new CommandParser((evt.target as HTMLInputElement).value);
        if(!cmd.valid) return;
        setCommand(cmd);
    }

    return (
        <form className="chat-input" onSubmit={onSubmit}>
            <input ref={chatRef} type="text" onInput={onInput}></input>
            <button type="submit"></button>
        </form>
    );
}