import {CSSProperties, ReactNode, useEffect, useState} from "react";
import {Message} from "magic-circle-api";
import OBR from "@owlbear-rodeo/sdk";

export default function BubbleWrapper({children, message}: {children: ReactNode, message: Message}) {
    const [background, setBackground] = useState(undefined as string|undefined);
    
    async function makeGradient() {
        let color: string;
        const theme = await OBR.theme.getTheme();
        const endColor = theme.mode == "DARK" ? "#00000020" : "#FFFFFF1A";

        if(!message.player) {
            setBackground(endColor);
            return;
        } else if(message.player == OBR.player.id) {
            color = await OBR.player.getColor();
        } else {
            const players = await OBR.party.getPlayers();
            const found = players.find((p) => message.player == p.id);
            if(!found) return;
            color = found.color;
        }
        
        setBackground(`linear-gradient(${color}F0 1px, ${color}2A 3px, ${endColor} 24px`);
    }

    useEffect(() => OBR.theme.onChange(() => {
        makeGradient();
    }), [])
    
    useEffect(() => {
        makeGradient();
    }, []);
    
    if(background == undefined) return <></>;

    const style: CSSProperties = {};
    style.background = background;
    
    return (
        <div className="chat-bubble" style={style}>
            {children}
        </div>
    );
}