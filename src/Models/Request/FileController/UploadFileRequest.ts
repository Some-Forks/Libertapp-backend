import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class UploadFileRequest {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
