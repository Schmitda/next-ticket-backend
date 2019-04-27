import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ticket'),
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema,
    }]),
  ],
  controllers: [
    AppController,
    UserController,
  ],
  providers: [AppService, UserService],
})
export class AppModule {
}
