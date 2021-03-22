/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
import { ConnectRequest, ConnectResponse, UserEventRequest, UserEventResponse, DisconnectedRequest, ConnectedRequest } from "./webPubSubCloudEventsProtocols";
/**
 * Options to define the event handlers for each event
 */
export interface WebPubSubEventHandler {
    onConnect?: (r: ConnectRequest) => Promise<ConnectResponse>;
    onUserEvent?: (r: UserEventRequest) => Promise<UserEventResponse>;
    onConnected?: (r: ConnectedRequest) => Promise<void>;
    onDisconnected?: (r: DisconnectedRequest) => Promise<void>;
}
export declare class CloudEventsDispatcher {
    private hub;
    private eventHandler?;
    private dumpRequest?;
    constructor(hub: string, eventHandler?: WebPubSubEventHandler | undefined, dumpRequest?: boolean | undefined);
    processRequest(request: IncomingMessage, response: ServerResponse): Promise<void>;
    private getResponse;
    private GetContext;
    private convertHttpToEvent;
    private readRequestBody;
}
//# sourceMappingURL=webPubSubCloudEventsDispatcher.d.ts.map