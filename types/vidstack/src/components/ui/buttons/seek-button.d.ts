import { Component } from 'maverick.js';
import { type MediaContext } from '../../../core/api/media-context';
export interface SeekButtonProps {
    /**
     * Whether the button should be disabled (non-interactive).
     */
    disabled: boolean;
    /**
     * The amount to seek the media playback forwards (positive number) or backwards (negative number)
     * when the seek button is pressed.
     */
    seconds: number;
}
/**
 * A button for seeking the current media playback forwards or backwards by a specified amount.
 *
 * @attr data-seeking - Whether a seeking operation is in progress.
 * @attr data-supported - Whether seeking operations are permitted.
 * @attr data-focus - Whether button is being keyboard focused.
 * @attr data-hocus - Whether button is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/seek-button}
 */
export declare class SeekButton extends Component<SeekButtonProps> {
    static props: SeekButtonProps;
    protected _media: MediaContext;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected _isSupported(): boolean;
    protected _getLabel(): string;
    protected _onPress(event: Event): void;
}
