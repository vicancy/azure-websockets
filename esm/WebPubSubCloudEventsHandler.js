// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { URL } from "url";
import { CloudEventsDispatcher } from "./webPubSubCloudEventsDispatcher";
import express from "express";
/**
 * The handler to handle incoming CloudEvents messages
 */
export class WebPubSubCloudEventsHandler {
    /**
     * Creates an instance of a WebPubSubCloudEventsHandler for handling incoming CloudEvents messages.
     *
     * Example usage:
     * ```ts
     * import express from "express";
     * import { WebPubSubCloudEventsHandler } from "@azure/web-pubsub-express";
     * const endpoint = "https://xxxx.webpubsubdev.azure.com"
     * const handler = new WebPubSubCloudEventsHandler('chat', [ endpoint ] {
     *   onConnect: async connectRequest => {
     *     console.log(JSON.stringify(connectRequest));
     *     return {};
     *   },
     *   onConnected: async connectedRequest => {
     *     console.log(JSON.stringify(connectedRequest));
     *   },
     *   onUserEvent: async userRequest => {
     *     console.log(JSON.stringify(userRequest));
     *     return {
     *      payload: {
     *        data: "Hey " + userRequest.payload.data,
     *        dataType: userRequest.payload.dataType
     *      }
     *    };
     *  },
     * });
     * ```
     *
     * @param hub The name of the hub to listen to
     * @param allowedEndpoints The allowed endpoints for the incoming CloudEvents request
     * @param options Options to configure the event handler
     */
    constructor(hub, allowedEndpoints, options) {
        var _a;
        this.hub = hub;
        const path = (_a = options === null || options === void 0 ? void 0 : options.path) !== null && _a !== void 0 ? _a : `/api/webpubsub/hubs/${hub}`;
        this.path = path.endsWith("/") ? path : path + "/";
        this._allowedOrigins = allowedEndpoints.map((endpoint) => endpoint === "*" ? "*" : (new URL(endpoint).host));
        this._cloudEventsHandler = new CloudEventsDispatcher(this.hub, options, options === null || options === void 0 ? void 0 : options.dumpRequest);
    }
    /**
     * Get the middleware to be used in express
     */
    getMiddleware() {
        const router = express.Router();
        router.options(this.path, (request, response) => this.handleAbuseProtectionRequests(request, response));
        router.post(this.path, (request, response) => this._cloudEventsHandler.processRequest(request, response));
        return router;
    }
    handleAbuseProtectionRequests(request, response) {
        if (request.headers["webhook-request-origin"]) {
            response.setHeader("WebHook-Allowed-Origin", this._allowedOrigins);
        }
        else {
            console.log(`Invalid abuse protection request ${request}`);
            response.statusCode = 400;
        }
        response.end();
        return true;
    }
}
//# sourceMappingURL=WebPubSubCloudEventsHandler.js.map