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
const amqp_ts_1 = require("amqp-ts");
class CommunicationBus {
    startConnection(hostIp, onlyReceive) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield new amqp_ts_1.Connection("amqp://test:test@localhost/mestrado"
                    .replace('localhost', hostIp));
                if (!onlyReceive) {
                    this.exchangeMedicalDevice = this.connection.declareExchange("exchangeMedicalDevice");
                    this.exchangeWorkstationDicom = this.connection.declareExchange("exchangeWorkstationDicom");
                    this.exchangeSecondWorkstationDicom = this.connection.declareExchange("exchangeSecondWorkstationDicom");
                    this.exchangeUdpTraffic = this.connection.declareExchange("exchangeUdpTraffic");
                    this.exchangeCallVoIp = this.connection.declareExchange("exchangeCallVoIp");
                }
                yield this.connection.initialized;
                resolve(true);
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    closeConnection() {
        return new Promise((resolve, reject) => { });
        ;
    }
    sendMedicalDeviceMenssage(message) {
        return new Promise((resolve, reject) => {
            try {
                if (this.exchangeMedicalDevice) {
                    this.exchangeMedicalDevice.send(new amqp_ts_1.Message(message));
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }
            catch (e) {
                reject(e);
            }
        });
    }
    sendWorkstationDicomMenssage(message) {
        return new Promise((resolve, reject) => {
            try {
                if (this.exchangeWorkstationDicom) {
                    this.exchangeWorkstationDicom.send(new amqp_ts_1.Message(message));
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }
            catch (e) {
                reject(e);
            }
        });
    }
    sendSecondWorkstationDicomMenssage(message) {
        return new Promise((resolve, reject) => {
            try {
                if (this.exchangeSecondWorkstationDicom) {
                    this.exchangeSecondWorkstationDicom.send(new amqp_ts_1.Message(message));
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }
            catch (e) {
                reject(e);
            }
        });
    }
    sendUdpTrafficMenssage(message) {
        return new Promise((resolve, reject) => {
            try {
                if (this.exchangeUdpTraffic) {
                    this.exchangeUdpTraffic.send(new amqp_ts_1.Message(message));
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }
            catch (e) {
                reject(e);
            }
        });
    }
    sendCallVoIpMenssage(message) {
        return new Promise((resolve, reject) => {
            try {
                if (this.exchangeCallVoIp) {
                    this.exchangeCallVoIp.send(new amqp_ts_1.Message(message));
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }
            catch (e) {
                reject(e);
            }
        });
    }
    receiveMenssage(exchangeName, queueName, callback) {
        return new Promise((resolve, reject) => {
            try {
                if (this.connection) {
                    let exchange = this.connection.declareExchange(exchangeName);
                    let queue = this.connection.declareQueue(queueName);
                    queue.bind(exchange);
                    queue.activateConsumer((message) => {
                        message.ack();
                        callback(message.getContent());
                    }, { noAck: false });
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.CommunicationBus = CommunicationBus;
