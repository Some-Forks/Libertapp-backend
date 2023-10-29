import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import HttpCustomException from 'src/Exceptions/HttpCustomException';
import { StatusCodeEnums } from 'src/Enums/StatusCodeEnums';
import FileConstants from 'src/Constants/FileConstants';
import { S3Service } from 'src/Services/S3Service';
import { User } from 'src/Models/Entities/UserEntity';
import { UserDao } from 'src/Daos/UserDao';
import UploadFileRequest from 'src/Models/Request/FileController/UploadFileRequest';

@Injectable()
export class FileService {
    constructor(
        private readonly _s3Service: S3Service,
        private readonly _userDao: UserDao,
        private readonly _configService: ConfigService,
    ) {}

    async upload(file: Express.Multer.File, body: UploadFileRequest): Promise<S3.ManagedUpload.SendData> {
        if (file === undefined) {
            throw new HttpCustomException(`The file is required`, StatusCodeEnums.FILE_REQUIRED);
        }
        const findUser: User = await this._userDao.findByEmail(body.email);
        if (!findUser) {
            throw new HttpCustomException(`User not found`, StatusCodeEnums.USER_NOT_FOUND);
        }
        this._validateType(file?.mimetype);
        const key = this._imageFileRouteSelector(body.email);
        /*
            DEFINIR SI SE UTILIZARA AWS-SDK
            O LAMBDA PRIVADA (credenciales de AWS)
        */
        const options: S3.Types.PutObjectRequest = {
            Bucket: this._configService.get('AWS_BUCKET_NAME'),
            Body: file.buffer,
            Key: `${this._configService.get('AWS_PREFIX_IMAGES')}/${key}/${file.originalname}`,
        };
        return await this._s3Service.upload(options);
    }

    private _validateType(type: string) {
        if (!FileConstants.getContentTypes().includes(type)) {
            throw new HttpCustomException(`The file type is not allowed`, StatusCodeEnums.FILE_TYPE_NOT_ALLOWED);
        }
    }

    private _imageFileRouteSelector(userEmail: string): string {
        return `${FileConstants.IMAGE_ROUTE}/${userEmail}`;
    }
}
