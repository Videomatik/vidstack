"use client"

import { p as peek, D as DOMEvent, l as listenEvent, e as effect, f as isString, m as camelToKebabCase, i as isUndefined, n as isFunction } from './vidstack-8AXyyPGc.js';
import { Q as QualitySymbol, b as TextTrack, d as TextTrackSymbol, L as ListSymbol, e as IS_CHROME, c as coerceToError, l as loadScript, p as preconnect, i as isHLSSupported } from './vidstack-UzM8r9FW.js';
import { VideoProvider } from './vidstack-fUbSlpyy.js';
import { R as RAFLoop } from './vidstack-Bio1UGiO.js';
import 'react';
import './vidstack-m6lyHi2M.js';

const toDOMEventType = (type) => camelToKebabCase(type);
class HLSController {
  constructor(_video) {
    this.m = _video;
    this.g = null;
    this.od = null;
    this.pd = {};
    this.qd = /* @__PURE__ */ new Set();
    this.Lk = -1;
  }
  get instance() {
    return this.g;
  }
  setup(ctor, ctx) {
    this.b = ctx;
    const isLive = peek(ctx.$state.streamType).includes("live"), isLiveLowLatency = peek(ctx.$state.streamType).includes("ll-");
    this.g = new ctor({
      lowLatencyMode: isLiveLowLatency,
      backBufferLength: isLiveLowLatency ? 4 : isLive ? 8 : void 0,
      renderTextTracksNatively: false,
      ...this.pd
    });
    const dispatcher = this.Tg.bind(this);
    for (const event of Object.values(ctor.Events))
      this.g.on(event, dispatcher);
    this.g.on(ctor.Events.ERROR, this.V.bind(this));
    for (const callback of this.qd)
      callback(this.g);
    ctx.player.dispatch(new DOMEvent("hls-instance", { detail: this.g }));
    this.g.attachMedia(this.m);
    this.g.on(ctor.Events.FRAG_LOADING, this.Pk.bind(this));
    this.g.on(ctor.Events.AUDIO_TRACK_SWITCHED, this.Ug.bind(this));
    this.g.on(ctor.Events.LEVEL_SWITCHED, this.Vg.bind(this));
    this.g.on(ctor.Events.LEVEL_LOADED, this.Wg.bind(this));
    this.g.on(ctor.Events.NON_NATIVE_TEXT_TRACKS_FOUND, this.Xg.bind(this));
    this.g.on(ctor.Events.CUES_PARSED, this.Yg.bind(this));
    ctx.qualities[QualitySymbol._a] = this.Zg.bind(this);
    listenEvent(ctx.qualities, "change", this.gb.bind(this));
    listenEvent(ctx.audioTracks, "change", this._g.bind(this));
    this.od = effect(this.$g.bind(this));
  }
  $g() {
    if (!this.b.$state.live())
      return;
    const raf = new RAFLoop(this.ah.bind(this));
    raf.Cb();
    return raf.sa.bind(raf);
  }
  ah() {
    this.b.$state.liveSyncPosition.set(this.g?.liveSyncPosition ?? Infinity);
  }
  Tg(eventType, detail) {
    this.b.player?.dispatch(new DOMEvent(toDOMEventType(eventType), { detail }));
  }
  Xg(eventType, data) {
    const event = new DOMEvent(eventType, { detail: data });
    let currentTrack = -1;
    for (let i = 0; i < data.tracks.length; i++) {
      const nonNativeTrack = data.tracks[i], init = nonNativeTrack.subtitleTrack ?? nonNativeTrack.closedCaptions, track = new TextTrack({
        id: `hls-${nonNativeTrack.kind}${i}`,
        src: init?.url,
        label: nonNativeTrack.label,
        language: init?.lang,
        kind: nonNativeTrack.kind
      });
      track[TextTrackSymbol.N] = 2;
      track[TextTrackSymbol.Va] = () => {
        if (track.mode === "showing") {
          this.g.subtitleTrack = i;
          currentTrack = i;
        } else if (currentTrack === i) {
          this.g.subtitleTrack = -1;
          currentTrack = -1;
        }
      };
      if (nonNativeTrack.default)
        track.setMode("showing", event);
      this.b.textTracks.add(track, event);
    }
  }
  Yg(eventType, data) {
    const track = this.b.textTracks.getById(`hls-${data.track}`);
    if (!track)
      return;
    const event = new DOMEvent(eventType, { detail: data });
    for (const cue of data.cues) {
      cue.positionAlign = "auto";
      track.addCue(cue, event);
    }
  }
  Ug(eventType, data) {
    const track = this.b.audioTracks[data.id];
    if (track) {
      this.b.audioTracks[ListSymbol.qa](
        track,
        true,
        new DOMEvent(eventType, { detail: data })
      );
    }
  }
  Vg(eventType, data) {
    const quality = this.b.qualities[data.level];
    if (quality) {
      this.b.qualities[ListSymbol.qa](
        quality,
        true,
        new DOMEvent(eventType, { detail: data })
      );
    }
  }
  Wg(eventType, data) {
    if (this.b.$state.canPlay())
      return;
    const { type, live, totalduration: duration, targetduration } = data.details;
    const event = new DOMEvent(eventType, { detail: data });
    this.b.delegate.c(
      "stream-type-change",
      live ? type === "EVENT" && Number.isFinite(duration) && targetduration >= 10 ? "live:dvr" : "live" : "on-demand",
      event
    );
    this.b.delegate.c("duration-change", duration, event);
    const media = this.g.media;
    if (this.g.currentLevel === -1) {
      this.b.qualities[QualitySymbol.Za](true, event);
    }
    for (const track of this.g.audioTracks) {
      this.b.audioTracks[ListSymbol.pa](
        {
          id: track.id + "",
          label: track.name,
          language: track.lang || "",
          kind: "main"
        },
        event
      );
    }
    for (const level of this.g.levels) {
      this.b.qualities[ListSymbol.pa](
        {
          id: (level.id ?? level.height + "p") + "",
          width: level.width,
          height: level.height,
          codec: level.codecSet,
          bitrate: level.bitrate
        },
        event
      );
    }
    media.dispatchEvent(new DOMEvent("canplay", { trigger: event }));
  }
  V(eventType, data) {
    if (data.fatal) {
      switch (data.type) {
        case "networkError":
          this.Qk(data.error);
          break;
        case "mediaError":
          this.g?.recoverMediaError();
          break;
        default:
          this.Ok(data.error);
          break;
      }
    }
  }
  Pk() {
    if (this.Lk >= 0)
      this.Mk();
  }
  Qk(error) {
    this.Mk();
    this.g?.startLoad();
    this.Lk = window.setTimeout(() => {
      this.Lk = -1;
      this.Ok(error);
    }, 5e3);
  }
  Mk() {
    clearTimeout(this.Lk);
    this.Lk = -1;
  }
  Ok(error) {
    this.g?.destroy();
    this.g = null;
    this.b.delegate.c("error", {
      message: error.message,
      code: 1,
      error
    });
  }
  Zg() {
    if (this.g)
      this.g.currentLevel = -1;
  }
  gb() {
    const { qualities } = this.b;
    if (!this.g || qualities.auto)
      return;
    this.g[qualities.switch + "Level"] = qualities.selectedIndex;
    if (IS_CHROME)
      this.m.currentTime = this.m.currentTime;
  }
  _g() {
    const { audioTracks } = this.b;
    if (this.g && this.g.audioTrack !== audioTracks.selectedIndex) {
      this.g.audioTrack = audioTracks.selectedIndex;
    }
  }
  Rk(src) {
    if (!isString(src.src))
      return;
    this.Mk();
    this.g?.loadSource(src.src);
  }
  bh() {
    this.Mk();
    if (this.b)
      this.b.qualities[QualitySymbol._a] = void 0;
    this.g?.destroy();
    this.g = null;
    this.od?.();
    this.od = null;
  }
}

