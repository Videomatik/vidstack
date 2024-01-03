import { CaptionsRadioGroup } from '../../../components';
declare const MediaCaptionsRadioGroupElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, CaptionsRadioGroup>;
/**
 * @part label - Contains the caption/subtitle option label.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/captions-menu-items}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-items>
 *     <media-captions-radio-group>
 *       <template>
 *         <media-radio>
 *           <span data-part="label"></span>
 *         </media-radio>
 *       </template>
 *     </media-captions-radio-group>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
export declare class MediaCaptionsRadioGroupElement extends MediaCaptionsRadioGroupElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-captions-radio-group': MediaCaptionsRadioGroupElement;
    }
}
export {};
