import { PlayButton } from '../../../components';
declare const MediaPlayButtonElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, PlayButton>;
/**
 * @example
 * ```html
 * <media-play-button>
 *   <media-icon type="play"></media-icon>
 *   <media-icon type="pause"></media-icon>
 *   <media-icon type="replay"></media-icon>
 * </media-play-button>
 * ```
 */
export declare class MediaPlayButtonElement extends MediaPlayButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-play-button': MediaPlayButtonElement;
    }
}
export {};
