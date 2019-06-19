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
    startSdnManager(script) {
        return new Promise((resolve, reject) => {
            shell.exec(script);
            resolve();
        });
    }
    startSdnConfiguration(script) {
        return new Promise((resolve, reject) => {
            shell.exec(script);
            resolve();
        });
    }
    startDicomServer(script) {
        return new Promise((resolve, reject) => {
            shell.exec(script);
            resolve();
        });
    }
    startWireshark(script) {
        return new Promise((resolve, reject) => {
            shell.exec(script);
            resolve();
        });
    }
    startOpenIce(script) {
        return new Promise((resolve, reject) => {
            shell.exec(script);
            resolve();
        });
    }
    startUdpServer(script) {
        return new Promise((resolve, reject) => {
            shell.exec(script);
            resolve();
        });
    }
    startVoipServer(script) {
        return new Promise((resolve, reject) => {
            shell.exec(script);
            resolve();
        });
    }
    closeSdnManager(script) {
        return new Promise((resolve, reject) => {
            shell.exec(script);
            resolve();
        });
    }
    cleanSdnConfiguration(script) {
        return new Promise((resolve, reject) => {
            shell.exec(script);
            resolve();
        });
    }
    closeDicomServer() {
        return new Promise((resolve, reject) => { resolve(); });
        ;
    }
    closeWireshark(script) {
        return new Promise((resolve, reject) => {
            shell.exec(script);
            resolve();
        });
    }
    closeOpenIce(script) {
        return new Promise((resolve, reject) => {
            shell.exec(script);
            resolve();
        });
    }
    closeUdpServer(script) {
        return new Promise((resolve, reject) => {
            shell.exec(script);
            resolve();
        });
    }
    closeVoipServer(script) {
        return new Promise((resolve, reject) => {
            shell.exec(script);
            resolve();
        });
    }
}
exports.MonitoringCentral = MonitoringCentral;
