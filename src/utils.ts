import crypto from 'crypto';
import {
  FocusPoint,
  Gravity,
  HexColor,
  ImgproxyConfig,
  ImgproxySecureConfig,
  OffsetGravity,
  RGBColor,
} from './types';

export const isRGBColor = (obj: RGBColor | HexColor): obj is RGBColor => {
  return typeof obj === 'object' && 'r' in obj && 'g' in obj && 'b' in obj;
};

export const isFocusPoint = (obj: Gravity): obj is FocusPoint => {
  return typeof obj === 'object' && 'x' in obj && 'y' in obj;
};

export const isOffsetGravity = (obj: Gravity): obj is OffsetGravity => {
  return (
    typeof obj === 'object' &&
    'xOffset' in obj &&
    'yOffset' in obj &&
    'type' in obj
  );
};

export const isSecureConfig = (
  config: ImgproxyConfig | ImgproxySecureConfig
): config is ImgproxySecureConfig => {
  return 'key' in config && 'salt' in config;
};

const hexDecode = (hex: string) => Buffer.from(hex, 'hex');

const encodeUrlChars = (url: string) =>
  url.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

export const urlSafeEncode = (data: Buffer | string) => {
  if (Buffer.isBuffer(data)) {
    return encodeUrlChars(data.toString('base64'));
  }
  return encodeUrlChars(Buffer.from(data, 'utf-8').toString('base64'));
};

export const sign = (
  key: string,
  salt: string,
  target: string,
  size: number = 32
) => {
  const hmac = crypto.createHmac('sha256', hexDecode(key));
  hmac.update(hexDecode(salt));
  hmac.update(target);
  return urlSafeEncode(hmac.digest().slice(0, size));
};
