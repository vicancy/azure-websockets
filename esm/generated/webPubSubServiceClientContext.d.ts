import * as coreHttp from "@azure/core-http";
import { WebPubSubServiceClientOptionalParams } from "./models";
export declare class WebPubSubServiceClientContext extends coreHttp.ServiceClient {
    $host: string;
    apiVersion?: string;
    /**
     * Initializes a new instance of the WebPubSubServiceClientContext class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param $host server parameter
     * @param options The parameter options
     */
    constructor(credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials, $host: string, options?: WebPubSubServiceClientOptionalParams);
}
//# sourceMappingURL=webPubSubServiceClientContext.d.ts.map