import { BaseBuilder } from './base-builder';

/**
 * Builder used when imgproxy is set in presets only mode: IMGPROXY_ONLY_PRESETS=true
 * https://github.com/imgproxy/imgproxy/blob/master/docs/presets.md#only-presets
 */
export class ImgproxyPresetOnlyBuilder extends BaseBuilder {
  private presets: string[] = [];

  public preset(...presets: string[]) {
    this.presets = this.presets.concat(presets);
    return this;
  }

  protected serializeOptions() {
    return this.presets.join(':');
  }
}
