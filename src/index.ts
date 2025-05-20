import * as core from '@actions/core';
import { logStep, logSuccess } from './utils/logger';
import { ActionConfig } from './types';
import { getToken } from './api/auth';
import { getUploadUrl, uploadFile } from './api/upload';
import { submitApp, updateAppFileInfo } from './api/publish';

export const run = async (): Promise<void> => {
  try {
    logStep('Starting Huawei AppGallery deployment');

    const config: ActionConfig = {
      clientId: core.getInput('client-id', { required: true }),
      clientSecret: core.getInput('client-secret', { required: true }),
      appId: core.getInput('app-id', { required: true }),
      filePath: core.getInput('file-path', { required: true }),
      submit: core.getInput('submit') === 'true',
    };

    const token = await getToken(config.clientId, config.clientSecret);

    const uploadInfo = await getUploadUrl(token, config.clientId, config.appId, config.filePath);

    await uploadFile(uploadInfo.url, uploadInfo.headers, config.filePath);

    await updateAppFileInfo(token, config.clientId, config.appId, uploadInfo.fileName, uploadInfo.url);

    if (config.submit) {
      await submitApp(token, config.clientId, config.appId);
    }

    logSuccess('Deployment to Huawei AppGallery completed successfully');
  } catch (e) {
    if (e instanceof Error) {
      core.setFailed(e.message);
    } else {
      core.setFailed('An unknown error occurred');
    }
  }
};

run();
