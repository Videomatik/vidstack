import type { InferComponentEvents } from 'maverick.js';
import type { ReactEventCallbacks } from 'maverick.js/react';
import type { MediaPlayerInstance } from './primitives/instances';
type PlayerCallbacks = keyof ReactEventCallbacks<InferComponentEvents<MediaPlayerInstance>>;
export declare const playerCallbacks: PlayerCallbacks[];
export {};
