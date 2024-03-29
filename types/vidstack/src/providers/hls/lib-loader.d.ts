import type { MediaSetupContext } from '../types';
import type { HLSConstructor, HLSLibrary } from './types';
export declare class HLSLibLoader {
    private _lib;
    private _ctx;
    private _callback;
    constructor(_lib: HLSLibrary, _ctx: MediaSetupContext, _callback: (ctor: HLSConstructor) => void);
    private _startLoading;
    private _onLoadStart;
    private _onLoaded;
    private _onLoadError;
}
