import { Body, Controller, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import Response from 'src/Helpers/Formatter/Response';
import { ValidateRequiredPipe } from 'src/Helpers/Pipes/ValidateRequiredPipe';
import LoginRequest from 'src/Models/Request/AuthController/LoginRequest';
import AuthResponse from 'src/Models/Response/Auth/AuthResponse';
import { AuthService } from 'src/Services/AuthService';

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: LoginRequest): Promise<Response<AuthResponse>> {
        const response = await this._authService.login(body);
        return Response.create<AuthResponse>(response);
    }

    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Query('refresh_token', ValidateRequiredPipe) refreshToken: string): Promise<Response<AuthResponse>> {
        const response: AuthResponse = await this._authService.generateAccessToken(refreshToken);
        return Response.create<AuthResponse>(response);
    }
}
