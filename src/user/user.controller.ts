import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User, UserDBD } from './user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('api/user')
export class UserController {

  constructor(@InjectModel('User') private readonly userModel: Model<UserDBD>) {
  }

  @Get()
  async get() {
    const users = await this.userModel.find().exec();
    return users;
  }

  @Post()
  async create(@Body() userToAdd: User) {
    const user = new this.userModel(userToAdd);
    return user.save();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  @Put(':id')
  async update(@Body() userToUpdate: User, @Param('id') userId: string) {
    const users = await this.userModel.findByIdAndUpdate(userId, { $set: userToUpdate }, { 'new': true }).exec();
    return users;
  }

  @Delete(':id')
  async delete(@Param('id') userId: string) {
    await this.userModel.findByIdAndRemove(userId).exec();
    return null;
  }

}
