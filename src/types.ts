export type ResizingType = 'fit' | 'fill' | 'crop';

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

export enum Gravity {
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
