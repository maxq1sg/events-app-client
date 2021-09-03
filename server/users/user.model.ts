import Event from "./../events/event.model";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoleType } from "../middleware/RoleGuard";
// import { EventToUser } from "../participation/part.model";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  first_name: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 30 })
  last_name: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "simple-json", nullable: true })
  add_data: { address: string; is_married: boolean };

  @Column({
    type: "enum",
    enum: ["ADMIN", "USER", "ORGANISER"],
    default: "USER",
  })
  role: RoleType;

  @ManyToMany((type) => Event, (event) => event.users, { cascade: true })
  @JoinTable({
    name: "users_and_events",
  })
  events: Event[];
  // @OneToMany(() => EventToUser, (eventToUser) => eventToUser.user)
  // public userToEvents!: EventToUser[];
}
