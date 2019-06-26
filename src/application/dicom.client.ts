import * as shell from 'shelljs'

export class DicomClient {

    public startDicomClient(path: string, script: string): void{
        let program = script + ' ' + path ;

        let child  = shell.exec(program, {async:true});

        if (child.stdout) {
            child.stdout.on('data', function (data) {
                if (data.toString().search('Sent 1 objects') !== -1){
                    /* ... do something with data ... */
                    console.log('terminou')
                    let dicomClient: DicomClient = new DicomClient();
                    dicomClient.startDicomClient(path, script)
                }
            });
        }
    }

    public closeDicomClient(script: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            shell.exec(script)
            resolve()
        });
    }

}
