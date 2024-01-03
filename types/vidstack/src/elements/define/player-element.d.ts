import type { Attributes } from 'maverick.js/element';
import { MediaPlayer } from '../../components';
import type { MediaPlayerProps } from '../../core/api/player-props';
declare const MediaPlayerElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, MediaPlayer>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/core/player}
 * @example
 * ```html
 * <media-player src="...">
 *   <media-provider></media-provider>
 *   <!-- Other components that use/manage media state here. -->
 * </media-player>
 * ```
 */
export declare class MediaPlayerElement extends MediaPlayerElement_base {
    static tagName: string;
    static attrs: Attributes<MediaPlayerProps>;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-player': MediaPlayerElement;
    }
}
export {};
