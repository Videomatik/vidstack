import { Slider } from '../../../components';
declare const MediaSliderElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, Slider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/slider}
 * @example
 * ```html
 * <media-slider min="0" max="100" value="50" aria-label="...">
 *   <div class="track"></div>
 *   <div class="track-fill"></div>
 *   <div class="track-progress"></div>
 *   <div class="thumb"></div>
 * </media-slider>
 * ```
 */
export declare class MediaSliderElement extends MediaSliderElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider': MediaSliderElement;
    }
}
export {};
