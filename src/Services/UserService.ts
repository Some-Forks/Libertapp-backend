import { Injectable } from '@nestjs/common';
import RoleConstants from 'src/Constants/RoleConstants';
import { RoleDao } from 'src/Daos/RoleDao';
import { UserDao } from 'src/Daos/UserDao';
import { StatusCodeEnums } from 'src/Enums/StatusCodeEnums';
import HttpCustomException from 'src/Exceptions/HttpCustomException';
import PasswordUtils from 'src/Helpers/Utils/PasswordFunctions';
import { Role } from 'src/Models/Entities/RoleEntity';
import { User } from 'src/Models/Entities/UserEntity';
import CreateUserRequest from 'src/Models/Request/CreateUserRequest';
import SuccessfulResponse from 'src/Models/Response/SuccessfulResponse';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(
        private readonly _userDao: UserDao,
        private readonly _roleDao: RoleDao,
    ) {}

    async create(body: CreateUserRequest): Promise<SuccessfulResponse> {
        const findUserByEmail: User = await this._userDao.findByEmail(body.email);
        if (findUserByEmail) {
            throw new HttpCustomException('User already exists', StatusCodeEnums.USER_ALREADY_EXISTS);
        }
        const findRole: Role = await this._roleDao.findByName(RoleConstants.ROL_USER);
        if (!findRole) {
            throw new HttpCustomException('Role not found', StatusCodeEnums.ROLE_NOT_FOUND);
        }
        const user: User = new User();
        user.setUuid(uuidv4());
        user.setName(body.name);
        user.setLastName(body.lastName);
        user.setEmail(body.email);
        user.setPassword(await PasswordUtils.getEncryptData(process.env.PASSWORD_USER_DEFAULT));
        user.setIsActive(true);
        user.setBoard(body.board);
        user.setRoleId(findRole);
        await this._userDao.save(user);
        return new SuccessfulResponse('User created successfully');
    }

    async findById(id: number): Promise<User> {
        const findUser: User = await this._userDao.findOneById(id);
        if (!findUser) {
            throw new HttpCustomException('User not found', StatusCodeEnums.USER_NOT_FOUND);
        }
        return findUser;
    }

    async findByEmail(email: string): Promise<User> {
        const findUser: User = await this._userDao.findByEmail(email);
        if (!findUser) {
            throw new HttpCustomException('User not found', StatusCodeEnums.USER_NOT_FOUND);
        }
        return findUser;
    }
}
