import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';


@Module({
  imports: [
    /*  MongooseModule.forRoot('mongodb://localhost/ticket'),
      MongooseModule.forFeature([{
        name: 'User',
        schema: UserSchema,
      }]),*/
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'test',
      entities: [__dirname + '/**/user{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [
    AppController,
    UserController,
  ],
  providers: [AppService],
})
export class AppModule {
}
