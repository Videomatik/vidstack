import { type DeferredPromise } from 'maverick.js/std';
import { TimeRange, type MediaSrc } from '../../core';
import { RAFLoop } from '../../foundation/observers/raf-loop';
import { EmbedProvider } from '../embed/EmbedProvider';
import type { MediaSetupContext } from '../types';
import type { VimeoCommandArg, VimeoCommandData } from './embed/command';
import { type VimeoErrorPayload } from './embed/event';
import type { VimeoMessage } from './embed/message';
import type { VimeoQuality, VimeoVideoInfo } from './embed/misc';
import type { VimeoParams } from './embed/params';
/**
 * This provider enables loading videos uploaded to Vimeo (https://vimeo.com) via embeds.
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/vimeo}
 * @see {@link https://developer.vimeo.com/player/sdk}
 * @example
 * ```html
 * <media-player src="vimeo/640499893">
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 * @example
 * ```html
 * <media-player src="vimeo/640499893?hash={hash}">
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
export declare class VimeoProvider extends EmbedProvider<VimeoMessage> implements Pick<VimeoParams, 'title' | 'byline' | 'portrait' | 'color'> {
    protected readonly $$PROVIDER_TYPE = "VIMEO";
    protected static _videoIdRE: RegExp;
    protected static _infoCache: Map<string, VimeoVideoInfo>;
    readonly scope: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").S;
    protected _ctx: MediaSetupContext;
    protected _played: number;
    protected _playedRange: TimeRange;
    protected _seekableRange: TimeRange;
    protected _playPromise: DeferredPromise<void, string> | null;
    protected _pausePromise: DeferredPromise<void, string> | null;
    protected _videoInfoPromise: DeferredPromise<VimeoVideoInfo, void> | null;
    protected _videoId: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").W<string>;
    protected _pro: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").W<boolean>;
    protected _hash: string | null;
    protected _currentSrc: MediaSrc<string> | null;
    protected _currentCue: VTTCue | null;
    protected _timeRAF: RAFLoop;
    protected get _notify(): <Type extends keyof import("../../core").MediaEvents>(type: Type, ...init: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").aC<import("../../core").MediaEvents[Type]> extends void | undefined ? [detail?: undefined, trigger?: Event | undefined] : [detail: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").aC<import("../../core").MediaEvents[Type]>, trigger?: Event | undefined]) => void;
    /**
     * Whether tracking session data should be enabled on the embed, including cookies and analytics.
     * This is turned off by default to be GDPR-compliant.
     *
     * @defaultValue `false`
     */
    cookies: boolean;
    title: boolean;
    byline: boolean;
    portrait: boolean;
    color: string;
    get type(): string;
    get currentSrc(): MediaSrc<string> | null;
    get videoId(): string;
    get hash(): string | null;
    get isPro(): boolean;
    preconnect(): void;
    setup(ctx: MediaSetupContext): void;
    destroy(): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    setMuted(muted: any): void;
    setCurrentTime(time: any): void;
    setVolume(volume: any): void;
    setPlaybackRate(rate: any): void;
    loadSource(src: MediaSrc): Promise<void>;
    protected _watchVideoId(): void;
    protected _watchVideoInfo(): (() => void) | undefined;
    protected _watchPro(): import("maverick.js/dist/types/maverick-2Ou0vbL_.js").D | undefined;
    protected _getOrigin(): string;
    protected _buildParams(): VimeoParams;
    protected _onAnimationFrame(): void;
    protected _onTimeUpdate(time: number, trigger: Event): void;
    protected _onSeeked(time: number, trigger: Event): void;
    protected _onReady(trigger: Event): void;
    protected _onMethod<T extends keyof VimeoCommandData>(method: T, data: VimeoCommandData[T], trigger: Event): void;
    protected _attachListeners(): void;
    protected _onPause(trigger: Event): void;
    protected _onPlay(trigger: Event): void;
    protected _onPlayProgress(trigger: Event): void;
    protected _onLoadProgress(buffered: number, trigger: Event): void;
    protected _onBufferStart(trigger: Event): void;
    protected _onBufferEnd(trigger: Event): void;
    protected _onWaiting(trigger: Event): void;
    protected _onVolumeChange(volume: number, muted: boolean, trigger: Event): void;
    protected _onQualitiesChange(qualities: VimeoQuality[], trigger: Event): void;
    protected _onQualityChange({ id }: {
        id?: string | undefined;
    } | undefined, trigger: Event): void;
    private _onEvent;
    protected _onError(error: VimeoErrorPayload, trigger: Event): void;
    protected _onMessage(message: VimeoMessage, event: MessageEvent): void;
    protected _onLoad(): void;
    protected _remote<T extends keyof VimeoCommandArg>(command: T, arg?: VimeoCommandArg[T]): void;
    protected _reset(): void;
}
