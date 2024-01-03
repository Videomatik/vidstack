import { Menu } from '../../../components';
declare const MediaMenuElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, Menu>;
/**
 * @part close-target - Closes menu when pressed.
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/menu}
 * @example
 * ```html
 * <media-menu>
 *   <media-menu-button aria-label="Settings">
 *     <media-icon type="settings"></media-icon>
 *   </media-menu-button>
 *   <media-menu-items>
 *     <!-- ... -->
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
export declare class MediaMenuElement extends MediaMenuElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-menu': MediaMenuElement;
    }
}
export {};
