import OBR, {Metadata} from "@owlbear-rodeo/sdk"
import {MsgRPC} from "./RPC";

const MagicCircle = {
    /*
     * Register a callback to receive messages via Magic Circle
     * @param startTime - Only messages posted after this timestamp will be passed to callback
     * @param callback - Called with each new message received
     * @return A cleanup function, suitable for use with React's useEffect()
     */
    onMessage(startTime: number | undefined, callback: (msg: MsgRPC[])=>void) {
        let lastTimestamp = startTime || 0;
        function update(metadata: Metadata) {
            const rawMessages = metadata["moe.snail.magic-circle/messages"];
            const roomBuffer: MsgRPC[] = rawMessages instanceof Array ? rawMessages : [];

            const start = roomBuffer.findIndex((m) => m.time && m.time > lastTimestamp);
            if(start == -1) return;

            lastTimestamp = roomBuffer[roomBuffer.length-1].time || Date.now();
            callback(roomBuffer.slice(start));
        }

        OBR.room.getMetadata().then(update);
        return OBR.room.onMetadataChange(update);
    }
}

export default MagicCircle;