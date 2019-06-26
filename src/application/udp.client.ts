import * as shell from 'shelljs'

export class UdpClient {

    public startUdpClient(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script, {async: true})
            resolve()
        });
    }

    public closeUdpClient(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script)
            resolve()
        });
    }

}
