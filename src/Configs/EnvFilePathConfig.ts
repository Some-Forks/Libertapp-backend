import EnumEnv from './EnumEnv';

export const envFilePathConfiguration = (): string => {
    console.log(`Entorno - ${process.env.LFDC_ENV}`);
    let envFilePath;
    switch (process.env.LFDC_ENV) {
        case EnumEnv.LOCAL:
            envFilePath = '.env.local';
            break;
        case EnumEnv.DEV:
            envFilePath = '.env.dev';
            break;
        case EnumEnv.PRODUCTION:
            envFilePath = '.env';
            break;
        default:
            envFilePath = '.env';
    }
    console.log(`envFilePath: ${envFilePath}`);
    return envFilePath;
};
