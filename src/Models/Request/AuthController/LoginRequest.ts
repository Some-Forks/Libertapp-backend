import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import REGEX_VALIDATORS from 'src/Helpers/Utils/RegexValidators';

export default class LoginRequest {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(REGEX_VALIDATORS.PASSWORD_REGEX, {
        message:
            'Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
    })
    password: string;
}
