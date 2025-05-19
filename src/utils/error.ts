import { AxiosError } from 'axios';
import { logError } from './logger';

export const handleApiError = (error: unknown, operation: string): never => {
  const axiosError = error as AxiosError;

  logError(`Failed to ${operation}`);

  if (axiosError.response) {
    logError(`Status: ${axiosError.response.status}`);
    logError(`Response: ${JSON.stringify(axiosError.response.data, null, 2)}`);
  } else if (axiosError.request) {
    logError('No response received from server');
  } else {
    logError(`Error: ${axiosError.message}`);
  }

  throw new Error(`Failed to ${operation}`);
};
