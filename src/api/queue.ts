let isRefreshing = false;
type FailedRequest = {
    resolve: (value?: unknown) => void;
    reject: (error: Error) => void;
};
let failedQueue: FailedRequest[] = [];

export const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token));
    failedQueue = [];
};

export const addToQueue = (resolve: any, reject: any) => {
    failedQueue.push({ resolve, reject });
};

export const setRefreshing = (val: boolean) => { isRefreshing = val; };
export const getRefreshing = () => isRefreshing;
