import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get()
  get() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() userToAdd: User) {
    return this.userService.save(userToAdd);
  }

  @Get(':email')
  getById(@Param('email') email: string) {
    this.userService.findById(email);
  }

  @Put(':email')
  update(@Body() userToUpdate: User, @Param('email') email: string) {
    return this.userService.update(userToUpdate, email);
  }

  @Delete(':email')
  delete(@Param('email') email: string) {
    return this.userService.delete(email);
  }

}
