import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RouteApiModule } from "./routes/routes.api.module";
import { EntitiesModule } from "./entities/entities.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

console.log(__dirname + "/../src/entities/schemas/*{.ts,.js}");
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<
          {
            DB_USER: string;
            DB_PASSWORD: string;
            DB_DATABASE: string;
            DB_HOST: string;
            DB_PORT: number;
          },
          true
        >
      ) => ({
        type: "mysql",
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        entities: [__dirname + "/**/entities/schemas/*{.ts,.js}"],
        synchronize: true,
        logging: ["query"],
      }),
    }),
    JwtModule.register({global:true}),
    EntitiesModule,
    RouteApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
