import { Component } from 'maverick.js';
import { type ToggleButtonControllerProps } from './toggle-button-controller';
export interface CaptionButtonProps extends ToggleButtonControllerProps {
}
/**
 * A button for toggling the showing state of the captions.
 *
 * @attr data-supported - Whether captions/subtitles are available.
 * @attr data-active - Whether closed captions or subtitles are on.
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/caption-button}
 */
export declare class CaptionButton extends Component<CaptionButtonProps> {
    static props: CaptionButtonProps;
    private _media;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    private _onPress;
    private _isPressed;
    private _isHidden;
    private _getLabel;
}
