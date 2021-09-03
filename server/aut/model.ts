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

@Entity("tests")
export default class Test extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  yaeblan: string;
}
