export interface ICreateEvent {
  name?: string;
  description?: string;
  date?: Date;
}
export interface IModifyEvent {
  body: ICreateEvent;
  id: number;
}
