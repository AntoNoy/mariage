import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { Users } from "src/entities/schemas/users";
import { AuthService } from "src/services/auth.service";
import { Login, LoginWithUuid } from "./definitions";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("init/:uuid")
  initUser(@Param('uuid') uuid: string) {
    console.log('initUser', uuid);
    return this.authService.initUser(uuid);
  }

  @Post("register")
  createUser(@Body() user: Users) {
    return this.authService.validUser(user);
  }

  @Post("login")
  login(@Body() payload: Login|LoginWithUuid) {
    if ('uuid' in payload) {
      return this.authService.loginWithUuid(payload.uuid);
    }
    return this.authService.login(payload);
  }


}
