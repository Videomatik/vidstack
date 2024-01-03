"use client"

import { H as HTMLMediaProvider } from './vidstack-4Qbe6uzp.js';
import './vidstack-8AXyyPGc.js';
import 'react';
import './vidstack-rVU9ynQ5.js';
import './vidstack-Bio1UGiO.js';

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
      ctx.delegate.c("provider-setup", this);
  }
  /**
   * The native HTML `<audio>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement}
   */
  get audio() {
    return this.a;
  }
}

export { AudioProvider };
