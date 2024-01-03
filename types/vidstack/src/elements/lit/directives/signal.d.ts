import type { TemplateResult } from 'lit-html';
import { AsyncDirective, type PartInfo } from 'lit-html/async-directive.js';
import { type ReadSignal, type StopEffect } from 'maverick.js';
declare class SignalDirective extends AsyncDirective {
    protected _signal: ReadSignal<any> | null;
    protected _stop: StopEffect | null;
    protected _isAttr: boolean;
    constructor(part: PartInfo);
    render(signal: ReadSignal<any>): any;
    reconnected(): void;
    disconnected(): void;
    protected _watch(): void;
    protected _onValueChange(): void;
}
export declare const $signal: (signal: ReadSignal<any>) => import("lit-html/directive.js").DirectiveResult<typeof SignalDirective>;
export declare function $computed(compute: () => TemplateResult | string | null): import("lit-html/directive.js").DirectiveResult<typeof SignalDirective>;
export {};
