import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config'
import * as Joi from "@hapi/joi";
import appConfig from './config/app.config'

@Module({
  imports: [
    CoffeesModule
    , ConfigModule.forRoot({load: [appConfig],})
    , TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
        logging: true
      }),
    })
    , CoffeeRatingModule
    , DatabaseModule
    // , ConfigModule.forRoot({
    //   validationSchema: Joi.object({
    //     DATABASE_HOST: Joi.required(),
    //     DATABASE_PORT: Joi.number().default(5432),
    //   })
    // })
    // , TypeOrmModule.forRoot({
    //   type: 'postgres', // type of our database
    //   port: +process.env.DATABASE_PORT,
    //   host: process.env.DATABASE_HOST,
    //   username: process.env.DATABASE_USER,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_NAME,
    //   autoLoadEntities: true, // models will be loaded automatically
    //   synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    //   })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
