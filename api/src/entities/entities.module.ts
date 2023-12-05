import { Global, Module } from "@nestjs/common";
import { EntitiesService } from "./entities.service";
import { Guests } from "./schemas/guests";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./schemas/users";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Guests]),
  ],
  providers: [EntitiesService],
  exports: [EntitiesService],
})
export class EntitiesModule {}
