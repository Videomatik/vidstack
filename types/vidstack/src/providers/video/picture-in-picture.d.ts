import type { MediaContext } from '../../core/api/media-context';
import type { MediaPictureInPictureAdapter } from '../types';
declare global {
    interface GlobalEventHandlersEventMap {
        enterpictureinpicture: Event;
        leavepictureinpicture: Event;
    }
}
export declare class VideoPictureInPicture implements MediaPictureInPictureAdapter {
    protected _video: HTMLVideoElement;
    private _media;
    constructor(_video: HTMLVideoElement, _media: MediaContext);
    get active(): boolean;
    get supported(): boolean;
    enter(): Promise<PictureInPictureWindow>;
    exit(): Promise<void>;
    private _onEnter;
    private _onExit;
    private _onChange;
}
