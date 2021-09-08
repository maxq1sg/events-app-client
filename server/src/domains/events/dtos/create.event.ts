export interface IEvent {
  name?: string;
  description?: string;
  date?: Date;
}
export interface ICreateEvent {
  owner_id:number,
  body: IEvent;
}
export interface IModifyEvent {
  body: IEvent;
  id: number;
}
