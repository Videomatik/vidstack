"use client"

import { p as peek, D as DOMEvent, l as listenEvent, e as effect, f as isString, m as camelToKebabCase, i as isUndefined, n as isFunction } from './vidstack-HvwwRO6V.js';
import { Q as QualitySymbol, b as TextTrack, d as TextTrackSymbol, L as ListSymbol, e as IS_CHROME, c as coerceToError, l as loadScript, p as preconnect, i as isHLSSupported } from './vidstack-6eSzbFhe.js';
import { VideoProvider } from './vidstack-RZgIoVwm.js';
import { R as RAFLoop } from './vidstack-Jl0LSfed.js';
import 'react';
import './vidstack-mMhTAVaX.js';

const toDOMEventType = (type) => camelToKebabCase(type);
class HLSController {
  constructor(_video) {
    this._video = _video;
    this._instance = null;
    this._stopLiveSync = null;
    this._config = {};
    this._callbacks = /* @__PURE__ */ new Set();
    this._retryLoadingTimer = -1;
  }
  get instance() {
    return this._instance;
  }
  setup(ctor, ctx) {
    this._ctx = ctx;
    const isLive = peek(ctx.$state.streamType).includes("live"), isLiveLowLatency = peek(ctx.$state.streamType).includes("ll-");
    this._instance = new ctor({
      lowLatencyMode: isLiveLowLatency,
      backBufferLength: isLiveLowLatency ? 4 : isLive ? 8 : void 0,
      renderTextTracksNatively: false,
      ...this._config
    });
    const dispatcher = this._dispatchHLSEvent.bind(this);
    for (const event of Object.values(ctor.Events))
      this._instance.on(event, dispatcher);
    this._instance.on(ctor.Events.ERROR, this._onError.bind(this));
    for (const callback of this._callbacks)
      callback(this._instance);
    ctx.player.dispatch(new DOMEvent("hls-instance", { detail: this._instance }));
    this._instance.attachMedia(this._video);
    this._instance.on(ctor.Events.FRAG_LOADING, this._onFragLoading.bind(this));
    this._instance.on(ctor.Events.AUDIO_TRACK_SWITCHED, this._onAudioSwitch.bind(this));
    this._instance.on(ctor.Events.LEVEL_SWITCHED, this._onLevelSwitched.bind(this));
    this._instance.on(ctor.Events.LEVEL_LOADED, this._onLevelLoaded.bind(this));
    this._instance.on(ctor.Events.NON_NATIVE_TEXT_TRACKS_FOUND, this._onTracksFound.bind(this));
    this._instance.on(ctor.Events.CUES_PARSED, this._onCuesParsed.bind(this));
    ctx.qualities[QualitySymbol._enableAuto] = this._enableAutoQuality.bind(this);
    listenEvent(ctx.qualities, "change", this._onQualityChange.bind(this));
    listenEvent(ctx.audioTracks, "change", this._onAudioChange.bind(this));
    this._stopLiveSync = effect(this._liveSync.bind(this));
  }
  _liveSync() {
    if (!this._ctx.$state.live())
      return;
    const raf = new RAFLoop(this._liveSyncPosition.bind(this));
    raf._start();
    return raf._stop.bind(raf);
  }
  _liveSyncPosition() {
    this._ctx.$state.liveSyncPosition.set(this._instance?.liveSyncPosition ?? Infinity);
  }
  _dispatchHLSEvent(eventType, detail) {
    this._ctx.player?.dispatch(new DOMEvent(toDOMEventType(eventType), { detail }));
  }
  _onTracksFound(eventType, data) {
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
      track[TextTrackSymbol._readyState] = 2;
      track[TextTrackSymbol._onModeChange] = () => {
        if (track.mode === "showing") {
          this._instance.subtitleTrack = i;
          currentTrack = i;
        } else if (currentTrack === i) {
          this._instance.subtitleTrack = -1;
          currentTrack = -1;
        }
      };
      if (nonNativeTrack.default)
        track.setMode("showing", event);
      this._ctx.textTracks.add(track, event);
    }
  }
  _onCuesParsed(eventType, data) {
    const track = this._ctx.textTracks.getById(`hls-${data.track}`);
    if (!track)
      return;
    const event = new DOMEvent(eventType, { detail: data });
    for (const cue of data.cues) {
      cue.positionAlign = "auto";
      track.addCue(cue, event);
    }
  }
  _onAudioSwitch(eventType, data) {
    const track = this._ctx.audioTracks[data.id];
    if (track) {
      this._ctx.audioTracks[ListSymbol._select](
        track,
        true,
        new DOMEvent(eventType, { detail: data })
      );
    }
  }
  _onLevelSwitched(eventType, data) {
    const quality = this._ctx.qualities[data.level];
    if (quality) {
      this._ctx.qualities[ListSymbol._select](
        quality,
        true,
        new DOMEvent(eventType, { detail: data })
      );
    }
  }
  _onLevelLoaded(eventType, data) {
    if (this._ctx.$state.canPlay())
      return;
    const { type, live, totalduration: duration, targetduration } = data.details;
    const event = new DOMEvent(eventType, { detail: data });
    this._ctx.delegate._notify(
      "stream-type-change",
      live ? type === "EVENT" && Number.isFinite(duration) && targetduration >= 10 ? "live:dvr" : "live" : "on-demand",
      event
    );
    this._ctx.delegate._notify("duration-change", duration, event);
    const media = this._instance.media;
    if (this._instance.currentLevel === -1) {
      this._ctx.qualities[QualitySymbol._setAuto](true, event);
    }
    for (const track of this._instance.audioTracks) {
      this._ctx.audioTracks[ListSymbol._add](
        {
          id: track.id + "",
          label: track.name,
          language: track.lang || "",
          kind: "main"
        },
        event
      );
    }
    for (const level of this._instance.levels) {
      this._ctx.qualities[ListSymbol._add](
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
  _onError(eventType, data) {
    {
      this._ctx.logger?.errorGroup(`HLS error \`${eventType}\``).labelledLog("Media Element", this._instance?.media).labelledLog("HLS Instance", this._instance).labelledLog("Event Type", eventType).labelledLog("Data", data).labelledLog("Src", peek(this._ctx.$state.source)).labelledLog("Media Store", { ...this._ctx.$state }).dispatch();
    }
    if (data.fatal) {
      switch (data.type) {
        case "networkError":
          this._onNetworkError(data.error);
          break;
        case "mediaError":
          this._instance?.recoverMediaError();
          break;
        default:
          this._onFatalError(data.error);
          break;
      }
    }
  }
  _onFragLoading() {
    if (this._retryLoadingTimer >= 0)
      this._clearRetryTimer();
  }
  _onNetworkError(error) {
    this._clearRetryTimer();
    this._instance?.startLoad();
    this._retryLoadingTimer = window.setTimeout(() => {
      this._retryLoadingTimer = -1;
      this._onFatalError(error);
    }, 5e3);
  }
  _clearRetryTimer() {
    clearTimeout(this._retryLoadingTimer);
    this._retryLoadingTimer = -1;
  }
  _onFatalError(error) {
    this._instance?.destroy();
    this._instance = null;
    this._ctx.delegate._notify("error", {
      message: error.message,
      code: 1,
      error
    });
  }
  _enableAutoQuality() {
    if (this._instance)
      this._instance.currentLevel = -1;
  }
  _onQualityChange() {
    const { qualities } = this._ctx;
    if (!this._instance || qualities.auto)
      return;
    this._instance[qualities.switch + "Level"] = qualities.selectedIndex;
    if (IS_CHROME)
      this._video.currentTime = this._video.currentTime;
  }
  _onAudioChange() {
    const { audioTracks } = this._ctx;
    if (this._instance && this._instance.audioTrack !== audioTracks.selectedIndex) {
      this._instance.audioTrack = audioTracks.selectedIndex;
    }
  }
  _loadSource(src) {
    if (!isString(src.src))
      return;
    this._clearRetryTimer();
    this._instance?.loadSource(src.src);
  }
  _destroy() {
    this._clearRetryTimer();
    if (this._ctx)
      this._ctx.qualities[QualitySymbol._enableAuto] = void 0;
    this._instance?.destroy();
    this._instance = null;
    this._stopLiveSync?.();
    this._stopLiveSync = null;
    this._ctx?.logger?.info("\u{1F3D7}\uFE0F Destroyed HLS instance");
  }
}

class HLSLibLoader {
  constructor(_lib, _ctx, _callback) {
    this._lib = _lib;
    this._ctx = _ctx;
    this._callback = _callback;
    this._startLoading();
  }
  async _startLoading() {
    this._ctx.logger?.info("\u{1F3D7}\uFE0F Loading HLS Library");
    const callbacks = {
      onLoadStart: this._onLoadStart.bind(this),
      onLoaded: this._onLoaded.bind(this),
      onLoadError: this._onLoadError.bind(this)
    };
    let ctor = await loadHLSScript(this._lib, callbacks);
    if (isUndefined(ctor) && !isString(this._lib))
      ctor = await importHLS(this._lib, callbacks);
    if (!ctor)
      return null;
    if (!ctor.isSupported()) {
      const message = "[vidstack]: `hls.js` is not supported in this environment";
      this._ctx.logger?.error(message);
      this._ctx.player.dispatch(new DOMEvent("hls-unsupported"));
      this._ctx.delegate._notify("error", { message, code: 4 });
      return null;
    }
    return ctor;
  }
  _onLoadStart() {
    {
      this._ctx.logger?.infoGroup("Starting to load `hls.js`").labelledLog("URL", this._lib).dispatch();
    }
    this._ctx.player.dispatch(new DOMEvent("hls-lib-load-start"));
  }
  _onLoaded(ctor) {
    {
      this._ctx.logger?.infoGroup("Loaded `hls.js`").labelledLog("Library", this._lib).labelledLog("Constructor", ctor).dispatch();
    }
    this._ctx.player.dispatch(
      new DOMEvent("hls-lib-loaded", {
        detail: ctor
      })
    );
    this._callback(ctor);
  }
  _onLoadError(e) {
    const error = coerceToError(e);
    {
      this._ctx.logger?.errorGroup("Failed to load `hls.js`").labelledLog("Library", this._lib).labelledLog("Error", e).dispatch();
    }
    this._ctx.player.dispatch(
      new DOMEvent("hls-lib-load-error", {
        detail: error
      })
    );
    this._ctx.delegate._notify("error", {
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
        true ? "[vidstack] failed importing `hls.js`. Dynamic import returned invalid constructor." : ""
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
        true ? "[vidstack] failed loading `hls.js`. Could not find a valid `Hls` constructor on window" : ""
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
    this._ctor = null;
    this._controller = new HLSController(this.video);
    this._library = `${JS_DELIVR_CDN}/npm/hls.js@^1.0.0/dist/hls${".js" }`;
  }
  /**
   * The `hls.js` constructor.
   */
  get ctor() {
    return this._ctor;
  }
  /**
   * The current `hls.js` instance.
   */
  get instance() {
    return this._controller.instance;
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
    return this._controller._config;
  }
  set config(config) {
    this._controller._config = config;
  }
  /**
   * The `hls.js` constructor (supports dynamic imports) or a URL of where it can be found.
   *
   * @defaultValue `https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js`
   */
  get library() {
    return this._library;
  }
  set library(library) {
    this._library = library;
  }
  preconnect() {
    if (!isString(this._library))
      return;
    preconnect(this._library);
  }
  setup(ctx) {
    super.setup(ctx);
    new HLSLibLoader(this._library, ctx, (ctor) => {
      this._ctor = ctor;
      this._controller.setup(ctor, ctx);
      ctx.delegate._notify("provider-setup", this);
      const src = peek(ctx.$state.source);
      if (src)
        this.loadSource(src);
    });
  }
  async loadSource(src, preload) {
    if (!isString(src.src))
      return;
    this._media.preload = preload || "";
    this._controller._loadSource(src);
    this._currentSrc = src;
  }
  /**
   * The given callback is invoked when a new `hls.js` instance is created and right before it's
   * attached to media.
   */
  onInstance(callback) {
    const instance = this._controller.instance;
    if (instance)
      callback(instance);
    this._controller._callbacks.add(callback);
    return () => this._controller._callbacks.delete(callback);
  }
  destroy() {
    this._controller._destroy();
  }
}
/**
 * Whether `hls.js` is supported in this environment.
 */
HLSProvider.supported = isHLSSupported();

export { HLSProvider };
