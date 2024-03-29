"use client"

import * as React from 'react';
import { v as createDisposalBin, l as listenEvent, c as isNumber, i as isUndefined, w as isNull, r as isNil, d as createScope, s as signal, a as useSignal, x as tick, p as peek, e as effect, n as isFunction, j as deferredPromise } from './vidstack-HvwwRO6V.js';
import { Composition, Internals } from 'remotion';
import { T as TimeRange, k as isRemotionSource } from './vidstack-6eSzbFhe.js';
import { R as RemotionLayoutEngine, a as RemotionContextProvider, E as ErrorBoundary, b as REMOTION_PROVIDER_ID } from '../player/vidstack-remotion.js';
import { NoReactInternals } from 'remotion/no-react';
import './vidstack-AfkrbX7B.js';
import './vidstack-ggjrSlGx.js';

class RemotionPlaybackEngine {
  constructor(_src, _onFrameChange, _onEnd) {
    this._src = _src;
    this._onFrameChange = _onFrameChange;
    this._onEnd = _onEnd;
    this._disposal = createDisposalBin();
    this._frame = 0;
    this._framesAdvanced = 0;
    this._playbackRate = 1;
    this._playing = false;
    this._rafId = -1;
    this._timerId = -1;
    this._startedAt = 0;
    this._isRunningInBackground = false;
    this._tick = () => {
      this._update();
      if (this._playing) {
        this._queueNextFrame(this._tick);
      }
    };
    this._frame = _src.initialFrame ?? 0;
    this._disposal.add(
      listenEvent(document, "visibilitychange", this._onVisibilityChange.bind(this))
    );
  }
  get frame() {
    return this._frame;
  }
  set frame(frame) {
    this._frame = frame;
    this._onFrameChange(frame);
  }
  play() {
    this._framesAdvanced = 0;
    this._playing = true;
    this._startedAt = performance.now();
    this._tick();
  }
  stop() {
    this._playing = false;
    if (this._rafId >= 0) {
      cancelAnimationFrame(this._rafId);
      this._rafId = -1;
    }
    if (this._timerId >= 0) {
      clearTimeout(this._timerId);
      this._timerId = -1;
    }
  }
  setPlaybackRate(rate) {
    this._playbackRate = rate;
  }
  destroy() {
    this._disposal.empty();
    this.stop();
  }
  _update() {
    const { nextFrame, framesToAdvance, ended } = this._calculateNextFrame();
    this._framesAdvanced += framesToAdvance;
    if (nextFrame !== this._frame) {
      this._onFrameChange(nextFrame);
      this._frame = nextFrame;
    }
    if (ended) {
      this._frame = this._src.outFrame;
      this.stop();
      this._onEnd();
    }
  }
  _queueNextFrame(callback) {
    if (this._isRunningInBackground) {
      this._timerId = window.setTimeout(callback, 1e3 / this._src.fps);
    } else {
      this._rafId = requestAnimationFrame(callback);
    }
  }
  _calculateNextFrame() {
    const round = this._playbackRate < 0 ? Math.ceil : Math.floor, time = performance.now() - this._startedAt, framesToAdvance = round(time * this._playbackRate / (1e3 / this._src.fps)) - this._framesAdvanced, nextFrame = framesToAdvance + this._frame, isCurrentFrameOutOfBounds = this._frame > this._src.outFrame || this._frame < this._src.inFrame, isNextFrameOutOfBounds = nextFrame > this._src.outFrame || nextFrame < this._src.inFrame, ended = isNextFrameOutOfBounds && !isCurrentFrameOutOfBounds;
    if (this._playbackRate > 0 && !ended) {
      if (isNextFrameOutOfBounds) {
        return {
          nextFrame: this._src.inFrame,
          framesToAdvance,
          ended
        };
      }
      return { nextFrame, framesToAdvance, ended };
    }
    if (isNextFrameOutOfBounds) {
      return {
        nextFrame: this._src.outFrame,
        framesToAdvance,
        ended
      };
    }
    return { nextFrame, framesToAdvance, ended };
  }
  _onVisibilityChange() {
    this._isRunningInBackground = document.visibilityState === "hidden";
    if (this._playing) {
      this.stop();
      this.play();
    }
  }
}

