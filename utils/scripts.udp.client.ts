export abstract class ScriptsUdpClient {
    public static readonly UDP_CLIENT: string = '/udp_client/'

    public static readonly SCRIPT_PATH: string = './scripts/'

    public static readonly NORMAL_SCENARIO: string = ScriptsUdpClient.SCRIPT_PATH + 'general/udp_client/'
    public static readonly HUNDRED_SCENARIO: string = '100/'
    public static readonly FIVE_HUNDRED_SCENARIO: string = '500/'

    public static readonly START_UDP_CLIENT_SCRIPT: string = 'start_udp_client.sh'

    public static readonly STOP_UDP_CLIENT_SCRIPT: string = 'stop_udp_client.sh'

}