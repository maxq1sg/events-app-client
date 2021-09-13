export type metaType =
  | "body"
  | "cookies"
  | "params"
  | "query"
  | "user"
  | "file";

export type RequestPayload = Record<metaType, any>;
