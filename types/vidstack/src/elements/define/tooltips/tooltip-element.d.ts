import { Tooltip } from '../../../components';
declare const MediaTooltipElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, Tooltip>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/tooltip}
 * @example
 * ```html
 * <media-tooltip>
 *   <media-tooltip-trigger>
 *     <media-play-button></media-play-button>
 *   </media-tooltip-trigger>
 *   <media-tooltip-content placement="top start">
 *      <span class="play-tooltip-text">Play</span>
 *      <span class="pause-tooltip-text">Pause</span>
 *   </media-tooltip-content>
 * </media-tooltip>
 * ```
 */
export declare class MediaTooltipElement extends MediaTooltipElement_base {
    static tagName: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-tooltip': MediaTooltipElement;
    }
}
export {};
