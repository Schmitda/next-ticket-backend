import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDBD } from './user';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<UserDBD>) {
  }

  findAll() {
    return this.userModel.find().exec();
  }

  save(userToAdd: User) {
    const user = new this.userModel(userToAdd);
    return user.save();
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  update(userToUpdate: User, userId: string) {
    return this.userModel.findByIdAndUpdate(userId, { $set: userToUpdate }, { new: true }).exec();
  }

  delete(userId: string) {
    return this.userModel.findByIdAndRemove(userId).exec();
  }
}
