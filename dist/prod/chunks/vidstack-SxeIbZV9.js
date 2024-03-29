"use client"

import * as React from 'react';
import { v as createDisposalBin, l as listenEvent, d as createScope, s as signal, a as useSignal, w as tick, p as peek, e as effect, n as isFunction, j as deferredPromise } from './vidstack-8AXyyPGc.js';
import { Internals } from 'remotion';
import { T as TimeRange, k as isRemotionSource } from './vidstack-rVU9ynQ5.js';
import { R as RemotionLayoutEngine, a as RemotionContextProvider, E as ErrorBoundary, b as REMOTION_PROVIDER_ID } from '../player/vidstack-remotion.js';
import { NoReactInternals } from 'remotion/no-react';
import './vidstack-E0Z4F7im.js';
import './vidstack-ov2wCP54.js';

class RemotionPlaybackEngine {
  constructor(_src, _onFrameChange, _onEnd) {
    this.db = _src;
    this.ck = _onFrameChange;
    this.xk = _onEnd;
    this.ta = createDisposalBin();
    this.r = 0;
    this.ek = 0;
    this._j = 1;
    this.$j = false;
    this.ak = -1;
    this.bk = -1;
    this.jk = 0;
    this.kk = false;
    this.lk = () => {
      this.fa();
      if (this.$j) {
        this.yk(this.lk);
      }
    };
    this.r = _src.initialFrame ?? 0;
    this.ta.add(
      listenEvent(document, "visibilitychange", this.vk.bind(this))
    );
  }
  get frame() {
    return this.r;
  }
  set frame(frame) {
    this.r = frame;
    this.ck(frame);
  }
  play() {
    this.ek = 0;
    this.$j = true;
    this.jk = performance.now();
    this.lk();
  }
  stop() {
    this.$j = false;
    if (this.ak >= 0) {
      cancelAnimationFrame(this.ak);
      this.ak = -1;
    }
    if (this.bk >= 0) {
      clearTimeout(this.bk);
      this.bk = -1;
    }
  }
  setPlaybackRate(rate) {
    this._j = rate;
  }
  destroy() {
    this.ta.empty();
    this.stop();
  }
  fa() {
    const { nextFrame, framesToAdvance, ended } = this.wk();
    this.ek += framesToAdvance;
    if (nextFrame !== this.r) {
      this.ck(nextFrame);
      this.r = nextFrame;
    }
    if (ended) {
      this.r = this.db.outFrame;
      this.stop();
      this.xk();
    }
  }
  yk(callback) {
    if (this.kk) {
      this.bk = window.setTimeout(callback, 1e3 / this.db.fps);
    } else {
      this.ak = requestAnimationFrame(callback);
    }
  }
  wk() {
    const round = this._j < 0 ? Math.ceil : Math.floor, time = performance.now() - this.jk, framesToAdvance = round(time * this._j / (1e3 / this.db.fps)) - this.ek, nextFrame = framesToAdvance + this.r, isCurrentFrameOutOfBounds = this.r > this.db.outFrame || this.r < this.db.inFrame, isNextFrameOutOfBounds = nextFrame > this.db.outFrame || nextFrame < this.db.inFrame, ended = isNextFrameOutOfBounds && !isCurrentFrameOutOfBounds;
    if (this._j > 0 && !ended) {
      if (isNextFrameOutOfBounds) {
        return {
          nextFrame: this.db.inFrame,
          framesToAdvance,
          ended
        };
      }
      return { nextFrame, framesToAdvance, ended };
    }
    if (isNextFrameOutOfBounds) {
      return {
        nextFrame: this.db.outFrame,
        framesToAdvance,
        ended
      };
    }
    return { nextFrame, framesToAdvance, ended };
  }
  vk() {
    this.kk = document.visibilityState === "hidden";
    if (this.$j) {
      this.stop();
      this.play();
    }
  }
}

NoReactInternals.validateFps;
NoReactInternals.validateDimension;
NoReactInternals.validateDurationInFrames;

