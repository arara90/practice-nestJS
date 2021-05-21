import {Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm"
import {Coffee} from "./coffee.entity"
import {Barista} from "./barista.entity";

@Entity()
export class Coffeesbaristas {
  @PrimaryGeneratedColumn()
  id: number
  //
  // @ManyToOne(()=>Barista, barista=>barista.coffeesBaristas)
  // barista: Barista
  //
  // @ManyToOne(()=>Coffee, coffee=>coffee.coffeesBaristas)
  // coffee: Coffee
}
