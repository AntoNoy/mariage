import { Module } from "@nestjs/common";
import { GuestsController } from "./guests.controller";
import { EntitiesModule } from "src/entities/entities.module";

@Module({
    imports: [EntitiesModule],
    controllers: [GuestsController],
    providers: [],
    exports: [],
    })
export class GuestsRouteModule { }