/// <reference types="../vidstack/dom.d.ts" />
import { E as EventsTarget, D as DOMEvent, V as ViewController, a as DeferredPromise, I as InferEventDetail, S as State, b as Store, c as Scope, W as WriteSignal, R as ReadSignal, d as ReadSignalRecord, C as Context, e as Dispose, f as Component, g as StateContext } from './vidstack-framework.js';
import { CaptionsFileFormat, CaptionsParserFactory, VTTHeaderMetadata, VTTRegion, VTTCue as VTTCue$1 } from 'media-captions';
import * as HLS from 'hls.js';

type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'debug';

declare const GROUPED_LOG: unique symbol;
declare class GroupedLog {
    readonly logger: Logger;
    readonly level: LogLevel;
    readonly title: string;
    readonly root?: GroupedLog | undefined;
    readonly parent?: GroupedLog | undefined;
    readonly [GROUPED_LOG] = true;
    readonly logs: ({
        label?: string;
        data: any[];
    } | GroupedLog)[];
    constructor(logger: Logger, level: LogLevel, title: string, root?: GroupedLog | undefined, parent?: GroupedLog | undefined);
    log(...data: any[]): GroupedLog;
    labelledLog(label: string, ...data: any[]): GroupedLog;
    groupStart(title: string): GroupedLog;
    groupEnd(): GroupedLog;
    dispatch(): boolean;
}

declare class Logger {
    private _target;
    error(...data: any[]): boolean;
    warn(...data: any[]): boolean;
    info(...data: any[]): boolean;
    debug(...data: any[]): boolean;
    errorGroup(title: string): GroupedLog;
    warnGroup(title: string): GroupedLog;
    infoGroup(title: string): GroupedLog;
    debugGroup(title: string): GroupedLog;
    setTarget(newTarget: EventTarget | null): void;
    dispatch(level: LogLevel, ...data: any[]): boolean;
}

declare const ADD: unique symbol;
declare const REMOVE: unique symbol;
declare const RESET: unique symbol;
declare const SELECT: unique symbol;
declare const READONLY: unique symbol;
declare const SET_READONLY: unique symbol;
declare const ON_RESET: unique symbol;
declare const ON_REMOVE: unique symbol;
declare const ON_USER_SELECT: unique symbol;
/** @internal */
declare const ListSymbol: {
    readonly _add: typeof ADD;
    readonly _remove: typeof REMOVE;
    readonly _reset: typeof RESET;
    readonly _select: typeof SELECT;
    readonly _readonly: typeof READONLY;
    readonly _setReadonly: typeof SET_READONLY;
    readonly _onReset: typeof ON_RESET;
    readonly _onRemove: typeof ON_REMOVE;
    readonly _onUserSelect: typeof ON_USER_SELECT;
};

interface ListItem {
}
declare class List<Item extends ListItem, Events extends ListEvents> extends EventsTarget<Events> implements Iterable<Item> {
    [index: number]: Item | undefined;
    protected _items: Item[];
    protected [ListSymbol._readonly]: boolean;
    protected [ListSymbol._onReset]?(trigger?: Event): void;
    protected [ListSymbol._onRemove]?(item: Item, trigger?: Event): void;
    get length(): number;
    get readonly(): boolean;
    /**
     * Transform list to an array.
     */
    toArray(): Item[];
    [Symbol.iterator](): IterableIterator<Item>;
    [ListSymbol._add](item: Item, trigger?: Event): void;
    [ListSymbol._remove](item: Item, trigger?: Event): void;
    [ListSymbol._reset](trigger?: Event): void;
    [ListSymbol._setReadonly](readonly: boolean, trigger?: Event): void;
}
interface ListEvents<Item extends ListItem = ListItem> {
    add: ListAddEvent<Item>;
    remove: ListRemoveEvent<Item>;
    'readonly-change': ListReadonlyChangeEvent;
}
/**
 * Fired when an item has been added to the list.
 *
 * @detail item
 */
interface ListAddEvent<Item extends ListItem> extends DOMEvent<Item> {
}
/**
 * Fired when an item has been removed from the list.
 *
 * @detail item
 */
interface ListRemoveEvent<Item extends ListItem> extends DOMEvent<Item> {
}
/**
 * Fired when the readonly state of the list has changed.
 *
 * @detail isReadonly
 */
interface ListReadonlyChangeEvent extends DOMEvent<boolean> {
}

interface FullscreenEvents {
    'fullscreen-change': FullscreenChangeEvent;
    'fullscreen-error': FullscreenErrorEvent;
}
/**
 * Fired when an element enters/exits fullscreen. The event detail is a `boolean` indicating
 * if fullscreen was entered (`true`) or exited (`false`).
 *
 * @bubbles
 * @composed
 * @detail isFullscreen
 */
interface FullscreenChangeEvent extends DOMEvent<boolean> {
}
/**
 * Fired when an error occurs either entering or exiting fullscreen. This will generally occur
 * if the user has not interacted with the page yet.
 *
 * @bubbles
 * @composed
 * @detail error
 */
interface FullscreenErrorEvent extends DOMEvent<unknown> {
}

declare class FullscreenController extends ViewController<{}, {}, FullscreenEvents> implements FullscreenAdapter {
    /**
     * Tracks whether we're the active fullscreen event listener. Fullscreen events can only be
     * listened to globally on the document so we need to know if they relate to the current host
     * element or not.
     */
    private _listening;
    private _active;
    get active(): boolean;
    get supported(): boolean;
    protected onConnect(): void;
    protected _onDisconnect(): Promise<void>;
    protected _onFullscreenChange(event: Event): void;
    protected _onFullscreenError(event: Event): void;
    enter(): Promise<void>;
    exit(): Promise<void>;
}
declare function canFullscreen(): boolean;
interface FullscreenAdapter {
    /**
     * Whether the host element is in fullscreen mode.
     */
    readonly active: boolean;
    /**
     * Whether the native browser fullscreen API is available, or the current provider can
     * toggle fullscreen mode. This does not mean that the operation is guaranteed to be successful,
     * only that it can be attempted.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API}
     */
    readonly supported: boolean;
    /**
     * Request to display the current host element in fullscreen.
     *
     * @throws Error - if fullscreen API is not available.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen}
     */
    enter(): Promise<void>;
    /**
     * Attempt to exit fullscreen on the current host element.
     *
     * @throws Error - if fullscreen API is not available.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/exitFullscreen}
     */
    exit(): Promise<void>;
}

declare global {
    interface HTMLElementEventMap extends LoggerEvents {
    }
}
interface LoggerEvents {
    'vds-log': LogEvent;
}
interface LogEventDetail {
    /**
     * The log level.
     */
    level: LogLevel;
    /**
     * Data to be logged.
     */
    data?: any[];
}
/**
 * @bubbles
 * @composed
 * @detail log
 */
interface LogEvent extends DOMEvent<LogEventDetail> {
}

type ScreenOrientationType = 
/**
 * Landscape-primary is an orientation where the screen width is greater than the screen height.
 * If the device's natural orientation is landscape, then it is in landscape-primary when held
 * in that position. If the device's natural orientation is portrait, the user agent sets
 * landscape-primary from the two options as shown in the screen orientation values table.
 */
'landscape-primary'
/**
 * Landscape-secondary is an orientation where the screen width is greater than the screen
 * height. If the device's natural orientation is landscape, it is in landscape-secondary when
 * rotated 180º from its natural orientation. If the device's natural orientation is portrait,
 * the user agent sets landscape-secondary from the two options as shown in the screen
 * orientation values table.
 */
 | 'landscape-secondary'
/**
 * Portrait-primary is an orientation where the screen width is less than or equal to the screen
 * height. If the device's natural orientation is portrait, then it is in portrait-primary when
 * held in that position. If the device's natural orientation is landscape, the user agent sets
 * portrait-primary from the two options as shown in the screen orientation values table.
 */
 | 'portrait-primary'
/**
 * Portrait-secondary is an orientation where the screen width is less than or equal to the
 * screen height. If the device's natural orientation is portrait, then it is in
 * portrait-secondary when rotated 180º from its natural position. If the device's natural
 * orientation is landscape, the user agent sets portrait-secondary from the two options as
 * shown in the screen orientation values table.
 */
 | 'portrait-secondary';
type ScreenOrientationLockType = 
/**
 * Any is an orientation that means the screen can be locked to any one of portrait-primary,
 * portrait-secondary, landscape-primary and landscape-secondary.
 */
'any'
/**
 * Landscape is an orientation where the screen width is greater than the screen height and
 * depending on platform convention locking the screen to landscape can represent
 * landscape-primary, landscape-secondary or both.
 */
 | 'landscape'
/**
 * Landscape-primary is an orientation where the screen width is greater than the screen height.
 * If the device's natural orientation is landscape, then it is in landscape-primary when held
 * in that position. If the device's natural orientation is portrait, the user agent sets
 * landscape-primary from the two options as shown in the screen orientation values table.
 */
 | 'landscape-primary'
/**
 * Landscape-secondary is an orientation where the screen width is greater than the screen
 * height. If the device's natural orientation is landscape, it is in landscape-secondary when
 * rotated 180º from its natural orientation. If the device's natural orientation is portrait,
 * the user agent sets landscape-secondary from the two options as shown in the screen
 * orientation values table.
 */
 | 'landscape-secondary'
/**
 * Natural is an orientation that refers to either portrait-primary or landscape-primary
 * depending on the device's usual orientation. This orientation is usually provided by the
 * underlying operating system.
 */
 | 'natural'
/**
 * Portrait is an orientation where the screen width is less than or equal to the screen height
 * and depending on platform convention locking the screen to portrait can represent
 * portrait-primary, portrait-secondary or both.
 */
 | 'portrait'
/**
 * Portrait-primary is an orientation where the screen width is less than or equal to the screen
 * height. If the device's natural orientation is portrait, then it is in portrait-primary when
 * held in that position. If the device's natural orientation is landscape, the user agent sets
 * portrait-primary from the two options as shown in the screen orientation values table.
 */
 | 'portrait-primary'
/**
 * Portrait-secondary is an orientation where the screen width is less than or equal to the
 * screen height. If the device's natural orientation is portrait, then it is in
 * portrait-secondary when rotated 180º from its natural position. If the device's natural
 * orientation is landscape, the user agent sets portrait-secondary from the two options as
 * shown in the screen orientation values table.
 */
 | 'portrait-secondary';

interface ScreenOrientationEvents {
    'orientation-change': ScreenOrientationChangeEvent;
}
interface ScreenOrientationChangeEventDetail {
    orientation: ScreenOrientationType;
    lock?: ScreenOrientationLockType;
}
/**
 * Fired when the current screen orientation changes.
 *
 * @detail orientation
 */
interface ScreenOrientationChangeEvent extends DOMEvent<ScreenOrientationChangeEventDetail> {
}

declare class ScreenOrientationController extends ViewController<{}, {}, ScreenOrientationEvents> {
    private _type;
    private _locked;
    private _currentLock;
    /**
     * The current screen orientation type.
     *
     * @signal
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
     * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
     */
    get type(): ScreenOrientationType | undefined;
    /**
     * Whether the screen orientation is currently locked.
     *
     * @signal
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
     * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
     */
    get locked(): boolean;
    /**
     * Whether the viewport is in a portrait orientation.
     *
     * @signal
     */
    get portrait(): boolean;
    /**
     * Whether the viewport is in a landscape orientation.
     *
     * @signal
     */
    get landscape(): boolean;
    /**
     * Whether the native Screen Orientation API is available.
     */
    static readonly supported: boolean;
    /**
     * Whether the native Screen Orientation API is available.
     */
    get supported(): boolean;
    protected onConnect(): void;
    protected _onDisconnect(): Promise<void>;
    protected _onOrientationChange(event: Event): void;
    /**
     * Locks the orientation of the screen to the desired orientation type using the
     * Screen Orientation API.
     *
     * @param lockType - The screen lock orientation type.
     * @throws Error - If screen orientation API is unavailable.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
     * @see {@link https://w3c.github.io/screen-orientation}
     */
    lock(lockType: ScreenOrientationLockType): Promise<void>;
    /**
     * Unlocks the orientation of the screen to it's default state using the Screen Orientation
     * API. This method will throw an error if the API is unavailable.
     *
     * @throws Error - If screen orientation API is unavailable.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
     * @see {@link https://w3c.github.io/screen-orientation}
     */
    unlock(): Promise<void>;
    private _assertScreenOrientationAPI;
    private _getScreenOrientation;
}

declare class RequestQueue {
    protected _serving: boolean;
    protected _pending: DeferredPromise<void, void>;
    protected _queue: Map<string | symbol, () => void | Promise<void>>;
    /**
     * The number of callbacks that are currently in queue.
     */
    get _size(): number;
    /**
     * Whether items in the queue are being served immediately, otherwise they're queued to
     * be processed later.
     */
    get _isServing(): boolean;
    /**
     * Waits for the queue to be flushed (ie: start serving).
     */
    _waitForFlush(): Promise<void>;
    /**
     * Queue the given `callback` to be invoked at a later time by either calling the `serve()` or
     * `start()` methods. If the queue has started serving (i.e., `start()` was already called),
     * then the callback will be invoked immediately.
     *
     * @param key - Uniquely identifies this callback so duplicates are ignored.
     * @param callback - The function to call when this item in the queue is being served.
     */
    _enqueue(key: string | symbol, callback: () => void): void;
    /**
     * Invokes the callback with the given `key` in the queue (if it exists).
     */
    _serve(key: string | symbol): void;
    /**
     * Flush all queued items and start serving future requests immediately until `stop()` is called.
     */
    _start(): void;
    /**
     * Stop serving requests, they'll be queued until you begin processing again by calling `start()`.
     */
    _stop(): void;
    /**
     * Stop serving requests, empty the request queue, and release any promises waiting for the
     * queue to flush.
     */
    _reset(): void;
    protected _flush(): void;
    protected _release(): void;
}

type MediaKeyTarget = 'document' | 'player';
interface MediaKeyShortcuts {
    [keys: string]: MediaKeyShortcut | undefined;
    togglePaused?: MediaKeyShortcut;
    toggleMuted?: MediaKeyShortcut;
    toggleFullscreen?: MediaKeyShortcut;
    togglePictureInPicture?: MediaKeyShortcut;
    toggleCaptions?: MediaKeyShortcut;
    seekBackward?: MediaKeyShortcut;
    seekForward?: MediaKeyShortcut;
    speedUp?: MediaKeyShortcut;
    slowDown?: MediaKeyShortcut;
    volumeUp?: MediaKeyShortcut;
    volumeDown?: MediaKeyShortcut;
}
type MediaKeyShortcut = MediaKeysCallback | string | string[] | null;
interface MediaKeysCallback {
    keys: string | string[];
    callback(event: KeyboardEvent): void;
}

interface SelectListItem extends ListItem {
    selected: boolean;
}
declare class SelectList<Item extends SelectListItem, Events extends SelectListEvents<Item>> extends List<Item, Events> {
    get selected(): Item | null;
    get selectedIndex(): number;
    protected [ListSymbol._onRemove](item: Item, trigger?: Event): void;
    protected [ListSymbol._onUserSelect]?(): void;
    [ListSymbol._add](item: Omit<Item, 'selected'>, trigger?: Event): void;
    [ListSymbol._select](item: Item | undefined, selected: boolean, trigger?: Event): void;
}
interface SelectListEvents<Item extends SelectListItem = SelectListItem> extends ListEvents<Item> {
    change: SelectListChangeEvent<Item>;
}
/**
 * @detail change
 */
interface SelectListChangeEvent<Item extends SelectListItem> extends DOMEvent<SelectListChangeEventDetail<Item>> {
}
interface SelectListChangeEventDetail<Item extends SelectListItem> {
    prev: Item | null;
    current: Item | null;
}

declare const SET_AUTO: unique symbol;
declare const ENABLE_AUTO: unique symbol;
declare const QualitySymbol: {
    readonly _setAuto: typeof SET_AUTO;
    readonly _enableAuto: typeof ENABLE_AUTO;
};

/**
 * @see {@link https://vidstack.io/docs/player/core-concepts/quality#quality-list}
 */
declare class VideoQualityList extends SelectList<VideoQuality, VideoQualityListEvents> {
    private _auto;
    /**
     * Configures quality switching:
     *
     * - `current`: Trigger an immediate quality level switch. This will abort the current fragment
     * request if any, flush the whole buffer, and fetch fragment matching with current position
     * and requested quality level.
     *
     * - `next`: Trigger a quality level switch for next fragment. This could eventually flush
     * already buffered next fragment.
     *
     * - `load`: Set quality level for next loaded fragment.
     *
     * @see {@link https://www.vidstack.io/docs/player/api/video-quality#switch}
     * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#quality-switch-control-api}
     */
    switch: 'current' | 'next' | 'load';
    /**
     * Whether automatic quality selection is enabled.
     */
    get auto(): boolean;
    [QualitySymbol._enableAuto]?: () => void;
    protected [ListSymbol._onUserSelect](): void;
    protected [ListSymbol._onReset](trigger?: Event): void;
    /**
     * Request automatic quality selection (if supported). This will be a no-op if the list is
     * `readonly` as that already implies auto-selection.
     */
    autoSelect(trigger?: Event): void;
    [QualitySymbol._setAuto](auto: boolean, trigger?: Event): void;
}
interface VideoQuality extends SelectListItem {
    readonly id: string;
    readonly width: number;
    readonly height: number;
    readonly bitrate: number;
    readonly codec: string;
}
interface VideoQualityListEvents {
    add: VideoQualityAddEvent;
    remove: VideoQualityRemoveEvent;
    change: VideoQualityChangeEvent;
    'auto-change': VideoQualityAutoChangeEvent;
    'readonly-change': ListReadonlyChangeEvent;
}
interface VideoQualityListEvent<T> extends DOMEvent<T> {
    target: VideoQualityList;
}
/**
 * Fired when a video quality has been added to the list.
 *
 * @detail newQuality
 */
interface VideoQualityAddEvent extends VideoQualityListEvent<VideoQuality> {
}
/**
 * Fired when a video quality has been removed from the list.
 *
 * @detail removedQuality
 */
interface VideoQualityRemoveEvent extends VideoQualityListEvent<VideoQuality> {
}
/**
 * Fired when the selected video quality has changed.
 *
 * @detail change
 */
interface VideoQualityChangeEvent extends VideoQualityListEvent<VideoQualityChangeEventDetail> {
}
interface VideoQualityChangeEventDetail {
    prev: VideoQuality | null;
    current: VideoQuality;
}
/**
 * Fired when auto quality selection is enabled or disabled.
 */
interface VideoQualityAutoChangeEvent extends VideoQualityListEvent<boolean> {
}

declare class MediaPlayerDelegate {
    private _handle;
    private _media;
    constructor(_handle: (event: Event) => void, _media: MediaContext);
    _notify: <Type extends keyof MediaEvents>(type: Type, ...init: InferEventDetail<MediaEvents[Type]> extends void | undefined ? [detail?: undefined, trigger?: Event | undefined] : [detail: InferEventDetail<MediaEvents[Type]>, trigger?: Event | undefined]) => void;
    _ready(info?: {
        duration: number;
        seekable: TimeRanges;
        buffered: TimeRanges;
    }, trigger?: Event): Promise<void>;
    private _attemptAutoplay;
}

/**
 * Formats the given `duration` into a human readable form that can be displayed to the user.
 *
 * @param duration - The length of time to parse in seconds.
 * @param shouldPadHours - Whether to pad the hours to be length of 2.
 * @param shouldPadMinutes - Whether to pad the minutes to be length of 2.
 * @param shouldAlwaysShowHours - Whether to always show the hours unit.
 * @example `01:20 -> minutes:seconds`
 * @example `3:01:20 -> hours:minutes:seconds`
 * @example If `shouldPadHours` is `true` - `03:01:20`
 * @example If `shouldAlwaysShowHours` is `true` - `0:01:20`
 */
declare function formatTime(duration: number, shouldPadHours?: boolean | null, shouldPadMinutes?: boolean | null, shouldAlwaysShowHours?: boolean): string;
/**
 * Formats the given `duration` into human spoken form.
 *
 * @param duration - The length of time to parse in seconds.
 * @example `2 hour 3 min 4 sec`
 */
declare function formatSpokenTime(duration: number): string;

/**
 * Checks if the ScreenOrientation API is available.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
 */
declare function canOrientScreen(): boolean;
/**
 * Checks if the screen orientation can be changed.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
 */
declare function canRotateScreen(): boolean;
/**
 * Checks if the native HTML5 video player can play HLS.
 */
declare function canPlayHLSNatively(video?: HTMLVideoElement): boolean;
/**
 * Checks if the native HTML5 video player can enter picture-in-picture (PIP) mode when using
 * the Chrome browser.
 *
 * @see {@link https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture}
 */
declare function canUsePictureInPicture(video: HTMLVideoElement): boolean;
/**
 * Checks if the native HTML5 video player can use the presentation API in Safari.
 *
 * @see {@link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1631913-webkitpresentationmode}
 */
declare function canUseVideoPresentation(video: HTMLVideoElement | null): boolean;
declare function canChangeVolume(): Promise<boolean>;

interface MediaRequestEvents {
    'media-audio-track-change-request': MediaAudioTrackChangeRequestEvent;
    'media-enter-fullscreen-request': MediaEnterFullscreenRequestEvent;
    'media-exit-fullscreen-request': MediaExitFullscreenRequestEvent;
    'media-enter-pip-request': MediaEnterPIPRequestEvent;
    'media-exit-pip-request': MediaExitPIPRequestEvent;
    'media-live-edge-request': MediaLiveEdgeRequestEvent;
    'media-loop-request': MediaLoopRequestEvent;
    'media-orientation-lock-request': MediaOrientationLockRequestEvent;
    'media-orientation-unlock-request': MediaOrientationUnlockRequestEvent;
    'media-mute-request': MediaMuteRequestEvent;
    'media-pause-request': MediaPauseRequestEvent;
    'media-pause-controls-request': MediaPauseControlsRequestEvent;
    'media-play-request': MediaPlayRequestEvent;
    'media-quality-change-request': MediaQualityChangeRequestEvent;
    'media-rate-change-request': MediaRateChangeRequestEvent;
    'media-resume-controls-request': MediaResumeControlsRequestEvent;
    'media-seek-request': MediaSeekRequestEvent;
    'media-seeking-request': MediaSeekingRequestEvent;
    'media-start-loading': MediaStartLoadingRequestEvent;
    'media-text-track-change-request': MediaTextTrackChangeRequestEvent;
    'media-unmute-request': MediaUnmuteRequestEvent;
    'media-volume-change-request': MediaVolumeChangeRequestEvent;
}
/**
 * Fired when requesting media to begin loading. This will only take effect if the `loading`
 * strategy on the provider is set to `custom`.
 *
 * @bubbles
 * @composed
 */
interface MediaStartLoadingRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting to change the `mode` on a text track at the given index in the
 * `TextTrackList` on the player.
 *
 * @bubbles
 * @composed
 */
interface MediaTextTrackChangeRequestEvent extends DOMEvent<{
    index: number;
    mode: TextTrackMode;
}> {
}
/**
 * Fired when requesting the media to be muted.
 *
 * @bubbles
 * @composed
 */
interface MediaMuteRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting the media to be unmuted.
 *
 * @bubbles
 * @composed
 */
interface MediaUnmuteRequestEvent extends DOMEvent<void> {
}
/**
 * Whether to request fullscreen on the media (i.e., `<media-player>`). The `prefer-media` option
 * will first see if the native fullscreen API is available, if not it'll try the media provider.
 */
type MediaFullscreenRequestTarget = 'prefer-media' | 'media' | 'provider';
/**
 * Fired when requesting to change the current audio track to the given index in the
 * `AudioTrackList` on the player.
 *
 * @bubbles
 * @composed
 */
interface MediaAudioTrackChangeRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when requesting media to enter fullscreen. The event `detail` can specify the
 * fullscreen target, which can be the media or provider (defaults to `prefer-media`).
 *
 * @bubbles
 * @composed
 */
interface MediaEnterFullscreenRequestEvent extends DOMEvent<MediaFullscreenRequestTarget> {
}
/**
 * Fired when requesting media to exit fullscreen. The event `detail` can specify the fullscreen
 * target, which can be the media or provider (defaults to `prefer-media`).
 *
 * @bubbles
 * @composed
 */
interface MediaExitFullscreenRequestEvent extends DOMEvent<MediaFullscreenRequestTarget> {
}
/**
 * Fired when requesting media to enter picture-in-picture mode.
 *
 * @bubbles
 * @composed
 */
interface MediaEnterPIPRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting media to exit picture-in-picture mode.
 *
 * @bubbles
 * @composed
 */
interface MediaExitPIPRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting media to seek to the live edge (i.e., set the current time to the current
 * live time).
 */
interface MediaLiveEdgeRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting media playback to begin/resume.
 *
 * @bubbles
 * @composed
 */
interface MediaPlayRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting to change the current video quality to the given index in the
 * `VideoQualityList` on the player.
 *
 * @bubbles
 * @composed
 * @detail qualityIndex
 */
interface MediaQualityChangeRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when requesting to change the current playback rate.
 *
 * @bubbles
 * @composed
 * @detail rate
 */
interface MediaRateChangeRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when requesting media playback to temporarily stop.
 *
 * @bubbles
 * @composed
 */
interface MediaPauseRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting a time change. In other words, moving the play head to a new position.
 *
 * @bubbles
 * @composed
 * @detail seekTo
 */
interface MediaSeekRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when seeking/scrubbing to a new playback position.
 *
 * @bubbles
 * @composed
 * @detail time
 */
