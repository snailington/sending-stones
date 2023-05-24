import "./ButtonBar.css"
import {Config} from "./config.ts";

function ButtonBar({toggleView}: {toggleView: (view: string) => void}) {
    function expand() {
        const size = Config.get("windowSize") || "small";
        Config.set("windowSize", size == "big" ? "small" : "big");
    }

    return (
        <div className="button-bar">
            <button onClick={expand}>resize</button>
            <button onClick={() => toggleView("macros")}>macros</button>
            <button onClick={() => toggleView("options")}>options</button>
        </div>
    );
}

export default ButtonBar;