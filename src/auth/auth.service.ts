import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { EncryptionService } from '../helper/encryption/encryption.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private encryptionService: EncryptionService,
  ) {
  }

  async signIn(email: string, password: string): Promise<JwtPayload> {
    const user = await this.userService.findOneByEmail(email);
    if (await this.encryptionService.verify(password, user.password)) {
      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findOneByEmail(payload.email);
  }
}
