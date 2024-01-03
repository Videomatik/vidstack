import type { MediaSrc, MediaType } from '../../core';
import type { MediaContext } from '../../core/api/media-context';
import type { MediaProviderLoader } from '../types';
import type { YouTubeProvider } from './provider';
export declare class YouTubeProviderLoader implements MediaProviderLoader<YouTubeProvider> {
    target: HTMLIFrameElement;
    canPlay(src: MediaSrc): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<YouTubeProvider>;
}
