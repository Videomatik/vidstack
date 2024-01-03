import { ViewController } from 'maverick.js';
import type { MediaContext } from '../../../../core';
import type { SliderDragEndEvent, SliderDragStartEvent, SliderDragValueChangeEvent, SliderEvents, SliderValueChangeEvent } from './api/events';
import type { SliderState } from './api/state';
import type { SliderControllerProps } from './slider-controller';
export interface SliderEventDelegate {
    _swipeGesture?: boolean;
    _isDisabled(): boolean;
    _getStep(): number;
    _getKeyStep(): number;
    _roundValue(value: number): number;
    _onValueChange?(event: SliderValueChangeEvent): unknown;
    _onDragStart?(event: SliderDragStartEvent): unknown;
    _onDragEnd?(event: SliderDragEndEvent): unknown;
    _onDragValueChange?(event: SliderDragValueChangeEvent): unknown;
}
export declare class SliderEventsController extends ViewController<SliderControllerProps, SliderState, SliderEvents> {
    private _delegate;
    private _media;
    constructor(_delegate: SliderEventDelegate, _media: MediaContext);
    protected onConnect(): void;
    private _provider;
    private _touch;
    private _touchStartValue;
    private _onTouchStart;
    private _onTouchMove;
    private _attachEventListeners;
    private _attachPointerListeners;
    private _onFocus;
    private _updateValue;
    private _updatePointerValue;
    private _getPointerValue;
    private _onPointerEnter;
    private _onPointerMove;
    private _onPointerLeave;
    private _onPointerDown;
    private _onStartDragging;
    private _onStopDragging;
    private _lastDownKey;
    private _onKeyDown;
    private _onKeyUp;
    private _getKeyValue;
    private _onDocumentPointerUp;
    private _onDocumentTouchMove;
    private _onDocumentPointerMove;
}
