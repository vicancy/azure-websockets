import { QueryCollectionFormat } from "@azure/core-http";
export const $host = {
    parameterPath: "$host",
    mapper: {
        serializedName: "$host",
        required: true,
        type: {
            name: "String"
        }
    },
    skipEncoding: true
};
export const apiVersion = {
    parameterPath: "apiVersion",
    mapper: {
        defaultValue: "2020-10-01",
        isConstant: true,
        serializedName: "api-version",
        type: {
            name: "String"
        }
    }
};
export const contentType = {
    parameterPath: "contentType",
    mapper: {
        defaultValue: "application/octet-stream",
        isConstant: true,
        serializedName: "Content-Type",
        type: {
            name: "String"
        }
    }
};
export const payloadMessage = {
    parameterPath: "payloadMessage",
    mapper: {
        serializedName: "payloadMessage",
        required: true,
        type: {
            name: "Stream"
        }
    }
};
export const contentType1 = {
    parameterPath: "contentType",
    mapper: {
        defaultValue: "text/plain",
        isConstant: true,
        serializedName: "Content-Type",
        type: {
            name: "String"
        }
    }
};
export const payloadMessage1 = {
    parameterPath: "payloadMessage",
    mapper: {
        serializedName: "payloadMessage",
        required: true,
        type: {
            name: "String"
        }
    }
};
export const contentType2 = {
    parameterPath: "contentType",
    mapper: {
        defaultValue: "application/json",
        isConstant: true,
        serializedName: "Content-Type",
        type: {
            name: "String"
        }
    }
};
export const payloadMessage2 = {
    parameterPath: "payloadMessage",
    mapper: {
        serializedName: "payloadMessage",
        required: true,
        type: {
            name: "Stream"
        }
    }
};
export const hub = {
    parameterPath: "hub",
    mapper: {
        serializedName: "hub",
        required: true,
        type: {
            name: "String"
        }
    }
};
export const excluded = {
    parameterPath: ["options", "excluded"],
    mapper: {
        serializedName: "excluded",
        type: {
            name: "Sequence",
            element: {
                type: {
                    name: "String"
                }
            }
        }
    },
    collectionFormat: QueryCollectionFormat.Multi
};
export const connectionId = {
    parameterPath: "connectionId",
    mapper: {
        serializedName: "connectionId",
        required: true,
        type: {
            name: "String"
        }
    }
};
export const reason = {
    parameterPath: ["options", "reason"],
    mapper: {
        serializedName: "reason",
        type: {
            name: "String"
        }
    }
};
export const group = {
    parameterPath: "group",
    mapper: {
        serializedName: "group",
        required: true,
        type: {
            name: "String"
        }
    }
};
export const userId = {
    parameterPath: "userId",
    mapper: {
        serializedName: "userId",
        required: true,
        type: {
            name: "String"
        }
    }
};
export const permission = {
    parameterPath: "permission",
    mapper: {
        serializedName: "permission",
        required: true,
        type: {
            name: "String"
        }
    }
};
export const targetName = {
    parameterPath: ["options", "targetName"],
    mapper: {
        serializedName: "targetName",
        type: {
            name: "String"
        }
    }
};
export const permission1 = {
    parameterPath: "permission",
    mapper: {
        serializedName: "permission",
        required: true,
        type: {
            name: "String"
        }
    }
};
export const permission2 = {
    parameterPath: "permission",
    mapper: {
        serializedName: "permission",
        required: true,
        type: {
            name: "String"
        }
    }
};
//# sourceMappingURL=parameters.js.map