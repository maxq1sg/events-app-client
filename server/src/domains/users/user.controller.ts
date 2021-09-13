import { EPermission } from './../permisssions/types/index';
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
import PermissionGuard from '../../middleware/PermissionGuard';

@Service()
class UserController {
  private connection: Connection;
  public router: Router;
  constructor(private readonly userService: UserService) {
    this.router.post("/", this.createUser);
    this.router.post("/seed", this.seedUsers);
    this.router.get("/:id", AuthGuard, this.getEventsOfSingleUser);
    this.router.delete("/:id", this.deleteUserById);
    this.router.get(
      "/",
      AuthGuard,
      PermissionGuard(EPermission.SHOW_USERS_LIST),
      this.getAllUsers
    );
    this.router.put("/role", this.changeUsersRole);
  }

  @Route()
  async deleteUserById(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.userService.deleteUser(+id);
    return { message: `Удалено пользователей: ${data.affected}` };
  }
  //fix
  @Route()
  async getEventsOfSingleUser(req: CustomRequest, res: Response) {
    const { id: idFromClient } = req.params;
    const { id: idFromToken } = req.user;

    if (+idFromClient !== idFromToken) {
      throw new CustomError(
        HttpStatusCode.FORBIDDEN,
        "У вас нет доступа для просмотра!"
      );
    }
    const events = await this.userService.getEventsOfSingleUser(+idFromToken);
    return events;
  }

  @Route()
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const data = await this.userService.findAllUsers();
    return data;
  }

  @Route()
  async createUser(req: Request, res: Response) {
    const {
      first_name,
      last_name,
      add_data,
      password,
      email,
      role,
    }: CreateUser = req.body;
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

  @Route()
  async seedUsers(req: Request, res: Response) {
    const identifiers = await UserService.seedUsers();
    return identifiers;
  }

  @Route()
  async changeUsersRole(req: Request, res: Response) {
    const { role_id, user_id }: ChangeUsersRole = req.body;
    const modifiedUser = await this.userService.changeUsersRole({
      role_id,
      user_id,
    });
    return modifiedUser;
  }
}
export default Container.get(UserController);
