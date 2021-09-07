// import { EventToUser } from "../participation/part.model";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
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

  @Column()
  name: string;

  @Column({ length: 300, nullable: true })
  description: string;

  @CreateDateColumn()
  date: Date;

  @ManyToMany((type) => User, (user) => user.events)
  users: User[];
}
