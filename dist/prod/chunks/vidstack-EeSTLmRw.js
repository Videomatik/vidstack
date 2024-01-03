"use client"

import { d as createScope, s as signal, e as effect, p as peek, f as isString, j as deferredPromise, l as listenEvent, k as isArray } from './vidstack-8AXyyPGc.js';
import { T as TimeRange, p as preconnect, c as coerceToError, L as ListSymbol, Q as QualitySymbol } from './vidstack-UzM8r9FW.js';
import { R as RAFLoop } from './vidstack-Bio1UGiO.js';
import { E as EmbedProvider, t as timedPromise } from './vidstack-t4ons6uo.js';
import 'react';

const trackedVimeoEvents = [
  "bufferend",
  "bufferstart",
  // 'cuechange',
  "durationchange",
  "ended",
  "enterpictureinpicture",
  "error",
  "fullscreenchange",
  "leavepictureinpicture",
  "loaded",
  // 'loadeddata',
  // 'loadedmetadata',
  // 'loadstart',
  "playProgress",
  "loadProgress",
  "pause",
  "play",
  "playbackratechange",
  // 'progress',
  "qualitychange",
  "seeked",
  "seeking",
  // 'texttrackchange',
  "timeupdate",
  "volumechange",
  "waiting"
  // 'adstarted',
  // 'adcompleted',
  // 'aderror',
  // 'adskipped',
  // 'adallcompleted',
  // 'adclicked',
  // 'chapterchange',
  // 'chromecastconnected',
  // 'remoteplaybackavailabilitychange',
  // 'remoteplaybackconnecting',
  // 'remoteplaybackconnect',
  // 'remoteplaybackdisconnect',
  // 'liveeventended',
  // 'liveeventstarted',
  // 'livestreamoffline',
  // 'livestreamonline',
];

