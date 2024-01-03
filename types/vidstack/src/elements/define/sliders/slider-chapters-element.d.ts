import { SliderChapters } from '../../../components';
declare const MediaSliderChaptersElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, SliderChapters>;
/**
 * @part chapter-title - Contains the current chapter title.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/sliders/slider-chapters}
 * @example
 * ```html
 * <media-time-slider>
 *   <media-slider-chapters>
 *     <template>
 *       <div class="slider-chapter">
 *         <div class="slider-track"></div>
 *         <div class="slider-track-fill"></div>
 *         <div class="slider-track-progress"></div>
 *       </div>
 *     </template>
 *   </media-slider-chapters>
 * </media-time-slider>
 * ```
 * ```
 */
export declare class MediaSliderChaptersElement extends MediaSliderChaptersElement_base {
    static tagName: string;
    protected _template: HTMLTemplateElement | null;
    protected onConnect(): void;
    private _renderTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-slider-chapters': MediaSliderChaptersElement;
    }
}
export {};
