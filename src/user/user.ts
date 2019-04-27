import { Document } from 'mongoose';

export interface UserInterface {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  refresherTokens: string[];
}

export interface UserDBD extends Document, UserInterface {

}

export class User {
  firstName: string;
  lastName: string;
  password: string;
  email: string;

  constructor(firstName: string, lastName: string, password: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
  }
}
