import {Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import {Coffee} from "./coffee.entity"
import {Customer} from "./customer.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  // @ManyToOne(()=>Customer, customer=>customer.orders)
  // customer: Customer
  //
  // @ManyToOne(()=>Coffee, coffee=>coffee.orders)
  // coffee: Coffee
}
