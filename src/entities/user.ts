import { Document } from 'mongoose';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

/*
export interface UserInterface {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface UserDBD extends Document, UserInterface {

}*/

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  password: string;
  @Column()
  email: string;

}