function validateRemotionResource({
  src,
  compositionWidth: width,
  compositionHeight: height,
  fps,
  durationInFrames,
  initialFrame,
  inFrame,
  outFrame,
  numberOfSharedAudioTags
}) {
  validateComponent(src);
  validateInitialFrame(initialFrame, durationInFrames);
  validateDimension(width, "compositionWidth", "of the remotion source");
  validateDimension(height, "compositionHeight", "of the remotion source");
  validateDurationInFrames(durationInFrames, {
    component: "of the remotion source",
    allowFloats: false
  });
  validateFps(fps, "of the remotion source", false);
  validateInOutFrames(inFrame, outFrame, durationInFrames);
  validateSharedNumberOfAudioTags(numberOfSharedAudioTags);
}
const validateFps = NoReactInternals.validateFps;
const validateDimension = NoReactInternals.validateDimension;
const validateDurationInFrames = NoReactInternals.validateDurationInFrames;
function validateInitialFrame(initialFrame, frames) {
  if (!isNumber(frames)) {
    throw new Error(
      `[vidstack]: \`durationInFrames\` must be a number, but is ${JSON.stringify(frames)}`
    );
  }
  if (isUndefined(initialFrame)) {
    return;
  }
  if (!isNumber(initialFrame)) {
    throw new Error(
      `[vidstack]: \`initialFrame\` must be a number, but is ${JSON.stringify(initialFrame)}`
    );
  }
  if (Number.isNaN(initialFrame)) {
    throw new Error(`[vidstack]: \`initialFrame\` must be a number, but is NaN`);
  }
  if (!Number.isFinite(initialFrame)) {
    throw new Error(`[vidstack]: \`initialFrame\` must be a number, but is Infinity`);
  }
  if (initialFrame % 1 !== 0) {
    throw new Error(
      `[vidstack]: \`initialFrame\` must be an integer, but is ${JSON.stringify(initialFrame)}`
    );
  }
  if (initialFrame > frames - 1) {
    throw new Error(
      `[vidstack]: \`initialFrame\` must be less or equal than \`durationInFrames - 1\`, but is ${JSON.stringify(
        initialFrame
      )}`
    );
  }
}
function validateSingleFrame(frame, variableName) {
  if (isNil(frame)) {
    return frame ?? null;
  }
  if (!isNumber(frame)) {
    throw new TypeError(
      `[vidstack]: \`${variableName}\` must be a number, but is ${JSON.stringify(frame)}`
    );
  }
  if (Number.isNaN(frame)) {
    throw new TypeError(
      `[vidstack]: \`${variableName}\` must not be NaN, but is ${JSON.stringify(frame)}`
    );
  }
  if (!Number.isFinite(frame)) {
    throw new TypeError(
      `[vidstack]: \`${variableName}\` must be finite, but is ${JSON.stringify(frame)}`
    );
  }
  if (frame % 1 !== 0) {
    throw new TypeError(
      `[vidstack]: \`${variableName}\` must be an integer, but is ${JSON.stringify(frame)}`
    );
  }
  return frame;
}
function validateInOutFrames(inFrame, outFrame, frames) {
  const validatedInFrame = validateSingleFrame(inFrame, "inFrame"), validatedOutFrame = validateSingleFrame(outFrame, "outFrame");
  if (isNull(validatedInFrame) && isNull(validatedOutFrame)) {
    return;
  }
  if (!isNull(validatedInFrame) && validatedInFrame > frames - 1) {
    throw new Error(
      `[vidstack]: \`inFrame\` must be less than (durationInFrames - 1), but is \`${validatedInFrame}\``
    );
  }
  if (!isNull(validatedOutFrame) && validatedOutFrame > frames) {
    throw new Error(
      `[vidstack]: \`outFrame\` must be less than (durationInFrames), but is \`${validatedOutFrame}\``
    );
  }
  if (!isNull(validatedInFrame) && validatedInFrame < 0) {
    throw new Error(
      `[vidstack]: \`inFrame\` must be greater than 0, but is \`${validatedInFrame}\``
    );
  }
  if (!isNull(validatedOutFrame) && validatedOutFrame <= 0) {
    throw new Error(
      `[vidstack]: \`outFrame\` must be greater than 0, but is \`${validatedOutFrame}\`. If you want to render a single frame, use \`<RemotionThumbnail />\` instead.`
    );
  }
  if (!isNull(validatedOutFrame) && !isNull(validatedInFrame) && validatedOutFrame <= validatedInFrame) {
    throw new Error(
      "[vidstack]: `outFrame` must be greater than `inFrame`, but is " + validatedOutFrame + " <= " + validatedInFrame
    );
  }
}
function validateSharedNumberOfAudioTags(tags) {
  if (isUndefined(tags))
    return;
  if (tags % 1 !== 0 || !Number.isFinite(tags) || Number.isNaN(tags) || tags < 0) {
    throw new TypeError(
      `[vidstack]: \`numberOfSharedAudioTags\` must be an integer but got \`${tags}\` instead`
    );
  }
}
function validatePlaybackRate(playbackRate) {
  if (playbackRate > 4) {
    throw new Error(
      `[vidstack]: The highest possible playback rate with Remotion is 4. You passed: ${playbackRate}`
    );
  }
  if (playbackRate < -4) {
    throw new Error(
      `[vidstack]: The lowest possible playback rate with Remotion is -4. You passed: ${playbackRate}`
    );
  }
  if (playbackRate === 0) {
    throw new Error(`[vidstack]: A playback rate of 0 is not supported.`);
  }
}
function validateComponent(src) {
  if (src.type === Composition) {
    throw new TypeError(
      `[vidstack]: \`src\` should not be an instance of \`<Composition/>\`. Pass the React component directly, and set the duration, fps and dimensions as source props.`
    );
  }
  if (src === Composition) {
    throw new TypeError(
      `[vidstack]: \`src\` must not be the \`Composition\` component. Pass your own React component directly, and set the duration, fps and dimensions as source props.`
    );
  }
}

