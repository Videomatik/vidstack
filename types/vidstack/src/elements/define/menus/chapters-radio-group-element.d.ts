import { ChaptersRadioGroup } from '../../../components';
declare const MediaChaptersRadioGroupElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, ChaptersRadioGroup>;
/**
 * @part label - Contains the chapter option title.
 * @part start-time - Contains the chapter option start time.
 * @part duration - Contains the chapter option duration.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/chapters-menu}
 * @example
 * ```html
 * <media-menu>
 *   <media-menu-button aria-label="Chapters">
 *     <media-icon type="chapters"></media-icon>
 *   </media-menu-button>
 *   <media-chapters-radio-group thumbnails="...">
 *     <template>
 *       <media-radio>
 *         <media-thumbnail></media-thumbnail>
 *         <span data-part="label"></span>
 *         <span data-part="start-time"></span>
 *         <span data-part="duration"></span>
 *       </media-radio>
 *     </template>
 *    </media-chapters-radio-group>
 * </media-menu>
 * ```
 */
export declare class MediaChaptersRadioGroupElement extends MediaChaptersRadioGroupElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-chapters-radio-group': MediaChaptersRadioGroupElement;
    }
}
export {};
