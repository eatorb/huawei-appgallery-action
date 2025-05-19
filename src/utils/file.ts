import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { logInfo } from './logger';

export const getFileInfo = (
  filePath: string,
): {
  fileName: string;
  size: number;
  sha256: string;
} => {
  if (fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileName = path.basename(filePath);
  const stats = fs.statSync(filePath);
  const fileBuffer = fs.readFileSync(filePath);

  const sha256 = crypto.createHash('sha256').update(fileBuffer).digest('hex');

  logInfo('File', fileName);
  logInfo('Size', `${stats.size} bytes`);
  logInfo('SHA-256', `${sha256.substring(0, 10)}...`);

  return {
    fileName,
    size: stats.size,
    sha256,
  };
};

export function readFile(filePath: string): Buffer {
  return fs.readFileSync(filePath);
}