class RemotionProvider {
  constructor(container) {
    this.container = container;
    this.$$PROVIDER_TYPE = "REMOTION";
    this.scope = createScope();
    this.db = signal(null);
    this.mk = false;
    this.Ga = 0;
    this.Ha = new TimeRange(0, 0);
    this.fk = null;
    this.Db = signal(false);
    this.Wj = null;
    this.gk = signal([]);
    this.hk = signal([]);
    this.Yj = /* @__PURE__ */ new Set();
    this.ik = null;
    this.r = signal({ [REMOTION_PROVIDER_ID]: 0 });
    this.nk = new RemotionLayoutEngine();
    this.Vj = null;
    this.zk = {
      setFrame: this.Zj.bind(this),
      setPlaying: this.ok.bind(this)
    };
    this.Ak = {
      setMediaMuted: this.setMuted.bind(this),
      setMediaVolume: this.setVolume.bind(this)
    };
    this.render = () => {
      const $src = useSignal(this.db);
      if (!$src) {
        throw Error(
          "[vidstack]: no src"
        );
      }
      React.useEffect(() => {
        if (!isRemotionSource($src))
          return;
        const rafId = requestAnimationFrame(() => {
          if (!this.mk) {
            this.c("provider-setup", this);
            this.mk = true;
          }
          this.pk();
          tick();
          if (!this.Db())
            this.kc($src);
        });
        return () => cancelAnimationFrame(rafId);
      }, [$src]);
      const Component = Internals.useLazyComponent({
        component: $src.src
      });
      const { $state } = this.b, $volume = useSignal($state.volume), $isMuted = useSignal($state.muted);
      const mediaVolume = React.useMemo(() => {
        const { muted, volume } = this.b.$state;
        return { mediaMuted: muted(), mediaVolume: volume() };
      }, [$isMuted, $volume]);
      return /* @__PURE__ */ React.createElement(
        RemotionContextProvider,
        {
          src: $src,
          component: Component,
          timeline: this.ik,
          mediaVolume,
          setMediaVolume: this.Ak
        },
        /* @__PURE__ */ React.createElement(Internals.Timeline.SetTimelineContext.Provider, { value: this.zk }, React.createElement(this.renderVideo, { src: $src }))
      );
    };
    this.renderVideo = ({ src }) => {
      const video = Internals.useVideo(), Video = video ? video.component : null, audioContext = React.useContext(Internals.SharedAudioContext);
      const { $state } = this.b;
      useSignal(this.r);
      useSignal($state.playing);
      useSignal($state.playbackRate);
      React.useEffect(() => {
        this.fk = audioContext;
        return () => {
          this.fk = null;
        };
      }, [audioContext]);
      const LoadingContent = React.useMemo(() => src.renderLoading?.(), [src]);
      const Content = Video ? /* @__PURE__ */ React.createElement(ErrorBoundary, { fallback: src.errorFallback, onError: src.onError }, /* @__PURE__ */ React.createElement(Internals.ClipComposition, null, /* @__PURE__ */ React.createElement(Video, { ...video?.props, ...src.inputProps }))) : null;
      return /* @__PURE__ */ React.createElement(React.Suspense, { fallback: LoadingContent }, Content);
    };
    this.nk.setContainer(container);
  }
  get c() {
    return this.b.delegate.c;
  }
  get type() {
    return "remotion";
  }
  get currentSrc() {
    return peek(this.db);
  }
  get frame() {
    return this.r();
  }
  setup(ctx) {
    this.b = ctx;
    effect(this.Bk.bind(this));
    effect(this.Ck.bind(this));
    effect(this.Dk.bind(this));
  }
  Ck() {
    this.gk();
    this.pk();
  }
  pk() {
    const elements = [...this.container.querySelectorAll("audio,video")];
    this.hk.set(elements);
  }
  Dk() {
    const elements = this.hk();
    for (const tag of elements) {
      const onWait = this.qk.bind(this, tag), onStopWaiting = this.rk.bind(this, tag);
      if (tag.currentSrc && tag.readyState < 4) {
        this.qk(tag);
        listenEvent(tag, "canplay", onStopWaiting);
      }
      listenEvent(tag, "waiting", onWait);
      listenEvent(tag, "playing", onStopWaiting);
    }
    for (const el of this.Yj) {
      if (!elements.includes(el))
        this.rk(el);
    }
  }
  ck(frame) {
    const { inFrame, fps } = this.db(), { seeking } = this.b.$state, time = Math.max(0, frame - inFrame) / fps;
    this.r.set((record) => ({
      ...record,
      [REMOTION_PROVIDER_ID]: frame
    }));
    this.c("time-update", {
      currentTime: time,
      played: this.Ek(time)
    });
    if (seeking()) {
      tick();
      this.c("seeked", time);
    }
  }
  Fk() {
    this.pause();
    this.c("end");
  }
  async play() {
    const { paused, ended } = this.b.$state;
    if (!peek(paused))
      return;
    if (peek(ended)) {
      this.Zj({ [REMOTION_PROVIDER_ID]: 0 });
    }
    try {
      const mediaElements = peek(this.hk);
      if (mediaElements.length) {
        await Promise.all(mediaElements.map((media) => media.play()));
      }
      this.c("play");
      tick();
      if (this.Wj) {
        this.c("waiting");
        return this.Wj.promise;
      } else {
        this.Vj?.play();
        this.c("playing");
      }
    } catch (error) {
      throw error;
    }
  }
  async pause() {
    const { paused } = this.b.$state;
    if (peek(paused))
      return;
    this.Vj?.stop();
    this.c("pause");
  }
  setMuted(value) {
    if (!this.b)
      return;
    const { muted, volume } = this.b.$state;
    if (isFunction(value)) {
      this.setMuted(value(muted()));
      return;
    }
    this.c("volume-change", {
      volume: peek(volume),
      muted: value
    });
  }
  setCurrentTime(time) {
    const { fps } = this.db(), frame = time * fps;
    this.Zj({ [REMOTION_PROVIDER_ID]: frame });
  }
  setVolume(value) {
    if (!this.b)
      return;
    const { volume, muted } = this.b.$state;
    if (isFunction(value)) {
      this.setVolume(value(volume()));
      return;
    }
    this.c("volume-change", {
      volume: value,
      muted: peek(muted)
    });
  }
  setPlaybackRate(rate) {
    if (isFunction(rate)) {
      const { playbackRate } = this.b.$state;
      this.setPlaybackRate(rate(peek(playbackRate)));
      return;
    }
    this.Vj?.setPlaybackRate(rate);
    this.c("rate-change", rate);
  }
  Ek(currentTime) {
    return this.Ga >= currentTime ? this.Ha : this.Ha = new TimeRange(0, this.Ga = currentTime);
  }
  async loadSource(src) {
    if (!isRemotionSource(src))
      return;
    const onUserError = src.onError, resolvedSrc = {
      compositionWidth: 1920,
      compositionHeight: 1080,
      fps: 30,
      initialFrame: 0,
      inFrame: 0,
      outFrame: src.durationInFrames,
      numberOfSharedAudioTags: 5,
      inputProps: {},
      ...src,
      onError: (error) => {
        this.pause();
        this.c("error", {
          message: error.message,
          code: 1
        });
        onUserError?.(error);
      }
    };
    this.db.set(resolvedSrc);
    for (const prop of Object.keys(resolvedSrc)) {
      src[prop] = resolvedSrc[prop];
    }
    this.changeSrc(resolvedSrc);
  }
  destroy() {
    this.changeSrc(null);
  }
  changeSrc(src) {
    this.Vj?.destroy();
    this.Ga = 0;
    this.Ha = new TimeRange(0, 0);
    this.Db.set(false);
    this.Wj?.reject("src changed");
    this.Wj = null;
    this.fk = null;
    this.ik = null;
    this.Vj = null;
    this.gk.set([]);
    this.Yj.clear();
    this.r.set({ [REMOTION_PROVIDER_ID]: 0 });
    this.nk.setSrc(src);
    if (src) {
      this.ik = this.Gk();
      this.Vj = new RemotionPlaybackEngine(
        src,
        this.ck.bind(this),
        this.Fk.bind(this)
      );
    }
  }
  kc(src) {
    if (!src)
      return;
    const { outFrame, inFrame, fps } = src, duration = (outFrame - inFrame) / fps;
    this.b.delegate.kc({
      duration,
      seekable: new TimeRange(0, duration),
      buffered: new TimeRange(0, duration)
    });
    if (src.initialFrame) {
      this.Zj({
        [REMOTION_PROVIDER_ID]: src.initialFrame
      });
    }
  }
  qk(el) {
    this.Yj.add(el);
    this.Db.set(true);
    if (!this.Wj) {
      this.Wj = deferredPromise();
    }
  }
  rk(el) {
    this.Yj.delete(el);
    if (this.Yj.size)
      return;
    this.Db.set(false);
    this.Wj?.resolve();
    this.Wj = null;
    const { canPlay } = this.b.$state;
    if (!peek(canPlay)) {
      this.kc(peek(this.db));
    }
  }
  Bk() {
    this.Db();
    const { paused } = this.b.$state;
    if (peek(paused))
      return;
    if (this.Db()) {
      this.Vj?.stop();
      this.c("waiting");
    } else {
      this.Vj?.play();
      this.c("playing");
    }
  }
  Zj(value) {
    if (isFunction(value)) {
      this.Zj(value(this.r()));
      return;
    }
    this.r.set((record) => ({ ...record, ...value }));
    const nextFrame = value[REMOTION_PROVIDER_ID];
    if (this.Vj && this.Vj.frame !== nextFrame) {
      this.Vj.frame = nextFrame;
    }
  }
  ok(value) {
    const { playing } = this.b.$state;
    if (isFunction(value)) {
      this.ok(value(playing()));
      return;
    }
    if (value) {
      this.play();
    } else if (!value) {
      this.pause();
    }
  }
  Gk() {
    const { playing, playbackRate } = this.b.$state, frame = this.r, mediaTags = this.gk, setPlaybackRate = this.setPlaybackRate.bind(this);
    return {
      rootId: REMOTION_PROVIDER_ID,
      get frame() {
        return frame();
      },
      get playing() {
        return playing();
      },
      get playbackRate() {
        return playbackRate();
      },
      imperativePlaying: {
        get current() {
          return playing();
        }
      },
      setPlaybackRate,
      audioAndVideoTags: {
        get current() {
          return mediaTags();
        },
        set current(tags) {
          mediaTags.set(tags);
        }
      }
    };
  }
}

export { RemotionProvider };
