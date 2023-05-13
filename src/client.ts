import OBR from "@owlbear-rodeo/sdk"
import {MsgRPC} from "./RPC";

/*
 * Register a callback to receive messages via Magic Circle
 * @param startTime - Only messages posted after this timestamp will be passed to callback
 * @param callback - Called with each new message received
 * @return A cleanup function, suitable for use with React's useEffect()
 */
export function onMessage(startTime: number | undefined, callback: (msg: MsgRPC)=>void) {
    let lastTimestamp = startTime || 0;
    function update(metadata) {
        let roomBuffer = metadata["moe.snail.magic-circle/messages"];
        if(!(roomBuffer instanceof Array)) roomBuffer = [];
        
        if(roomBuffer.length == 0 || roomBuffer[roomBuffer.length-1].time <= lastTimestamp) return;
        for(const msg of roomBuffer) {
            if(msg.time <= lastTimestamp) continue;
            callback(msg);
            lastTimestamp = msg.time;
        }
    }
    
    OBR.room.getMetadata().then(update);
    return OBR.room.onMetadataChange(update);
}