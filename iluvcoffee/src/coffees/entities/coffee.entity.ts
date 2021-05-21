import {Column, Entity, JoinTable, JoinColumn, ManyToMany, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany} from "typeorm";
import {Flavor} from "./flavor.entity"
import {Brand} from "./brand.entity"
import {Detail} from "./detail.entity"
import {Category} from "./category.entity";
import {Coffeesbaristas} from "./coffeesbaristas.entity"
import {Order} from "./order.entity";
import {getFirstSemanticOrSyntacticError} from "@typescript-eslint/typescript-estree/dist/semantic-or-syntactic-errors";

@Entity() //by default, the lowercase of the class name === sql table's name, can use @Entity('customName')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name!: string

  @Column({default: 0})
  recommendations: number

  @JoinColumn()
  @OneToOne(type=>Detail, {cascade:true, onDelete:"CASCADE"})
  detail: Detail

  @ManyToOne(type => Brand, (brand)=> Brand.name, {cascade:true})
  brand!: Brand

  @ManyToOne(()=>Category, {cascade:true})
  category: Category

  @JoinTable()
  @ManyToMany(type => Flavor, (flavor) => flavor.coffees, {cascade: true})
  flavors: Flavor[]

  // @OneToMany(()=>Coffeesbaristas, coffeesBaristas => coffeesBaristas.coffee)
  // coffeesBaristas: Coffeesbaristas[]

  // @OneToMany(()=>Order, order=>order.coffee)
  // orders: Order[]
}
