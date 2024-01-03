import { DOMEvent } from 'maverick.js/std';
import { List, type ListEvents, type ListItem } from './list';
import { ListSymbol } from './symbols';
export interface SelectListItem extends ListItem {
    selected: boolean;
}
export declare class SelectList<Item extends SelectListItem, Events extends SelectListEvents<Item>> extends List<Item, Events> {
    get selected(): Item | null;
    get selectedIndex(): number;
    protected [ListSymbol._onRemove](item: Item, trigger?: Event): void;
    protected [ListSymbol._onUserSelect]?(): void;
    [ListSymbol._add](item: Omit<Item, 'selected'>, trigger?: Event): void;
    [ListSymbol._select](item: Item | undefined, selected: boolean, trigger?: Event): void;
}
export interface SelectListEvents<Item extends SelectListItem = SelectListItem> extends ListEvents<Item> {
    change: SelectListChangeEvent<Item>;
}
/**
 * @detail change
 */
export interface SelectListChangeEvent<Item extends SelectListItem> extends DOMEvent<SelectListChangeEventDetail<Item>> {
}
export interface SelectListChangeEventDetail<Item extends SelectListItem> {
    prev: Item | null;
    current: Item | null;
}
