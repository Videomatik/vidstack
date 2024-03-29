import { type ReadSignal } from 'maverick.js';
export interface TooltipContext {
    _trigger: ReadSignal<HTMLElement | null>;
    _content: ReadSignal<HTMLElement | null>;
    _attachTrigger(el: HTMLElement): void;
    _detachTrigger(el: HTMLElement): void;
    _attachContent(el: HTMLElement): void;
    _detachContent(el: HTMLElement): void;
}
export declare const tooltipContext: import("maverick.js/dist/types/maverick-O2JmNECw.js").C<TooltipContext>;
