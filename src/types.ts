export interface TokenResponse {
    access_token: string;
    expires_in: number;
}

export interface ApiResponse {
    ret: {
        code: number;
        msg: string;
    }
}

export interface UploadUrlResponse extends ApiResponse {
    urlInfo: {
        url: string;
        headers: Record<string, string>;
    };
}

export interface ActionConfig {
    clientId: string;
    clientSecret: string;
    appId: string;
    filePath: string;
    submit: boolean;
}

export interface UploadInfo {
    url: string;
    headers: Record<string, string>;
    fileName: string;
}