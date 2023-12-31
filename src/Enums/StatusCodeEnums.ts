type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

enum StatusCodeEnums {
    EMAIL_DUPLICATED = 10001,

    USER_NOT_FOUND = 10010,
    USER_ALREADY_EXISTS,

    ROLE_NOT_FOUND = 10020,

    AWS_S3_SERVICE_ERROR = 10030,

    FILE_REQUIRED = 10040,
    FILE_TYPE_NOT_ALLOWED,
    FILE_UPLOAD_FAILED,

    INVALID_PASSWORD_USERNAME = 10050,
}

type StatusCodeKeys = keyof typeof StatusCodeEnums;

const sortedKeys: StatusCodeKeys[] = (Object.keys(StatusCodeEnums) as StatusCodeKeys[]).sort((a, b) => StatusCodeEnums[a] - StatusCodeEnums[b]);

const SortedStatusCodeExceptionText: EnumDictionary<StatusCodeKeys, string> = {} as EnumDictionary<StatusCodeKeys, string>;

for (const key of sortedKeys) {
    SortedStatusCodeExceptionText[key] = String(StatusCodeEnums[key]);
}

export { StatusCodeEnums, SortedStatusCodeExceptionText };
