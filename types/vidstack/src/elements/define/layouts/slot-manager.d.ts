import { SlotObserver } from './slot-observer';
export declare class SlotManager {
    protected _root: HTMLElement;
    readonly slots: SlotObserver;
    constructor(_root: HTMLElement);
    connect(): void;
    private _onMutation;
    private _update;
}
