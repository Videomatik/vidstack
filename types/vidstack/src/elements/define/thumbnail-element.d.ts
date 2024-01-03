import { Thumbnail } from '../../components';
import { type MediaContext } from '../../core/api/media-context';
declare const MediaThumbnailElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, Thumbnail>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/thumbnail}
 * @example
 * ```html
 * <media-player>
 *   <!-- ... -->
 *   <media-thumbnail
 *     src="https://media-files.vidstack.io/thumbnails.vtt"
 *     time="10"
 *   ></media-thumbnail>
 * </media-player>
 * ```
 */
export declare class MediaThumbnailElement extends MediaThumbnailElement_base {
    static tagName: string;
    protected _media: MediaContext;
    protected _img: HTMLImageElement;
    protected onSetup(): void;
    protected onConnect(): void;
    private _createImg;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-thumbnail': MediaThumbnailElement;
    }
}
export {};
