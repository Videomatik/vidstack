import { type TemplateResult } from 'lit-html';
export declare class SlotObserver {
    protected _root: HTMLElement;
    protected _callback: SlotObserverCallback;
    readonly elements: Set<HTMLSlotElement>;
    constructor(_root: HTMLElement, _callback: SlotObserverCallback);
    connect(): void;
    disconnect(): void;
    assign(template: Element | TemplateResult, slot: HTMLSlotElement): void;
    private _onMutation;
    private _update;
}
export interface SlotObserverCallback {
    (slots: Set<HTMLSlotElement>): void;
}
