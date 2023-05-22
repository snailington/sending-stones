import {CommandParser} from "./CommandParser.ts";

export function handleOnRoll(parser: CommandParser): boolean {
    if(!parser.argv) return false;
    const diceString = parser.argv.slice(1).join(' ');
    const match = diceString.match(/(?<n>\d+)\s*[dD]\s*(?<sz>\d+)\s*(?:(?<op>kh|kl)\s*(?<op_arg>\d+)?)?\s*(?:(?<mod_sign>[+-]])\s*(?<mod>\d+))?/);



    return true;
}