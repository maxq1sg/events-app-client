import { Request } from "express";

// export enum MetaTypes {
//   BODY = "body",
//   QUERY = "query",
//   PARAMS = "params",
// }
export type metaType = "body" | "cookies" | "params" | "user" | "query";

export type RequestPayload = Record<metaType, any>;
