import {Connection, Exchange, Message} from "amqp-ts";

export class CommunicationBus {

    private connection?: Connection;
    private exchangeMedicalDevice?: Exchange;
    private exchangeWorkstationDicom?: Exchange;
    private exchangeSecondWorkstationDicom?: Exchange;
    private exchangeUdpTraffic?: Exchange;
    private exchangeCallVoIp?: Exchange;

    public startConnection(onlyReceive?: boolean): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {

            try{
                this.connection = await new Connection("amqp://localhost");
                if(!onlyReceive){
                    this.exchangeMedicalDevice = this.connection.declareExchange("exchangeMedicalDevice");
                    this.exchangeWorkstationDicom = this.connection.declareExchange("exchangeWorkstationDicom");
                    this.exchangeSecondWorkstationDicom = this.connection.declareExchange("exchangeSecondWorkstationDicom");
                    this.exchangeUdpTraffic = this.connection.declareExchange("exchangeUdpTraffic");
                    this.exchangeCallVoIp = this.connection.declareExchange("exchangeCallVoIp");
                }
                await this.connection.initialized
                resolve(true)
            }catch (e) {
                reject(e)
            }

        });
    }

    public closeConnection(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {});;
    }

    public sendMedicalDeviceMenssage(message: object): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            try{
                if(this.exchangeMedicalDevice) {
                    this.exchangeMedicalDevice.send(new Message(message))
                    resolve(true)
                }else {
                    reject(false)
                }
            }catch (e) {
                reject(e)

            }
        });
    }

    public sendWorkstationDicomMenssage(message: object): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            try{
                if(this.exchangeWorkstationDicom) {
                    this.exchangeWorkstationDicom.send(new Message(message))
                    resolve(true)
                }else {
                    reject(false)
                }
            }catch (e) {
                reject(e)

            }
        });
    }

    public sendSecondWorkstationDicomMenssage(message: object): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            try{
                if(this.exchangeSecondWorkstationDicom) {
                    this.exchangeSecondWorkstationDicom.send(new Message(message))
                    resolve(true)
                }else {
                    reject(false)
                }
            }catch (e) {
                reject(e)

            }
        });
    }

    public sendUdpTrafficMenssage(message: object): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            try{
                if(this.exchangeUdpTraffic) {
                    this.exchangeUdpTraffic.send(new Message(message))
                    resolve(true)
                }else {
                    reject(false)
                }
            }catch (e) {
                reject(e)

            }
        });
    }

    public sendCallVoIpMenssage(message: object): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            try{
                if(this.exchangeCallVoIp) {
                    this.exchangeCallVoIp.send(new Message(message))
                    resolve(true)
                }else {
                    reject(false)
                }
            }catch (e) {
                reject(e)

            }
        });
    }

    public receiveMenssage(exchangeName: string, queueName: string, callback: (message: any) => void): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            console.log('receive');
            try{
                if (this.connection){
                    let exchange = this.connection.declareExchange(exchangeName);
                    let queue = this.connection.declareQueue(queueName);
                    queue.bind(exchange);
                    queue.activateConsumer((message) => {
                        message.ack();
                        callback(message.getContent());
                    },{ noAck: false });
                    resolve(true)
                }else {
                    reject(false)
                }
            }catch (e) {
                reject(e)
            }
        });
    }
}