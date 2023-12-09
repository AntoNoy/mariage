import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { Users } from "src/entities/schemas/users";
import { AuthService } from "src/services/auth.service";

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
}
