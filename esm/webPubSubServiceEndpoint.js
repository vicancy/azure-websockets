// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import jwt from "jsonwebtoken";
import { URL } from "url";
export class WebPubSubServiceEndpoint {
    /**
     * Creates a new WebPubSubServiceEndpoint object.
     *
     * @constructor
     * @param {string} conn The Connection String.
     * @param {string} hub The Hub
     */
    constructor(conn) {
        this.endpoint = this.getServiceEndpoint(conn);
    }
    clientNegotiate(hub, options) {
        var _a;
        var clientUrl = `${this.endpoint.websocketHost}client/hubs/${hub}`;
        const audience = `${this.endpoint.audience}client/hubs/${hub}`;
        var key = this.endpoint.key;
        var payload = (_a = options === null || options === void 0 ? void 0 : options.claims) !== null && _a !== void 0 ? _a : {};
        var signOptions = {
            audience: audience,
            expiresIn: "1h",
            algorithm: "HS256",
        };
        if (options === null || options === void 0 ? void 0 : options.userId) {
            signOptions.subject = options === null || options === void 0 ? void 0 : options.userId;
        }
        return {
            url: clientUrl,
            token: jwt.sign(payload, key, signOptions),
        };
    }
    getServiceEndpoint(conn) {
        var endpoint = this.parseConnectionString(conn);
        if (!endpoint) {
            throw new Error("Invalid connection string: " + conn);
        }
        return endpoint;
    }
    parseConnectionString(conn) {
        const em = /Endpoint=(.*?)(;|$)/g.exec(conn);
        if (!em)
            return null;
        const endpoint = em[1];
        const km = /AccessKey=(.*?)(;|$)/g.exec(conn);
        if (!km)
            return null;
        const key = km[1];
        if (!endpoint || !key)
            return null;
        const pm = /Port=(.*?)(;|$)/g.exec(conn);
        const port = pm == null ? '' : pm[1];
        var url = new URL(endpoint);
        var originalProtocol = url.protocol;
        url.protocol = originalProtocol === 'http:' ? 'ws:' : 'wss:';
        const audience = url.toString();
        url.port = port;
        var websocketHost = url.toString();
        url.protocol = originalProtocol;
        return {
            websocketHost: websocketHost,
            serviceUrl: url,
            audience: audience,
            key: key,
        };
    }
}
//# sourceMappingURL=webPubSubServiceEndpoint.js.map