import { Component, type ReadSignal } from 'maverick.js';
import type { DOMEvent } from 'maverick.js/std';
import type { VideoQuality } from '../../../../core/quality/video-quality';
import type { RadioOption } from '../radio/radio';
/**
 * This component manages video quality radios.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/quality-menu}
 */
export declare class QualityRadioGroup extends Component<QualityRadioGroupProps, {}, QualityRadioGroupEvents> {
    static props: QualityRadioGroupProps;
    private _media;
    private _menu?;
    private _controller;
    get value(): string;
    get disabled(): boolean;
    private _sortedQualities;
    constructor();
    protected onSetup(): void;
    protected onConnect(el: HTMLElement): void;
    getOptions(): QualityRadioOption[];
    private _watchValue;
    private _watchHintText;
    private _watchControllerDisabled;
    private _onValueChange;
    private _getValue;
    private _getQualityId;
}
export interface QualityRadioGroupProps {
    /** The text to display for the auto quality radio option. */
    autoLabel: string;
    /** Whether the bitrate should _not_ be displayed next to each quality radio option. */
    hideBitrate: boolean;
}
export interface QualityRadioOption extends RadioOption {
    quality?: VideoQuality;
    bitrate?: ReadSignal<string | null>;
}
export interface QualityRadioGroupEvents {
    change: QualityRadioGroupChangeEvent;
}
/**
 * Fired when the checked radio changes.
 *
 * @detail quality
 */
export interface QualityRadioGroupChangeEvent extends DOMEvent<'auto' | VideoQuality> {
    target: QualityRadioGroup;
}
