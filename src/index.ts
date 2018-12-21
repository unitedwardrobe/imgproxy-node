import * as crypto from 'crypto';
import * as urljoin from 'url-join';

import ImgproxyOptions from './options';
import { Gravity, WatermarkPosition } from './types';

const hexDecode = (hex: string) => Buffer.from(hex, 'hex');

const urlSafeEncode = (data: any) =>
  Buffer.from(data, 'utf8')
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

const sign = (key: string, salt: string, target: string) => {
  const hmac = crypto.createHmac('sha256', hexDecode(key));
  hmac.update(hexDecode(salt));
  hmac.update(target);
  return urlSafeEncode(hmac.digest());
};

interface ImgproxyConfig {
  /**
   * The url where imgproxy runs.
   */
  baseUrl: string;
  /**
   * If urls should be encoded with base64.
   */
  encode?: boolean;
  /**
   * If insecure usage is supported by the service, true by default.
   * When set to a string it will be used as the plain "signature".
   */
  insecure?: boolean | string;
}

interface ImgproxySecureConfig extends ImgproxyConfig {
  /**
   * The key to use for creating the signature.
   */
  key: string;
  /**
   * The salt to use for creating the signature.
   */
  salt: string;
  insecure: false;
}

const isSecureConfig = (config: any): config is ImgproxySecureConfig => {
  return 'key' in config && 'salt' in config;
};

export default class Imgproxy {
  private config: ImgproxyConfig | ImgproxySecureConfig;

  constructor(config: ImgproxyConfig | ImgproxySecureConfig) {
    this.config = config;
  }

  /**
   * Generates a URL using the given the options.
   *
   * @param uri The uri of the image
   * @param options an options object
   * @param extension optional string to append as extension
   */
  public generateUrl(
    uri: string,
    options: ImgproxyOptions,
    extension?: string
  ) {
    const serializedOptions = options.serialize();
    const config = this.config;

    uri = config.encode !== false ? urlSafeEncode(uri) : uri;
    uri = extension ? `${uri}.${extension}` : uri;
    uri = `/${serializedOptions}/${uri}`;

    const signature = isSecureConfig(config)
      ? sign(config.key, config.salt, uri)
      : typeof config.insecure === 'string'
      ? config.insecure
      : 'insecure';
    return urljoin(config.baseUrl, `${signature}${uri}`);
  }
}

export { ImgproxyOptions, Gravity, WatermarkPosition };
