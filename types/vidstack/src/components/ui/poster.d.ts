import { Component, State } from 'maverick.js';
export interface PosterProps {
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
export interface PosterState {
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
export declare class Poster extends Component<PosterProps, PosterState> {
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
