export interface ImgproxyConfig {
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

export interface ImgproxySecureConfig extends ImgproxyConfig {
  /**
   * The key to use for creating the signature.
   */
  key: string;
  /**
   * The salt to use for creating the signature.
   */
  salt: string;
  /**
   * Number of bytes to use for signature before encoding to Base64. Default: 32
   */
  signatureSize?: SignatureSize;

  insecure: false;
}

// prettier-ignore
export type SignatureSize =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16
  | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24
  | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32;

export type ResizingType = 'fit' | 'fill' | 'fill-down' | 'force' | 'crop';

export type HexColor = string;

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface FocusPoint {
  x: number;
  y: number;
}

export interface OffsetGravity {
  type: GravityType;
  xOffset: number;
  yOffset: number;
}

export enum GravityType {
  center = 'ce', // default
  north = 'no', // (top edge);
  south = 'so', // (bottom edge);
  east = 'ea', // (right edge);
  west = 'we', // (left edge);
  north_east = 'noea', // (top-right corner);
  north_west = 'nowe', // (top-left corner);
  south_east = 'soea', // (bottom-right corner);
  south_west = 'sowe', // (bottom-left corner);
  smart = 'sm', // libvips detects the most "interesting" section of the image and considers it as the center of the resulting image;
}

export type Gravity = GravityType | FocusPoint | OffsetGravity;

export enum WatermarkPosition {
  center = 'ce', // default
  north = 'no', // (top edge);
  south = 'so', // (bottom edge);
  east = 'ea', // (right edge);
  west = 'we', // (left edge);
  north_east = 'noea', // (top-right corner);
  north_west = 'nowe', // (top-left corner);
  south_east = 'soea', // (bottom-right corner);
  south_west = 'sowe', // (bottom-left corner);
  replicate = 're', // replicate watermark to fill the whole image;
}

export interface WatermarkOffset {
  x: number;
  y: number;
}
