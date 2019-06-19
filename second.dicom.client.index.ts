import {CommunicationBus} from "./src/infrastructure/communication.bus";

let bus: CommunicationBus = new CommunicationBus();

bus.startConnection('192.168.25.236',true).then(async () => {
    bus.receiveMenssage('exchangeSecondWorkstationDicom', 'queueSecondWorkstationDicom',
        (msg) => {
            console.log(msg)
        }).catch((e) => {
        console.log(e);
    })
});
