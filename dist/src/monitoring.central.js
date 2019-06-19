"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const shell = __importStar(require("shelljs"));
class MonitoringCentral {
    startSdnConfiguration(file) {
        return new Promise((resolve, reject) => {
            shell.exec(file);
        });
    }
    startDicomServer() {
        return new Promise((resolve, reject) => { resolve(); });
        ;
    }
    startWireshark() {
        return new Promise((resolve, reject) => { resolve(); });
        ;
    }
    startOpenIce() {
        return new Promise((resolve, reject) => { resolve(); });
        ;
    }
    startUdpServer() {
        return new Promise((resolve, reject) => { resolve(); });
        ;
    }
    startVoipServer() {
        return new Promise((resolve, reject) => { resolve(); });
        ;
    }
    cleanSdnConfiguration() {
        return new Promise((resolve, reject) => { resolve(); });
        ;
    }
    closeDicomServer() {
        return new Promise((resolve, reject) => { resolve(); });
        ;
    }
    closeWireshark() {
        return new Promise((resolve, reject) => { resolve(); });
        ;
    }
    closeOpenIce() {
        return new Promise((resolve, reject) => { resolve(); });
        ;
    }
    closeUdpServer() {
        return new Promise((resolve, reject) => { resolve(); });
        ;
    }
    closeVoipServer() {
        return new Promise((resolve, reject) => { resolve(); });
        ;
    }
}
exports.MonitoringCentral = MonitoringCentral;
