import { Component } from 'maverick.js';
declare class ChapterTitle extends Component {
}
declare const MediaChapterTitleElement_base: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").ae<HTMLElement, ChapterTitle>;
/**
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/chapter-title}
 * @example
 * ```html
 * <media-chapter-title></media-chapter-title>
 * ```
 */
export declare class MediaChapterTitleElement extends MediaChapterTitleElement_base {
    static tagName: string;
    private _media;
    private _title;
    private _chapterTitle;
    protected onSetup(): void;
    protected onConnect(): void;
    protected _getTitle(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-chapter-title': MediaChapterTitleElement;
    }
}
export {};
