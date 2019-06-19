import {CommunicationBus} from "./src/infrastructure/communication.bus";
import {ScriptsVoipClient} from "./utils/scripts.voip.client";
import {VoipClient} from "./src/application/voip.client";

let bus: CommunicationBus = new CommunicationBus();
let voipClient: VoipClient = new VoipClient();

bus.startConnection('192.168.25.236',true).then(async () => {
    bus.receiveMenssage('exchangeCallVoIp', 'queueWCallVoIp',
        async (msg) => {
            if (msg.action === 'start') {
                await voipClient.startVoipClient(ScriptsVoipClient.NORMAL_SCENARIO + ScriptsVoipClient.START_VOIP_CLIENT_SCRIPT)
                console.log('start')
            } else if (msg.action === 'stop') {
                await voipClient.closeVoipClient(ScriptsVoipClient.NORMAL_SCENARIO + ScriptsVoipClient.STOP_VOIP_CLIENT_SCRIPT)
                console.log('stop')
            }
        }).catch((e) => {
        console.log(e);
    })
});
