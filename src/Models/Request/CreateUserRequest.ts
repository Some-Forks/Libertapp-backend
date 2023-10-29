import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export default class CreateUserRequest {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(50)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    board: string;
}
