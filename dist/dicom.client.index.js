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
const dicom_client_1 = require("./src/application/dicom.client");
const scripts_dicom_client_1 = require("./utils/scripts.dicom.client");
let bus = new communication_bus_1.CommunicationBus();
let dicomClient = new dicom_client_1.DicomClient();
bus.startConnection('192.168.25.236', true).then(() => __awaiter(this, void 0, void 0, function* () {
    bus.receiveMenssage('exchangeWorkstationDicom', 'queueWorkstationDicom', (msg) => __awaiter(this, void 0, void 0, function* () {
        if (msg.action === 'start') {
            yield dicomClient.startDicomClient(scripts_dicom_client_1.ScriptsDicomClient.NORMAL_SCENARIO + scripts_dicom_client_1.ScriptsDicomClient.START_DICOM_CLIENT_SCRIPT);
            console.log('start');
        }
        else if (msg.action === 'stop') {
            yield dicomClient.closeDicomClient(scripts_dicom_client_1.ScriptsDicomClient.NORMAL_SCENARIO + scripts_dicom_client_1.ScriptsDicomClient.STOP_DICOM_CLIENT_SCRIPT);
            console.log('stop');
        }
    })).catch((e) => {
        console.log(e);
    });
}));
