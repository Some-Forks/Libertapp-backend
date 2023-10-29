import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import Response from 'src/Helpers/Formatter/Response';
import UploadFileRequest from 'src/Models/Request/FileController/UploadFileRequest';
import { FileService } from 'src/Services/FileService';

@Controller('file')
export class FileController {
    constructor(private readonly _fileService: FileService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File, @Body() body: UploadFileRequest): Promise<Response<S3.ManagedUpload.SendData>> {
        const response = await this._fileService.upload(file, body);
        return Response.create<S3.ManagedUpload.SendData>(response);
    }
}
