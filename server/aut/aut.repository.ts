import Test from "./model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Test)
export default class TestRepository extends Repository<Event> {}
