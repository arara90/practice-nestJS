import {Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Coffee} from "./coffee.entity";

@Entity()
export class Detail {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  photo: string

  @Column()
  ingredients: string

  @Column()
  desc: string
}
