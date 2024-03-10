import { Module } from "@nestjs/common";
import { GuestsController } from "./guests.controller";

@Module({
    imports: [],
    controllers: [GuestsController],
    providers: [],
    exports: [],
    })
export class GuestsRouteModule { }