interface MediaSeekingRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when requesting the media volume to be set to a new level.
 *
 * @bubbles
 * @composed
 * @detail volume
 */
interface MediaVolumeChangeRequestEvent extends DOMEvent<number> {
}
/**
 * Fired when controls visibility tracking may resume. This is typically called after requesting
 * tracking to pause via `media-pause-controls-request`.
 *
 * @bubbles
 * @composed
 */
interface MediaResumeControlsRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when controls visibility tracking should pause. This is typically used when a control
 * is being actively interacted with, and we don't want the controls to be hidden before
 * the interaction is complete (eg: scrubbing, or settings is open).
 *
 * @bubbles
 * @composed
 */
interface MediaPauseControlsRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting the poster _should_ be rendered by the media provider. This should be
 * fired if a custom poster is _not_ being used.
 *
 * @bubbles
 * @composed
 */
interface MediaShowPosterRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting the poster should _not_ be rendered by the media provider. This
 * should be fired if a custom poster element is being used (e.g., `media-poster`).
 *
 * @bubbles
 * @composed
 */
interface MediaHidePosterRequestEvent extends DOMEvent<void> {
}
/**
 * Internal event that is fired by a media provider when requesting media playback to restart after
 * reaching the end. This event also helps notify the player that media will be looping.
 *
 * @bubbles
 * @composed
 */
interface MediaLoopRequestEvent extends DOMEvent<void> {
}
/**
 * Fired when requesting the screen orientation to be locked to a certain type.
 *
 * @bubbles
 * @composed
 */
interface MediaOrientationLockRequestEvent extends DOMEvent<ScreenOrientationLockType> {
}
/**
 * Fired when requesting the screen orientation to be unlocked.
 *
 * @bubbles
 * @composed
 */
interface MediaOrientationUnlockRequestEvent extends DOMEvent<void> {
}

/**
 * A simple facade for dispatching media requests to the nearest media player element.
 *
 * @docs {@link https://www.vidstack.io/docs/player/core-concepts/state#remote-control}
 * @docs {@link https://www.vidstack.io/docs/player/core-concepts/state#updating}
 *
 */
declare class MediaRemoteControl {
    private _logger;
    private _target;
    private _player;
    private _prevTrackIndex;
    constructor(_logger?: Logger | undefined);
    /**
     * Set the target from which to dispatch media requests events from. The events should bubble
     * up from this target to the `<media-player>` element.
     *
     * @example
     * ```ts
     * const button = document.querySelector('button');
     * remote.setTarget(button);
     * ```
     */
    setTarget(target: EventTarget | null): void;
    /**
     * Returns the current `<media-player>` element. This method will attempt to find the player by
     * searching up from either the given `target` or default target set via `remote.setTarget`.
     *
     * @example
     * ```ts
     * const player = remote.getPlayer();
     * ```
     */
    getPlayer(target?: EventTarget | null): MediaPlayer | null;
    /**
     * Set the current `<media-player>` element so the remote can support toggle methods such as
     * `togglePaused` as they rely on the current media state.
     */
    setPlayer(player: MediaPlayer | null): void;
    /**
     * Dispatch a request to start the media loading process. This will only work if the media
     * player has been initialized with a custom loading strategy `<media-player load="custom">`.
     *
     * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#loading-strategies}
     */
    startLoading(trigger?: Event): void;
    /**
     * Dispatch a request to begin/resume media playback.
     */
    play(trigger?: Event): void;
    /**
     * Dispatch a request to pause media playback.
     */
    pause(trigger?: Event): void;
    /**
     * Dispatch a request to set the media volume to mute (0).
     */
    mute(trigger?: Event): void;
    /**
     * Dispatch a request to unmute the media volume and set it back to it's previous state.
     */
    unmute(trigger?: Event): void;
    /**
     * Dispatch a request to enter fullscreen.
     *
     * @docs {@link https://www.vidstack.io/docs/player/core-concepts/fullscreen#remote-control}
     */
    enterFullscreen(target?: MediaFullscreenRequestTarget, trigger?: Event): void;
    /**
     * Dispatch a request to exit fullscreen.
     *
     * @docs {@link https://www.vidstack.io/docs/player/core-concepts/fullscreen#remote-control}
     */
    exitFullscreen(target?: MediaFullscreenRequestTarget, trigger?: Event): void;
    /**
     * Dispatch a request to lock the screen orientation.
     *
     * @docs {@link https://www.vidstack.io/docs/player/core-concepts/screen-orientation#remote-control}
     */
    lockScreenOrientation(lockType: ScreenOrientationLockType, trigger?: Event): void;
    /**
     * Dispatch a request to unlock the screen orientation.
     *
     * @docs {@link https://www.vidstack.io/docs/player/core-concepts/screen-orientation#remote-control}
     */
    unlockScreenOrientation(trigger?: Event): void;
    /**
     * Dispatch a request to enter picture-in-picture mode.
     *
     * @docs {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture#remote-control}
     */
    enterPictureInPicture(trigger?: Event): void;
    /**
     * Dispatch a request to exit picture-in-picture mode.
     *
     * @docs {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture#remote-control}
     */
    exitPictureInPicture(trigger?: Event): void;
    /**
     * Notify the media player that a seeking process is happening and to seek to the given `time`.
     */
    seeking(time: number, trigger?: Event): void;
    /**
     * Notify the media player that a seeking operation has completed and to seek to the given `time`.
     * This is generally called after a series of `remote.seeking()` calls.
     */
    seek(time: number, trigger?: Event): void;
    seekToLiveEdge(trigger?: Event): void;
    /**
     * Dispatch a request to update the media volume to the given `volume` level which is a value
     * between 0 and 1.
     *
     * @example
     * ```ts
     * remote.changeVolume(0); // 0%
     * remote.changeVolume(0.05); // 5%
     * remote.changeVolume(0.5); // 50%
     * remote.changeVolume(0.75); // 70%
     * remote.changeVolume(1); // 100%
     * ```
     */
    changeVolume(volume: number, trigger?: Event): void;
    /**
     * Dispatch a request to change the current audio track.
     *
     * @example
     * ```ts
     * remote.changeAudioTrack(1); // track at index 1
     * ```
     */
    changeAudioTrack(index: number, trigger?: Event): void;
    /**
     * Dispatch a request to change the video quality. The special value `-1` represents auto quality
     * selection.
     *
     * @example
     * ```ts
     * remote.changeQuality(-1); // auto
     * remote.changeQuality(1); // quality at index 1
     * ```
     */
    changeQuality(index: number, trigger?: Event): void;
    /**
     * Request auto quality selection.
     */
    requestAutoQuality(trigger?: Event): void;
    /**
     * Dispatch a request to change the mode of the text track at the given index.
     *
     * @example
     * ```ts
     * remote.changeTextTrackMode(1, 'showing'); // track at index 1
     * ```
     */
    changeTextTrackMode(index: number, mode: TextTrackMode, trigger?: Event): void;
    /**
     * Dispatch a request to change the media playback rate.
     *
     * @example
     * ```ts
     * remote.changePlaybackRate(0.5); // Half the normal speed
     * remote.changePlaybackRate(1); // Normal speed
     * remote.changePlaybackRate(1.5); // 50% faster than normal
     * remote.changePlaybackRate(2); // Double the normal speed
     * ```
     */
    changePlaybackRate(rate: number, trigger?: Event): void;
    /**
     * Dispatch a request to resume idle tracking on controls.
     */
    resumeControls(trigger?: Event): void;
    /**
     * Dispatch a request to pause controls idle tracking. Pausing tracking will result in the
     * controls being visible until `remote.resumeControls()` is called. This method
     * is generally used when building custom controls and you'd like to prevent the UI from
     * disappearing.
     *
     * @example
     * ```ts
     * // Prevent controls hiding while menu is being interacted with.
     * function onSettingsOpen() {
     *   remote.pauseControls();
     * }
     *
     * function onSettingsClose() {
     *   remote.resumeControls();
     * }
     * ```
     */
    pauseControls(trigger?: Event): void;
    /**
     * Dispatch a request to toggle the media playback state.
     */
    togglePaused(trigger?: Event): void;
    /**
     * Dispatch a request to toggle the controls visibility.
     */
    toggleControls(trigger?: Event): void;
    /**
     * Dispatch a request to toggle the media muted state.
     */
    toggleMuted(trigger?: Event): void;
    /**
     * Dispatch a request to toggle the media fullscreen state.
     *
     * @docs {@link https://www.vidstack.io/docs/player/core-concepts/fullscreen#remote-control}
     */
    toggleFullscreen(target?: MediaFullscreenRequestTarget, trigger?: Event): void;
    /**
     * Dispatch a request to toggle the media picture-in-picture mode.
     *
     * @docs {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture#remote-control}
     */
    togglePictureInPicture(trigger?: Event): void;
    /**
     * Turn captions off.
     */
    disableCaptions(trigger?: Event): void;
    /**
     * Dispatch a request to toggle the current captions mode.
     */
    toggleCaptions(trigger?: Event): void;
    private _dispatchRequest;
    private _noPlayerWarning;
}

/**
 * @see {@link https://vidstack.io/docs/player/core-concepts/audio-tracks}
 */
declare class AudioTrackList extends SelectList<AudioTrack, AudioTrackListEvents> {
    getById(id: string): AudioTrack | null;
}
/**
 * @see {@link https://vidstack.io/docs/player/core-concepts/audio-tracks}
 */
interface AudioTrack extends SelectListItem {
    /**
     * A string which uniquely identifies the track within the media.
     */
    readonly id: string;
    /**
     * A human-readable label for the track, or an empty string if unknown.
     */
    readonly label: string;
    /**
     * A string specifying the audio track's primary language, or an empty string if unknown. The
     * language is specified as a BCP 47 (RFC 5646) language code, such as "en-US" or "pt-BR".
     */
    readonly language: string;
    /**
     * A string specifying the category into which the track falls. For example, the main audio
     * track would have a kind of "main".
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioTrack/kind}
     */
    readonly kind: string;
}
interface AudioTrackListEvents {
    add: AudioTrackAddEvent;
    remove: AudioTrackRemoveEvent;
    change: AudioTrackChangeEvent;
    'readonly-change': ListReadonlyChangeEvent;
}
interface AudioTrackListEvent<T> extends DOMEvent<T> {
    target: AudioTrackList;
}
/**
 * Fired when an audio track has been added to the list.
 *
 * @detail newTrack
 */
interface AudioTrackAddEvent extends AudioTrackListEvent<AudioTrack> {
}
/**
 * Fired when an audio track has been removed from the list.
 *
 * @detail removedTrack
 */
interface AudioTrackRemoveEvent extends AudioTrackListEvent<AudioTrack> {
}
/**
 * Fired when the selected audio track has changed.
 *
 * @detail change
 */
interface AudioTrackChangeEvent extends AudioTrackListEvent<ChangeAudioTrackEventDetail> {
}
interface ChangeAudioTrackEventDetail {
    prev: AudioTrack | null;
    current: AudioTrack;
}

declare const CROSSORIGIN: unique symbol;
declare const READY_STATE: unique symbol;
declare const UPDATE_ACTIVE_CUES: unique symbol;
declare const CAN_LOAD: unique symbol;
declare const ON_MODE_CHANGE: unique symbol;
declare const NATIVE: unique symbol;
declare const NATIVE_HLS: unique symbol;
declare const TextTrackSymbol: {
    readonly _crossorigin: typeof CROSSORIGIN;
    readonly _readyState: typeof READY_STATE;
    readonly _updateActiveCues: typeof UPDATE_ACTIVE_CUES;
    readonly _canLoad: typeof CAN_LOAD;
    readonly _onModeChange: typeof ON_MODE_CHANGE;
    readonly _native: typeof NATIVE;
    readonly _nativeHLS: typeof NATIVE_HLS;
};

/**
 * - 0: Not Loading
 * - 1: Loading
 * - 2: Ready
 * - 3: Error
 */
type TextTrackReadyState = 0 | 1 | 2 | 3;
declare class TextTrack extends EventsTarget<TextTrackEvents> {
    static createId(track: TextTrack | TextTrackInit): string;
    readonly src?: string;
    readonly content?: string;
    readonly type?: 'json' | CaptionsFileFormat | CaptionsParserFactory;
    readonly encoding?: string;
    readonly id = "";
    readonly label = "";
    readonly language = "";
    readonly kind: TextTrackKind;
    readonly default = false;
    private _canLoad;
    private _currentTime;
    private _mode;
    private _metadata;
    private _regions;
    private _cues;
    private _activeCues;
    [TextTrackSymbol._readyState]: TextTrackReadyState;
    [TextTrackSymbol._crossorigin]?: () => string | null;
    [TextTrackSymbol._onModeChange]: (() => void) | null;
    [TextTrackSymbol._native]: {
        default?: boolean;
        track: {
            mode: TextTrackMode;
            addCue(cue: any): void;
            removeCue(cue: any): void;
        };
        remove?(): void;
    } | null;
    get metadata(): Readonly<VTTHeaderMetadata>;
    get regions(): ReadonlyArray<VTTRegion>;
    get cues(): ReadonlyArray<VTTCue$1>;
    get activeCues(): ReadonlyArray<VTTCue$1>;
    /**
     * - 0: Not Loading
     * - 1: Loading
     * - 2: Ready
     * - 3: Error
     */
    get readyState(): TextTrackReadyState;
    get mode(): TextTrackMode;
    set mode(mode: TextTrackMode);
    constructor(init: TextTrackInit);
    addCue(cue: VTTCue$1, trigger?: Event): void;
    removeCue(cue: VTTCue$1, trigger?: Event): void;
    setMode(mode: TextTrackMode, trigger?: Event): void;
    [TextTrackSymbol._updateActiveCues](currentTime: number, trigger?: Event): void;
    [TextTrackSymbol._canLoad](): void;
    private _load;
    private _readyState;
    private _errorState;
    private _parseJSON;
    private _activeCuesChanged;
}
interface TextTrackInit {
    /**
     * A unique identifier.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/id}
     */
    id?: string;
    /**
     * URL of the text track resource. This attribute must be specified and its URL value must have
     * the same origin as the document — unless the <audio> or <video> parent element of the track
     * element has a `crossorigin` attribute.
     */
    readonly src?: string;
    /**
     * Used to directly pass in text track file contents.
     */
    readonly content?: string;
    /**
     * The captions file format to be parsed or a custom parser factory (functions that returns a
     * captions parser). Supported types include: 'vtt', 'srt', 'ssa', 'ass', and 'json'.
     *
     * @defaultValue 'vtt'
     */
    readonly type?: 'json' | CaptionsFileFormat | CaptionsParserFactory;
    /**
     * The text encoding type to be used when decoding data bytes to text.
     *
     * @defaultValue 'utf-8'
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API/Encodings}
     *
     */
    readonly encoding?: string;
    /**
     * Indicates that the track should be enabled unless the user's preferences indicate that
     * another track is more appropriate. This may only be used on one track element per media
     * element.
     *
     * @defaultValue false
     */
    default?: boolean;
    /**
     * The kind of text track this object represents. This decides how the track will be handled
     * by the player.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/kind}
     */
    readonly kind: TextTrackKind;
    /**
     * A human-readable label for the text track. This will be displayed to the user.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/label}
     */
    readonly label?: string;
    /**
     * A string containing a language identifier. For example, `"en-US"` for United States English
     * or `"pt-BR"` for Brazilian Portuguese.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/language}
     * @see {@link https://datatracker.ietf.org/doc/html/rfc5646}
     */
    readonly language?: string;
}
interface TextTrackEvents {
    'load-start': TextTrackLoadStartEvent;
    load: TextTrackLoadEvent;
    error: TextTrackErrorEvent;
    'add-cue': TextTrackAddCueEvent;
    'remove-cue': TextTrackRemoveCueEvent;
    'cue-change': TextTrackCueChangeEvent;
    'mode-change': TextTrackModeChangeEvent;
}
interface TextTrackEvent<T> extends DOMEvent<T> {
    target: TextTrack;
}
/**
 * Fired when the text track begins the loading/parsing process.
 */
interface TextTrackLoadStartEvent extends TextTrackEvent<void> {
}
/**
 * Fired when the text track has finished loading/parsing.
 */
interface TextTrackLoadEvent extends TextTrackEvent<void> {
}
/**
 * Fired when loading or parsing the text track fails.
 */
interface TextTrackErrorEvent extends TextTrackEvent<Error> {
}
/**
 * Fired when a cue is added to the text track.
 */
interface TextTrackAddCueEvent extends TextTrackEvent<VTTCue$1> {
}
/**
 * Fired when a cue is removed from the text track.
 */
interface TextTrackRemoveCueEvent extends TextTrackEvent<VTTCue$1> {
}
/**
 * Fired when the active cues for the current text track have changed.
 */
interface TextTrackCueChangeEvent extends TextTrackEvent<void> {
}
/**
 * Fired when the text track mode (showing/hidden/disabled) has changed.
 */
interface TextTrackModeChangeEvent extends TextTrackEvent<TextTrack> {
}
declare function isTrackCaptionKind(track: TextTrack): boolean;
declare function parseJSONCaptionsFile(json: string, Cue: typeof VTTCue$1, Region?: typeof VTTRegion): {
    regions: VTTRegion[];
    cues: VTTCue$1[];
};

declare class TextRenderers {
    private _media;
    private _video;
    private _textTracks;
    private _renderers;
    private _nativeDisplay;
    private _nativeRenderer;
    private _customRenderer;
    constructor(_media: MediaContext);
    private _watchControls;
    add(renderer: TextRenderer): void;
    remove(renderer: TextRenderer): void;
    _attachVideo(video: HTMLVideoElement | null): void;
    private _addNativeTrack;
    private _removeNativeTrack;
    private _onAddTrack;
    private _onRemoveTrack;
    private _update;
    private _detach;
}
interface TextRenderer {
    readonly priority: number;
    canRender(track: TextTrack, video: HTMLVideoElement | null): boolean;
    attach(video: HTMLVideoElement | null): any;
    detach(): void;
    changeTrack(track: TextTrack | null): void;
}

/**
 * @see {@link https://vidstack.io/docs/player/core-concepts/text-tracks}
 */
declare class TextTrackList extends List<TextTrack, TextTrackListEvents> {
    private _canLoad;
    private _defaults;
    /** @internal */
    [TextTrackSymbol._crossorigin]?: () => string | null;
    get selected(): TextTrack | null;
    add(init: TextTrackInit | TextTrack, trigger?: Event): this;
    remove(track: TextTrack, trigger?: Event): this | undefined;
    clear(trigger?: Event): this;
    getById(id: string): TextTrack | null;
    getByKind(kind: TextTrackKind | TextTrackKind[]): TextTrack[];
    [TextTrackSymbol._canLoad](): void;
    private _onTrackModeChangeBind;
    private _onTrackModeChange;
}
interface TextTrackListEvents {
    add: TextTrackAddEvent;
    remove: TextTrackRemoveEvent;
    'mode-change': TextTrackListModeChangeEvent;
    'readonly-change': ListReadonlyChangeEvent;
}
interface TextTrackListEvent<T> extends DOMEvent<T> {
    target: TextTrackList;
}
/**
 * Fired when a text track has been added to the list.
 *
 * @detail newTrack
 */
interface TextTrackAddEvent extends TextTrackListEvent<TextTrack> {
}
/**
 * Fired when a text track has been removed from the list.
 *
 * @detail removedTrack
 */
interface TextTrackRemoveEvent extends TextTrackListEvent<TextTrack> {
}
/**
 * Fired when the mode of any text track in the list has changed.
 *
 * @detail track
 */
interface TextTrackListModeChangeEvent extends TextTrackListEvent<TextTrack> {
}

/**
 * The current media type.
 */
type MediaType = 'unknown' | 'audio' | 'video';
/**
 * The current media stream type.
 */
type MediaStreamType = 'unknown' | 'on-demand' | 'live' | 'live:dvr' | 'll-live' | 'll-live:dvr';
/**
 * Indicates the current view type which determines how the media will be presented.
 */
type MediaViewType = 'unknown' | 'audio' | 'video';
/**
 * Indicates the type of strategy that should be used to initiate the loading process.
 *
 * @docs {@see https://www.vidstack.io/docs/player/core-concepts/loading#loading-strategies}
 */
type MediaLoadingStrategy = 'eager' | 'idle' | 'visible' | 'custom';
/**
 * A number which represents the general type of error that occurred.
 *
 * - *Abort Error Code (1):* The fetching of the associated resource was aborted by the user's
 * request.
 *
 * - *Network Error Code (2):* Some kind of network error occurred which prevented the media from
 * being successfully fetched, despite having previously been available.
 *
 * - *Decode Error Code (3):* Despite having previously been determined to be usable, an error
 * occurred while trying to decode the media resource, resulting in an error.
 *
 * - *Invalid Resource Error Code (4):* The associated resource or media provider object (such as
 * a `MediaStream`) has been found to be unsuitable.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaError
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaError/code
 */
type MediaErrorCode = 1 | 2 | 3 | 4;
interface MediaErrorDetail {
    message: string;
    code: MediaErrorCode;
    error?: Error;
    mediaError?: MediaError;
}
type MediaResource = string | MediaStream | MediaSource | Blob;
interface MediaSrc<T = unknown> {
    src: T;
    type: string;
}

interface MediaPlayerState extends MediaState {
}
declare const mediaState: State<MediaState>;
/**
 * Resets all media state and leaves general player state intact (i.e., `autoplay`, `volume`, etc.).
 */
