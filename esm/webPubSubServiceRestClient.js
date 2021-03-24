// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import { WebPubSub, WebPubSubServiceClient as GeneratedClient } from "./generated/webPubSubServiceClient";
import { WebPubSubKeyCredentials } from "./webPubSubKeyCredentials";
import { WebPubSubServiceEndpoint } from "./webPubSubServiceEndpoint";
import jwt from "jsonwebtoken";
import { RestError, HttpPipelineLogLevel, logPolicy } from "@azure/core-http";
export class ConsoleHttpPipelineLogger {
    /**
     * Create a new ConsoleHttpPipelineLogger.
     * @param minimumLogLevel The log level threshold for what logs will be logged.
     */
    constructor(minimumLogLevel) {
        this.minimumLogLevel = minimumLogLevel;
    }
    /**
     * Log the provided message.
     * @param logLevel The HttpLogDetailLevel associated with this message.
     * @param message The message to log.
     */
    log(logLevel, message) {
        const logMessage = `${HttpPipelineLogLevel[logLevel]}: ${message}`;
        switch (logLevel) {
            case HttpPipelineLogLevel.ERROR:
                console.error(logMessage);
                break;
            case HttpPipelineLogLevel.WARNING:
                console.warn(logMessage);
                break;
            case HttpPipelineLogLevel.INFO:
                console.log(logMessage);
                break;
        }
    }
}
/**
 * Client for connecting to a SignalR hub
 */
