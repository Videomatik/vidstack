import { type MediaContext } from '../api/media-context';
import { MediaPlayerController } from '../api/player-controller';
export declare class MediaEventsLogger extends MediaPlayerController {
    private _media;
    constructor(_media: MediaContext);
    protected onConnect(): void;
    private _onMediaEvent;
}
