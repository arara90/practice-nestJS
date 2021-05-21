import {Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm"
import {Order} from "./order.entity";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique:true})
  username!: string

  // @OneToMany(()=>Order, order=>order.customer)
  // orders: Order[]
}
