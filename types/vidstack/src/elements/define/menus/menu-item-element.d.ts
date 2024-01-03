import { MenuItem } from '../../../components';
declare const MediaMenuItemElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, MenuItem>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/menu}
 * @example
 * ```html
 * <media-menu>
 *   <media-menu-items>
 *      <media-menu-item></media-menu-item>
 *   </media-menu-items>
 * </media-menu>
 * ```
 */
export declare class MediaMenuItemElement extends MediaMenuItemElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-menu-item': MediaMenuItemElement;
    }
}
export {};
