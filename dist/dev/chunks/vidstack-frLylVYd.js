"use client"

import { H as HTMLMediaProvider } from './vidstack-mMhTAVaX.js';
import './vidstack-HvwwRO6V.js';
import 'react';
import './vidstack-6eSzbFhe.js';
import './vidstack-Jl0LSfed.js';

class AudioProvider extends HTMLMediaProvider {
  constructor() {
    super(...arguments);
    this.$$PROVIDER_TYPE = "AUDIO";
  }
  get type() {
    return "audio";
  }
  setup(ctx) {
    super.setup(ctx);
    if (this.type === "audio")
      ctx.delegate._notify("provider-setup", this);
  }
  /**
   * The native HTML `<audio>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement}
   */
  get audio() {
    return this._media;
  }
}

export { AudioProvider };
