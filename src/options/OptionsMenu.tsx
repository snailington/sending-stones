import {ChangeEvent, ReactNode} from "react";
import {Option, optionsList} from "./options.ts";
import "./OptionsMenu.css";
import {Config} from "../config.ts";

export default function OptionsMenu({active}: {active: boolean}) {
    function generateOptions(option: Option, index: number): ReactNode {
        const id = "option-" + index;
        const currentValue = Config.get(option.key);

        const inputAttr: any = {};
        switch(option.type) {
            case "checkbox":
                if(currentValue == "true") inputAttr["defaultChecked"] = true;
                inputAttr["onChange"] = (evt: ChangeEvent<HTMLInputElement>) =>
                    Config.set(option.key, evt.target.checked.toString());
                break;
                default:
                    inputAttr["defaultValue"] = currentValue;
                    inputAttr["onChange"] = (evt: ChangeEvent<HTMLInputElement>) =>
                    Config.set(option.key, evt.target.value);
        }

        let inputElement;
        switch(option.type) {
            case "select":
                inputElement = (
                    <select id={id} {...inputAttr}>
                        {option.options?.map((o) =>
                            <option key={`${id}-${o.value}`} value={o.value} selected={currentValue == o.value}>
                                {o.name}
                            </option>) }
                    </select>
                    );
                console.log("select", option, inputElement);
                break;
                default:
                    inputElement = <input id={id} type={option.type} {...inputAttr}></input>;
        }

        return (
            <>
                <div key={id} className="option-row">
                    <label htmlFor={id}>{option.name}</label>
                    {inputElement}
                </div>
                <div key={`${id}-description`} className="option-description">
                    {option.description}
                </div>
            </>
        );
    }
    
    return (
        <form className={"options " + (active ? "active" : "")}>
            {optionsList.map((o, i) => generateOptions(o, i))}
        </form>
    )
}