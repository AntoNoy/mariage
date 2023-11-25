import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteApiModule } from './routes/routes.api.module';
import { EntitiesModule } from './entities/entities.module';

console.log(__dirname  + '/../src/entities/schemas/*{.ts,.js}');
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'psswd',
      database: 'mariage',
      entities: [__dirname + '/**/entities/schemas/*{.ts,.js}'],
      synchronize: true,
      logging: ['query'],
      
    }),
    EntitiesModule,
    RouteApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
