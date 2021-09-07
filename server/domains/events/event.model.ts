import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
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

  @ManyToMany(() => User, (user) => user.events)
  users: User[];
  @ManyToOne(() => User, (user) => user.owner_of_events)
  owner: User;
}