declare function softResetMediaState($media: MediaStore): void;
interface MediaStore extends Store<MediaState> {
}
interface PlayerStore extends MediaStore {
}
interface MediaState {
    /**
     * Whether playback should automatically begin as soon as enough media is available to do so
     * without interruption.
     *
     * Sites which automatically play audio (or videos with an audio track) can be an unpleasant
     * experience for users, so it should be avoided when possible. If you must offer autoplay
     * functionality, you should make it opt-in (requiring a user to specifically enable it).
     *
     * However, autoplay can be useful when creating media elements whose source will be set at a
     * later time, under user control.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/autoplay}
     */
    autoplay: boolean;
    /**
     * Set to an error when autoplay has failed to begin playback. This can be used to determine
     * when to show a recovery UI in the event autoplay fails.
     *
     * @defaultValue null
     */
    autoplayError: {
        muted: boolean;
        error: Error;
    } | null;
    /**
     * Returns a `TimeRanges` object that indicates the ranges of the media source that the
     * browser has buffered (if any) at the moment the buffered property is accessed. This is usually
     * contiguous but if the user jumps about while media is buffering, it may contain holes.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered}
     * @defaultValue TimeRanges
     */
    buffered: TimeRanges;
    /**
     * The earliest time in seconds for which media has been buffered (i.e., downloaded by the
     * browser).
     *
     * @defaultValue 0
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered}
     */
    readonly bufferedStart: number;
    /**
     * The latest time in seconds for which media has been buffered (i.e., downloaded by the
     * browser).
     *
     * @defaultValue 0
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered}
     */
    readonly bufferedEnd: number;
    /**
     * A `double` indicating the total playback length of the media in seconds. If no media data is
     * available, the returned value is `0`. If the media is of indefinite length (such as
     * streamed live media, a WebRTC call's media, or similar), the value is `+Infinity`.
     *
     * @defaultValue 0
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/duration}
     */
    duration: number;
    /**
     * Whether the native browser Fullscreen API is available, or the current provider can
     * toggle fullscreen mode. This does not mean that the operation is guaranteed to be successful,
     * only that it can be attempted.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API}
     */
    canFullscreen: boolean;
    /**
     * Whether the native Screen Orientation API and required methods (lock/unlock) are available.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen_Orientation_API}
     */
    canOrientScreen: boolean;
    /**
     * Whether picture-in-picture mode is supported by the current media provider.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API}
     */
    canPictureInPicture: boolean;
    /**
     * Whether media is allowed to begin loading. This depends on the `loading` configuration.
     * If `eager`, `canLoad` will be `true` immediately, and if `lazy` this will become `true`
     * once the media has entered the viewport.
     */
    canLoad: boolean;
    /**
     * Whether the user agent can play the media, but estimates that **not enough** data has been
     * loaded to play the media up to its end without having to stop for further buffering of
     * content.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event}
     */
    canPlay: boolean;
    /**
     * Whether seeking operations are possible on the current stream. This generally false for
     * live streams that are loaded natively.
     *
     * @defaultValue true
     */
    readonly canSeek: boolean;
    /**
     * Indicates whether a user interface should be shown for controlling the resource. Set this to
     * `false` when you want to provide your own custom controls, and `true` if you want the current
     * provider to supply its own default controls. Depending on the provider, changing this prop
     * may cause the player to completely reset.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controls}
     */
    controls: boolean;
    /**
     * Defines how the media element handles cross-origin requests, thereby enabling the
     * configuration of the CORS requests for the element's fetched data.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin}
     */
    crossorigin: string | null;
    /**
     * The URL of the current poster. Defaults to `''` if no media/poster has been given or
     * loaded.
     *
     * @defaultValue ''
     */
    poster: string;
    /**
     * A `double` indicating the current playback time in seconds. Defaults to `0` if the media has
     * not started to play and has not seeked. Setting this value seeks the media to the new
     * time. The value can be set to a minimum of `0` and maximum of the total length of the
     * media (indicated by the duration prop).
     *
     * @defaultValue 0
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime}
     */
    currentTime: number;
    /**
     * Whether media playback has reached the end. In other words it'll be true
     * if `currentTime === duration`.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended}
     */
    ended: boolean;
    /**
     * Contains the most recent media error or undefined if there's been none. You can listen for
     * `error` event updates and examine this object to debug further.
     *
     * @defaultValue null
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error}
     */
    error: MediaErrorDetail | null;
    /**
     * Whether the player is currently in fullscreen mode.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API}
     */
    fullscreen: boolean;
    /**
     * Whether the controls are visible. By default, controls will be hidden when media playback
     * is progressing (playing) without any detected user activity for a set period of time
     * (default is 2.5s).
     *
     * @defaultValue false
     */
    controlsVisible: boolean;
    /**
     * Whether the user has intentionally seeked behind the live edge. The user must've seeked
     * roughly 2 or more seconds behind during a live stream for this to be considered true.
     *
     * @defaultValue false
     */
    userBehindLiveEdge: boolean;
    /**
     * Whether media should automatically start playing from the beginning (replay) every time
     * it ends.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loop}
     */
    loop: boolean;
    /**
     * The current log level. Values in order of priority are: `silent`, `error`, `warn`, `info`,
     * and `debug`.
     */
    logLevel: LogLevel;
    /**
     * Whether the current media stream is live (i.e., being broadcast right now).
     */
    live: boolean;
    /**
     * The number of seconds that `currentTime` can be behind `liveEdgeStart` and still be considered
     * at the edge. The default value is 10, meaning the user can be up to 10 seconds behind the
     * live edge start and still be considered live.
     *
     * @defaultValue 10
     */
    liveEdgeTolerance: number;
    /**
     * The minimum seekable length in seconds before seeking operations are permitted.
     *
     * @defaultValue 30
     */
    minLiveDVRWindow: number;
    /**
     * Whether the current stream is at the live edge. This is true if:
     *
     * 1. The player is _not_ in a paused state.
     * 2. The user has _not_ intentionally seeked behind live edge start.
     * 3. The `currentTime` is greater or equal than `liveEdgeStart`.
     *
     * This value will default to `false` for non-live streams.
     *
     * @defaultValue false
     */
    readonly liveEdge: boolean;
    /**
     * This is the starting edge of the live stream.
     *
     * A delay is applied in `hls.js` that's specified by the `liveSyncDurationCount` which is
     * expressed as a multiple of `EXT-X-TARGETDURATION` (default value is safely set to 3). If
     * set to `m`, playback will start from the fragment at `n-m`, where `n` is the last fragment
     * of the live playlist. Decreasing this value is likely to cause playback stalls.
     *
     * The `seekableEnd` value is used as the live edge start in native playback engines.
     *
     * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#hlslivesyncposition}
     * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#livesyncdurationcount}
     * @see {@link https://github.com/video-dev/media-ui-extensions/blob/main/proposals/0007-live-edge.md}
     */
    readonly liveEdgeStart: number;
    /**
     * The length of the live edge window in seconds starting from `liveEdgeStart` and ending at
     * `seekableEnd`. If the `duration` of the stream is `Infinity` or the stream is non-live then
     * this value will default to 0.
     */
    readonly liveEdgeWindow: number;
    /**
     * The type of media that is currently active, whether it's audio or video. Defaults
     * to `unknown` when no media has been loaded or the type cannot be determined.
     *
     * @defaultValue 'unknown'
     */
    mediaType: MediaType;
    /**
     * Whether the audio is muted or not.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/muted}
     */
    muted: boolean;
    /**
     * Whether playback should be paused. Defaults to `true` if no media has loaded or playback has
     * not started. Setting this to `false` will begin/resume playback.
     *
     * @defaultValue true
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/paused}
     */
    paused: boolean;
    /**
     * Contains the ranges of the media source that the browser has played, if any.
     *
     * @defaultValue TimeRanges
     */
    played: TimeRanges;
    /**
     * Whether media is actively playing back. Defaults to `false` if no media has
     * loaded or playback has not started.
     *
     * @defaultValue false
     */
    playing: boolean;
    /**
     * Whether the video is to be played "inline", that is within the element's playback area. Note
     * that setting this to `false` does not imply that the video will always be played in fullscreen.
     * Depending on the provider, changing this prop may cause the player to completely reset.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-playsinline}
     */
    playsinline: boolean;
    /**
     * Sets the rate at which the media is being played back. This is used to implement user
     * controls for fast forward, slow motion, and so forth. The normal playback rate is multiplied
     * by this value to obtain the current rate, so a value of 1.0 indicates normal speed.
     *
     * Examples:
     *
     * - `0.5` = slow down to 50% of the normal speed
     * - `1.5` = speed up normal speed by 50%
     * - `2` = double the normal speed
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playbackRate}
     */
    playbackRate: number;
    /**
     * Whether the player is currently in picture-in-picture mode.
     *
     * @defaultValue false
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API}
     */
    pictureInPicture: boolean;
    /**
     * Configures the preload setting of the underlying media provider once it can load (see
     * `loading` property).
     *
     * The `preload` attribute provides a hint to the browser about what the author thinks will
     * lead to the best user experience with regards to what content is loaded before the video is
     * played. The recommended default is `metadata`.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload}
     */
    preload: 'none' | 'metadata' | 'auto';
    /**
     * Whether auto quality selection is active.
     */
    autoQuality: boolean;
    /**
     * The list of available video qualities/renditions. This will be empty if quality information
     * is not provided by the current media provider.
     */
    qualities: VideoQuality[];
    /**
     * The current playback quality. This will be `null` if quality information is not provided
     * by the current media provider.
     */
    quality: VideoQuality | null;
    /**
     * The list of available audio tracks. This will be empty if audio track information is not
     * provided by the current media provider.
     */
    audioTracks: AudioTrack[];
    /**
     * The current audio track. This will be `null` if audio track information is not provided by
     *  the current media provider.
     */
    audioTrack: AudioTrack | null;
    /**
     * Whether the current video quality list is read-only, meaning quality selections can only
     * be set internally by the media provider. This will only be `false` when working with particular
     * third-party embeds such as YouTube.
     */
    canSetQuality: boolean;
    /**
     * Whether the current playback rate can be set. This will only be `false` when working with
     * particular third-party embeds such as Vimeo (only available to pro/business accounts).
     */
    canSetPlaybackRate: boolean;
    /**
     * Whether the current volume can be changed. This depends on the current provider and browser
     * environment. It will generally be `false` on mobile devices as it's set by system controls.
     */
    canSetVolume: boolean;
    /**
     * Contains the time ranges that the user is able to seek to, if any. This tells us which parts
     * of the media can be played without delay; this is irrespective of whether that part has
     * been downloaded or not.
     *
     * Some parts of the media may be seekable but not buffered if byte-range
     * requests are enabled on the server. Byte range requests allow parts of the media file to
     * be delivered from the server and so can be ready to play almost immediately — thus they are
     * seekable.
     *
     * @defaultValue TimeRanges
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seekable}
     */
    seekable: TimeRanges;
    /**
     * Contains the earliest time in seconds at which media can be seeked to. Generally this is
     * zero, but for live streams it may start at a non-zero value.
     *
     * @defaultValue 0
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seekable}
     */
    readonly seekableStart: number;
    /**
     * The latest time in seconds at which media can be seeked to. This will default to `Infinity`
     * if no seekable range is found. If byte-range requests are enabled on the server this should
     * be equal to the media duration - note for live streams duration is a moving target.
     *
     * @defaultValue Infinity
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seekable}
     */
    readonly seekableEnd: number;
    /**
     * The length of the seekable window in seconds starting from `seekableStart` and ending at
     * `seekableEnd`.
     *
     * @defaultValue 0
     */
    readonly seekableWindow: number;
    /**
     * Whether media is actively seeking to a new playback position.
     *
     * @defaultValue false
     */
    seeking: boolean;
    /**
     * The URL and optionally type of the current media resource/s to be considered for playback.
     * Use `source` to get the currently loaded resource.
     *
     * @defaultValue []
     */
    sources: MediaSrc[];
    /**
     * The chosen media resource. Defaults to `{ src: '', type: '' }` if no media has been loaded.
     *
     * @defaultValue { src: '', type: '' }
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentSrc}
     */
    source: MediaSrc;
    /** Alias for `source`. */
    currentSrc: MediaSrc;
    /**
     * Whether media playback has started. In other words it will be true if `currentTime > 0`.
     *
     * @defaultValue false
     */
    started: boolean;
    /**
     * The current media stream type. This value helps determine what type of UI should be
     * displayed and whether seeking operations are permitted during live streams. If seeking
     * is permitted, set this value to `live:dvr` or `ll-live:dvr`.
     */
    streamType: MediaStreamType;
    /**
     * The title of the current media.
     */
    title: string;
    /**
     * The list of all available text tracks.
     */
    textTracks: TextTrack[];
    /**
     * The current captions/subtitles text track that is showing.
     */
    textTrack: TextTrack | null;
    /**
     * The type of player view that should be used (i.e., audio or video). By default this is set
     * to `video`.
     *
     * @defaultValue 'unknown'
     */
    viewType: MediaViewType;
    /**
     * An `int` between `0` (silent) and `1` (loudest) indicating the audio volume. Defaults to `1`.
     *
     * @defaultValue 1
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume}
     */
    volume: number;
    /**
     * Whether playback has temporarily stopped because of a lack of temporary data.
     *
     * @defaultValue false
     */
    waiting: boolean;
    /**
     * The user's pointing device type.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer}
     */
    pointer: 'fine' | 'coarse';
    /**
     * The current screen orientation.
     */
    orientation: 'portrait' | 'landscape';
    /**
     * The width of the media player container in pixels.
     */
    width: number;
    /**
     * The height of the media player container in pixels.
     */
    height: number;
    /**
     * The width of the media provider in pixels.
     */
    mediaWidth: number;
    /**
     * The height of the media in provider pixels.
     */
    mediaHeight: number;
    autoplaying: boolean;
    providedTitle: string;
    inferredTitle: string;
    providedPoster: string;
    inferredPoster: string;
    inferredViewType: MediaViewType;
    providedViewType: MediaViewType;
    providedStreamType: MediaStreamType;
    inferredStreamType: MediaStreamType;
    liveSyncPosition: number | null;
}

interface MediaStateAccessors extends Pick<MediaState, 'paused' | 'muted' | 'volume' | 'currentTime' | 'playbackRate'> {
}
type PlayerSrc = MediaResource | {
    src: MediaResource;
    type?: string;
} | {
    src: MediaResource;
    type?: string;
}[];
interface MediaPlayerProps extends Pick<MediaState, 'autoplay' | 'controls' | 'currentTime' | 'loop' | 'muted' | 'paused' | 'playsinline' | 'poster' | 'preload' | 'playbackRate' | 'viewType' | 'volume' | 'title' | 'streamType' | 'liveEdgeTolerance' | 'minLiveDVRWindow'> {
    /**
     * Defines how the media element handles cross-origin requests, thereby enabling the
     * configuration of the CORS requests for the element's fetched data.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin}
     */
    crossorigin: string | true | null;
    /**
     * The URL and optionally type of the current media resource/s to be considered for playback.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/loading#loading-source}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/src}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject}
     */
    src: PlayerSrc;
    /**
     * The current log level. Values in order of priority are: `silent`, `error`, `warn`, `info`,
     * and `debug`.
     */
    logLevel: LogLevel;
    /**
     * Indicates when the provider can begin loading media.
     *
     * - `eager`: media will be loaded immediately.
     * - `idle`: media will be loaded after the page has loaded and `requestIdleCallback` is fired.
     * - `visible`: media will delay loading until the provider has entered the viewport.
     * - `custom`: media will wait for the `startLoading()` method or `media-start-loading` event.
     *
     *  @see {@link https://vidstack.io/docs/player/core-concepts/loading#loading-strategies}
     */
    load: MediaLoadingStrategy;
    /**
     * The default amount of delay in milliseconds while media playback is progressing without user
     * activity to indicate an idle state and hide controls.
     */
    controlsDelay: number;
    /**
     * Whether controls visibility should be toggled when the mouse enters and leaves the player
     * container.
     */
    hideControlsOnMouseLeave: boolean;
    /**
     * This method will indicate the orientation to lock the screen to when in fullscreen mode and
     * the Screen Orientation API is available.
     */
    fullscreenOrientation: ScreenOrientationLockType | undefined;
    /**
     * Whether native HLS support is preferred over using `hls.js`. We recommend setting this to
     * `false` to ensure a consistent and configurable experience across browsers. In addition, our
     * live stream support and DVR detection is much better with `hls.js` so choose accordingly.
     *
     * This should generally only be set to `true` if (1) you're working with HLS streams, and (2)
     * you want AirPlay to work via the native Safari controls (i.e., `controls` attribute is
     * present on the `<media-player>` element).
     */
    preferNativeHLS: boolean;
    /**
     * Whether keyboard support is disabled for the media player globally. This property won't disable
     * standard ARIA keyboard controls for individual components when focused.
     *
     * @defaultValue 'false'
     */
    keyDisabled: boolean;
    /**
     * The target on which to listen for keyboard events (e.g., `keydown`):
     *
     * - `document`: the player will listen for events on the entire document. In the case that
     * multiple players are on the page, only the most recently active player will receive input.
     * - `player`: the player will listen for events on the player itself or one of its children
     * were recently interacted with.
     *
     * @defaultValue `player`
     */
    keyTarget: MediaKeyTarget;
    /**
     * Extends global media player keyboard shortcuts. The shortcuts can be specified as a
     * space-separated list of combinations (e.g., `p Control+Space`), array, or callbacks. See the
     * provided doc link for more information.
     *
     * Do note, if `aria-keyshortcuts` is specified on a component then it will take precedence
     * over the respective value set here.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-keyshortcuts}
     * @example
     * ```ts
     * player.keyShortcuts = {
     *  // Space-separated list.
     *  togglePaused: 'k Space',
     *  toggleMuted: 'm',
     *  toggleFullscreen: 'f',
     *  togglePictureInPicture: 'i',
     *  toggleCaptions: 'c',
     *  // Array.
     *  seekBackward: ['j', 'J', 'ArrowLeft'],
     *  seekForward: ['l', 'L', 'ArrowRight'],
     *  volumeUp: 'ArrowUp',
     *  volumeDown: 'ArrowDown',
     *  speedUp: '>',
     *  slowDown: '<',
     *  // Callback.
     *  fooBar: {
     *    keys: ['k', 'Space'],
     *    callback(event) {}
     *   },
     * }
     * ```
     */
    keyShortcuts: MediaKeyShortcuts;
}

interface MediaContext {
    player: MediaPlayer;
    scope: Scope;
    remote: MediaRemoteControl;
    delegate: MediaPlayerDelegate;
    qualities: VideoQualityList;
    audioTracks: AudioTrackList;
    textTracks: TextTrackList;
    textRenderers: TextRenderers;
    ariaKeys: MediaKeyShortcuts;
    logger?: Logger;
    $provider: WriteSignal<MediaProviderAdapter | null>;
    $providerSetup: WriteSignal<boolean>;
    $iosControls: ReadSignal<boolean>;
    $props: ReadSignalRecord<MediaPlayerProps>;
    $state: PlayerStore;
    activeMenu?: {
        close(trigger?: Event): void;
    } | null;
}
declare const mediaContext: Context<MediaContext>;

/**
 * This HTML media provider adapts the underlying media element such as `<audio>` or `<video>` to
 * satisfy the media provider interface.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement}
 */
declare class HTMLMediaProvider implements MediaProviderAdapter {
    protected _media: HTMLMediaElement;
    readonly scope: Scope;
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

/**
 * The audio provider adapts the `<audio>` element to enable loading audio via the HTML Media
 * Element API.
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/audio}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio}
 * @example
 * ```html
 * <media-player src="https://media-files.vidstack.io/audio.mp3">
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
declare class AudioProvider extends HTMLMediaProvider implements MediaProviderAdapter {
    protected $$PROVIDER_TYPE: string;
    get type(): string;
    setup(ctx: MediaSetupContext): void;
    /**
     * The native HTML `<audio>` element.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement}
     */
    get audio(): HTMLAudioElement;
}

/**
 * The video provider adapts the `<video>` element to enable loading videos via the HTML Media
 * Element API.
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/video}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video}
 * @example
 * ```html
 * <media-player
 *   src="https://media-files.vidstack.io/720p.mp4"
 *   poster="https://media-files.vidstack.io/poster.png"
 * >
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
declare class VideoProvider extends HTMLMediaProvider implements MediaProviderAdapter {
    protected $$PROVIDER_TYPE: string;
    get type(): string;
    fullscreen?: MediaFullscreenAdapter;
    pictureInPicture?: MediaPictureInPictureAdapter;
    constructor(video: HTMLVideoElement, ctx: MediaContext);
    setup(ctx: MediaSetupContext): void;
    /**
     * The native HTML `<video>` element.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement}
     */
    get video(): HTMLVideoElement;
}

interface HLSProviderEvents {
    'hls-lib-load-start': HLSLibLoadStartEvent;
    'hls-lib-loaded': HLSLibLoadedEvent;
    'hls-lib-load-error': HLSLibLoadErrorEvent;
    'hls-instance': HLSInstanceEvent;
    'hls-unsupported': HLSUnsupportedEvent;
    'hls-media-attaching': HLSMediaAttachingEvent;
    'hls-media-attached': HLSMediaAttachedEvent;
    'hls-media-detaching': HLSMediaDetachingEvent;
    'hls-media-detached': HLSMediaDetachedEvent;
    'hls-buffer-reset': HLSBufferResetEvent;
    'hls-buffer-codecs': HLSBufferCodecsEvent;
    'hls-buffer-created': HLSBufferCreatedEvent;
    'hls-buffer-appending': HLSBufferAppendingEvent;
    'hls-buffer-appended': HLSBufferAppendedEvent;
    'hls-buffer-eos': HLSBufferEosEvent;
    'hls-buffer-flushing': HLSBufferFlushingEvent;
    'hls-buffer-flushed': HLSBufferFlushedEvent;
    'hls-manifest-loading': HLSManifestLoadingEvent;
    'hls-manifest-loaded': HLSManifestLoadedEvent;
    'hls-manifest-parsed': HLSManifestParsedEvent;
    'hls-level-switching': HLSLevelSwitchingEvent;
    'hls-level-switched': HLSLevelSwitchedEvent;
    'hls-level-loading': HLSLevelLoadingEvent;
    'hls-level-loaded': HLSLevelLoadedEvent;
    'hls-level-updated': HLSLevelUpdatedEvent;
    'hls-level-pts-updated': HLSLevelPtsUpdatedEvent;
    'hls-levels-updated': HLSLevelsUpdatedEvent;
    'hls-audio-tracks-updated': HLSAudioTracksUpdatedEvent;
    'hls-audio-track-switching': HLSAudioTrackSwitchingEvent;
    'hls-audio-track-switched': HLSAudioTrackSwitchedEvent;
    'hls-audio-track-loading': HLSAudioTrackLoadingEvent;
    'hls-audio-track-loaded': HLSAudioTrackLoadedEvent;
    'hls-subtitle-tracks-updated': HLSSubtitleTracksUpdatedEvent;
    'hls-subtitle-tracks-cleared': HLSSubtitleTracksClearedEvent;
    'hls-subtitle-track-switch': HLSSubtitleTrackSwitchEvent;
    'hls-subtitle-track-loading': HLSSubtitleTrackLoadingEvent;
    'hls-subtitle-track-loaded': HLSSubtitleTrackLoadedEvent;
    'hls-subtitle-frag-processed': HLSSubtitleFragProcessedEvent;
    'hls-cues-parsed': HLSCuesParsedEvent;
    'hls-non-native-text-tracks-found': HLSNonNativeTextTracksFoundEvent;
    'hls-init-pts-found': HLSInitPtsFoundEvent;
    'hls-frag-loading': HLSFragLoadingEvent;
    'hls-frag-load-emergency-aborted': HLSFragLoadEmergencyAbortedEvent;
    'hls-frag-loaded': HLSFragLoadedEvent;
    'hls-frag-decrypted': HLSFragDecryptedEvent;
    'hls-frag-parsing-init-segment': HLSFragParsingInitSegmentEvent;
    'hls-frag-parsing-userdata': HLSFragParsingUserdataEvent;
    'hls-frag-parsing-metadata': HLSFragParsingMetadataEvent;
    'hls-frag-parsed': HLSFragParsedEvent;
    'hls-frag-buffered-data': HLSFragBufferedDataEvent;
    'hls-frag-changed': HLSFragChangedEvent;
    'hls-fps-drop': HLSFpsDropEvent;
    'hls-fps-drop-level-capping': HLSFpsDropLevelCappingEvent;
    'hls-error': HLSErrorEvent;
    'hls-destroying': HLSDestroyingEvent;
    'hls-key-loading': HLSKeyLoadingEvent;
    'hls-key-loaded': HLSKeyLoadedEvent;
    'hls-back-buffer-reached': HLSBackBufferReachedEvent;
}
interface HLSMediaEvent<DetailType = unknown> extends DOMEvent<DetailType> {
    target: MediaPlayer;
}
/**
 * Fired when the browser begins downloading the `hls.js` library.
 */
interface HLSLibLoadStartEvent extends HLSMediaEvent<void> {
}
/**
 * Fired when the `hls.js` library has been loaded.
 *
 * @detail constructor
 */
interface HLSLibLoadedEvent extends HLSMediaEvent<typeof HLS.default> {
}
/**
 * Fired when the `hls.js` library fails during the download process.
 *
 * @detail error
 */
interface HLSLibLoadErrorEvent extends HLSMediaEvent<Error> {
}
/**
 * Fired when the `hls.js` instance is built. This will not fire if the browser does not
 * support `hls.js`.
 *
 * @detail instance
 */
interface HLSInstanceEvent extends HLSMediaEvent<HLS.default> {
}
/**
 * Fired when the browser doesn't support HLS natively, _and_ `hls.js` doesn't support
 * this environment either, most likely due to missing Media Extensions or video codecs.
 */
interface HLSUnsupportedEvent extends HLSMediaEvent<void> {
}
/**
 * Fired before `MediaSource` begins attaching to the media element.
 *
 * @detail data
 */
interface HLSMediaAttachingEvent extends HLSMediaEvent<HLS.MediaAttachingData> {
}
/**
 * Fired when `MediaSource` has been successfully attached to the media element.
 *
 * @detail data
 */
interface HLSMediaAttachedEvent extends HLSMediaEvent<HLS.MediaAttachedData> {
}
/**
 * Fired before detaching `MediaSource` from the media element.
 */
interface HLSMediaDetachingEvent extends HLSMediaEvent<void> {
}
/**
 * Fired when `MediaSource` has been detached from media element.
 */
interface HLSMediaDetachedEvent extends HLSMediaEvent<void> {
}
/**
 * Fired when we buffer is going to be reset.
 */
interface HLSBufferResetEvent extends HLSMediaEvent<void> {
}
/**
 * Fired when we know about the codecs that we need buffers for to push into.
 *
 * @detail data
 */
interface HLSBufferCodecsEvent extends HLSMediaEvent<HLS.BufferCodecsData> {
}
/**
 * Fired when `SourceBuffer`'s have been created.
 *
 * @detail data
 */
interface HLSBufferCreatedEvent extends HLSMediaEvent<HLS.BufferCreatedData> {
}
/**
 * Fired when we begin appending a media segment to the buffer.
 *
 * @detail data
 */
interface HLSBufferAppendingEvent extends HLSMediaEvent<HLS.BufferAppendingData> {
}
/**
 * Fired when we are done with appending a media segment to the buffer.
 *
 * @detail data
 */
interface HLSBufferAppendedEvent extends HLSMediaEvent<HLS.BufferAppendedData> {
}
/**
 * Fired when the stream is finished and we want to notify the media buffer that there will be no
 * more data.
 *
 * @detail data
 */
interface HLSBufferEosEvent extends HLSMediaEvent<HLS.BufferEOSData> {
}
/**
 * Fired when the media buffer should be flushed.
 *
 * @detail data
 */
interface HLSBufferFlushingEvent extends HLSMediaEvent<HLS.BufferFlushingData> {
}
/**
 * Fired when the media buffer has been flushed.
 *
 * @detail data
 */
interface HLSBufferFlushedEvent extends HLSMediaEvent<HLS.BufferFlushedData> {
}
/**
 * Fired to signal that manifest loading is starting.
 *
 * @detail data
 */
interface HLSManifestLoadingEvent extends HLSMediaEvent<HLS.ManifestLoadingData> {
}
/**
 * Fired after the manifest has been loaded.
 *
 * @detail data
 */
interface HLSManifestLoadedEvent extends HLSMediaEvent<HLS.ManifestLoadedData> {
}
/**
 * Fired after manifest has been parsed.
 *
 * @detail data
 */
interface HLSManifestParsedEvent extends HLSMediaEvent<HLS.ManifestParsedData> {
}
/**
 * Fired when a level switch is requested.
 *
 * @detail data
 */
interface HLSLevelSwitchingEvent extends HLSMediaEvent<HLS.LevelSwitchingData> {
}
/**
 * Fired when a level switch is effective.
 *
 * @detail data
 */
interface HLSLevelSwitchedEvent extends HLSMediaEvent<HLS.LevelSwitchedData> {
}
/**
 * Fired when a level playlist loading starts.
 *
 * @detail data
 */
interface HLSLevelLoadingEvent extends HLSMediaEvent<HLS.LevelLoadingData> {
}
/**
 * Fired when a level playlist loading finishes.
 *
 * @detail data
 */
interface HLSLevelLoadedEvent extends HLSMediaEvent<HLS.LevelLoadedData> {
}
/**
 * Fired when a level's details have been updated based on previous details, after it has been
 * loaded.
 *
 * @detail data
 */
