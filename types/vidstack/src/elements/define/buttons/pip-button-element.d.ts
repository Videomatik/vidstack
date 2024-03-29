import { PIPButton } from '../../../components';
declare const MediaPIPButtonElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, PIPButton>;
/**
 * @example
 * ```html
 * <media-pip-button>
 *   <media-icon type="picture-in-picture"></media-icon>
 *   <media-icon type="picture-in-picture-exit"></media-icon>
 * </media-pip-button>
 * ```
 */
export declare class MediaPIPButtonElement extends MediaPIPButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-pip-button': MediaPIPButtonElement;
    }
}
export {};
