import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { Module } from '@nestjs/common';
import { EncryptionService } from '../helper/encryption/encryption.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserSchema } from '../schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema,
    }]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    EncryptionService,
    JwtAuthGuard,
    UserService,
  ],
  exports: [
    PassportModule,
    AuthService,
  ],
})
export class AuthModule {
}
