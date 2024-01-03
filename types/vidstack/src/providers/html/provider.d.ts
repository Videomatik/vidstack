import type { MediaResource, MediaSrc } from '../../core/api/types';
import type { MediaProviderAdapter, MediaSetupContext } from '../types';
/**
 * This HTML media provider adapts the underlying media element such as `<audio>` or `<video>` to
 * satisfy the media provider interface.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement}
 */
export declare class HTMLMediaProvider implements MediaProviderAdapter {
    protected _media: HTMLMediaElement;
    readonly scope: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").S;
    protected _currentSrc: MediaSrc<MediaResource> | null;
    constructor(_media: HTMLMediaElement);
    setup(ctx: MediaSetupContext): void;
    get type(): string;
    get media(): HTMLMediaElement;
    get currentSrc(): MediaSrc<MediaResource> | null;
    setPlaybackRate(rate: number): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    setMuted(muted: boolean): void;
    setVolume(volume: number): void;
    setCurrentTime(time: number): void;
    setPlaysinline(playsinline: boolean): void;
    loadSource({ src, type }: MediaSrc, preload?: HTMLMediaElement['preload']): Promise<void>;
}
