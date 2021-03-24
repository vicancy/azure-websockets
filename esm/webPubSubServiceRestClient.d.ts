import { WebPubSubServiceEndpoint } from "./webPubSubServiceEndpoint";
import { HttpRequestBody, HttpPipelineLogLevel, HttpPipelineLogger } from "@azure/core-http";
/**
 * Options for auth a client
 */
export interface GetAuthenticationTokenOptions {
    /**
     * The userId for the client
     */
    userId?: string;
    /**
     * The custom claims for the client, e.g. role
     */
    claims?: {
        [key: string]: string[];
    };
}
/**
 * Response for the authed client, including the url and the jwt token
 */
export interface GetAuthenticationTokenResponse {
    /**
     * The URL client connects to
     */
    baseUrl: string;
    /**
     * The JWT token the client uses to connect
     */
    token: string;
    /**
     * The URL client connects to with access_token query string
     */
    url: string;
}
export interface OperationOptions {
    apiVersion?: string;
}
/**
 * Options for closing a connection to a hub.
 */
export interface CloseConnectionOptions extends OperationOptions {
    /**
     * Reason the connection is being closed.
     */
    reason?: string;
}
export interface ClientAuthOptions {
    userId?: string;
    claims?: {
        [key: string]: string[];
    };
}
export interface ClientAuthResponse {
    url: string;
    token: string;
}
/**
 * Options for sending messages to hubs, groups, users, or connections.
 */
export interface HubBroadcastOptions extends OperationOptions {
    /**
     * Connection ids to exclude from receiving this message.
     */
    excludedConnections?: string[];
}
export interface WebPubSubServiceRestClientOptions {
    dumpRequest?: boolean;
}
export declare class ConsoleHttpPipelineLogger implements HttpPipelineLogger {
    minimumLogLevel: HttpPipelineLogLevel;
    /**
     * Create a new ConsoleHttpPipelineLogger.
     * @param minimumLogLevel The log level threshold for what logs will be logged.
     */
    constructor(minimumLogLevel: HttpPipelineLogLevel);
    /**
     * Log the provided message.
     * @param logLevel The HttpLogDetailLevel associated with this message.
     * @param message The message to log.
     */
    log(logLevel: HttpPipelineLogLevel, message: string): void;
}
/**
 * Client for connecting to a SignalR hub
 */
export declare class WebPubSubServiceRestClient {
    private readonly client;
    private readonly sender;
    private credential;
    /**
     * The name of the hub this client is connected to
     */
    readonly hub: string;
    /**
     * The SignalR API version being used by this client
     */
    readonly apiVersion: string;
    /**
     * The endpoint this client is connected to
     */
    serviceUrl: URL;
    private _endpoint;
    private _servicePath;
    constructor(connectionStringOrEndpoint: string | WebPubSubServiceEndpoint, hub: string, options?: WebPubSubServiceRestClientOptions);
    /**
     * Auth the client connection with userId and custom claims if any
     * @param options The options that the client has
     */
    getAuthenticationToken(options?: GetAuthenticationTokenOptions): Promise<GetAuthenticationTokenResponse>;
    private getFactoryWithLogPolicy;
    /**
     * Check if the service is healthy
     *
     * @param options Additional options
     */
    serviceIsHealthy(options?: OperationOptions): Promise<boolean>;
    /**
     * Broadcast a text message to all connections on this hub.
     *
     * @param message The message to send
     * @param options Additional options
     */
    sendToAll(message: string, options?: HubBroadcastOptions): Promise<boolean>;
    /**
     * Broadcast a binary message to all connections on this hub.
     *
     * @param message The message to send
     * @param options Additional options
     */
    sendToAll(message: Blob | ArrayBuffer | ArrayBufferView, options?: HubBroadcastOptions): Promise<boolean>;
    /**
     * Send a text message to a specific user
     *
     * @param username User name to send to
     * @param message The message to send
     * @param options Additional options
     */
    sendToUser(username: string, message: string, options?: OperationOptions): Promise<boolean>;
    /**
     * Send a binary message to a specific user
     *
     * @param username The user name to send to
     * @param message The binary message to send
     * @param options Additional options
     */
    sendToUser(username: string, message: HttpRequestBody, options?: OperationOptions): Promise<boolean>;
    /**
     * Send a text message to a specific connection
     *
     * @param connectionId Connection id to send to
     * @param message The text message
     * @param options Additional options
     */
    sendToConnection(connectionId: string, message: string, options?: OperationOptions): Promise<boolean>;
    /**
     * Send a binary message to a specific connection
     *
     * @param connectionId Connection id to send to
     * @param message The binary message
     * @param options Additional options
     */
    sendToConnection(connectionId: string, message: HttpRequestBody, options?: OperationOptions): Promise<boolean>;
    /**
     * Check if a specific connection is connected to this hub
     *
     * @param connectionId Connection id to check
     * @param options Additional options
     */
    hasConnection(connectionId: string, options?: OperationOptions): Promise<boolean>;
    /**
     * Close a specific connection to this hub
     *
     * @param connectionId Connection id to close
     * @param options Additional options
     */
    closeConnection(connectionId: string, options?: CloseConnectionOptions): Promise<boolean>;
    /**
     * Remove a specific user from all groups they are joined to
     * @param userId The user id to remove from all groups
     * @param options Additional options
     */
    removeUserFromAllGroups(userId: string, options?: CloseConnectionOptions): Promise<boolean>;
    /**
     * Check if a particular group exists (i.e. has active connections).
     *
     * @param groupName The group name to check for
     * @param options Additional options
     */
    hasGroup(groupName: string, options?: OperationOptions): Promise<boolean>;
    /**
     * Check if a particular user is connected to this hub.
     *
     * @param username The user name to check for
     * @param options Additional options
     */
    hasUser(username: string, options?: OperationOptions): Promise<boolean>;
    /**
     * Add a specific connection to this group
     *
     * @param connectionId The connection id to add to this group
     * @param options Additional options
     */
    addConnectionToGroup(groupName: string, connectionId: string, options?: OperationOptions): Promise<boolean>;
    /**
     * Remove a specific connection from this group
     *
     * @param connectionId The connection id to remove from this group
     * @param options Additional options
     */
    removeConnectionFromGroup(groupName: string, connectionId: string, options?: OperationOptions): Promise<boolean>;
    /**
     * Add a user to this group
     *
     * @param username The user name to add
     * @param options Additional options
     */
    addUserToGroup(groupName: string, username: string, options?: OperationOptions): Promise<boolean>;
    /**
     * Check if a user is in this group
     *
     * @param groupName The group name to check for
     * @param username The user name to check for
     * @param options Additional options
     */
    hasUserInGroup(groupName: string, username: string, options?: OperationOptions): Promise<boolean>;
    /**
     * Remove a user from this group
     *
     * @param groupName The group name to check for
     * @param username The user name to remove
     * @param options Additional options
     */
    removeUserFromGroup(groupName: string, username: string, options?: OperationOptions): Promise<boolean>;
    /**
     * Send a text message to every connection in this group
     *
     * @param groupName The group name to check for
     * @param message The message to send
     * @param options Additional options
     */
    publish(groupName: string, message: string, options?: HubBroadcastOptions): Promise<boolean>;
    /**
     * Send a binary message to every connection in this group
     *
     * @param groupName The group name to check for
     * @param message The binary message to send
     * @param options Additional options
     */
    publish(groupName: string, message: HttpRequestBody, options?: HubBroadcastOptions): Promise<boolean>;
    private verifyResponse;
}
//# sourceMappingURL=webPubSubServiceRestClient.d.ts.map