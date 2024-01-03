import type { MediaSrc } from '../../core';
import type { MediaProviderLoader } from '../types';
import { VideoProviderLoader } from '../video/loader';
import type { HLSProvider } from './provider';
export declare class HLSProviderLoader extends VideoProviderLoader implements MediaProviderLoader<HLSProvider> {
    static supported: boolean;
    canPlay(src: MediaSrc): boolean;
    load(context: any): Promise<HLSProvider>;
}
