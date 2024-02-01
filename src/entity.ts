import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({name:'cities'})
export class city{
    @PrimaryGeneratedColumn('increment')
    id:number
    @Column()
    name:string

   
   
}