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

  @Column({default: 0})
  recommendations: number;

  @JoinTable()
  @ManyToMany(type=>Flavor,
    (flavor)=>flavor.coffees,
    {cascade: []}
  )
  flavors: Promise<Flavor[]>
}

