import {CommandInfo} from "./CommandInfo.ts";
import {handleOnRoll} from "./roll.ts";

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
            handler: handleOnRoll
        }
    ];
}