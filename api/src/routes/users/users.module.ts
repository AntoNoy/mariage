import { Module } from "@nestjs/common";
import { EntitiesModule } from "src/entities/entities.module";
import { UsersController } from "./users.controller";

@Module({
    imports: [EntitiesModule],
    controllers: [UsersController],
})
export class UsersRouteModule{}