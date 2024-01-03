"use client"

import { d as createScope, s as signal, e as effect, p as peek, f as isString, g as isObject, c as isNumber, h as isBoolean } from './vidstack-8AXyyPGc.js';
import { T as TimeRange, p as preconnect } from './vidstack-rVU9ynQ5.js';
import { E as EmbedProvider, t as timedPromise } from './vidstack-a8Y1aEDS.js';
import 'react';

const YouTubePlayerState = {
  Rj: -1,
  Ve: 0,
  We: 1,
  Ng: 2,
  Og: 3,
  Pg: 5
};

const _YouTubeProvider = class _YouTubeProvider extends EmbedProvider {
  constructor() {
    super(...arguments);
    this.$$PROVIDER_TYPE = "YOUTUBE";
    this.scope = createScope();
    this.O = signal("");
    this.nc = -1;
    this.oc = -1;
    this.Ga = 0;
    this.Ha = new TimeRange(0, 0);
    this.W = null;
    this.F = null;
    this.H = null;
    /**
     * Sets the player's interface language. The parameter value is an ISO 639-1 two-letter
     * language code or a fully specified locale. For example, fr and fr-ca are both valid values.
     * Other language input codes, such as IETF language tags (BCP 47) might also be handled properly.
     *
     * The interface language is used for tooltips in the player and also affects the default caption
     * track. Note that YouTube might select a different caption track language for a particular
     * user based on the user's individual language preferences and the availability of caption tracks.
     *
     * @defaultValue 'en'
     */
    this.language = "en";
    this.color = "red";
    /**
     * Whether cookies should be enabled on the embed. This is turned off by default to be
     * GDPR-compliant.
     *
     * @defaultValue `false`
     */
    this.cookies = false;
  }
  get c() {
    return this.b.delegate.c;
  }
  get currentSrc() {
    return this.W;
  }
  get type() {
    return "youtube";
  }
  get videoId() {
    return this.O();
  }
  preconnect() {
    const connections = [
      this.fb(),
      // Botguard script.
      "https://www.google.com",
      // Poster.
      "https://i.ytimg.com",
      // Ads.
      "https://googleads.g.doubleclick.net",
      "https://static.doubleclick.net"
    ];
    for (const url of connections) {
      preconnect(url, "preconnect");
    }
  }
  setup(ctx) {
    this.b = ctx;
    super.setup(ctx);
    effect(this.ld.bind(this));
    effect(this.md.bind(this));
    this.c("provider-setup", this);
  }
  async play() {
    const { paused } = this.b.$state;
    if (!peek(paused))
      return;
    if (!this.F) {
      this.F = timedPromise(() => {
        this.F = null;
        if (paused())
          return "Timed out.";
      });
      this.q("playVideo");
    }
    return this.F.promise;
  }
  async pause() {
    const { paused } = this.b.$state;
    if (peek(paused))
      return;
    if (!this.H) {
      this.H = timedPromise(() => {
        this.H = null;
        if (!paused())
          ;
      });
      this.q("pauseVideo");
    }
    return this.H.promise;
  }
  setMuted(muted) {
    if (muted)
      this.q("mute");
    else
      this.q("unMute");
  }
  setCurrentTime(time) {
    this.q("seekTo", time);
  }
  setVolume(volume) {
    this.q("setVolume", volume * 100);
  }
  setPlaybackRate(rate) {
    this.q("setPlaybackRate", rate);
  }
  async loadSource(src) {
    if (!isString(src.src)) {
      this.W = null;
      this.O.set("");
      return;
    }
    const videoId = src.src.match(_YouTubeProvider.kd)?.[1];
    this.O.set(videoId ?? "");
    this.W = src;
  }
  fb() {
    return !this.cookies ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";
  }
  ld() {
    this.I();
    const videoId = this.O();
    if (!videoId) {
      this.db.set("");
      return;
    }
    this.db.set(`${this.fb()}/embed/${videoId}`);
  }
  md() {
    const videoId = this.O(), cache = _YouTubeProvider.Xe;
    if (!videoId)
      return;
    if (cache.has(videoId)) {
      const url = cache.get(videoId);
      this.c("poster-change", url);
      return;
    }
    const abort = new AbortController();
    this.Qg(videoId, abort);
    return () => {
      abort.abort();
    };
  }
  async Qg(videoId, abort) {
    try {
      const sizes = ["maxresdefault", "sddefault", "hqdefault"];
      for (const size of sizes) {
        for (const webp of [true, false]) {
          const url = this.Rg(videoId, size, webp), response = await fetch(url, {
            mode: "no-cors",
            signal: abort.signal
          });
          if (response.status < 400) {
            _YouTubeProvider.Xe.set(videoId, url);
            this.c("poster-change", url);
            return;
          }
        }
      }
    } catch (e) {
    }
    this.c("poster-change", "");
  }
  Rg(videoId, size, webp) {
    const type = webp ? "webp" : "jpg";
    return `https://i.ytimg.com/${webp ? "vi_webp" : "vi"}/${videoId}/${size}.${type}`;
  }
  Ue() {
    const { keyDisabled } = this.b.$props, { $iosControls } = this.b, { controls, muted, playsinline } = this.b.$state, showControls = controls() || $iosControls();
    return {
      autoplay: 0,
      cc_lang_pref: this.language,
      cc_load_policy: showControls ? 1 : void 0,
      color: this.color,
      controls: showControls ? 1 : 0,
      disablekb: !showControls || keyDisabled() ? 1 : 0,
      enablejsapi: 1,
      fs: 1,
      hl: this.language,
      iv_load_policy: showControls ? 1 : 3,
      mute: muted() ? 1 : 0,
      playsinline: playsinline() ? 1 : 0
    };
  }
  q(command, arg) {
    this.hd({
      event: "command",
      func: command,
      args: arg ? [arg] : void 0
    });
  }
  mc() {
    window.setTimeout(() => this.hd({ event: "listening" }), 100);
  }
  nd(trigger) {
    this.b.delegate.kc(void 0, trigger);
  }
  Ba(trigger) {
    this.H?.resolve();
    this.H = null;
    this.c("pause", void 0, trigger);
  }
  Fb(time, trigger) {
    const { duration, currentTime } = this.b.$state, boundTime = this.nc === YouTubePlayerState.Ve ? duration() : time, detail = {
      currentTime: boundTime,
      played: this.Ga >= boundTime ? this.Ha : this.Ha = new TimeRange(0, this.Ga = time)
    };
    this.c("time-update", detail, trigger);
    if (Math.abs(boundTime - currentTime()) > 1) {
      this.c("seeking", boundTime, trigger);
    }
  }
  jc(buffered, seekable, trigger) {
    const detail = {
      buffered: new TimeRange(0, buffered),
      seekable
    };
    this.c("progress", detail, trigger);
    const { seeking, currentTime } = this.b.$state;
    if (seeking() && buffered > currentTime()) {
      this.cb(trigger);
    }
  }
  cb(trigger) {
    const { paused, currentTime } = this.b.$state;
    window.clearTimeout(this.oc);
    this.oc = window.setTimeout(
      () => {
        this.c("seeked", currentTime(), trigger);
        this.oc = -1;
      },
      paused() ? 100 : 0
    );
  }
  Eb(trigger) {
    const { seeking } = this.b.$state;
    if (seeking())
      this.cb(trigger);
    this.c("end", void 0, trigger);
  }
  Sg(state, trigger) {
    const { paused } = this.b.$state, isPlaying = state === YouTubePlayerState.We, isBuffering = state === YouTubePlayerState.Og;
    if (isBuffering)
      this.c("waiting", void 0, trigger);
    if (paused() && (isBuffering || isPlaying)) {
      this.F?.resolve();
      this.F = null;
      this.c("play", void 0, trigger);
    }
    switch (state) {
      case YouTubePlayerState.Pg:
        this.nd(trigger);
        break;
      case YouTubePlayerState.We:
        this.c("playing", void 0, trigger);
        break;
      case YouTubePlayerState.Ng:
        this.Ba(trigger);
        break;
      case YouTubePlayerState.Ve:
        this.Eb(trigger);
        break;
    }
    this.nc = state;
  }
  jd({ info }, event) {
    if (!info)
      return;
    const { title, duration, playbackRate } = this.b.$state;
    if (isObject(info.videoData) && info.videoData.title !== title()) {
      this.c("title-change", info.videoData.title, event);
    }
    if (isNumber(info.duration) && info.duration !== duration()) {
      if (isNumber(info.videoLoadedFraction)) {
        const buffered = info.progressState?.loaded ?? info.videoLoadedFraction * info.duration, seekable = new TimeRange(0, info.duration);
        this.jc(buffered, seekable, event);
      }
      this.c("duration-change", info.duration, event);
    }
    if (isNumber(info.playbackRate) && info.playbackRate !== playbackRate()) {
      this.c("rate-change", info.playbackRate, event);
    }
    if (info.progressState) {
      const {
        current,
        seekableStart,
        seekableEnd,
        loaded,
        duration: _duration
      } = info.progressState;
      this.Fb(current, event);
      this.jc(loaded, new TimeRange(seekableStart, seekableEnd), event);
      if (_duration !== duration()) {
        this.c("duration-change", _duration, event);
      }
    }
    if (isNumber(info.volume) && isBoolean(info.muted)) {
      const detail = {
        muted: info.muted,
        volume: info.volume / 100
      };
      this.c("volume-change", detail, event);
    }
    if (isNumber(info.playerState) && info.playerState !== this.nc) {
      this.Sg(info.playerState, event);
    }
  }
  I() {
    this.nc = -1;
    this.oc = -1;
    this.Ga = 0;
    this.Ha = new TimeRange(0, 0);
    this.F = null;
    this.H = null;
  }
};
_YouTubeProvider.kd = /(?:youtu\.be|youtube|youtube\.com|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|)((?:\w|-){11})/;
_YouTubeProvider.Xe = /* @__PURE__ */ new Map();
let YouTubeProvider = _YouTubeProvider;

export { YouTubeProvider };
