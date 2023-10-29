import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/Models/Entities/FileEntity';
import { Repository } from 'typeorm';

@Injectable()
export class FileDao {
    constructor(@InjectRepository(File) private readonly _fileRepository: Repository<File>) {}

    async save(file: File): Promise<void> {
        await this._fileRepository.save(file);
    }

    async findByKey(key: string): Promise<File> {
        const query = this._fileRepository.createQueryBuilder('file').where('file.locationS3 = :key', { key: key }).getOne();
        return query;
    }

    async deleteByLocationS3(locationS3: string): Promise<void> {
        const query = this._fileRepository.createQueryBuilder('file').delete().where('file.locationS3 = :locationS3', { locationS3: locationS3 });
        await query.execute();
    }
}
