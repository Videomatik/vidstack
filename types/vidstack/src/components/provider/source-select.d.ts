import { type ReadSignal, type WriteSignal } from 'maverick.js';
import type { MediaContext, MediaSrc } from '../../core';
import { type MediaProviderLoader } from '../../providers';
export declare class SourceSelection {
    private _domSources;
    private _media;
    private _loader;
    private _initialize;
    private _loaders;
    private get _notify();
    constructor(_domSources: ReadSignal<MediaSrc[]>, _media: MediaContext, _loader: WriteSignal<MediaProviderLoader | null>, customLoaders?: MediaProviderLoader[]);
    connect(): void;
    private _onSourcesChange;
    private _onSourceChange;
    protected _findNewSource(currentSource: MediaSrc, sources: MediaSrc[]): MediaSrc<unknown>;
    protected _notifySourceChange(src: MediaSrc, loader: MediaProviderLoader | null): void;
    protected _notifyLoaderChange(loader: MediaProviderLoader | null): void;
    private _onSetup;
    private _onLoadSource;
}
export declare function isSameSrc(a: MediaSrc | undefined | null, b: MediaSrc | undefined | null): boolean;
