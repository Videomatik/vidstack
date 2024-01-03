import { MediaPlayerController } from '../api/player-controller';
export declare class MediaLoadController extends MediaPlayerController {
    private _callback;
    constructor(_callback: () => void);
    onAttach(el: HTMLElement): Promise<(() => void) | undefined>;
}
