export type metaType = "body" | "cookies" | "params" | "user" | "query";

export type RequestPayload = Record<metaType, any>;
