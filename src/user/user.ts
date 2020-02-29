import { Document } from 'mongoose';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @Column({type: 'varchar', length: 255})
  firstName: string;

  @Column({type: 'varchar', length: 255})
  lastName: string;

  @Column({type: 'char', length: 60})
  password: string;

  @PrimaryColumn()
  email: string;

}
