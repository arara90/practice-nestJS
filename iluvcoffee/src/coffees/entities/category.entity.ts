import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Coffee} from "./coffee.entity"

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique:true})
  name: string

  @OneToMany(()=>Coffee, coffee=>coffee.category)
  coffees: Coffee[]
}
