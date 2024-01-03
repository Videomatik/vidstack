import type { MediaProviderAdapter, MediaProviderLoader, MediaSrc, MediaType } from 'vidstack';
export declare class RemotionProviderLoader implements MediaProviderLoader {
    target: HTMLElement;
    constructor();
    canPlay(src: MediaSrc): boolean;
    mediaType(): MediaType;
    load(): Promise<MediaProviderAdapter>;
}
