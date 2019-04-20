import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User, UserDBD } from './user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('api/user')
export class UserController {

  constructor(@InjectModel('User') private readonly userModel: Model<UserDBD>) {
  }

  @Get()
  get() {
    return new Promise((resolve, reject) => {
      this.userModel.find().then(users => {
        resolve(users);
      });
    });
  }

  @Post()
  create(@Body() userToAdd: User) {
    const user = new this.userModel(userToAdd);
    return user.save();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return new Promise((resolve, reject) => {
      this.userModel.findById(id).then(users => {
        resolve(users);
      });
    });
  }

  @Put(':id')
  update(@Body() userToUpdate: User, @Param('id') userId: string) {
    return new Promise((resolve, reject) => {
      this.userModel.findByIdAndUpdate(userId, { $set: userToUpdate }, { 'new': true }).then(users => {
        resolve(users);
      });
    });
  }

  @Delete(':id')
  delete(@Param('id') userId: string) {
    return new Promise((resolve, reject) => {
      this.userModel.findByIdAndRemove(userId).then(users => {
        resolve(users);
      });
    });
  }

}
