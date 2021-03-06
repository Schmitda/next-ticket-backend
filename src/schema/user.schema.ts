import { Schema } from 'mongoose';

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
