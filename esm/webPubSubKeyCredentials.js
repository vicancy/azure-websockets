// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import jwt from "jsonwebtoken";
import * as coreHttp from "@azure/core-http";
export class WebPubSubKeyCredentials {
    /**
     * Creates a new TokenCredentials object.
     *
     * @constructor
     * @param {string} key The key.
     */
    constructor(key) {
        this.key = key;
        if (!key) {
            throw new Error("token cannot be null or undefined.");
        }
    }
    /**
     * Signs a request with the Authentication header.
     *
     * @param {WebResourceLike} webResource The WebResourceLike to be signed.
     * @return {Promise<WebResourceLike>} The signed request object.
     */
    signRequest(webResource) {
        var _a;
        if (!webResource.headers)
            webResource.headers = new coreHttp.HttpHeaders();
        var url = new URL((_a = webResource.url + webResource.query) !== null && _a !== void 0 ? _a : '');
        url.port = '';
        const audience = url.toString();
        webResource.headers.set("Authorization", "Bearer " +
            jwt.sign({}, this.key, {
                audience: audience,
                expiresIn: "1h",
                algorithm: "HS256"
            }));
        return Promise.resolve(webResource);
    }
}
//# sourceMappingURL=webPubSubKeyCredentials.js.map