import { type ReadSignal } from 'maverick.js';
export interface RadioController {
    _value: ReadSignal<string>;
    _check(checked: boolean, trigger?: Event): any;
    _onCheck: RadioChangeCallback | null;
}
export interface RadioChangeCallback {
    (value: string, trigger?: Event): void;
}
export interface RadioGroupContext {
    add(radio: RadioController): void;
    remove(radio: RadioController): void;
}
export declare const radioControllerContext: import("maverick.js/dist/types/maverick-O2JmNECw.js").C<RadioGroupContext>;
