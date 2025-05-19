import {logStep, logSuccess} from "../utils/logger";
import axios from "axios";
import {TokenResponse} from "../types";
import {handleApiError} from "../utils/error";
import {DOMAIN} from "../constants";

export const getToken = async (clientId: string, clientSecret: string): Promise<string> => {
    logStep('Obtaining authentication token');

    try {
        const response = await axios.post<TokenResponse>(
            `${DOMAIN}/oauth2/v1/token`,
            {
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        logSuccess('Token obtained successfully');
        return response.data.access_token;
    } catch (e) {
        return handleApiError(e, 'obtain authentication token');
    }
}