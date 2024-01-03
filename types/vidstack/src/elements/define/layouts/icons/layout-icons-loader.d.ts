import type { MediaPlayerElement } from '../../player-element';
import { IconsLoader } from './icons-loader';
export declare abstract class LayoutIconsLoader extends IconsLoader {
    connect(): void;
    protected _findPlayerElement(): MediaPlayerElement | null;
}
