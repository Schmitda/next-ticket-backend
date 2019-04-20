import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from './user';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';


@Controller('api/user')
export class UserController {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
  }

  @Post('login')
  async login(@Body('password') password, @Body('email') email) {
    const jwtPayload = await this.authService.signIn(email, password);
    return { token: 'JWT ' + this.jwtService.sign(jwtPayload) };
  }

  @Get()
  @UseGuards(AuthGuard())
  async get() {
    const users = await this.userService.findAll();
    return users;
  }

  @Post()
  async create(@Body() userToAdd: User) {
    const user = await this.userService.save(userToAdd);
    return user;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return user;
  }

  @Put(':id')
  async update(@Body() userToUpdate: User, @Param('id') userId: string) {
    const users = await this.userService.update(userId, userToUpdate);
    return users;
  }

  @Delete(':id')
  async delete(@Param('id') userId: string) {
    await this.userService.delete(userId);
    return null;
  }

}
