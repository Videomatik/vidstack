import { Component } from 'maverick.js';
import { type ToggleButtonControllerProps } from './toggle-button-controller';
export interface PIPButtonProps extends ToggleButtonControllerProps {
}
/**
 * A button for toggling the picture-in-picture (PIP) mode of the player.
 *
 * @attr data-active - Whether picture-in-picture mode is active.
 * @attr data-supported - Whether picture-in-picture mode is available.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/pip-button}
 * @see {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture}
 */
export declare class PIPButton extends Component<PIPButtonProps> {
    static props: PIPButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _onPress;
    private _isPressed;
    private _isSupported;
    private _getLabel;
}
