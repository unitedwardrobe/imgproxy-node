import { Gravity, WatermarkPosition } from '.';
import { BaseBuilder } from './base-builder';
import { HexColor, ResizingType, RGBColor, WatermarkOffset } from './types';
import { isFocusPoint, isOffsetGravity, isRGBColor } from './utils';

export class ImgproxyBuilder extends BaseBuilder {
  private options: { [key: string]: string | undefined } = {};

  public resize(
    type?: ResizingType,
    width?: number,
    height?: number,
    enlarge?: boolean
  ) {
    this.setOption('rs', [type, width, height, enlarge ? 1 : 0].join(':'));
    return this;
  }

  public size(width?: number, height?: number, enlarge?: boolean) {
    this.setOption('s', [width, height, enlarge ? 1 : 0].join(':'));
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

  public gravity(gravity: Gravity) {
    if (isFocusPoint(gravity)) {
      this.setOption('g', `fp:${gravity.x}:${gravity.y}`);
    } else if (isOffsetGravity(gravity)) {
      this.setOption(
        'g',
        `${gravity.type}:${gravity.xOffset}:${gravity.yOffset}`
      );
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

  public crop(width: number, height: number, gravity?: Gravity) {
    let crop = `${width}:${height}`;
    if (gravity) {
      if (isFocusPoint(gravity)) {
        crop = `${crop}:fp:${gravity.x}:${gravity.y}`;
      } else if (isOffsetGravity(gravity)) {
        crop = `${crop}:${gravity.type}:${gravity.xOffset}:${gravity.yOffset}`;
      } else {
        crop = `${crop}:${gravity}`;
      }
    }
    this.setOption('c', crop);
    return this;
  }

  public setOption(option: string, value: string) {
    this.options[option] = value;
  }

  public clearOption(option: string) {
    this.options[option] = undefined;
  }

  protected serializeOptions() {
    return Object.keys(this.options)
      .filter((option) => !!this.options[option])
      .map((option) => `${option}:${this.options[option]}`)
      .join('/');
  }
}
