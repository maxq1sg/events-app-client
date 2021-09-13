import { injectable } from "tsyringe";
import { EntityRepository, getConnection, Repository } from "typeorm";
import User from "./user.model";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  constructor(){
      super()
  } 
    
  findd() {
    console.log("found");
  }
  getConn() {
    const connection = getConnection();
    console.log(connection);
  }
}
