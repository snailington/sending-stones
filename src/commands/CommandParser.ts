import {CommandInfo} from "./CommandInfo.ts";

export class CommandParser {
    readonly commandInfo?: CommandInfo;
    
    readonly valid: boolean;
    
    constructor(input: string) {
        this.valid = input[0] == '/';
        if(!this.valid) return;
        
        this.commandInfo = CommandParser.commands.find((c) => input.startsWith(c.command));
        this.valid = this.commandInfo !== undefined;
        if(!this.valid) return;
    }
    
    static readonly commands: CommandInfo[] = [
        {
            command: "/roll",
            description: "Roll dice",
            handler: CommandParser.handleOnRoll
        }
    ];
    
    private static handleOnRoll(this: CommandParser, argv: string[]): void {
        
    }
}