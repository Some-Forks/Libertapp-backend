import { Injectable, UnauthorizedException } from '@nestjs/common';
import Payload from 'src/Models/Auth/Payload';
import AuthResponse from 'src/Models/Response/Auth/AuthResponse';
import LoginRequest from 'src/Models/Request/AuthController/LoginRequest';
import { User } from 'src/Models/Entities/UserEntity';
import PasswordUtils from 'src/Helpers/Utils/PasswordFunctions';
import HttpCustomException from 'src/Exceptions/HttpCustomException';
import { StatusCodeEnums } from 'src/Enums/StatusCodeEnums';
import { UserDao } from 'src/Daos/UserDao';
import { JwtSecurityService } from './Security/JwtSecurityService';
import { UserService } from './UserService';

@Injectable()
export class AuthService {
    constructor(
        private readonly _jwtService: JwtSecurityService,
        private readonly _userService: UserService,
        private readonly _userDao: UserDao,
    ) {}

    async login(data: LoginRequest): Promise<AuthResponse> {
        const findUser: User = await this._userService.findByEmail(data.email);
        if (!findUser || !(await PasswordUtils.getEncryptCompare(data.password, findUser.getPassword()))) {
            throw new HttpCustomException(`The username or password is invalid`, StatusCodeEnums.INVALID_PASSWORD_USERNAME);
        }
        const accessToken: string = await this._jwtService.generateAccessToken(findUser.id, findUser.getRoleId().getName());
        const refreshToken: string = await this._jwtService.generateRefreshToken(findUser.id, findUser.getRoleId().getName());
        findUser.setRefreshToken(refreshToken);
        await this._userDao.save(findUser);
        return new AuthResponse(accessToken, refreshToken);
    }

    async generateAccessToken(refreshToken: string): Promise<AuthResponse> {
        let payload: Payload;
        try {
            payload = await this._jwtService.verifyRefreshToken(refreshToken);
        } catch (error) {
            throw new UnauthorizedException(`Invalid refresh token: ${error.name}. Authentication Required`);
        }
        const user = await this._userService.findById(payload.id);
        if (!user || !user.getRefreshToken() || refreshToken !== user.getRefreshToken()) {
            throw new UnauthorizedException(`Invalid refresh token. Authentication Required`);
        }
        const accessToken: string = await this._jwtService.generateAccessToken(user.id, user.getRoleId().getName());
        return new AuthResponse(accessToken, refreshToken);
    }
}
