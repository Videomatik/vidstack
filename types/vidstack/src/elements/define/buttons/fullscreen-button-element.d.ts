import { FullscreenButton } from '../../../components';
declare const MediaFullscreenButtonElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, FullscreenButton>;
/**
 * @example
 * ```html
 * <media-fullscreen-button>
 *   <media-icon type="fullscreen"></media-icon>
 *   <media-icon type="fullscreen-exit"></media-icon>
 * </media-fullscreen-button>
 * ```
 */
export declare class MediaFullscreenButtonElement extends MediaFullscreenButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-fullscreen-button': MediaFullscreenButtonElement;
    }
}
export {};
