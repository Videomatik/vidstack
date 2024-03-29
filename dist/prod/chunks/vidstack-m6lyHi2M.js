"use client"

import { o as useDisposalBin, e as effect, q as onDispose, l as listenEvent, p as peek, r as isNil, D as DOMEvent, d as createScope, t as setAttribute, f as isString } from './vidstack-8AXyyPGc.js';
import { f as IS_SAFARI, g as isHLSSrc, h as getNumberOfDecimalPlaces, L as ListSymbol, j as isMediaStream } from './vidstack-UzM8r9FW.js';
import { R as RAFLoop } from './vidstack-Bio1UGiO.js';

class HTMLMediaEvents {
  constructor(_provider, _ctx) {
    this.i = _provider;
    this.b = _ctx;
    this.ta = useDisposalBin();
    this.Db = false;
    this.ad = false;
    this.bd = false;
    this.Ea = new RAFLoop(this.cd.bind(this));
    this.Re = void 0;
    this.Eg = void 0;
    this.qg();
    effect(this.rg.bind(this));
    onDispose(this.dd.bind(this));
  }
  get a() {
    return this.i.media;
  }
  get c() {
    return this.b.delegate.c;
  }
  dd() {
    this.ad = false;
    this.bd = false;
    this.Ea.sa();
    this.ta.empty();
  }
  /**
   * The `timeupdate` event fires surprisingly infrequently during playback, meaning your progress
   * bar (or whatever else is synced to the currentTime) moves in a choppy fashion. This helps
   * resolve that by retrieving time updates in a request animation frame loop.
   */
  cd() {
    const newTime = this.a.currentTime;
    if (this.b.$state.currentTime() !== newTime)
      this.ab(newTime);
  }
  qg() {
    this.u("loadstart", this.Fa);
    this.u("abort", this.Qe);
    this.u("emptied", this.sg);
    this.u("error", this.V);
    this.u("volumechange", this.bb);
  }
  tg() {
    if (this.ad)
      return;
    this.ta.add(
      this.u("loadeddata", this.ug),
      this.u("loadedmetadata", this.vg),
      this.u("canplay", this.ic),
      this.u("canplaythrough", this.wg),
      this.u("durationchange", this.xg),
      this.u("play", this.yb),
      this.u("progress", this.jc),
      this.u("stalled", this.yg),
      this.u("suspend", this.zg)
    );
    this.ad = true;
  }
  Ag() {
    if (this.bd)
      return;
    this.ta.add(
      this.u("pause", this.Ba),
      this.u("playing", this.Bg),
      this.u("ratechange", this.Cg),
      this.u("seeked", this.cb),
      this.u("seeking", this.Dg),
      this.u("ended", this.Eb),
      this.u("waiting", this.ed)
    );
    this.bd = true;
  }
  u(eventType, handler) {
    return listenEvent(
      this.a,
      eventType,
      handler.bind(this)
    );
  }
  Fg(event2) {
    return;
  }
  ab(time, trigger) {
    const detail = {
      // Avoid errors where `currentTime` can have higher precision.
      currentTime: Math.min(time, this.b.$state.seekableEnd()),
      played: this.a.played
    };
    this.c("time-update", detail, trigger);
  }
  Fa(event2) {
    if (this.a.networkState === 3) {
      this.Qe(event2);
      return;
    }
    this.tg();
    this.c("load-start", void 0, event2);
  }
  Qe(event2) {
    this.c("abort", void 0, event2);
  }
  sg() {
    this.c("emptied", void 0, event);
  }
  ug(event2) {
    this.c("loaded-data", void 0, event2);
  }
  vg(event2) {
    this.Ag();
    this.c("loaded-metadata", void 0, event2);
    if (IS_SAFARI && isHLSSrc(this.b.$state.source())) {
      this.b.delegate.kc(this.fd(), event2);
    }
  }
  fd() {
    return {
      provider: peek(this.b.$provider),
      duration: this.a.duration,
      buffered: this.a.buffered,
      seekable: this.a.seekable
    };
  }
  yb(event2) {
    if (!this.b.$state.canPlay)
      return;
    this.c("play", void 0, event2);
  }
  Ba(event2) {
    if (this.a.readyState === 1 && !this.Db)
      return;
    this.Db = false;
    this.Ea.sa();
    this.c("pause", void 0, event2);
  }
  ic(event2) {
    this.b.delegate.kc(this.fd(), event2);
  }
  wg(event2) {
    if (this.b.$state.started())
      return;
    this.c("can-play-through", this.fd(), event2);
  }
  Bg(event2) {
    this.Db = false;
    this.c("playing", void 0, event2);
    this.Ea.Cb();
  }
  yg(event2) {
    this.c("stalled", void 0, event2);
    if (this.a.readyState < 3) {
      this.Db = true;
      this.c("waiting", void 0, event2);
    }
  }
  ed(event2) {
    if (this.a.readyState < 3) {
      this.Db = true;
      this.c("waiting", void 0, event2);
    }
  }
  Eb(event2) {
    this.Ea.sa();
    this.ab(this.a.duration, event2);
    this.c("end", void 0, event2);
    if (this.b.$state.loop()) {
      const hasCustomControls = isNil(this.a.controls);
      if (hasCustomControls)
        this.a.controls = false;
    }
  }
  rg() {
    if (this.b.$state.paused()) {
      listenEvent(this.a, "timeupdate", this.Fb.bind(this));
    }
  }
  Fb(event2) {
    this.ab(this.a.currentTime, event2);
  }
  xg(event2) {
    if (this.b.$state.ended()) {
      this.ab(this.a.duration, event2);
    }
    this.c("duration-change", this.a.duration, event2);
  }
  bb(event2) {
    const detail = {
      volume: this.a.volume,
      muted: this.a.muted
    };
    this.c("volume-change", detail, event2);
  }
  cb(event2) {
    this.ab(this.a.currentTime, event2);
    this.c("seeked", this.a.currentTime, event2);
    if (Math.trunc(this.a.currentTime) === Math.trunc(this.a.duration) && getNumberOfDecimalPlaces(this.a.duration) > getNumberOfDecimalPlaces(this.a.currentTime)) {
      this.ab(this.a.duration, event2);
      if (!this.a.ended) {
        this.b.player.dispatch(
          new DOMEvent("media-play-request", {
            trigger: event2
          })
        );
      }
    }
  }
  Dg(event2) {
    this.c("seeking", this.a.currentTime, event2);
  }
  jc(event2) {
    const detail = {
      buffered: this.a.buffered,
      seekable: this.a.seekable
    };
    this.c("progress", detail, event2);
  }
  zg(event2) {
    this.c("suspend", void 0, event2);
  }
  Cg(event2) {
    this.c("rate-change", this.a.playbackRate, event2);
  }
  V(event2) {
    const error = this.a.error;
    if (!error)
      return;
    const detail = {
      message: error.message,
      code: error.code,
      mediaError: error
    };
    this.c("error", detail, event2);
  }
}

