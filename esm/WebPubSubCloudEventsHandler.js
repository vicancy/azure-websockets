// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
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
        router.options(this.path, (request, response, next) => {
            if (!this.handleAbuseProtectionRequests(request, response)) {
                next();
            }
        });
        router.post(this.path, (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield this._cloudEventsHandler.processRequest(request, response))) {
                    next();
                }
            }
            catch (err) {
                next(err);
            }
        }));
        return router;
    }
    handleAbuseProtectionRequests(request, response) {
        if (request.headers["webhook-request-origin"]) {
            response.setHeader("WebHook-Allowed-Origin", this._allowedOrigins);
            response.end();
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=WebPubSubCloudEventsHandler.js.map