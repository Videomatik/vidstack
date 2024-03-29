"use client"

import { o as useDisposalBin, e as effect, q as onDispose, l as listenEvent, p as peek, r as isNil, D as DOMEvent, d as createScope, t as setAttribute, f as isString } from './vidstack-HvwwRO6V.js';
import { f as IS_SAFARI, g as isHLSSrc, h as getNumberOfDecimalPlaces, L as ListSymbol, j as isMediaStream } from './vidstack-6eSzbFhe.js';
import { R as RAFLoop } from './vidstack-Jl0LSfed.js';

class HTMLMediaEvents {
  constructor(_provider, _ctx) {
    this._provider = _provider;
    this._ctx = _ctx;
    this._disposal = useDisposalBin();
    this._waiting = false;
    this._attachedLoadStart = false;
    this._attachedCanPlay = false;
    this._timeRAF = new RAFLoop(this._onAnimationFrame.bind(this));
    this._handlers = /* @__PURE__ */ new Map() ;
    this._handleDevEvent = this._onDevEvent.bind(this) ;
    this._attachInitialListeners();
    effect(this._attachTimeUpdate.bind(this));
    onDispose(this._onDispose.bind(this));
  }
  get _media() {
    return this._provider.media;
  }
  get _notify() {
    return this._ctx.delegate._notify;
  }
  _onDispose() {
    this._attachedLoadStart = false;
    this._attachedCanPlay = false;
    this._timeRAF._stop();
    this._disposal.empty();
  }
  /**
   * The `timeupdate` event fires surprisingly infrequently during playback, meaning your progress
   * bar (or whatever else is synced to the currentTime) moves in a choppy fashion. This helps
   * resolve that by retrieving time updates in a request animation frame loop.
   */
  _onAnimationFrame() {
    const newTime = this._media.currentTime;
    if (this._ctx.$state.currentTime() !== newTime)
      this._updateCurrentTime(newTime);
  }
  _attachInitialListeners() {
    {
      this._ctx.logger?.info("attaching initial listeners");
    }
    this._attachEventListener("loadstart", this._onLoadStart);
    this._attachEventListener("abort", this._onAbort);
    this._attachEventListener("emptied", this._onEmptied);
    this._attachEventListener("error", this._onError);
    this._attachEventListener("volumechange", this._onVolumeChange);
    this._ctx.logger?.debug("attached initial media event listeners");
  }
  _attachLoadStartListeners() {
    if (this._attachedLoadStart)
      return;
    {
      this._ctx.logger?.info("attaching load start listeners");
    }
    this._disposal.add(
      this._attachEventListener("loadeddata", this._onLoadedData),
      this._attachEventListener("loadedmetadata", this._onLoadedMetadata),
      this._attachEventListener("canplay", this._onCanPlay),
      this._attachEventListener("canplaythrough", this._onCanPlayThrough),
      this._attachEventListener("durationchange", this._onDurationChange),
      this._attachEventListener("play", this._onPlay),
      this._attachEventListener("progress", this._onProgress),
      this._attachEventListener("stalled", this._onStalled),
      this._attachEventListener("suspend", this._onSuspend)
    );
    this._attachedLoadStart = true;
  }
  _attachCanPlayListeners() {
    if (this._attachedCanPlay)
      return;
    {
      this._ctx.logger?.info("attaching can play listeners");
    }
    this._disposal.add(
      this._attachEventListener("pause", this._onPause),
      this._attachEventListener("playing", this._onPlaying),
      this._attachEventListener("ratechange", this._onRateChange),
      this._attachEventListener("seeked", this._onSeeked),
      this._attachEventListener("seeking", this._onSeeking),
      this._attachEventListener("ended", this._onEnded),
      this._attachEventListener("waiting", this._onWaiting)
    );
    this._attachedCanPlay = true;
  }
  _attachEventListener(eventType, handler) {
    this._handlers.set(eventType, handler);
    return listenEvent(
      this._media,
      eventType,
      this._handleDevEvent 
    );
  }
  _onDevEvent(event2) {
    this._ctx.logger?.debugGroup(`\u{1F4FA} provider fired \`${event2.type}\``).labelledLog("Provider", this._provider).labelledLog("Event", event2).labelledLog("Media Store", { ...this._ctx.$state }).dispatch();
    this._handlers.get(event2.type)?.call(this, event2);
  }
  _updateCurrentTime(time, trigger) {
    const detail = {
      // Avoid errors where `currentTime` can have higher precision.
      currentTime: Math.min(time, this._ctx.$state.seekableEnd()),
      played: this._media.played
    };
    this._notify("time-update", detail, trigger);
  }
  _onLoadStart(event2) {
    if (this._media.networkState === 3) {
      this._onAbort(event2);
      return;
    }
    this._attachLoadStartListeners();
    this._notify("load-start", void 0, event2);
  }
  _onAbort(event2) {
    this._notify("abort", void 0, event2);
  }
  _onEmptied() {
    this._notify("emptied", void 0, event);
  }
  _onLoadedData(event2) {
    this._notify("loaded-data", void 0, event2);
  }
  _onLoadedMetadata(event2) {
    this._attachCanPlayListeners();
    this._notify("loaded-metadata", void 0, event2);
    if (IS_SAFARI && isHLSSrc(this._ctx.$state.source())) {
      this._ctx.delegate._ready(this._getCanPlayDetail(), event2);
    }
  }
  _getCanPlayDetail() {
    return {
      provider: peek(this._ctx.$provider),
      duration: this._media.duration,
      buffered: this._media.buffered,
      seekable: this._media.seekable
    };
  }
  _onPlay(event2) {
    if (!this._ctx.$state.canPlay)
      return;
    this._notify("play", void 0, event2);
  }
  _onPause(event2) {
    if (this._media.readyState === 1 && !this._waiting)
      return;
    this._waiting = false;
    this._timeRAF._stop();
    this._notify("pause", void 0, event2);
  }
  _onCanPlay(event2) {
    this._ctx.delegate._ready(this._getCanPlayDetail(), event2);
  }
  _onCanPlayThrough(event2) {
    if (this._ctx.$state.started())
      return;
    this._notify("can-play-through", this._getCanPlayDetail(), event2);
  }
  _onPlaying(event2) {
    this._waiting = false;
    this._notify("playing", void 0, event2);
    this._timeRAF._start();
  }
  _onStalled(event2) {
    this._notify("stalled", void 0, event2);
    if (this._media.readyState < 3) {
      this._waiting = true;
      this._notify("waiting", void 0, event2);
    }
  }
  _onWaiting(event2) {
    if (this._media.readyState < 3) {
      this._waiting = true;
      this._notify("waiting", void 0, event2);
    }
  }
  _onEnded(event2) {
    this._timeRAF._stop();
    this._updateCurrentTime(this._media.duration, event2);
    this._notify("end", void 0, event2);
    if (this._ctx.$state.loop()) {
      const hasCustomControls = isNil(this._media.controls);
      if (hasCustomControls)
        this._media.controls = false;
    }
  }
  _attachTimeUpdate() {
    if (this._ctx.$state.paused()) {
      listenEvent(this._media, "timeupdate", this._onTimeUpdate.bind(this));
    }
  }
  _onTimeUpdate(event2) {
    this._updateCurrentTime(this._media.currentTime, event2);
  }
  _onDurationChange(event2) {
    if (this._ctx.$state.ended()) {
      this._updateCurrentTime(this._media.duration, event2);
    }
    this._notify("duration-change", this._media.duration, event2);
  }
  _onVolumeChange(event2) {
    const detail = {
      volume: this._media.volume,
      muted: this._media.muted
    };
    this._notify("volume-change", detail, event2);
  }
  _onSeeked(event2) {
    this._updateCurrentTime(this._media.currentTime, event2);
    this._notify("seeked", this._media.currentTime, event2);
    if (Math.trunc(this._media.currentTime) === Math.trunc(this._media.duration) && getNumberOfDecimalPlaces(this._media.duration) > getNumberOfDecimalPlaces(this._media.currentTime)) {
      this._updateCurrentTime(this._media.duration, event2);
      if (!this._media.ended) {
        this._ctx.player.dispatch(
          new DOMEvent("media-play-request", {
            trigger: event2
          })
        );
      }
    }
  }
  _onSeeking(event2) {
    this._notify("seeking", this._media.currentTime, event2);
  }
  _onProgress(event2) {
    const detail = {
      buffered: this._media.buffered,
      seekable: this._media.seekable
    };
    this._notify("progress", detail, event2);
  }
  _onSuspend(event2) {
    this._notify("suspend", void 0, event2);
  }
  _onRateChange(event2) {
    this._notify("rate-change", this._media.playbackRate, event2);
  }
  _onError(event2) {
    const error = this._media.error;
    if (!error)
      return;
    const detail = {
      message: error.message,
      code: error.code,
      mediaError: error
    };
    this._notify("error", detail, event2);
  }
}

