import { ViewController } from 'maverick.js';
declare global {
    interface GlobalEventHandlersEventMap {
        beforeunload: Event;
        pageshow: Event;
        pagehide: Event;
        visibilitychange: Event;
    }
}
export declare class PageVisibilityController extends ViewController {
    private _state;
    private _visibility;
    private _safariBeforeUnloadTimeout;
    protected onConnect(): void;
    /**
     * The current page state. Important to note we only account for a subset of page states, as
     * the rest aren't valuable to the player at the moment.
     *
     * - **active:** A page is in the active state if it is visible and has input focus.
     * - **passive:** A page is in the passive state if it is visible and does not have input focus.
     * - **hidden:** A page is in the hidden state if it is not visible.
     *
     * @see https://developers.google.com/web/updates/2018/07/page-lifecycle-api#states
     */
    $pageState(): PageState;
    /**
     * The current document visibility state.
     *
     * - **visible:** The page content may be at least partially visible. In practice, this means that
     * the page is the foreground tab of a non-minimized window.
     * - **hidden:** The page content is not visible to the user. In practice this means that the
     * document is either a background tab or part of a minimized window, or the OS screen lock is
     * active.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState
     */
    $visibility(): DocumentVisibility;
    private _handlePageEvent;
}
export type PageState = 'active' | 'passive' | 'hidden';
export type DocumentVisibility = 'visible' | 'hidden';
