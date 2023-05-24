import {CommandParser} from "./CommandParser.ts";
import MagicCircle, {MsgRPC, RollInfo} from "magic-circle-api";
import {Config} from "../config.ts";

export function handleOnRoll(parser: CommandParser): boolean {
    if(!parser.argv) return false;
    const diceString = parser.argv.slice(1).join(' ');
    const match = diceString.match(/(?<n>\d+)\s?[dD]\s?(?<sz>\d+)\s?(?:(?<op>kh|kl)\s?(?<op_arg>\d+)?)?\s?(?:(?<mod_sign>[+-])\s?(?<mod>\d+))?\s?(?<msg>.*)?/);
    if(!match || !match.groups) return false;

    const nDice = parseInt(match.groups["n"]);
    const szDice = parseInt(match.groups["sz"])

    // build dice manifest
    const dice = Array(nDice).fill(szDice);
    const text = "rolled" + (match.groups["msg"] ? " " + match.groups["msg"] : "");
    const suffix = (match.groups["op"] || "") + (match.groups["op_arg"] || "") +
        (match.groups["mod_sign"] || "") + (match.groups["mod"] || "");

    // send an unresolved roll if rolling is suppressed
    if(Config.get("suppressRolls") == "true") {
        MagicCircle.sendMessage(<MsgRPC>{
            cmd: "msg",
            type: "dice",
            text: text,
            metadata: <RollInfo>{
                kind: "custom",
                dice: dice,
                suffix: suffix
            }
        });
        return true;
    }

    // roll dice
    const results = dice.map((d) => Math.floor(Math.random() * d + 1));
    results.sort((a, b) => a - b);

    // perform dice operations
    let work = results;
    const opArg = parseInt(match.groups["op_arg"]);
    switch(match.groups["op"]) {
        case "kh":
            work = results.slice(-(opArg || 1));
            break;
        case "kl":
            work = results.slice(0, opArg || 1);
            break;
    }

    // apply modifier
    let total = work.reduce((acc, r) => acc + r);
    if(match.groups["mod_sign"]) {
        const mod = parseInt(match.groups["mod"]);
        total += match.groups["mod_sign"] ? mod : -mod;
    }

    MagicCircle.sendMessage(<MsgRPC>{
        cmd: "msg",
        type: "dice",
        text: text,
        metadata: <RollInfo>{
            kind: "custom",
            dice: dice,
            results: results,
            total: total,
            suffix: suffix
        }
    });

    return true;
}