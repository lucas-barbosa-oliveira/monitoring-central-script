export abstract class ScriptsDicomClient {

    public static readonly SCRIPT_PATH: string = './scripts/'

    public static readonly NORMAL_SCENARIO: string = ScriptsDicomClient.SCRIPT_PATH + 'general/dicom_client/'

    public static readonly START_DICOM_CLIENT_SCRIPT: string = 'start_dicom_client.sh'

    public static readonly STOP_DICOM_CLIENT_SCRIPT: string = 'stop_dicom_client.sh'

}