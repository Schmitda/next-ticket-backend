import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './user';
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

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  update(@Body() userToUpdate: User, @Param('id') userId: string) {
    return this.userService.update(userId, userToUpdate);
  }

  @Delete(':id')
  delete(@Param('id') userId: string) {
    this.userService.delete(userId);
  }

}
