import type { MediaSetupContext } from '../types';
/**
 * This is used to discover text tracks that were found by the native playback engine. For example,
 * Safari will load text tracks that were embedded in the HLS playlist.
 */
export declare class NativeHLSTextTracks {
    private _video;
    private _ctx;
    constructor(_video: HTMLVideoElement, _ctx: MediaSetupContext);
    private _onAddTrack;
    private _onDispose;
}