class RemotionProvider {
  constructor(container) {
    this.container = container;
    this.$$PROVIDER_TYPE = "REMOTION";
    this.scope = createScope();
    this._src = signal(null);
    this._setup = false;
    this._played = 0;
    this._playedRange = new TimeRange(0, 0);
    this._audio = null;
    this._waiting = signal(false);
    this._waitingPromise = null;
    this._mediaTags = signal([]);
    this._mediaElements = signal([]);
    this._bufferingElements = /* @__PURE__ */ new Set();
    this._timeline = null;
    this._frame = signal({ [REMOTION_PROVIDER_ID]: 0 });
    this._layoutEngine = new RemotionLayoutEngine();
    this._playbackEngine = null;
    this._setTimeline = {
      setFrame: this._setFrame.bind(this),
      setPlaying: this._setPlaying.bind(this)
    };
    this._setMediaVolume = {
      setMediaMuted: this.setMuted.bind(this),
      setMediaVolume: this.setVolume.bind(this)
    };
    this.render = () => {
      const $src = useSignal(this._src);
      if (!$src) {
        throw Error(
          "[vidstack]: attempting to render remotion provider without src" 
        );
      }
      React.useEffect(() => {
        if (!isRemotionSource($src))
          return;
        validateRemotionResource($src);
        const rafId = requestAnimationFrame(() => {
          if (!this._setup) {
            this._notify("provider-setup", this);
            this._setup = true;
          }
          this._discoverMediaElements();
          tick();
          if (!this._waiting())
            this._ready($src);
        });
        return () => cancelAnimationFrame(rafId);
      }, [$src]);
      const Component = Internals.useLazyComponent({
        component: $src.src
      });
      const { $state } = this._ctx, $volume = useSignal($state.volume), $isMuted = useSignal($state.muted);
      const mediaVolume = React.useMemo(() => {
        const { muted, volume } = this._ctx.$state;
        return { mediaMuted: muted(), mediaVolume: volume() };
      }, [$isMuted, $volume]);
      return /* @__PURE__ */ React.createElement(
        RemotionContextProvider,
        {
          src: $src,
          component: Component,
          timeline: this._timeline,
          mediaVolume,
          setMediaVolume: this._setMediaVolume
        },
        /* @__PURE__ */ React.createElement(Internals.Timeline.SetTimelineContext.Provider, { value: this._setTimeline }, React.createElement(this.renderVideo, { src: $src }))
      );
    };
    this.renderVideo = ({ src }) => {
      const video = Internals.useVideo(), Video = video ? video.component : null, audioContext = React.useContext(Internals.SharedAudioContext);
      const { $state } = this._ctx;
      useSignal(this._frame);
      useSignal($state.playing);
      useSignal($state.playbackRate);
      React.useEffect(() => {
        this._audio = audioContext;
        return () => {
          this._audio = null;
        };
      }, [audioContext]);
      const LoadingContent = React.useMemo(() => src.renderLoading?.(), [src]);
      const Content = Video ? /* @__PURE__ */ React.createElement(ErrorBoundary, { fallback: src.errorFallback, onError: src.onError }, /* @__PURE__ */ React.createElement(Internals.ClipComposition, null, /* @__PURE__ */ React.createElement(Video, { ...video?.props, ...src.inputProps }))) : null;
      return /* @__PURE__ */ React.createElement(React.Suspense, { fallback: LoadingContent }, Content);
    };
    this._layoutEngine.setContainer(container);
  }
  get _notify() {
    return this._ctx.delegate._notify;
  }
  get type() {
    return "remotion";
  }
  get currentSrc() {
    return peek(this._src);
  }
  get frame() {
    return this._frame();
  }
  setup(ctx) {
    this._ctx = ctx;
    effect(this._watchWaiting.bind(this));
    effect(this._watchMediaTags.bind(this));
    effect(this._watchMediaElements.bind(this));
  }
  _watchMediaTags() {
    this._mediaTags();
    this._discoverMediaElements();
  }
  _discoverMediaElements() {
    const elements = [...this.container.querySelectorAll("audio,video")];
    this._mediaElements.set(elements);
  }
  _watchMediaElements() {
    const elements = this._mediaElements();
    for (const tag of elements) {
      const onWait = this._onWaitFor.bind(this, tag), onStopWaiting = this._onStopWaitingFor.bind(this, tag);
      if (tag.currentSrc && tag.readyState < 4) {
        this._onWaitFor(tag);
        listenEvent(tag, "canplay", onStopWaiting);
      }
      listenEvent(tag, "waiting", onWait);
      listenEvent(tag, "playing", onStopWaiting);
    }
    for (const el of this._bufferingElements) {
      if (!elements.includes(el))
        this._onStopWaitingFor(el);
    }
  }
  _onFrameChange(frame) {
    const { inFrame, fps } = this._src(), { seeking } = this._ctx.$state, time = Math.max(0, frame - inFrame) / fps;
    this._frame.set((record) => ({
      ...record,
      [REMOTION_PROVIDER_ID]: frame
    }));
    this._notify("time-update", {
      currentTime: time,
      played: this._getPlayedRange(time)
    });
    if (seeking()) {
      tick();
      this._notify("seeked", time);
    }
  }
  _onFrameEnd() {
    this.pause();
    this._notify("end");
  }
  async play() {
    const { paused, ended } = this._ctx.$state;
    if (!peek(paused))
      return;
    if (peek(ended)) {
      this._setFrame({ [REMOTION_PROVIDER_ID]: 0 });
    }
    try {
      const mediaElements = peek(this._mediaElements);
      if (mediaElements.length) {
        await Promise.all(mediaElements.map((media) => media.play()));
      }
      this._notify("play");
      tick();
      if (this._waitingPromise) {
        this._notify("waiting");
        return this._waitingPromise.promise;
      } else {
        this._playbackEngine?.play();
        this._notify("playing");
      }
    } catch (error) {
      throw error;
    }
  }
  async pause() {
    const { paused } = this._ctx.$state;
    if (peek(paused))
      return;
    this._playbackEngine?.stop();
    this._notify("pause");
  }
  setMuted(value) {
    if (!this._ctx)
      return;
    const { muted, volume } = this._ctx.$state;
    if (isFunction(value)) {
      this.setMuted(value(muted()));
      return;
    }
    this._notify("volume-change", {
      volume: peek(volume),
      muted: value
    });
  }
  setCurrentTime(time) {
    const { fps } = this._src(), frame = time * fps;
    this._setFrame({ [REMOTION_PROVIDER_ID]: frame });
  }
  setVolume(value) {
    if (!this._ctx)
      return;
    const { volume, muted } = this._ctx.$state;
    if (isFunction(value)) {
      this.setVolume(value(volume()));
      return;
    }
    this._notify("volume-change", {
      volume: value,
      muted: peek(muted)
    });
  }
  setPlaybackRate(rate) {
    if (isFunction(rate)) {
      const { playbackRate } = this._ctx.$state;
      this.setPlaybackRate(rate(peek(playbackRate)));
      return;
    }
    validatePlaybackRate(rate);
    this._playbackEngine?.setPlaybackRate(rate);
    this._notify("rate-change", rate);
  }
  _getPlayedRange(currentTime) {
    return this._played >= currentTime ? this._playedRange : this._playedRange = new TimeRange(0, this._played = currentTime);
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
        {
          this._ctx.logger?.errorGroup(error.message).labelledLog("Source", peek(this._src)).labelledLog("Error", error).dispatch();
        }
        this.pause();
        this._notify("error", {
          message: error.message,
          code: 1
        });
        onUserError?.(error);
      }
    };
    this._src.set(resolvedSrc);
    for (const prop of Object.keys(resolvedSrc)) {
      src[prop] = resolvedSrc[prop];
    }
    this.changeSrc(resolvedSrc);
  }
  destroy() {
    this.changeSrc(null);
  }
  changeSrc(src) {
    this._playbackEngine?.destroy();
    this._played = 0;
    this._playedRange = new TimeRange(0, 0);
    this._waiting.set(false);
    this._waitingPromise?.reject("src changed");
    this._waitingPromise = null;
    this._audio = null;
    this._timeline = null;
    this._playbackEngine = null;
    this._mediaTags.set([]);
    this._bufferingElements.clear();
    this._frame.set({ [REMOTION_PROVIDER_ID]: 0 });
    this._layoutEngine.setSrc(src);
    if (src) {
      this._timeline = this._createTimelineContextValue();
      this._playbackEngine = new RemotionPlaybackEngine(
        src,
        this._onFrameChange.bind(this),
        this._onFrameEnd.bind(this)
      );
    }
  }
  _ready(src) {
    if (!src)
      return;
    const { outFrame, inFrame, fps } = src, duration = (outFrame - inFrame) / fps;
    this._ctx.delegate._ready({
      duration,
      seekable: new TimeRange(0, duration),
      buffered: new TimeRange(0, duration)
    });
    if (src.initialFrame) {
      this._setFrame({
        [REMOTION_PROVIDER_ID]: src.initialFrame
      });
    }
  }
  _onWaitFor(el) {
    this._bufferingElements.add(el);
    this._waiting.set(true);
    if (!this._waitingPromise) {
      this._waitingPromise = deferredPromise();
    }
  }
  _onStopWaitingFor(el) {
    this._bufferingElements.delete(el);
    if (this._bufferingElements.size)
      return;
    this._waiting.set(false);
    this._waitingPromise?.resolve();
    this._waitingPromise = null;
    const { canPlay } = this._ctx.$state;
    if (!peek(canPlay)) {
      this._ready(peek(this._src));
    }
  }
  _watchWaiting() {
    this._waiting();
    const { paused } = this._ctx.$state;
    if (peek(paused))
      return;
    if (this._waiting()) {
      this._playbackEngine?.stop();
      this._notify("waiting");
    } else {
      this._playbackEngine?.play();
      this._notify("playing");
    }
  }
  _setFrame(value) {
    if (isFunction(value)) {
      this._setFrame(value(this._frame()));
      return;
    }
    this._frame.set((record) => ({ ...record, ...value }));
    const nextFrame = value[REMOTION_PROVIDER_ID];
    if (this._playbackEngine && this._playbackEngine.frame !== nextFrame) {
      this._playbackEngine.frame = nextFrame;
    }
  }
  _setPlaying(value) {
    const { playing } = this._ctx.$state;
    if (isFunction(value)) {
      this._setPlaying(value(playing()));
      return;
    }
    if (value) {
      this.play();
    } else if (!value) {
      this.pause();
    }
  }
  _createTimelineContextValue() {
    const { playing, playbackRate } = this._ctx.$state, frame = this._frame, mediaTags = this._mediaTags, setPlaybackRate = this.setPlaybackRate.bind(this);
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
