import { Module } from "@nestjs/common";
import { GuestsController } from "./guests.controller";
import { EntitiesModule } from "src/entities/entities.module";
import { NotificationService } from "src/services/notifications.service";

@Module({
    imports: [EntitiesModule],
    controllers: [GuestsController],
    providers: [NotificationService],
    exports: [],
    })
export class GuestsRouteModule { }