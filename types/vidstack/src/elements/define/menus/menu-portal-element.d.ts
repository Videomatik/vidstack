import { type Attributes } from 'maverick.js/element';
import { MenuPortal, type MenuPortalProps } from '../../../components';
declare const MediaMenuPortalElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, MenuPortal>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/menu/menu#portal}
 * @example
 * ```html
 * <media-menu>
 *   <!-- ... -->
 *   <media-menu-portal>
 *     <media-menu-items></media-menu-items>
 *   </media-menu-portal>
 * </media-menu>
 * ```
 */
export declare class MediaMenuPortalElement extends MediaMenuPortalElement_base {
    static tagName: string;
    static attrs: Attributes<MenuPortalProps>;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-menu-portal': MediaMenuPortalElement;
    }
}
export {};
