/// <reference types="node" />
import { URL } from "url";
export interface NegotiateResponse {
    url: string;
    token: string;
}
interface ServiceEndpoint {
    serviceUrl: URL;
    websocketHost: string;
    audience: string;
    key: string;
}
interface NegotiateOptions {
    userId?: string;
    claims?: {
        [key: string]: string[];
    };
}
export declare class WebPubSubServiceEndpoint {
    endpoint: ServiceEndpoint;
    /**
     * Creates a new WebPubSubServiceEndpoint object.
     *
     * @constructor
     * @param {string} conn The Connection String.
     * @param {string} hub The Hub
     */
    constructor(conn: string);
    clientNegotiate(hub: string, options?: NegotiateOptions): NegotiateResponse;
    private getServiceEndpoint;
    private parseConnectionString;
}
export {};
//# sourceMappingURL=webPubSubServiceEndpoint.d.ts.map