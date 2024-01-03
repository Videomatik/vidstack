import { ControlsGroup } from '../../components';
declare const MediaControlsGroupElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, ControlsGroup>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/controls}
 * @example
 * ```html
 * <media-player>
 *   <!-- ... -->
 *   <media-controls>
 *     <media-controls-group></media-controls-group>
 *     <media-controls-group></media-controls-group>
 *   </media-controls>
 * </media-player>
 * ```
 */
export declare class MediaControlsGroupElement extends MediaControlsGroupElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-controls-group': MediaControlsGroupElement;
    }
}
export {};
