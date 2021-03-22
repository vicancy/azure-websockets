import * as coreHttp from "@azure/core-http";
import { WebPubSubServiceClient } from "../webPubSubServiceClient";
/**
 * Class representing a HealthApi.
 */
export declare class HealthApi {
    private readonly client;
    /**
     * Initialize a new instance of the class HealthApi class.
     * @param client Reference to the service client
     */
    constructor(client: WebPubSubServiceClient);
    /**
     * Get service health status.
     * @param options The options parameters.
     */
    getHealthStatus(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
}
//# sourceMappingURL=healthApi.d.ts.map