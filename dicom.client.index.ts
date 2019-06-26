import {CommunicationBus} from "./src/infrastructure/communication.bus";
import {DicomClient} from "./src/application/dicom.client";
import { ScriptsDicomClient } from "./utils/scripts.dicom.client";
import {ScriptsUdpClient} from "./utils/scripts.udp.client";
import {ScriptsMedicalDevices} from "./utils/scripts.medical.devices";

let bus: CommunicationBus = new CommunicationBus();
let dicomClient: DicomClient = new DicomClient();

bus.startConnection('192.168.0.105',true).then(async () => {
    bus.receiveMenssage('exchangeWorkstationDicom', 'queueWorkstationDicom',
        async (msg) => {
            if (msg.action === 'start') {
                dicomClient.startDicomClient(__dirname,ScriptsDicomClient.SCRIPT_PATH + msg.bandwidth + ScriptsDicomClient.DICOM_CLIENT + ScriptsDicomClient.START_DICOM_CLIENT_SCRIPT)
                console.log('start')
            } else if (msg.action === 'stop') {
                await dicomClient.closeDicomClient(ScriptsDicomClient.NORMAL_SCENARIO + ScriptsDicomClient.STOP_DICOM_CLIENT_SCRIPT)
                console.log('stop')
            }
        }).catch((e) => {
        console.log(e);
    })
});