class HLSLibLoader {
  constructor(_lib, _ctx, _callback) {
    this.X = _lib;
    this.b = _ctx;
    this.Da = _callback;
    this.ch();
  }
  async ch() {
    const callbacks = {
      onLoadStart: this.Fa.bind(this),
      onLoaded: this.rd.bind(this),
      onLoadError: this.dh.bind(this)
    };
    let ctor = await loadHLSScript(this.X, callbacks);
    if (isUndefined(ctor) && !isString(this.X))
      ctor = await importHLS(this.X, callbacks);
    if (!ctor)
      return null;
    if (!ctor.isSupported()) {
      const message = "[vidstack]: `hls.js` is not supported in this environment";
      this.b.player.dispatch(new DOMEvent("hls-unsupported"));
      this.b.delegate.c("error", { message, code: 4 });
      return null;
    }
    return ctor;
  }
  Fa() {
    this.b.player.dispatch(new DOMEvent("hls-lib-load-start"));
  }
  rd(ctor) {
    this.b.player.dispatch(
      new DOMEvent("hls-lib-loaded", {
        detail: ctor
      })
    );
    this.Da(ctor);
  }
  dh(e) {
    const error = coerceToError(e);
    this.b.player.dispatch(
      new DOMEvent("hls-lib-load-error", {
        detail: error
      })
    );
    this.b.delegate.c("error", {
      message: error.message,
      code: 4,
      error
    });
  }
}
async function importHLS(loader, callbacks = {}) {
  if (isUndefined(loader))
    return void 0;
  callbacks.onLoadStart?.();
  if (loader.prototype && loader.prototype !== Function) {
    callbacks.onLoaded?.(loader);
    return loader;
  }
  try {
    const ctor = (await loader())?.default;
    if (ctor && !!ctor.isSupported) {
      callbacks.onLoaded?.(ctor);
    } else {
      throw Error(
        false ? "[vidstack] failed importing `hls.js`. Dynamic import returned invalid constructor." : ""
      );
    }
    return ctor;
  } catch (err) {
    callbacks.onLoadError?.(err);
  }
  return void 0;
}
async function loadHLSScript(src, callbacks = {}) {
  if (!isString(src))
    return void 0;
  callbacks.onLoadStart?.();
  try {
    await loadScript(src);
    if (!isFunction(window.Hls)) {
      throw Error(
        false ? "[vidstack] failed loading `hls.js`. Could not find a valid `Hls` constructor on window" : ""
      );
    }
    const ctor = window.Hls;
    callbacks.onLoaded?.(ctor);
    return ctor;
  } catch (err) {
    callbacks.onLoadError?.(err);
  }
  return void 0;
}

