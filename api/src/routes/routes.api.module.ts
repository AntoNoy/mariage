import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { ServicesModule } from "src/services/services.module";

@Module({
    imports: [ServicesModule],
    controllers: [AuthController],
})
export class RouteApiModule {}