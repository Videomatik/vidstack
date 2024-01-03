import { CaptionButton } from '../../../components';
declare const MediaCaptionButtonElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, CaptionButton>;
/**
 * @example
 * ```html
 * <media-caption-button>
 *   <media-icon type="closed-captions-on"></media-icon>
 *   <media-icon type="closed-captions"></media-icon>
 * </media-caption-button>
 * ```
 */
export declare class MediaCaptionButtonElement extends MediaCaptionButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-caption-button': MediaCaptionButtonElement;
    }
}
export {};
