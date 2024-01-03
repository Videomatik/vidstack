import { AudioRadioGroup } from '../../../components';
declare const MediaAudioRadioGroupElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, AudioRadioGroup>;
/**
 * @part label - Contains the audio track option label.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/audio-menu}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-items>
 *     <media-audio-radio-group>
 *       <template>
 *         <media-radio>
 *           <span data-part="label"></span>
 *         </media-radio>
 *       </template>
 *     </media-audio-radio-group>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
export declare class MediaAudioRadioGroupElement extends MediaAudioRadioGroupElement_base {
    static tagName: string;
    protected onConnect(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-audio-radio-group': MediaAudioRadioGroupElement;
    }
}
export {};
