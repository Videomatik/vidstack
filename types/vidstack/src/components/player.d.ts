import { Component } from 'maverick.js';
import { AudioTrackList, MediaControls, PlayerQueryList, TextRenderers, TextTrackList, VideoQualityList, type FindMediaPlayerEvent, type MediaFullscreenRequestTarget, type MediaPlayerConnectEvent, type MediaPlayerEvents, type MediaPlayerProps, type MediaPlayerState, type MediaStateAccessors } from '../core';
import { ScreenOrientationController } from '../foundation/orientation/controller';
import { RequestQueue } from '../foundation/queue/request-queue';
import type { AnyMediaProvider } from '../providers';
declare global {
    interface HTMLElementEventMap {
        'media-player-connect': MediaPlayerConnectEvent;
        'find-media-player': FindMediaPlayerEvent;
    }
}
/**
 * All media elements exist inside the `<media-player>` component. This component's main
 * responsibilities are to manage media state updates, dispatch media events, handle media
 * requests, and expose media state through HTML attributes and CSS properties for styling
 * purposes.
 *
 * @attr data-autoplay - Autoplay has successfully started.
 * @attr data-autoplay-error - Autoplay has failed to start.
 * @attr data-buffering - Media is not ready for playback or waiting for more data.
 * @attr data-can-fullscreen - Fullscreen mode is available.
 * @attr data-can-load - Media can now begin loading.
 * @attr data-can-pip - Picture-in-Picture mode is available.
 * @attr data-can-play - Media is ready for playback.
 * @attr data-can-seek - Seeking operations are permitted.
 * @attr data-captions - Captions are available and visible.
 * @attr data-controls - Controls are visible.
 * @attr data-ended - Playback has ended.
 * @attr data-error - Issue with media loading/playback.
 * @attr data-fullscreen - Fullscreen mode is active.
 * @attr data-ios-controls - iOS controls are visible.
 * @attr data-live - Media is live stream.
 * @attr data-live-edge - Playback is at the live edge.
 * @attr data-loop - Media is set to replay on end.
 * @attr data-media-type - Current media type (audio/video).
 * @attr data-muted - Whether volume is muted (0).
 * @attr data-orientation - Current screen orientation (landscape/portrait).
 * @attr data-paused - Whether playback is paused.
 * @attr data-pip - Picture-in-picture mode is active.
 * @attr data-playing - Playback is active.
 * @attr data-playsinline - Media should play inline by default (iOS).
 * @attr data-pointer - The user's pointer device type (coarse/fine).
 * @attr data-preview - The user is interacting with the time slider.
 * @attr data-seeking - User is seeking to a new playback position.
 * @attr data-started - Media playback has started.
 * @attr data-stream-type - Current stream type.
 * @attr data-view-type - Current view type (audio/video).
 * @attr data-waiting - Media is waiting for more data to resume playback.
 * @attr data-focus - Whether player is being keyboard focused.
 * @attr data-hocus - Whether player is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/media/player}
 */
