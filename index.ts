import {CommunicationBus} from "./src/communication.bus";
import  {MonitoringCentral} from "./src/monitoring.central";

let bus: CommunicationBus = new CommunicationBus();
let bustwo: CommunicationBus = new CommunicationBus();
let central: MonitoringCentral= new MonitoringCentral();

let time: number = 3000;

async function closeUdpTcp(): Promise<void> {

    // Clean sdn controller configuration
    await central.cleanSdnConfiguration();

    // Closing Network Monitoring over Wireshark
    await central.closeWireshark();

    // Stoping to send messages from workstation DICOM
    await bus.sendWorkstationDicomMenssage({action:'stop'});

    // Closing Supervisor OpenICE and stoping to send messages from Medical Devices of OpenICE
    await central.closeOpenIce();
    await bus.sendMedicalDeviceMenssage({action:'stop'});

    // Closing UDP Server and stoping to send messages
    await central.closeUdpServer();
    await bus.sendUdpTrafficMenssage({action:'stop'});

}

async function closeUdpUdp(): Promise<void> {

    // Clean sdn controller configuration
    await central.cleanSdnConfiguration();

    // Closing Network Monitoring over Wireshark
    await central.closeWireshark();

    // Closing Call VoIp
    await central.closeVoipServer();
    await bus.sendCallVoIpMenssage({action:'stop'});

    // Closing Supervisor OpenICE and stoping to send messages from Medical Devices of OpenICE
    await central.closeOpenIce();
    await bus.sendMedicalDeviceMenssage({action:'stop'});

    // Closing UDP Server and stoping to send messages
    await central.closeUdpServer();
    await bus.sendUdpTrafficMenssage({action:'stop'});
}

async function closeTcpTcp(): Promise<void> {

    // Clean sdn controller configuration
    await central.cleanSdnConfiguration();

    // Closing Network Monitoring over Wireshark
    await central.closeWireshark();

    // Stoping to send messages from workstation DICOM
    await bus.sendWorkstationDicomMenssage({action:'stop'});

    // Stoping to send messages from The second workstation DICOM
    await bus.sendSecondWorkstationDicomMenssage({action:'stop'});

}

async function mainUdpTcp(): Promise<void> {

    // Clear and Close all configuration and application
    await closeUdpTcp();

    // Starting sdn controller configuration
    await central.startSdnConfiguration();

    // Stating Network Monitoring over Wireshark
    await central.startWireshark();

    // Starting DCM4CHEE and send a message for workstation DICOM sending images
    await central.startDicomServer();
    await bus.sendWorkstationDicomMenssage({action:'startDicom'});

    // Starting Supervisor OpenICE and send a message for Medical Devices of OpenICE to sending data
    await central.startOpenIce();
    await bus.sendMedicalDeviceMenssage({action:'startMedical'});

    // Starting UDP Server and send a message for start sending data
    await central.startUdpServer();
    await bus.sendUdpTrafficMenssage({action:'startUDP'});

}

async function mainUdpUdp(): Promise<void> {

    // Clear and Close all configuration and application
    await closeUdpUdp();

    // Starting sdn controller configuration
    await central.startSdnConfiguration();

    // Stating Network Monitoring over Wireshark
    await central.startWireshark();

    // Starting Call VoIp
    await central.startVoipServer();
    await bus.sendCallVoIpMenssage({action:'start'});

    // Starting Supervisor OpenICE and send a message for Medical Devices of OpenICE to sending data
    await central.startOpenIce();
    await bus.sendMedicalDeviceMenssage({action:'start'});

    // Starting UDP Server and send a message for start sending data
    await central.startUdpServer();
    await bus.sendUdpTrafficMenssage({action:'start'});

}

async function mainTcpTcp(): Promise<void> {

    // Clear and Close all configuration and application
    await closeTcpTcp();

    // Starting sdn controller configuration
    await central.startSdnConfiguration();

    // Stating Network Monitoring over Wireshark
    await central.startWireshark();

    // Starting DCM4CHEE and send a message for workstation DICOM start sending images
    await central.startDicomServer();
    await bus.sendWorkstationDicomMenssage({action:'start'});

    // Send a message for The second workstation DICOM to start sending images
    await central.startSecondDicomServer();
    await bus.sendSecondWorkstationDicomMenssage({action:'start'});

}

bus.startConnection().then(async () => {
    setInterval(mainUdpTcp, time);
});

bustwo.startConnection(true).then(async () => {
    await bus.receiveMenssage('exchangeMedicalDevice', 'queueMedicalDevice',
        (msg) => {
        console.log(msg)
    })
});

// bus.startConnection().then(() => {
//     setInterval(mainUdpUdp, time);
// });
//
// bus.startConnection().then(() => {
//     setInterval(mainTcpTcp, time);
// });