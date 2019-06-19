import {CommunicationBus} from "./src/infrastructure/communication.bus";
import {ScriptsUdpClient} from "./utils/scripts.udp.client";
import {UdpClient} from "./src/application/udp.client";

let bus: CommunicationBus = new CommunicationBus();
let udpClient: UdpClient = new UdpClient();

bus.startConnection('192.168.25.236',true).then(async () => {
    bus.receiveMenssage('exchangeUdpTraffic', 'queueUdpTraffic',
        async (msg) => {
            if (msg.action === 'start') {
                await udpClient.startUdpClient(ScriptsUdpClient.SCRIPT_PATH + msg.bandwidth + ScriptsUdpClient.UDP_CLIENT + ScriptsUdpClient.START_UDP_CLIENT_SCRIPT)
                console.log('start')
            } else if (msg.action === 'stop') {
                await udpClient.closeUdpClient(ScriptsUdpClient.NORMAL_SCENARIO + ScriptsUdpClient.STOP_UDP_CLIENT_SCRIPT)
                console.log('stop')
            }
        }).catch((e) => {
        console.log(e);
    })
});
