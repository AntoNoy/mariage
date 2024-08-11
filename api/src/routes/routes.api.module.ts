import { Module } from "@nestjs/common";
import { AuthRouteModule } from "./auth/auth.module";
import { GuestsRouteModule } from "./guests/guests.module";
import { JwtUsersStrategy } from "src/auth/jwt.users.strategy";
import { JwtUsersGuard } from "src/auth/jwt.users.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { UsersRouteModule } from "./users/users.module";

@Module({
  imports: [
    AuthRouteModule,
    GuestsRouteModule,
    UsersRouteModule
  ],
  providers: [
    JwtUsersStrategy,
    {
      provide: 'APP_GUARD',
      useClass: JwtUsersGuard
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard
    }
  ],
})
export class RouteApiModule { }
