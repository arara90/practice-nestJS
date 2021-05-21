import {Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne} from "typeorm"
import {Brand} from "./brand.entity"
import {Coffeesbaristas} from "./coffeesbaristas.entity";
import {Profile} from "./profile.entity";

@Entity()
export class Barista {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToOne(() => Profile, profile=>profile.barista, {cascade:true})
  profile: Profile

  @ManyToOne(()=>Brand, {cascade: true})
  brand: Brand //소속회사

  // //양방향(조인 테이블 entity사용)
  // @OneToMany(()=>Coffeesbaristas, coffeesbaristas => coffeesbaristas.barista)
  // coffeesBaristas: Coffeesbaristas[]
}
