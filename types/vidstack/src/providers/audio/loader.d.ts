import type { MediaSrc, MediaType } from '../../core';
import type { MediaProviderLoader } from '../types';
import type { AudioProvider } from './provider';
export declare class AudioProviderLoader implements MediaProviderLoader<AudioProvider> {
    target: HTMLAudioElement;
    canPlay({ src, type }: MediaSrc): boolean;
    mediaType(): MediaType;
    load(): Promise<AudioProvider>;
}
