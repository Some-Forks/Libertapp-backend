import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLogger } from 'src/Helpers/Middlewares/CustomLogger';
import { importAllFromRequireContext } from 'src/Helpers/Utils/RequireContext';

@Module({
    imports: [TypeOrmModule.forFeature(importAllFromRequireContext(require.context('../Models/Entities/', true, /Entity\.ts$/)))],
    providers: [
        ...importAllFromRequireContext(require.context('../Services/', true)),
        ...importAllFromRequireContext(require.context('../Daos/', true)),
        ...importAllFromRequireContext(require.context('../WebServices/', true)),
        CustomLogger,
    ],
    controllers: importAllFromRequireContext(require.context('../Controllers/', true)),
    exports: [TypeOrmModule, CustomLogger],
})
export class ApplicationModule {}
