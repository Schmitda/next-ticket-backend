import { Injectable } from '@nestjs/common';
import { User } from './user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  findAll() {
    return this.userRepository.find();
  }

  save(userToAdd: User) {
    return this.userRepository.save(userToAdd);
  }

  findById(email: string) {
    return this.userRepository.findOne(email);
  }

  update(userToUpdate: User, email: string) {
    return this.userRepository.update(email,  userToUpdate );
  }

  delete(email: string) {
    return this.userRepository.delete(email);
  }

}
