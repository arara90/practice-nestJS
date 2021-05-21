import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsOptional} from "class-validator";
import {Barista} from "./barista.entity";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @IsOptional()
  @Column({nullable:true})
  photo: string

  @IsOptional()
  @Column({nullable:true})
  address: string

  @Column({nullable:true})
  contact!: string

  @Column({nullable:true})
  skills: string

  @JoinColumn()
  @OneToOne(()=>Barista, barista=>barista.profile, {onDelete: "CASCADE"})
  barista: Barista
}
