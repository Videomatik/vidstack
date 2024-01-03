import { type ReadSignal, type WriteSignal } from 'maverick.js';
import type { SliderOrientation } from './types';
export interface SliderContext {
    _disabled: ReadSignal<boolean>;
    _orientation: ReadSignal<SliderOrientation>;
    _preview: WriteSignal<HTMLElement | null>;
}
export declare const sliderContext: import("maverick.js/dist/types/maverick-O2JmNECw.js").C<SliderContext>;
