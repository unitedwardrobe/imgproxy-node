import { ImgproxyBuilder } from './builder';
import {
  Gravity,
  ImgproxyConfig,
  ImgproxySecureConfig,
  WatermarkPosition,
} from './types';

export default class Imgproxy {
  private config: ImgproxyConfig | ImgproxySecureConfig;

  constructor(config: ImgproxyConfig | ImgproxySecureConfig) {
    this.config = config;
  }

  public builder() {
    return new ImgproxyBuilder(this.config);
  }
}

export { Gravity, WatermarkPosition };
