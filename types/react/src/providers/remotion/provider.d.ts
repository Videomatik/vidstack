import * as React from 'react';
import { type DeferredPromise } from 'maverick.js/std';
import { type PlayableMediaTag, type SetMediaVolumeContextValue, type SetTimelineContextValue, type TimelineContextValue } from 'remotion';
import { TimeRange, type MediaProviderAdapter, type MediaSetupContext, type MediaSrc } from 'vidstack';
import { RemotionLayoutEngine } from './layout-engine';
import { RemotionPlaybackEngine } from './playback-engine';
import type { RemotionMediaResource } from './types';
export declare class RemotionProvider implements MediaProviderAdapter {
    readonly container: HTMLElement;
    protected readonly $$PROVIDER_TYPE = "REMOTION";
    readonly scope: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").S;
    protected _ctx: MediaSetupContext;
    protected _src: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").W<RemotionMediaResource<import("./types").RemotionInputProps> | null>;
    protected _setup: boolean;
    protected _played: number;
    protected _playedRange: TimeRange;
    protected _audio: any;
    protected _waiting: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").W<boolean>;
    protected _waitingPromise: DeferredPromise<void, string> | null;
    protected _mediaTags: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").W<PlayableMediaTag[]>;
    protected _mediaElements: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").W<HTMLMediaElement[]>;
    protected _bufferingElements: Set<HTMLMediaElement>;
    protected _timeline: TimelineContextValue | null;
    protected _frame: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").W<Record<string, number>>;
    protected _layoutEngine: RemotionLayoutEngine;
    protected _playbackEngine: RemotionPlaybackEngine | null;
    protected _setTimeline: SetTimelineContextValue;
    protected _setMediaVolume: SetMediaVolumeContextValue;
    protected get _notify(): <Type extends keyof import("vidstack").MediaEvents>(type: Type, ...init: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").aC<import("vidstack").MediaEvents[Type]> extends void | undefined ? [detail?: undefined, trigger?: Event | undefined] : [detail: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").aC<import("vidstack").MediaEvents[Type]>, trigger?: Event | undefined]) => void;
    get type(): string;
    get currentSrc(): RemotionMediaResource<import("./types").RemotionInputProps> | null;
    get frame(): Record<string, number>;
    constructor(container: HTMLElement);
    setup(ctx: MediaSetupContext): void;
    protected _watchMediaTags(): void;
    protected _discoverMediaElements(): void;
    protected _watchMediaElements(): void;
    protected _onFrameChange(frame: number): void;
    protected _onFrameEnd(): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    setMuted(value: React.SetStateAction<boolean>): void;
    setCurrentTime(time: number): void;
    setVolume(value: React.SetStateAction<number>): void;
    setPlaybackRate(rate: React.SetStateAction<number>): void;
    protected _getPlayedRange(currentTime: number): TimeRange;
    loadSource(src: MediaSrc): Promise<void>;
    destroy(): void;
    changeSrc(src: RemotionMediaResource | null): void;
    render: () => React.ReactNode;
    renderVideo: ({ src }: {
        src: RemotionMediaResource;
    }) => React.ReactNode;
    protected _ready(src: RemotionMediaResource | null): void;
    protected _onWaitFor(el: HTMLMediaElement): void;
    protected _onStopWaitingFor(el: HTMLMediaElement): void;
    protected _watchWaiting(): void;
    protected _setFrame(value: React.SetStateAction<Record<string, number>>): void;
    protected _setPlaying(value: React.SetStateAction<boolean>): void;
    protected _createTimelineContextValue(): TimelineContextValue;
}