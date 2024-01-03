import { Controls } from '../../components';
declare const MediaControlsElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, Controls>;
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
export declare class MediaControlsElement extends MediaControlsElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-controls': MediaControlsElement;
    }
}
export {};
