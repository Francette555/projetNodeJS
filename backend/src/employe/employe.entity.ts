import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employe')
export class Employe {
  @PrimaryGeneratedColumn()
  numEmp: number;

  @Column({ type: 'varchar', length: 100 })
  nom: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salaire: number;
}