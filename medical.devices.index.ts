import {CommunicationBus} from "./src/infrastructure/communication.bus";
import {ScriptsMedicalDevices} from "./utils/scripts.medical.devices";
import {MedicalDevices} from "./src/application/medical.devices";

let bus: CommunicationBus = new CommunicationBus();
let medicalDevices: MedicalDevices = new MedicalDevices();

bus.startConnection('192.168.25.236',true).then(async () => {
    bus.receiveMenssage('exchangeMedicalDevice', 'queueMedicalDevices',
        async (msg) => {
            if (msg.action === 'start') {
                await medicalDevices.startMedicalDevices(__dirname,ScriptsMedicalDevices.NORMAL_SCENARIO + ScriptsMedicalDevices.START_MEDICAL_DEVICES_SCRIPT)
                console.log('start')
            } else if (msg.action === 'stop') {
                await medicalDevices.closeMedicalDevices(ScriptsMedicalDevices.NORMAL_SCENARIO + ScriptsMedicalDevices.STOP_MEDICAL_DEVICES_SCRIPT)
                console.log('stop')
            }
        }).catch((e) => {
        console.log(e);
    })
});