class NativeAudioTracks {
  constructor(_provider, _ctx) {
    this._provider = _provider;
    this._ctx = _ctx;
    this._nativeTracks.onaddtrack = this._onAddNativeTrack.bind(this);
    this._nativeTracks.onremovetrack = this._onRemoveNativeTrack.bind(this);
    this._nativeTracks.onchange = this._onChangeNativeTrack.bind(this);
    listenEvent(this._ctx.audioTracks, "change", this._onChangeTrack.bind(this));
  }
  get _nativeTracks() {
    return this._provider.media.audioTracks;
  }
  _onAddNativeTrack(event) {
    const _track = event.track;
    if (_track.label === "")
      return;
    const audioTrack = {
      id: _track.id + "",
      label: _track.label,
      language: _track.language,
      kind: _track.kind,
      selected: false
    };
    this._ctx.audioTracks[ListSymbol._add](audioTrack, event);
    if (_track.enabled)
      audioTrack.selected = true;
  }
  _onRemoveNativeTrack(event) {
    const track = this._ctx.audioTracks.getById(event.track.id);
    if (track)
      this._ctx.audioTracks[ListSymbol._remove](track, event);
  }
  _onChangeNativeTrack(event) {
    let enabledTrack = this._getEnabledNativeTrack();
    if (!enabledTrack)
      return;
    const track = this._ctx.audioTracks.getById(enabledTrack.id);
    if (track)
      this._ctx.audioTracks[ListSymbol._select](track, true, event);
  }
  _getEnabledNativeTrack() {
    return Array.from(this._nativeTracks).find((track) => track.enabled);
  }
  _onChangeTrack(event) {
    const { current } = event.detail;
    if (!current)
      return;
    const track = this._nativeTracks.getTrackById(current.id);
    if (track) {
      const prev = this._getEnabledNativeTrack();
      if (prev)
        prev.enabled = false;
      track.enabled = true;
    }
  }
}

