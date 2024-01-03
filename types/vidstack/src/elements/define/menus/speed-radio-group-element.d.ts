import { SpeedRadioGroup } from '../../../components';
declare const MediaSpeedRadioGroupElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, SpeedRadioGroup>;
/**
 * @part label - Contains the speed option label.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/playback-rate-menu}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-items>
 *     <media-speed-radio-group>
 *       <template>
 *         <media-radio>
 *           <span data-part="label"></span>
 *         </media-radio>
 *       </template>
 *     </media-speed-radio-group>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
export declare class MediaSpeedRadioGroupElement extends MediaSpeedRadioGroupElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-speed-radio-group': MediaSpeedRadioGroupElement;
    }
}
export {};
