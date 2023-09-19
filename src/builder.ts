import { Gravity, WatermarkPosition } from '.';
import { BaseBuilder } from './base-builder';
import { HexColor, RGBColor, ResizingType, WatermarkOffset } from './types';
import { isFocusPoint, isOffsetGravity, isRGBColor } from './utils';

export class ImgproxyBuilder extends BaseBuilder {
  private options: { [key: string]: string | undefined } = {};

  public resize(
    type?: ResizingType,
    width?: number,
    height?: number,
    enlarge?: boolean
  ) {
    return this.setOption(
      'rs',
      [type, width, height, enlarge ? 1 : 0].join(':')
    );
  }

  public size(width?: number, height?: number, enlarge?: boolean) {
    return this.setOption('s', [width, height, enlarge ? 1 : 0].join(':'));
  }

  public resizingType(type: string) {
    return this.setOption('rs', type);
  }

  public width(width: number) {
    return this.setOption('w', `${width}`);
  }

  public height(height: number) {
    return this.setOption('h', `${height}`);
  }

  // allow for strings since javascript float precision sucks
  public dpr(dpr: number | string) {
    if ((dpr as number) > 0) {
      this.setOption('dpr', `${dpr}`);
    }
    return this;
  }

  public enlarge(enlarge: number) {
    return this.setOption('el', `${enlarge}`);
  }

  public gravity(gravity: Gravity) {
    if (isFocusPoint(gravity)) {
      return this.setOption('g', `fp:${gravity.x}:${gravity.y}`);
    } else if (isOffsetGravity(gravity)) {
      return this.setOption(
        'g',
        `${gravity.type}:${gravity.xOffset}:${gravity.yOffset}`
      );
    } else {
      return this.setOption('g', gravity);
    }
  }

  public quality(quality: number) {
    return this.setOption('q', `${quality}`);
  }

  public background(color: RGBColor | HexColor) {
    if (isRGBColor(color)) {
      return this.setOption('bg', `${color.r}:${color.g}:${color.b}`);
    } else {
      return this.setOption('bg', color);
    }
  }

  public blur(sigma: number) {
    return this.setOption('bl', `${sigma}`);
  }

  public sharpen(sigma: number) {
    return this.setOption('sh', `${sigma}`);
  }

  public watermark(
    opacity: number,
    position?: WatermarkPosition,
    offset?: WatermarkOffset,
    scale?: number
  ) {
    return this.setOption(
      'wm',
      `${opacity}:${position}:${
        offset ? `${offset.x}:${offset.y}` : ''
      }:${scale}`
    );
  }

  public preset(...presets: string[]) {
    return this.setOption('pr', presets.join(':'));
  }

  public cacheBuster(buster: string) {
    return this.setOption('cb', buster);
  }

  public format(extension: string) {
    return this.setOption('f', extension);
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
    return this.setOption('c', crop);
  }

  public setOption(option: string, value: string) {
    this.options[option] = value;
    return this;
  }

  public clearOption(option: string) {
    this.options[option] = undefined;
    return this;
  }

  protected serializeOptions() {
    return Object.keys(this.options)
      .filter((option) => !!this.options[option])
      .map((option) => `${option}:${this.options[option]}`)
      .join('/');
  }
}
