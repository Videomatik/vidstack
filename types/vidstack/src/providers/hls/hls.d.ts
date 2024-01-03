import type * as HLS from 'hls.js';
import type { MediaSrc } from '../../core/api/types';
import type { MediaSetupContext } from '../types';
import type { HLSConstructor, HLSInstanceCallback } from './types';
export declare class HLSController {
    private _video;
    private _ctx;
    private _instance;
    private _stopLiveSync;
    _config: Partial<HLS.HlsConfig>;
    _callbacks: Set<HLSInstanceCallback>;
    get instance(): import("hls.js").default | null;
    constructor(_video: HTMLVideoElement);
    setup(ctor: HLSConstructor, ctx: MediaSetupContext): void;
    private _liveSync;
    private _liveSyncPosition;
    private _dispatchHLSEvent;
    private _onTracksFound;
    private _onCuesParsed;
    private _onAudioSwitch;
    private _onLevelSwitched;
    private _onLevelLoaded;
    private _onError;
    private _onFragLoading;
    private _retryLoadingTimer;
    private _onNetworkError;
    private _clearRetryTimer;
    private _onFatalError;
    private _enableAutoQuality;
    private _onQualityChange;
    private _onAudioChange;
    _loadSource(src: MediaSrc): void;
    _destroy(): void;
}
