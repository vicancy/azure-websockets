import { WebPubSubEventHandler } from "./webPubSubCloudEventsDispatcher";
import express from "express";
/**
 * The options for the CloudEvents handler
 */
export interface WebPubSubEventHandlerOptions extends WebPubSubEventHandler {
    /**
     * Custom serving path for the path of the CloudEvents handler
     */
    path?: string;
    /**
     * Configures if you'd like to dump the incoming HTTP request
     */
    dumpRequest?: boolean;
}
/**
 * The handler to handle incoming CloudEvents messages
 */
export declare class WebPubSubCloudEventsHandler {
    private hub;
    /**
     * The path this CloudEvents handler listens to
     */
    readonly path: string;
    private _cloudEventsHandler;
    private _allowedOrigins;
    /**
     * Creates an instance of a WebPubSubCloudEventsHandler for handling incoming CloudEvents messages.
     *
     * Example usage:
     * ```ts
     * import express from "express";
     * import { WebPubSubCloudEventsHandler } from "@azure/web-pubsub-express";
     * const endpoint = "https://xxxx.webpubsubdev.azure.com"
     * const handler = new WebPubSubCloudEventsHandler('chat', [ endpoint ] {
     *   handleConnect: async (req, res) => {
     *     console.log(JSON.stringify(req));
     *     return {};
     *   },
     *   onConnected: async req => {
     *     console.log(JSON.stringify(req));
     *   },
     *   handleUserEvent: async (req, res) => {
     *     console.log(JSON.stringify(req));
     *     res.success("Hey " + userRequest.payload.data, req.dataType);
     *    };
     *  },
     * });
     * ```
     *
     * @param hub The name of the hub to listen to
     * @param allowedEndpoints The allowed endpoints for the incoming CloudEvents request
     * @param options Options to configure the event handler
     */
    constructor(hub: string, allowedEndpoints: string[], options?: WebPubSubEventHandlerOptions);
    /**
     * Get the middleware to be used in express
     */
    getMiddleware(): express.Router;
    private handleAbuseProtectionRequests;
}
//# sourceMappingURL=WebPubSubCloudEventsHandler.d.ts.map