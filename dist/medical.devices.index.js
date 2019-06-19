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
const scripts_medical_devices_1 = require("./utils/scripts.medical.devices");
const medical_devices_1 = require("./src/application/medical.devices");
let bus = new communication_bus_1.CommunicationBus();
let medicalDevices = new medical_devices_1.MedicalDevices();
bus.startConnection('192.168.25.236', true).then(() => __awaiter(this, void 0, void 0, function* () {
    bus.receiveMenssage('exchangeMedicalDevice', 'queueMedicalDevices', (msg) => __awaiter(this, void 0, void 0, function* () {
        if (msg.action === 'start') {
            yield medicalDevices.startMedicalDevices(scripts_medical_devices_1.ScriptsMedicalDevices.NORMAL_SCENARIO + scripts_medical_devices_1.ScriptsMedicalDevices.START_MEDICAL_DEVICES_SCRIPT);
            console.log('start');
        }
        else if (msg.action === 'stop') {
            yield medicalDevices.closeMedicalDevices(scripts_medical_devices_1.ScriptsMedicalDevices.NORMAL_SCENARIO + scripts_medical_devices_1.ScriptsMedicalDevices.STOP_MEDICAL_DEVICES_SCRIPT);
            console.log('stop');
        }
    })).catch((e) => {
        console.log(e);
    });
}));
