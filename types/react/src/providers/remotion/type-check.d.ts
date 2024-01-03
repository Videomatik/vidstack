import type { MediaSrc } from 'vidstack';
import type { RemotionProvider } from './provider';
import type { RemotionMediaResource } from './types';
/** @see {@link https://www.vidstack.io/docs/player/providers/remotion} */
export declare function isRemotionProvider(provider: any): provider is RemotionProvider;
export declare function isRemotionSource(src?: MediaSrc | null): src is RemotionMediaResource;
