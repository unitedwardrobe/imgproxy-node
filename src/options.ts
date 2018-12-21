import {
  ResizingType,
  Gravity,
  FocusPoint,
  RGBColor,
  HexColor,
  WatermarkPosition,
  WatermarkOffset,
} from './types';

export default class ImgproxyOptions {
  private options: { [key: string]: string } = {};

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

  public extension(extension: string) {
    this.setOption('f', extension);
    return this;
  }

  public serialize() {
    return Object.keys(this.options)
      .map((option) => `${option}:${this.options[option]}`)
      .join('/');
  }

  public setOption(option: string, value: string) {
    this.options[option] = value;
  }
}

const isRGBColor = (obj: any): obj is RGBColor => {
  return 'r' in obj && 'g' in obj && 'b' in obj;
};

const isFocusPoint = (obj: any): obj is FocusPoint => {
  return 'x' in obj && 'y' in obj;
};
