import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDBD } from './user';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<UserDBD>) {
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.userModel.find().then(users => {
        resolve(users);
      });
    });
  }

  save(userToAdd: User) {
    const user = new this.userModel(userToAdd);
    return user.save();
  }

  findById(id: string) {
    return new Promise((resolve, reject) => {
      this.userModel.findById(id).then(users => {
        resolve(users);
      });
    });
  }

  update(userToUpdate: User, userId: string) {
    return new Promise((resolve, reject) => {
      this.userModel.findByIdAndUpdate(userId, { $set: userToUpdate }, { new: true }).then(users => {
        resolve(users);
      });
    });
  }

  delete(userId: string) {
    return new Promise((resolve, reject) => {
      this.userModel.findByIdAndRemove(userId).then(users => {
        resolve(users);
      });
    });
  }
}
