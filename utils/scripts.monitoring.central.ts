export abstract class ScriptsMonitoringCentral {
    public static readonly MONITORING_CENTRAL: string = '/monitoring_central/'

    public static readonly SCRIPT_PATH: string = './scripts/'

    public static readonly NORMAL_SCENARIO: string = ScriptsMonitoringCentral.SCRIPT_PATH + 'general/monitoring_central/'
    public static readonly HUNDRED_SCENARIO: string = '100/'
    public static readonly FIVE_HUNDRED_SCENARIO: string = '500/'

    public static readonly START_SDN_CONTROLLER_SCRIPT: string = 'start_sdn_controller.sh'
    public static readonly START_SDN_MANAGER_SCRIPT: string = 'start_sdn_manager.sh'
    public static readonly START_SDN_CONFIGURATIONS_SCRIPT: string = 'start_sdn_configuration.sh'
    public static readonly START_WIRESHARK_SCRIPT: string = 'start_wireshark.sh'
    public static readonly START_DICOM_SERVER_SCRIPT: string = 'start_dicom_server.sh'
    public static readonly START_OPENICE_SCRIPT: string = 'start_openice.sh'
    public static readonly START_UDP_SERVER_SCRIPT: string = 'start_udp_server.sh &'
    public static readonly START_VOIP_SERVER_SCRIPT: string = 'start_void_server.sh'

    public static readonly STOP_SDN_CONTROLLER_SCRIPT: string = 'stop_sdn_controller.sh'
    public static readonly STOP_SDN_MANAGER_SCRIPT: string = 'stop_sdn_manager.sh'
    public static readonly STOP_SDN_CONFIGURATIONS_SCRIPT: string = 'stop_sdn_configuration.sh'
    public static readonly STOP_WIRESHARK_SCRIPT: string = 'stop_wireshark.sh'
    public static readonly STOP_DICOM_SERVER_SCRIPT: string = 'stop_dicom_server.sh'
    public static readonly STOP_OPENICE_SCRIPT: string = 'stop_openice.sh'
    public static readonly STOP_UDP_SERVER_SCRIPT: string = 'stop_udp_server.sh'
    public static readonly STOP_VOIP_SERVER_SCRIPT: string = 'stop_void_server.sh'

}