const _VimeoProvider = class _VimeoProvider extends EmbedProvider {
  constructor() {
    super(...arguments);
    this.$$PROVIDER_TYPE = "VIMEO";
    this.scope = createScope();
    this.Ga = 0;
    this.Ha = new TimeRange(0, 0);
    this.Ib = new TimeRange(0, 0);
    this.F = null;
    this.H = null;
    this.sd = null;
    this.O = signal("");
    this.pc = signal(false);
    this.td = null;
    this.W = null;
    this.fh = null;
    this.Ea = new RAFLoop(this.cd.bind(this));
    /**
     * Whether tracking session data should be enabled on the embed, including cookies and analytics.
     * This is turned off by default to be GDPR-compliant.
     *
     * @defaultValue `false`
     */
    this.cookies = false;
    this.title = true;
    this.byline = true;
    this.portrait = true;
    this.color = "00ADEF";
  }
  get c() {
    return this.b.delegate.c;
  }
  get type() {
    return "vimeo";
  }
  get currentSrc() {
    return this.W;
  }
  get videoId() {
    return this.O();
  }
  get hash() {
    return this.td;
  }
  get isPro() {
    return this.pc();
  }
  preconnect() {
    const connections = [
      this.fb(),
      "https://i.vimeocdn.com",
      "https://f.vimeocdn.com",
      "https://fresnel.vimeocdn.com"
    ];
    for (const url of connections) {
      preconnect(url, "preconnect");
    }
  }
  setup(ctx) {
    this.b = ctx;
    super.setup(ctx);
    effect(this.ld.bind(this));
    effect(this.gh.bind(this));
    effect(this.hh.bind(this));
    this.c("provider-setup", this);
  }
  destroy() {
    this.I();
    this.q("destroy");
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
      this.q("play");
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
          return "Timed out.";
      });
      this.q("pause");
    }
    return this.H.promise;
  }
  setMuted(muted) {
    this.q("setMuted", muted);
  }
  setCurrentTime(time) {
    this.q("seekTo", time);
  }
  setVolume(volume) {
    this.q("setVolume", volume);
    this.q("setMuted", peek(this.b.$state.muted));
  }
  setPlaybackRate(rate) {
    this.q("setPlaybackRate", rate);
  }
  async loadSource(src) {
    if (!isString(src.src)) {
      this.W = null;
      this.td = null;
      this.O.set("");
      return;
    }
    const matches = src.src.match(_VimeoProvider.kd), videoId = matches?.[1], hash = matches?.[2];
    this.O.set(videoId ?? "");
    this.td = hash ?? null;
    this.W = src;
  }
  ld() {
    this.I();
    const videoId = this.O();
    if (!videoId) {
      this.db.set("");
      return;
    }
    this.db.set(`${this.fb()}/video/${videoId}`);
  }
  gh() {
    const src = this.db(), videoId = this.O(), cache = _VimeoProvider.eh, info = cache.get(videoId);
    if (!videoId)
      return;
    const promise = deferredPromise();
    this.sd = promise;
    if (info) {
      promise.resolve(info);
      return;
    }
    const oembedSrc = `https://vimeo.com/api/oembed.json?url=${src}`, abort = new AbortController();
    window.fetch(oembedSrc, {
      mode: "cors",
      signal: abort.signal
    }).then((response) => response.json()).then((data) => {
      const thumnailRegex = /vimeocdn.com\/video\/(.*)?_/, thumbnailId = data?.thumbnail_url?.match(thumnailRegex)?.[1], poster = thumbnailId ? `https://i.vimeocdn.com/video/${thumbnailId}_1920x1080.webp` : "", info2 = {
        title: data?.title ?? "",
        duration: data?.duration ?? 0,
        poster,
        pro: data.account_type !== "basic"
      };
      cache.set(videoId, info2);
      promise.resolve(info2);
    }).catch((e) => {
      promise.reject();
      this.c("error", {
        message: `Failed to fetch vimeo video info from \`${oembedSrc}\`.`,
        code: 1,
        error: coerceToError(e)
      });
    });
    return () => {
      promise.reject();
      abort.abort();
    };
  }
  hh() {
    const isPro = this.pc(), { $state, qualities } = this.b;
    $state.canSetPlaybackRate.set(isPro);
    qualities[ListSymbol.Nc](!isPro);
    if (isPro) {
      return listenEvent(qualities, "change", () => {
        if (qualities.auto)
          return;
        const id = qualities.selected?.id;
        if (id)
          this.q("setQuality", id);
      });
    }
  }
  fb() {
    return "https://player.vimeo.com";
  }
  Ue() {
    const { $iosControls } = this.b, { keyDisabled } = this.b.$props, { controls, playsinline } = this.b.$state, showControls = controls() || $iosControls();
    return {
      title: this.title,
      byline: this.byline,
      color: this.color,
      portrait: this.portrait,
      controls: showControls,
      h: this.hash,
      keyboard: showControls && !keyDisabled(),
      transparent: true,
      playsinline: playsinline(),
      dnt: !this.cookies
    };
  }
  cd() {
    this.q("getCurrentTime");
  }
  Fb(time, trigger) {
    const { currentTime, paused, seeking, bufferedEnd } = this.b.$state;
    if (seeking() && paused()) {
      this.q("getBuffered");
      if (bufferedEnd() > time)
        this.c("seeked", time, trigger);
    }
    if (currentTime() === time)
      return;
    const prevTime = currentTime(), detail = {
      currentTime: time,
      played: this.Ga >= time ? this.Ha : this.Ha = new TimeRange(0, this.Ga = time)
    };
    this.c("time-update", detail, trigger);
    if (Math.abs(prevTime - time) > 1.5) {
      this.c("seeking", time, trigger);
      if (!paused() && bufferedEnd() < time) {
        this.c("waiting", void 0, trigger);
      }
    }
  }
  cb(time, trigger) {
    this.c("seeked", time, trigger);
  }
  nd(trigger) {
    const videoId = this.O();
    this.sd?.promise.then((info) => {
      if (!info)
        return;
      const { title, poster, duration, pro } = info, { $iosControls } = this.b, { controls } = this.b.$state, showControls = controls() || $iosControls();
      this.Ea.Cb();
      this.pc.set(pro);
      this.Ib = new TimeRange(0, duration);
      this.c("poster-change", poster, trigger);
      this.c("title-change", title, trigger);
      this.c("duration-change", duration, trigger);
      const detail = {
        buffered: new TimeRange(0, 0),
        seekable: this.Ib,
        duration
      };
      this.b.delegate.kc(detail, trigger);
      if (!showControls) {
        this.q("_hideOverlay");
      }
      this.q("getQualities");
    }).catch((e) => {
      if (videoId !== this.O())
        return;
      this.c("error", {
        message: `Failed to fetch oembed data`,
        code: 2,
        error: coerceToError(e)
      });
    });
  }
  ih(method, data, trigger) {
    switch (method) {
      case "getCurrentTime":
        this.Fb(data, trigger);
        break;
      case "getBuffered":
        if (isArray(data) && data.length) {
          this.Ze(data[data.length - 1][1], trigger);
        }
        break;
      case "setMuted":
        this.bb(peek(this.b.$state.volume), data, trigger);
        break;
      case "getChapters":
        break;
      case "getQualities":
        this.qc(data, trigger);
        break;
    }
  }
  jh() {
    for (const type of trackedVimeoEvents) {
      this.q("addEventListener", type);
    }
  }
  Ba(trigger) {
    this.c("pause", void 0, trigger);
    this.H?.resolve();
    this.H = null;
  }
  yb(trigger) {
    this.c("play", void 0, trigger);
    this.F?.resolve();
    this.F = null;
  }
  kh(trigger) {
    const { paused } = this.b.$state;
    if (!paused()) {
      this.c("playing", void 0, trigger);
    }
  }
  Ze(buffered, trigger) {
    const detail = {
      buffered: new TimeRange(0, buffered),
      seekable: this.Ib
    };
    this.c("progress", detail, trigger);
  }
  lh(trigger) {
    this.c("waiting", void 0, trigger);
  }
  mh(trigger) {
    const { paused } = this.b.$state;
    if (!paused())
      this.c("playing", void 0, trigger);
  }
  ed(trigger) {
    const { paused } = this.b.$state;
    if (paused()) {
      this.c("play", void 0, trigger);
    }
    this.c("waiting", void 0, trigger);
  }
  bb(volume, muted, trigger) {
    const detail = { volume, muted };
    this.c("volume-change", detail, trigger);
  }
  // protected _onTextTrackChange(track: VimeoTextTrack, trigger: Event) {
  //   const textTrack = this._ctx.textTracks.toArray().find((t) => t.language === track.language);
  //   if (textTrack) textTrack.mode = track.mode;
  // }
  // protected _onTextTracksChange(tracks: VimeoTextTrack[], trigger: Event) {
  //   for (const init of tracks) {
  //     const textTrack = new TextTrack({
  //       ...init,
  //       label: init.label.replace('auto-generated', 'auto'),
  //     });
  //     textTrack[TextTrackSymbol._readyState] = 2;
  //     this._ctx.textTracks.add(textTrack, trigger);
  //     textTrack.setMode(init.mode, trigger);
  //   }
  // }
  // protected _onCueChange(cue: VimeoTextCue, trigger: Event) {
  //   const { textTracks, $state } = this._ctx,
  //     { currentTime } = $state,
  //     track = textTracks.selected;
  //   if (this._currentCue) track?.removeCue(this._currentCue, trigger);
  //   this._currentCue = new window.VTTCue(currentTime(), Number.MAX_SAFE_INTEGER, cue.text);
  //   track?.addCue(this._currentCue, trigger);
  // }
  qc(qualities, trigger) {
    this.b.qualities[QualitySymbol._a] = qualities.some((q) => q.id === "auto") ? () => {
      this.q("setQuality", "auto");
    } : void 0;
    for (const quality of qualities) {
      if (quality.id === "auto")
        continue;
      const height = +quality.id.slice(0, -1);
      if (isNaN(height))
        continue;
      this.b.qualities[ListSymbol.pa](
        {
          id: quality.id,
          width: height * (16 / 9),
          height,
          codec: "avc1,h.264",
          bitrate: -1
        },
        trigger
      );
    }
    this.gb(
      qualities.find((q) => q.active),
      trigger
    );
  }
  gb({ id } = {}, trigger) {
    if (!id)
      return;
    const isAuto = id === "auto", newQuality = this.b.qualities.toArray().find((q) => q.id === id);
    if (isAuto) {
      this.b.qualities[QualitySymbol.Za](isAuto, trigger);
      this.b.qualities[ListSymbol.qa](void 0, true, trigger);
    } else {
      this.b.qualities[ListSymbol.qa](newQuality, true, trigger);
    }
  }
  nh(event, payload, trigger) {
    switch (event) {
      case "ready":
        this.jh();
        break;
      case "loaded":
        this.nd(trigger);
        break;
      case "play":
        this.yb(trigger);
        break;
      case "playProgress":
        this.kh(trigger);
        break;
      case "pause":
        this.Ba(trigger);
        break;
      case "loadProgress":
        this.Ze(payload.seconds, trigger);
        break;
      case "waiting":
        this.ed(trigger);
        break;
      case "bufferstart":
        this.lh(trigger);
        break;
      case "bufferend":
        this.mh(trigger);
        break;
      case "volumechange":
        this.bb(payload.volume, peek(this.b.$state.muted), trigger);
        break;
      case "durationchange":
        this.Ib = new TimeRange(0, payload.duration);
        this.c("duration-change", payload.duration, trigger);
        break;
      case "playbackratechange":
        this.c("rate-change", payload.playbackRate, trigger);
        break;
      case "qualitychange":
        this.gb(payload, trigger);
        break;
      case "fullscreenchange":
        this.c("fullscreen-change", payload.fullscreen, trigger);
        break;
      case "enterpictureinpicture":
        this.c("picture-in-picture-change", true, trigger);
        break;
      case "leavepictureinpicture":
        this.c("picture-in-picture-change", false, trigger);
        break;
      case "ended":
        this.c("end", void 0, trigger);
        break;
      case "error":
        this.V(payload, trigger);
        break;
      case "seeked":
        this.cb(payload.seconds, trigger);
        break;
    }
  }
  V(error, trigger) {
    if (error.method === "play") {
      this.F?.reject(error.message);
      return;
    }
  }
  jd(message, event) {
    if (message.event) {
      this.nh(message.event, message.data, event);
    } else if (message.method) {
      this.ih(message.method, message.value, event);
    }
  }
  mc() {
  }
  q(command, arg) {
    return this.hd({
      method: command,
      value: arg
    });
  }
  I() {
    this.Ea.sa();
    this.Ga = 0;
    this.Ha = new TimeRange(0, 0);
    this.Ib = new TimeRange(0, 0);
    this.F = null;
    this.H = null;
    this.sd = null;
    this.fh = null;
    this.pc.set(false);
  }
};
_VimeoProvider.kd = /(?:https:\/\/)?(?:player\.)?vimeo(?:\.com)?\/(?:video\/)?(\d+)(?:\?hash=(.*))?/;
_VimeoProvider.eh = /* @__PURE__ */ new Map();
let VimeoProvider = _VimeoProvider;

export { VimeoProvider };
