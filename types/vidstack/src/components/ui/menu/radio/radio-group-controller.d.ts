import { ViewController } from 'maverick.js';
import { type RadioController } from './radio-controller';
export declare class RadioGroupController extends ViewController {
    protected _group: Set<RadioController>;
    protected _value: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").W<string>;
    protected _controller: RadioGroupController | null;
    _onValueChange?: (newValue: string, trigger?: Event) => void;
    get _values(): string[];
    get value(): string;
    set value(value: string);
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onDestroy(): void;
    private _addRadio;
    private _removeRadio;
    private _onChangeBind;
    private _onChange;
    private _findRadio;
}
