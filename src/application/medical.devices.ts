import * as shell from 'shelljs'

export class MedicalDevices {

    public startMedicalDevices(path: string, script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            let program = script + ' ' + path ;
            let child = shell.exec(program, {async:true});

            if (child.stdout) {
                child.stdout.on('data', function (data) {
                    resolve(true)
                });
            }
        });
    }

    public closeMedicalDevices(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script)
            resolve()
        });
    }

}