import { Component, State } from 'maverick.js';
import type { VTTCue } from 'media-captions';
import { type MediaContext } from '../../../core/api/media-context';
import { ThumbnailsLoader } from './thumbnail-loader';
export interface ThumbnailState {
    src: string;
    img: HTMLImageElement | null | undefined;
    coords: ThumbnailCoords | null;
    activeCue: VTTCue | null;
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
export declare class Thumbnail extends Component<ThumbnailProps, ThumbnailState> {
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
export interface ThumbnailProps {
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
export interface ThumbnailCoords {
    w: number;
    h: number;
    x: number;
    y: number;
}
