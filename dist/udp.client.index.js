"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const communication_bus_1 = require("./src/infrastructure/communication.bus");
const scripts_udp_client_1 = require("./utils/scripts.udp.client");
const udp_client_1 = require("./src/application/udp.client");
let bus = new communication_bus_1.CommunicationBus();
let udpClient = new udp_client_1.UdpClient();
bus.startConnection('192.168.25.236', true).then(() => __awaiter(this, void 0, void 0, function* () {
    bus.receiveMenssage('exchangeUdpTraffic', 'queueUdpTraffic', (msg) => __awaiter(this, void 0, void 0, function* () {
        if (msg.action === 'start') {
            yield udpClient.startUdpClient(scripts_udp_client_1.ScriptsUdpClient.SCRIPT_PATH + msg.bandwidth + scripts_udp_client_1.ScriptsUdpClient.UDP_CLIENT + scripts_udp_client_1.ScriptsUdpClient.START_UDP_CLIENT_SCRIPT);
            console.log('start');
        }
        else if (msg.action === 'stop') {
            yield udpClient.closeUdpClient(scripts_udp_client_1.ScriptsUdpClient.NORMAL_SCENARIO + scripts_udp_client_1.ScriptsUdpClient.STOP_UDP_CLIENT_SCRIPT);
            console.log('stop');
        }
    })).catch((e) => {
        console.log(e);
    });
}));
