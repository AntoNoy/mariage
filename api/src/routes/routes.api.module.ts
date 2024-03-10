import { Module } from "@nestjs/common";
import { AuthRouteModule } from "./auth/auth.module";
import { GuestsRouteModule } from "./guests/guests.module";
import { JwtUsersStrategy } from "src/auth/jwt.users.strategy";
import { JwtUsersGuard } from "src/auth/jwt.users.guard";

@Module({
  imports: [
    AuthRouteModule,
    GuestsRouteModule,
  ],
  providers: [
    JwtUsersStrategy,
    {
      provide: 'APP_GUARD',
      useClass: JwtUsersGuard
    }
  ],
})
export class RouteApiModule { }
