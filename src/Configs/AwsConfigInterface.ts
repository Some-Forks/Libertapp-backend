export interface AWSConfigInterface {
    region: string;
    credentials: {
        accessKeyId: string;
        secretAccessKey: string;
    };
    apiVersion: string;
    signatureVersion: string;
}
