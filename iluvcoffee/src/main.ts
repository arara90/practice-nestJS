import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true,
    transformOptions:{
      enableImplicitConversion:true, //dto마다 @Type을 지정해 줄 필요가 없다.
    }
  }))
  await app.listen(3000);
}
bootstrap();
