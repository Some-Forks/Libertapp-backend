export const nestEnvConfiguration = () => envModelTransformer(process.env);

export const envModelTransformer = (envs: any) => ({
    APP_NAME: envs.APP_NAME,
    PORT: parseInt(envs.PORT, 10) || 33000,
    DATABASE: {
        host: envs.DATABASE_HOST,
        port: Number(envs.DATABASE_PORT),
        username: envs.DATABASE_USER,
        password: envs.DATABASE_PASSWORD,
        database: envs.DATABASE_DB,
        type: envs.DATABASE_TYPE,
        synchronize: false,
        autoLoadEntities: envs.DATABASE_AUTO_LOAD_ENTITIES,
        keepConnectionAlive: true,
    },
    AWS_FACTORY: {
        region: envs.AWS_REGION,
        credentials: {
            accessKeyId: envs.AWS_ACCESS_KEY_ID,
            secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
        },
        apiVersion: envs.AWS_API_VERSION,
        signatureVersion: envs.AWS_SIGNATURE_VERSION,
    },
});
