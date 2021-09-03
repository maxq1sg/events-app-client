// import Event from "../events/event.model";
// import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import User from "../users/user.model";

// @Entity()
// export class EventToUser {
//   @PrimaryGeneratedColumn()
//   public id: number;

//   @Column()
//   public event_id: number;

//   @Column()
//   public user_id: number;

//   @Column()
//   public comment: string;

//   @ManyToOne(() => User, (user) => user.userToEvents)
//   public user: User;

//   @ManyToOne(() => Event, (event) => event.userToEvents)
//   public event: Event;
// }
