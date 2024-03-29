/// <reference types="../vidstack/dom.d.ts" />
import type { MediaContext } from '../../../core/api/media-context';
import type { MediaFullscreenAdapter, MediaPictureInPictureAdapter } from '../../types';
declare global {
    interface GlobalEventHandlersEventMap {
        webkitpresentationmodechanged: Event;
    }
}
export declare class VideoPresentation {
    protected _video: HTMLVideoElement;
    private _media;
    _mode: WebKitPresentationMode;
    constructor(_video: HTMLVideoElement, _media: MediaContext);
    get _supported(): boolean;
    _setPresentationMode(mode: WebKitPresentationMode): Promise<void>;
    private _onModeChange;
}
export declare class FullscreenPresentationAdapter implements MediaFullscreenAdapter {
    protected _presentation: VideoPresentation;
    get active(): boolean;
    get supported(): boolean;
    constructor(_presentation: VideoPresentation);
    enter(): Promise<void>;
    exit(): Promise<void>;
}
export declare class PIPPresentationAdapter implements MediaPictureInPictureAdapter {
    protected _presentation: VideoPresentation;
    get active(): boolean;
    get supported(): boolean;
    constructor(_presentation: VideoPresentation);
    enter(): Promise<void>;
    exit(): Promise<void>;
}
