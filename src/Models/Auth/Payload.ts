export default class Payload {
    id: number;

    role: string;

    iat: number;

    exp: number;
}

export interface IPayload {
    id: number;
    role: string;
}
