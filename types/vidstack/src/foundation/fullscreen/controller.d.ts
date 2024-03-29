import { ViewController } from 'maverick.js';
import type { FullscreenEvents } from './events';
export declare class FullscreenController extends ViewController<{}, {}, FullscreenEvents> implements FullscreenAdapter {
    /**
     * Tracks whether we're the active fullscreen event listener. Fullscreen events can only be
     * listened to globally on the document so we need to know if they relate to the current host
     * element or not.
     */
    private _listening;
    private _active;
    get active(): boolean;
    get supported(): boolean;
    protected onConnect(): void;
    protected _onDisconnect(): Promise<void>;
    protected _onFullscreenChange(event: Event): void;
    protected _onFullscreenError(event: Event): void;
    enter(): Promise<void>;
    exit(): Promise<void>;
}
export declare function canFullscreen(): boolean;
export interface FullscreenAdapter {
    /**
     * Whether the host element is in fullscreen mode.
     */
    readonly active: boolean;
    /**
     * Whether the native browser fullscreen API is available, or the current provider can
     * toggle fullscreen mode. This does not mean that the operation is guaranteed to be successful,
     * only that it can be attempted.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API}
     */
    readonly supported: boolean;
    /**
     * Request to display the current host element in fullscreen.
     *
     * @throws Error - if fullscreen API is not available.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen}
     */
    enter(): Promise<void>;
    /**
     * Attempt to exit fullscreen on the current host element.
     *
     * @throws Error - if fullscreen API is not available.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/exitFullscreen}
     */
    exit(): Promise<void>;
}
