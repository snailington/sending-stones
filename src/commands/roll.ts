import {CommandParser} from "./CommandParser.ts";
import MagicCircle, {MsgRPC, RollInfo} from "magic-circle-api";

export function handleOnRoll(parser: CommandParser): boolean {
    if(!parser.argv) return false;
    const diceString = parser.argv.slice(1).join(' ');
    const match = diceString.match(/(?<n>\d+)\s?[dD]\s?(?<sz>\d+)\s?(?:(?<op>kh|kl)\s?(?<op_arg>\d+)?)?\s?(?:(?<mod_sign>[+-])\s?(?<mod>\d+))?\s?(?<msg>.*)?/);
    if(!match || !match.groups) return false;

    const nDice = parseInt(match.groups["n"]);
    const szDice = parseInt(match.groups["sz"])

    const dice = new Array<number>()
    const results = new Array<number>();

    for(let i = 0; i < nDice; i++) {
        const roll = Math.floor(Math.random() * szDice + 1);
        dice.push(szDice);
        results.push(roll);
    }
    results.sort((a, b) => a - b);

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

    let total = work.reduce((acc, r) => acc + r);
    if(match.groups["mod_sign"]) {
        const mod = parseInt(match.groups["mod"]);
        total += match.groups["mod_sign"] ? mod : -mod;
    }

    const suffix = (match.groups["op"] || "") + (match.groups["op_arg"] || "") +
        (match.groups["mod_sign"] || "") + (match.groups["mod"] || "");

    MagicCircle.sendMessage(<MsgRPC>{
        cmd: "msg",
        type: "dice",
        text: "rolled" + (match.groups["msg"] ? " " + match.groups["msg"] : ""),
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