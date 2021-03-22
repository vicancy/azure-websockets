// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Error code for the response
 */
export var ErrorCode;
(function (ErrorCode) {
    /**
     * Unauthorized response to service using 401.
     */
    ErrorCode[ErrorCode["unauthorized"] = 401] = "unauthorized";
    /**
     * Server error response to service using 500.
     */
    ErrorCode[ErrorCode["serverError"] = 500] = "serverError";
    /**
     * User error response to service using 400.
     */
    ErrorCode[ErrorCode["userError"] = 400] = "userError";
})(ErrorCode || (ErrorCode = {}));
/**
 * The data type of the payload data.
 */
export var PayloadDataType;
(function (PayloadDataType) {
    /**
     * The binary format.
     */
    PayloadDataType[PayloadDataType["binary"] = 0] = "binary";
    /**
     * The plain text format.
     */
    PayloadDataType[PayloadDataType["text"] = 1] = "text";
    /**
     * The JSON format.
     */
    PayloadDataType[PayloadDataType["json"] = 2] = "json";
})(PayloadDataType || (PayloadDataType = {}));
//# sourceMappingURL=webPubSubCloudEventsProtocols.js.map