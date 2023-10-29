import { Injectable } from '@nestjs/common';
import { UserDao } from 'src/Daos/UserDao';
import { StatusCodeEnums } from 'src/Enums/StatusCodeEnums';
import HttpCustomException from 'src/Exceptions/HttpCustomException';
import PasswordUtils from 'src/Helpers/Utils/PasswordFunctions';
import { User } from 'src/Models/Entities/UserEntity';
import CreateUserRequest from 'src/Models/Request/CreateUserRequest';
import SuccessfulResponse from 'src/Models/Response/SuccessfulResponse';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(private readonly _userDao: UserDao) {}

    async create(body: CreateUserRequest): Promise<SuccessfulResponse> {
        const findUserByEmail: User = await this._userDao.findByEmail(body.email);
        if (findUserByEmail) {
            throw new HttpCustomException('User already exists', StatusCodeEnums.USER_ALREADY_EXISTS);
        }
        const user: User = new User();
        user.setUuid(uuidv4());
        user.setName(body.name);
        user.setLastName(body.lastName);
        user.setEmail(body.email);
        user.setPassword(await PasswordUtils.getEncryptData(process.env.PASSWORD_USER_DEFAULT));
        user.setIsActive(true);
        await this._userDao.save(user);
        return new SuccessfulResponse('User created successfully');
    }
}
