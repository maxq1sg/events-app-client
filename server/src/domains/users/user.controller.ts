import { EPermission } from "./../permisssions/types/index";
import { HttpStatusCode } from "./../../errors/HttpStatusCodes";
import { NextFunction, Request, Response, Router } from "express";
import UserService from "./user.service";
import CustomRequest from "../../types/CustomRequest";
import CustomError from "../../errors/errorTypes/CustomError";
import Route from "../../middleware/RouteDecorator";
import { container, injectable } from "tsyringe";
import { ChangeUsersRole, CreateUser } from "./dtos/user-dto";
import { Connection, getConnection } from "typeorm";
import Container, { Service } from "typedi";
import AuthGuard from "../../middleware/AuthGuard";
import PermissionGuard from "../../middleware/PermissionGuard";
import { RequestPayload } from "../../middleware/types/MetaType";

@Service()
class UserController {
  public router: Router;
  constructor(private readonly userService: UserService) {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes = () => {
    this.router.post("/", this.createUser);
    this.router.post("/seed", this.seedUsers);
    this.router.get("/:id/events", AuthGuard, this.getEventsOfSingleUser);
    this.router.delete("/:id", this.deleteUserById);
    this.router.get("/:id", this.getSingleUser);
    this.router.get(
      "/",
      AuthGuard,
      PermissionGuard(EPermission.SHOW_USERS_LIST),
      this.getAllUsers
    );
    this.router.put("/role", this.changeUsersRole);
  };

  @Route(["params"])
  async getSingleUser(payload: RequestPayload) {
    const { id } = payload.params;
    const user = await this.userService.getSingleUser(+id);
    return user;
  }

  @Route(["params"])
  async deleteUserById(payload: RequestPayload) {
    const { id } = payload.params;
    const data = await this.userService.deleteUser(+id);
    return { message: `Удалено пользователей: ${data.affected}` };
  }
  //fix
  @Route(["params", "user"])
  async getEventsOfSingleUser(payload: RequestPayload) {
    const { id: idFromClient } = payload.params;
    const { id: idFromToken } = payload.user;
    console.log(idFromClient, idFromToken);
    if (+idFromClient !== idFromToken) {
      throw new CustomError(
        HttpStatusCode.FORBIDDEN,
        "У вас нет доступа для просмотра!"
      );
    }
    const events = await this.userService.getEventsOfSingleUser(+idFromToken);
    return events;
  }

  @Route([])
  async getAllUsers(payload: RequestPayload) {
    const data = await this.userService.findAllUsers();
    return data;
  }

  @Route(["body"])
  async createUser(payload: RequestPayload) {
    const {
      first_name,
      last_name,
      add_data,
      password,
      email,
      role,
    }: CreateUser = payload.body;
    const newUser = await this.userService.createUser({
      first_name,
      last_name,
      add_data,
      password,
      email,
      role,
    });
    return newUser;
  }

  @Route([])
  async seedUsers() {
    const identifiers = await UserService.seedUsers();
    return identifiers;
  }

  @Route(["body"])
  async changeUsersRole(payload: RequestPayload) {
    const { role_id, user_id }: ChangeUsersRole = payload.body;
    const modifiedUser = await this.userService.changeUsersRole({
      role_id,
      user_id,
    });
    return modifiedUser;
  }
}
export default UserController;
