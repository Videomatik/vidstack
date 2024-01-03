import { Poster } from '../../components';
declare const MediaPosterElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, Poster>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/poster}
 * @example
 * ```html
 * <media-player>
 *   <media-poster src="..." alt="Large alien ship hovering over New York."></media-poster>
 * </media-player>
 * ```
 */
export declare class MediaPosterElement extends MediaPosterElement_base {
    static tagName: string;
    private _media;
    private _img;
    protected onSetup(): void;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-poster': MediaPosterElement;
    }
}
export {};
