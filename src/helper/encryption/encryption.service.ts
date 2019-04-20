import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  async encryptPassword(password: string, strength: number = 10) {
    return bcrypt.hash(password, strength);
  }

  async verify(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
