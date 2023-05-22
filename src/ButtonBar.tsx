import "./ButtonBar.css"
import {Config} from "./config.ts";

function ButtonBar() {
    function expand() {
        const config = Config.getInstance();
        const size = config.get("windowSize") || "small";
        config.set("windowSize", size == "big" ? "small" : "big");
    }

    return (
        <div className="button-bar">
            <button onClick={expand}>🔎</button>
            <button></button>
            <button>⚙</button>
        </div>
    );
}

export default ButtonBar;