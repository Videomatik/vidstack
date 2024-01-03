import { LiveButton } from '../../../components';
declare const MediaLiveButtonElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, LiveButton>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/buttons/live-button}
 * @example
 * ```html
 * <media-live-button>
 *   <!-- ... -->
 * </media-live-button>
 * ```
 */
export declare class MediaLiveButtonElement extends MediaLiveButtonElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-live-button': MediaLiveButtonElement;
    }
}
export {};
