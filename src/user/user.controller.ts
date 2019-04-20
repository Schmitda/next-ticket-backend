import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from '../entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Controller('api/user')
export class UserController {

  constructor(@InjectRepository(User) private readonly userRepository: MongoRepository<any>) {
  }

  @Get()
  get() {
    return new Promise((resolve, reject) => {
      this.userRepository.find().then(users => {
        resolve(users);
      });
    });
  }

  @Post()
  create(@Body() userToAdd: User) {
    const user: any = new User();
    user.firstName = userToAdd.firstName;
    user.lastName = userToAdd.lastName;
    user.email = userToAdd.email;
    user.password = userToAdd.password;
    return this.userRepository.save(user);
  }

  @Get(':id')
  getById(@Param('id') id: any) {
    return new Promise((resolve, reject) => {
      this.userRepository.findOne({ _id: new ObjectId(id) }).then(users => {
        resolve(users);
      });
    });
  }

  @Put(':id')
  update(@Body() userToUpdate: User, @Param('id') userId: string) {
    return new Promise((resolve, reject) => {
      this.userRepository.findOneAndUpdate({ _id: new ObjectId(userId) }, { $set: userToUpdate }).then(user => {
        resolve(user);
      });
    });
  }

  @Delete(':id')
  delete(@Param('id') userId: string) {
    return new Promise((resolve, reject) => {
      this.userRepository.findOneAndDelete({ _id: new ObjectId(userId) }).then(users => {
        resolve(users);
      });
    });
  }

}
