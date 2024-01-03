import type { MediaSrc, MediaType } from '../../core';
import type { MediaContext } from '../../core/api/media-context';
import type { MediaProviderLoader } from '../types';
import type { VimeoProvider } from './provider';
export declare class VimeoProviderLoader implements MediaProviderLoader<VimeoProvider> {
    target: HTMLIFrameElement;
    canPlay(src: MediaSrc): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<VimeoProvider>;
}
