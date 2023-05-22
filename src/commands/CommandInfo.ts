import {CommandParser} from "./CommandParser.ts";

export interface CommandInfo {
    command: string;
    description: string;
    
    handler: (this: CommandParser, argv: string[]) => void;
}