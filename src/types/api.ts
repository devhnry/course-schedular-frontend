export interface DefaultApiResponse<T> {
    statusCode: number;
    statusMessage: string;
    data: T;
}
