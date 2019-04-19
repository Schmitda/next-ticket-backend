import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserArray } from './database.user';
import { User } from './user';

@Controller('api/user')
export class UserController {

  @Get()
  get() {
    return UserArray;
  }

  @Post()
  create(@Body() userToAdd: User) {
    UserArray.push(userToAdd);
    return userToAdd;
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return UserArray.find(user => user.id.toString() === id);
  }

  @Put(':id')
  update(@Body() userToUpdate: User, @Param('id') userId: string) {
    const user = UserArray.find(u => u.id.toString() === userId);
    for (const key in userToUpdate) {
      user[key] = userToUpdate[key];
    }
    return user;
  }

  @Delete(':id')
  delete(@Param('id') userId: string) {
    const index = UserArray.findIndex(u => u.id.toString() === userId);
    if (index > -1) {
      UserArray.splice(index, 1);
    }
    return null;
  }

}
