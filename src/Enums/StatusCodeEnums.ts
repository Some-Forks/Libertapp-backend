type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

enum StatusCodeEnums {
    EMAIL_DUPLICATED = 10001,

    USER_NOT_FOUND = 10010,
    USER_ALREADY_EXISTS,

    ROLE_NOT_FOUND = 10020,
}

type StatusCodeKeys = keyof typeof StatusCodeEnums;

const sortedKeys: StatusCodeKeys[] = (Object.keys(StatusCodeEnums) as StatusCodeKeys[]).sort((a, b) => StatusCodeEnums[a] - StatusCodeEnums[b]);

const SortedStatusCodeExceptionText: EnumDictionary<StatusCodeKeys, string> = {} as EnumDictionary<StatusCodeKeys, string>;

for (const key of sortedKeys) {
    SortedStatusCodeExceptionText[key] = String(StatusCodeEnums[key]);
}

export { StatusCodeEnums, SortedStatusCodeExceptionText };
