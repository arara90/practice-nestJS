import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Coffee} from "./coffee.entity"
import {Barista} from "./barista.entity";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique:true})
  name: string

  @OneToMany(()=>Barista, barista => barista.brand)
  baristas: Barista[]

  @OneToMany(()=>Coffee, coffee=>coffee.brand)
  coffees: Coffee[]
}
