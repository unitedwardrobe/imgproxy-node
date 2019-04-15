import { Gravity, WatermarkPosition } from '.';
import {
  FocusPoint,
  HexColor,
  ImgproxyConfig,
  ResizingType,
  RGBColor,
  WatermarkOffset,
} from './types';
import {
  isFocusPoint,
  isRGBColor,
  isSecureConfig,
  sign,
  urlSafeEncode,
} from './utils';

export class ImgproxyBuilder {
  private config: ImgproxyConfig;
  private options: { [key: string]: string | undefined } = {};

  constructor(config: ImgproxyConfig) {
    this.config = config;
  }

  public resize(
    type?: ResizingType,
    width?: number,
    height?: number,
    enlarge?: boolean
  ) {
    this.setOption('rs', `${type}:${width}:${height}:${enlarge ? 1 : 0}`);
    return this;
  }

  public size(width?: number, height?: number, enlarge?: boolean) {
    this.setOption('s', `${width}:${height}:${enlarge ? 1 : 0}`);
    return this;
  }

  public resizingType(type: string) {
    this.setOption('rs', type);
    return this;
  }

  public width(width: number) {
    this.setOption('w', `${width}`);
    return this;
  }

  public height(height: number) {
    this.setOption('h', `${height}`);
    return this;
  }

  public dpr(dpr: number | string) {
    if (dpr > 0) {
      this.setOption('dpr', `${dpr}`);
    }
    return this;
  }

  public enlarge(enlarge: number) {
    this.setOption('el', `${enlarge}`);
    return this;
  }

  public gravity(gravity: Gravity | FocusPoint) {
    if (isFocusPoint(gravity)) {
      this.setOption('g', `fp:${gravity.x}:${gravity.y}`);
    } else {
      this.setOption('g', gravity);
    }
    return this;
  }

  public quality(quality: number) {
    this.setOption('q', `${quality}`);
    return this;
  }

  public background(color: RGBColor | HexColor) {
    if (isRGBColor(color)) {
      this.setOption('bg', `${color.r}:${color.g}:${color.b}`);
    } else {
      this.setOption('bg', color);
    }
    return this;
  }

  public blur(sigma: number) {
    this.setOption('bl', `${sigma}`);
    return this;
  }

  public sharpen(sigma: number) {
    this.setOption('sh', `${sigma}`);
    return this;
  }

  public watermark(
    opacity: number,
    position?: WatermarkPosition,
    offset?: WatermarkOffset,
    scale?: number
  ) {
    this.setOption(
      'wm',
      `${opacity}:${position}:${
        offset ? `${offset.x}:${offset.y}` : ''
      }:${scale}`
    );

    return this;
  }

  public preset(...presets: string[]) {
    this.setOption('pr', presets.join(':'));
    return this;
  }

  public cacheBuster(buster: string) {
    this.setOption('cb', buster);
    return this;
  }

  public format(extension: string) {
    this.setOption('f', extension);
    return this;
  }

  public setOption(option: string, value: string) {
    this.options[option] = value;
  }

  public clearOption(option: string) {
    this.options[option] = undefined;
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

    uri = config.encode !== false ? urlSafeEncode(uri) : uri;
    uri = extension ? `${uri}.${extension}` : uri;
    uri = `/${options}/${uri}`;

    const signature = isSecureConfig(config)
      ? sign(config.key, config.salt, uri)
      : typeof config.insecure === 'string'
      ? config.insecure
      : 'insecure';
    return urljoin(config.baseUrl, `${signature}${uri}`);
  }

  private serializeOptions() {
    return Object.keys(this.options)
      .filter((option) => !!this.options[option])
      .map((option) => `${option}:${this.options[option]}`)
      .join('/');
  }
}
