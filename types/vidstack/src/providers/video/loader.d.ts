import type { MediaSrc, MediaType } from '../../core';
import type { MediaContext } from '../../core/api/media-context';
import type { MediaProviderLoader } from '../types';
import type { VideoProvider } from './provider';
export declare class VideoProviderLoader implements MediaProviderLoader<VideoProvider> {
    target: HTMLVideoElement;
    canPlay(src: MediaSrc): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<VideoProvider>;
}
