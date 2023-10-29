import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { ListObjectsV2Output } from 'aws-sdk/clients/s3';
import { InjectAwsService } from 'nest-aws-sdk';
import { StatusCodeEnums } from 'src/Enums/StatusCodeEnums';
import HttpCustomException from 'src/Exceptions/HttpCustomException';

@Injectable()
export class S3Service {
    constructor(
        @InjectAwsService(S3) private readonly _s3: S3,
        private readonly configService: ConfigService,
    ) {}

    async upload(options: S3.Types.PutObjectRequest): Promise<S3.ManagedUpload.SendData> {
        try {
            return await this._s3.upload(options).promise();
        } catch (error) {
            throw this._buildErrorS3(error);
        }
    }

    async listObjectsV2(options: S3.Types.ListObjectsV2Request): Promise<ListObjectsV2Output> {
        try {
            return await this._s3.listObjectsV2(options).promise();
        } catch (error) {
            throw this._buildErrorS3(error);
        }
    }

    async getSignedUrlPromise(operation: string, params: any): Promise<string> {
        try {
            return await this._s3.getSignedUrlPromise(operation, params);
        } catch (error) {
            throw this._buildErrorS3(error);
        }
    }

    public async existsFile(key: string): Promise<void> {
        try {
            await this._s3.headObject({ Bucket: this.configService.get('AWS_BUCKET_NAME'), Key: key }).promise();
        } catch (error) {
            throw new NotFoundException(`File doesn't exists`);
        }
    }

    private _buildErrorS3(error: any): HttpCustomException {
        console.log(error);
        return new HttpCustomException(`AWS S3 Bucket Service has failed`, StatusCodeEnums.AWS_S3_SERVICE_ERROR);
    }
}
