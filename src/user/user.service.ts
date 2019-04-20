import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDBD } from './user';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class  UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDBD>) {
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findById(id: string) {
    return this.userModel.findById({ _id: id }).exec();
  }

  async save(userToSave: User) {
    const user = new this.userModel(userToSave);
    return user.save();
  }

  async update(id: string, userToUpdate: User) {
    return this.userModel.findByIdAndUpdate(id, { $set: userToUpdate }, { 'new': true }).exec();
  }

  async delete(id: string) {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

}
