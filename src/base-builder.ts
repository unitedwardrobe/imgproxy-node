import { ImgproxyConfig } from './types';
import { isSecureConfig, sign, urlSafeEncode } from './utils';

export abstract class BaseBuilder {
  constructor(protected config: ImgproxyConfig) {
    this.config = config;
  }

  /**
   * Generates a URL based on the set options.
   *
   * @param uri The uri of the image
   * @param extension optional string to append as extension
   */
  public generateUrl(uri: string, extension?: string) {
    const options = this.serializeOptions();
    const config = this.config;
    const encode = config.encode !== false;

    uri = encode ? urlSafeEncode(uri) : `plain/${uri}`;
    uri = extension ? `${uri}${encode ? '.' : '@'}${extension}` : uri;
    uri = `/${options ? `${options}/` : ''}${uri}`;

    const signature = isSecureConfig(config)
      ? sign(config.key, config.salt, uri, config.signatureSize || 32)
      : typeof config.insecure === 'string'
      ? config.insecure
      : 'insecure';

    const url = new URL(`${signature}${uri}`, config.baseUrl);
    return url.toString();
  }

  protected abstract serializeOptions(): string;
}
