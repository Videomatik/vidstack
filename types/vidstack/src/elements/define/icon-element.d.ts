import { type IconType } from 'media-icons';
/**
 * The `<media-icon>` component dynamically loads and renders our custom Vidstack icons. See our
 * [media icons catalog](https://www.vidstack.io/media-icons) to preview them all. Do note, the
 * icon `type` can be dynamically changed.
 *
 * @docs {@link https://www.vidstack.io/docs/wc/player/components/display/icons}
 * @example
 * ```html
 * <media-icon type="play"></media-icon>
 * <media-icon type="pause"></media-icon>
 * ```
 */
export declare class MediaIconElement extends HTMLElement {
    static tagName: string;
    static get observedAttributes(): string[];
    private _svg;
    private _paths;
    private _type;
    private _disposal;
    /**
     * The type of icon. You can find a complete and searchable list on our website - see our
     * [media icons catalog](https://www.vidstack.io/media-icons?lib=html).
     */
    get type(): IconType | null;
    set type(type: IconType | null);
    attributeChangedCallback(name: string, _: any, newValue: string | null): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _createSVG;
    private _loadIcon;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-icon': MediaIconElement;
    }
}
