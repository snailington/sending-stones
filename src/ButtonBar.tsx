import "./ButtonBar.css"
import {Config} from "./config.ts";

function ButtonBar() {
    function expand() {
        const size = Config.get("windowSize") || "small";
        Config.set("windowSize", size == "big" ? "small" : "big");
    }

    return (
        <div className="button-bar">
            <button onClick={expand}>resize</button>
            <button>macros</button>
            <button>options</button>
        </div>
    );
}

export default ButtonBar;