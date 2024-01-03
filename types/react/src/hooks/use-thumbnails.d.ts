import type { VTTCue } from 'media-captions';
export interface ThumbnailData {
    url: string;
    cue: VTTCue;
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * Fetches and parses a WebVTT file. The function will return the parsed thumbnail
 * data such as the VTTCue, coordinates, dimensions, and url. It's safe to call this hook in
 * multiple places with the same `src` argument as work is de-duped and cached.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-thumbnails}
 */
export declare function useThumbnails(src: string): ThumbnailData[];
/**
 * Returns the active thumbnail based on the given time.
 *
 * @param thumbnails - thumbnail data returned from called `useThumbnails("...")`.
 * @param time - the current time to determine which thumbnail is active.
 */
export declare function useActiveThumbnail(thumbnails: ThumbnailData[], time: number): ThumbnailData | null;
