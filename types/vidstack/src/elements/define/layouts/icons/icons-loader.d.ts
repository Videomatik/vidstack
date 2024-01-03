import { type TemplateResult } from 'lit-html';
import { SlotObserver } from '../slot-observer';
export type IconsRecord = Record<string, Element | TemplateResult>;
export declare abstract class IconsLoader {
    protected _root: HTMLElement;
    protected _icons: IconsRecord;
    protected _loaded: boolean;
    readonly slots: SlotObserver;
    constructor(_root: HTMLElement);
    connect(): void;
    load(): void;
    disconnect(): void;
    abstract _load(): Promise<IconsRecord>;
    private _iterate;
    protected _insertIcons(): void;
}