const JS_DELIVR_CDN = "https://cdn.jsdelivr.net";
class HLSProvider extends VideoProvider {
  constructor() {
    super(...arguments);
    this.$$PROVIDER_TYPE = "HLS";
    this.Ye = null;
    this.d = new HLSController(this.video);
    this.Hb = `${JS_DELIVR_CDN}/npm/hls.js@^1.0.0/dist/hls${".min.js"}`;
  }
  /**
   * The `hls.js` constructor.
   */
  get ctor() {
    return this.Ye;
  }
  /**
   * The current `hls.js` instance.
   */
  get instance() {
    return this.d.instance;
  }
  get type() {
    return "hls";
  }
  get canLiveSync() {
    return true;
  }
  /**
   * The `hls.js` configuration object.
   *
   * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning}
   */
  get config() {
    return this.d.pd;
  }
  set config(config) {
    this.d.pd = config;
  }
  /**
   * The `hls.js` constructor (supports dynamic imports) or a URL of where it can be found.
   *
   * @defaultValue `https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js`
   */
  get library() {
    return this.Hb;
  }
  set library(library) {
    this.Hb = library;
  }
  preconnect() {
    if (!isString(this.Hb))
      return;
    preconnect(this.Hb);
  }
  setup(ctx) {
    super.setup(ctx);
    new HLSLibLoader(this.Hb, ctx, (ctor) => {
      this.Ye = ctor;
      this.d.setup(ctor, ctx);
      ctx.delegate.c("provider-setup", this);
      const src = peek(ctx.$state.source);
      if (src)
        this.loadSource(src);
    });
  }
  async loadSource(src, preload) {
    if (!isString(src.src))
      return;
    this.a.preload = preload || "";
    this.d.Rk(src);
    this.W = src;
  }
  /**
   * The given callback is invoked when a new `hls.js` instance is created and right before it's
   * attached to media.
   */
  onInstance(callback) {
    const instance = this.d.instance;
    if (instance)
      callback(instance);
    this.d.qd.add(callback);
    return () => this.d.qd.delete(callback);
  }
  destroy() {
    this.d.bh();
  }
}
/**
 * Whether `hls.js` is supported in this environment.
 */
HLSProvider.supported = isHLSSupported();

export { HLSProvider };
