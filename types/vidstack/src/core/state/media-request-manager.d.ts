import { FullscreenController } from '../../foundation/fullscreen/controller';
import { ScreenOrientationController } from '../../foundation/orientation/controller';
import { Queue } from '../../foundation/queue/queue';
import type { MediaContext } from '../api/media-context';
import * as RE from '../api/media-request-events';
import { MediaPlayerController } from '../api/player-controller';
import { MediaControls } from '../controls';
import type { MediaStateManager } from './media-state-manager';
/**
 * This class is responsible for listening to media request events and calling the appropriate
 * actions on the current media provider. Do note, actions are queued until a media provider
 * has connected.
 */
export declare class MediaRequestManager extends MediaPlayerController implements MediaRequestHandler {
    private _stateMgr;
    private _request;
    private _media;
    readonly _controls: MediaControls;
    readonly _fullscreen: FullscreenController;
    readonly _orientation: ScreenOrientationController;
    private readonly _$provider;
    private readonly _providerQueue;
    constructor(_stateMgr: MediaStateManager, _request: MediaRequestContext, _media: MediaContext);
    protected onAttach(): void;
    protected onConnect(): void;
    protected onDestroy(): void;
    private _watchProvider;
    private _handleRequest;
    _play(trigger?: Event): Promise<void>;
    _pause(trigger?: Event): Promise<void>;
    _seekToLiveEdge(trigger?: Event): void;
    private _wasPIPActive;
    _enterFullscreen(target?: RE.MediaFullscreenRequestTarget, trigger?: Event): Promise<void>;
    _exitFullscreen(target?: RE.MediaFullscreenRequestTarget, trigger?: Event): Promise<void>;
    private _getFullscreenAdapter;
    _enterPictureInPicture(trigger?: Event): Promise<void | PictureInPictureWindow>;
    _exitPictureInPicture(trigger?: Event): Promise<void>;
    private _throwIfPIPNotSupported;
    private _onControlsDelayChange;
    private _onFullscreenSupportChange;
    private _onPiPSupportChange;
    ['media-audio-track-change-request'](event: RE.MediaAudioTrackChangeRequestEvent): void;
    ['media-enter-fullscreen-request'](event: RE.MediaEnterFullscreenRequestEvent): Promise<void>;
    ['media-exit-fullscreen-request'](event: RE.MediaExitFullscreenRequestEvent): Promise<void>;
    private _onFullscreenChange;
    private _onFullscreenError;
    ['media-orientation-lock-request'](event: RE.MediaOrientationLockRequestEvent): Promise<void>;
    ['media-orientation-unlock-request'](event: RE.MediaOrientationUnlockRequestEvent): Promise<void>;
    ['media-enter-pip-request'](event: RE.MediaEnterPIPRequestEvent): Promise<void>;
    ['media-exit-pip-request'](event: RE.MediaExitPIPRequestEvent): Promise<void>;
    private _onPictureInPictureError;
    ['media-live-edge-request'](event: RE.MediaLiveEdgeRequestEvent): void;
    ['media-loop-request'](event: RE.MediaLoopRequestEvent): Promise<void>;
    ['media-pause-request'](event: RE.MediaPauseRequestEvent): Promise<void>;
    ['media-play-request'](event: RE.MediaPlayRequestEvent): Promise<void>;
    ['media-rate-change-request'](event: RE.MediaRateChangeRequestEvent): void;
    ['media-quality-change-request'](event: RE.MediaQualityChangeRequestEvent): void;
    ['media-pause-controls-request'](event: RE.MediaPauseControlsRequestEvent): void;
    ['media-resume-controls-request'](event: RE.MediaResumeControlsRequestEvent): void;
    ['media-seek-request'](event: RE.MediaSeekRequestEvent): void;
    ['media-seeking-request'](event: RE.MediaSeekingRequestEvent): void;
    ['media-start-loading'](event: RE.MediaStartLoadingRequestEvent): void;
    ['media-text-track-change-request'](event: RE.MediaTextTrackChangeRequestEvent): void;
    ['media-mute-request'](event: RE.MediaMuteRequestEvent): void;
    ['media-unmute-request'](event: RE.MediaUnmuteRequestEvent): void;
    ['media-volume-change-request'](event: RE.MediaVolumeChangeRequestEvent): void;
}
export declare class MediaRequestContext {
    _seeking: boolean;
    _looping: boolean;
    _replaying: boolean;
    _queue: Queue<MediaRequestQueueRecord>;
}
export interface MediaRequestQueueRecord {
    audioTrack: RE.MediaAudioTrackChangeRequestEvent;
    load: RE.MediaStartLoadingRequestEvent;
    play: RE.MediaPlayRequestEvent;
    pause: RE.MediaPauseRequestEvent;
    rate: RE.MediaRateChangeRequestEvent;
    volume: RE.MediaVolumeChangeRequestEvent | RE.MediaMuteRequestEvent | RE.MediaUnmuteRequestEvent;
    fullscreen: RE.MediaEnterFullscreenRequestEvent | RE.MediaExitFullscreenRequestEvent;
    orientation: RE.MediaOrientationLockRequestEvent | RE.MediaOrientationUnlockRequestEvent;
    seeked: RE.MediaSeekRequestEvent | RE.MediaLiveEdgeRequestEvent;
    seeking: RE.MediaSeekingRequestEvent;
    textTrack: RE.MediaTextTrackChangeRequestEvent;
    quality: RE.MediaQualityChangeRequestEvent;
    pip: RE.MediaEnterPIPRequestEvent | RE.MediaExitPIPRequestEvent;
    controls: RE.MediaResumeControlsRequestEvent | RE.MediaPauseControlsRequestEvent;
}
export type MediaRequestHandler = {
    [Type in keyof RE.MediaRequestEvents]: (event: RE.MediaRequestEvents[Type]) => unknown;
};
