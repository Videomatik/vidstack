import { Component } from 'maverick.js';
import { type ToggleButtonControllerProps } from './toggle-button-controller';
export interface MuteButtonProps extends ToggleButtonControllerProps {
}
/**
 * A button for toggling the muted state of the player.
 *
 * @attr data-muted - Whether volume is muted (0).
 * @attr data-state - Current volume setting (low/high/muted).
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/mute-button}
 */
export declare class MuteButton extends Component<MuteButtonProps> {
    static props: MuteButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _onPress;
    private _isPressed;
    private _getLabel;
    private _getState;
}
