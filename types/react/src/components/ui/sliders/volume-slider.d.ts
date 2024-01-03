import * as React from 'react';
import { type ReactElementProps } from 'maverick.js/react';
import { VolumeSliderInstance } from '../../primitives/instances';
import { type ValueProps } from './slider';
export interface RootProps extends ReactElementProps<VolumeSliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<VolumeSliderInstance>;
}
/**
 * Versatile and user-friendly input volume control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the volume level within the range 0 (muted) to 100.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/volume-slider}
 * @example
 * ```tsx
 * <VolumeSlider.Root>
 *   <VolumeSlider.Track>
 *     <VolumeSlider.TrackFill />
 *   </VolumeSlider.Track>
 *   <VolumeSlider.Thumb />
 * </VolumeSlider.Root>
 * ```
 */
declare const Root: React.ForwardRefExoticComponent<Omit<RootProps, "ref"> & React.RefAttributes<VolumeSliderInstance>>;
/**
 * Displays the specific numeric representation of the current or pointer value of the volume
 * slider. When a user interacts with a slider by moving its thumb along the track, the slider value
 * and volume updates accordingly.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/volume-slider#preview}
 * @example
 * ```tsx
 * <VolumeSlider.Root>
 *   <VolumeSlider.Preview>
 *     <VolumeSlider.Value />
 *   </VolumeSlider.Preview>
 * </VolumeSlider.Root>
 * ```
 */
declare const Value: React.ForwardRefExoticComponent<Omit<ValueProps, "ref"> & React.RefAttributes<HTMLElement>>;
export * from './slider';
export { Root, Value };
