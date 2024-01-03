import { MuteButton } from '../../../components';
declare const MediaMuteButtonElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, MuteButton>;
/**
 * @example
 * ```html
 * <media-mute-button>
 *   <media-icon type="mute"></media-icon>
 *   <media-icon type="volume-low"></media-icon>
 *   <media-icon type="volume-high"></media-icon>
 * </media-mute-button>
 * ```
 */
export declare class MediaMuteButtonElement extends MediaMuteButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-mute-button': MediaMuteButtonElement;
    }
}
export {};
