import {CommunicationBus} from "./src/infrastructure/communication.bus";
import  {MonitoringCentral} from "./src/application/monitoring.central";
import {ScriptsMonitoringCentral} from "./utils/scripts.monitoring.central";

let bus: CommunicationBus = new CommunicationBus();
let central: MonitoringCentral= new MonitoringCentral();

let time: number = 180000;
let repeatNumber = 0;
let tesNumber = 10;

let openIceStarted = false;
let dicomServerStarted = false;

async function closeUdpTcp(): Promise<void> {

    await central.closeSdnController(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_SDN_CONTROLLER_SCRIPT);

    await central.closeSdnManager(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_SDN_MANAGER_SCRIPT);

    // Clean sdn controller configuration
    await central.cleanSdnConfiguration(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_SDN_CONFIGURATIONS_SCRIPT);

    // Closing Network Monitoring over Wireshark
    await central.closeWireshark(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_WIRESHARK_SCRIPT);

    // Stoping to send messages from workstation DICOM
    await bus.sendWorkstationDicomMenssage({action:'stop'});

    // Closing UDP Server and stoping to send messages
    await central.closeUdpServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_UDP_SERVER_SCRIPT);
    await bus.sendUdpTrafficMenssage({action:'stop'});

    // Closing Supervisor OpenICE and stoping to send messages from Medical Devices of OpenICE
    // await central.closeOpenIce(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_OPENICE_SCRIPT);
    await bus.sendMedicalDeviceMenssage({action:'stop'});

}

async function closeUdpUdp(): Promise<void> {

    await central.closeSdnController(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_SDN_CONTROLLER_SCRIPT);

    await central.closeSdnManager(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_SDN_MANAGER_SCRIPT);

    // Clean sdn controller configuration
    await central.cleanSdnConfiguration(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_SDN_CONFIGURATIONS_SCRIPT);

    // Closing Network Monitoring over Wireshark
    await central.closeWireshark(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_WIRESHARK_SCRIPT);

    // Closing Call VoIp
    await central.closeVoipServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_VOIP_SERVER_SCRIPT);
    await bus.sendCallVoIpMenssage({action:'stop'});

    // Closing UDP Server and stoping to send messages
    await central.closeUdpServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_UDP_SERVER_SCRIPT);
    await bus.sendUdpTrafficMenssage({action:'stop'});

    // Closing Supervisor OpenICE and stoping to send messages from Medical Devices of OpenICE
    // await central.closeOpenIce(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_OPENICE_SCRIPT);
    await bus.sendMedicalDeviceMenssage({action:'stop'});

}

async function closeTcpTcp(): Promise<void> {

    await central.closeSdnController(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.STOP_SDN_CONTROLLER_SCRIPT);

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

async function mainUdpTcp(bandwitdh: string, sndManager?: boolean): Promise<void> {
    repeatNumber++;
    const path: string  = ScriptsMonitoringCentral.SCRIPT_PATH + bandwitdh
    // Clear and Close all configuration and application
    await closeUdpTcp();

    if (sndManager){
        await central.startSdnController(__dirname,ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_SDN_CONTROLLER_SCRIPT);
    }

    // Starting sdn controller configuration
    await central.startSdnConfiguration(path + ScriptsMonitoringCentral.MONITORING_CENTRAL + ScriptsMonitoringCentral.START_SDN_CONFIGURATIONS_SCRIPT);

    // Stating Network Monitoring over Wireshark
    await central.startWireshark(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_WIRESHARK_SCRIPT);

    // Starting Supervisor OpenICE and send a message for Medical Devices of OpenICE to sending data
    if (!openIceStarted){
        openIceStarted = true;
        await central.startOpenIce(__dirname,ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_OPENICE_SCRIPT);
    }
    await bus.sendMedicalDeviceMenssage({action:'start'});

    // Starting DCM4CHEE and send a message for workstation DICOM sending images
    if (!dicomServerStarted) {
        dicomServerStarted = true;
        await central.startDicomServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_DICOM_SERVER_SCRIPT);
    }
    await bus.sendWorkstationDicomMenssage({action:'start', bandwidth: bandwitdh});

    // Starting UDP Server and send a message for start sending data
    await central.startUdpServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_UDP_SERVER_SCRIPT);
    await bus.sendUdpTrafficMenssage({action:'start', bandwidth: bandwitdh});

    if (sndManager){
        await central.startSdnManager(__dirname,path + ScriptsMonitoringCentral.MONITORING_CENTRAL + "udp-tcp-" +  ScriptsMonitoringCentral.START_SDN_MANAGER_SCRIPT);
    }

    if(repeatNumber === tesNumber){
        await closeUdpUdp();
        process.exit(0)
    }
}

