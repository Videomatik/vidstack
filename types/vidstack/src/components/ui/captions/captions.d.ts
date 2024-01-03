import { Component } from 'maverick.js';
export interface CaptionsProps {
    textDir: 'ltr' | 'rtl';
}
/**
 * Renders and displays captions/subtitles. This will be an overlay for video and a simple
 * captions box for audio.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/captions}
 */
export declare class Captions extends Component<CaptionsProps> {
    static props: CaptionsProps;
    private _media;
    private _renderer;
    private _textRenderer;
    private _lib;
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    protected onDestroy(): void;
    private _isHidden;
    private _watchViewType;
    private _setupAudioView;
    private _onTrackChange;
    private _onCueChange;
    private _onUpdateTimedNodes;
    private _setupVideoView;
    private _watchTextDirection;
    private _watchMediaTime;
}
