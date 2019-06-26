import * as shell from 'shelljs'

export class MedicalDevices {

    public startMedicalDevices(path: string, script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            let program = script + ' ' + path ;
            shell.exec(program, {async:true});

            resolve(true)

        });
    }

    public closeMedicalDevices(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script)
            resolve()
        });
    }

}
