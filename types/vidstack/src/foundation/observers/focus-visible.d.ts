import { ViewController } from 'maverick.js';
export declare class FocusVisibleController extends ViewController {
    private _focused;
    protected onConnect(el: HTMLElement): void;
    focused(): boolean;
    private _onFocus;
    private _onBlur;
    private _onPointerEnter;
    private _onPointerLeave;
}
