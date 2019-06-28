import * as shell from 'shelljs'

export class MonitoringCentral {

    time: number = 0;

    public startSdnController(path: string, script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            let program = script + ' ' + path ;
            let child = shell.exec(program, {async:true});

            if (child.stdout) {
                child.stdout.on('data', function (data) {
                    if(data.toString().search('Sending LLDP packets out of all the enabled ports') !== -1)
                        resolve(true)
                });
            }
        });
    }

    public startSdnManager(path: string, script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            let program = script + ' ' + path ;
            shell.exec(program, {async:true})
            resolve()
        });
    }

    public startSdnConfiguration(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script)
            resolve()
        });
    }

    public startDicomServer(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            let child = shell.exec(script, {async:true})

            if (child.stdout) {
                child.stdout.on('data', function (data) {
                    if (data.toString().search('Start Server listening on 0.0.0.0:11112') !== -1){
                        /* ... do something with data ... */
                        resolve(true)
                    }
                });
            }
        });
    }

    public startWireshark(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script + ' ' + this.time++, {async:true})
            resolve()
        });
    }

    public startOpenIce(path: string, script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            let program = script + ' ' + path ;
            shell.exec(program,{async:true})
            resolve()
        });
    }

    public startUdpServer(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            let child = shell.exec(script, {async:true})

            if (child.stdout) {
                child.stdout.on('data', function (data) {
                    if (data.toString().search('Server listening on UDP port 5001') !== -1){
                        /* ... do something with data ... */
                        resolve(true)
                    }
                });
            }
        });
    }

    public startVoipServer(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script, {async:true})
            resolve()
        });
    }

    public closeSdnController(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script)
            resolve()
        });
    }

    public closeSdnManager(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script)
            resolve()
        });
    }

    public cleanSdnConfiguration(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script)
            resolve()
        });
    }

    public closeDicomServer(): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {resolve()});;
    }

    public closeWireshark(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script)
            resolve()
        });
    }

    public closeOpenIce(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script)
            resolve()
        });
    }

    public closeUdpServer(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script)
            resolve()
        });
    }

    public closeVoipServer(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script)
            resolve()
        });
    }
}
