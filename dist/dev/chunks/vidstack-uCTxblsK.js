"use client"

import { j as deferredPromise, s as signal, e as effect, l as listenEvent, p as peek, f as isString } from './vidstack-HvwwRO6V.js';
import { a as appendParamsToURL, I as IS_SERVER } from './vidstack-SP75z4Xt.js';

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
    this._iframe = _iframe;
    this._src = signal("");
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
    return this._iframe;
  }
  setup(ctx) {
    effect(this._watchSrc.bind(this));
    listenEvent(window, "message", this._onWindowMessage.bind(this));
    listenEvent(this._iframe, "load", this._onLoad.bind(this));
  }
  _watchSrc() {
    const src = this._src();
    if (!src.length) {
      this._iframe.setAttribute("src", "");
      return;
    }
    const params = peek(() => this._buildParams());
    this._iframe.setAttribute("src", appendParamsToURL(src, params));
  }
  _postMessage(message, target) {
    if (IS_SERVER)
      return;
    this._iframe.contentWindow?.postMessage(JSON.stringify(message), target ?? "*");
  }
  _onWindowMessage(event) {
    const origin = this._getOrigin(), isOriginMatch = event.source === this._iframe?.contentWindow && (!isString(origin) || origin === event.origin);
    if (!isOriginMatch)
      return;
    try {
      const message = JSON.parse(event.data);
      if (message)
        this._onMessage(message, event);
      return;
    } catch (e) {
    }
    if (event.data)
      this._onMessage(event.data, event);
  }
}

export { EmbedProvider as E, timedPromise as t };
