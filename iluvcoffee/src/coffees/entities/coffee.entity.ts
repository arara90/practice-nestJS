import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Flavor} from "./flavor.entity";

@Entity() //by default, the lowercase of the class name === sql table's name, can use @Entity('customName')
export class Coffee{
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  name: string

  @Column()
  brand: string

  @JoinTable()
  @ManyToMany(type=>Flavor,
    (flavor)=>flavor.coffees,
    {cascade: true}
  )
  flavors: Flavor[]
}
//related Enrriry, which property needss tto be selected 'inverse side'
//flavors - coffee에서 owner는 커피다. Jointable coffee에서 명시했으니까.
