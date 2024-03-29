"use client"

import { i as isUndefined, c as isNumber } from './vidstack-8AXyyPGc.js';

class RAFLoop {
  constructor(_callback) {
    this.Da = _callback;
  }
  Cb() {
    if (!isUndefined(this.da))
      return;
    this.Pe();
  }
  sa() {
    if (isNumber(this.da))
      window.cancelAnimationFrame(this.da);
    this.da = void 0;
  }
  Pe() {
    this.da = window.requestAnimationFrame(() => {
      if (isUndefined(this.da))
        return;
      this.Da();
      this.Pe();
    });
  }
}

export { RAFLoop as R };
