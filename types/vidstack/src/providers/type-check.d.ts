import type { AudioProvider } from './audio/provider';
import type { HLSProvider } from './hls/provider';
import type { VideoProvider } from './video/provider';
import type { VimeoProvider } from './vimeo/provider';
import type { YouTubeProvider } from './youtube/provider';
/** @see {@link https://www.vidstack.io/docs/player/providers/audio} */
export declare function isAudioProvider(provider: any): provider is AudioProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/video} */
export declare function isVideoProvider(provider: any): provider is VideoProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/hls} */
export declare function isHLSProvider(provider: any): provider is HLSProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/youtube} */
export declare function isYouTubeProvider(provider: any): provider is YouTubeProvider;
/** @see {@link https://www.vidstack.io/docs/player/providers/vimeo} */
export declare function isVimeoProvider(provider: any): provider is VimeoProvider;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement} */
export declare function isHTMLAudioElement(element: unknown): element is HTMLAudioElement;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement} */
export declare function isHTMLVideoElement(element: unknown): element is HTMLVideoElement;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement} */
export declare function isHTMLMediaElement(element: unknown): element is HTMLMediaElement;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement} */
export declare function isHTMLIFrameElement(element: unknown): element is HTMLIFrameElement;
