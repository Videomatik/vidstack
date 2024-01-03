import type { MediaSetupContext } from '../types';
import type { HTMLMediaProvider } from './provider';
export declare class NativeAudioTracks {
    private _provider;
    private _ctx;
    private get _nativeTracks();
    constructor(_provider: HTMLMediaProvider, _ctx: MediaSetupContext);
    private _onAddNativeTrack;
    private _onRemoveNativeTrack;
    private _onChangeNativeTrack;
    private _getEnabledNativeTrack;
    private _onChangeTrack;
}