async function mainUdpUdp(bandwitdh: string, sndManager?: boolean): Promise<void> {
    repeatNumber++;
    const path: string  = ScriptsMonitoringCentral.SCRIPT_PATH + bandwitdh

    // // Clear and Close all configuration and application
    await closeUdpUdp();

    if (sndManager){
        await central.startSdnController(__dirname,ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_SDN_CONTROLLER_SCRIPT);
    }

    // Starting sdn controller configuration
    await central.startSdnConfiguration(path + ScriptsMonitoringCentral.MONITORING_CENTRAL + ScriptsMonitoringCentral.START_SDN_CONFIGURATIONS_SCRIPT);

    // Stating Network Monitoring over Wireshark
    await central.startWireshark(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_WIRESHARK_SCRIPT);

    // Starting Supervisor OpenICE and send a message for Medical Devices of OpenICE to sending data
    if (!openIceStarted){
        openIceStarted = true;
        await central.startOpenIce(__dirname,ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_OPENICE_SCRIPT);
    }
    await bus.sendMedicalDeviceMenssage({action:'start'});

    // Starting Call VoIp
    await central.startVoipServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_VOIP_SERVER_SCRIPT);
    await bus.sendCallVoIpMenssage({action:'start'});

    // Starting UDP Server and send a message for start sending data
    await central.startUdpServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_UDP_SERVER_SCRIPT);
    await bus.sendUdpTrafficMenssage({action:'start', bandwidth: bandwitdh});

    if (sndManager){
        await central.startSdnManager(__dirname,path + ScriptsMonitoringCentral.MONITORING_CENTRAL + "udp-udp-" + ScriptsMonitoringCentral.START_SDN_MANAGER_SCRIPT);
    }

    if(repeatNumber === tesNumber){
        await closeUdpUdp();
        process.exit(0)
    }
}

async function mainTcpTcp(bandwitdh: string, sndManager?: boolean): Promise<void> {
    repeatNumber++;
    const path: string  = ScriptsMonitoringCentral.SCRIPT_PATH + bandwitdh

    // Clear and Close all configuration and application
    await closeTcpTcp();

    if (sndManager){
        await central.startSdnController(__dirname,ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_SDN_CONTROLLER_SCRIPT);
    }

    // Starting sdn controller configuration
    await central.startSdnConfiguration(path + ScriptsMonitoringCentral.MONITORING_CENTRAL + ScriptsMonitoringCentral.START_SDN_CONFIGURATIONS_SCRIPT);

    // Stating Network Monitoring over Wireshark
    await central.startWireshark(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_WIRESHARK_SCRIPT);

    // Starting DCM4CHEE and send a message for workstation DICOM start sending images
    if (!dicomServerStarted) {
        dicomServerStarted = true;
        await central.startDicomServer(ScriptsMonitoringCentral.NORMAL_SCENARIO + ScriptsMonitoringCentral.START_DICOM_SERVER_SCRIPT);
    }
    await bus.sendWorkstationDicomMenssage({action:'start', bandwidth: bandwitdh});

    // Send a message for The second workstation DICOM to start sending images
    await bus.sendSecondWorkstationDicomMenssage({action:'start', bandwidth: bandwitdh});

    if (sndManager){
        await central.startSdnManager(__dirname, path + ScriptsMonitoringCentral.MONITORING_CENTRAL + "tcp-tcp-" +  ScriptsMonitoringCentral.START_SDN_MANAGER_SCRIPT);
    }

    if(repeatNumber === tesNumber){
        await closeUdpUdp();
        process.exit(0)
    }
}

bus.startConnection('192.168.0.105').then(async () => {
    setInterval(mainUdpUdp, time, '100');
    // mainUdpTcp('500')
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
