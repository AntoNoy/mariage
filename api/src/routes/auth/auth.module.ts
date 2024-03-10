import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { AuthController } from "./auth.controller";

@Module({
    imports: [AuthModule],
    controllers: [AuthController],
    providers: [],
    exports: [],
})
export class AuthRouteModule{}