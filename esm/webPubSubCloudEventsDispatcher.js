// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import { HTTP } from "cloudevents";
import { decode } from "typescript-base64-arraybuffer";
class ConnectResponseHandler {
    constructor(response) {
        this.response = response;
    }
    success(response) {
        this.response.statusCode = 200;
        this.response.setHeader("Content-Type", "application/json");
        this.response.end(JSON.stringify(response));
    }
    fail(code, detail) {
        this.response.statusCode = code;
        this.response.end(detail !== null && detail !== void 0 ? detail : "");
    }
}
class UserEventResponseHandler {
    constructor(response) {
        this.response = response;
    }
    success(data, dataType) {
        this.response.statusCode = 200;
        switch (dataType) {
            case 'json':
                this.response.setHeader("Content-Type", "application/json;charset=utf-8");
                break;
            case 'text':
                this.response.setHeader("Content-Type", "text/plain; charset=utf-8");
                break;
            default:
                this.response.setHeader("Content-Type", "application/octet-stream");
                break;
        }
        this.response.end(data !== null && data !== void 0 ? data : "");
    }
    fail(code, detail) {
        this.response.statusCode = code;
        this.response.end(detail !== null && detail !== void 0 ? detail : "");
    }
}
export class CloudEventsDispatcher {
    constructor(hub, eventHandler, dumpRequest) {
        this.hub = hub;
        this.eventHandler = eventHandler;
        this.dumpRequest = dumpRequest;
    }
    processRequest(request, response) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            // check if hub matches
            if (!this.eventHandler || request.headers["ce-hub"] !== this.hub) {
                return false;
            }
            var eventRequest = yield this.convertHttpToEvent(request);
            const receivedEvent = HTTP.toEvent(eventRequest);
            if (this.dumpRequest === true) {
                console.log(receivedEvent);
            }
            var type = receivedEvent.type.toLowerCase();
            switch (type) {
                case "azure.webpubsub.sys.connect": {
                    var handler = new ConnectResponseHandler(response);
                    if (!((_a = this.eventHandler) === null || _a === void 0 ? void 0 : _a.handleConnect)) {
                        handler.fail(401);
                        return true;
                    }
                    var connectRequest = receivedEvent.data;
                    connectRequest.context = this.GetContext(receivedEvent, request.headers.host);
                    this.eventHandler.handleConnect(connectRequest, handler);
                    return true;
                }
                case "azure.webpubsub.sys.connected": {
                    if ((_b = this.eventHandler) === null || _b === void 0 ? void 0 : _b.onConnected) {
                        var connectedRequest = receivedEvent.data;
                        connectedRequest.context = this.GetContext(receivedEvent, request.headers.host);
                        this.eventHandler.onConnected(connectedRequest);
                    }
                    return true;
                }
                case "azure.webpubsub.sys.disconnected": {
                    if ((_c = this.eventHandler) === null || _c === void 0 ? void 0 : _c.onDisconnected) {
                        var disconnectedRequest = receivedEvent.data;
                        disconnectedRequest.context = this.GetContext(receivedEvent, request.headers.host);
                        this.eventHandler.onDisconnected(disconnectedRequest);
                    }
                    return true;
                }
                default:
                    if (type.startsWith("azure.webpubsub.user")) {
                        var eventHandler = new UserEventResponseHandler(response);
                        if (!((_d = this.eventHandler) === null || _d === void 0 ? void 0 : _d.handleUserEvent)) {
                            eventHandler.success();
                            return true;
                        }
                        var data;
                        var dataType = 'binary';
                        if (receivedEvent.data) {
                            data = receivedEvent.data;
                            dataType =
                                receivedEvent.datacontenttype === "application/json"
                                    ? 'json'
                                    : 'text';
                        }
                        else if (receivedEvent.data_base64) {
                            data = decode(receivedEvent.data_base64);
                        }
                        else {
                            throw new Error("empty data payload");
                        }
                        var userRequest = {
                            context: this.GetContext(receivedEvent, request.headers.host),
                            data: data,
                            dataType: dataType
                        };
                        this.eventHandler.handleUserEvent(userRequest, eventHandler);
                        return true;
                    }
                    else {
                        // unknown cloud events
                        return false;
                    }
            }
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