export declare class MediaPlayer extends Component<MediaPlayerProps, MediaPlayerState, MediaPlayerEvents> implements MediaStateAccessors {
    static props: MediaPlayerProps;
    static state: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").y<import("../core").MediaState>;
    private _media;
    private _stateMgr;
    private _requestMgr;
    readonly canPlayQueue: RequestQueue;
    private get _provider();
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected onDestroy(): void;
    private _skipTitleUpdate;
    private _watchTitle;
    private _watchOrientation;
    private _watchCanPlay;
    private _setupMediaAttributes;
    private _onFindPlayer;
    private _onResize;
    private _onPointerChange;
    private _isIOSControls;
    /**
     * The current media provider.
     */
    get provider(): AnyMediaProvider | null;
    /**
     * Media controls settings.
     */
    get controls(): MediaControls;
    /**
     * Controls the screen orientation of the current browser window and dispatches orientation
     * change events on the player.
     */
    readonly orientation: ScreenOrientationController;
    /**
     * The title of the current media.
     */
    get title(): string;
    set title(newTitle: string);
    /**
     * A list of all `VideoQuality` objects representing the set of available video renditions.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/quality#quality-list}
     */
    get qualities(): VideoQualityList;
    /**
     * A list of all `AudioTrack` objects representing the set of available audio tracks.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/audio-tracks}
     */
    get audioTracks(): AudioTrackList;
    /**
     * A list of all `TextTrack` objects representing the set of available text tracks.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/text-tracks}
     */
    get textTracks(): TextTrackList;
    /**
     * Contains text renderers which are responsible for loading, parsing, and rendering text
     * tracks.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/text-tracks#text-renderer}
     */
    get textRenderers(): TextRenderers;
    get paused(): boolean;
    set paused(paused: boolean);
    private _watchPaused;
    private _queuePausedUpdate;
    get muted(): boolean;
    set muted(muted: boolean);
    private _watchMuted;
    private _queueMutedUpdate;
    get currentTime(): number;
    set currentTime(time: number);
    private _watchCurrentTime;
    private _queueCurrentTimeUpdate;
    get volume(): number;
    set volume(volume: number);
    private _watchVolume;
    private _queueVolumeUpdate;
    get playbackRate(): number;
    set playbackRate(rate: number);
    private _watchPlaybackRate;
    private _queuePlaybackRateUpdate;
    private _watchPlaysinline;
    private _queuePlaysinlineUpdate;
    /**
     * Begins/resumes playback of the media. If this method is called programmatically before the
     * user has interacted with the player, the promise may be rejected subject to the browser's
     * autoplay policies. This method will throw if called before media is ready for playback.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play}
     */
    play(trigger?: Event): Promise<void>;
    /**
     * Pauses playback of the media. This method will throw if called before media is ready for
     * playback.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause}
     */
    pause(trigger?: Event): Promise<void>;
    /**
     * Attempts to display the player in fullscreen. The promise will resolve if successful, and
     * reject if not. This method will throw if any fullscreen API is _not_ currently available.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/fullscreen}
     */
    enterFullscreen(target?: MediaFullscreenRequestTarget, trigger?: Event): Promise<void>;
    /**
     * Attempts to display the player inline by exiting fullscreen. This method will throw if any
     * fullscreen API is _not_ currently available.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/fullscreen}
     */
    exitFullscreen(target?: MediaFullscreenRequestTarget, trigger?: Event): Promise<void>;
    /**
     * Attempts to display the player in picture-in-picture mode. This method will throw if PIP is
     * not supported. This method will also return a `PictureInPictureWindow` if the current
     * provider supports it.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/picture-in-picture}
     */
    enterPictureInPicture(trigger?: Event): Promise<void | PictureInPictureWindow>;
    /**
     * Attempts to display the player in inline by exiting picture-in-picture mode. This method
     * will throw if not supported.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/picture-in-picture}
     */
    exitPictureInPicture(trigger?: Event): Promise<void>;
    /**
     * Sets the current time to the live edge (i.e., `duration`). This is a no-op for non-live
     * streams and will throw if called before media is ready for playback.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/live#live-edge}
     */
    seekToLiveEdge(trigger?: Event): void;
    /**
     * Called when media can begin loading. Calling this method will trigger the initial provider
     * loading process. Calling it more than once has no effect.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/loading#loading-strategies}
     */
    startLoading(trigger?: Event): void;
    /**
     * Returns a new `PlayerQueryList` object that can then be used to determine if the
     * player and document matches the query string, as well as to monitor any changes to detect
     * when it matches (or stops matching) that query.
     *
     * A player query supports the same syntax as media queries and allows media state properties
     * to be used like so:
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList}
     * @example
     * ```ts
     * const queryList = player.matchQuery("(width < 680) and (streamType: on-demand)");
     *
     * if (queryList.matches) {
     *  // ...
     * }
     *
     * // Listen for match changes.
     * queryList.addEventListener("change", () => {
     *   // ...
     * });
     * ```
     */
    matchQuery(query: string): PlayerQueryList;
    destroy(): void;
}
