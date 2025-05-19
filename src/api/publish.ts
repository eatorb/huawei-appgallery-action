import {logStep, logSuccess} from "../utils/logger";
import axios from "axios";
import {ApiResponse} from "../types";
import {DOMAIN} from "../constants";
import {handleApiError} from "../utils/error";

export const updateAppFileInfo = async (
    token: string,
    clientId: string,
    appId: string,
    fileName: string,
): Promise<void> => {
    logStep('Updating app file information');

    try {
        const requestData: any = {
            fileType: '5', // 5 for apk
            files: [
                fileName
            ]
        };

        const response = await axios.put<ApiResponse>(
            `${DOMAIN}/publish/v2/app-file-info?appId=${appId}`,
            requestData,
            {
                headers: {
                    client_id: clientId,
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.ret.code !== 0) {
            throw new Error(`API error: ${response.data.ret.msg}`);
        }

        logSuccess('App file information updated successfully');

    } catch (e) {
        handleApiError(e, 'update app file information');
    }
};

export const submitApp = async (
    token: string,
    clientId: string,
    appId: string
) => {
    logStep('Submitting app for review');

    try {
        const response = await axios.post<ApiResponse>(
            `${DOMAIN}/publish/v2/app-submit?appId=${appId}`,
            {},
            {
                headers: {
                    client_id: clientId,
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.ret.code !== 0) {
            throw new Error(`API error: ${response.data.ret.msg}`);
        }

        logSuccess('App submitted successfully');
    } catch (error) {
        handleApiError(error, 'submit app for review');
    }

}