interface HLSLevelUpdatedEvent extends HLSMediaEvent<HLS.LevelUpdatedData> {
}
/**
 * Fired when a level's PTS information has been updated after parsing a fragment.
 *
 * @detail data
 */
interface HLSLevelPtsUpdatedEvent extends HLSMediaEvent<HLS.LevelPTSUpdatedData> {
}
/**
 * Fired when a level is removed after calling `removeLevel()`.
 *
 * @detail data
 */
interface HLSLevelsUpdatedEvent extends HLSMediaEvent<HLS.LevelsUpdatedData> {
}
/**
 * Fired to notify that the audio track list has been updated.
 *
 * @detail data
 */
interface HLSAudioTracksUpdatedEvent extends HLSMediaEvent<HLS.AudioTracksUpdatedData> {
}
/**
 * Fired when an audio track switching is requested.
 *
 * @detail data
 */
interface HLSAudioTrackSwitchingEvent extends HLSMediaEvent<HLS.AudioTrackSwitchingData> {
}
/**
 * Fired when an audio track switch actually occurs.
 *
 * @detail data
 */
interface HLSAudioTrackSwitchedEvent extends HLSMediaEvent<HLS.AudioTrackSwitchedData> {
}
/**
 * Fired when loading an audio track starts.
 *
 * @detail data
 */
interface HLSAudioTrackLoadingEvent extends HLSMediaEvent<HLS.TrackLoadingData> {
}
/**
 * Fired when loading an audio track finishes.
 *
 * @detail data
 */
interface HLSAudioTrackLoadedEvent extends HLSMediaEvent<HLS.AudioTrackLoadedData> {
}
/**
 * Fired to notify that the subtitle track list has been updated.
 *
 * @detail data
 */
interface HLSSubtitleTracksUpdatedEvent extends HLSMediaEvent<HLS.SubtitleTracksUpdatedData> {
}
/**
 * Fired to notify that subtitle tracks were cleared as a result of stopping the media.
 */
interface HLSSubtitleTracksClearedEvent extends HLSMediaEvent<void> {
}
/**
 * Fired when a subtitle track switch occurs.
 *
 * @detail data
 */
interface HLSSubtitleTrackSwitchEvent extends HLSMediaEvent<HLS.SubtitleTrackSwitchData> {
}
/**
 * Fired when loading a subtitle track starts.
 *
 * @detail data
 */
interface HLSSubtitleTrackLoadingEvent extends HLSMediaEvent<HLS.TrackLoadingData> {
}
/**
 * Fired when loading a subtitle track finishes.
 *
 * @detail data
 */
interface HLSSubtitleTrackLoadedEvent extends HLSMediaEvent<HLS.SubtitleTrackLoadedData> {
}
/**
 * Fired when a subtitle fragment has been processed.
 *
 * @detail data
 */
interface HLSSubtitleFragProcessedEvent extends HLSMediaEvent<HLS.SubtitleFragProcessedData> {
}
/**
 * Fired when a set of `VTTCue`'s to be managed externally has been parsed.
 *
 * @detail data
 */
interface HLSCuesParsedEvent extends HLSMediaEvent<HLS.CuesParsedData> {
}
/**
 * Fired when a text track to be managed externally is found.
 *
 * @detail data
 */
interface HLSNonNativeTextTracksFoundEvent extends HLSMediaEvent<HLS.NonNativeTextTracksData> {
}
/**
 * Fired when the first timestamp is found.
 *
 * @detail data
 */
interface HLSInitPtsFoundEvent extends HLSMediaEvent<HLS.InitPTSFoundData> {
}
/**
 * Fired when loading a fragment starts.
 *
 * @detail data
 */
interface HLSFragLoadingEvent extends HLSMediaEvent<HLS.FragLoadingData> {
}
/**
 * Fired when fragment loading is aborted for emergency switch down.
 *
 * @detail data
 */
interface HLSFragLoadEmergencyAbortedEvent extends HLSMediaEvent<HLS.FragLoadEmergencyAbortedData> {
}
/**
 * Fired when fragment loading is completed.
 *
 * @detail data
 */
interface HLSFragLoadedEvent extends HLSMediaEvent<HLS.FragLoadedData> {
}
/**
 * Fired when a fragment has finished decrypting.
 *
 * @detail data
 */
interface HLSFragDecryptedEvent extends HLSMediaEvent<HLS.FragDecryptedData> {
}
/**
 * Fired when `InitSegment` has been extracted from a fragment.
 *
 * @detail data
 */
interface HLSFragParsingInitSegmentEvent extends HLSMediaEvent<HLS.FragParsingInitSegmentData> {
}
/**
 * Fired when parsing sei text is completed.
 *
 * @detail data
 */
interface HLSFragParsingUserdataEvent extends HLSMediaEvent<HLS.FragParsingUserdataData> {
}
/**
 * Fired when parsing id3 is completed.
 *
 * @detail data
 */
interface HLSFragParsingMetadataEvent extends HLSMediaEvent<HLS.FragParsingMetadataData> {
}
/**
 * Fired when fragment parsing is completed.
 *
 * @detail data
 */
interface HLSFragParsedEvent extends HLSMediaEvent<HLS.FragParsedData> {
}
/**
 * Fired when fragment remuxed MP4 boxes have all been appended into `SourceBuffer`.
 *
 * @detail data
 */
interface HLSFragBufferedDataEvent extends HLSMediaEvent<HLS.FragBufferedData> {
}
/**
 * Fired when fragment matching with current media position is changing.
 *
 * @detail data
 */
interface HLSFragChangedEvent extends HLSMediaEvent<HLS.FragChangedData> {
}
/**
 * Fired when a FPS drop is identified.
 *
 * @detail data
 */
interface HLSFpsDropEvent extends HLSMediaEvent<HLS.FPSDropData> {
}
/**
 * Fired when FPS drop triggers auto level capping.
 *
 * @detail data
 */
interface HLSFpsDropLevelCappingEvent extends HLSMediaEvent<HLS.FPSDropLevelCappingData> {
}
/**
 * Fired when an error has occurred during loading or playback.
 *
 * @detail data
 */
interface HLSErrorEvent extends HLSMediaEvent<HLS.ErrorData> {
}
/**
 * Fired when the `hls.js` instance is being destroyed. Different from `hls-media-detached` as
 * one could want to detach, and reattach media to the `hls.js` instance to handle mid-rolls.
 */
interface HLSDestroyingEvent extends HLSMediaEvent<void> {
}
/**
 * Fired when a decrypt key loading starts.
 *
 * @detail data
 */
interface HLSKeyLoadingEvent extends HLSMediaEvent<HLS.KeyLoadingData> {
}
/**
 * Fired when a decrypt key has been loaded.
 *
 * @detail data
 */
interface HLSKeyLoadedEvent extends HLSMediaEvent<HLS.KeyLoadedData> {
}
/**
 * Fired when the back buffer is reached as defined by the `backBufferLength` config option.
 *
 * @detail data
 */
interface HLSBackBufferReachedEvent extends HLSMediaEvent<HLS.BackBufferData> {
}

type HLSConstructor = typeof HLS.default;
type HLSConstructorLoader = () => Promise<{
    default: HLSConstructor;
} | undefined>;
type HLSLibrary = HLSConstructor | HLSConstructorLoader | string | undefined;
type HLSInstanceCallback = (hls: HLS.default) => void;

/**
 * The HLS provider introduces support for HLS streaming via the popular `hls.js`
 * library. HLS streaming is either [supported natively](https://caniuse.com/?search=hls) (generally
 * on iOS), or in environments that [support the Media Stream API](https://caniuse.com/?search=mediastream).
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/hls}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video}
 * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md}
 * @example
 * ```html
 * <media-player
 *   src="https://media-files.vidstack.io/hls/index.m3u8"
 *   poster="https://media-files.vidstack.io/poster.png"
 * >
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
declare class HLSProvider extends VideoProvider implements MediaProviderAdapter {
    protected $$PROVIDER_TYPE: string;
    private _ctor;
    private readonly _controller;
    /**
     * The `hls.js` constructor.
     */
    get ctor(): typeof HLS.default | null;
    /**
     * The current `hls.js` instance.
     */
    get instance(): HLS.default | null;
    /**
     * Whether `hls.js` is supported in this environment.
     */
    static supported: boolean;
    get type(): string;
    get canLiveSync(): boolean;
    protected _library: HLSLibrary;
    /**
     * The `hls.js` configuration object.
     *
     * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning}
     */
    get config(): Partial<HLS.HlsConfig>;
    set config(config: Partial<HLS.HlsConfig>);
    /**
     * The `hls.js` constructor (supports dynamic imports) or a URL of where it can be found.
     *
     * @defaultValue `https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js`
     */
    get library(): HLSLibrary;
    set library(library: HLSLibrary);
    preconnect(): void;
    setup(ctx: MediaSetupContext): void;
    loadSource(src: MediaSrc, preload?: HTMLMediaElement['preload']): Promise<void>;
    /**
     * The given callback is invoked when a new `hls.js` instance is created and right before it's
     * attached to media.
     */
    onInstance(callback: HLSInstanceCallback): Dispose;
    destroy(): void;
}

declare class RAFLoop {
    private _callback;
    private _id;
    constructor(_callback: () => void);
    _start(): void;
    _stop(): void;
    private _loop;
}

declare abstract class EmbedProvider<Message> {
    protected readonly _iframe: HTMLIFrameElement;
    protected _src: WriteSignal<string>;
    protected abstract _getOrigin(): string;
    protected abstract _buildParams(): Record<string, any>;
    protected abstract _onMessage(message: Message, event: MessageEvent): void;
    protected abstract _onLoad(): void;
    /**
     * Defines which referrer is sent when fetching the resource.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/referrerPolicy}
     */
    referrerPolicy: ReferrerPolicy | null;
    get iframe(): HTMLIFrameElement;
    constructor(_iframe: HTMLIFrameElement);
    setup(ctx: MediaSetupContext): void;
    protected _watchSrc(): void;
    protected _postMessage(message: any, target?: string): void;
    protected _onWindowMessage(event: MessageEvent): void;
}

type VimeoEvent = 'bufferend' | 'bufferstart' | 'cuechange' | 'durationchange' | 'ended' | 'enterpictureinpicture' | 'error' | 'fullscreenchange' | 'leavepictureinpicture' | 'loaded' | 'loadeddata' | 'loadedmetadata' | 'loadProgress' | 'loadstart' | 'pause' | 'play' | 'playbackratechange' | 'playProgress' | 'progress' | 'qualitychange' | 'ready' | 'seek' | 'seeked' | 'seeking' | 'texttrackchange' | 'volumechange' | 'waiting' | 'timeupdate';
interface VimeoProgressPayload {
    seconds: number;
    percent: number;
    duration: number;
}
interface VimeoPlayPayload {
    seconds: number;
    percent: number;
    duration: number;
}
interface VimeoErrorPayload {
    name: string;
    message: string;
    method?: string;
}
interface VimeoEventPayload {
    play: VimeoPlayPayload;
    pause: void;
    ready: void;
    playProgress: VimeoProgressPayload;
    loadProgress: VimeoProgressPayload;
    bufferstart: void;
    bufferend: void;
    loaded: {
        id: number;
    };
    ended: void;
    seeking: void;
    seeked: void;
    cuechange: void;
    fullscreenchange: {
        fullscreen: boolean;
    };
    volumechange: {
        volume: number;
    };
    durationchange: {
        duration: number;
    };
    playbackratechange: {
        playbackRate: number;
    };
    texttrackchange: void;
    error: any;
    loadeddata: any;
    loadstart: any;
    loadedmetadata: any;
    enterpictureinpicture: void;
    leavepictureinpicture: void;
    qualitychange: any;
    waiting: void;
}

interface VimeoVideoInfo {
    title: string;
    poster: string;
    duration: number;
    pro: boolean;
}
interface VimeoChapter {
    startTime: number;
    title: string;
    index: number;
}
interface VimeoTextTrack {
    label: string;
    language: string;
    kind: 'captions' | 'subtitles';
    mode: 'showing' | 'disabled';
}
interface VimeoQuality {
    id: string;
    label: string;
    active: boolean;
}

/**
 * @see https://github.com/vimeo/player.js#methods
 */
type VimeoCommand = 'addEventListener' | 'disableTextTrack' | 'enableTextTrack' | 'exitFullscreen' | 'exitPictureInPicture' | 'getBuffered' | 'getCuePoints' | 'getChapters' | 'getCurrentTime' | 'getDuration' | 'getFullscreen' | 'getPictureInPicture' | 'getPlayed' | 'getQualities' | 'getQuality' | 'getSeekable' | 'getSeeking' | 'getTextTracks' | 'getVideoTitle' | '_hideOverlay' | 'pause' | 'play' | 'requestFullscreen' | 'requestPictureInPicture' | 'seekTo' | 'setMuted' | 'setPlaybackRate' | 'setQuality' | 'setVolume' | '_showOverlay' | 'destroy' | 'loadVideo' | 'unload';
interface VimeoCommandArg {
    play: void;
    pause: void;
    setMuted: boolean;
    setVolume: number;
    getDuration: void;
    getChapters: void;
    getCurrentTime: void;
    seekTo: number;
    setPlaybackRate: number;
    addEventListener: VimeoEvent;
    getCuePoints: void;
    getVideoTitle: string;
    getTextTracks: void;
    enableTextTrack: {
        language: string;
        kind: string;
    };
    disableTextTrack: string;
    setQuality: string;
    _showOverlay: void;
    _hideOverlay: void;
    getBuffered: void;
    requestFullscreen: void;
    exitFullscreen: void;
    requestPictureInPicture: void;
    exitPictureInPicture: void;
    getQuality: void;
    getQualities: void;
    getPlayed: void;
    getSeekable: void;
    getSeeking: void;
    getFullscreen: void;
    getPictureInPicture: void;
    destroy: void;
    loadVideo: number;
    unload: void;
}
interface VimeoCommandData {
    play: void;
    pause: void;
    setMuted: boolean;
    setVolume: void;
    getDuration: number;
    getChapters: VimeoChapter[];
    getCurrentTime: number;
    seekTo: void;
    setPlaybackRate: void;
    addEventListener: void;
    getCuePoints: void;
    getVideoTitle: string;
    getTextTracks: VimeoTextTrack[];
    enableTextTrack: void;
    disableTextTrack: void;
    setQuality: void;
    _showOverlay: void;
    _hideOverlay: void;
    getBuffered: number;
    requestFullscreen: void;
    exitFullscreen: void;
    requestPictureInPicture: void;
    exitPictureInPicture: void;
    getQuality: string;
    getQualities: VimeoQuality[];
    getPlayed: number[];
    getSeekable: number[];
    getSeeking: boolean;
    getFullscreen: boolean;
    getPictureInPicture: boolean;
    destroy: void;
    loadVideo: void;
    unload: void;
}

interface VimeoMessage {
    data?: any;
    value?: any;
    method?: VimeoCommand;
    event?: keyof VimeoEventPayload;
}

/**
 * Vimeo Player Parameters.
 *
 * @see {@link https://developer.vimeo.com/player/sdk/embed}
 */
