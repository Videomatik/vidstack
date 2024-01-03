import { type ReadSignal } from 'maverick.js';
import { EventsTarget } from 'maverick.js/std';
import { type MediaStore } from './api/player-state';
export declare class PlayerQueryList extends EventsTarget<PlayerQueryListEvents> {
    static create: (query: string | ReadSignal<string>) => PlayerQueryList;
    private _query;
    private _mediaStore;
    private _evaluation;
    private _mediaProps;
    private _mediaMatches;
    private _dispose;
    get query(): string;
    readonly $matches: ReadSignal<boolean>;
    get matches(): boolean;
    constructor(store: MediaStore, query: string | ReadSignal<string>);
    private _watchQuery;
    private _watchMatches;
    private _buildQueryEval;
    destroy(): void;
}
export interface PlayerQueryListEvents {
    change: PlayerQueryListChangeEvent;
}
export interface PlayerQueryListChangeEvent extends Omit<Event, 'target'> {
    target: PlayerQueryList;
}
