import { ViewController } from 'maverick.js';
import type { SliderEvents } from './api/events';
import type { SliderState } from './api/state';
import { type SliderEventDelegate } from './events-controller';
import type { SliderOrientation } from './types';
export interface SliderDelegate extends Omit<SliderEventDelegate, '_getOrientation'> {
    _getARIAValueNow(): number;
    _getARIAValueText(): string;
}
export declare class SliderController extends ViewController<SliderControllerProps, SliderState, SliderEvents> {
    private _delegate;
    static props: SliderControllerProps;
    private _media;
    constructor(_delegate: SliderDelegate);
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _watchValue;
    private _watchDisabled;
    private _getARIADisabled;
    private _setupAttrs;
    private _watchCSSVars;
    private _updateSliderVars;
}
export interface SliderControllerProps {
    /**
     * Whether the slider should be disabled (non-interactive).
     */
    disabled: boolean;
    /**
     * The orientation of the slider.
     */
    orientation: SliderOrientation;
    /**
     * A number that specifies the granularity that the slider value must adhere to.
     *
     * A step is an abstract unit that may carry a different type of measure depending on the type of
     * slider. For example, for the volume slider each step is 1% of volume, and for the time slider
     * it is 1 second which is a varying percentage depending on the media duration.
     */
    step: number;
    /**
     * ♿ **ARIA:** A number that specifies the number of steps taken when interacting with
     * the slider via keyboard.
     *
     * A step is an abstract unit that may carry different type of measure depending on the type of
     * slider. For example, for the volume slider each step is 1% of volume, and for the time slider
     * it is 1 second which is a varying percentage depending on the media duration.
     */
    keyStep: number;
    /**
     * ♿ **ARIA:** A number that will be used to multiply the `keyStep` when the `Shift` key
     * is held down and the slider value is changed by pressing `LeftArrow` or `RightArrow`. Think
     * of it as `keyStep * shiftKeyMultiplier`.
     */
    shiftKeyMultiplier: number;
}