class NativeAudioTracks {
  constructor(_provider, _ctx) {
    this.i = _provider;
    this.b = _ctx;
    this.Gb.onaddtrack = this.Gg.bind(this);
    this.Gb.onremovetrack = this.Hg.bind(this);
    this.Gb.onchange = this.Ig.bind(this);
    listenEvent(this.b.audioTracks, "change", this.Jg.bind(this));
  }
  get Gb() {
    return this.i.media.audioTracks;
  }
  Gg(event) {
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
    this.b.audioTracks[ListSymbol.pa](audioTrack, event);
    if (_track.enabled)
      audioTrack.selected = true;
  }
  Hg(event) {
    const track = this.b.audioTracks.getById(event.track.id);
    if (track)
      this.b.audioTracks[ListSymbol.Zb](track, event);
  }
  Ig(event) {
    let enabledTrack = this.Se();
    if (!enabledTrack)
      return;
    const track = this.b.audioTracks.getById(enabledTrack.id);
    if (track)
      this.b.audioTracks[ListSymbol.qa](track, true, event);
  }
  Se() {
    return Array.from(this.Gb).find((track) => track.enabled);
  }
  Jg(event) {
    const { current } = event.detail;
    if (!current)
      return;
    const track = this.Gb.getTrackById(current.id);
    if (track) {
      const prev = this.Se();
      if (prev)
        prev.enabled = false;
      track.enabled = true;
    }
  }
}

class HTMLMediaProvider {
  constructor(_media) {
    this.a = _media;
    this.scope = createScope();
    this.W = null;
  }
  setup(ctx) {
    new HTMLMediaEvents(this, ctx);
    if ("audioTracks" in this.media)
      new NativeAudioTracks(this, ctx);
    onDispose(() => {
      this.a.setAttribute("src", "");
      this.a.load();
    });
  }
  get type() {
    return "";
  }
  get media() {
    return this.a;
  }
  get currentSrc() {
    return this.W;
  }
  setPlaybackRate(rate) {
    this.a.playbackRate = rate;
  }
  async play() {
    return this.a.play();
  }
  async pause() {
    return this.a.pause();
  }
  setMuted(muted) {
    this.a.muted = muted;
  }
  setVolume(volume) {
    this.a.volume = volume;
  }
  setCurrentTime(time) {
    this.a.currentTime = time;
  }
  setPlaysinline(playsinline) {
    setAttribute(this.a, "playsinline", playsinline);
  }
  async loadSource({ src, type }, preload) {
    this.a.preload = preload || "";
    if (isMediaStream(src)) {
      this.a.srcObject = src;
    } else {
      this.a.srcObject = null;
      this.a.src = isString(src) ? src : window.URL.createObjectURL(src);
    }
    this.a.load();
    this.W = {
      src,
      type
    };
  }
}

export { HTMLMediaProvider as H };
