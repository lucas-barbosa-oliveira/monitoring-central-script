import * as shell from 'shelljs'

export class VoipClient {

    public startVoipClient(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script, {async: true})
            resolve()
        });
    }

    public closeVoipClient(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script)
            resolve()
        });
    }

}
