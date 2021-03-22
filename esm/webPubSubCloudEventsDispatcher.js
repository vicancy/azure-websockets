// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import { HTTP } from "cloudevents";
import { decode } from "typescript-base64-arraybuffer";
import { ErrorCode, PayloadDataType } from "./webPubSubCloudEventsProtocols";
export class CloudEventsDispatcher {
    constructor(hub, eventHandler, dumpRequest) {
        this.hub = hub;
        this.eventHandler = eventHandler;
        this.dumpRequest = dumpRequest;
    }
    processRequest(request, response) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.eventHandler) {
                response.end();
                return;
            }
            try {
                var eventRequest = yield this.convertHttpToEvent(request);
                var eventResponse = yield this.getResponse(eventRequest);
                if (!eventResponse) {
                    // we consider no response as 200 valid response
                    response.end();
                    return;
                }
                if (eventResponse.error) {
                    switch (eventResponse.error.code) {
                        case ErrorCode.userError:
                            response.statusCode = 400;
                            break;
                        case ErrorCode.unauthorized:
                            response.statusCode = 401;
                            break;
                        default:
                            response.statusCode = 500;
                            break;
                    }
                    response.end((_a = eventResponse.error.detail) !== null && _a !== void 0 ? _a : "");
                    return;
                }
                if (eventResponse === null || eventResponse === void 0 ? void 0 : eventResponse.payload) {
                    if (eventResponse.payload.dataType === PayloadDataType.binary) {
                        response.setHeader("Content-Type", "application/octet-stream");
                    }
                    else if (eventResponse.payload.dataType === PayloadDataType.json) {
                        response.setHeader("Content-Type", "application/json");
                    }
                    else {
                        response.setHeader("Content-Type", "text/plain; charset=utf-8");
                    }
                    response.end((_c = (_b = eventResponse.payload) === null || _b === void 0 ? void 0 : _b.data) !== null && _c !== void 0 ? _c : "");
                }
            }
            catch (err) {
                console.error(`Error processing request ${request}: ${err}`);
                response.statusCode = 500;
                response.end(err.message);
            }
        });
    }
    getResponse(request) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const receivedEvent = HTTP.toEvent(request);
            if (this.dumpRequest === true) {
                console.log(receivedEvent);
            }
            var type = receivedEvent.type.toLowerCase();
            var context = this.GetContext(receivedEvent, request.headers.host);
            if (context.hub !== this.hub) {
                // it is possible when multiple hubs share the same handler
                console.info(`Incoming request is for hub '${this.hub}' while the incoming request is for hub '${context.hub}'`);
                return;
            }
            // TODO: valid request is a valid cloud event with WebPubSub extension
            if (type === "azure.webpubsub.sys.connect") {
                if (!((_a = this.eventHandler) === null || _a === void 0 ? void 0 : _a.onConnect)) {
                    // 401 if onConnect is not configured
                    return {
                        error: {
                            code: ErrorCode.unauthorized
                        }
                    };
                }
                var connectRequest = receivedEvent.data;
                if (!connectRequest) {
                    throw new Error("Data is expected");
                }
                connectRequest.context = context;
                var connectResponse = yield this.eventHandler.onConnect(connectRequest);
                if (connectRequest) {
                    return {
                        payload: {
                            data: JSON.stringify(connectResponse),
                            dataType: PayloadDataType.json
                        }
                    };
                }
                else {
                    // what is the differnce between not configure and not return? there is no such definition in C#..
                    // 401 if onConnect is not configured
                    return {
                        error: {
                            code: ErrorCode.unauthorized
                        }
                    };
                }
            }
            else if (type === "azure.webpubsub.sys.connected") {
                if (!((_b = this.eventHandler) === null || _b === void 0 ? void 0 : _b.onConnected)) {
                    return;
                }
                var connectedRequest = receivedEvent.data;
                if (!connectedRequest) {
                    throw new Error("Data is expected");
                }
                connectedRequest.context = context;
                this.eventHandler.onConnected(connectedRequest);
            }
            else if (type === "azure.webpubsub.sys.disconnected") {
                if (!((_c = this.eventHandler) === null || _c === void 0 ? void 0 : _c.onDisconnected)) {
                    return;
                }
                var disconnectedRequest = receivedEvent.data;
                if (!disconnectedRequest) {
                    throw new Error("Data is expected");
                }
                disconnectedRequest.context = context;
                this.eventHandler.onDisconnected(disconnectedRequest);
            }
            else if (type.startsWith("azure.webpubsub.user")) {
                if (!((_d = this.eventHandler) === null || _d === void 0 ? void 0 : _d.onUserEvent)) {
                    return;
                }
                var data;
                var dataType = PayloadDataType.binary;
                if (receivedEvent.data) {
                    data = receivedEvent.data;
                    dataType =
                        receivedEvent.datacontenttype === "application/json"
                            ? PayloadDataType.json
                            : PayloadDataType.text;
                }
                else if (receivedEvent.data_base64) {
                    data = decode(receivedEvent.data_base64);
                }
                else {
                    throw new Error("empty data payload");
                }
                var userRequest = {
                    context: context,
                    payload: {
                        data: data,
                        dataType: dataType
                    }
                };
                if (!userRequest) {
                    throw new Error("Data is expected");
                }
                userRequest.context = context;
                return yield this.eventHandler.onUserEvent(userRequest);
            }
            else {
                throw new Error("Not supported event: " + type);
            }
            return;
        });
    }
    GetContext(ce, host) {
        var context = {
            signature: ce["signature"],
            userId: ce["userid"],
            hub: ce["hub"],
            connectionId: ce["connectionid"],
            eventName: ce["eventname"],
            host: host
        };
        // TODO: validation
        return context;
    }
    convertHttpToEvent(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const normalized = {
                headers: {},
                body: ""
            };
            if (request.headers) {
                for (const key in request.headers) {
                    if (Object.prototype.hasOwnProperty.call(request.headers, key)) {
                        const element = request.headers[key];
                        if (element === undefined) {
                            continue;
                        }
                        if (typeof element === "string") {
                            normalized.headers[key] = element;
                        }
                        else {
                            normalized.headers[key] = element.join(",");
                        }
                    }
                }
            }
            normalized.body = yield this.readRequestBody(request);
            return normalized;
        });
    }
    readRequestBody(req) {
        return new Promise(function (resolve, reject) {
            var body = "";
            req.on("data", function (chunk) {
                body += chunk;
            });
            req.on("end", function () {
                resolve(body);
            });
            // reject on request error
            req.on("error", function (err) {
                // This is not a "Second reject", just a different sort of failure
                reject(err);
            });
        });
    }
}
//# sourceMappingURL=webPubSubCloudEventsDispatcher.js.map