"use client"

import { j as deferredPromise, s as signal, e as effect, l as listenEvent, p as peek, f as isString } from './vidstack-8AXyyPGc.js';
import { a as appendParamsToURL, I as IS_SERVER } from './vidstack-UzM8r9FW.js';

function timedPromise(callback, ms = 3e3) {
  const promise = deferredPromise();
  setTimeout(() => {
    const rejection = callback();
    if (rejection)
      promise.reject(rejection);
  }, ms);
  return promise;
}

class EmbedProvider {
  constructor(_iframe) {
    this.eb = _iframe;
    this.db = signal("");
    /**
     * Defines which referrer is sent when fetching the resource.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/referrerPolicy}
     */
    this.referrerPolicy = null;
    _iframe.setAttribute("frameBorder", "0");
    _iframe.setAttribute(
      "allow",
      "autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope"
    );
    if (this.referrerPolicy !== null) {
      _iframe.setAttribute("referrerpolicy", this.referrerPolicy);
    }
  }
  get iframe() {
    return this.eb;
  }
  setup(ctx) {
    effect(this.gd.bind(this));
    listenEvent(window, "message", this.Mg.bind(this));
    listenEvent(this.eb, "load", this.mc.bind(this));
  }
  gd() {
    const src = this.db();
    if (!src.length) {
      this.eb.setAttribute("src", "");
      return;
    }
    const params = peek(() => this.Ue());
    this.eb.setAttribute("src", appendParamsToURL(src, params));
  }
  hd(message, target) {
    if (IS_SERVER)
      return;
    this.eb.contentWindow?.postMessage(JSON.stringify(message), target ?? "*");
  }
  Mg(event) {
    const origin = this.fb(), isOriginMatch = event.source === this.eb?.contentWindow && (!isString(origin) || origin === event.origin);
    if (!isOriginMatch)
      return;
    try {
      const message = JSON.parse(event.data);
      if (message)
        this.jd(message, event);
      return;
    } catch (e) {
    }
    if (event.data)
      this.jd(event.data, event);
  }
}

export { EmbedProvider as E, timedPromise as t };
