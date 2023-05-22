import {CommandInfo} from "./CommandInfo.ts";

export class CommandParser {
    readonly commandInfo?: CommandInfo;
    
    readonly valid: boolean;
    
    argv?: string[];

    constructor(input: string) {
        this.valid = input[0] == '/';
        if(!this.valid) return;
        
        this.commandInfo = CommandParser.commands.find((c) => input.startsWith(c.command));
        this.valid = this.commandInfo !== undefined;
        if(this.commandInfo) {
            const lastChar = input[this.commandInfo.command.length];
            this.valid = input.length == this.commandInfo.command.length ||
                (lastChar == undefined || lastChar == ' ');
        }
        if(!this.valid) return;

        this.argv = input.split(/\s+/);
    }

    execute(): boolean {
        if(!this.valid || !this.commandInfo) return false;
        return this.commandInfo.handler(this);
    }
    
    static readonly commands: CommandInfo[] = [
        {
            command: "/roll",
            description: "Roll dice",
            handler: CommandParser.handleOnRoll
        }
    ];

    private static handleOnRoll(parser: CommandParser): boolean {
        if(!parser.argv) return false;
        const diceString = parser.argv.slice(1).join(' ');
        const match = diceString.match(/(?<n>\d+)\s*[dD]\s*(?<sz>\d+)\s*(?:(?<op>kh|kl)\s*(?<op_arg>\d+)?)?\s*(?:(?<mod_sign>[+-]])\s*(?<mod>\d+))?/);
        
        

        return true;
    }
}