interface VimeoParams {
    /**
     * The ID or the URL of the video on Vimeo. You must supply one of these values to identify the
     * video.
     *
     * @default undefined
     */
    id?: string;
    /**
     * Whether to pause the current video when another Vimeo video on the same page starts to play.
     * Set this value to false to permit simultaneous playback of all the videos on the page.
     *
     * @default true
     */
    autopause?: boolean;
    /**
     * Whether to start playback of the video automatically. This feature might not work on all
     * devices.
     *
     * @default false
     */
    autoplay?: boolean;
    /**
     * Whether the player is in background mode, which hides the playback controls, enables autoplay,
     * and loops the video.
     *
     * @default false
     */
    background?: boolean;
    /**
     * Whether to display the video owner's name.
     *
     * @default true
     */
    byline?: boolean;
    /**
     * The hexadecimal color value of the playback controls. The embed settings of the video
     * might override this value.
     *
     * @default '00ADEF'
     */
    color?: string;
    /**
     * This parameter will hide all elements in the player (play bar, sharing buttons, etc) for a
     * chromeless experience. When using this parameter, the play/pause button will be hidden. To
     * start playback for your viewers, you'll need to either enable autoplay, use keyboard controls,
     * or implement our player SDK to start and control playback.
     *
     * Note: setting this parameter will not disable keyboard controls.
     *
     * @default true
     */
    controls?: boolean;
    /**
     * Whether to enable keyboard input to trigger player events. This setting doesn't affect tab
     * control.
     *
     * @default true
     */
    keyboard?: boolean;
    /**
     * Hash for private videos.
     */
    h: string | null;
    /**
     * The height of the video in pixels.
     *
     * @default undefined
     */
    height?: number;
    /**
     * Whether to restart the video automatically after reaching the end.
     *
     * @default false
     */
    loop?: boolean;
    /**
     * The height of the video in pixels, where the video won't exceed its native height, no matter
     * the value of this field.
     *
     * @default undefined
     */
    maxheight?: number;
    /**
     * The width of the video in pixels, where the video won't exceed its native width, no matter the
     * value of this field.
     *
     * @default undefined
     */
    maxwidth?: number;
    /**
     * Whether the video is muted upon loading. The true value is required for the autoplay behavior
     * in some browsers.
     *
     * @default false
     */
    muted?: boolean;
    /**
     * Whether the video plays inline on supported mobile devices. To force the device to play the
     * video in fullscreen mode instead, set this value to false.
     *
     * @default true
     */
    playsinline?: boolean;
    /**
     * Whether to display the video owner's portrait.
     *
     * @default true
     */
    portrait?: boolean;
    /**
     * Whether the player displays speed controls in the preferences menu and enables the playback
     * rate API.
     *
     * @default false
     */
    speed?: boolean;
    /**
     * Whether the player displays the title overlay.
     *
     * @default true
     */
    title?: boolean;
    /**
     * Whether the responsive player and transparent background are enabled.
     *
     * @default true
     */
    transparent?: boolean;
    /**
     * The width of the video in pixels.
     *
     * @default undefined
     */
    width?: number;
    /**
     * Setting this parameter to "true" will block the player from tracking any session data,
     * including all cookies and analytics.
     *
     * @default false
     */
    dnt?: boolean;
}

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
declare class VimeoProvider extends EmbedProvider<VimeoMessage> implements Pick<VimeoParams, 'title' | 'byline' | 'portrait' | 'color'> {
    protected readonly $$PROVIDER_TYPE = "VIMEO";
    protected static _videoIdRE: RegExp;
    protected static _infoCache: Map<string, VimeoVideoInfo>;
    readonly scope: Scope;
    protected _ctx: MediaSetupContext;
    protected _played: number;
    protected _playedRange: TimeRange;
    protected _seekableRange: TimeRange;
    protected _playPromise: DeferredPromise<void, string> | null;
    protected _pausePromise: DeferredPromise<void, string> | null;
    protected _videoInfoPromise: DeferredPromise<VimeoVideoInfo, void> | null;
    protected _videoId: WriteSignal<string>;
    protected _pro: WriteSignal<boolean>;
    protected _hash: string | null;
    protected _currentSrc: MediaSrc<string> | null;
    protected _currentCue: VTTCue | null;
    protected _timeRAF: RAFLoop;
    protected get _notify(): <Type extends keyof MediaEvents>(type: Type, ...init: InferEventDetail<MediaEvents[Type]> extends void | undefined ? [detail?: undefined, trigger?: Event | undefined] : [detail: InferEventDetail<MediaEvents[Type]>, trigger?: Event | undefined]) => void;
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
    protected _watchPro(): Dispose | undefined;
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

interface YouTubeCommandArg {
    playVideo: void;
    pauseVideo: void;
    seekTo: number;
    mute: void;
    unMute: void;
    setVolume: number;
    setPlaybackRate: number;
}

type YouTubeEvent = 'initialDelivery' | 'onReady' | 'infoDelivery' | 'apiInfoDelivery';

type YouTubePlaybackQuality = 'unknown' | 'tiny' | 'small' | 'medium' | 'large' | 'hd720' | 'hd1080' | 'highres' | 'max';

/**
 * @see {@link https://developers.google.com/youtube/iframe_api_reference#onStateChange}
 */
declare const YouTubePlayerState: {
    readonly _Unstarted: -1;
    readonly _Ended: 0;
    readonly _Playing: 1;
    readonly _Paused: 2;
    readonly _Buffering: 3;
    readonly _Cued: 5;
};
type YouTubePlayerStateValue = (typeof YouTubePlayerState)[keyof typeof YouTubePlayerState];

interface YouTubeVideoData {
    author: string;
    title: string;
    video_id: string;
}
interface YouTubeProgressState {
    airingStart: number;
    airingEnd: number;
    allowSeeking: boolean;
    clipStart: number;
    clipEnd: boolean | null;
    current: number;
    displayedStart: number;
    duration: number;
    ingestionTime: number;
    isAtLiveHead: false;
    loaded: number;
    offset: number;
    seekableStart: number;
    seekableEnd: number;
    viewerLivestreamJoinMediaTime: number;
}
interface YouTubeMessageInfo {
    availablePlaybackRates?: number[];
    availableQualityLevels?: YouTubePlaybackQuality[];
    currentTime?: number;
    currentTimeLastUpdated?: number;
    videoLoadedFraction?: number;
    volume?: number;
    videoUrl?: string;
    videoData?: YouTubeVideoData;
    duration?: number;
    muted?: boolean;
    playbackQuality?: YouTubePlaybackQuality;
    playbackRate?: number;
    playerState?: YouTubePlayerStateValue;
    progressState?: YouTubeProgressState;
}
interface YouTubeMessage {
    channel: string;
    event: YouTubeEvent;
    info?: YouTubeMessageInfo;
}

/**
 * YouTube Player Parameters.
 *
 * @see {@link https://developers.google.com/youtube/player_parameters}
 */
interface YouTubeParams {
    /**
     * This parameter specifies whether the initial video will automatically start to play when the
     * player loads. Supported values are 0 or 1.
     *
     * @default 0
     */
    autoplay?: 0 | 1;
    /**
     * This parameter specifies whether the initial video will load with audio muted. Supported values
     * are 0 or 1.
     *
     * @default 0
     */
    mute?: 0 | 1;
    /**
     * This parameter specifies the default language that the player will use to display captions.
     * Set the parameter's value to an ISO 639-1 two-letter language code.
     *
     * If you use this parameter and also set the cc_load_policy parameter to 1, then the player will
     * show captions in the specified language when the player loads. If you do not also set the
     * cc_load_policy parameter, then captions will not display by default, but will display in the
     * specified language if the user opts to turn captions on.
     */
    cc_lang_pref?: string;
    /**
     * Setting the parameter's value to 1 causes closed captions to be shown by default, even if the
     * user has turned captions off. The default behavior is based on user preference.
     */
    cc_load_policy?: 1;
    /**
     * This parameter specifies the color that will be used in the player's video progress bar to
     * highlight the amount of the video that the viewer has already seen. Valid parameter values are
     * red and white, and, by default, the player uses the color red in the video progress bar. See
     * the YouTube API blog for more information about color options.
     *
     * Note: Setting the color parameter to white will disable the `modestbranding` option.
     *
     * @default 'red'
     */
    color?: 'red' | 'white';
    /**
     * This parameter indicates whether the video player controls are displayed:
     *
     * - `controls=0` – Player controls do not display in the player.
     * - `controls=1` – Player controls display in the player.
     *
     * @default 1
     */
    controls?: 0 | 1;
    /**
     * Setting the parameter's value to 1 causes the player to not respond to keyboard controls. The
     * default value is 0, which means that keyboard controls are enabled. Currently supported
     * keyboard controls are:
     *
     * - Spacebar or [k]: Play / Pause
     * - Arrow Left: Jump back 5 seconds in the current video
     * - Arrow Right: Jump ahead 5 seconds in the current video
     * - Arrow Up: Volume up
     * - Arrow Down: Volume Down
     * - [f]: Toggle full-screen display
     * - [j]: Jump back 10 seconds in the current video
     * - [l]: Jump ahead 10 seconds in the current video
     * - [m]: Mute or unmute the video
     * - [0-9]: Jump to a point in the video. 0 jumps to the beginning of the video, 1 jumps to the
     * point 10% into the video, 2 jumps to the point 20% into the video, and so forth.
     *
     * @default 0
     */
    disablekb?: 0 | 1;
    /**
     * Setting the parameter's value to 1 enables the player to be controlled via IFrame or JavaScript
     * Player API calls. The default value is 0, which means that the player cannot be controlled
     * using those APIs.
     *
     * For more information on the IFrame API and how to use it, see the IFrame API documentation.
     * (The JavaScript Player API has already been deprecated.)
     *
     * @default 0
     */
    enablejsapi?: 0 | 1;
    /**
     * This parameter causes the player to begin playing the video at the given number of seconds
     * from the start of the video. The parameter value is a positive integer. Note that similar to
     * the seekTo function, the player will look for the closest keyframe to the time you specify.
     * This means that sometimes the play head may seek to just before the requested time, usually no
     * more than around two seconds.
     *
     * @default undefined
     */
    start?: number;
    /**
     * This parameter specifies the time, measured in seconds from the start of the video, when the
     * player should stop playing the video. The parameter value is a positive integer.
     *
     * Note: The time is measured from the beginning of the video and not from either the value of
     * the start player parameter or the startSeconds parameter, which is used in YouTube Player API
     * functions for loading or queueing a video.
     *
     * @default undefined
     */
    end?: number;
    /**
     * Setting this parameter to 0 prevents the fullscreen button from displaying in the player. The
     * default value is 1, which causes the fullscreen button to display.
     *
     * @default 1
     */
    fs?: 0 | 1;
    /**
     * Sets the player's interface language. The parameter value is an ISO 639-1 two-letter language
     * code or a fully specified locale. For example, fr and fr-ca are both valid values. Other
     * language input codes, such as IETF language tags (BCP 47) might also be handled properly.
     *
     * The interface language is used for tooltips in the player and also affects the default caption
     * track. Note that YouTube might select a different caption track language for a particular user
     * based on the user's individual language preferences and the availability of caption tracks.
     */
    hl?: string;
    /**
     * Setting the parameter's value to 1 causes video annotations to be shown by default, whereas
     * setting to 3 causes video annotations to not be shown by default.
     *
     * @default 1
     */
    iv_load_policy?: 1 | 3;
    /**
     * The `list` parameter, in conjunction with the `listType` parameter, identifies the content that
     * will load in the player.
     *
     * - If the `listType` parameter value is search, then the list parameter value specifies the
     * search query.
     *
     * - If the `listType` parameter value is user_uploads, then the list parameter value identifies
     * the YouTube channel whose uploaded videos will be loaded.
     *
     * - If the listType parameter value is playlist, then the list parameter value specifies a
     * YouTube playlist ID. In the parameter value, you need to prepend the playlist ID with the
     * letters PL as shown in the example below.
     *
     * Note: If you specify values for the `list` and `listType` parameters, the IFrame embed URL does
     * not need to specify a video ID.
     *
     * @default undefined
     */
    list?: string;
    /**
     * The listType parameter, in conjunction with the list parameter, identifies the content that
     * will load in the player. Valid parameter values are playlist, search, and user_uploads.
     *
     * Note: If you specify values for the list and listType parameters, the IFrame embed URL does
     * not need to specify a video ID.
     *
     * @default undefined
     */
    listType?: 'playlist' | 'search' | 'user_uploads';
    /**
     * In the case of a single video player, a setting of 1 causes the player to play the initial
     * video again and again. In the case of a playlist player (or custom player), the player plays
     * the entire playlist and then starts again at the first video.
     *
     * @default 0
     */
    loop?: 0 | 1;
    /**
     * This parameter provides an extra security measure for the IFrame API and is only supported for
     * IFrame embeds. If you are using the IFrame API, which means you are setting the enablejsapi
     * parameter value to 1, you should always specify your domain as the origin parameter value.
     *
     * @default undefined
     */
    origin?: string;
    /**
     * This parameter specifies a comma-separated list of video IDs to play. If you specify a value,
     * the first video that plays will be the VIDEO_ID specified in the URL path, and the videos
     * specified in the playlist parameter will play thereafter.
     *
     * @default undefined
     */
    playlist?: string;
    /**
     * This parameter controls whether videos play inline or fullscreen in an HTML5 player on iOS.
     *
     * Valid values are:
     *
     * - 0: This value causes fullscreen playback.
     *
     * - 1: This value causes inline playback for UIWebViews created with the
     * `allowsInlineMediaPlayback` property set to `true`.
     *
     * @default 0
     */
    playsinline?: 0 | 1;
    /**
     * If the rel parameter is set to 0, related videos will come from the same channel as the video
     * that was just played. If the parameter's value is set to 1, which is the default value, then
     * the player shows related videos.
     *
     * @default 1
     */
    rel?: 0 | 1;
    /**
     * This parameter identifies the URL where the player is embedded. This value is used in YouTube
     * Analytics reporting when the YouTube player is embedded in a widget, and that widget is then
     * embedded in a web page or application. In that scenario, the origin parameter identifies the
     * widget provider's domain, but YouTube Analytics should not identify the widget provider as the
     * actual traffic source. Instead, YouTube Analytics uses the widget_referrer parameter value to
     * identify the domain associated with the traffic source.
     *
     * @default undefined
     */
    widget_referrer?: string;
}

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
declare class YouTubeProvider extends EmbedProvider<YouTubeMessage> implements MediaProviderAdapter, Pick<YouTubeParams, 'color' | 'start' | 'end'> {
    protected readonly $$PROVIDER_TYPE = "YOUTUBE";
    protected static _videoIdRE: RegExp;
    protected static _posterCache: Map<string, string>;
    readonly scope: Scope;
    protected _ctx: MediaSetupContext;
    protected _videoId: WriteSignal<string>;
    protected _state: YouTubePlayerStateValue;
    protected _seekingTimer: number;
    protected _played: number;
    protected _playedRange: TimeRange;
    protected _currentSrc: MediaSrc<string> | null;
    protected _playPromise: DeferredPromise<void, string> | null;
    protected _pausePromise: DeferredPromise<void, string> | null;
    protected get _notify(): <Type extends keyof MediaEvents>(type: Type, ...init: InferEventDetail<MediaEvents[Type]> extends void | undefined ? [detail?: undefined, trigger?: Event | undefined] : [detail: InferEventDetail<MediaEvents[Type]>, trigger?: Event | undefined]) => void;
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

type AnyMediaProvider = ({
    type: 'audio';
} & AudioProvider) | ({
    type: 'video';
} & VideoProvider) | ({
    type: 'hls';
} & HLSProvider) | ({
    type: 'youtube';
} & YouTubeProvider) | ({
    type: 'vimeo';
} & VimeoProvider);
interface MediaProviderLoader<Provider extends MediaProviderAdapter = MediaProviderAdapter> {
    target: HTMLElement | null;
    canPlay(src: MediaSrc): boolean;
    mediaType(src?: MediaSrc): MediaType;
    preconnect?(ctx: MediaContext): void;
    load(ctx: MediaContext): Promise<Provider>;
}
interface MediaProviderAdapter extends Readonly<Partial<Pick<MediaState, 'paused' | 'muted' | 'currentTime' | 'volume' | 'playsinline' | 'playbackRate'>>> {
    readonly scope: Scope;
    readonly type: string;
    readonly currentSrc: MediaSrc | null;
    readonly fullscreen?: MediaFullscreenAdapter;
    readonly pictureInPicture?: MediaPictureInPictureAdapter;
    readonly canLiveSync?: boolean;
    preconnect?(ctx: MediaContext): void;
    setup(ctx: MediaSetupContext): void;
    destroy?(): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    setMuted(muted: boolean): void;
    setCurrentTime(time: number): void;
    setVolume(volume: number): void;
    setPlaysinline?(inline: boolean): void;
    setPlaybackRate?(rate: number): void;
    loadSource(src: MediaSrc, preload: MediaState['preload']): Promise<void>;
}
interface MediaSetupContext extends MediaContext {
    player: MediaPlayer;
}
interface MediaFullscreenAdapter extends FullscreenAdapter {
}
interface MediaPictureInPictureAdapter {
    /**
     * Whether picture-in-picture mode is active.
     */
    readonly active: boolean;
    /**
     * Whether picture-in-picture mode is supported. This does not mean that the operation is
     * guaranteed to be successful, only that it can be attempted.
     */
    readonly supported: boolean;
    /**
     * Request to display the current provider in picture-in-picture mode.
     */
    enter(): Promise<void | PictureInPictureWindow>;
    /**
     * Request to display the current provider in inline by exiting picture-in-picture mode.
     */
    exit(): Promise<void>;
}

declare class AudioProviderLoader implements MediaProviderLoader<AudioProvider> {
    target: HTMLAudioElement;
    canPlay({ src, type }: MediaSrc): boolean;
    mediaType(): MediaType;
    load(): Promise<AudioProvider>;
}

declare class VideoProviderLoader implements MediaProviderLoader<VideoProvider> {
    target: HTMLVideoElement;
    canPlay(src: MediaSrc): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<VideoProvider>;
}

declare class YouTubeProviderLoader implements MediaProviderLoader<YouTubeProvider> {
    target: HTMLIFrameElement;
    canPlay(src: MediaSrc): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<YouTubeProvider>;
}

declare class HLSProviderLoader extends VideoProviderLoader implements MediaProviderLoader<HLSProvider> {
    static supported: boolean;
    canPlay(src: MediaSrc): boolean;
    load(context: any): Promise<HLSProvider>;
}

declare class VimeoProviderLoader implements MediaProviderLoader<VimeoProvider> {
    target: HTMLIFrameElement;
    canPlay(src: MediaSrc): boolean;
    mediaType(): MediaType;
    load(ctx: MediaContext): Promise<VimeoProvider>;
}

type VideoPresentationEvents = {
    'video-presentation-change': VideoPresentationChangeEvent;
};
/**
 * Fired when the video presentation mode changes. Only available in Safari.
 *
 * @detail mode
 */
interface VideoPresentationChangeEvent extends DOMEvent<WebKitPresentationMode> {
}

/** @see {@link https://www.vidstack.io/docs/player/providers/audio} */
declare function isAudioProvider(provider: any): provider is AudioProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/video} */
declare function isVideoProvider(provider: any): provider is VideoProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/hls} */
declare function isHLSProvider(provider: any): provider is HLSProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/youtube} */
declare function isYouTubeProvider(provider: any): provider is YouTubeProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/vimeo} */
declare function isVimeoProvider(provider: any): provider is VimeoProvider;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement} */
declare function isHTMLAudioElement(element: unknown): element is HTMLAudioElement;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement} */
declare function isHTMLVideoElement(element: unknown): element is HTMLVideoElement;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement} */
declare function isHTMLMediaElement(element: unknown): element is HTMLMediaElement;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement} */
declare function isHTMLIFrameElement(element: unknown): element is HTMLIFrameElement;

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
declare class MediaPlayer extends Component<MediaPlayerProps, MediaPlayerState, MediaPlayerEvents> implements MediaStateAccessors {
    static props: MediaPlayerProps;
    static state: State<MediaState>;
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

interface MediaProviderProps {
    /** @internal */
    loaders: MediaProviderLoader[];
}
interface MediaProviderState {
    loader: MediaProviderLoader | null;
}
/**
 * Used to render the current provider.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/provider}
 */
declare class MediaProvider extends Component<MediaProviderProps, MediaProviderState> {
    static props: MediaProviderProps;
    static state: State<MediaProviderState>;
    private _media;
    private _sources;
    private _domSources;
    private _domTracks;
    private _loader;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected _loadRafId: number;
    load(target: HTMLElement | null | undefined): void;
    protected _runLoader(target: HTMLElement | null | undefined): void;
    protected onDestroy(): void;
    private _destroyProvider;
    private _onResize;
    private _onMutation;
}

/**
 * This component creates a container for control groups.
 *
 * @attr data-visible - Whether controls should be visible.
 * @attr data-pip - Whether picture-in-picture mode is active.
 * @attr data-fullscreen - Whether fullscreen mode is active.
 * @docs {@link https://www.vidstack.io/docs/player/components/media/controls}
 */
declare class Controls extends Component<ControlsProps, {}, ControlsEvents> {
    static props: ControlsProps;
    private _media;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _hideControls;
    private _watchProps;
    private _isShowing;
}
interface ControlsProps {
    /**
     * The default amount of delay in milliseconds while media playback is progressing without user
     * activity to hide the controls.
     */
    hideDelay: number;
    /**
     * Whether controls visibility should be toggled when the mouse enters and leaves the player
     * container.
     */
    hideOnMouseLeave: boolean;
}
interface ControlsEvents {
    change: ControlsChangeEvent;
}
/**
 * Fired when the active state of the controls change.
 *
 * @detail isVisible
 */
interface ControlsChangeEvent extends DOMEvent<boolean> {
}

/**
 * This component creates a container for media controls.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/controls#group}
 */
declare class ControlsGroup extends Component {
    protected onAttach(el: HTMLElement): void;
}

/**
 * A contextual text bubble that displays a description for an element that appears on pointer
 * hover or keyboard focus.
 *
 * @attr data-visible - Whether tooltip is visible.
 * @attr data-hocus - Whether tooltip is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role}
 */
declare class Tooltip extends Component<TooltipProps> {
    static props: TooltipProps;
    private _id;
    private _trigger;
    private _content;
    constructor();
    protected onAttach(el: HTMLElement): void;
    protected onSetup(): void;
    private _attachTrigger;
    private _detachTrigger;
    private _attachContent;
    private _detachContent;
    private _onShowingChange;
}
interface TooltipProps {
    /**
     * The amount of time in milliseconds to wait before showing a tooltip.
     */
    showDelay: number;
}

/**
 * Wraps the element that will trigger showing/hiding the tooltip on hover or keyboard focus. The
 * tooltip content is positioned relative to this element.
 *
 * @attr data-visible - Whether tooltip is visible.
 * @attr data-hocus - Whether tooltip is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 */
declare class TooltipTrigger extends Component {
    constructor();
    protected onConnect(el: HTMLElement): void;
    private _attach;
    private _getButton;
}

/**
 * This component contains the content that is visible when the tooltip trigger is interacted with.
 *
 * @attr data-visible - Whether tooltip is visible.
 * @attr data-placement - The placement prop setting.
 * @attr data-hocus - Whether tooltip is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 */
declare class TooltipContent extends Component<TooltipContentProps> {
    static props: TooltipContentProps;
    constructor();
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _attach;
    private _watchPlacement;
    private _getTrigger;
}
type TooltipPlacement = TooltipPlacementSide | `${TooltipPlacementSide} ${TooltipPlacementAlign}`;
type TooltipPlacementSide = 'top' | 'right' | 'bottom' | 'left';
type TooltipPlacementAlign = 'start' | 'center' | 'end';
interface TooltipContentProps {
    /**
     * A space-separated list which specifies the side and alignment of the tooltip content relative
     * to the trigger.
     *
     * @example `top center`
     * @example `bottom end`
     */
    placement: TooltipPlacement;
    /**
     * The distance in pixels between the content and the tooltip trigger. You can also set
     * the CSS variable `--media-tooltip-y-offset` to adjust this offset.
     */
    offset: number;
    /**
     * The offset in pixels from the start/center/end aligned position. You can also set
     * the CSS variable `--media-tooltip-x-offset` to adjust this offset.
     */
    alignOffset: number;
}

interface ToggleButtonProps {
    /**
     * Whether it should start in the on (pressed) state.
     */
    defaultPressed: boolean;
    /**
     * Whether the button should be disabled (non-interactive).
     */
    disabled: boolean;
}
/**
 * A toggle button is a two-state button that can be either off (not pressed) or on (pressed).
 *
 * @attr data-pressed - Whether the toggle is in an "on" state (pressed).
 * @attr aria-pressed - Same as `data-pressed` but `"true"` or `"false"`.
 * @attr data-focus - Whether button is being keyboard focused.
 * @attr data-hocus - Whether button is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/toggle-button}
 */
declare class ToggleButton<Props extends ToggleButtonProps = ToggleButtonProps> extends Component<Props> {
    static props: ToggleButtonProps;
    private _pressed;
    /**
     * Whether the toggle is currently in a `pressed` state.
     */
    get pressed(): boolean;
    constructor();
}

interface ToggleButtonControllerProps {
    /**
     * Whether the button should be disabled (non-interactive).
     */
    disabled: boolean;
}

interface PlayButtonProps extends ToggleButtonControllerProps {
}
/**
 * A button for toggling the playback state (play/pause) of the current media.
 *
 * @attr data-paused - Whether playback has stopped.
 * @attr data-ended - Whether playback has ended.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/play-button}
 */
declare class PlayButton extends Component<PlayButtonProps> {
    static props: PlayButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _onPress;
    private _isPressed;
    private _getLabel;
}

interface CaptionButtonProps extends ToggleButtonControllerProps {
}
/**
 * A button for toggling the showing state of the captions.
 *
 * @attr data-supported - Whether captions/subtitles are available.
 * @attr data-active - Whether closed captions or subtitles are on.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/caption-button}
 */
declare class CaptionButton extends Component<CaptionButtonProps> {
    static props: CaptionButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _onPress;
    private _isPressed;
    private _isHidden;
    private _getLabel;
}

interface FullscreenButtonProps extends ToggleButtonControllerProps {
    /**
     * The target element on which to request fullscreen on. The target can be `media`
     * (i.e., `<media-player>`) or `provider`. The `prefer-media` option will first see if the native
     * fullscreen API is available, if not it'll try the media provider.
     */
    target: MediaFullscreenRequestTarget | undefined;
}
/**
 * A button for toggling the fullscreen mode of the player.
 *
 * @attr data-active - Whether fullscreen mode is active.
 * @attr data-supported - Whether fullscreen mode is supported.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/fullscreen-button}
 * @see {@link https://www.vidstack.io/docs/player/core-concepts/fullscreen}
 */
declare class FullscreenButton extends Component<FullscreenButtonProps> {
    static props: FullscreenButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _onPress;
    private _isPressed;
    private _isSupported;
    private _getLabel;
}

interface MuteButtonProps extends ToggleButtonControllerProps {
}
/**
 * A button for toggling the muted state of the player.
 *
 * @attr data-muted - Whether volume is muted (0).
 * @attr data-state - Current volume setting (low/high/muted).
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/mute-button}
 */
declare class MuteButton extends Component<MuteButtonProps> {
    static props: MuteButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _onPress;
    private _isPressed;
    private _getLabel;
    private _getState;
}

interface PIPButtonProps extends ToggleButtonControllerProps {
}
/**
 * A button for toggling the picture-in-picture (PIP) mode of the player.
 *
 * @attr data-active - Whether picture-in-picture mode is active.
 * @attr data-supported - Whether picture-in-picture mode is available.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/pip-button}
 * @see {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture}
 */
declare class PIPButton extends Component<PIPButtonProps> {
    static props: PIPButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _onPress;
    private _isPressed;
    private _isSupported;
    private _getLabel;
}

interface SeekButtonProps {
    /**
     * Whether the button should be disabled (non-interactive).
     */
    disabled: boolean;
    /**
     * The amount to seek the media playback forwards (positive number) or backwards (negative number)
     * when the seek button is pressed.
     */
    seconds: number;
}
/**
 * A button for seeking the current media playback forwards or backwards by a specified amount.
 *
 * @attr data-seeking - Whether a seeking operation is in progress.
 * @attr data-supported - Whether seeking operations are permitted.
 * @attr data-focus - Whether button is being keyboard focused.
 * @attr data-hocus - Whether button is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/seek-button}
 */
declare class SeekButton extends Component<SeekButtonProps> {
    static props: SeekButtonProps;
    protected _media: MediaContext;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected _isSupported(): boolean;
    protected _getLabel(): string;
    protected _onPress(event: Event): void;
}

interface LiveButtonProps {
    /**
     * Whether the button should be disabled (non-interactive). This will prevent seeking to the
     * live edge when pressed.
     */
    disabled: boolean;
}
/**
 * This component displays the current live status of the stream. This includes whether it's
 * live, at the live edge, or not live. In addition, when this button is pressed it will skip
 * ahead to the live edge.
 *
 * @attr data-edge - Playback is at the live edge.
 * @attr data-hidden - Whether current media is _not_ live.
 * @attr data-focus - Whether button is being keyboard focused.
 * @attr data-hocus - Whether button is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/live-button}
 */
declare class LiveButton extends Component<LiveButtonProps> {
    static props: LiveButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _onPress;
}

interface SliderCSSVars {
    /**
     * The fill rate expressed as a percentage.
     */
    readonly 'slider-fill': string;
    /**
     * The pointer rate expressed as a percentage.
     */
    readonly 'slider-pointer': string;
}

declare const sliderState: State<SliderState>;
interface SliderStore extends Store<SliderState> {
}
interface SliderState {
    /**
     * The current slider value.
     */
    value: number;
    /**
     * The value at which the device pointer is pointing to inside the slider.
     */
    pointerValue: number;
    /**
     * The minimum slider value.
     */
    min: number;
    /**
     * The maximum slider value.
     */
    max: number;
    /**
     * Whether the slider has keyboard focus.
     */
    focused: boolean;
    /**
     * Whether the slider thumb is currently being dragged.
     */
    dragging: boolean;
    /**
     * Whether a device pointer is within the slider bounds.
     */
    pointing: boolean;
    /**
     * Whether the slider is being interacted with via keyboard or pointer device.
     */
    readonly active: boolean;
    /**
     * The current value to range ratio.
     *
     * @signal
     * @example
     * `min` = 0
     * `max` = 10
     * `value` = 5
     * `range` = 10 (max - min)
     * `fillRate` = 0.5 (result)
     */
    readonly fillRate: number;
    /**
     * The fill rate expressed as a percentage (`fillRate * 100`).
     */
    readonly fillPercent: number;
    /**
     * The pointer value to range ratio.
     */
    readonly pointerRate: number;
    /**
     * The pointer rate expressed as a percentage (`pointerRate * 100`).
     */
    readonly pointerPercent: number;
}

interface SliderEventDelegate {
    _swipeGesture?: boolean;
    _isDisabled(): boolean;
    _getStep(): number;
    _getKeyStep(): number;
    _roundValue(value: number): number;
    _onValueChange?(event: SliderValueChangeEvent): unknown;
    _onDragStart?(event: SliderDragStartEvent): unknown;
    _onDragEnd?(event: SliderDragEndEvent): unknown;
    _onDragValueChange?(event: SliderDragValueChangeEvent): unknown;
}

type SliderOrientation = 'horizontal' | 'vertical';

interface SliderDelegate extends Omit<SliderEventDelegate, '_getOrientation'> {
    _getARIAValueNow(): number;
    _getARIAValueText(): string;
}
declare class SliderController extends ViewController<SliderControllerProps, SliderState, SliderEvents> {
    private _delegate;
    static props: SliderControllerProps;
    private _media;
    constructor(_delegate: SliderDelegate);
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _watchValue;
    private _watchDisabled;
    private _getARIADisabled;
    private _setupAttrs;
    private _watchCSSVars;
    private _updateSliderVars;
}
interface SliderControllerProps {
    /**
     * Whether the slider should be disabled (non-interactive).
     */
    disabled: boolean;
    /**
     * The orientation of the slider.
     */
    orientation: SliderOrientation;
    /**
     * A number that specifies the granularity that the slider value must adhere to.
     *
     * A step is an abstract unit that may carry a different type of measure depending on the type of
     * slider. For example, for the volume slider each step is 1% of volume, and for the time slider
     * it is 1 second which is a varying percentage depending on the media duration.
     */
    step: number;
    /**
     * ♿ **ARIA:** A number that specifies the number of steps taken when interacting with
     * the slider via keyboard.
     *
     * A step is an abstract unit that may carry different type of measure depending on the type of
     * slider. For example, for the volume slider each step is 1% of volume, and for the time slider
     * it is 1 second which is a varying percentage depending on the media duration.
     */
    keyStep: number;
    /**
     * ♿ **ARIA:** A number that will be used to multiply the `keyStep` when the `Shift` key
     * is held down and the slider value is changed by pressing `LeftArrow` or `RightArrow`. Think
     * of it as `keyStep * shiftKeyMultiplier`.
     */
    shiftKeyMultiplier: number;
}

/**
 * Versatile and user-friendly input control designed for seamless cross-browser compatibility and
 * accessibility with ARIA support. It offers a smooth user experience for both mouse and touch
 * interactions and is highly customizable in terms of styling. Users can effortlessly input numeric
 * values within a specified range, defined by a minimum and maximum value.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider}
 */
declare class Slider extends Component<SliderProps, SliderState, SliderEvents, SliderCSSVars> {
    static props: SliderProps;
    static state: State<SliderState>;
    constructor();
    protected onSetup(): void;
    private _getARIAValueNow;
    private _getARIAValueText;
    private _watchValue;
    private _watchMinMax;
}
interface SliderProps extends SliderControllerProps {
    /**
     * The lowest slider value in the range of permitted values.
     */
    min: number;
    /**
     * The greatest slider value in the range of permitted values.
     */
    max: number;
    /**
     * The current slider value.
     */
    value: number;
}

interface SliderEvents {
    'drag-start': SliderDragStartEvent;
    'drag-end': SliderDragEndEvent;
    'value-change': SliderValueChangeEvent;
    'drag-value-change': SliderDragValueChangeEvent;
    'pointer-value-change': SliderPointerValueChangeEvent;
}
interface SliderEvent<Detail = unknown> extends DOMEvent<Detail> {
    target: Slider;
}
/**
 * Fired when the user begins interacting with the slider and dragging the thumb. The event
 * detail contains the current value the drag is starting at.
 *
 * @detail value
 */
interface SliderDragStartEvent extends SliderEvent<number> {
    readonly trigger: PointerEvent | KeyboardEvent;
}
/**
 * Fired when the user stops dragging the slider thumb. The event detail contains the value
 * the drag is ending at.
 *
 * @detail value
 */
interface SliderDragEndEvent extends SliderEvent<number> {
    readonly trigger: PointerEvent | KeyboardEvent;
}
/**
 * Fired when the slider value changes. The event detail contains the current value.
 *
 * @detail value
 */
interface SliderValueChangeEvent extends SliderEvent<number> {
    readonly trigger: PointerEvent | KeyboardEvent | undefined;
}
/**
 * Fired when the slider drag value changes. The drag value indicates the last slider value that
 * the user has dragged to. The event detail contains the value.
 *
 * @detail value
 */
interface SliderDragValueChangeEvent extends SliderEvent<number> {
    readonly trigger: PointerEvent | KeyboardEvent;
}
/**
 * Fired when the device pointer is inside the slider region and it's position changes. The
 * event detail contains the preview value. Do note, this includes touch, mouse, and keyboard
 * devices.
 *
 * @detail pointerValue
 */
interface SliderPointerValueChangeEvent extends SliderEvent<number> {
    readonly trigger: PointerEvent | KeyboardEvent;
}

declare class ThumbnailsLoader {
    readonly $src: ReadSignal<string>;
    private _media;
    readonly $cues: WriteSignal<VTTCue$1[]>;
    static create($src: ReadSignal<string>): ThumbnailsLoader;
    constructor($src: ReadSignal<string>, _media: MediaContext);
    protected _onLoadCues(): (() => void) | undefined;
    private _updateCues;
}

interface ThumbnailState {
    src: string;
    img: HTMLImageElement | null | undefined;
    coords: ThumbnailCoords | null;
    activeCue: VTTCue$1 | null;
    loading: boolean;
    error: ErrorEvent | null;
    hidden: boolean;
}
/**
 * Used to load and display a preview thumbnail at the given `time`.
 *
 * @attr data-loading - Whether thumbnail image is loading.
 * @attr data-error - Whether an error occurred loading thumbnail.
 * @attr data-hidden - Whether thumbnail is not available or failed to load.
 * @docs {@link https://www.vidstack.io/docs/player/components/display/thumbnail}
 */
declare class Thumbnail extends Component<ThumbnailProps, ThumbnailState> {
    static props: ThumbnailProps;
    static state: State<ThumbnailState>;
    protected _media: MediaContext;
    protected _thumbnails: ThumbnailsLoader;
    private _styleResets;
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    private _watchImg;
    private _onLoadStart;
    private _onLoaded;
    private _onError;
    private _isLoading;
    private _hasError;
    private _watchHidden;
    protected _getTime(): number;
    private _onFindActiveCue;
    private _onResolveThumbnail;
    private _resolveThumbnailSrc;
    private _resolveThumbnailCoords;
    private _requestResize;
    private _resize;
    private _style;
    private _resetStyles;
}
interface ThumbnailProps {
    /**
     * The absolute or relative URL to a [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)
     * file resource.
     */
    src: string;
    /**
     * Finds, loads, and displays the first active thumbnail cue that's start/end times are in range.
     */
    time: number;
}
interface ThumbnailCoords {
    w: number;
    h: number;
    x: number;
    y: number;
}

/**
 * Used to display preview thumbnails when the user is hovering or dragging the time slider.
 * The time ranges in the WebVTT file will automatically be matched based on the current slider
 * pointer position.
 *
 * @attr data-loading - Whether thumbnail image is loading.
 * @attr data-error - Whether an error occurred loading thumbnail.
 * @attr data-hidden - Whether thumbnail is not available or failed to load.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-thumbnail}
 */
declare class SliderThumbnail extends Thumbnail {
    private _slider;
    protected onAttach(el: HTMLElement): void;
    protected _getTime(): number;
}

/**
 * Used to load a low-resolution video to be displayed when the user is hovering over or dragging
 * the time slider. The preview video will automatically be updated to be in-sync with the current
 * preview position, so ensure it has the same length as the original media (i.e., same duration).
 *
 * @attr data-loading - Whether the video is loading.
 * @attr data-error - Whether an error occurred loading video.
 * @attr data-hidden - Whether the video is not ready or has failed to load.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-video}
 */
declare class SliderVideo extends Component<SliderVideoProps, SliderVideoState, SliderVideoEvents> {
    static props: SliderVideoProps;
    static state: State<SliderVideoState>;
    private _media;
    private _slider;
    get video(): HTMLVideoElement | null;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _watchVideo;
    private _watchSrc;
    private _isLoading;
    private _hasError;
    private _watchHidden;
    private _onSrcChange;
    private _onCanPlay;
    private _onError;
    private _onUpdateTime;
}
interface SliderVideoProps {
    /**
     * The URL of a media resource to use.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/src}
     */
    src: string | null;
}
interface SliderVideoState {
    video: HTMLVideoElement | null;
    src: string | null;
    canPlay: boolean;
    error: ErrorEvent | null;
    hidden: boolean;
}
interface SliderVideoEvents {
    'can-play': SliderVideoCanPlayEvent;
    error: SliderVideoErrorEvent;
}
/**
 * Fired when the user agent can play the media, but estimates that **not enough** data has been
 * loaded to play the media up to its end without having to stop for further buffering of content.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event}
 */
interface SliderVideoCanPlayEvent extends DOMEvent<void> {
    target: SliderVideo;
    /** The `canplay` media event. */
    readonly trigger: Event;
}
/**
 * Fired when media loading or playback has encountered any issues (for example, a network
 * connectivity problem). The event detail contains a potential message containing more
 * information about the error (empty string if nothing available), and a code that identifies
 * the general type of error that occurred.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/media.html#error-codes}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event}
 */
interface SliderVideoErrorEvent extends DOMEvent<void> {
    target: SliderVideo;
    /** The `error` media event. */
    readonly trigger: Event;
}

interface SliderValueFormat {
    default?: 'value' | 'percent' | 'time';
    value?(value: number): string;
    percent?(percent: number, decimalPlaces: number): string;
    time?(value: number, padHours: boolean | null, padMinutes: boolean | null, showHours: boolean): string;
}

/**
 * Displays the specific numeric representation of the current or pointer value of the slider.
 * When a user interacts with a slider by moving its thumb along the track, the slider value
 * changes accordingly.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-value}
 */
declare class SliderValue extends Component<SliderValueProps> {
    static props: SliderValueProps;
    protected _format: SliderValueFormat;
    protected _text: ReadSignal<string>;
    protected _slider: StateContext<typeof Slider.state>;
    protected onSetup(): void;
    /**
     * Returns the current value formatted as text based on prop settings.
     */
    getValueText(): string;
}
interface SliderValueProps {
    /**
     * Whether to use the slider's current value, or pointer value.
     */
    type: 'current' | 'pointer';
    /**
     * Determines how the value is formatted. By default it will use the most appropriate formatting,
     * for the time slider that's time, and for volume percent.
     */
    format: 'value' | 'percent' | 'time' | null;
    /**
     * Whether the time should always show the hours unit, even if the time is less than
     * 1 hour. Only available if the `format` attribute is set to `time`.
     *
     * @example `20:30 -> 0:20:35`
     */
    showHours: boolean;
    /**
     * Whether the hours unit should be padded with zeroes to a length of 2. Only available if
     * the `format` attribute is set to `time`.
     *
     * @example `1:20:03 -> 01:20:03`
     */
    padHours: boolean | null;
    /**
     * Whether the minutes unit should be padded with zeroes to a length of 2. Setting this to `null`
     * will pad minutes when hours is >=1. Only available if the `format` attribute is set to `time`.
     *
     * @example `5:22 -> 05:22`
     */
    padMinutes: boolean | null;
    /**
     * Round the value when formatted as a percentage to the given number of decimal places. Only
     * available if `format` attribute is `percent`.
     */
    decimalPlaces: number;
}

/**
 * Used to provide users with a real-time or interactive preview of the value or selection they
 * are making as they move the slider thumb. This can include displaying the current pointer
 * value numerically, or displaying a thumbnail over the time slider.
 *
 * @attr data-visible - Whether the preview is visible.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider#preview}
 */
declare class SliderPreview extends Component<SliderPreviewProps> {
    static props: SliderPreviewProps;
    private _slider;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _updatePlacement;
}
declare function updateSliderPreviewPlacement(el: HTMLElement, { clamp, offset, orientation, }: {
    clamp: boolean;
    offset: number;
    orientation: SliderOrientation;
}): void;
interface SliderPreviewProps {
    /**
     * The distance in pixels between the preview and the slider. You can also set
     * the CSS variable `--media-slider-preview-offset` to adjust this offset.
     */
    offset: number;
    /**
     * By default, the preview will be clamped to the left and right of the slider track. If this
     * is set to `true`, the preview will flow outside of the container when at the edges.
     */
    noClamp: boolean;
}

interface VolumeSliderProps extends SliderControllerProps {
}
/**
 * Versatile and user-friendly input volume control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the volume level within the range 0 (muted) to 100.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @attr data-supported - Whether volume control is supported.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/volume-slider}
 */
declare class VolumeSlider extends Component<VolumeSliderProps, SliderState, SliderEvents, SliderCSSVars> {
    static props: VolumeSliderProps;
    static state: State<SliderState>;
    private _media;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _getARIAValueNow;
    private _getARIAValueText;
    private _watchVolume;
    private _throttleVolumeChange;
    private _onVolumeChange;
    private _onValueChange;
    private _onDragValueChange;
}

/**
 * Versatile and user-friendly input time control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the current playback time within the range 0 to seekable end.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/time-slider}
 */
declare class TimeSlider extends Component<TimeSliderProps, SliderState, SliderEvents, TimeSliderCSSVars> {
    static props: TimeSliderProps;
    static state: State<SliderState>;
    private _media;
    private _dispatchSeeking;
    private _chapter;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _calcBufferedPercent;
    private _hasChapters;
    private _watchSeekingThrottle;
    private _watchCurrentTime;
    private _watchPreviewing;
    private _seeking;
    private _seek;
    private _playingBeforeDragStart;
    private _onDragStart;
    private _onDragValueChange;
    private _onDragEnd;
    private _onValueChange;
    private _getStep;
    private _getKeyStep;
    private _roundValue;
    private _isDisabled;
    private _getARIAValueNow;
    private _getARIAValueText;
    private _percentToTime;
    private _timeToPercent;
    private _formatValue;
    private _formatTime;
}
interface TimeSliderCSSVars extends SliderCSSVars {
    /**
     * The percentage of media playback that has been buffered.
     */
    readonly 'slider-progress': string;
}
interface TimeSliderProps extends SliderControllerProps {
    /**
     * Whether it should request playback to pause while the user is dragging the
     * thumb. If the media was playing before the dragging starts, the state will be restored by
     * dispatching a user play request once the dragging ends.
     */
    pauseWhileDragging: boolean;
    /**
     * The amount of milliseconds to throttle media seeking request events being dispatched.
     */
    seekingRequestThrottle: number;
}

/**
 * Used to create predefined sections within a time slider interface based on the currently
 * active chapters text track.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-chapters}
 */
declare class SliderChapters extends Component<SliderChaptersProps, {}, SliderChaptersCSSVars> {
    static props: SliderChaptersProps;
    private _media;
    private _sliderState;
    private _updateScope?;
    private _titleRef;
    private _refs;
    private _$track;
    private _$cues;
    private _activeIndex;
    private _activePointerIndex;
    private _bufferedIndex;
    get cues(): VTTCue$1[];
    get activeCue(): VTTCue$1 | null;
    get activePointerCue(): VTTCue$1 | null;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(): void;
    protected onDestroy(): void;
    setRefs(refs: HTMLElement[]): void;
    private _setTrack;
    private _reset;
    private _watch;
    private _watchContainerWidths;
    private _watchFillPercent;
    private _watchPointerPercent;
    private _updateFillPercents;
    private _updateFillPercent;
    private _findActiveChapterIndex;
    private _watchBufferedPercent;
    private _updateBufferedPercent;
    private _bufferedPercent;
    private _calcMediaBufferedPercent;
    private _calcPercent;
    private _fillGaps;
    private _onTrackChange;
    private _onCuesChange;
    private _onChapterTitleChange;
    private _findParentSlider;
    private _findChapterTitleRef;
}
interface SliderChaptersProps {
    /**
     * Whether chapters should be disabled.
     */
    disabled: boolean;
}
interface SliderChaptersCSSVars {
    /**
     * The percentage of the chapter that is filled.
     */
    readonly 'chapter-fill': string;
    /**
     * The percentage of the chapter that has been buffered.
     */
    readonly 'chapter-progress': string;
}

interface SliderContext {
    _disabled: ReadSignal<boolean>;
    _orientation: ReadSignal<SliderOrientation>;
    _preview: WriteSignal<HTMLElement | null>;
}
declare const sliderContext: Context<SliderContext>;

/**
 * Root menu container used to hold and manage a menu button and menu items. This component is
 * used to display options in a floating panel. They can be nested to create submenus.
 *
 * @attr data-open - Whether menu is open.
 * @attr data-keyboard - Whether the menu is opened via keyboard.
 * @attr data-submenu - Whether menu is a submenu.
 * @attr data-disabled - Whether menu is disabled.
 * @attr data-resizing - Whether the menu is resizing.
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 */
declare class Menu extends Component<MenuProps, {}, MenuEvents> {
    static props: MenuProps;
    private _media;
    private _menuId;
    private _menuButtonId;
    private _expanded;
    private _disabled;
    private _trigger;
    private _content;
    private _isTriggerDisabled;
    private _parentMenu?;
    private _submenus;
    private _menuObserver;
    private _popper;
    private _focus;
    /**
     * The menu trigger element.
     */
    get triggerElement(): HTMLElement | null;
    /**
     * The menu items element.
     */
    get contentElement(): HTMLElement | null;
    /**
     * Whether this menu is the child of another menu that contains it.
     */
    get isSubmenu(): boolean;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected onDestroy(): void;
    private _watchExpanded;
    private _attachMenuButton;
    private _attachMenuItems;
    private _attachObserver;
    private _stopClickPropagation;
    private _updateMenuItemsHidden;
    private _disableMenuButton;
    private _onExpandedChange;
    private _isExpanded;
    private _isDisabled;
    private _disable;
    private _onPointerUp;
    private _onWindowPointerUp;
    private _getCloseTarget;
    private _findScrollContainer;
    private _toggleMediaControls;
    private _addSubmenu;
    private _removeSubmenuBind;
    private _removeSubmenu;
    private _onSubmenuOpenBind;
    private _onSubmenuOpen;
    private _onSubmenuCloseBind;
    private _onSubmenuClose;
    private _onResize;
    /**
     * Open this menu. The first menu item will be focused if a `KeyboardEvent` trigger is provided
     */
    open(trigger?: Event): void;
    /**
     * Close this menu. The menu button that controls this menu will be focused if a `KeyboardEvent`
     * trigger is provided
     */
    close(trigger?: Event): void;
}
interface MenuProps {
    /**
     * The amount of time in milliseconds to wait before showing the menu.
     */
    showDelay: number;
}
interface MenuEvents {
    open: MenuOpenEvent;
    close: MenuCloseEvent;
}
/**
 * Fired when the menu is opened.
 */
interface MenuOpenEvent extends DOMEvent<void> {
    target: Menu;
}
/**
 * Fired when the menu is closed.
 */
interface MenuCloseEvent extends DOMEvent<void> {
    target: Menu;
}

/**
 * A button that controls the opening and closing of a menu component. The button will become a
 * menuitem when used inside a submenu.
 *
 * @attr data-open - Whether menu is currently open.
 * @attr data-focus - Whether button is being keyboard focused.
 * @attr data-hocus - Whether button is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 */
declare class MenuButton extends Component<MenuButtonProps, {}, MenuButtonEvents> {
    static props: MenuButtonProps;
    private _menu;
    get expanded(): boolean;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _watchDisabled;
}
interface MenuButtonProps {
    /**
     * Whether the button should be disabled (non-interactive).
     */
    disabled: boolean;
}
interface MenuButtonEvents {
    select: MenuButtonSelectEvent;
}
/**
 * Fired when the button is pressed via mouse, touch, or keyboard.
 */
interface MenuButtonSelectEvent extends DOMEvent<void> {
    target: MenuButton;
}

/**
 * Represents a specific option or action, typically displayed as a text label or icon, which
 * users can select to access or perform a particular function or view related content.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 */
declare class MenuItem extends MenuButton {
}

/**
 * Portals menu items into the document body.
 *
 * @attr data-portal - Whether portal is active (determined by `disabled` prop).
 * @docs {@link https://www.vidstack.io/docs/player/components/menu#portal}
 */
declare class MenuPortal extends Component<MenuPortalProps> {
    static props: MenuPortalProps;
    private _target;
    private _media;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected onDestroy(): void;
    private _attachElement;
    private _watchDisabled;
    private _portal;
    private _getContainer;
}
interface MenuPortalProps {
    /**
     * Specifies a DOM element or query selector for the container that the menu should be portalled
     * inside.
     */
    container: HTMLElement | string | null;
    /**
     * Whether the portal should be disabled. The value can be the string "fullscreen" to disable
     * portals while media is fullscreen. This is to ensure the menu remains visible.
     */
    disabled: boolean | 'fullscreen';
}
interface MenuPortalContext {
    _attach(element: HTMLElement | null): void;
}
declare const menuPortalContext: Context<MenuPortalContext | null>;

interface MenuContext {
    readonly _expanded: ReadSignal<boolean>;
    readonly _hint: WriteSignal<string>;
    readonly _button: ReadSignal<HTMLElement | null>;
    _attachMenuButton(button: MenuButton): void;
    _attachMenuItems(menuItems: MenuItems): void;
    _attachObserver(observer: MenuObserver): void;
    _disable(disable: boolean): void;
    _disableMenuButton(disable: boolean): void;
    _addSubmenu(menu: Menu): void;
}
interface MenuObserver {
    _onOpen?(trigger?: Event): void;
    _onClose?(trigger?: Event): void;
}

/**
 * Menu items can be used to display settings or arbitrary content in a floating panel.
 *
 * @attr data-open - Whether menu items are currently visible.
 * @attr data-keyboard - Whether the menu is opened via keyboard.
 * @attr data-placement - The placement prop setting.
 * @attr data-focus - Whether item are being keyboard focused.
 * @attr data-hocus - Whether items are being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 */
declare class MenuItems extends Component<MenuItemsProps> {
    static props: MenuItemsProps;
    protected _menu: MenuContext;
    constructor();
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _watchPlacement;
    private _getButton;
}
type MenuPlacement = MenuPlacementSide | `${MenuPlacementSide} ${MenuPlacementAlign}`;
type MenuPlacementSide = 'top' | 'right' | 'bottom' | 'left';
type MenuPlacementAlign = 'start' | 'center' | 'end';
interface MenuItemsProps {
    /**
     * A space-separated list which specifies the side and alignment of the menu relative
     * to the menu button.
     *
     * @example `top center`
     * @example `bottom end`
     */
    placement: MenuPlacement | null;
    /**
     * The distance in pixels between the menu items and the menu button. You can also set
     * the CSS variable `--media-menu-y-offset` to adjust this offset.
     */
    offset: number;
    /**
     * The offset in pixels from the start/center/end aligned position. You can also set
     * the CSS variable `--media-menu-x-offset` to adjust this offset.
     */
    alignOffset: number;
}

/**
 * A radio group consists of options where only one of them can be checked. Each option is
 * provided as a radio (i.e., a selectable element).
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio-group}
 */
declare class RadioGroup extends Component<RadioGroupProps, {}, RadioGroupEvents> {
    static props: RadioGroupProps;
    private _controller;
    /**
     * A list of radio values that belong this group.
     */
    get values(): string[];
    /**
     * The radio value that is checked in this group.
     */
    get value(): string;
    set value(newValue: string);
    constructor();
    protected onSetup(): void;
    private _watchValue;
    private _onValueChange;
}
interface RadioGroupProps {
    /**
     * The value of the radio that is checked in this group.
     */
    value: string;
}
interface RadioGroupEvents {
    change: RadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail value
 */
interface RadioGroupChangeEvent extends DOMEvent<string> {
    target: RadioGroup;
}

/**
 * A radio represents a option that a user can select inside of a radio group. Only one radio
 * can be checked in a group.
 *
 * @attr data-checked - Whether radio is checked.
 * @attr data-focus - Whether radio is being keyboard focused.
 * @attr data-hocus - Whether radio is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio}
 */
declare class Radio extends Component<RadioProps, {}, RadioEvents> {
    static props: RadioProps;
    private _checked;
    private _controller;
    /**
     * Whether this radio is currently checked.
     */
    get checked(): boolean;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _onDisconnect;
    private _addToGroup;
    private _watchValue;
    private _onPress;
    private _check;
    private _onChange;
    private _onSelect;
}
interface RadioProps {
    /** The radio value. */
    value: string;
}
interface RadioEvents {
    change: RadioChangeEvent;
    select: RadioSelectEvent;
}
/**
 * Fired when the radio's checked value changes.
 *
 * @detail isSelected
 */
interface RadioChangeEvent extends DOMEvent<boolean> {
    target: Radio;
}
/**
 * Fired when the radio is pressed via mouse, touch, or, keyboard. This will not fire if the radio
 * is programmatically selected.
 */
interface RadioSelectEvent extends DOMEvent<void> {
    target: Radio;
}
interface RadioOption {
    label: string | ReadSignal<string>;
    value: string;
}

/**
 * This component manages media chapters inside of a radio group.
 *
 * @attr data-thumbnails - Whether thumbnails are available.
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/chapters-menu}
 */
declare class ChaptersRadioGroup extends Component<ChapterRadioGroupProps, {}, ChaptersRadioGroupEvents> {
    static props: ChapterRadioGroupProps;
    private _media;
    private _menu?;
    private _controller;
    private _index;
    private _track;
    private _cues;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    getOptions(): ChaptersRadioOption[];
    private _onOpen;
    protected onConnect(el: HTMLElement): void;
    protected _watchTrack(): (() => void) | undefined;
    protected _onCuesChange(track: TextTrack): void;
    private _watchValue;
    private _watchCurrentTime;
    private _watchControllerDisabled;
    private _getValue;
    private _onValueChange;
}
interface ChapterRadioGroupProps {
    /**
     * The absolute or relative URL to a [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)
     * file resource.
     */
    thumbnails: string;
}
interface ChaptersRadioGroupEvents {
    change: ChaptersRadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail cue
 */
interface ChaptersRadioGroupChangeEvent extends DOMEvent<VTTCue$1> {
    target: ChaptersRadioGroup;
}
interface ChaptersRadioOption extends RadioOption {
    cue: VTTCue$1;
    startTime: string;
    duration: string;
}

/**
 * This component manages audio track radios.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/audio-menu}
 */
declare class AudioRadioGroup extends Component<AudioRadioGroupProps, {}, AudioRadioGroupEvents> {
    static props: AudioRadioGroupProps;
    private _menu?;
    private _media;
    private _controller;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    getOptions(): AudioRadioOption[];
    private _watchValue;
    private _watchHintText;
    private _watchControllerDisabled;
    private _getValue;
    private _onValueChange;
}
interface AudioRadioGroupProps {
    /** The text to display when the are no audio tracks. */
    emptyLabel: string;
}
interface AudioRadioGroupEvents {
    change: AudioRadioGroupChangeEvent;
}
interface AudioRadioOption extends RadioOption {
    track: AudioTrack;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail track
 */
interface AudioRadioGroupChangeEvent extends DOMEvent<AudioTrack> {
    target: AudioRadioGroup;
}

/**
 * This component manages caption/subtitle track radio options.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/captions-menu-items}
 */
declare class CaptionsRadioGroup extends Component<CaptionsRadioGroupProps, {}, CaptionsRadioGroupEvents> {
    static props: CaptionsRadioGroupProps;
    private _media;
    private _menu?;
    private _controller;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    getOptions(): CaptionsRadioOption[];
    private _watchValue;
    private _watchHintText;
    private _watchControllerDisabled;
    private _getValue;
    private _onValueChange;
    private _getTrackValue;
}
interface CaptionsRadioGroupProps {
    /** The text to display when the captions are turned off. */
    offLabel: string;
}
interface CaptionsRadioGroupEvents {
    change: CaptionsRadioGroupChangeEvent;
}
interface CaptionsRadioOption extends RadioOption {
    track?: TextTrack;
}
/**
 * Fired when the checked radio changes. The event detail will be `null` when no track is selected
 * or captions are turned off.
 *
 * @detail track
 */
interface CaptionsRadioGroupChangeEvent extends DOMEvent<TextTrack | null> {
    target: CaptionsRadioGroup;
}

/**
 * This component manages playback rate radios.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/playback-rate-menu}
 */
declare class SpeedRadioGroup extends Component<SpeedRadioGroupProps, {}, SpeedRadioGroupEvents> {
    static props: SpeedRadioGroupProps;
    private _media;
    private _menu?;
    private _controller;
    get value(): string;
    get disabled(): boolean;
    constructor();
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    getOptions(): RadioOption[];
    private _watchValue;
    private _watchHintText;
    private _watchControllerDisabled;
    private _getValue;
    private _onValueChange;
}
interface SpeedRadioGroupProps {
    /** The playback rate options to be displayed. */
    rates: number[];
    /** The text to display for normal speed (i.e., playback rate of 1). */
    normalLabel: string;
}
interface SpeedRadioGroupEvents {
    change: SpeedRadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail speed
 */
interface SpeedRadioGroupChangeEvent extends DOMEvent<number> {
    target: SpeedRadioGroup;
}

/**
 * This component manages video quality radios.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/quality-menu}
 */
declare class QualityRadioGroup extends Component<QualityRadioGroupProps, {}, QualityRadioGroupEvents> {
    static props: QualityRadioGroupProps;
    private _media;
    private _menu?;
    private _controller;
    get value(): string;
    get disabled(): boolean;
    private _sortedQualities;
    constructor();
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    getOptions(): QualityRadioOption[];
    private _watchValue;
    private _watchHintText;
    private _watchControllerDisabled;
    private _onValueChange;
    private _getValue;
    private _getQualityId;
}
interface QualityRadioGroupProps {
    /** The text to display for the auto quality radio option. */
    autoLabel: string;
    /** Whether the bitrate should _not_ be displayed next to each quality radio option. */
    hideBitrate: boolean;
}
interface QualityRadioOption extends RadioOption {
    quality?: VideoQuality;
    bitrate?: ReadSignal<string | null>;
}
interface QualityRadioGroupEvents {
    change: QualityRadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail quality
 */
interface QualityRadioGroupChangeEvent extends DOMEvent<'auto' | VideoQuality> {
    target: QualityRadioGroup;
}

/**
 * This component enables actions to be performed on the media based on user gestures.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/gesture}
 */
declare class Gesture extends Component<GestureProps, {}, GestureEvents> {
    static props: GestureProps;
    private _media;
    private _provider;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _attachListener;
    private _presses;
    private _pressTimerId;
    private _acceptEvent;
    private _handleEvent;
    /** Validate event occurred in gesture bounds. */
    private _inBounds;
    /** Validate gesture has the highest z-index in this triggered group. */
    private _isTopLayer;
    private _performAction;
}
interface GestureProps {
    /**
     * The DOM event type that will trigger this gesture. It can be any valid DOM event type. Any
     * event can be prefixed with `dbl` to ensure it occurs twice in succession (max 200ms gap).
     *
     * @example 'pointerup'
     * @example 'dblpointerup'
     * @example 'mouseleave'
     */
    event: GestureEventType | undefined;
    /**
     * An action describes the type of media request event that will be dispatched, which will
     * ultimately perform some operation on the player.
     *
     * @example 'play'
     * @example 'seek:30'
     * @example 'seek:-30'
     * @example 'toggle:paused'
     */
    action: GestureAction | undefined;
}
type GestureEventType = keyof HTMLElementEventMap | `dbl${keyof HTMLElementEventMap}`;
type GestureAction = 'play' | 'pause' | `seek:${number}` | `toggle:${'paused' | 'muted' | 'fullscreen' | 'controls'}`;
interface GestureEvents {
    'will-trigger': GestureWillTriggerEvent;
    trigger: GestureTriggerEvent;
}
interface GestureEvent<Detail = unknown> extends DOMEvent<Detail> {
    target: Gesture;
}
/**
 * This event will fire before the gesture action is triggered. Calling `event.preventDefault()`
 * will stop the action from being triggered.
 *
 * @detail action
 * @cancelable
 */
interface GestureWillTriggerEvent extends GestureEvent<GestureAction> {
}
/**
 * This event will fire after the gesture action has been triggered.
 *
 * @detail action
 */
interface GestureTriggerEvent extends GestureEvent<GestureAction> {
}

interface CaptionsProps {
    textDir: 'ltr' | 'rtl';
}
/**
 * Renders and displays captions/subtitles. This will be an overlay for video and a simple
 * captions box for audio.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/captions}
 */
declare class Captions extends Component<CaptionsProps> {
    static props: CaptionsProps;
    private _media;
    private _renderer;
    private _textRenderer;
    private _lib;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected onDestroy(): void;
    private _isHidden;
    private _watchViewType;
    private _setupAudioView;
    private _onTrackChange;
    private _onCueChange;
    private _onUpdateTimedNodes;
    private _setupVideoView;
    private _watchTextDirection;
    private _watchMediaTime;
}

interface PosterProps {
    /**
     * The URL of the poster image resource.
     */
    src: string | undefined;
    /**
     * ♿ **ARIA:** Provides alternative information for a poster image if a user for some reason
     * cannot view it.
     */
    alt: string | undefined;
}
interface PosterState {
    img: HTMLImageElement | null;
    src: string | null;
    alt: string | null | undefined;
    loading: boolean;
    error: ErrorEvent | null;
    hidden: boolean;
}
/**
 * Loads and displays the current media poster image. By default, the media provider's
 * loading strategy is respected meaning the poster won't load until the media can.
 *
 * @attr data-visible - Whether poster image should be shown.
 * @attr data-loading - Whether poster image is loading.
 * @attr data-error - Whether an error occurred loading poster.
 * @attr data-hidden - Whether poster has no src or has failed to load.
 * @docs {@link https://www.vidstack.io/docs/player/components/media/poster}
 */
declare class Poster extends Component<PosterProps, PosterState> {
    static props: PosterProps;
    static state: State<PosterState>;
    private _media;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _hasError;
    private _watchHidden;
    private _isLoading;
    private _watchImg;
    private _watchImgSrc;
    private _watchImgAlt;
    private _onLoadStart;
    private _onLoad;
    private _onError;
}

/**
 * Outputs a media duration (eg: `currentTime`, `duration`, `bufferedAmount`, etc.) value as time
 * formatted text.
 *
 * @attr data-type - The type prop setting (current, duration, etc.).
 * @attr data-remainder - Whether time remaining is being shown.
 * @docs {@link https://www.vidstack.io/docs/player/components/display/time}
 */
declare class Time extends Component<TimeProps, TimeState> {
    static props: TimeProps;
    static state: State<TimeState>;
    private _media;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _watchTime;
    private _getSeconds;
}
interface TimeProps {
    /**
     * The type of media time to track.
     */
    type: 'current' | 'buffered' | 'duration';
    /**
     * Whether the time should always show the hours unit, even if the time is less than
     * 1 hour.
     *
     * @example `20:30 -> 0:20:35`
     */
    showHours: boolean;
    /**
     * Whether the hours unit should be padded with zeroes to a length of 2.
     *
     * @example `1:20:03 -> 01:20:03`
     */
    padHours: boolean | null;
    /**
     * Whether the minutes unit should be padded with zeroes to a length of 2.
     *
     * @example `5:22 -> 05:22`
     */
    padMinutes: boolean | null;
    /**
     * Whether to display the remaining time from the current type, until the duration is reached.
     *
     * @example `duration` - `currentTime`
     */
    remainder: boolean;
}
interface TimeState {
    timeText: string;
}

declare class DefaultLayout extends Component<DefaultLayoutProps> {
    static props: DefaultLayoutProps;
    private _whenQueryList;
    private _whenSmQueryList;
    menuContainer: HTMLElement | null;
    get isMatch(): boolean;
    get isSmallLayout(): boolean;
    protected onSetup(): void;
}
/**
 * The audio layout is our production-ready UI that's displayed when the media view type is set to
 * 'audio'. It includes support for audio tracks, slider chapters, and captions out of the box. It
 * doesn't support live streams just yet.
 *
 * @attr data-match - Whether this layout is being used (query match).
 * @attr data-size - The active layout size.
 */
declare class DefaultAudioLayout extends DefaultLayout {
    static props: DefaultLayoutProps;
}
/**
 * The video layout is our production-ready UI that's displayed when the media view type is set to
 * 'video'. It includes support for picture-in-picture, fullscreen, slider chapters, slider
 * previews, captions, and audio/quality settings out of the box. It doesn't support live
 * streams just yet.
 *
 * @attr data-match - Whether this layout is being used (query match).
 * @attr data-size - The active layout size.
 */
declare class DefaultVideoLayout extends DefaultLayout {
    static props: DefaultLayoutProps;
}
interface DefaultLayoutProps {
    /**
     * A player query string that determines when the UI should be displayed. The special string
     * 'never' will indicate that the UI should never be displayed.
     */
    when: string;
    /**
     * A player query string that determines when the small (e.g., mobile) UI should be displayed. The
     * special string 'never' will indicate that the small device optimized UI should never be
     * displayed.
     */
    smallWhen: string;
    /**
     * The absolute or relative URL to a [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)
     * file resource.
     */
    thumbnails: string;
    /**
     * Whether the default icons should _not_ be loaded. Set this to `true` when providing your own
     * icons.
     */
    customIcons: boolean;
    /**
     * Translation map from english to your desired language for words used throughout the layout.
     */
    translations: DefaultLayoutTranslations | null;
    /**
     * Specifies whether menu buttons should be placed in the top or bottom controls group. This
     * only applies to the large video layout.
     */
    menuGroup: 'top' | 'bottom';
    /**
     * Whether modal menus should be disabled when the small layout is active. A modal menu is
     * a floating panel that floats up from the bottom of the screen (outside of the player). It's
     * enabled by default as it provides a better user experience for touch devices.
     */
    noModal: boolean;
}
interface DefaultLayoutContext {
    smQueryList: PlayerQueryList;
    thumbnails: ReadSignal<string>;
    translations: ReadSignal<DefaultLayoutTranslations | null>;
    noModal: ReadSignal<DefaultLayoutProps['noModal']>;
    menuGroup: ReadSignal<DefaultLayoutProps['menuGroup']>;
    menuContainer: HTMLElement | null;
}
interface DefaultLayoutTranslations {
    'Closed-Captions Off': string;
    'Closed-Captions On': string;
    'Enter Fullscreen': string;
    'Enter PiP': string;
    'Exit Fullscreen': string;
    'Exit PiP': string;
    'Seek Backward': string;
    'Seek Forward': string;
    Audio: string;
    Auto: string;
    Captions: string;
    Chapters: string;
    Default: string;
    LIVE: string;
    Mute: string;
    Normal: string;
    Off: string;
    Pause: string;
    Play: string;
    Quality: string;
    Seek: string;
    Settings: string;
    'Skip To Live': string;
    Speed: string;
    Unmute: string;
    Volume: string;
}
declare function getDefaultLayoutLang(translations: ReadSignal<DefaultLayoutTranslations | null>, word: keyof DefaultLayoutTranslations): string;
declare const defaultLayoutContext: Context<DefaultLayoutContext>;
declare function useDefaultLayoutContext(): DefaultLayoutContext;

interface MediaEvents {
    'audio-tracks-change': MediaAudioTracksChangeEvent;
    'audio-track-change': MediaAudioTrackChangeEvent;
    'autoplay-change': MediaAutoplayChangeEvent;
    'autoplay-fail': MediaAutoplayFailEvent;
    'can-load': MediaCanLoadEvent;
    'can-play-through': MediaCanPlayThroughEvent;
    'can-play': MediaCanPlayEvent;
    'controls-change': MediaControlsChangeEvent;
    'duration-change': MediaDurationChangeEvent;
    'fullscreen-change': MediaFullscreenChangeEvent;
    'fullscreen-error': MediaFullscreenErrorEvent;
    'live-change': MediaLiveChangeEvent;
    'live-edge-change': MediaLiveEdgeChangeEvent;
    'load-start': MediaLoadStartEvent;
    'loaded-data': MediaLoadedDataEvent;
    'loaded-metadata': MediaLoadedMetadataEvent;
    'loop-change': MediaLoopChangeEvent;
    'media-type-change': MediaTypeChangeEvent;
    'orientation-change': MediaOrientationChangeEvent;
    'play-fail': MediaPlayFailEvent;
    'playsinline-change': MediaPlaysinlineChangeEvent;
    'poster-change': MediaPosterChangeEvent;
    'provider-change': MediaProviderChangeEvent;
    'provider-loader-change': MediaProviderLoaderChangeEvent;
    'provider-setup': MediaProviderSetupEvent;
    'picture-in-picture-change': MediaPIPChangeEvent;
    'picture-in-picture-error': MediaPIPErrorEvent;
    'qualities-change': MediaQualitiesChangeEvent;
    'quality-change': MediaQualityChangeEvent;
    'rate-change': MediaRateChangeEvent;
    'source-change': MediaSourceChangeEvent;
    'sources-change': MediaSourcesChangeEvent;
    'time-update': MediaTimeUpdateEvent;
    'title-change': MediaTitleChangeEvent;
    'stream-type-change': MediaStreamTypeChangeEvent;
    'text-tracks-change': MediaTextTracksChangeEvent;
    'text-track-change': MediaTextTrackChangeEvent;
    'view-type-change': MediaViewTypeChangeEvent;
    'volume-change': MediaVolumeChangeEvent;
    abort: MediaAbortEvent;
    autoplay: MediaAutoplayEvent;
    destroy: MediaDestroyEvent;
    emptied: MediaEmptiedEvent;
    end: MediaEndEvent;
    ended: MediaEndedEvent;
    error: MediaErrorEvent;
    pause: MediaPauseEvent;
    play: MediaPlayEvent;
    playing: MediaPlayingEvent;
    progress: MediaProgressEvent;
    replay: MediaReplayEvent;
    seeked: MediaSeekedEvent;
    seeking: MediaSeekingEvent;
    stalled: MediaStalledEvent;
    started: MediaStartedEvent;
    suspend: MediaSuspendEvent;
    waiting: MediaWaitingEvent;
}
interface MediaEvent<Detail = unknown> extends DOMEvent<Detail> {
    target: MediaPlayer;
    request?: DOMEvent<any>;
}
/**
 * Fired when the resource was not fully loaded, but not as the result of an error.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/abort_event}
 */
interface MediaAbortEvent extends MediaEvent<void> {
}
/**
 * Fired when an audio track has been added or removed.
 *
 * @detail audioTrack
 */
interface MediaAudioTracksChangeEvent extends MediaEvent<AudioTrack[]> {
    trigger: AudioTrackAddEvent | AudioTrackRemoveEvent;
}
/**
 * Fired when the current audio track changes.
 *
 * @detail audioTrack
 */
interface MediaAudioTrackChangeEvent extends MediaEvent<AudioTrack | null> {
    trigger: AudioTrackChangeEvent;
    request?: MediaAudioTrackChangeRequestEvent;
}
/**
 * Fired when the `autoplay` property has changed value.
 *
 * @detail isAutoplay
 */
interface MediaAutoplayChangeEvent extends MediaEvent<boolean> {
}
interface MediaAutoplayFailEventDetail {
    muted: boolean;
    error: Error;
}
/**
 * Fired when an autoplay attempt has failed. The event detail contains the error that
 * had occurred on the last autoplay attempt which caused it to fail.
 */
interface MediaAutoplayFailEvent extends MediaEvent<MediaAutoplayFailEventDetail> {
}
interface MediaAutoplayEventDetail {
    muted: boolean;
}
/**
 * Fired when an autoplay attempt has successfully been made (ie: media playback has automatically
 * started). The event detail whether media is `muted` before any attempts are made.
 */
interface MediaAutoplayEvent extends MediaEvent<MediaAutoplayEventDetail> {
}
/**
 * Fired when the provider can begin loading media. This depends on the type of `loading`
 * that has been configured. The `eager` strategy will be immediate, and `lazy` once the provider
 * has entered the viewport.
 */
interface MediaCanLoadEvent extends MediaEvent<void> {
    request?: MediaStartLoadingRequestEvent;
}
/**
 * Fired when the user agent can play the media, but estimates that **not enough** data has been
 * loaded to play the media up to its end without having to stop for further buffering of content.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event}
 */
interface MediaCanPlayEvent extends MediaEvent<MediaCanPlayDetail> {
}
interface MediaCanPlayDetail {
    provider: MediaProviderAdapter;
    duration: number;
    buffered: TimeRanges;
    seekable: TimeRanges;
}
/**
 * Fired when the user agent can play the media, and estimates that **enough** data has been
 * loaded to play the media up to its end without having to stop for further buffering of content.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event}
 */
interface MediaCanPlayThroughEvent extends MediaEvent<MediaCanPlayDetail> {
}
/**
 * Fired when controls visibility changes. The controls are idle/hidden when playback is
 * progressing (playing), and there is no user activity for a set period of time
 * (default is 2.5s). The event detail contains whether the controls are visible or not.
 *
 * @detail isVisible
 */
interface MediaControlsChangeEvent extends MediaEvent<boolean> {
    request?: MediaResumeControlsRequestEvent | MediaPauseControlsRequestEvent;
}
/**
 * Fired when the playback rate has changed. The event `detail` contains the new rate.
 *
 * @detail rate
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event}
 */
interface MediaRateChangeEvent extends MediaEvent<number> {
    request?: MediaRateChangeRequestEvent;
}
/**
 * Fired when the `source` property has changed value.
 *
 * @detail src
 */
interface MediaSourceChangeEvent extends MediaEvent<MediaSrc> {
}
/**
 * Fired when the player is manually destroyed by calling the `destroy()` method.
 */
interface MediaDestroyEvent extends MediaEvent<void> {
}
/**
 * Fired when the `duration` property changes.
 *
 * @detail duration
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/durationchange_event}
 */
interface MediaDurationChangeEvent extends MediaEvent<number> {
}
/**
 * Fired when the media has become empty.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event}
 */
interface MediaEmptiedEvent extends MediaEvent<void> {
}
/**
 * Fired each time media playback has reached the end. This is fired even if the
 * `loop` property is `true`, which is generally when you'd reach for this event over the
 * `MediaEndedEvent` if you want to be notified of media looping.
 */
interface MediaEndEvent extends MediaEvent<void> {
}
/**
 * Fired when playback or streaming has stopped because the end of the media was reached or
 * because no further data is available. This is not fired if playback will start from the
 * beginning again due to the `loop` property being `true` (see `MediaReplayEvent`
 * and `MediaEndEvent`).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event}
 */
interface MediaEndedEvent extends MediaEvent<void> {
}
/**
 * Fired when media loading or playback has encountered any issues (for example, a network
 * connectivity problem). The event detail contains a potential message containing more
 * information about the error (empty string if nothing available), and a code that identifies
 * the general type of error that occurred.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/media.html#error-codes}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event}
 */
interface MediaErrorEvent extends MediaEvent<MediaErrorDetail> {
}
/**
 * Fired when media enters/exits fullscreen. The event detail is a `boolean` indicating
 * if fullscreen was entered (`true`) or exited (`false`).
 *
 * @bubbles
 * @composed
 * @detail isFullscreen
 */
interface MediaFullscreenChangeEvent extends MediaEvent<boolean> {
    request?: MediaEnterFullscreenRequestEvent | MediaExitFullscreenRequestEvent;
}
/**
 * Fired when an error occurs either entering or exiting fullscreen. This will generally occur
 * if fullscreen is not supported or the user has not interacted with the page yet.
 *
 * @bubbles
 * @composed
 * @detail error
 */
interface MediaFullscreenErrorEvent extends MediaEvent<unknown> {
    request?: MediaEnterFullscreenRequestEvent | MediaExitFullscreenRequestEvent;
}
/**
 * Fired when the frame at the current playback position of the media has finished loading; often
 * the first frame.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event}
 */
interface MediaLoadedDataEvent extends MediaEvent<void> {
}
/**
 * Fired when the metadata has been loaded.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event}
 */
interface MediaLoadedMetadataEvent extends MediaEvent<void> {
}
/**
 * Fired when the `loop` property has changed value.
 *
 * @detail isLooping
 */
interface MediaLoopChangeEvent extends MediaEvent<boolean> {
}
/**
 * Fired when the `live` state changes. The event detail indicates whether the current stream
 * is live or not.
 *
 * @detail isLive
 */
interface MediaLiveChangeEvent extends MediaEvent<boolean> {
}
/**
 * Fired when the `liveEdge` state changes. The event detail indicates whether the user is viewing
 * at the live edge or not.
 *
 * @detail isLiveEdge
 */
interface MediaLiveEdgeChangeEvent extends MediaEvent<boolean> {
}
/**
 * Fired when the browser has started to load a resource.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadstart_event}
 */
interface MediaLoadStartEvent extends MediaEvent<void> {
}
/**
 * Fired when the `media` property changes value.
 *
 * @detail mediaType
 */
interface MediaTypeChangeEvent extends MediaEvent<MediaType> {
}
/**
 * Fired when a request to `pause` an activity is handled and the activity has entered its
 * `paused` state, most commonly after the media has been paused through a call to the
 * `pause()` method.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event}
 */
interface MediaPauseEvent extends MediaEvent<void> {
    request?: MediaPauseRequestEvent;
}
/**
 * Fired when the `paused` property is changed from `true` to `false`, as a result of the `play()`
 * method, or the `autoplay` attribute.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event}
 */
interface MediaPlayEvent extends MediaEvent<void> {
    autoplay?: boolean;
    request?: MediaPlayRequestEvent;
}
/**
 * Fired when an attempt to start media playback results in an error.
 *
 * @detail error
 */
interface MediaPlayFailEvent extends MediaEvent<Error> {
    autoplay?: boolean;
    request?: MediaPlayRequestEvent;
}
/**
 * Fired when playback is ready to start after having been paused or delayed due to lack of data.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event}
 */
interface MediaPlayingEvent extends MediaEvent<void> {
}
/**
 * Fired when the `playsinline` property has changed value.
 *
 * @detail isPlaysinline
 */
interface MediaPlaysinlineChangeEvent extends MediaEvent<boolean> {
}
/**
 * Fired when the `currentPoster` property has changed value.
 *
 * @detail poster
 */
interface MediaPosterChangeEvent extends MediaEvent<string> {
}
interface MediaProgressEventDetail {
    buffered: TimeRanges;
    seekable: TimeRanges;
}
/**
 * Fired periodically as the browser loads a resource.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/progress_event}
 * @detail progress
 */
interface MediaProgressEvent extends MediaEvent<MediaProgressEventDetail> {
}
/**
 * Fired when the new media provider loader has been selected and rendered. This will be `null` if
 * no loader is able to play one of the current sources.
 *
 * @detail loader
 */
interface MediaProviderLoaderChangeEvent extends MediaEvent<MediaProviderLoader | null> {
}
/**
 * Fired when the new media provider has been selected. This will be `null` if no provider is
 * able to play one of the current sources.
 *
 * This event is ideal for initially configuring any provider-specific settings.
 *
 * @detail adapter
 */
interface MediaProviderChangeEvent extends MediaEvent<MediaProviderAdapter | null> {
}
/**
 * Fired immediately after the provider has been set up. Do not try and configure the provider
 * here as it'll be too late - prefer the `provider-change` event.
 *
 * @detail adapter
 */
interface MediaProviderSetupEvent extends MediaEvent<MediaProviderAdapter> {
}
/**
 * Fired when media enters/exits picture-in-picture (PIP) mode. The event detail is a `boolean`
 * indicating if PIP was entered (`true`) or exited (`false`).
 *
 * @bubbles
 * @composed
 * @detail isPictureInPictureMode
 */
interface MediaPIPChangeEvent extends MediaEvent<boolean> {
    request?: MediaEnterPIPRequestEvent | MediaExitPIPRequestEvent;
}
/**
 * Fired when an error occurs either entering or exiting picture-in-picture (PIP) mode. This will
 * generally occur if PIP is not supported or the user has not interacted with the page yet.
 *
 * @bubbles
 * @composed
 * @detail error
 */
interface MediaPIPErrorEvent extends MediaEvent<unknown> {
    request?: MediaEnterPIPRequestEvent | MediaExitPIPRequestEvent;
}
/**
 * Fired when the list of available video qualities/renditions has changed.
 *
 * @detail renditions
 */
interface MediaQualitiesChangeEvent extends MediaEvent<VideoQuality[]> {
    trigger: VideoQualityAddEvent | VideoQualityRemoveEvent;
}
/**
 * Fired when the current video quality/rendition has changed. The event detail will be null if
 * video quality information is not available.
 *
 * @detail quality
 */
interface MediaQualityChangeEvent extends MediaEvent<VideoQuality | null> {
    trigger: VideoQualityChangeEvent;
    request?: MediaQualityChangeRequestEvent;
}
/**
 * Fired when a seek operation completed, the current playback position has changed, and the
 * `seeking` property is changed to `false`.
 *
 * @detail currentTime
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event}
 */
interface MediaSeekedEvent extends MediaEvent<number> {
    request?: MediaSeekRequestEvent;
}
/**
 * Fired when a seek operation starts, meaning the seeking property has changed to `true` and the
 * media is seeking to a new position.
 *
 * @detail currentTime
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event}
 */
interface MediaSeekingEvent extends MediaEvent<number> {
    request?: MediaSeekingRequestEvent;
}
/**
 * Fired when the current media sources has changed.
 *
 * @detail src
 */
interface MediaSourcesChangeEvent extends MediaEvent<MediaSrc[]> {
}
/**
 * Fired when the user agent is trying to fetch media data, but data is unexpectedly not
 * forthcoming.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event}
 */
interface MediaStalledEvent extends MediaEvent<void> {
}
/**
 * Fired when media playback has just started, in other words the at the moment the following
 * happens: `currentTime > 0`.
 */
interface MediaStartedEvent extends MediaEvent<void> {
}
/**
 * Fired when media data loading has been suspended.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/suspend_event}
 */
interface MediaSuspendEvent extends MediaEvent<void> {
}
/**
 * Fired when a screen orientation change is requested on or by the media.
 */
interface MediaOrientationChangeEvent extends ScreenOrientationChangeEvent {
    request?: MediaOrientationLockRequestEvent | MediaOrientationUnlockRequestEvent;
}
/**
 * Fired when media playback starts again after being in an `ended` state. This is fired
 * when the `loop` property is `true` and media loops, whereas the `play` event is not.
 */
interface MediaReplayEvent extends MediaEvent<void> {
    request?: MediaPlayRequestEvent;
}
interface MediaTimeUpdateEventDetail {
    currentTime: number;
    played: TimeRanges;
}
/**
 * Fired when the `currentTime` property value changes due to media playback or the
 * user seeking.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event}
 */
interface MediaTimeUpdateEvent extends MediaEvent<MediaTimeUpdateEventDetail> {
}
/**
 * Fired when the provided or inferred media title has changed.
 *
 * @detail title
 */
interface MediaTitleChangeEvent extends MediaEvent<string> {
}
/**
 * Fired when the `streamType` property changes value. The event detail contains the type of
 * stream (e.g., `on-demand`, `live`, `live:dvr`, etc.).
 *
 * @detail streamType
 */
interface MediaStreamTypeChangeEvent extends MediaEvent<MediaStreamType> {
}
/**
 * Fired when an audio track has been added or removed.
 *
 * @detail textTracks
 */
interface MediaTextTracksChangeEvent extends MediaEvent<TextTrack[]> {
    trigger: TextTrackAddEvent | TextTrackRemoveEvent;
}
/**
 * Fired when the current captions/subtitles text track changes.
 *
 * @detail textTrack
 */
interface MediaTextTrackChangeEvent extends MediaEvent<TextTrack | null> {
    trigger: TextTrackModeChangeEvent;
    request?: MediaTextTrackChangeRequestEvent;
}
/**
 * Fired when the `viewType` property changes value. This will generally fire when the
 * new provider has mounted and determined what type of player view is appropriate given
 * the type of media it can play.
 *
 * @detail viewType
 */
interface MediaViewTypeChangeEvent extends MediaEvent<MediaViewType> {
}
interface MediaVolumeChange {
    muted: boolean;
    volume: number;
}
/**
 * Fired when the `volume` or `muted` properties change value.
 *
 * @detail volume
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volumechange_event}
 */
interface MediaVolumeChangeEvent extends MediaEvent<MediaVolumeChange> {
    request?: MediaMuteRequestEvent | MediaUnmuteRequestEvent | MediaVolumeChangeRequestEvent;
}
/**
 * Fired when playback has stopped because of a temporary lack of data.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event}
 */
interface MediaWaitingEvent extends MediaEvent<void> {
}

interface MediaPlayerEvents extends MediaEvents, MediaRequestEvents, MediaUserEvents, LoggerEvents, VideoPresentationEvents, HLSProviderEvents {
    'media-player-connect': MediaPlayerConnectEvent;
    'find-media-player': FindMediaPlayerEvent;
}
/**
 * Fired when the player element `<media-player>` connects to the DOM.
 *
 * @bubbles
 * @composed
 * @detail player
 */
interface MediaPlayerConnectEvent extends DOMEvent<MediaPlayer> {
}
interface FindMediaPlayerEventDetail {
    (player: MediaPlayer | null): void;
}
/**
 * @internal
 * @bubbles
 * @composed
 * @detail callback
 */
interface FindMediaPlayerEvent extends DOMEvent<FindMediaPlayerEventDetail> {
}
interface MediaUserEvents {
}

declare class TimeRange implements TimeRanges {
    private readonly _ranges;
    get length(): number;
    constructor(start?: number | [number, number][], end?: number);
    start(index: number): number;
    end(index: number): number;
}
declare function getTimeRangesStart(range: TimeRanges): number | null;
declare function getTimeRangesEnd(range: TimeRanges): number | null;

declare class MediaPlayerController extends ViewController<MediaPlayerProps, MediaPlayerState, MediaPlayerEvents> {
}

declare class MediaControls extends MediaPlayerController {
    private _idleTimer;
    private _pausedTracking;
    private _hideOnMouseLeave;
    private _isMouseOutside;
    private _focusedItem;
    /**
     * The default amount of delay in milliseconds while media playback is progressing without user
     * activity to indicate an idle state (i.e., hide controls).
     *
     * @defaultValue 2000
     */
    defaultDelay: number;
    /**
     * Whether controls visibility should be toggled when the mouse enters and leaves the player
     * container.
     *
     * @defaultValue false
     */
    get hideOnMouseLeave(): boolean;
    set hideOnMouseLeave(hide: boolean);
    /**
     * Whether media controls are currently visible.
     */
    get showing(): boolean;
    /**
     * Show controls.
     */
    show(delay?: number, trigger?: Event): void;
    /**
     * Hide controls.
     */
    hide(delay?: number, trigger?: Event): void;
    /**
     * Whether all idle tracking on controls should be paused until resumed again.
     */
    pause(trigger?: Event): void;
    resume(trigger?: Event): void;
    protected onConnect(): void;
    private _watchMouse;
    private _watchPaused;
    private _onPlay;
    private _onPause;
    private _onMouseEnter;
    private _onMouseLeave;
    private _clearIdleTimer;
    private _onStopIdle;
    private _changeVisibility;
    private _onChange;
}

declare class LibASSTextRenderer implements TextRenderer {
    readonly loader: LibASSModuleLoader;
    config?: LibASSConfig | undefined;
    readonly priority = 1;
    private _instance;
    private _track;
    private _typeRE;
    constructor(loader: LibASSModuleLoader, config?: LibASSConfig | undefined);
    canRender(track: TextTrack, video: HTMLVideoElement | null): boolean;
    attach(video: HTMLVideoElement | null): void;
    changeTrack(track: TextTrack | null): void;
    detach(): void;
    private _freeTrack;
}
interface LibASSModuleLoader {
    (): Promise<{
        default: LibASSConstructor;
    }>;
}
interface LibASSConstructor {
    new (config?: {
        video: HTMLVideoElement;
        canvas?: HTMLCanvasElement;
        subUrl?: string;
    } & LibASSConfig): LibASSInstance;
}
interface LibASSInstance extends EventsTarget<LibASSInstanceEvents> {
    _video: HTMLVideoElement;
    _canvas: HTMLVideoElement | null;
    setTrackByUrl(url: string): void;
    setCurrentTime(time: number): void;
    freeTrack(): void;
    destroy(): void;
}
interface LibASSInstanceEvents {
    ready: LibASSReadyEvent;
    error: LibASSErrorEvent;
}
interface LibASSReadyEvent extends Event {
}
interface LibASSErrorEvent extends ErrorEvent {
}
/**
 * @see {@link https://github.com/ThaUnknown/jassub/tree/main#options}
 */
interface LibASSConfig {
    /**
     * Which image blending mode to use. WASM will perform better on lower end devices, JS will
     * perform better if the device and browser supports hardware acceleration.
     *
     * @defaultValue "js"
     */
    blendMode?: 'js' | 'wasm';
    /**
     * Whether or not to use async rendering, which offloads the CPU by creating image bitmaps on
     * the GPU.
     *
     * @defaultValue true
     */
    asyncRender?: boolean;
    /**
     * Whether or not to render things fully on the worker, greatly reduces CPU usage.
     *
     * @defaultValue true
     */
    offscreenRender?: boolean;
    /**
     * Whether or not to render subtitles as the video player renders frames, rather than predicting
     * which frame the player is on using events.
     *
     * @defaultValue true
     */
    onDemandRender?: boolean;
    /**
     * Target FPS to render subtitles at. Ignored when onDemandRender is enabled.
     *
     * @defaultValue 24
     */
    targetFps?: number;
    /**
     * Subtitle time offset in seconds.
     *
     * @defaultValue 0
     */
    timeOffset?: number;
    /**
     * Whether or not to print debug information.
     *
     * @defaultValue false
     */
    debug?: boolean;
    /**
     * Scale down (< 1.0) the subtitles canvas to improve performance at the expense of quality, or
     * scale it up (> 1.0).
     *
     * @defaultValue 1.0
     */
    prescaleFactor?: number;
    /**
     * The height in pixels beyond which the subtitles canvas won't be pre-scaled.
     *
     * @defaultValue 1080
     */
    prescaleHeightLimit?: number;
    /**
     * The maximum rendering height in pixels of the subtitles canvas. Beyond this subtitles will
     * be up-scaled by the browser.
     *
     * @defaultValue 0
     */
    maxRenderHeight?: number;
    /**
     * Attempt to discard all animated tags. Enabling this may severely mangle complex subtitles
     * and should only be considered as an last ditch effort of uncertain success for hardware
     * otherwise incapable of displaying anything. Will not reliably work with manually edited or
     * allocated events.
     *
     * @defaultValue false
     */
    dropAllAnimations?: boolean;
    /**
     * The URL of the worker.
     *
     * @defaultValue "jassub-worker.js"
     */
    workerUrl?: string;
    /**
     * The URL of the legacy worker. Only loaded if the browser doesn't support WASM.
     *
     * @defaultValue "jassub-worker-legacy.js"
     */
    legacyWorkerUrl?: string;
    /**
     * The URL of the subtitle file to play.
     *
     */
    subUrl?: string;
    /**
     * The content of the subtitle file to play.
     *
     */
    subContent?: string;
    /**
     * An array of links or `Uint8Array` to the fonts used in the subtitle. If `Uint8Array` is used
     * the array is copied, not referenced. This forces all the fonts in this array to be loaded
     * by the renderer, regardless of if they are used.
     *
     */
    fonts?: string[] | Uint8Array[];
    /**
     * Object with all available fonts. Key is font family in lower case, value is link or
     * `Uint8Array`. These fonts are selectively loaded if detected as used in the current
     * subtitle track.
     *
     * @defaultValue {'liberation sans': './default.woff2'}}
     */
    availableFonts?: Record<string, string>;
    /**
     * The font family key of the fallback font in `availableFonts` to use if the other font
     * for the style is missing special glyphs or unicode.
     *
     * @defaultValue "liberation sans"
     */
    fallbackFont?: string;
    /**
     * If the Local Font Access API is enabled `[chrome://flags/#font-access]`, the library will
     * query for permissions to use local fonts and use them if any are missing. The permission can
     * be queried beforehand using `navigator.permissions.request({ name: 'local-fonts' })`.
     *
     * @defaultValue true
     */
    useLocalFonts?: boolean;
    /**
     * libass bitmap cache memory limit in MiB (approximate).
     */
    libassMemoryLimit?: number;
    /**
     * libass glyph cache memory limit in MiB (approximate).
     */
    libassGlyphLimit?: number;
}

declare function findActiveCue(cues: readonly VTTCue$1[], time: number): VTTCue$1 | null;
declare function isCueActive(cue: VTTCue$1, time: number): boolean;
declare function observeActiveTextTrack(tracks: TextTrackList, kind: TextTrackKind | TextTrackKind[], onChange: (track: TextTrack | null) => void): Dispose;

declare class PlayerQueryList extends EventsTarget<PlayerQueryListEvents> {
    static create: (query: string | ReadSignal<string>) => PlayerQueryList;
    private _query;
    private _mediaStore;
    private _evaluation;
    private _mediaProps;
    private _mediaMatches;
    private _dispose;
    get query(): string;
    readonly $matches: ReadSignal<boolean>;
    get matches(): boolean;
    constructor(store: MediaStore, query: string | ReadSignal<string>);
    private _watchQuery;
    private _watchMatches;
    private _buildQueryEval;
    destroy(): void;
}
interface PlayerQueryListEvents {
    change: PlayerQueryListChangeEvent;
}
interface PlayerQueryListChangeEvent extends Omit<Event, 'target'> {
    target: PlayerQueryList;
}

declare const MEDIA_KEY_SHORTCUTS: MediaKeyShortcuts;

declare class ARIAKeyShortcuts extends ViewController {
    private _shortcut;
    constructor(_shortcut: string);
    protected onAttach(el: HTMLElement): void;
}

export { canUseVideoPresentation as $, type MediaProviderLoader as A, type MediaProviderAdapter as B, Controls as C, MediaRemoteControl as D, type MediaState as E, FullscreenButton as F, Gesture as G, type SliderState as H, type SliderOrientation as I, TextTrack as J, type TextTrackInit as K, LiveButton as L, MediaPlayer as M, type AudioTrack as N, type VideoQuality as O, PIPButton as P, Logger as Q, RadioGroup as R, SeekButton as S, ToggleButton as T, formatTime as U, VolumeSlider as V, formatSpokenTime as W, canChangeVolume as X, canOrientScreen as Y, canPlayHLSNatively as Z, canUsePictureInPicture as _, MediaProvider as a, type MediaPlayFailEvent as a$, canRotateScreen as a0, type ListItem as a1, List as a2, type ListEvents as a3, type ListAddEvent as a4, type ListRemoveEvent as a5, type ListReadonlyChangeEvent as a6, FullscreenController as a7, canFullscreen as a8, type FullscreenAdapter as a9, type MediaAutoplayFailEvent as aA, type MediaAutoplayEventDetail as aB, type MediaAutoplayEvent as aC, type MediaCanLoadEvent as aD, type MediaCanPlayEvent as aE, type MediaCanPlayDetail as aF, type MediaCanPlayThroughEvent as aG, type MediaControlsChangeEvent as aH, type MediaRateChangeEvent as aI, type MediaSourceChangeEvent as aJ, type MediaDestroyEvent as aK, type MediaDurationChangeEvent as aL, type MediaEmptiedEvent as aM, type MediaEndEvent as aN, type MediaEndedEvent as aO, type MediaErrorEvent as aP, type MediaFullscreenChangeEvent as aQ, type MediaFullscreenErrorEvent as aR, type MediaLoadedDataEvent as aS, type MediaLoadedMetadataEvent as aT, type MediaLoopChangeEvent as aU, type MediaLiveChangeEvent as aV, type MediaLiveEdgeChangeEvent as aW, type MediaLoadStartEvent as aX, type MediaTypeChangeEvent as aY, type MediaPauseEvent as aZ, type MediaPlayEvent as a_, type FullscreenEvents as aa, type FullscreenChangeEvent as ab, type FullscreenErrorEvent as ac, type LoggerEvents as ad, type LogEventDetail as ae, type LogEvent as af, ScreenOrientationController as ag, type ScreenOrientationEvents as ah, type ScreenOrientationChangeEventDetail as ai, type ScreenOrientationChangeEvent as aj, type ScreenOrientationType as ak, type ScreenOrientationLockType as al, type MediaContext as am, mediaContext as an, type MediaStateAccessors as ao, type MediaPlayerEvents as ap, MediaControls as aq, MEDIA_KEY_SHORTCUTS as ar, ARIAKeyShortcuts as as, type MediaEvents as at, type MediaEvent as au, type MediaAbortEvent as av, type MediaAudioTracksChangeEvent as aw, type MediaAudioTrackChangeEvent as ax, type MediaAutoplayChangeEvent as ay, type MediaAutoplayFailEventDetail as az, ControlsGroup as b, type MediaSrc as b$, type MediaPlayingEvent as b0, type MediaPlaysinlineChangeEvent as b1, type MediaPosterChangeEvent as b2, type MediaProgressEventDetail as b3, type MediaProgressEvent as b4, type MediaProviderLoaderChangeEvent as b5, type MediaProviderChangeEvent as b6, type MediaProviderSetupEvent as b7, type MediaPIPChangeEvent as b8, type MediaPIPErrorEvent as b9, type MediaAudioTrackChangeRequestEvent as bA, type MediaEnterFullscreenRequestEvent as bB, type MediaExitFullscreenRequestEvent as bC, type MediaEnterPIPRequestEvent as bD, type MediaExitPIPRequestEvent as bE, type MediaLiveEdgeRequestEvent as bF, type MediaPlayRequestEvent as bG, type MediaQualityChangeRequestEvent as bH, type MediaRateChangeRequestEvent as bI, type MediaPauseRequestEvent as bJ, type MediaSeekRequestEvent as bK, type MediaSeekingRequestEvent as bL, type MediaVolumeChangeRequestEvent as bM, type MediaResumeControlsRequestEvent as bN, type MediaPauseControlsRequestEvent as bO, type MediaShowPosterRequestEvent as bP, type MediaHidePosterRequestEvent as bQ, type MediaLoopRequestEvent as bR, type MediaOrientationLockRequestEvent as bS, type MediaOrientationUnlockRequestEvent as bT, type MediaType as bU, type MediaStreamType as bV, type MediaViewType as bW, type MediaLoadingStrategy as bX, type MediaErrorCode as bY, type MediaErrorDetail as bZ, type MediaResource as b_, type MediaQualitiesChangeEvent as ba, type MediaQualityChangeEvent as bb, type MediaSeekedEvent as bc, type MediaSeekingEvent as bd, type MediaSourcesChangeEvent as be, type MediaStalledEvent as bf, type MediaStartedEvent as bg, type MediaSuspendEvent as bh, type MediaOrientationChangeEvent as bi, type MediaReplayEvent as bj, type MediaTimeUpdateEventDetail as bk, type MediaTimeUpdateEvent as bl, type MediaTitleChangeEvent as bm, type MediaStreamTypeChangeEvent as bn, type MediaTextTracksChangeEvent as bo, type MediaTextTrackChangeEvent as bp, type MediaViewTypeChangeEvent as bq, type MediaVolumeChange as br, type MediaVolumeChangeEvent as bs, type MediaWaitingEvent as bt, type MediaRequestEvents as bu, type MediaStartLoadingRequestEvent as bv, type MediaTextTrackChangeRequestEvent as bw, type MediaMuteRequestEvent as bx, type MediaUnmuteRequestEvent as by, type MediaFullscreenRequestTarget as bz, CaptionButton as c, type MediaKeyShortcut as c$, type MediaPlayerState as c0, mediaState as c1, softResetMediaState as c2, type MediaStore as c3, type PlayerStore as c4, type MediaPlayerConnectEvent as c5, type FindMediaPlayerEventDetail as c6, type FindMediaPlayerEvent as c7, type MediaUserEvents as c8, TimeRange as c9, type TextTrackListEvent as cA, type TextTrackAddEvent as cB, type TextTrackRemoveEvent as cC, type TextTrackListModeChangeEvent as cD, AudioTrackList as cE, type AudioTrackListEvents as cF, type AudioTrackListEvent as cG, type AudioTrackAddEvent as cH, type AudioTrackRemoveEvent as cI, type AudioTrackChangeEvent as cJ, type ChangeAudioTrackEventDetail as cK, findActiveCue as cL, isCueActive as cM, observeActiveTextTrack as cN, PlayerQueryList as cO, type PlayerQueryListEvents as cP, type PlayerQueryListChangeEvent as cQ, VideoQualityList as cR, type VideoQualityListEvents as cS, type VideoQualityListEvent as cT, type VideoQualityAddEvent as cU, type VideoQualityRemoveEvent as cV, type VideoQualityChangeEvent as cW, type VideoQualityChangeEventDetail as cX, type VideoQualityAutoChangeEvent as cY, type MediaKeyTarget as cZ, type MediaKeyShortcuts as c_, getTimeRangesStart as ca, getTimeRangesEnd as cb, TextRenderers as cc, type TextRenderer as cd, LibASSTextRenderer as ce, type LibASSModuleLoader as cf, type LibASSConstructor as cg, type LibASSInstance as ch, type LibASSInstanceEvents as ci, type LibASSReadyEvent as cj, type LibASSErrorEvent as ck, type LibASSConfig as cl, type TextTrackReadyState as cm, type TextTrackEvents as cn, type TextTrackEvent as co, type TextTrackLoadStartEvent as cp, type TextTrackLoadEvent as cq, type TextTrackErrorEvent as cr, type TextTrackAddCueEvent as cs, type TextTrackRemoveCueEvent as ct, type TextTrackCueChangeEvent as cu, type TextTrackModeChangeEvent as cv, isTrackCaptionKind as cw, parseJSONCaptionsFile as cx, TextTrackList as cy, type TextTrackListEvents as cz, MuteButton as d, type HLSFragDecryptedEvent as d$, type MediaKeysCallback as d0, type AnyMediaProvider as d1, type MediaSetupContext as d2, type MediaFullscreenAdapter as d3, AudioProvider as d4, VideoProvider as d5, HLSProvider as d6, YouTubeProvider as d7, VimeoProvider as d8, AudioProviderLoader as d9, type HLSManifestLoadingEvent as dA, type HLSManifestLoadedEvent as dB, type HLSManifestParsedEvent as dC, type HLSLevelSwitchingEvent as dD, type HLSLevelSwitchedEvent as dE, type HLSLevelLoadingEvent as dF, type HLSLevelLoadedEvent as dG, type HLSLevelUpdatedEvent as dH, type HLSLevelPtsUpdatedEvent as dI, type HLSLevelsUpdatedEvent as dJ, type HLSAudioTracksUpdatedEvent as dK, type HLSAudioTrackSwitchingEvent as dL, type HLSAudioTrackSwitchedEvent as dM, type HLSAudioTrackLoadingEvent as dN, type HLSAudioTrackLoadedEvent as dO, type HLSSubtitleTracksUpdatedEvent as dP, type HLSSubtitleTracksClearedEvent as dQ, type HLSSubtitleTrackSwitchEvent as dR, type HLSSubtitleTrackLoadingEvent as dS, type HLSSubtitleTrackLoadedEvent as dT, type HLSSubtitleFragProcessedEvent as dU, type HLSCuesParsedEvent as dV, type HLSNonNativeTextTracksFoundEvent as dW, type HLSInitPtsFoundEvent as dX, type HLSFragLoadingEvent as dY, type HLSFragLoadEmergencyAbortedEvent as dZ, type HLSFragLoadedEvent as d_, VideoProviderLoader as da, YouTubeProviderLoader as db, HLSProviderLoader as dc, VimeoProviderLoader as dd, type VideoPresentationEvents as de, type VideoPresentationChangeEvent as df, type HLSProviderEvents as dg, type HLSMediaEvent as dh, type HLSLibLoadStartEvent as di, type HLSLibLoadedEvent as dj, type HLSLibLoadErrorEvent as dk, type HLSInstanceEvent as dl, type HLSUnsupportedEvent as dm, type HLSMediaAttachingEvent as dn, type HLSMediaAttachedEvent as dp, type HLSMediaDetachingEvent as dq, type HLSMediaDetachedEvent as dr, type HLSBufferResetEvent as ds, type HLSBufferCodecsEvent as dt, type HLSBufferCreatedEvent as du, type HLSBufferAppendingEvent as dv, type HLSBufferAppendedEvent as dw, type HLSBufferEosEvent as dx, type HLSBufferFlushingEvent as dy, type HLSBufferFlushedEvent as dz, PlayButton as e, type SliderChaptersCSSVars as e$, type HLSFragParsingInitSegmentEvent as e0, type HLSFragParsingUserdataEvent as e1, type HLSFragParsingMetadataEvent as e2, type HLSFragParsedEvent as e3, type HLSFragBufferedDataEvent as e4, type HLSFragChangedEvent as e5, type HLSFpsDropEvent as e6, type HLSFpsDropLevelCappingEvent as e7, type HLSErrorEvent as e8, type HLSDestroyingEvent as e9, useDefaultLayoutContext as eA, type MediaProviderState as eB, type ControlsEvents as eC, type ControlsChangeEvent as eD, type TooltipPlacement as eE, type TooltipPlacementSide as eF, type TooltipPlacementAlign as eG, type SliderEvents as eH, type SliderEvent as eI, type SliderDragStartEvent as eJ, type SliderDragEndEvent as eK, type SliderValueChangeEvent as eL, type SliderDragValueChangeEvent as eM, type SliderPointerValueChangeEvent as eN, type SliderCSSVars as eO, sliderState as eP, type SliderStore as eQ, type SliderDelegate as eR, SliderController as eS, type SliderControllerProps as eT, type SliderVideoState as eU, type SliderVideoEvents as eV, type SliderVideoCanPlayEvent as eW, type SliderVideoErrorEvent as eX, updateSliderPreviewPlacement as eY, type TimeSliderCSSVars as eZ, type SliderChaptersProps as e_, type HLSKeyLoadingEvent as ea, type HLSKeyLoadedEvent as eb, type HLSBackBufferReachedEvent as ec, type HLSConstructor as ed, type HLSConstructorLoader as ee, type HLSLibrary as ef, type HLSInstanceCallback as eg, isAudioProvider as eh, isVideoProvider as ei, isHLSProvider as ej, isYouTubeProvider as ek, isVimeoProvider as el, isHTMLAudioElement as em, isHTMLVideoElement as en, isHTMLMediaElement as eo, isHTMLIFrameElement as ep, sliderContext as eq, type SliderContext as er, DefaultLayout as es, DefaultAudioLayout as et, DefaultVideoLayout as eu, type DefaultLayoutProps as ev, type DefaultLayoutTranslations as ew, type DefaultLayoutContext as ex, defaultLayoutContext as ey, getDefaultLayoutLang as ez, Tooltip as f, type MenuEvents as f0, type MenuOpenEvent as f1, type MenuCloseEvent as f2, type MenuButtonEvents as f3, type MenuButtonSelectEvent as f4, type MenuPortalContext as f5, menuPortalContext as f6, type MenuPlacement as f7, type MenuPlacementSide as f8, type MenuPlacementAlign as f9, type QualityRadioGroupProps as fA, type QualityRadioOption as fB, type QualityRadioGroupEvents as fC, type QualityRadioGroupChangeEvent as fD, type GestureEventType as fE, type GestureAction as fF, type GestureEvents as fG, type GestureEvent as fH, type GestureWillTriggerEvent as fI, type GestureTriggerEvent as fJ, type PosterState as fK, type TimeState as fL, type ThumbnailState as fM, type ThumbnailCoords as fN, ThumbnailsLoader as fO, type RadioGroupEvents as fa, type RadioGroupChangeEvent as fb, type RadioEvents as fc, type RadioChangeEvent as fd, type RadioSelectEvent as fe, type RadioOption as ff, ChaptersRadioGroup as fg, type ChapterRadioGroupProps as fh, type ChaptersRadioGroupEvents as fi, type ChaptersRadioGroupChangeEvent as fj, type ChaptersRadioOption as fk, AudioRadioGroup as fl, type AudioRadioGroupProps as fm, type AudioRadioGroupEvents as fn, type AudioRadioOption as fo, type AudioRadioGroupChangeEvent as fp, CaptionsRadioGroup as fq, type CaptionsRadioGroupProps as fr, type CaptionsRadioGroupEvents as fs, type CaptionsRadioOption as ft, type CaptionsRadioGroupChangeEvent as fu, SpeedRadioGroup as fv, type SpeedRadioGroupProps as fw, type SpeedRadioGroupEvents as fx, type SpeedRadioGroupChangeEvent as fy, QualityRadioGroup as fz, TooltipTrigger as g, TooltipContent as h, Slider as i, TimeSlider as j, SliderThumbnail as k, SliderValue as l, SliderVideo as m, SliderPreview as n, SliderChapters as o, Menu as p, MenuButton as q, MenuItems as r, MenuItem as s, MenuPortal as t, Radio as u, Captions as v, Poster as w, Thumbnail as x, Time as y, type PlayerSrc as z };
