/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
import { ConnectRequest, ConnectResponse, UserEventRequest, DisconnectedRequest, ConnectedRequest } from "./webPubSubCloudEventsProtocols";
declare class ConnectResponseHandler {
    private response;
    constructor(response: ServerResponse);
    success(response?: ConnectResponse): void;
    fail(code: 400 | 401 | 500, detail?: string): void;
}
declare class UserEventResponseHandler {
    private response;
    constructor(response: ServerResponse);
    success(data?: string | ArrayBuffer, dataType?: 'binary' | 'text' | 'json'): void;
    fail(code: 400 | 401 | 500, detail?: string): void;
}
/**
 * Options to define the event handlers for each event
 */
export interface WebPubSubEventHandler {
    handleConnect?: (connectRequest: ConnectRequest, connectResponse: ConnectResponseHandler) => Promise<void>;
    handleUserEvent?: (userEventRequest: UserEventRequest, userEventResponse: UserEventResponseHandler) => Promise<void>;
    onConnected?: (connectedRequest: ConnectedRequest) => Promise<void>;
    onDisconnected?: (disconnectedRequest: DisconnectedRequest) => Promise<void>;
}
export declare class CloudEventsDispatcher {
    private hub;
    private eventHandler?;
    private dumpRequest?;
    constructor(hub: string, eventHandler?: WebPubSubEventHandler | undefined, dumpRequest?: boolean | undefined);
    processRequest(request: IncomingMessage, response: ServerResponse): Promise<boolean>;
    private GetContext;
    private convertHttpToEvent;
    private readRequestBody;
}
export {};
//# sourceMappingURL=webPubSubCloudEventsDispatcher.d.ts.map