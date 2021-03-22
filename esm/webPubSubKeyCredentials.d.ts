import * as coreHttp from "@azure/core-http";
export declare class WebPubSubKeyCredentials implements coreHttp.ServiceClientCredentials {
    key: string;
    /**
     * Creates a new TokenCredentials object.
     *
     * @constructor
     * @param {string} key The key.
     */
    constructor(key: string);
    /**
     * Signs a request with the Authentication header.
     *
     * @param {WebResourceLike} webResource The WebResourceLike to be signed.
     * @return {Promise<WebResourceLike>} The signed request object.
     */
    signRequest(webResource: coreHttp.WebResourceLike): Promise<coreHttp.WebResourceLike>;
}
//# sourceMappingURL=webPubSubKeyCredentials.d.ts.map