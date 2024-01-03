import { MediaProvider } from '../../components';
declare const MediaProviderElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, MediaProvider>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/core/provider}
 * @example
 * ```html
 * <media-player>
 *   <media-provider></media-provider>
 *   <!-- ... -->
 * </media-player>
 * ```
 */
export declare class MediaProviderElement extends MediaProviderElement_base {
    static tagName: string;
    private _media;
    private _target;
    private _blocker;
    protected onSetup(): void;
    protected onDestroy(): void;
    protected onConnect(): void;
    private _createAudio;
    private _createVideo;
    private _createIFrame;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-provider': MediaProviderElement;
    }
}
export {};
