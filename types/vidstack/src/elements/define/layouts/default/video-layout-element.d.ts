import { DefaultVideoLayout } from '../../../../components/layouts/default-layout';
import { LitElement, type LitRenderer } from '../../../lit/lit-element';
declare const MediaVideoLayoutElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<LitElement, DefaultVideoLayout>;
/**
 * @docs {@link https://www.vidstack.io/docs/player/components/layouts/default-layout}
 * @example
 * ```html
 * <media-player>
 *   <media-provider></media-provider>
 *   <media-video-layout></media-video-layout>
 * </media-player>
 * ```
 */
export declare class MediaVideoLayoutElement extends MediaVideoLayoutElement_base implements LitRenderer {
    static tagName: string;
    private _media;
    protected onSetup(): void;
    protected onConnect(): void;
    private _render;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-video-layout': MediaVideoLayoutElement;
    }
}
export {};
