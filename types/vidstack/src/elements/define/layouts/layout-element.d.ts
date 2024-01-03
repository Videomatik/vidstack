import { Component } from 'maverick.js';
import { PlayerQueryList } from '../../../core';
declare class MediaLayout extends Component<{
    when: string;
}> {
    static props: {
        when: string;
    };
}
declare const MediaLayoutElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, MediaLayout>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/layouts#custom}
 * @example
 * ```html
 * <media-layout when="(view-type: video)">
 *   <template>
 *     <!-- ... -->
 *   </template>
 * </media-layout>
 * ```
 */
export declare class MediaLayoutElement extends MediaLayoutElement_base {
    static tagName: string;
    query: PlayerQueryList;
    protected onSetup(): void;
    protected onConnect(): void;
    private _watchQuery;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-layout': MediaLayoutElement;
    }
}
export {};