class HTMLMediaProvider {
  constructor(_media) {
    this._media = _media;
    this.scope = createScope();
    this._currentSrc = null;
  }
  setup(ctx) {
    new HTMLMediaEvents(this, ctx);
    if ("audioTracks" in this.media)
      new NativeAudioTracks(this, ctx);
    onDispose(() => {
      this._media.setAttribute("src", "");
      this._media.load();
    });
  }
  get type() {
    return "";
  }
  get media() {
    return this._media;
  }
  get currentSrc() {
    return this._currentSrc;
  }
  setPlaybackRate(rate) {
    this._media.playbackRate = rate;
  }
  async play() {
    return this._media.play();
  }
  async pause() {
    return this._media.pause();
  }
  setMuted(muted) {
    this._media.muted = muted;
  }
  setVolume(volume) {
    this._media.volume = volume;
  }
  setCurrentTime(time) {
    this._media.currentTime = time;
  }
  setPlaysinline(playsinline) {
    setAttribute(this._media, "playsinline", playsinline);
  }
  async loadSource({ src, type }, preload) {
    this._media.preload = preload || "";
    if (isMediaStream(src)) {
      this._media.srcObject = src;
    } else {
      this._media.srcObject = null;
      this._media.src = isString(src) ? src : window.URL.createObjectURL(src);
    }
    this._media.load();
    this._currentSrc = {
      src,
      type
    };
  }
}

export { HTMLMediaProvider as H };
