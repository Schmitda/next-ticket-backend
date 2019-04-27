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

  findById(id: string) {
    return this.userModel.findById({ _id: id }).exec();
  }

  addRefresherToken(email: string, token: string) {
    return this.userModel.findOneAndUpdate({ email }, { $set: { $push: { refresherTokens: token } } }).exec();
  }

  findUserByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  save(userToSave: User) {
    const user = new this.userModel(userToSave);
    return user.save();
  }

  update(id: string, userToUpdate: User) {
    return this.userModel.findByIdAndUpdate(id, { $set: userToUpdate }, { new: true }).exec();
  }

  delete(id: string) {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  getUserByRefresherToken(refresherToken: string) {
    return this.userModel.findOne({ refresherTokens: refresherToken }).exec();
  }
}
