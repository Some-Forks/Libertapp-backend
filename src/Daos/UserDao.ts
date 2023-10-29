import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Models/Entities/UserEntity';
import { Repository } from 'typeorm';

@Injectable()
export class UserDao {
    constructor(@InjectRepository(User) private readonly _userRepository: Repository<User>) {}

    async save(user: User): Promise<void> {
        await this._userRepository.save(user);
    }

    async findOneById(id: number): Promise<User> {
        const query = this._userRepository.createQueryBuilder('user').where('user.id = :id', { id: id }).getOne();
        return query;
    }

    async findByEmail(email: string): Promise<User> {
        const query = this._userRepository.createQueryBuilder('user').where('user.email = :email', { email: email }).getOne();
        return query;
    }
}
