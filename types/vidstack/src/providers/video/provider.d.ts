import type { MediaContext } from '../../core/api/media-context';
import { HTMLMediaProvider } from '../html/provider';
import type { MediaFullscreenAdapter, MediaPictureInPictureAdapter, MediaProviderAdapter, MediaSetupContext } from '../types';
/**
 * The video provider adapts the `<video>` element to enable loading videos via the HTML Media
 * Element API.
 *
 * @docs {@link https://www.vidstack.io/docs/player/providers/video}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video}
 * @example
 * ```html
 * <media-player
 *   src="https://media-files.vidstack.io/720p.mp4"
 *   poster="https://media-files.vidstack.io/poster.png"
 * >
 *   <media-provider></media-provider>
 * </media-player>
 * ```
 */
export declare class VideoProvider extends HTMLMediaProvider implements MediaProviderAdapter {
    protected $$PROVIDER_TYPE: string;
    get type(): string;
    fullscreen?: MediaFullscreenAdapter;
    pictureInPicture?: MediaPictureInPictureAdapter;
    constructor(video: HTMLVideoElement, ctx: MediaContext);
    setup(ctx: MediaSetupContext): void;
    /**
     * The native HTML `<video>` element.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement}
     */
    get video(): HTMLVideoElement;
}
