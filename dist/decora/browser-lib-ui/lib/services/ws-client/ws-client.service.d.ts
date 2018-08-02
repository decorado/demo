import { OpenConnection } from './ws-client.models';
export declare class DecWsClientService {
    private connection;
    constructor();
    connect(url: any): OpenConnection;
    private connectToWs(url);
    private openConnection(url, connection?);
}
