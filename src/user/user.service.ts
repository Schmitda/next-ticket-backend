import { Injectable } from '@nestjs/common';
import { UserArray } from './database.user';
import { User } from './user';

@Injectable()
export class UserService {
  findAll() {
    return UserArray;
  }

  findById(id: string) {
    return UserArray.find(user => user.id.toString() === id);
  }

  save(userToSave: User) {
    UserArray.push(userToSave);
    return userToSave;
  }

  update(id: string, userToUpdate: User) {
    const user = UserArray.find(u => u.id.toString() === id);
    for (const key in userToUpdate) {
      user[key] = userToUpdate[key];
    }
    return user;
  }

  delete(id: string) {
    const index = UserArray.findIndex(u => u.id.toString() === id);
    if (index > -1) {
      UserArray.splice(index, 1);
    }
    return null;
  }

}
