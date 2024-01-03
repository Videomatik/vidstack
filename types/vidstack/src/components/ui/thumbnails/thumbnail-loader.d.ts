import { type ReadSignal } from 'maverick.js';
import type { VTTCue } from 'media-captions';
import { type MediaContext } from '../../../core/api/media-context';
export declare class ThumbnailsLoader {
    readonly $src: ReadSignal<string>;
    private _media;
    readonly $cues: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").W<VTTCue[]>;
    static create($src: ReadSignal<string>): ThumbnailsLoader;
    constructor($src: ReadSignal<string>, _media: MediaContext);
    protected _onLoadCues(): (() => void) | undefined;
    private _updateCues;
}
