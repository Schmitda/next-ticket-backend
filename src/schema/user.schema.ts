import { Schema } from 'mongoose';
import { UserDBD } from '../user/user';
import { EncryptionService } from '../helper/encryption/encryption.service';

export const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  id: {
    type: String,
  },
});

const encryptionService = new EncryptionService();

UserSchema.pre<UserDBD>('save', async function(cb) {
  if (this.isNew || this.isModified('password')) {
    this.password = await encryptionService.encryptPassword(this.password, 10);
    cb();
  } else {
    cb();
  }
});
