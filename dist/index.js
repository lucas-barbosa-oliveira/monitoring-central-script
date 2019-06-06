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
const communication_bus_1 = require("./src/communication.bus");
const monitoring_central_1 = require("./src/monitoring.central");
let bus = new communication_bus_1.CommunicationBus();
let bustwo = new communication_bus_1.CommunicationBus();
let central = new monitoring_central_1.MonitoringCentral();
let time = 3000;
function closeUdpTcp() {
    return __awaiter(this, void 0, void 0, function* () {
        // Clean sdn controller configuration
        yield central.cleanSdnConfiguration();
        // Closing Network Monitoring over Wireshark
        yield central.closeWireshark();
        // Stoping to send messages from workstation DICOM
        yield bus.sendWorkstationDicomMenssage({ action: 'stop' });
        // Closing Supervisor OpenICE and stoping to send messages from Medical Devices of OpenICE
        yield central.closeOpenIce();
        yield bus.sendMedicalDeviceMenssage({ action: 'stop' });
        // Closing UDP Server and stoping to send messages
        yield central.closeUdpServer();
        yield bus.sendUdpTrafficMenssage({ action: 'stop' });
    });
}
function closeUdpUdp() {
    return __awaiter(this, void 0, void 0, function* () {
        // Clean sdn controller configuration
        yield central.cleanSdnConfiguration();
        // Closing Network Monitoring over Wireshark
        yield central.closeWireshark();
        // Closing Call VoIp
        yield central.closeVoipServer();
        yield bus.sendCallVoIpMenssage({ action: 'stop' });
        // Closing Supervisor OpenICE and stoping to send messages from Medical Devices of OpenICE
        yield central.closeOpenIce();
        yield bus.sendMedicalDeviceMenssage({ action: 'stop' });
        // Closing UDP Server and stoping to send messages
        yield central.closeUdpServer();
        yield bus.sendUdpTrafficMenssage({ action: 'stop' });
    });
}
function closeTcpTcp() {
    return __awaiter(this, void 0, void 0, function* () {
        // Clean sdn controller configuration
        yield central.cleanSdnConfiguration();
        // Closing Network Monitoring over Wireshark
        yield central.closeWireshark();
        // Stoping to send messages from workstation DICOM
        yield bus.sendWorkstationDicomMenssage({ action: 'stop' });
        // Stoping to send messages from The second workstation DICOM
        yield bus.sendSecondWorkstationDicomMenssage({ action: 'stop' });
    });
}
function mainUdpTcp() {
    return __awaiter(this, void 0, void 0, function* () {
        // Clear and Close all configuration and application
        yield closeUdpTcp();
        // Starting sdn controller configuration
        yield central.startSdnConfiguration();
        // Stating Network Monitoring over Wireshark
        yield central.startWireshark();
        // Starting DCM4CHEE and send a message for workstation DICOM sending images
        yield central.startDicomServer();
        yield bus.sendWorkstationDicomMenssage({ action: 'startDicom' });
        // Starting Supervisor OpenICE and send a message for Medical Devices of OpenICE to sending data
        yield central.startOpenIce();
        yield bus.sendMedicalDeviceMenssage({ action: 'startMedical' });
        // Starting UDP Server and send a message for start sending data
        yield central.startUdpServer();
        yield bus.sendUdpTrafficMenssage({ action: 'startUDP' });
    });
}
function mainUdpUdp() {
    return __awaiter(this, void 0, void 0, function* () {
        // Clear and Close all configuration and application
        yield closeUdpUdp();
        // Starting sdn controller configuration
        yield central.startSdnConfiguration();
        // Stating Network Monitoring over Wireshark
        yield central.startWireshark();
        // Starting Call VoIp
        yield central.startVoipServer();
        yield bus.sendCallVoIpMenssage({ action: 'start' });
        // Starting Supervisor OpenICE and send a message for Medical Devices of OpenICE to sending data
        yield central.startOpenIce();
        yield bus.sendMedicalDeviceMenssage({ action: 'start' });
        // Starting UDP Server and send a message for start sending data
        yield central.startUdpServer();
        yield bus.sendUdpTrafficMenssage({ action: 'start' });
    });
}
function mainTcpTcp() {
    return __awaiter(this, void 0, void 0, function* () {
        // Clear and Close all configuration and application
        yield closeTcpTcp();
        // Starting sdn controller configuration
        yield central.startSdnConfiguration();
        // Stating Network Monitoring over Wireshark
        yield central.startWireshark();
        // Starting DCM4CHEE and send a message for workstation DICOM start sending images
        yield central.startDicomServer();
        yield bus.sendWorkstationDicomMenssage({ action: 'start' });
        // Send a message for The second workstation DICOM to start sending images
        yield central.startSecondDicomServer();
        yield bus.sendSecondWorkstationDicomMenssage({ action: 'start' });
    });
}
bus.startConnection().then(() => __awaiter(this, void 0, void 0, function* () {
    setInterval(mainUdpTcp, time);
}));
bustwo.startConnection(true).then(() => __awaiter(this, void 0, void 0, function* () {
    yield bus.receiveMenssage('exchangeMedicalDevice', 'queueMedicalDevice', (msg) => {
        console.log(msg);
    });
}));
bus.startConnection().then(() => {
    setInterval(mainUdpUdp, time);
});
bus.startConnection().then(() => {
    setInterval(mainTcpTcp, time);
});
