import type { MediaSrc } from '../core';
export declare const AUDIO_EXTENSIONS: RegExp;
export declare const AUDIO_TYPES: Set<string>;
export declare const VIDEO_EXTENSIONS: RegExp;
export declare const VIDEO_TYPES: Set<string>;
export declare const HLS_VIDEO_EXTENSIONS: RegExp;
export declare const HLS_VIDEO_TYPES: Set<string>;
export declare function isHLSSrc({ src, type }: MediaSrc): boolean;
export declare function isMediaStream(src: unknown): src is MediaStream;
