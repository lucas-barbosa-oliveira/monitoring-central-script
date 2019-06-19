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
const monitoring_central_1 = require("./src/application/monitoring.central");
const scripts_monitoring_central_1 = require("./utils/scripts.monitoring.central");
let bus = new communication_bus_1.CommunicationBus();
let bustwo = new communication_bus_1.CommunicationBus();
let central = new monitoring_central_1.MonitoringCentral();
let time = 3000;
function closeUdpTcp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield central.closeSdnManager(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_SDN_MANAGER_SCRIPT);
        // Clean sdn controller configuration
        yield central.cleanSdnConfiguration(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_SDN_CONFIGURATIONS_SCRIPT);
        // Closing Network Monitoring over Wireshark
        yield central.closeWireshark(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_WIRESHARK_SCRIPT);
        // Stoping to send messages from workstation DICOM
        yield bus.sendWorkstationDicomMenssage({ action: 'stop' });
        // Closing Supervisor OpenICE and stoping to send messages from Medical Devices of OpenICE
        yield central.closeOpenIce(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_OPENICE_SCRIPT);
        yield bus.sendMedicalDeviceMenssage({ action: 'stop' });
        // Closing UDP Server and stoping to send messages
        yield central.closeUdpServer(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_UDP_SERVER_SCRIPT);
        yield bus.sendUdpTrafficMenssage({ action: 'stop' });
    });
}
function closeUdpUdp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield central.closeSdnManager(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_SDN_MANAGER_SCRIPT);
        // Clean sdn controller configuration
        yield central.cleanSdnConfiguration(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_SDN_CONFIGURATIONS_SCRIPT);
        // Closing Network Monitoring over Wireshark
        yield central.closeWireshark(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_WIRESHARK_SCRIPT);
        // Closing Call VoIp
        yield central.closeVoipServer(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_VOIP_SERVER_SCRIPT);
        yield bus.sendCallVoIpMenssage({ action: 'stop' });
        // Closing Supervisor OpenICE and stoping to send messages from Medical Devices of OpenICE
        yield central.closeOpenIce(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_OPENICE_SCRIPT);
        yield bus.sendMedicalDeviceMenssage({ action: 'stop' });
        // Closing UDP Server and stoping to send messages
        yield central.closeUdpServer(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_UDP_SERVER_SCRIPT);
        yield bus.sendUdpTrafficMenssage({ action: 'stop' });
    });
}
function closeTcpTcp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield central.closeSdnManager(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_SDN_MANAGER_SCRIPT);
        // Clean sdn controller configuration
        yield central.cleanSdnConfiguration(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_SDN_CONFIGURATIONS_SCRIPT);
        // Closing Network Monitoring over Wireshark
        yield central.closeWireshark(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.STOP_WIRESHARK_SCRIPT);
        // Stoping to send messages from workstation DICOM
        yield bus.sendWorkstationDicomMenssage({ action: 'stop' });
        // Stoping to send messages from The second workstation DICOM
        yield bus.sendSecondWorkstationDicomMenssage({ action: 'stop' });
    });
}
function mainUdpTcp(bandwitdh, sndManager) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = scripts_monitoring_central_1.ScriptsMonitoringCentral.SCRIPT_PATH + bandwitdh;
        // Clear and Close all configuration and application
        yield closeUdpTcp();
        // Starting sdn controller configuration
        yield central.startSdnConfiguration(path + scripts_monitoring_central_1.ScriptsMonitoringCentral.MONITORING_CENTRAL + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_SDN_CONFIGURATIONS_SCRIPT);
        // Stating Network Monitoring over Wireshark
        yield central.startWireshark(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_WIRESHARK_SCRIPT);
        // Starting DCM4CHEE and send a message for workstation DICOM sending images
        yield central.startDicomServer(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_DICOM_SERVER_SCRIPT);
        yield bus.sendWorkstationDicomMenssage({ action: 'startDicom' });
        // Starting Supervisor OpenICE and send a message for Medical Devices of OpenICE to sending data
        yield central.startOpenIce(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_OPENICE_SCRIPT);
        yield bus.sendMedicalDeviceMenssage({ action: 'startMedical' });
        // Starting UDP Server and send a message for start sending data
        yield central.startUdpServer(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_UDP_SERVER_SCRIPT);
        yield bus.sendUdpTrafficMenssage({ action: 'startUDP' });
        if (sndManager) {
            yield central.startSdnManager(path + scripts_monitoring_central_1.ScriptsMonitoringCentral.MONITORING_CENTRAL + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_SDN_MANAGER_SCRIPT);
        }
    });
}
function mainUdpUdp(bandwitdh, sndManager) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = scripts_monitoring_central_1.ScriptsMonitoringCentral.SCRIPT_PATH + bandwitdh;
        // Clear and Close all configuration and application
        yield closeUdpUdp();
        // Starting sdn controller configuration
        yield central.startSdnConfiguration(path + scripts_monitoring_central_1.ScriptsMonitoringCentral.MONITORING_CENTRAL + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_SDN_CONFIGURATIONS_SCRIPT);
        // Stating Network Monitoring over Wireshark
        yield central.startWireshark(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_WIRESHARK_SCRIPT);
        // Starting Call VoIp
        yield central.startVoipServer(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_VOIP_SERVER_SCRIPT);
        yield bus.sendCallVoIpMenssage({ action: 'start' });
        // Starting Supervisor OpenICE and send a message for Medical Devices of OpenICE to sending data
        yield central.startOpenIce(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_OPENICE_SCRIPT);
        yield bus.sendMedicalDeviceMenssage({ action: 'start' });
        // Starting UDP Server and send a message for start sending data
        yield central.startUdpServer(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_UDP_SERVER_SCRIPT);
        yield bus.sendUdpTrafficMenssage({ action: 'start' });
        if (sndManager) {
            yield central.startSdnManager(path + scripts_monitoring_central_1.ScriptsMonitoringCentral.MONITORING_CENTRAL + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_SDN_MANAGER_SCRIPT);
        }
    });
}
function mainTcpTcp(bandwitdh, sndManager) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = scripts_monitoring_central_1.ScriptsMonitoringCentral.SCRIPT_PATH + bandwitdh;
        // Clear and Close all configuration and application
        yield closeTcpTcp();
        // Starting sdn controller configuration
        yield central.startSdnConfiguration(path + scripts_monitoring_central_1.ScriptsMonitoringCentral.MONITORING_CENTRAL + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_SDN_CONFIGURATIONS_SCRIPT);
        // Stating Network Monitoring over Wireshark
        yield central.startWireshark(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_WIRESHARK_SCRIPT);
        // Starting DCM4CHEE and send a message for workstation DICOM start sending images
        yield central.startDicomServer(scripts_monitoring_central_1.ScriptsMonitoringCentral.NORMAL_SCENARIO + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_DICOM_SERVER_SCRIPT);
        yield bus.sendWorkstationDicomMenssage({ action: 'start' });
        // Send a message for The second workstation DICOM to start sending images
        yield bus.sendSecondWorkstationDicomMenssage({ action: 'start' });
        if (sndManager) {
            yield central.startSdnManager(path + scripts_monitoring_central_1.ScriptsMonitoringCentral.MONITORING_CENTRAL + scripts_monitoring_central_1.ScriptsMonitoringCentral.START_SDN_MANAGER_SCRIPT);
        }
    });
}
bus.startConnection('192.168.25.236').then(() => __awaiter(this, void 0, void 0, function* () {
    setInterval(mainUdpTcp, time, '100');
}));
bustwo.startConnection('192.168.25.236', true).then(() => __awaiter(this, void 0, void 0, function* () {
    bustwo.receiveMenssage('exchangeMedicalDevice', 'queueMedicalDevice', (msg) => {
        console.log(msg);
    }).catch((e) => {
        console.log(e);
    });
}));
// bus.startConnection('127.0.0.1').then(async () => {
//     setInterval(mainUdpTcp, time);
// });
//
// bus.startConnection('127.0.0.1',true).then(async () => {
//     bus.receiveMenssage('exchangeMedicalDevice', 'queueMedicalDevice',
//         (msg) => {
//             console.log(msg)
//         }).catch((e) => {
//         console.log(e);
//     })
// });
// bus.startConnection().then(() => {
//     setInterval(mainUdpUdp, time);
// });
//
// bus.startConnection().then(() => {
//     setInterval(mainTcpTcp, time);
// });
