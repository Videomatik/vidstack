import { DOMEvent, EventsTarget } from 'maverick.js/std';
import { ListSymbol } from './symbols';
export interface ListItem {
}
export declare class List<Item extends ListItem, Events extends ListEvents> extends EventsTarget<Events> implements Iterable<Item> {
    [index: number]: Item | undefined;
    protected _items: Item[];
    protected [ListSymbol._readonly]: boolean;
    protected [ListSymbol._onReset]?(trigger?: Event): void;
    protected [ListSymbol._onRemove]?(item: Item, trigger?: Event): void;
    get length(): number;
    get readonly(): boolean;
    /**
     * Transform list to an array.
     */
    toArray(): Item[];
    [Symbol.iterator](): IterableIterator<Item>;
    [ListSymbol._add](item: Item, trigger?: Event): void;
    [ListSymbol._remove](item: Item, trigger?: Event): void;
    [ListSymbol._reset](trigger?: Event): void;
    [ListSymbol._setReadonly](readonly: boolean, trigger?: Event): void;
}
export interface ListEvents<Item extends ListItem = ListItem> {
    add: ListAddEvent<Item>;
    remove: ListRemoveEvent<Item>;
    'readonly-change': ListReadonlyChangeEvent;
}
/**
 * Fired when an item has been added to the list.
 *
 * @detail item
 */
export interface ListAddEvent<Item extends ListItem> extends DOMEvent<Item> {
}
/**
 * Fired when an item has been removed from the list.
 *
 * @detail item
 */
export interface ListRemoveEvent<Item extends ListItem> extends DOMEvent<Item> {
}
/**
 * Fired when the readonly state of the list has changed.
 *
 * @detail isReadonly
 */
export interface ListReadonlyChangeEvent extends DOMEvent<boolean> {
}
