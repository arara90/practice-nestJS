import {Type} from "class-transformer";
import {IsOptional, IsPositive} from "class-validator";
import {ValidationPipe} from "@nestjs/common";

export class PaginationQueryDto {
  @IsOptional() //해당 property를 optional로 지정해서, 값이 없어도(missing or undefined) error가 발생하지 않는다.
  @IsPositive() // the number is greater than zero
  @Type(()=>Number) //string으로 들어오는 param을 number로 들어오도록한다
  limit: number

  @IsOptional() //해당 property를 optional로 지정해서, 값이 없어도(missing or undefined) error가 발생하지 않는다.
  @IsPositive() // the number is greater than zero
  @Type(()=>Number)
  offset: number
}


//Type을 global level에서 하려면 main.ts의 ValidationPipe에 transformOptions{enableImplicitConversion:true}를 설정하면 된다.
// app.useGlobalPipes(new ValidationPipe({
//   whitelist:true,
//   forbidNonWhitelisted:true,
//   transform:true,
//   transformOptions:{
//     enableImplicitConversion:true, //dto마다 @Type을 지정해 줄 필요가 없다.
//   }
// }))