export class WebPubSubServiceRestClient {
    constructor(connectionStringOrEndpoint, hub, options) {
        /**
         * The SignalR API version being used by this client
         */
        this.apiVersion = "2020-10-01";
        if (typeof connectionStringOrEndpoint === 'string') {
            this._endpoint = new WebPubSubServiceEndpoint(connectionStringOrEndpoint);
        }
        else {
            this._endpoint = connectionStringOrEndpoint;
        }
        this.hub = hub;
        this.serviceUrl = this._endpoint.endpoint.serviceUrl;
        this.credential = new WebPubSubKeyCredentials(this._endpoint.endpoint.key);
        this.client = new GeneratedClient(this.credential, this._endpoint.endpoint.serviceUrl.href, {
            //httpPipelineLogger: options?.dumpRequest ? new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO) : undefined,
            requestPolicyFactories: (options === null || options === void 0 ? void 0 : options.dumpRequest) ? this.getFactoryWithLogPolicy : undefined,
        });
        this.sender = new WebPubSub(this.client);
        this._servicePath = this.serviceUrl.toString();
    }
    /**
     * Auth the client connection with userId and custom claims if any
     * @param options The options that the client has
     */
    getAuthenticationToken(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = this._servicePath.endsWith("/") ? this._servicePath : this._servicePath + "/";
            const key = this.credential.key;
            const hub = this.hub;
            var clientEndpoint = endpoint.replace(/(http)(s?:\/\/)/gi, "ws$2");
            var clientUrl = `${clientEndpoint}client/hubs/${hub}`;
            const audience = `${endpoint}client/hubs/${hub}`;
            var payload = (_a = options === null || options === void 0 ? void 0 : options.claims) !== null && _a !== void 0 ? _a : {};
            var signOptions = {
                audience: audience,
                expiresIn: "1h",
                algorithm: "HS256"
            };
            if (options === null || options === void 0 ? void 0 : options.userId) {
                signOptions.subject = options === null || options === void 0 ? void 0 : options.userId;
            }
            const token = jwt.sign(payload, key, signOptions);
            const url = `${clientUrl}?access_token=${token}`;
            return {
                baseUrl: clientUrl,
                token: jwt.sign(payload, key, signOptions),
                url: url
            };
        });
    }
    getFactoryWithLogPolicy(defaultRequestPolicyFactories) {
        logPolicy;
        defaultRequestPolicyFactories.push(logPolicy());
    }
    /**
     * Check if the service is healthy
     *
     * @param options Additional options
     */
    serviceIsHealthy(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.healthApi.getHealthStatus({});
                return true;
            }
            catch (_a) {
                return false;
            }
            finally {
            }
        });
    }
    sendToAll(message, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var res = yield this.sender.sendToAll(this.hub, "application/octet-stream", message, {
                    excluded: options.excludedConnections
                });
                return this.verifyResponse(res, 202);
            }
            finally {
            }
        });
    }
    sendToUser(username, message, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var res = yield this.sender.sendToUser(this.hub, username, "application/octet-stream", message, {});
                return this.verifyResponse(res, 202);
            }
            finally {
            }
            ;
        });
    }
    sendToConnection(connectionId, message, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var res = yield this.sender.sendToConnection(this.hub, connectionId, "application/octet-stream", message, {});
                return this.verifyResponse(res, 202);
            }
            finally {
            }
        });
    }
    /**
     * Check if a specific connection is connected to this hub
     *
     * @param connectionId Connection id to check
     * @param options Additional options
     */
    hasConnection(connectionId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.webPubSubApi.checkConnectionExistence(this.hub, connectionId, {});
                return this.verifyResponse(res, 200, 404);
            }
            finally {
            }
        });
    }
    /**
     * Close a specific connection to this hub
     *
     * @param connectionId Connection id to close
     * @param options Additional options
     */
    closeConnection(connectionId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var res = yield this.client.webPubSubApi.closeClientConnection(this.hub, connectionId, {
                    reason: options.reason
                });
                return this.verifyResponse(res, 200);
            }
            finally {
            }
        });
    }
    /**
     * Remove a specific user from all groups they are joined to
     * @param userId The user id to remove from all groups
     * @param options Additional options
     */
    removeUserFromAllGroups(userId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var res = yield this.client.webPubSubApi.removeUserFromAllGroups(this.hub, userId, {});
                return this.verifyResponse(res, 202);
            }
            finally {
            }
        });
    }
    /**
     * Check if a particular group exists (i.e. has active connections).
     *
     * @param groupName The group name to check for
     * @param options Additional options
     */
    hasGroup(groupName, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.webPubSubApi.checkGroupExistence(this.hub, groupName, {});
                return this.verifyResponse(res, 200, 404);
            }
            finally {
            }
        });
    }
    /**
     * Check if a particular user is connected to this hub.
     *
     * @param username The user name to check for
     * @param options Additional options
     */
    hasUser(username, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.webPubSubApi.checkUserExistence(this.hub, username, {});
                return this.verifyResponse(res, 200, 404);
            }
            finally {
            }
        });
    }
    /**
     * Add a specific connection to this group
     *
     * @param connectionId The connection id to add to this group
     * @param options Additional options
     */
    addConnectionToGroup(groupName, connectionId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.webPubSubApi.addConnectionToGroup(this.hub, groupName, connectionId, {});
                return this.verifyResponse(res, 202);
            }
            finally {
            }
        });
    }
    /**
     * Remove a specific connection from this group
     *
     * @param connectionId The connection id to remove from this group
     * @param options Additional options
     */
    removeConnectionFromGroup(groupName, connectionId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.webPubSubApi.removeConnectionFromGroup(this.hub, groupName, connectionId, {});
                return this.verifyResponse(res, 202);
            }
            finally {
            }
        });
    }
    /**
     * Add a user to this group
     *
     * @param username The user name to add
     * @param options Additional options
     */
    addUserToGroup(groupName, username, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var res = yield this.client.webPubSubApi.addUserToGroup(this.hub, groupName, username, {});
                return this.verifyResponse(res, 202);
            }
            finally {
            }
        });
    }
    /**
     * Check if a user is in this group
     *
     * @param groupName The group name to check for
     * @param username The user name to check for
     * @param options Additional options
     */
    hasUserInGroup(groupName, username, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.webPubSubApi.checkUserExistenceInGroup(this.hub, groupName, username, {});
                return this.verifyResponse(res, 200, 404);
            }
            finally {
            }
        });
    }
    /**
     * Remove a user from this group
     *
     * @param groupName The group name to check for
     * @param username The user name to remove
     * @param options Additional options
     */
    removeUserFromGroup(groupName, username, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var res = yield this.client.webPubSubApi.removeUserFromGroup(this.hub, groupName, username, {});
                // FOR now it is still 202, we are changing the service to support 200 soon
                return this.verifyResponse(res, 200, 404);
            }
            finally {
            }
        });
    }
    publish(groupName, message, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var res = yield this.sender.sendToGroup(this.hub, groupName, "application/octet-stream", message, {
                    excluded: options.excludedConnections
                });
                return this.verifyResponse(res, 200);
            }
            finally {
            }
        });
    }
    verifyResponse(res, successStatus, failureStatus) {
        if (successStatus !== undefined && res._response.status === successStatus) {
            return true;
        }
        if (failureStatus !== undefined && res._response.status === failureStatus) {
            return false;
        }
        else {
            // this is sad - wish this was handled by autorest.
            throw new RestError(res._response.bodyAsText, undefined, res._response.status, res._response.request, res._response);
        }
    }
}
//# sourceMappingURL=webPubSubServiceRestClient.js.map