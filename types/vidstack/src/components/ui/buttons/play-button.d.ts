import { Component } from 'maverick.js';
import { type ToggleButtonControllerProps } from './toggle-button-controller';
export interface PlayButtonProps extends ToggleButtonControllerProps {
}
/**
 * A button for toggling the playback state (play/pause) of the current media.
 *
 * @attr data-paused - Whether playback has stopped.
 * @attr data-ended - Whether playback has ended.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/play-button}
 */
export declare class PlayButton extends Component<PlayButtonProps> {
    static props: PlayButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _onPress;
    private _isPressed;
    private _getLabel;
}
