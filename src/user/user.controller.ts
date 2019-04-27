import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { User } from './user';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import * as uuid from 'uuid';
import { JwtPayload } from '../auth/jwt-payload.interface';
import { CurrentUser } from '../decorators/current-user.decorator';

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
    const refresherToken = uuid.v4();
    this.userService.addRefresherToken(email, refresherToken);
    return {
      token: 'JWT ' + this.jwtService.sign(jwtPayload, {
        expiresIn: 300,
      }), refresherToken,
    };
  }

  @Post('token')
  async token(@Body('username') username: string, @Body('refresherToken') refresherToken) {
    const user = await this.userService.findUserByUsername(username);
    if (user.refresherTokens.includes(refresherToken)) {
      const payload: JwtPayload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      return this.jwtService.sign(payload, {
        expiresIn: 300,
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  @Post('blacklist')
  async blacklist(@Body('refresherToken') refresherToken, @CurrentUser() currentUser: JwtPayload) {
    const user = await this.userService.getUserByRefresherToken(refresherToken);
    if (user.email === currentUser.email) {
      const index = user.refresherTokens.findIndex(refresherToken);
      if (index > -1) {
        user.refresherTokens.splice(index, 1);
        return await this.userService.update(user.id, user);
      }
    } else {
      throw new BadRequestException();
    }
  }

  @Get()
  @UseGuards(AuthGuard())
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
  async delete(@Param('id') userId: string) {
    return this.userService.delete(userId);
  }

}
