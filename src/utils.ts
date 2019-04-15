import crypto from 'crypto';
import { FocusPoint, ImgproxySecureConfig, RGBColor } from './types';

export const isRGBColor = (obj: any): obj is RGBColor => {
  return 'r' in obj && 'g' in obj && 'b' in obj;
};

export const isFocusPoint = (obj: any): obj is FocusPoint => {
  return 'x' in obj && 'y' in obj;
};

export const isSecureConfig = (config: any): config is ImgproxySecureConfig => {
  return 'key' in config && 'salt' in config;
};

const hexDecode = (hex: string) => Buffer.from(hex, 'hex');

export const urlSafeEncode = (data: any) =>
  Buffer.from(data, 'utf8')
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

export const sign = (key: string, salt: string, target: string) => {
  const hmac = crypto.createHmac('sha256', hexDecode(key));
  hmac.update(hexDecode(salt));
  hmac.update(target);
  return urlSafeEncode(hmac.digest());
};
