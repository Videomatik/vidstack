import { Component } from 'maverick.js';
import type { SliderCSSVars } from './slider/api/cssvars';
import type { SliderEvents } from './slider/api/events';
import { type SliderState } from './slider/api/state';
import { type SliderControllerProps } from './slider/slider-controller';
export interface VolumeSliderProps extends SliderControllerProps {
}
/**
 * Versatile and user-friendly input volume control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the volume level within the range 0 (muted) to 100.
 *
 * @attr data-dragging - Whether slider thumb is being dragged.
 * @attr data-pointing - Whether user's pointing device is over slider.
 * @attr data-active - Whether slider is being interacted with.
 * @attr data-focus - Whether slider is being keyboard focused.
 * @attr data-hocus - Whether slider is being keyboard focused or hovered over.
 * @attr data-supported - Whether volume control is supported.
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/volume-slider}
 */
export declare class VolumeSlider extends Component<VolumeSliderProps, SliderState, SliderEvents, SliderCSSVars> {
    static props: VolumeSliderProps;
    static state: import("maverick.js/dist/types/maverick-2Ou0vbL_.js").y<SliderState>;
    private _media;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _getARIAValueNow;
    private _getARIAValueText;
    private _watchVolume;
    private _throttleVolumeChange;
    private _onVolumeChange;
    private _onValueChange;
    private _onDragValueChange;
}
