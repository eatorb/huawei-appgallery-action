import { UploadInfo, UploadUrlResponse } from '../types';
import { logStep, logSuccess } from '../utils/logger';
import { getFileInfo, readFile } from '../utils/file';
import { DOMAIN } from '../constants';
import axios from 'axios';
import { handleApiError } from '../utils/error';

export const getUploadUrl = async (
  token: string,
  clientId: string,
  appId: string,
  filePath: string,
): Promise<UploadInfo> => {
  logStep('Getting file upload URL');

  try {
    const { fileName, size, sha256 } = getFileInfo(filePath);

    const releaseType = 1;
    const userAgent = 'GithubAction';

    const url = `${DOMAIN}/publish/v2/upload-url/for-obs?appId=${appId}&fileName=${fileName}&sha256=${sha256}&contentLength=${size}&releaseType=${releaseType}&userAgent=${userAgent}`;
    console.log(`Request URL: ${url}`);
    console.log(`Authorization header: Bearer ${token.substring(0, 10)}...`);
    console.log(`client_id header: ${clientId}`);

    const response = await axios.get<UploadUrlResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        client_id: clientId,
      },
    });

    logSuccess('Upload URL obtained successfully');

    return {
      url: response.data.urlInfo.url,
      headers: response.data.urlInfo.headers,
      fileName: fileName,
    };
  } catch (e) {
    return handleApiError(e, 'get upload URL');
  }
};

export const uploadFile = async (
  uploadUrl: string,
  headers: Record<string, string>,
  filePath: string,
): Promise<void> => {
  logStep('Uploading file to Huawei OBS');

  try {
    const fileContent = readFile(filePath);

    await axios.put(uploadUrl, fileContent, {
      headers: headers,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    logSuccess('File uploaded successfully');
  } catch (e) {
    handleApiError(e, 'upload file to Huawei OBS');
  }
};
