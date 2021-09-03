// import { EventToUser } from "../participation/part.model";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./../users/user.model";

@Entity("events")
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ length: 300 })
  description: string;

  @ManyToMany((type) => User, (user) => user.events)
  users: User[];
  // @OneToMany(() => EventToUser, (eventToUser) => eventToUser.event)
  // public userToEvents!: EventToUser[];
}
