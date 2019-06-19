import {CommunicationBus} from "./src/infrastructure/communication.bus";
import  {MonitoringCentral} from "./src/application/monitoring.central";
import {ScriptsMonitoringCentral} from "./utils/scripts.monitoring.central";

let bus: CommunicationBus = new CommunicationBus();
let central: MonitoringCentral= new MonitoringCentral();

let time: number = 3000;

async function closeUdpTcp(): Promise<void> {

    await central.closeSdnManager(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_SDN_MANAGER_SCRIPT);

    // Clean sdn controller configuration
    await central.cleanSdnConfiguration(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_SDN_CONFIGURATIONS_SCRIPT);

    // Closing Network Monitoring over Wireshark
    await central.closeWireshark(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_WIRESHARK_SCRIPT);

    // Stoping to send messages from workstation DICOM
    await bus.sendWorkstationDicomMenssage({action:'stop'});

    // Closing Supervisor OpenICE and stoping to send messages from Medical Devices of OpenICE
    await central.closeOpenIce(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_OPENICE_SCRIPT);
    await bus.sendMedicalDeviceMenssage({action:'stop'});

    // Closing UDP Server and stoping to send messages
    await central.closeUdpServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_UDP_SERVER_SCRIPT);
    await bus.sendUdpTrafficMenssage({action:'stop'});

}

async function closeUdpUdp(): Promise<void> {

    await central.closeSdnManager(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_SDN_MANAGER_SCRIPT);

    // Clean sdn controller configuration
    await central.cleanSdnConfiguration(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_SDN_CONFIGURATIONS_SCRIPT);

    // Closing Network Monitoring over Wireshark
    await central.closeWireshark(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_WIRESHARK_SCRIPT);

    // Closing Call VoIp
    await central.closeVoipServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_VOIP_SERVER_SCRIPT);
    await bus.sendCallVoIpMenssage({action:'stop'});

    // Closing Supervisor OpenICE and stoping to send messages from Medical Devices of OpenICE
    await central.closeOpenIce(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_OPENICE_SCRIPT);
    await bus.sendMedicalDeviceMenssage({action:'stop'});

    // Closing UDP Server and stoping to send messages
    await central.closeUdpServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_UDP_SERVER_SCRIPT);
    await bus.sendUdpTrafficMenssage({action:'stop'});
}

async function closeTcpTcp(): Promise<void> {

    await central.closeSdnManager(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_SDN_MANAGER_SCRIPT);

    // Clean sdn controller configuration
    await central.cleanSdnConfiguration(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_SDN_CONFIGURATIONS_SCRIPT);

    // Closing Network Monitoring over Wireshark
    await central.closeWireshark(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_WIRESHARK_SCRIPT);

    // Stoping to send messages from workstation DICOM
    await bus.sendWorkstationDicomMenssage({action:'stop'});

    // Stoping to send messages from The second workstation DICOM
    await bus.sendSecondWorkstationDicomMenssage({action:'stop'});

}

async function mainUdpTcp(bandwitdh: string, sndManager: boolean): Promise<void> {
    const path: string  = ScriptsMonitoringCentral.SCRIPT_PATH + bandwitdh
    // Clear and Close all configuration and application
    await closeUdpTcp();

    // Starting sdn controller configuration
    await central.startSdnConfiguration(path + ScriptsMonitoringCentral.MONITORING_CENTRAL + ScriptsMonitoringCentral.START_SDN_CONFIGURATIONS_SCRIPT);

    // Stating Network Monitoring over Wireshark
    await central.startWireshark(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_WIRESHARK_SCRIPT);

    // Starting DCM4CHEE and send a message for workstation DICOM sending images
    await central.startDicomServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_DICOM_SERVER_SCRIPT);
    await bus.sendWorkstationDicomMenssage({action:'start'});

    // Starting Supervisor OpenICE and send a message for Medical Devices of OpenICE to sending data
    await central.startOpenIce(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_OPENICE_SCRIPT);
    await bus.sendMedicalDeviceMenssage({action:'start'});

    // Starting UDP Server and send a message for start sending data
    await central.startUdpServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_UDP_SERVER_SCRIPT);
    await bus.sendUdpTrafficMenssage({action:'start', bandwidth: bandwitdh});

    if (sndManager){
        await central.startSdnManager(path + ScriptsMonitoringCentral.MONITORING_CENTRAL + ScriptsMonitoringCentral.START_SDN_MANAGER_SCRIPT);
    }

}

async function mainUdpUdp(bandwitdh: string, sndManager: boolean): Promise<void> {
    const path: string  = ScriptsMonitoringCentral.SCRIPT_PATH + bandwitdh

    // Clear and Close all configuration and application
    await closeUdpUdp();

    // Starting sdn controller configuration
    await central.startSdnConfiguration(path + ScriptsMonitoringCentral.MONITORING_CENTRAL + ScriptsMonitoringCentral.START_SDN_CONFIGURATIONS_SCRIPT);

    // Stating Network Monitoring over Wireshark
    await central.startWireshark(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_WIRESHARK_SCRIPT);

    // Starting Call VoIp
    await central.startVoipServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_VOIP_SERVER_SCRIPT);
    await bus.sendCallVoIpMenssage({action:'start'});

    // Starting Supervisor OpenICE and send a message for Medical Devices of OpenICE to sending data
    await central.startOpenIce(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_OPENICE_SCRIPT);
    await bus.sendMedicalDeviceMenssage({action:'start'});

    // Starting UDP Server and send a message for start sending data
    await central.startUdpServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_UDP_SERVER_SCRIPT);
    await bus.sendUdpTrafficMenssage({action:'start', bandwidth: bandwitdh});

    if (sndManager){
        await central.startSdnManager(path + ScriptsMonitoringCentral.MONITORING_CENTRAL + ScriptsMonitoringCentral.START_SDN_MANAGER_SCRIPT);
    }
}

async function mainTcpTcp(bandwitdh: string, sndManager: boolean): Promise<void> {
    const path: string  = ScriptsMonitoringCentral.SCRIPT_PATH + bandwitdh

    // Clear and Close all configuration and application
    await closeTcpTcp();

    // Starting sdn controller configuration
    await central.startSdnConfiguration(path + ScriptsMonitoringCentral.MONITORING_CENTRAL + ScriptsMonitoringCentral.START_SDN_CONFIGURATIONS_SCRIPT);

    // Stating Network Monitoring over Wireshark
    await central.startWireshark(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_WIRESHARK_SCRIPT);

    // Starting DCM4CHEE and send a message for workstation DICOM start sending images
    await central.startDicomServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_DICOM_SERVER_SCRIPT);
    await bus.sendWorkstationDicomMenssage({action:'start'});

    // Send a message for The second workstation DICOM to start sending images
    await bus.sendSecondWorkstationDicomMenssage({action:'start'});

    if (sndManager){
        await central.startSdnManager(path + ScriptsMonitoringCentral.MONITORING_CENTRAL + ScriptsMonitoringCentral.START_SDN_MANAGER_SCRIPT);
    }
}

bus.startConnection('192.168.25.236').then(async () => {
    setInterval(mainUdpTcp, time, '100');
});


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