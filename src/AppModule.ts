import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { envFilePathConfiguration } from './Configs/EnvFilePathConfig';
import { nestEnvConfiguration } from './Configs/NestEnvConfig';
import { ApplicationModule } from './Modules/ApplicationModule';
import { PerformanceMiddleware } from './Helpers/Middlewares/PerformanceMiddleware';
import { QueryFailedErrorFilter } from './Helpers/Middlewares/QueryFailedErrorFilter';
import { DBConfigInterface } from './Configs/DbConfigInterface';
import { AWSConfigInterface } from './Configs/AwsConfigInterface';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [envFilePathConfiguration()],
            load: [nestEnvConfiguration],
            isGlobal: true,
        }),
        AwsSdkModule.forRootAsync({
            defaultServiceOptions: {
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => {
                    return Object.assign(configService.get<AWSConfigInterface>('AWS_FACTORY'));
                },
            },
            services: [S3],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => Object.assign(configService.get<DBConfigInterface>('DATABASE')),
        }),
        ApplicationModule,
    ],
    providers: [{ provide: APP_FILTER, useClass: QueryFailedErrorFilter }],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        if (process.env.LFDC_ENV === 'local' || process.env.LFDC_ENV === 'dev') {
            consumer.apply(PerformanceMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
        }
    }
}
