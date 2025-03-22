export declare function ApiDocs({ summary, successStatus, successExample, errorResponses, params, queries, }?: {
    summary?: string;
    successStatus?: number;
    successExample?: Record<string, any>;
    errorResponses?: {
        status: number;
        message: string;
    }[];
    params?: {
        name: string;
        example: any;
        required?: boolean;
    }[];
    queries?: {
        name: string;
        example: any;
        required?: boolean;
    }[];
}): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
