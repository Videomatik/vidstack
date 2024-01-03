import { DOMEvent } from 'maverick.js/std';
import { List, type ListReadonlyChangeEvent } from '../../../foundation/list/list';
import { TextTrackSymbol } from './symbols';
import { TextTrack, type TextTrackInit } from './text-track';
/**
 * @see {@link https://vidstack.io/docs/player/core-concepts/text-tracks}
 */
export declare class TextTrackList extends List<TextTrack, TextTrackListEvents> {
    private _canLoad;
    private _defaults;
    /** @internal */
    [TextTrackSymbol._crossorigin]?: () => string | null;
    get selected(): TextTrack | null;
    add(init: TextTrackInit | TextTrack, trigger?: Event): this;
    remove(track: TextTrack, trigger?: Event): this | undefined;
    clear(trigger?: Event): this;
    getById(id: string): TextTrack | null;
    getByKind(kind: TextTrackKind | TextTrackKind[]): TextTrack[];
    [TextTrackSymbol._canLoad](): void;
    private _onTrackModeChangeBind;
    private _onTrackModeChange;
}
export interface TextTrackListEvents {
    add: TextTrackAddEvent;
    remove: TextTrackRemoveEvent;
    'mode-change': TextTrackListModeChangeEvent;
    'readonly-change': ListReadonlyChangeEvent;
}
export interface TextTrackListEvent<T> extends DOMEvent<T> {
    target: TextTrackList;
}
/**
 * Fired when a text track has been added to the list.
 *
 * @detail newTrack
 */
export interface TextTrackAddEvent extends TextTrackListEvent<TextTrack> {
}
/**
 * Fired when a text track has been removed from the list.
 *
 * @detail removedTrack
 */
export interface TextTrackRemoveEvent extends TextTrackListEvent<TextTrack> {
}
/**
 * Fired when the mode of any text track in the list has changed.
 *
 * @detail track
 */
export interface TextTrackListModeChangeEvent extends TextTrackListEvent<TextTrack> {
}
