import { Injectable, UnauthorizedException } from '@nestjs/common';
import Payload from 'src/Models/Auth/Payload';
import AuthResponse from 'src/Models/Response/Auth/AuthResponse';
import { JwtSecurityService } from './Security/JwtSecurityService';
import { UserService } from './UserService';

@Injectable()
export class AuthService {
    constructor(
        private readonly _jwtService: JwtSecurityService,
        private readonly _userService: UserService,
    ) {}

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
