import { type DeferredPromise } from 'maverick.js/std';
import { TimeRange, type MediaSrc } from '../../core';
import { EmbedProvider } from '../embed/EmbedProvider';
import type { MediaProviderAdapter, MediaSetupContext } from '../types';
import type { YouTubeCommandArg } from './embed/command';
import type { YouTubeMessage } from './embed/message';
import type { YouTubeParams } from './embed/params';
import { type YouTubePlayerStateValue } from './embed/state';
/**
 * This provider enables loading videos uploaded to YouTube (youtube.com) via embeds.
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/youtube}
 * @see {@link https://developers.google.com/youtube/iframe_api_reference}
 * @example
 * ```html
 * <media-player src="youtube/_cMxraX_5RE">
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
export declare class YouTubeProvider extends EmbedProvider<YouTubeMessage> implements MediaProviderAdapter, Pick<YouTubeParams, 'color' | 'start' | 'end'> {
    protected readonly $$PROVIDER_TYPE = "YOUTUBE";
    protected static _videoIdRE: RegExp;
    protected static _posterCache: Map<string, string>;
    readonly scope: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").S;
    protected _ctx: MediaSetupContext;
    protected _videoId: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").W<string>;
    protected _state: YouTubePlayerStateValue;
    protected _seekingTimer: number;
    protected _played: number;
    protected _playedRange: TimeRange;
    protected _currentSrc: MediaSrc<string> | null;
    protected _playPromise: DeferredPromise<void, string> | null;
    protected _pausePromise: DeferredPromise<void, string> | null;
    protected get _notify(): <Type extends keyof import("../../core").MediaEvents>(type: Type, ...init: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").aC<import("../../core").MediaEvents[Type]> extends void | undefined ? [detail?: undefined, trigger?: Event | undefined] : [detail: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").aC<import("../../core").MediaEvents[Type]>, trigger?: Event | undefined]) => void;
    /**
     * Sets the player's interface language. The parameter value is an ISO 639-1 two-letter
     * language code or a fully specified locale. For example, fr and fr-ca are both valid values.
     * Other language input codes, such as IETF language tags (BCP 47) might also be handled properly.
     *
     * The interface language is used for tooltips in the player and also affects the default caption
     * track. Note that YouTube might select a different caption track language for a particular
     * user based on the user's individual language preferences and the availability of caption tracks.
     *
     * @defaultValue 'en'
     */
    language: string;
    color: 'white' | 'red';
    /**
     * Whether cookies should be enabled on the embed. This is turned off by default to be
     * GDPR-compliant.
     *
     * @defaultValue `false`
     */
    cookies: boolean;
    get currentSrc(): MediaSrc<string> | null;
    get type(): string;
    get videoId(): string;
    preconnect(): void;
    setup(ctx: MediaSetupContext): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    setMuted(muted: boolean): void;
    setCurrentTime(time: number): void;
    setVolume(volume: number): void;
    setPlaybackRate(rate: number): void;
    loadSource(src: MediaSrc): Promise<void>;
    protected _getOrigin(): "https://www.youtube-nocookie.com" | "https://www.youtube.com";
    protected _watchVideoId(): void;
    protected _watchPoster(): (() => void) | undefined;
    private _findPoster;
    protected _resolvePosterURL(videoId: string, size: string, webp: boolean): string;
    protected _buildParams(): YouTubeParams;
    protected _remote<T extends keyof YouTubeCommandArg>(command: T, arg?: YouTubeCommandArg[T]): void;
    protected _onLoad(): void;
    protected _onReady(trigger: Event): void;
    protected _onPause(trigger: Event): void;
    protected _onTimeUpdate(time: number, trigger: Event): void;
    protected _onProgress(buffered: number, seekable: TimeRange, trigger: Event): void;
    protected _onSeeked(trigger: Event): void;
    protected _onEnded(trigger: Event): void;
    protected _onStateChange(state: YouTubePlayerStateValue, trigger: Event): void;
    protected _onMessage({ info }: YouTubeMessage, event: MessageEvent): void;
    protected _reset(): void;
}
