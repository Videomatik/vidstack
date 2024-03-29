import { type ReadSignal } from 'maverick.js';
import type { MediaContext } from '../../core/api/media-context';
import { type TextTrackInit } from '../../core/tracks/text/text-track';
export declare class Tracks {
    private _domTracks;
    private _media;
    private _prevTracks;
    constructor(_domTracks: ReadSignal<TextTrackInit[]>, _media: MediaContext);
    private _onTracksChange;
}
