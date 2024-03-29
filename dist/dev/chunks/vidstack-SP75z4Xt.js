"use client"

import * as React from 'react';
import { D as DOMEvent, N as EventsTarget, V as ViewController, l as listenEvent, q as onDispose, n as isFunction, i as isUndefined, O as waitTimeout, s as signal, p as peek, k as isArray, c as isNumber, S as State, x as tick, P as createContext, Q as useContext, w as isNull, f as isString, j as deferredPromise, R as Component, e as effect, L as isKeyboardClick, T as isTouchEvent, y as scoped, U as setStyle, t as setAttribute, W as getScope, M as isKeyboardEvent, X as computed, Y as root, Z as unwrap, _ as kebabToCamelCase, m as camelToKebabCase, $ as waitIdlePeriod, a0 as provideContext, z as animationFrameThrottle, a1 as uppercaseFirstChar, a2 as prop, a3 as method, A as noop, a4 as ariaBool$1, a5 as isWriteSignal, a6 as hasProvidedContext, a7 as useState, d as createScope, K as isPointerEvent, a8 as isMouseEvent, v as createDisposalBin, E as composeRefs, u as useStateContext, a as useSignal, b as useSignalRecord } from './vidstack-HvwwRO6V.js';

var _a$2;
const GROUPED_LOG = Symbol("GROUPED_LOG" );
const _GroupedLog = class _GroupedLog {
  constructor(logger, level, title, root, parent) {
    this.logger = logger;
    this.level = level;
    this.title = title;
    this.root = root;
    this.parent = parent;
    this[_a$2] = true;
    this.logs = [];
  }
  log(...data) {
    this.logs.push({ data });
    return this;
  }
  labelledLog(label, ...data) {
    this.logs.push({ label, data });
    return this;
  }
  groupStart(title) {
    return new _GroupedLog(this.logger, this.level, title, this.root ?? this, this);
  }
  groupEnd() {
    this.parent?.logs.push(this);
    return this.parent ?? this;
  }
  dispatch() {
    return this.logger.dispatch(this.level, this.root ?? this);
  }
};
_a$2 = GROUPED_LOG;
let GroupedLog = _GroupedLog;
function isGroupedLog(data) {
  return !!data?.[GROUPED_LOG];
}

class Logger {
  constructor() {
    this._target = null;
  }
  error(...data) {
    return this.dispatch("error", ...data);
  }
  warn(...data) {
    return this.dispatch("warn", ...data);
  }
  info(...data) {
    return this.dispatch("info", ...data);
  }
  debug(...data) {
    return this.dispatch("debug", ...data);
  }
  errorGroup(title) {
    return new GroupedLog(this, "error", title);
  }
  warnGroup(title) {
    return new GroupedLog(this, "warn", title);
  }
  infoGroup(title) {
    return new GroupedLog(this, "info", title);
  }
  debugGroup(title) {
    return new GroupedLog(this, "debug", title);
  }
  setTarget(newTarget) {
    this._target = newTarget;
  }
  dispatch(level, ...data) {
    return this._target?.dispatchEvent(
      new DOMEvent("vds-log", {
        bubbles: true,
        composed: true,
        detail: { level, data }
      })
    ) || false;
  }
}

const ADD = Symbol("LIST_ADD" ), REMOVE = Symbol("LIST_REMOVE" ), RESET = Symbol("LIST_RESET" ), SELECT = Symbol("LIST_SELECT" ), READONLY = Symbol("LIST_READONLY" ), SET_READONLY = Symbol("LIST_SET_READONLY" ), ON_RESET = Symbol("LIST_ON_RESET" ), ON_REMOVE = Symbol("LIST_ON_REMOVE" ), ON_USER_SELECT = Symbol("LIST_ON_USER_SELECT" );
const ListSymbol = {
  _add: ADD,
  _remove: REMOVE,
  _reset: RESET,
  _select: SELECT,
  _readonly: READONLY,
  _setReadonly: SET_READONLY,
  _onReset: ON_RESET,
  _onRemove: ON_REMOVE,
  _onUserSelect: ON_USER_SELECT
};

var _a$1;
class List extends EventsTarget {
  constructor() {
    super(...arguments);
    this._items = [];
    /* @internal */
    this[_a$1] = false;
  }
  get length() {
    return this._items.length;
  }
  get readonly() {
    return this[ListSymbol._readonly];
  }
  /**
   * Transform list to an array.
   */
  toArray() {
    return [...this._items];
  }
  [(_a$1 = ListSymbol._readonly, Symbol.iterator)]() {
    return this._items.values();
  }
  /* @internal */
  [ListSymbol._add](item, trigger) {
    const index = this._items.length;
    if (!("" + index in this)) {
      Object.defineProperty(this, index, {
        get() {
          return this._items[index];
        }
      });
    }
    if (this._items.includes(item))
      return;
    this._items.push(item);
    this.dispatchEvent(new DOMEvent("add", { detail: item, trigger }));
  }
  /* @internal */
  [ListSymbol._remove](item, trigger) {
    const index = this._items.indexOf(item);
    if (index >= 0) {
      this[ListSymbol._onRemove]?.(item, trigger);
      this._items.splice(index, 1);
      this.dispatchEvent(new DOMEvent("remove", { detail: item, trigger }));
    }
  }
  /* @internal */
  [ListSymbol._reset](trigger) {
    for (const item of [...this._items])
      this[ListSymbol._remove](item, trigger);
    this._items = [];
    this[ListSymbol._setReadonly](false, trigger);
    this[ListSymbol._onReset]?.();
  }
  /* @internal */
  [ListSymbol._setReadonly](readonly, trigger) {
    if (this[ListSymbol._readonly] === readonly)
      return;
    this[ListSymbol._readonly] = readonly;
    this.dispatchEvent(new DOMEvent("readonly-change", { detail: readonly, trigger }));
  }
}

var key = {
  fullscreenEnabled: 0,
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5,
  fullscreen: 6
};
var webkit = [
  "webkitFullscreenEnabled",
  "webkitFullscreenElement",
  "webkitRequestFullscreen",
  "webkitExitFullscreen",
  "webkitfullscreenchange",
  "webkitfullscreenerror",
  "-webkit-full-screen"
];
var moz = [
  "mozFullScreenEnabled",
  "mozFullScreenElement",
  "mozRequestFullScreen",
  "mozCancelFullScreen",
  "mozfullscreenchange",
  "mozfullscreenerror",
  "-moz-full-screen"
];
var ms$1 = [
  "msFullscreenEnabled",
  "msFullscreenElement",
  "msRequestFullscreen",
  "msExitFullscreen",
  "MSFullscreenChange",
  "MSFullscreenError",
  "-ms-fullscreen"
];
var document$1 = typeof window !== "undefined" && typeof window.document !== "undefined" ? window.document : {};
var vendor = "fullscreenEnabled" in document$1 && Object.keys(key) || webkit[0] in document$1 && webkit || moz[0] in document$1 && moz || ms$1[0] in document$1 && ms$1 || [];
var fscreen = {
  requestFullscreen: function(element) {
    return element[vendor[key.requestFullscreen]]();
  },
  requestFullscreenFunction: function(element) {
    return element[vendor[key.requestFullscreen]];
  },
  get exitFullscreen() {
    return document$1[vendor[key.exitFullscreen]].bind(document$1);
  },
  get fullscreenPseudoClass() {
    return ":" + vendor[key.fullscreen];
  },
  addEventListener: function(type, handler, options) {
    return document$1.addEventListener(vendor[key[type]], handler, options);
  },
  removeEventListener: function(type, handler, options) {
    return document$1.removeEventListener(vendor[key[type]], handler, options);
  },
  get fullscreenEnabled() {
    return Boolean(document$1[vendor[key.fullscreenEnabled]]);
  },
  set fullscreenEnabled(val) {
  },
  get fullscreenElement() {
    return document$1[vendor[key.fullscreenElement]];
  },
  set fullscreenElement(val) {
  },
  get onfullscreenchange() {
    return document$1[("on" + vendor[key.fullscreenchange]).toLowerCase()];
  },
  set onfullscreenchange(handler) {
    return document$1[("on" + vendor[key.fullscreenchange]).toLowerCase()] = handler;
  },
  get onfullscreenerror() {
    return document$1[("on" + vendor[key.fullscreenerror]).toLowerCase()];
  },
  set onfullscreenerror(handler) {
    return document$1[("on" + vendor[key.fullscreenerror]).toLowerCase()] = handler;
  }
};
var fscreen$1 = fscreen;

const CAN_FULLSCREEN = fscreen$1.fullscreenEnabled;
class FullscreenController extends ViewController {
  constructor() {
    super(...arguments);
    /**
     * Tracks whether we're the active fullscreen event listener. Fullscreen events can only be
     * listened to globally on the document so we need to know if they relate to the current host
     * element or not.
     */
    this._listening = false;
    this._active = false;
  }
  get active() {
    return this._active;
  }
  get supported() {
    return CAN_FULLSCREEN;
  }
  onConnect() {
    listenEvent(fscreen$1, "fullscreenchange", this._onFullscreenChange.bind(this));
    listenEvent(fscreen$1, "fullscreenerror", this._onFullscreenError.bind(this));
    onDispose(this._onDisconnect.bind(this));
  }
  async _onDisconnect() {
    if (CAN_FULLSCREEN)
      await this.exit();
  }
  _onFullscreenChange(event) {
    const active = isFullscreen(this.el);
    if (active === this._active)
      return;
    if (!active)
      this._listening = false;
    this._active = active;
    this.dispatch("fullscreen-change", { detail: active, trigger: event });
  }
  _onFullscreenError(event) {
    if (!this._listening)
      return;
    this.dispatch("fullscreen-error", { detail: null, trigger: event });
    this._listening = false;
  }
  async enter() {
    try {
      this._listening = true;
      if (!this.el || isFullscreen(this.el))
        return;
      assertFullscreenAPI();
      return fscreen$1.requestFullscreen(this.el);
    } catch (error) {
      this._listening = false;
      throw error;
    }
  }
  async exit() {
    if (!this.el || !isFullscreen(this.el))
      return;
    assertFullscreenAPI();
    return fscreen$1.exitFullscreen();
  }
}
function canFullscreen() {
  return CAN_FULLSCREEN;
}
function isFullscreen(host) {
  if (fscreen$1.fullscreenElement === host)
    return true;
  try {
    return host.matches(
      // @ts-expect-error - `fullscreenPseudoClass` is missing from `@types/fscreen`.
      fscreen$1.fullscreenPseudoClass
    );
  } catch (error) {
    return false;
  }
}
function assertFullscreenAPI() {
  if (CAN_FULLSCREEN)
    return;
  throw Error(
    "[vidstack] fullscreen API is not enabled or supported in this environment" 
  );
}

const IS_SERVER = typeof document === "undefined";

const UA = IS_SERVER ? "" : navigator?.userAgent.toLowerCase() || "";
const IS_IOS = !IS_SERVER && /iphone|ipad|ipod|ios|crios|fxios/i.test(UA);
const IS_IPHONE = !IS_SERVER && /(iphone|ipod)/gi.test(navigator?.platform || "");
const IS_CHROME = !IS_SERVER && !!window.chrome;
const IS_SAFARI = !IS_SERVER && (!!window.safari || IS_IOS);
function canOrientScreen() {
  return canRotateScreen() && isFunction(screen.orientation.unlock);
}
function canRotateScreen() {
  return !IS_SERVER && !isUndefined(window.screen.orientation) && !isUndefined(window.screen.orientation.lock);
}
function canPlayHLSNatively(video) {
  if (IS_SERVER)
    return false;
  if (!video)
    video = document.createElement("video");
  return video.canPlayType("application/vnd.apple.mpegurl").length > 0;
}
function canUsePictureInPicture(video) {
  if (IS_SERVER)
    return false;
  return !!document.pictureInPictureEnabled && !video.disablePictureInPicture;
}
function canUseVideoPresentation(video) {
  if (IS_SERVER)
    return false;
  return isFunction(video?.webkitSupportsPresentationMode) && isFunction(video?.webkitSetPresentationMode);
}
async function canChangeVolume() {
  const video = document.createElement("video");
  video.volume = 0.5;
  await waitTimeout(0);
  return video.volume === 0.5;
}
function getMediaSource() {
  return IS_SERVER ? void 0 : window?.MediaSource ?? window?.WebKitMediaSource;
}
function getSourceBuffer() {
  return IS_SERVER ? void 0 : window?.SourceBuffer ?? window?.WebKitSourceBuffer;
}
function isHLSSupported() {
  if (IS_SERVER)
    return false;
  const MediaSource = getMediaSource();
  if (isUndefined(MediaSource))
    return false;
  const isTypeSupported = MediaSource && isFunction(MediaSource.isTypeSupported) && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  const SourceBuffer = getSourceBuffer();
  const isSourceBufferValid = isUndefined(SourceBuffer) || !isUndefined(SourceBuffer.prototype) && isFunction(SourceBuffer.prototype.appendBuffer) && isFunction(SourceBuffer.prototype.remove);
  return !!isTypeSupported && !!isSourceBufferValid;
}

const _ScreenOrientationController = class _ScreenOrientationController extends ViewController {
  constructor() {
    super(...arguments);
    this._type = signal(this._getScreenOrientation());
    this._locked = signal(false);
  }
  /**
   * The current screen orientation type.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get type() {
    return this._type();
  }
  /**
   * Whether the screen orientation is currently locked.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get locked() {
    return this._locked();
  }
  /**
   * Whether the viewport is in a portrait orientation.
   *
   * @signal
   */
  get portrait() {
    return this._type().startsWith("portrait");
  }
  /**
   * Whether the viewport is in a landscape orientation.
   *
   * @signal
   */
  get landscape() {
    return this._type().startsWith("landscape");
  }
  /**
   * Whether the native Screen Orientation API is available.
   */
  get supported() {
    return _ScreenOrientationController.supported;
  }
  onConnect() {
    if (this.supported) {
      listenEvent(screen.orientation, "change", this._onOrientationChange.bind(this));
    } else {
      const query = window.matchMedia("(orientation: landscape)");
      query.onchange = this._onOrientationChange.bind(this);
      onDispose(() => query.onchange = null);
    }
    onDispose(this._onDisconnect.bind(this));
  }
  async _onDisconnect() {
    if (this.supported && this._locked())
      await this.unlock();
  }
  _onOrientationChange(event) {
    this._type.set(this._getScreenOrientation());
    this.dispatch("orientation-change", {
      detail: {
        orientation: peek(this._type),
        lock: this._currentLock
      },
      trigger: event
    });
  }
  /**
   * Locks the orientation of the screen to the desired orientation type using the
   * Screen Orientation API.
   *
   * @param lockType - The screen lock orientation type.
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  async lock(lockType) {
    if (peek(this._locked) || this._currentLock === lockType)
      return;
    this._assertScreenOrientationAPI();
    await screen.orientation.lock(lockType);
    this._locked.set(true);
    this._currentLock = lockType;
  }
  /**
   * Unlocks the orientation of the screen to it's default state using the Screen Orientation
   * API. This method will throw an error if the API is unavailable.
   *
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  async unlock() {
    if (!peek(this._locked))
      return;
    this._assertScreenOrientationAPI();
    this._currentLock = void 0;
    await screen.orientation.unlock();
    this._locked.set(false);
  }
  _assertScreenOrientationAPI() {
    if (this.supported)
      return;
    throw Error(
      "[vidstack] screen orientation API is not available" 
    );
  }
  _getScreenOrientation() {
    if (IS_SERVER)
      return "portrait-primary";
    if (this.supported)
      return window.screen.orientation.type;
    return window.innerWidth >= window.innerHeight ? "landscape-primary" : "portrait-primary";
  }
};
/**
 * Whether the native Screen Orientation API is available.
 */
_ScreenOrientationController.supported = canOrientScreen();
let ScreenOrientationController = _ScreenOrientationController;

class TimeRange {
  get length() {
    return this._ranges.length;
  }
  constructor(start, end) {
    if (isArray(start)) {
      this._ranges = start;
    } else if (!isUndefined(start) && !isUndefined(end)) {
      this._ranges = [[start, end]];
    } else {
      this._ranges = [];
    }
  }
  start(index) {
    throwIfEmpty(this._ranges.length);
    throwIfOutOfRange("start", index, this._ranges.length - 1);
    return this._ranges[index][0] ?? Infinity;
  }
  end(index) {
    throwIfEmpty(this._ranges.length);
    throwIfOutOfRange("end", index, this._ranges.length - 1);
    return this._ranges[index][1] ?? Infinity;
  }
}
function getTimeRangesStart(range) {
  if (!range.length)
    return null;
  let min = range.start(0);
  for (let i = 1; i < range.length; i++) {
    const value = range.start(i);
    if (value < min)
      min = value;
  }
  return min;
}
function getTimeRangesEnd(range) {
  if (!range.length)
    return null;
  let max = range.end(0);
  for (let i = 1; i < range.length; i++) {
    const value = range.end(i);
    if (value > max)
      max = value;
  }
  return max;
}
function throwIfEmpty(length) {
  if (!length)
    throw new Error("`TimeRanges` object is empty." );
}
function throwIfOutOfRange(fnName, index, end) {
  if (!isNumber(index) || index < 0 || index > end) {
    throw new Error(
      `Failed to execute '${fnName}' on 'TimeRanges': The index provided (${index}) is non-numeric or out of bounds (0-${end}).`
    );
  }
}

const mediaState = new State({
  audioTracks: [],
  audioTrack: null,
  autoplay: false,
  autoplayError: null,
  buffered: new TimeRange(),
  duration: 0,
  canLoad: false,
  canFullscreen: false,
  canOrientScreen: canOrientScreen(),
  canPictureInPicture: false,
  canPlay: false,
  controls: false,
  controlsVisible: false,
  crossorigin: null,
  currentTime: 0,
  ended: false,
  error: null,
  fullscreen: false,
  loop: false,
  logLevel: "warn" ,
  mediaType: "unknown",
  muted: false,
  paused: true,
  played: new TimeRange(),
  playing: false,
  playsinline: false,
  pictureInPicture: false,
  preload: "metadata",
  playbackRate: 1,
  qualities: [],
  quality: null,
  autoQuality: false,
  canSetQuality: true,
  canSetPlaybackRate: true,
  canSetVolume: false,
  seekable: new TimeRange(),
  seeking: false,
  source: { src: "", type: "" },
  sources: [],
  started: false,
  textTracks: [],
  textTrack: null,
  volume: 1,
  waiting: false,
  get title() {
    return this.providedTitle || this.inferredTitle;
  },
  get poster() {
    return this.providedPoster || this.inferredPoster;
  },
  get viewType() {
    return this.providedViewType !== "unknown" ? this.providedViewType : this.inferredViewType;
  },
  get streamType() {
    return this.providedStreamType !== "unknown" ? this.providedStreamType : this.inferredStreamType;
  },
  get currentSrc() {
    return this.source;
  },
  get bufferedStart() {
    return getTimeRangesStart(this.buffered) ?? 0;
  },
  get bufferedEnd() {
    return getTimeRangesEnd(this.buffered) ?? 0;
  },
  get seekableStart() {
    return getTimeRangesStart(this.seekable) ?? 0;
  },
  get seekableEnd() {
    return this.canPlay ? getTimeRangesEnd(this.seekable) ?? Infinity : 0;
  },
  get seekableWindow() {
    return Math.max(0, this.seekableEnd - this.seekableStart);
  },
  // ~~ responsive design ~~
  pointer: "fine",
  orientation: "landscape",
  width: 0,
  height: 0,
  mediaWidth: 0,
  mediaHeight: 0,
  // ~~ user props ~~
  userBehindLiveEdge: false,
  // ~~ live props ~~
  liveEdgeTolerance: 10,
  minLiveDVRWindow: 60,
  get canSeek() {
    return /unknown|on-demand|:dvr/.test(this.streamType) && Number.isFinite(this.seekableWindow) && (!this.live || /:dvr/.test(this.streamType) && this.seekableWindow >= this.minLiveDVRWindow);
  },
  get live() {
    return this.streamType.includes("live") || !Number.isFinite(this.duration);
  },
  get liveEdgeStart() {
    return this.live && Number.isFinite(this.seekableEnd) ? Math.max(0, (this.liveSyncPosition ?? this.seekableEnd) - this.liveEdgeTolerance) : 0;
  },
  get liveEdge() {
    return this.live && (!this.canSeek || !this.userBehindLiveEdge && this.currentTime >= this.liveEdgeStart);
  },
  get liveEdgeWindow() {
    return this.live && Number.isFinite(this.seekableEnd) ? this.seekableEnd - this.liveEdgeStart : 0;
  },
  // ~~ internal props ~~
  autoplaying: false,
  providedTitle: "",
  inferredTitle: "",
  providedPoster: "",
  inferredPoster: "",
  inferredViewType: "unknown",
  providedViewType: "unknown",
  providedStreamType: "unknown",
  inferredStreamType: "unknown",
  liveSyncPosition: null
});
const DO_NOT_RESET_ON_SRC_CHANGE = /* @__PURE__ */ new Set([
  "autoplay",
  "canFullscreen",
  "canLoad",
  "canPictureInPicture",
  "canSetVolume",
  "controls",
  "crossorigin",
  "fullscreen",
  "height",
  "inferredViewType",
  "logLevel",
  "loop",
  "mediaHeight",
  "mediaType",
  "mediaWidth",
  "muted",
  "orientation",
  "pictureInPicture",
  "playsinline",
  "pointer",
  "preload",
  "providedPoster",
  "providedStreamType",
  "providedTitle",
  "providedViewType",
  "source",
  "sources",
  "textTrack",
  "textTracks",
  "volume",
  "width"
]);
function softResetMediaState($media) {
  mediaState.reset($media, (prop) => !DO_NOT_RESET_ON_SRC_CHANGE.has(prop));
  tick();
}

const mediaContext = createContext();
function useMediaContext() {
  return useContext(mediaContext);
}

function appendParamsToURL(baseUrl, params) {
  const searchParams = new URLSearchParams();
  for (const key of Object.keys(params)) {
    searchParams.set(key, params[key] + "");
  }
  return baseUrl + "?" + searchParams.toString();
}
function preconnect(url, rel = "preconnect") {
  if (IS_SERVER)
    return false;
  const exists = document.querySelector(`link[href="${url}"]`);
  if (!isNull(exists))
    return true;
  const link = document.createElement("link");
  link.rel = rel;
  link.href = url;
  link.crossOrigin = "true";
  document.head.append(link);
  return true;
}
const pendingRequests = {};
function loadScript(src) {
  if (pendingRequests[src])
    return pendingRequests[src].promise;
  const promise = deferredPromise(), exists = document.querySelector(`script[src="${src}"]`);
  if (!isNull(exists)) {
    promise.resolve();
    return promise.promise;
  }
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => {
    promise.resolve();
    delete pendingRequests[src];
  };
  script.onerror = () => {
    promise.reject();
    delete pendingRequests[src];
  };
  setTimeout(() => document.head.append(script), 0);
  return promise.promise;
}
function getRequestCredentials(crossorigin) {
  return crossorigin === "use-credentials" ? "include" : isString(crossorigin) ? "same-origin" : void 0;
}

const CROSSORIGIN = Symbol("TEXT_TRACK_CROSSORIGIN" ), READY_STATE = Symbol("TEXT_TRACK_READY_STATE" ), UPDATE_ACTIVE_CUES = Symbol("TEXT_TRACK_UPDATE_ACTIVE_CUES" ), CAN_LOAD = Symbol("TEXT_TRACK_CAN_LOAD" ), ON_MODE_CHANGE = Symbol("TEXT_TRACK_ON_MODE_CHANGE" ), NATIVE = Symbol("TEXT_TRACK_NATIVE" ), NATIVE_HLS = Symbol("TEXT_TRACK_NATIVE_HLS" );
const TextTrackSymbol = {
  _crossorigin: CROSSORIGIN,
  _readyState: READY_STATE,
  _updateActiveCues: UPDATE_ACTIVE_CUES,
  _canLoad: CAN_LOAD,
  _onModeChange: ON_MODE_CHANGE,
  _native: NATIVE,
  _nativeHLS: NATIVE_HLS
};

function findActiveCue(cues, time) {
  for (let i = 0, len = cues.length; i < len; i++) {
    if (isCueActive(cues[i], time))
      return cues[i];
  }
  return null;
}
function isCueActive(cue, time) {
  return time >= cue.startTime && time < cue.endTime;
}
function observeActiveTextTrack(tracks, kind, onChange) {
  let currentTrack = null;
  function onModeChange() {
    const kinds = isString(kind) ? [kind] : kind, track = tracks.toArray().find((track2) => kinds.includes(track2.kind) && track2.mode === "showing");
    if (track === currentTrack)
      return;
    if (!track) {
      onChange(null);
      currentTrack = null;
      return;
    }
    if (track.readyState == 2) {
      onChange(track);
    } else {
      onChange(null);
      track.addEventListener("load", () => onChange(track), { once: true });
    }
    currentTrack = track;
  }
  onModeChange();
  return listenEvent(tracks, "mode-change", onModeChange);
}

var _a, _b, _c;
class TextTrack extends EventsTarget {
  constructor(init) {
    super();
    this.id = "";
    this.label = "";
    this.language = "";
    this.default = false;
    this._canLoad = false;
    this._currentTime = 0;
    this._mode = "disabled";
    this._metadata = {};
    this._regions = [];
    this._cues = [];
    this._activeCues = [];
    /* @internal */
    this[_a] = 0;
    /* @internal */
    this[_b] = null;
    /* @internal */
    this[_c] = null;
    for (const prop of Object.keys(init))
      this[prop] = init[prop];
    if (!this.type)
      this.type = "vtt";
    if (!IS_SERVER && init.content) {
      import('media-captions').then(({ parseText, VTTCue, VTTRegion }) => {
        if (init.type === "json") {
          this._parseJSON(init.content, VTTCue, VTTRegion);
        } else {
          parseText(init.content, { type: init.type }).then(({ cues, regions }) => {
            this._cues = cues;
            this._regions = regions;
            this._readyState();
          });
        }
      });
    } else if (!init.src)
      this[TextTrackSymbol._readyState] = 2;
    if (isTrackCaptionKind(this) && !this.label) {
      throw Error(`[vidstack]: captions text track created without label: \`${this.src}\``);
    }
  }
  static createId(track) {
    return `id::${track.type}-${track.kind}-${track.src ?? track.label}`;
  }
  get metadata() {
    return this._metadata;
  }
  get regions() {
    return this._regions;
  }
  get cues() {
    return this._cues;
  }
  get activeCues() {
    return this._activeCues;
  }
  /**
   * - 0: Not Loading
   * - 1: Loading
   * - 2: Ready
   * - 3: Error
   */
  get readyState() {
    return this[TextTrackSymbol._readyState];
  }
  get mode() {
    return this._mode;
  }
  set mode(mode) {
    this.setMode(mode);
  }
  addCue(cue, trigger) {
    let i = 0, length = this._cues.length;
    for (i = 0; i < length; i++)
      if (cue.endTime <= this._cues[i].startTime)
        break;
    if (i === length)
      this._cues.push(cue);
    else
      this._cues.splice(i, 0, cue);
    if (trigger?.type !== "cuechange") {
      this[TextTrackSymbol._native]?.track.addCue(cue);
    }
    this.dispatchEvent(new DOMEvent("add-cue", { detail: cue, trigger }));
    if (isCueActive(cue, this._currentTime)) {
      this[TextTrackSymbol._updateActiveCues](this._currentTime, trigger);
    }
  }
  removeCue(cue, trigger) {
    const index = this._cues.indexOf(cue);
    if (index >= 0) {
      const isActive = this._activeCues.includes(cue);
      this._cues.splice(index, 1);
      this[TextTrackSymbol._native]?.track.removeCue(cue);
      this.dispatchEvent(new DOMEvent("remove-cue", { detail: cue, trigger }));
      if (isActive) {
        this[TextTrackSymbol._updateActiveCues](this._currentTime, trigger);
      }
    }
  }
  setMode(mode, trigger) {
    if (this._mode === mode)
      return;
    this._mode = mode;
    if (mode === "disabled") {
      this._activeCues = [];
      this._activeCuesChanged();
    } else if (this.readyState === 2) {
      this[TextTrackSymbol._updateActiveCues](this._currentTime, trigger);
    } else {
      this._load();
    }
    this.dispatchEvent(new DOMEvent("mode-change", { detail: this, trigger }));
    this[TextTrackSymbol._onModeChange]?.();
  }
  /* @internal */
  [(_a = TextTrackSymbol._readyState, _b = TextTrackSymbol._onModeChange, _c = TextTrackSymbol._native, TextTrackSymbol._updateActiveCues)](currentTime, trigger) {
    this._currentTime = currentTime;
    if (this.mode === "disabled" || !this._cues.length)
      return;
    const activeCues = [];
    for (let i = 0, length = this._cues.length; i < length; i++) {
      const cue = this._cues[i];
      if (isCueActive(cue, currentTime))
        activeCues.push(cue);
    }
    let changed = activeCues.length !== this._activeCues.length;
    if (!changed) {
      for (let i = 0; i < activeCues.length; i++) {
        if (!this._activeCues.includes(activeCues[i])) {
          changed = true;
          break;
        }
      }
    }
    this._activeCues = activeCues;
    if (changed)
      this._activeCuesChanged(trigger);
  }
  /* @internal */
  [TextTrackSymbol._canLoad]() {
    this._canLoad = true;
    if (this._mode !== "disabled")
      this._load();
  }
  async _load() {
    if (!this._canLoad || !this.src || this[TextTrackSymbol._readyState] > 0)
      return;
    this[TextTrackSymbol._readyState] = 1;
    this.dispatchEvent(new DOMEvent("load-start"));
    try {
      const { parseResponse, VTTCue, VTTRegion } = await import('media-captions'), crossorigin = this[TextTrackSymbol._crossorigin]?.();
      const response = fetch(this.src, {
        headers: this.type === "json" ? { "Content-Type": "application/json" } : void 0,
        credentials: getRequestCredentials(crossorigin)
      });
      if (this.type === "json") {
        this._parseJSON(await (await response).text(), VTTCue, VTTRegion);
      } else {
        const { errors, metadata, regions, cues } = await parseResponse(response, {
          type: this.type,
          encoding: this.encoding
        });
        if (errors[0]?.code === 0) {
          throw errors[0];
        } else {
          this._metadata = metadata;
          this._regions = regions;
          this._cues = cues;
        }
      }
      this._readyState();
    } catch (error) {
      this._errorState(error);
    }
  }
  _readyState() {
    this[TextTrackSymbol._readyState] = 2;
    if (!this.src || this.type !== "vtt") {
      const nativeTrack = this[TextTrackSymbol._native]?.track;
      if (nativeTrack)
        for (const cue of this._cues)
          nativeTrack.addCue(cue);
    }
    const loadEvent = new DOMEvent("load");
    this[TextTrackSymbol._updateActiveCues](this._currentTime, loadEvent);
    this.dispatchEvent(loadEvent);
  }
  _errorState(error) {
    this[TextTrackSymbol._readyState] = 3;
    this.dispatchEvent(new DOMEvent("error", { detail: error }));
  }
  _parseJSON(json, VTTCue, VTTRegion) {
    try {
      const { regions, cues } = parseJSONCaptionsFile(json, VTTCue, VTTRegion);
      this._regions = regions;
      this._cues = cues;
    } catch (error) {
      {
        console.error(`[vidstack] failed to parse JSON captions at: \`${this.src}\`

`, error);
      }
      this._errorState(error);
    }
  }
  _activeCuesChanged(trigger) {
    this.dispatchEvent(new DOMEvent("cue-change", { trigger }));
  }
}
const captionRE = /captions|subtitles/;
function isTrackCaptionKind(track) {
  return captionRE.test(track.kind);
}
function parseJSONCaptionsFile(json, Cue, Region) {
  const content = JSON.parse(json);
  let regions = [], cues = [];
  if (content.regions && Region) {
    regions = content.regions.map((region) => Object.assign(new Region(), region));
  }
  if (content.cues || isArray(content)) {
    cues = (isArray(content) ? content : content.cues).filter((content2) => isNumber(content2.startTime) && isNumber(content2.endTime)).map((cue) => Object.assign(new Cue(0, 0, ""), cue));
  }
  return { regions, cues };
}

class MediaRemoteControl {
  constructor(_logger = new Logger() ) {
    this._logger = _logger;
    this._target = null;
    this._player = null;
    this._prevTrackIndex = -1;
  }
  /**
   * Set the target from which to dispatch media requests events from. The events should bubble
   * up from this target to the `<media-player>` element.
   *
   * @example
   * ```ts
   * const button = document.querySelector('button');
   * remote.setTarget(button);
   * ```
   */
  setTarget(target) {
    this._target = target;
    this._logger?.setTarget(target);
  }
  /**
   * Returns the current `<media-player>` element. This method will attempt to find the player by
   * searching up from either the given `target` or default target set via `remote.setTarget`.
   *
   * @example
   * ```ts
   * const player = remote.getPlayer();
   * ```
   */
  getPlayer(target) {
    if (this._player)
      return this._player;
    (target ?? this._target)?.dispatchEvent(
      new DOMEvent("find-media-player", {
        detail: (player) => void (this._player = player),
        bubbles: true,
        composed: true
      })
    );
    return this._player;
  }
  /**
   * Set the current `<media-player>` element so the remote can support toggle methods such as
   * `togglePaused` as they rely on the current media state.
   */
  setPlayer(player) {
    this._player = player;
  }
  /**
   * Dispatch a request to start the media loading process. This will only work if the media
   * player has been initialized with a custom loading strategy `<media-player load="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#loading-strategies}
   */
  startLoading(trigger) {
    this._dispatchRequest("media-start-loading", trigger);
  }
  /**
   * Dispatch a request to begin/resume media playback.
   */
  play(trigger) {
    this._dispatchRequest("media-play-request", trigger);
  }
  /**
   * Dispatch a request to pause media playback.
   */
  pause(trigger) {
    this._dispatchRequest("media-pause-request", trigger);
  }
  /**
   * Dispatch a request to set the media volume to mute (0).
   */
  mute(trigger) {
    this._dispatchRequest("media-mute-request", trigger);
  }
  /**
   * Dispatch a request to unmute the media volume and set it back to it's previous state.
   */
  unmute(trigger) {
    this._dispatchRequest("media-unmute-request", trigger);
  }
  /**
   * Dispatch a request to enter fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/fullscreen#remote-control}
   */
  enterFullscreen(target, trigger) {
    this._dispatchRequest("media-enter-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to exit fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/fullscreen#remote-control}
   */
  exitFullscreen(target, trigger) {
    this._dispatchRequest("media-exit-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to lock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/screen-orientation#remote-control}
   */
  lockScreenOrientation(lockType, trigger) {
    this._dispatchRequest("media-orientation-lock-request", trigger, lockType);
  }
  /**
   * Dispatch a request to unlock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/screen-orientation#remote-control}
   */
  unlockScreenOrientation(trigger) {
    this._dispatchRequest("media-orientation-unlock-request", trigger);
  }
  /**
   * Dispatch a request to enter picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture#remote-control}
   */
  enterPictureInPicture(trigger) {
    this._dispatchRequest("media-enter-pip-request", trigger);
  }
  /**
   * Dispatch a request to exit picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture#remote-control}
   */
  exitPictureInPicture(trigger) {
    this._dispatchRequest("media-exit-pip-request", trigger);
  }
  /**
   * Notify the media player that a seeking process is happening and to seek to the given `time`.
   */
  seeking(time, trigger) {
    this._dispatchRequest("media-seeking-request", trigger, time);
  }
  /**
   * Notify the media player that a seeking operation has completed and to seek to the given `time`.
   * This is generally called after a series of `remote.seeking()` calls.
   */
  seek(time, trigger) {
    this._dispatchRequest("media-seek-request", trigger, time);
  }
  seekToLiveEdge(trigger) {
    this._dispatchRequest("media-live-edge-request", trigger);
  }
  /**
   * Dispatch a request to update the media volume to the given `volume` level which is a value
   * between 0 and 1.
   *
   * @example
   * ```ts
   * remote.changeVolume(0); // 0%
   * remote.changeVolume(0.05); // 5%
   * remote.changeVolume(0.5); // 50%
   * remote.changeVolume(0.75); // 70%
   * remote.changeVolume(1); // 100%
   * ```
   */
  changeVolume(volume, trigger) {
    this._dispatchRequest("media-volume-change-request", trigger, Math.max(0, Math.min(1, volume)));
  }
  /**
   * Dispatch a request to change the current audio track.
   *
   * @example
   * ```ts
   * remote.changeAudioTrack(1); // track at index 1
   * ```
   */
  changeAudioTrack(index, trigger) {
    this._dispatchRequest("media-audio-track-change-request", trigger, index);
  }
  /**
   * Dispatch a request to change the video quality. The special value `-1` represents auto quality
   * selection.
   *
   * @example
   * ```ts
   * remote.changeQuality(-1); // auto
   * remote.changeQuality(1); // quality at index 1
   * ```
   */
  changeQuality(index, trigger) {
    this._dispatchRequest("media-quality-change-request", trigger, index);
  }
  /**
   * Request auto quality selection.
   */
  requestAutoQuality(trigger) {
    this.changeQuality(-1, trigger);
  }
  /**
   * Dispatch a request to change the mode of the text track at the given index.
   *
   * @example
   * ```ts
   * remote.changeTextTrackMode(1, 'showing'); // track at index 1
   * ```
   */
  changeTextTrackMode(index, mode, trigger) {
    this._dispatchRequest("media-text-track-change-request", trigger, {
      index,
      mode
    });
  }
  /**
   * Dispatch a request to change the media playback rate.
   *
   * @example
   * ```ts
   * remote.changePlaybackRate(0.5); // Half the normal speed
   * remote.changePlaybackRate(1); // Normal speed
   * remote.changePlaybackRate(1.5); // 50% faster than normal
   * remote.changePlaybackRate(2); // Double the normal speed
   * ```
   */
  changePlaybackRate(rate, trigger) {
    this._dispatchRequest("media-rate-change-request", trigger, rate);
  }
  /**
   * Dispatch a request to resume idle tracking on controls.
   */
  resumeControls(trigger) {
    this._dispatchRequest("media-resume-controls-request", trigger);
  }
  /**
   * Dispatch a request to pause controls idle tracking. Pausing tracking will result in the
   * controls being visible until `remote.resumeControls()` is called. This method
   * is generally used when building custom controls and you'd like to prevent the UI from
   * disappearing.
   *
   * @example
   * ```ts
   * // Prevent controls hiding while menu is being interacted with.
   * function onSettingsOpen() {
   *   remote.pauseControls();
   * }
   *
   * function onSettingsClose() {
   *   remote.resumeControls();
   * }
   * ```
   */
  pauseControls(trigger) {
    this._dispatchRequest("media-pause-controls-request", trigger);
  }
  /**
   * Dispatch a request to toggle the media playback state.
   */
  togglePaused(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      this._noPlayerWarning(this.togglePaused.name);
      return;
    }
    if (player.state.paused)
      this.play(trigger);
    else
      this.pause(trigger);
  }
  /**
   * Dispatch a request to toggle the controls visibility.
   */
  toggleControls(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      this._noPlayerWarning(this.toggleControls.name);
      return;
    }
    if (!player.controls.showing) {
      player.controls.show(0, trigger);
    } else {
      player.controls.hide(0, trigger);
    }
  }
  /**
   * Dispatch a request to toggle the media muted state.
   */
  toggleMuted(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      this._noPlayerWarning(this.toggleMuted.name);
      return;
    }
    if (player.state.muted)
      this.unmute(trigger);
    else
      this.mute(trigger);
  }
  /**
   * Dispatch a request to toggle the media fullscreen state.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/fullscreen#remote-control}
   */
  toggleFullscreen(target, trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      this._noPlayerWarning(this.toggleFullscreen.name);
      return;
    }
    if (player.state.fullscreen)
      this.exitFullscreen(target, trigger);
    else
      this.enterFullscreen(target, trigger);
  }
  /**
   * Dispatch a request to toggle the media picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture#remote-control}
   */
  togglePictureInPicture(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      this._noPlayerWarning(this.togglePictureInPicture.name);
      return;
    }
    if (player.state.pictureInPicture)
      this.exitPictureInPicture(trigger);
    else
      this.enterPictureInPicture(trigger);
  }
  /**
   * Turn captions off.
   */
  disableCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      this._noPlayerWarning(this.disableCaptions.name);
      return;
    }
    const tracks = player.state.textTracks, track = player.state.textTrack;
    if (track) {
      const index = tracks.indexOf(track);
      this.changeTextTrackMode(index, "disabled", trigger);
    }
  }
  /**
   * Dispatch a request to toggle the current captions mode.
   */
  toggleCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      this._noPlayerWarning(this.toggleCaptions.name);
      return;
    }
    const tracks = player.state.textTracks, track = player.state.textTrack;
    if (track) {
      const index = tracks.indexOf(track);
      this.changeTextTrackMode(index, "disabled", trigger);
      this._prevTrackIndex = index;
    } else {
      let index = this._prevTrackIndex;
      if (!tracks[index] || !isTrackCaptionKind(tracks[index])) {
        index = -1;
      }
      if (index === -1) {
        index = tracks.findIndex((track2) => isTrackCaptionKind(track2) && track2.default);
      }
      if (index === -1) {
        index = tracks.findIndex((track2) => isTrackCaptionKind(track2));
      }
      if (index >= 0)
        this.changeTextTrackMode(index, "showing", trigger);
      this._prevTrackIndex = -1;
    }
  }
  _dispatchRequest(type, trigger, detail) {
    const request = new DOMEvent(type, {
      bubbles: true,
      composed: true,
      detail,
      trigger
    });
    let target = trigger?.target || null;
    if (target && target instanceof Component)
      target = target.el;
    const shouldUsePlayer = !target || target === document || target === window || target === document.body || this._player?.el && target instanceof Node && !this._player.el.contains(target);
    target = shouldUsePlayer ? this._target ?? this.getPlayer()?.el : target ?? this._target;
    {
      this._logger?.debugGroup(`\u{1F4E8} dispatching \`${type}\``).labelledLog("Target", target).labelledLog("Player", this._player).labelledLog("Request Event", request).labelledLog("Trigger Event", trigger).dispatch();
    }
    if (this._player) {
      this._player.canPlayQueue._enqueue(type, () => target?.dispatchEvent(request));
    } else {
      target?.dispatchEvent(request);
    }
  }
  _noPlayerWarning(method) {
    {
      console.warn(
        `[vidstack] attempted to call \`MediaRemoteControl.${method}\`() that requires player but failed because remote could not find a parent player element from target`
      );
    }
  }
}

const min = Math.min;
const max = Math.max;
const round$1 = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain positioning strategy.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle$1(element);

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round$1(width) !== offsetWidth || round$1(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round$1(rect.width) : rect.width) / width;
  let y = ($ ? round$1(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  return getCssDimensions(element);
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const window = getWindow(element);
  if (!isHTMLElement(element)) {
    return window;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
    return window;
  }
  return offsetParent || getContainingBlock(element) || window;
}

const getElementRects = async function (_ref) {
  let {
    reference,
    floating,
    strategy
  } = _ref;
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
    floating: {
      x: 0,
      y: 0,
      ...(await getDimensionsFn(floating))
    }
  };
};

function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    clearTimeout(timeoutId);
    io && io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 100);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          resizeObserver && resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo && cleanupIo();
    resizeObserver && resizeObserver.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain CSS positioning
 * strategy.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

function setAttributeIfEmpty(target, name, value) {
  if (!target.hasAttribute(name))
    target.setAttribute(name, value);
}
function setARIALabel(target, $label) {
  if (target.hasAttribute("aria-label"))
    return;
  function updateAriaDescription() {
    setAttribute(target, "aria-label", $label());
  }
  if (IS_SERVER)
    updateAriaDescription();
  else
    effect(updateAriaDescription);
}
function isElementParent(owner, node, test) {
  while (node) {
    if (node === owner) {
      return true;
    } else if (test?.(node)) {
      break;
    } else {
      node = node.parentElement;
    }
  }
  return false;
}
function onPress(target, handler) {
  listenEvent(target, "pointerup", (event) => {
    if (event.button === 0)
      handler(event);
  });
  listenEvent(target, "keydown", (event) => {
    if (isKeyboardClick(event))
      handler(event);
  });
}
function isTouchPinchEvent(event) {
  return isTouchEvent(event) && (event.touches.length > 1 || event.changedTouches.length > 1);
}
function requestScopedAnimationFrame(callback) {
  if (IS_SERVER)
    return callback();
  let scope = getScope(), id = window.requestAnimationFrame(() => {
    scoped(callback, scope);
    id = -1;
  });
  return () => void window.cancelAnimationFrame(id);
}
function autoPlacement(el, trigger, placement, {
  offsetVarName,
  xOffset,
  yOffset,
  ...options
}) {
  if (!el)
    return;
  const floatingPlacement = placement.replace(" ", "-").replace("-center", "");
  setStyle(el, "visibility", !trigger ? "hidden" : null);
  if (!trigger)
    return;
  const negateY = (y) => placement.includes("top") ? `calc(-1 * ${y})` : y;
  return autoUpdate(trigger, el, () => {
    computePosition(trigger, el, { placement: floatingPlacement, ...options }).then(({ x, y }) => {
      Object.assign(el.style, {
        top: `calc(${y + "px"} + ${negateY(
          yOffset ? yOffset + "px" : `var(--${offsetVarName}-y-offset, 0px)`
        )})`,
        left: `calc(${x + "px"} + ${xOffset ? xOffset + "px" : `var(--${offsetVarName}-x-offset, 0px)`})`
      });
    });
  });
}
function hasAnimation(el) {
  const styles = getComputedStyle(el);
  return styles.animationName !== "none";
}

class MediaPlayerController extends ViewController {
}

class MediaControls extends MediaPlayerController {
  constructor() {
    super(...arguments);
    this._idleTimer = -2;
    this._pausedTracking = false;
    this._hideOnMouseLeave = signal(false);
    this._isMouseOutside = signal(false);
    this._focusedItem = null;
    /**
     * The default amount of delay in milliseconds while media playback is progressing without user
     * activity to indicate an idle state (i.e., hide controls).
     *
     * @defaultValue 2000
     */
    this.defaultDelay = 2e3;
  }
  /**
   * Whether controls visibility should be toggled when the mouse enters and leaves the player
   * container.
   *
   * @defaultValue false
   */
  get hideOnMouseLeave() {
    const { hideControlsOnMouseLeave } = this.$props;
    return this._hideOnMouseLeave() || hideControlsOnMouseLeave();
  }
  set hideOnMouseLeave(hide) {
    this._hideOnMouseLeave.set(hide);
  }
  /**
   * Whether media controls are currently visible.
   */
  get showing() {
    return this.$state.controlsVisible();
  }
  /**
   * Show controls.
   */
  show(delay = 0, trigger) {
    this._clearIdleTimer();
    if (!this._pausedTracking) {
      this._changeVisibility(true, delay, trigger);
    }
  }
  /**
   * Hide controls.
   */
  hide(delay = this.defaultDelay, trigger) {
    this._clearIdleTimer();
    if (!this._pausedTracking) {
      this._changeVisibility(false, delay, trigger);
    }
  }
  /**
   * Whether all idle tracking on controls should be paused until resumed again.
   */
  pause(trigger) {
    this._pausedTracking = true;
    this._clearIdleTimer();
    this._changeVisibility(true, 0, trigger);
  }
  resume(trigger) {
    this._pausedTracking = false;
    if (this.$state.paused())
      return;
    this._changeVisibility(false, this.defaultDelay, trigger);
  }
  onConnect() {
    effect(this._watchMouse.bind(this));
    effect(this._watchPaused.bind(this));
    const onPlay = this._onPlay.bind(this), onPause = this._onPause.bind(this);
    this.listen("can-play", (event) => this.show(0, event));
    this.listen("play", onPlay);
    this.listen("pause", onPause);
    this.listen("autoplay-fail", onPause);
  }
  _watchMouse() {
    const { started, pointer, paused } = this.$state;
    if (!started() || pointer() !== "fine")
      return;
    const shouldHideOnMouseLeave = this.hideOnMouseLeave;
    if (!shouldHideOnMouseLeave || !this._isMouseOutside()) {
      effect(() => {
        if (!paused())
          this.listen("pointermove", this._onStopIdle.bind(this));
      });
    }
    if (shouldHideOnMouseLeave) {
      this.listen("mouseenter", this._onMouseEnter.bind(this));
      this.listen("mouseleave", this._onMouseLeave.bind(this));
    }
  }
  _watchPaused() {
    const { paused, started, autoplayError } = this.$state;
    if (paused() || autoplayError() && !started())
      return;
    const onStopIdle = this._onStopIdle.bind(this);
    effect(() => {
      const pointer = this.$state.pointer(), isTouch = pointer === "coarse", events = [isTouch ? "touchend" : "pointerup", "keydown"];
      for (const eventType of events) {
        this.listen(eventType, onStopIdle, { passive: false });
      }
    });
  }
  _onPlay(event) {
    this.show(0, event);
    this.hide(void 0, event);
  }
  _onPause(event) {
    this.show(0, event);
  }
  _onMouseEnter(event) {
    this._isMouseOutside.set(false);
    this.show(0, event);
    this.hide(void 0, event);
  }
  _onMouseLeave(event) {
    this._isMouseOutside.set(true);
    this.hide(0, event);
  }
  _clearIdleTimer() {
    window.clearTimeout(this._idleTimer);
    this._idleTimer = -1;
  }
  _onStopIdle(event) {
    if (
      // @ts-expect-error
      event.MEDIA_GESTURE || this._pausedTracking || isTouchPinchEvent(event)
    ) {
      return;
    }
    if (isKeyboardEvent(event)) {
      if (event.key === "Escape") {
        this.el?.focus();
        this._focusedItem = null;
      } else if (this._focusedItem) {
        event.preventDefault();
        requestAnimationFrame(() => {
          this._focusedItem?.focus();
          this._focusedItem = null;
        });
      }
    }
    this.show(0, event);
    this.hide(this.defaultDelay, event);
  }
  _changeVisibility(visible, delay, trigger) {
    if (delay === 0) {
      this._onChange(visible, trigger);
      return;
    }
    this._idleTimer = window.setTimeout(() => {
      if (!this.scope)
        return;
      this._onChange(visible && !this._pausedTracking, trigger);
    }, delay);
  }
  _onChange(visible, trigger) {
    if (this.$state.controlsVisible() === visible)
      return;
    this.$state.controlsVisible.set(visible);
    if (!visible && document.activeElement && this.el?.contains(document.activeElement)) {
      this._focusedItem = document.activeElement;
      requestAnimationFrame(() => this.el?.focus());
    }
    this.dispatch("controls-change", {
      detail: visible,
      trigger
    });
  }
}

class NativeTextRenderer {
  constructor() {
    this.priority = 0;
    this._display = true;
    this._video = null;
    this._track = null;
    this._tracks = /* @__PURE__ */ new Set();
  }
  canRender(_, video) {
    return !!video;
  }
  attach(video) {
    this._video = video;
    if (video)
      video.textTracks.onchange = this._onChange.bind(this);
  }
  addTrack(track) {
    this._tracks.add(track);
    this._attachTrack(track);
  }
  removeTrack(track) {
    track[TextTrackSymbol._native]?.remove?.();
    track[TextTrackSymbol._native] = null;
    this._tracks.delete(track);
  }
  changeTrack(track) {
    const current = track?.[TextTrackSymbol._native];
    if (current && current.track.mode !== "showing") {
      current.track.mode = "showing";
    }
    this._track = track;
  }
  setDisplay(display) {
    this._display = display;
    this._onChange();
  }
  detach() {
    if (this._video)
      this._video.textTracks.onchange = null;
    for (const track of this._tracks)
      this.removeTrack(track);
    this._tracks.clear();
    this._video = null;
    this._track = null;
  }
  _attachTrack(track) {
    if (!this._video)
      return;
    const el = track[TextTrackSymbol._native] ??= this._createTrackElement(track);
    if (el instanceof HTMLElement) {
      this._video.append(el);
      el.track.mode = el.default ? "showing" : "hidden";
    }
  }
  _createTrackElement(track) {
    const el = document.createElement("track"), isDefault = track.default || track.mode === "showing", isSupported = track.src && track.type === "vtt";
    el.id = track.id;
    el.src = isSupported ? track.src : "https://cdn.jsdelivr.net/npm/vidstack@next/empty.vtt";
    el.label = track.label;
    el.kind = track.kind;
    el.default = isDefault;
    track.language && (el.srclang = track.language);
    if (isDefault && !isSupported) {
      this._copyCues(track, el.track);
    }
    return el;
  }
  _copyCues(track, native) {
    if (track.src && track.type === "vtt" || native.cues?.length)
      return;
    for (const cue of track.cues)
      native.addCue(cue);
  }
  _onChange(event) {
    for (const track of this._tracks) {
      const nativeTrack = track[TextTrackSymbol._native]?.track;
      if (!nativeTrack)
        continue;
      if (!this._display) {
        nativeTrack.mode = "disabled";
        continue;
      }
      const isShowing = nativeTrack.mode === "showing";
      if (isShowing)
        this._copyCues(track, nativeTrack);
      track.setMode(isShowing ? "showing" : "disabled", event);
    }
  }
}

class TextRenderers {
  constructor(_media) {
    this._media = _media;
    this._video = null;
    this._renderers = [];
    this._nativeDisplay = false;
    this._nativeRenderer = null;
    this._customRenderer = null;
    const textTracks = _media.textTracks;
    this._textTracks = textTracks;
    effect(this._watchControls.bind(this));
    onDispose(this._detach.bind(this));
    listenEvent(textTracks, "add", this._onAddTrack.bind(this));
    listenEvent(textTracks, "remove", this._onRemoveTrack.bind(this));
    listenEvent(textTracks, "mode-change", this._update.bind(this));
  }
  _watchControls() {
    const { $state, $iosControls } = this._media;
    this._nativeDisplay = $state.controls() || $iosControls();
    this._update();
  }
  add(renderer) {
    this._renderers.push(renderer);
    this._update();
  }
  remove(renderer) {
    renderer.detach();
    this._renderers.splice(this._renderers.indexOf(renderer), 1);
    this._update();
  }
  /* @internal */
  _attachVideo(video) {
    requestAnimationFrame(() => {
      this._video = video;
      if (video) {
        this._nativeRenderer = new NativeTextRenderer();
        this._nativeRenderer.attach(video);
        for (const track of this._textTracks)
          this._addNativeTrack(track);
      }
      this._update();
    });
  }
  _addNativeTrack(track) {
    if (!isTrackCaptionKind(track))
      return;
    this._nativeRenderer?.addTrack(track);
  }
  _removeNativeTrack(track) {
    if (!isTrackCaptionKind(track))
      return;
    this._nativeRenderer?.removeTrack(track);
  }
  _onAddTrack(event) {
    this._addNativeTrack(event.detail);
  }
  _onRemoveTrack(event) {
    this._removeNativeTrack(event.detail);
  }
  _update() {
    const currentTrack = this._textTracks.selected;
    if (this._video && (this._nativeDisplay || currentTrack?.[TextTrackSymbol._nativeHLS])) {
      this._customRenderer?.changeTrack(null);
      this._nativeRenderer?.setDisplay(true);
      this._nativeRenderer?.changeTrack(currentTrack);
      return;
    }
    this._nativeRenderer?.setDisplay(false);
    this._nativeRenderer?.changeTrack(null);
    if (!currentTrack) {
      this._customRenderer?.changeTrack(null);
      return;
    }
    const customRenderer = this._renderers.sort((a, b) => a.priority - b.priority).find((renderer) => renderer.canRender(currentTrack, this._video));
    if (this._customRenderer !== customRenderer) {
      this._customRenderer?.detach();
      customRenderer?.attach(this._video);
      this._customRenderer = customRenderer ?? null;
    }
    customRenderer?.changeTrack(currentTrack);
  }
  _detach() {
    this._nativeRenderer?.detach();
    this._nativeRenderer = null;
    this._customRenderer?.detach();
    this._customRenderer = null;
  }
}

class TextTrackList extends List {
  constructor() {
    super(...arguments);
    this._canLoad = false;
    this._defaults = {};
    this._onTrackModeChangeBind = this._onTrackModeChange.bind(this);
  }
  get selected() {
    const track = this._items.find((t) => t.mode === "showing" && isTrackCaptionKind(t));
    return track ?? null;
  }
  add(init, trigger) {
    const isTrack = init instanceof TextTrack, track = isTrack ? init : new TextTrack(init);
    if (this._defaults[init.kind] && init.default)
      delete init.default;
    track.addEventListener("mode-change", this._onTrackModeChangeBind);
    this[ListSymbol._add](track, trigger);
    track[TextTrackSymbol._crossorigin] = this[TextTrackSymbol._crossorigin];
    if (this._canLoad)
      track[TextTrackSymbol._canLoad]();
    if (init.default) {
      this._defaults[init.kind] = track;
      track.mode = "showing";
    }
    return this;
  }
  remove(track, trigger) {
    if (!this._items.includes(track))
      return;
    if (track === this._defaults[track.kind])
      delete this._defaults[track.kind];
    track.mode = "disabled";
    track[TextTrackSymbol._onModeChange] = null;
    track.removeEventListener("mode-change", this._onTrackModeChangeBind);
    this[ListSymbol._remove](track, trigger);
    return this;
  }
  clear(trigger) {
    for (const track of [...this._items]) {
      this.remove(track, trigger);
    }
    return this;
  }
  getById(id) {
    return this._items.find((track) => track.id === id) ?? null;
  }
  getByKind(kind) {
    const kinds = Array.isArray(kind) ? kind : [kind];
    return this._items.filter((track) => kinds.includes(track.kind));
  }
  /* @internal */
  [(TextTrackSymbol._canLoad)]() {
    if (this._canLoad)
      return;
    for (const track of this._items)
      track[TextTrackSymbol._canLoad]();
    this._canLoad = true;
  }
  _onTrackModeChange(event) {
    const track = event.detail;
    if (track.mode === "showing") {
      const kinds = isTrackCaptionKind(track) ? ["captions", "subtitles"] : [track.kind];
      for (const t of this._items) {
        if (t.mode === "showing" && t != track && kinds.includes(t.kind)) {
          t.mode = "disabled";
        }
      }
    }
    this.dispatchEvent(
      new DOMEvent("mode-change", {
        detail: event.detail,
        trigger: event
      })
    );
  }
}

const SELECTED = Symbol("SELECTED" );
class SelectList extends List {
  get selected() {
    return this._items.find((item) => item.selected) ?? null;
  }
  get selectedIndex() {
    return this._items.findIndex((item) => item.selected);
  }
  /* @internal */
  [ListSymbol._onRemove](item, trigger) {
    this[ListSymbol._select](item, false, trigger);
  }
  /* @internal */
  [ListSymbol._add](item, trigger) {
    item[SELECTED] = false;
    Object.defineProperty(item, "selected", {
      get() {
        return this[SELECTED];
      },
      set: (selected) => {
        if (this.readonly)
          return;
        this[ListSymbol._onUserSelect]?.();
        this[ListSymbol._select](item, selected);
      }
    });
    super[ListSymbol._add](item, trigger);
  }
  /* @internal */
  [ListSymbol._select](item, selected, trigger) {
    if (selected === item?.[SELECTED])
      return;
    const prev = this.selected;
    if (item)
      item[SELECTED] = selected;
    const changed = !selected ? prev === item : prev !== item;
    if (changed) {
      if (prev)
        prev[SELECTED] = false;
      this.dispatchEvent(
        new DOMEvent("change", {
          detail: {
            prev,
            current: this.selected
          },
          trigger
        })
      );
    }
  }
}

class AudioTrackList extends SelectList {
  getById(id) {
    if (id === "")
      return null;
    return this._items.find((track) => track.id === id) ?? null;
  }
}

const globalEval = eval;
const equalsRE = /:\s+'?"?(.*?)'?"?\)/g, notRE = /\s+not\s+/g, andRE = /\s+and\s+/g, orRE = /\s+or\s+/g, pxRE = /(\d)px/g;
const _PlayerQueryList = class _PlayerQueryList extends EventsTarget {
  constructor(store, query) {
    super();
    this._evaluation = signal("true");
    this._mediaProps = /* @__PURE__ */ new Set();
    this._mediaMatches = signal(true);
    this.$matches = computed(() => {
      let currentEval = this._evaluation();
      if (currentEval === "never")
        return false;
      for (const prop of this._mediaProps) {
        const value = this._mediaStore[prop](), replaceValue = isString(value) ? `'${value}'` : value + "";
        currentEval = currentEval.replace(camelToKebabCase(prop), replaceValue);
      }
      return globalEval(`!!(${currentEval})`) && this._mediaMatches();
    });
    this._query = query;
    this._mediaStore = store;
    root((dispose) => {
      effect(this._watchQuery.bind(this));
      effect(this._watchMatches.bind(this));
      this._dispose = dispose;
    });
  }
  get query() {
    return unwrap(this._query);
  }
  get matches() {
    return this.$matches();
  }
  _watchQuery() {
    const query = this.query;
    if (query === "")
      return;
    if (query === "never") {
      this._evaluation.set(query);
      return;
    }
    const queryList = query.trim().split(/\s*,\s*/g), mediaQueries = queryList.filter((q) => q.startsWith("@media")).join(","), playerQueries = queryList.filter((q) => !q.startsWith("@media"));
    if (mediaQueries.length) {
      const mediaQuery = window.matchMedia(mediaQueries.replace(/@media\s/g, "")), onChange = () => void this._mediaMatches.set(mediaQuery.matches);
      onChange();
      listenEvent(mediaQuery, "change", onChange);
    }
    if (playerQueries.length) {
      const evaluation = this._buildQueryEval(playerQueries), validProps = Object.keys(mediaState.record);
      for (const query2 of evaluation.matchAll(/\(([-a-zA-Z]+)\s/g)) {
        const prop = kebabToCamelCase(query2[1]);
        if (validProps.includes(prop)) {
          this._mediaProps.add(prop);
        }
      }
      this._evaluation.set(evaluation);
    }
    return () => {
      this._mediaProps.clear();
      this._evaluation.set("true");
      this._mediaMatches.set(true);
    };
  }
  _watchMatches() {
    this.$matches();
    this.dispatchEvent(new Event("change"));
  }
  _buildQueryEval(queryList) {
    return queryList.map(
      (query) => "(" + query.replace(equalsRE, ' == "$1")').replace(notRE, "!").replace(andRE, " && ").replace(orRE, " || ").replace(pxRE, "$1").trim() + ")"
    ).join(" || ");
  }
  destroy() {
    this._dispose();
  }
};
_PlayerQueryList.create = (query) => {
  const media = useMediaContext();
  return new _PlayerQueryList(media.$state, query);
};
let PlayerQueryList = _PlayerQueryList;

const SET_AUTO = Symbol("SET_AUTO_QUALITY" ), ENABLE_AUTO = Symbol("ENABLE_AUTO_QUALITY" );
const QualitySymbol = {
  _setAuto: SET_AUTO,
  _enableAuto: ENABLE_AUTO
};

class VideoQualityList extends SelectList {
  constructor() {
    super(...arguments);
    this._auto = false;
    /**
     * Configures quality switching:
     *
     * - `current`: Trigger an immediate quality level switch. This will abort the current fragment
     * request if any, flush the whole buffer, and fetch fragment matching with current position
     * and requested quality level.
     *
     * - `next`: Trigger a quality level switch for next fragment. This could eventually flush
     * already buffered next fragment.
     *
     * - `load`: Set quality level for next loaded fragment.
     *
     * @see {@link https://www.vidstack.io/docs/player/api/video-quality#switch}
     * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#quality-switch-control-api}
     */
    this.switch = "current";
  }
  /**
   * Whether automatic quality selection is enabled.
   */
  get auto() {
    return this._auto || this.readonly;
  }
  /* @internal */
  [(ListSymbol._onUserSelect)]() {
    this[QualitySymbol._setAuto](false);
  }
  /* @internal */
  [ListSymbol._onReset](trigger) {
    this[QualitySymbol._setAuto](false, trigger);
  }
  /**
   * Request automatic quality selection (if supported). This will be a no-op if the list is
   * `readonly` as that already implies auto-selection.
   */
  autoSelect(trigger) {
    if (this.readonly || this._auto || !this[QualitySymbol._enableAuto])
      return;
    this[QualitySymbol._enableAuto]?.();
    this[QualitySymbol._setAuto](true, trigger);
  }
  /* @internal */
  [QualitySymbol._setAuto](auto, trigger) {
    if (this._auto === auto)
      return;
    this._auto = auto;
    this.dispatchEvent(
      new DOMEvent("auto-change", {
        detail: auto,
        trigger
      })
    );
  }
}

function isAudioProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "AUDIO";
}
function isVideoProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "VIDEO";
}
function isHLSProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "HLS";
}
function isYouTubeProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "YOUTUBE";
}
function isVimeoProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "VIMEO";
}
function isHTMLAudioElement(element) {
  return !IS_SERVER && element instanceof HTMLAudioElement;
}
function isHTMLVideoElement(element) {
  return !IS_SERVER && element instanceof HTMLVideoElement;
}
function isHTMLMediaElement(element) {
  return isHTMLAudioElement(element) || isHTMLVideoElement(element);
}
function isHTMLIFrameElement(element) {
  return !IS_SERVER && element instanceof HTMLIFrameElement;
}

const MEDIA_KEY_SHORTCUTS = {
  togglePaused: "k Space",
  toggleMuted: "m",
  toggleFullscreen: "f",
  togglePictureInPicture: "i",
  toggleCaptions: "c",
  seekBackward: "j J ArrowLeft",
  seekForward: "l L ArrowRight",
  volumeUp: "ArrowUp",
  volumeDown: "ArrowDown",
  speedUp: ">",
  slowDown: "<"
};
const MODIFIER_KEYS = /* @__PURE__ */ new Set(["Shift", "Alt", "Meta", "Control"]), BUTTON_SELECTORS = 'button, [role="button"]', IGNORE_SELECTORS = 'input, textarea, select, [contenteditable], [role^="menuitem"]';
class MediaKeyboardController extends MediaPlayerController {
  constructor(_media) {
    super();
    this._media = _media;
    this._timeSlider = null;
  }
  onConnect() {
    effect(this._onTargetChange.bind(this));
  }
  _onTargetChange() {
    const { keyDisabled, keyTarget } = this.$props;
    if (keyDisabled())
      return;
    const target = keyTarget() === "player" ? this.el : document, $active = signal(false);
    if (target === this.el) {
      this.listen("focusin", () => $active.set(true));
      this.listen("focusout", (event) => {
        if (!this.el.contains(event.target))
          $active.set(false);
      });
    } else {
      if (!peek($active))
        $active.set(document.querySelector("[data-media-player]") === this.el);
      listenEvent(document, "focusin", (event) => {
        const activePlayer = event.composedPath().find((el) => el instanceof Element && el.localName === "media-player");
        if (activePlayer !== void 0)
          $active.set(this.el === activePlayer);
      });
    }
    effect(() => {
      if (!$active())
        return;
      listenEvent(target, "keyup", this._onKeyUp.bind(this));
      listenEvent(target, "keydown", this._onKeyDown.bind(this));
      listenEvent(target, "keydown", this._onPreventVideoKeys.bind(this), { capture: true });
    });
  }
  _onKeyUp(event) {
    const focusedEl = document.activeElement;
    if (!event.key || !this.$state.canSeek() || focusedEl?.matches(IGNORE_SELECTORS)) {
      return;
    }
    let { method, value } = this._getMatchingMethod(event);
    if (!isString(value) && !isArray(value)) {
      value?.callback(event);
      return;
    }
    if (method?.startsWith("seek")) {
      event.preventDefault();
      event.stopPropagation();
      if (this._timeSlider) {
        this._forwardTimeKeyboardEvent(event, method === "seekForward");
        this._timeSlider = null;
      } else {
        this._media.remote.seek(this._seekTotal, event);
        this._seekTotal = void 0;
      }
    }
    if (method?.startsWith("volume")) {
      const volumeSlider = this.el.querySelector("[data-media-volume-slider]");
      volumeSlider?.dispatchEvent(
        new KeyboardEvent("keyup", {
          key: method === "volumeUp" ? "Up" : "Down",
          shiftKey: event.shiftKey,
          trigger: event
        })
      );
    }
  }
  _onKeyDown(event) {
    if (!event.key || MODIFIER_KEYS.has(event.key))
      return;
    const focusedEl = document.activeElement;
    if (focusedEl?.matches(IGNORE_SELECTORS) || isKeyboardClick(event) && focusedEl?.matches(BUTTON_SELECTORS)) {
      return;
    }
    let { method, value } = this._getMatchingMethod(event);
    if (!isString(value) && !isArray(value)) {
      value?.callback(event);
      return;
    }
    if (!method && !event.metaKey && /[0-9]/.test(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      this._media.remote.seek(this.$state.duration() / 10 * Number(event.key), event);
      return;
    }
    if (!method)
      return;
    event.preventDefault();
    event.stopPropagation();
    switch (method) {
      case "seekForward":
      case "seekBackward":
        this._seeking(event, method, method === "seekForward");
        break;
      case "volumeUp":
      case "volumeDown":
        const volumeSlider = this.el.querySelector("[data-media-volume-slider]");
        if (volumeSlider) {
          volumeSlider.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: method === "volumeUp" ? "Up" : "Down",
              shiftKey: event.shiftKey,
              trigger: event
            })
          );
        } else {
          const value2 = event.shiftKey ? 0.1 : 0.05;
          this._media.remote.changeVolume(
            this.$state.volume() + (method === "volumeUp" ? +value2 : -value2),
            event
          );
        }
        break;
      case "toggleFullscreen":
        this._media.remote.toggleFullscreen("prefer-media", event);
        break;
      case "speedUp":
      case "slowDown":
        const playbackRate = this.$state.playbackRate();
        this._media.remote.changePlaybackRate(
          Math.max(0.25, Math.min(2, playbackRate + (method === "speedUp" ? 0.25 : -0.25))),
          event
        );
        break;
      default:
        this._media.remote[method]?.(event);
    }
  }
  _onPreventVideoKeys(event) {
    if (isHTMLMediaElement(event.target) && this._getMatchingMethod(event).method) {
      event.preventDefault();
    }
  }
  _getMatchingMethod(event) {
    const keyShortcuts = {
      ...this.$props.keyShortcuts(),
      ...this._media.ariaKeys
    };
    const method = Object.keys(keyShortcuts).find((method2) => {
      const value = keyShortcuts[method2], keys = isArray(value) ? value.join(" ") : isString(value) ? value : value?.keys;
      return (isArray(keys) ? keys : keys?.split(" "))?.some((keys2) => {
        return replaceSymbolKeys(keys2).replace(/Control/g, "Ctrl").split("+").every(
          (key) => MODIFIER_KEYS.has(key) ? event[key.toLowerCase() + "Key"] : event.key === key.replace("Space", " ")
        );
      });
    });
    return {
      method,
      value: method ? keyShortcuts[method] : null
    };
  }
  _calcSeekAmount(event, type) {
    const seekBy = event.shiftKey ? 10 : 5;
    return this._seekTotal = Math.max(
      0,
      Math.min(
        (this._seekTotal ?? this.$state.currentTime()) + (type === "seekForward" ? +seekBy : -seekBy),
        this.$state.duration()
      )
    );
  }
  _forwardTimeKeyboardEvent(event, forward) {
    this._timeSlider?.dispatchEvent(
      new KeyboardEvent(event.type, {
        key: !forward ? "Left" : "Right",
        shiftKey: event.shiftKey,
        trigger: event
      })
    );
  }
  _seeking(event, type, forward) {
    if (!this.$state.canSeek())
      return;
    if (!this._timeSlider)
      this._timeSlider = this.el.querySelector("[data-media-time-slider]");
    if (this._timeSlider) {
      this._forwardTimeKeyboardEvent(event, forward);
    } else {
      this._media.remote.seeking(this._calcSeekAmount(event, type), event);
    }
  }
}
const SYMBOL_KEY_MAP = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
function replaceSymbolKeys(key) {
  return key.replace(/Shift\+(\d)/g, (_, num) => SYMBOL_KEY_MAP[num - 1]);
}

class ARIAKeyShortcuts extends ViewController {
  constructor(_shortcut) {
    super();
    this._shortcut = _shortcut;
  }
  onAttach(el) {
    const { $props, ariaKeys } = useMediaContext(), keys = el.getAttribute("aria-keyshortcuts");
    if (keys) {
      ariaKeys[this._shortcut] = keys;
      if (!IS_SERVER) {
        onDispose(() => {
          delete ariaKeys[this._shortcut];
        });
      }
      return;
    }
    const shortcuts = $props.keyShortcuts()[this._shortcut];
    if (shortcuts) {
      const keys2 = isArray(shortcuts) ? shortcuts.join(" ") : isString(shortcuts) ? shortcuts : shortcuts?.keys;
      el.setAttribute("aria-keyshortcuts", isArray(keys2) ? keys2.join(" ") : keys2);
    }
  }
}

const AUDIO_EXTENSIONS = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
const AUDIO_TYPES = /* @__PURE__ */ new Set([
  "audio/mpeg",
  "audio/ogg",
  "audio/3gp",
  "audio/mp4",
  "audio/webm",
  "audio/flac"
]);
const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;
const VIDEO_TYPES = /* @__PURE__ */ new Set([
  "video/mp4",
  "video/webm",
  "video/3gp",
  "video/ogg",
  "video/avi",
  "video/mpeg"
]);
const HLS_VIDEO_EXTENSIONS = /\.(m3u8)($|\?)/i;
const HLS_VIDEO_TYPES = /* @__PURE__ */ new Set([
  // Apple sanctioned
  "application/vnd.apple.mpegurl",
  // Apple sanctioned for backwards compatibility
  "audio/mpegurl",
  // Very common
  "audio/x-mpegurl",
  // Very common
  "application/x-mpegurl",
  // Included for completeness
  "video/x-mpegurl",
  "video/mpegurl",
  "application/mpegurl"
]);
function isHLSSrc({ src, type }) {
  return isString(src) && HLS_VIDEO_EXTENSIONS.test(src) || HLS_VIDEO_TYPES.has(type);
}
function isMediaStream(src) {
  return !IS_SERVER && typeof window.MediaStream !== "undefined" && src instanceof window.MediaStream;
}

class AudioProviderLoader {
  canPlay({ src, type }) {
    return isString(src) ? AUDIO_EXTENSIONS.test(src) || AUDIO_TYPES.has(type) || src.startsWith("blob:") && type === "audio/object" : type === "audio/object";
  }
  mediaType() {
    return "audio";
  }
  async load() {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load audio provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<audio>` element was not found - did you forget to include `<media-provider>`?"
      );
    }
    return new (await import('./vidstack-JmYRnpB3.js')).AudioProvider(this.target);
  }
}

class VideoProviderLoader {
  canPlay(src) {
    return isString(src.src) ? VIDEO_EXTENSIONS.test(src.src) || VIDEO_TYPES.has(src.type) || src.src.startsWith("blob:") && src.type === "video/object" || isHLSSrc(src) && (IS_SERVER || canPlayHLSNatively()) : src.type === "video/object";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load video provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<video>` element was not found - did you forget to include media provider?"
      );
    }
    return new (await import('./vidstack-tuQflCuD.js')).VideoProvider(this.target, ctx);
  }
}

class YouTubeProviderLoader {
  canPlay(src) {
    return isString(src.src) && src.type === "video/youtube";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load youtube provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<iframe>` element was not found - did you forget to include media provider?"
      );
    }
    return new (await import('./vidstack-jur2gRfs.js')).YouTubeProvider(this.target);
  }
}

const _HLSProviderLoader = class _HLSProviderLoader extends VideoProviderLoader {
  canPlay(src) {
    return _HLSProviderLoader.supported && isHLSSrc(src);
  }
  async load(context) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load hls provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<video>` element was not found - did you forget to include `<media-provider>`?"
      );
    }
    return new (await import('./vidstack-ylx5Ro_L.js')).HLSProvider(this.target, context);
  }
};
_HLSProviderLoader.supported = isHLSSupported();
let HLSProviderLoader = _HLSProviderLoader;

class VimeoProviderLoader {
  canPlay(src) {
    return isString(src.src) && src.type === "video/vimeo";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error("[vidstack] can not load vimeo provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<iframe>` element was not found - did you forget to include media provider?"
      );
    }
    return new (await import('./vidstack-HYS4G4cb.js')).VimeoProvider(this.target);
  }
}

const MEDIA_ATTRIBUTES = Symbol("MEDIA_ATTRIBUTES" );
const mediaAttributes = [
  "autoplay",
  "canFullscreen",
  "canPictureInPicture",
  "canLoad",
  "canPlay",
  "canSeek",
  "ended",
  "fullscreen",
  "loop",
  "live",
  "liveEdge",
  "mediaType",
  "muted",
  "paused",
  "pictureInPicture",
  "playing",
  "playsinline",
  "seeking",
  "started",
  "streamType",
  "viewType",
  "waiting"
];

const mediaPlayerProps = {
  autoplay: false,
  controls: false,
  currentTime: 0,
  crossorigin: null,
  fullscreenOrientation: "landscape",
  load: "visible",
  logLevel: "warn" ,
  loop: false,
  muted: false,
  paused: true,
  playsinline: false,
  playbackRate: 1,
  poster: "",
  preload: "metadata",
  preferNativeHLS: false,
  src: "",
  title: "",
  controlsDelay: 2e3,
  hideControlsOnMouseLeave: false,
  viewType: "unknown",
  streamType: "unknown",
  volume: 1,
  liveEdgeTolerance: 10,
  minLiveDVRWindow: 60,
  keyDisabled: false,
  keyTarget: "player",
  keyShortcuts: MEDIA_KEY_SHORTCUTS
};

const MEDIA_EVENTS = [
  "abort",
  "can-play",
  "can-play-through",
  "duration-change",
  "emptied",
  "ended",
  "error",
  "fullscreen-change",
  "loaded-data",
  "loaded-metadata",
  "load-start",
  "media-type-change",
  "pause",
  "play",
  "playing",
  "progress",
  "seeked",
  "seeking",
  "source-change",
  "sources-change",
  "stalled",
  "started",
  "suspend",
  "stream-type-change",
  "replay",
  // 'time-update',
  "view-type-change",
  "volume-change",
  "waiting"
] ;
class MediaEventsLogger extends MediaPlayerController {
  constructor(_media) {
    super();
    this._media = _media;
  }
  onConnect() {
    const handler = this._onMediaEvent.bind(this);
    for (const eventType of MEDIA_EVENTS)
      this.listen(eventType, handler);
  }
  _onMediaEvent(event) {
    this._media.logger?.debugGroup(`\u{1F4E1} dispatching \`${event.type}\``).labelledLog("Media Store", { ...this.$state }).labelledLog("Event", event).dispatch();
  }
}

class MediaLoadController extends MediaPlayerController {
  constructor(_callback) {
    super();
    this._callback = _callback;
  }
  async onAttach(el) {
    if (IS_SERVER)
      return;
    const load = this.$props.load();
    if (load === "eager") {
      requestAnimationFrame(this._callback);
    } else if (load === "idle") {
      waitIdlePeriod(this._callback);
    } else if (load === "visible") {
      const observer = new IntersectionObserver((entries) => {
        if (!this.scope)
          return;
        if (entries[0].isIntersecting) {
          observer.disconnect();
          this._callback();
        }
      });
      observer.observe(el);
      return observer.disconnect.bind(observer);
    }
  }
}

let seenAutoplayWarning = false;
class MediaPlayerDelegate {
  constructor(_handle, _media) {
    this._handle = _handle;
    this._media = _media;
    this._notify = (type, ...init) => {
      if (IS_SERVER)
        return;
      this._handle(
        new DOMEvent(type, {
          detail: init?.[0],
          trigger: init?.[1]
        })
      );
    };
  }
  async _ready(info, trigger) {
    if (IS_SERVER)
      return;
    const { $state, logger } = this._media;
    if (peek($state.canPlay))
      return;
    const detail = {
      duration: info?.duration ?? peek($state.duration),
      seekable: info?.seekable ?? peek($state.seekable),
      buffered: info?.buffered ?? peek($state.buffered),
      provider: peek(this._media.$provider)
    };
    this._notify("can-play", detail, trigger);
    tick();
    {
      logger?.infoGroup("-~-~-~-~-~-~- \u2705 MEDIA READY -~-~-~-~-~-~-").labelledLog("Media Store", { ...$state }).labelledLog("Trigger Event", trigger).dispatch();
    }
    const provider = peek(this._media.$provider), { muted, volume, playsinline } = this._media.$props;
    if (provider) {
      provider.setVolume(peek(volume));
      provider.setMuted(peek(muted));
      provider.setPlaysinline?.(peek(playsinline));
    }
    if ($state.canPlay() && $state.autoplay() && !$state.started()) {
      await this._attemptAutoplay(trigger);
    }
  }
  async _attemptAutoplay(trigger) {
    const { player, $state } = this._media;
    $state.autoplaying.set(true);
    const attemptEvent = new DOMEvent("autoplay-attempt", { trigger });
    try {
      await player.play(attemptEvent);
    } catch (error) {
      if (!seenAutoplayWarning) {
        const muteMsg = !$state.muted() ? " Attempting with volume muted will most likely resolve the issue." : "";
        this._media.logger?.errorGroup("autoplay request failed").labelledLog(
          "Message",
          `Autoplay was requested but failed most likely due to browser autoplay policies.${muteMsg}`
        ).labelledLog("Trigger Event", trigger).labelledLog("Error", error).labelledLog("See", "https://developer.chrome.com/blog/autoplay").dispatch();
        seenAutoplayWarning = true;
      }
    }
  }
}

class Queue {
  constructor() {
    this._queue = /* @__PURE__ */ new Map();
  }
  /**
   * Queue the given `item` under the given `key` to be processed at a later time by calling
   * `serve(key)`.
   */
  _enqueue(key, item) {
    if (!this._queue.has(key))
      this._queue.set(key, /* @__PURE__ */ new Set());
    this._queue.get(key).add(item);
  }
  /**
   * Process all items in queue for the given `key`.
   */
  _serve(key, callback) {
    const items = this._queue.get(key);
    if (items)
      for (const item of items)
        callback(item);
    this._queue.delete(key);
  }
  /**
   * Removes all queued items under the given `key`.
   */
  _delete(key) {
    this._queue.delete(key);
  }
  /**
   * The number of items currently queued under the given `key`.
   */
  _size(key) {
    return this._queue.get(key)?.size ?? 0;
  }
  /**
   * Clear all items in the queue.
   */
  _reset() {
    this._queue.clear();
  }
}

class RequestQueue {
  constructor() {
    this._serving = false;
    this._pending = deferredPromise();
    this._queue = /* @__PURE__ */ new Map();
  }
  /**
   * The number of callbacks that are currently in queue.
   */
  get _size() {
    return this._queue.size;
  }
  /**
   * Whether items in the queue are being served immediately, otherwise they're queued to
   * be processed later.
   */
  get _isServing() {
    return this._serving;
  }
  /**
   * Waits for the queue to be flushed (ie: start serving).
   */
  async _waitForFlush() {
    if (this._serving)
      return;
    await this._pending.promise;
  }
  /**
   * Queue the given `callback` to be invoked at a later time by either calling the `serve()` or
   * `start()` methods. If the queue has started serving (i.e., `start()` was already called),
   * then the callback will be invoked immediately.
   *
   * @param key - Uniquely identifies this callback so duplicates are ignored.
   * @param callback - The function to call when this item in the queue is being served.
   */
  _enqueue(key, callback) {
    if (this._serving) {
      callback();
      return;
    }
    this._queue.delete(key);
    this._queue.set(key, callback);
  }
  /**
   * Invokes the callback with the given `key` in the queue (if it exists).
   */
  _serve(key) {
    this._queue.get(key)?.();
    this._queue.delete(key);
  }
  /**
   * Flush all queued items and start serving future requests immediately until `stop()` is called.
   */
  _start() {
    this._flush();
    this._serving = true;
    if (this._queue.size > 0)
      this._flush();
  }
  /**
   * Stop serving requests, they'll be queued until you begin processing again by calling `start()`.
   */
  _stop() {
    this._serving = false;
  }
  /**
   * Stop serving requests, empty the request queue, and release any promises waiting for the
   * queue to flush.
   */
  _reset() {
    this._stop();
    this._queue.clear();
    this._release();
  }
  _flush() {
    for (const key of this._queue.keys())
      this._serve(key);
    this._release();
  }
  _release() {
    this._pending.resolve();
    this._pending = deferredPromise();
  }
}

function coerceToError(error) {
  return error instanceof Error ? error : Error(JSON.stringify(error));
}

class MediaRequestManager extends MediaPlayerController {
  constructor(_stateMgr, _request, _media) {
    super();
    this._stateMgr = _stateMgr;
    this._request = _request;
    this._media = _media;
    this._providerQueue = new RequestQueue();
    this._wasPIPActive = false;
    this._$provider = _media.$provider;
    this._controls = new MediaControls();
    this._fullscreen = new FullscreenController();
    this._orientation = new ScreenOrientationController();
  }
  onAttach() {
    this.listen("fullscreen-change", this._onFullscreenChange.bind(this));
  }
  onConnect() {
    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this)), handle = this._handleRequest.bind(this);
    for (const name of names) {
      if (name.startsWith("media-")) {
        this.listen(name, handle);
      }
    }
    effect(this._watchProvider.bind(this));
    effect(this._onControlsDelayChange.bind(this));
    effect(this._onFullscreenSupportChange.bind(this));
    effect(this._onPiPSupportChange.bind(this));
  }
  onDestroy() {
    this._providerQueue._reset();
  }
  _watchProvider() {
    const provider = this._$provider(), canPlay = this.$state.canPlay();
    if (provider && canPlay) {
      this._providerQueue._start();
    }
    return () => {
      this._providerQueue._stop();
    };
  }
  _handleRequest(event) {
    event.stopPropagation();
    {
      this._media.logger?.infoGroup(`\u{1F4EC} received \`${event.type}\``).labelledLog("Request", event).dispatch();
    }
    if (!this[event.type])
      return;
    if (peek(this._$provider)) {
      this[event.type](event);
    } else {
      this._providerQueue._enqueue(event.type, () => {
        if (peek(this._$provider))
          this[event.type](event);
      });
    }
  }
  async _play(trigger) {
    if (IS_SERVER)
      return;
    const { canPlay, paused, ended, autoplaying, seekableStart } = this.$state;
    if (!peek(paused))
      return;
    if (trigger?.type === "media-play-request") {
      this._request._queue._enqueue("play", trigger);
    }
    try {
      const provider = peek(this._$provider);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      if (peek(ended)) {
        provider.setCurrentTime(seekableStart() + 0.1);
      }
      return await provider.play();
    } catch (error) {
      {
        this._media.logger?.errorGroup("play request failed").labelledLog("Trigger", trigger).labelledLog("Error", error).dispatch();
      }
      const errorEvent = this.createEvent("play-fail", {
        detail: coerceToError(error),
        trigger
      });
      errorEvent.autoplay = autoplaying();
      this._stateMgr._handle(errorEvent);
      throw error;
    }
  }
  async _pause(trigger) {
    if (IS_SERVER)
      return;
    const { canPlay, paused } = this.$state;
    if (peek(paused))
      return;
    if (trigger?.type === "media-pause-request") {
      this._request._queue._enqueue("pause", trigger);
    }
    const provider = peek(this._$provider);
    throwIfNotReadyForPlayback(provider, peek(canPlay));
    return provider.pause();
  }
  _seekToLiveEdge(trigger) {
    if (IS_SERVER)
      return;
    const { canPlay, live, liveEdge, canSeek, liveSyncPosition, seekableEnd, userBehindLiveEdge } = this.$state;
    userBehindLiveEdge.set(false);
    if (peek(() => !live() || liveEdge() || !canSeek()))
      return;
    const provider = peek(this._$provider);
    throwIfNotReadyForPlayback(provider, peek(canPlay));
    provider.setCurrentTime(liveSyncPosition() ?? seekableEnd() - 2);
  }
  async _enterFullscreen(target = "prefer-media", trigger) {
    if (IS_SERVER)
      return;
    const adapter = this._getFullscreenAdapter(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (adapter.active)
      return;
    if (peek(this.$state.pictureInPicture)) {
      this._wasPIPActive = true;
      await this._exitPictureInPicture(trigger);
    }
    if (trigger?.type === "media-enter-fullscreen-request") {
      this._request._queue._enqueue("fullscreen", trigger);
    }
    return adapter.enter();
  }
  async _exitFullscreen(target = "prefer-media", trigger) {
    if (IS_SERVER)
      return;
    const adapter = this._getFullscreenAdapter(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (!adapter.active)
      return;
    if (trigger?.type === "media-exit-fullscreen-request") {
      this._request._queue._enqueue("fullscreen", trigger);
    }
    try {
      const result = await adapter.exit();
      if (this._wasPIPActive && peek(this.$state.canPictureInPicture)) {
        await this._enterPictureInPicture();
      }
      return result;
    } finally {
      this._wasPIPActive = false;
    }
  }
  _getFullscreenAdapter(target) {
    const provider = peek(this._$provider);
    return target === "prefer-media" && this._fullscreen.supported || target === "media" ? this._fullscreen : provider?.fullscreen;
  }
  async _enterPictureInPicture(trigger) {
    if (IS_SERVER)
      return;
    this._throwIfPIPNotSupported();
    if (this.$state.pictureInPicture())
      return;
    if (trigger?.type === "media-enter-pip-request") {
      this._request._queue._enqueue("pip", trigger);
    }
    return await this._$provider().pictureInPicture.enter();
  }
  async _exitPictureInPicture(trigger) {
    if (IS_SERVER)
      return;
    this._throwIfPIPNotSupported();
    if (!this.$state.pictureInPicture())
      return;
    if (trigger?.type === "media-exit-pip-request") {
      this._request._queue._enqueue("pip", trigger);
    }
    return await this._$provider().pictureInPicture.exit();
  }
  _throwIfPIPNotSupported() {
    if (this.$state.canPictureInPicture())
      return;
    throw Error(
      `[vidstack] picture-in-picture is not currently available` 
    );
  }
  _onControlsDelayChange() {
    this._controls.defaultDelay = this.$props.controlsDelay();
  }
  _onFullscreenSupportChange() {
    const { canLoad, canFullscreen } = this.$state, supported = this._fullscreen.supported || this._$provider()?.fullscreen?.supported || false;
    if (canLoad() && peek(canFullscreen) === supported)
      return;
    canFullscreen.set(supported);
  }
  _onPiPSupportChange() {
    const { canLoad, canPictureInPicture } = this.$state, supported = this._$provider()?.pictureInPicture?.supported || false;
    if (canLoad() && peek(canPictureInPicture) === supported)
      return;
    canPictureInPicture.set(supported);
  }
  ["media-audio-track-change-request"](event) {
    if (this._media.audioTracks.readonly) {
      {
        this._media.logger?.warnGroup(`[vidstack] attempted to change audio track but it is currently read-only`).labelledLog("Event", event).dispatch();
      }
      return;
    }
    const index = event.detail, track = this._media.audioTracks[index];
    if (track) {
      this._request._queue._enqueue("audioTrack", event);
      track.selected = true;
    } else {
      this._media.logger?.warnGroup("[vidstack] failed audio track change request (invalid index)").labelledLog("Audio Tracks", this._media.audioTracks.toArray()).labelledLog("Index", index).labelledLog("Event", event).dispatch();
    }
  }
  async ["media-enter-fullscreen-request"](event) {
    try {
      await this._enterFullscreen(event.detail, event);
    } catch (error) {
      this._onFullscreenError(error, event);
    }
  }
  async ["media-exit-fullscreen-request"](event) {
    try {
      await this._exitFullscreen(event.detail, event);
    } catch (error) {
      this._onFullscreenError(error, event);
    }
  }
  async _onFullscreenChange(event) {
    const lockType = peek(this.$props.fullscreenOrientation), isFullscreen = event.detail;
    if (isUndefined(lockType) || !this._orientation.supported)
      return;
    if (isFullscreen) {
      if (this._orientation.locked)
        return;
      this.dispatch("media-orientation-lock-request", {
        detail: lockType,
        trigger: event
      });
    } else if (this._orientation.locked) {
      this.dispatch("media-orientation-unlock-request", {
        trigger: event
      });
    }
  }
  _onFullscreenError(error, request) {
    {
      this._media.logger?.errorGroup("fullscreen request failed").labelledLog("Request", request).labelledLog("Error", error).dispatch();
    }
    this._stateMgr._handle(
      this.createEvent("fullscreen-error", {
        detail: coerceToError(error)
      })
    );
  }
  async ["media-orientation-lock-request"](event) {
    try {
      this._request._queue._enqueue("orientation", event);
      await this._orientation.lock(event.detail);
    } catch (error) {
      this._request._queue._delete("orientation");
      {
        this._media.logger?.errorGroup("failed to lock screen orientation").labelledLog("Request Event", event).labelledLog("Error", error).dispatch();
      }
    }
  }
  async ["media-orientation-unlock-request"](event) {
    try {
      this._request._queue._enqueue("orientation", event);
      await this._orientation.unlock();
    } catch (error) {
      this._request._queue._delete("orientation");
      {
        this._media.logger?.errorGroup("failed to unlock screen orientation").labelledLog("Request Event", event).labelledLog("Error", error).dispatch();
      }
    }
  }
  async ["media-enter-pip-request"](event) {
    try {
      await this._enterPictureInPicture(event);
    } catch (error) {
      this._onPictureInPictureError(error, event);
    }
  }
  async ["media-exit-pip-request"](event) {
    try {
      await this._exitPictureInPicture(event);
    } catch (error) {
      this._onPictureInPictureError(error, event);
    }
  }
  _onPictureInPictureError(error, request) {
    {
      this._media.logger?.errorGroup("pip request failed").labelledLog("Request", request).labelledLog("Error", error).dispatch();
    }
    this._stateMgr._handle(
      this.createEvent("picture-in-picture-error", {
        detail: coerceToError(error)
      })
    );
  }
  ["media-live-edge-request"](event) {
    const { live, liveEdge, canSeek } = this.$state;
    if (!live() || liveEdge() || !canSeek())
      return;
    this._request._queue._enqueue("seeked", event);
    try {
      this._seekToLiveEdge();
    } catch (error) {
      this._media.logger?.error("seek to live edge fail", error);
    }
  }
  async ["media-loop-request"](event) {
    try {
      this._request._looping = true;
      this._request._replaying = true;
      await this._play(event);
    } catch (e) {
      this._request._looping = false;
      this._request._replaying = false;
    }
  }
  async ["media-pause-request"](event) {
    if (this.$state.paused())
      return;
    try {
      await this._pause(event);
    } catch (error) {
      {
        this._media.logger?.errorGroup("\u03C0ause request failed").labelledLog("Request", event).labelledLog("Error", error).dispatch();
      }
      this._request._queue._delete("pause");
      this._media.logger?.error("pause-fail", error);
    }
  }
  async ["media-play-request"](event) {
    if (!this.$state.paused())
      return;
    try {
      await this._play(event);
    } catch (e) {
    }
  }
  ["media-rate-change-request"](event) {
    const { playbackRate, canSetPlaybackRate } = this.$state;
    if (playbackRate() === event.detail || !canSetPlaybackRate())
      return;
    const provider = this._$provider();
    if (!provider?.setPlaybackRate)
      return;
    this._request._queue._enqueue("rate", event);
    provider.setPlaybackRate(event.detail);
  }
  ["media-quality-change-request"](event) {
    if (this._media.qualities.readonly) {
      {
        this._media.logger?.warnGroup(`[vidstack] attempted to change video quality but it is currently read-only`).labelledLog("Event", event).dispatch();
      }
      return;
    }
    this._request._queue._enqueue("quality", event);
    const index = event.detail;
    if (index < 0) {
      this._media.qualities.autoSelect(event);
    } else {
      const quality = this._media.qualities[index];
      if (quality) {
        quality.selected = true;
      } else {
        this._media.logger?.warnGroup("[vidstack] failed quality change request (invalid index)").labelledLog("Qualities", this._media.qualities.toArray()).labelledLog("Index", index).labelledLog("Event", event).dispatch();
      }
    }
  }
  ["media-pause-controls-request"](event) {
    this._request._queue._enqueue("controls", event);
    this._controls.pause(event);
  }
  ["media-resume-controls-request"](event) {
    this._request._queue._enqueue("controls", event);
    this._controls.resume(event);
  }
  ["media-seek-request"](event) {
    const { seekableStart, seekableEnd, ended, canSeek, live, userBehindLiveEdge } = this.$state;
    if (ended())
      this._request._replaying = true;
    this._request._seeking = false;
    this._request._queue._delete("seeking");
    const boundTime = Math.min(Math.max(seekableStart() + 0.1, event.detail), seekableEnd() - 0.1);
    if (!Number.isFinite(boundTime) || !canSeek())
      return;
    this._request._queue._enqueue("seeked", event);
    this._$provider().setCurrentTime(boundTime);
    if (live() && event.isOriginTrusted && Math.abs(seekableEnd() - boundTime) >= 2) {
      userBehindLiveEdge.set(true);
    }
  }
  ["media-seeking-request"](event) {
    this._request._queue._enqueue("seeking", event);
    this.$state.seeking.set(true);
    this._request._seeking = true;
  }
  ["media-start-loading"](event) {
    if (this.$state.canLoad())
      return;
    this._request._queue._enqueue("load", event);
    this._stateMgr._handle(this.createEvent("can-load"));
  }
  ["media-text-track-change-request"](event) {
    const { index, mode } = event.detail, track = this._media.textTracks[index];
    if (track) {
      this._request._queue._enqueue("textTrack", event);
      track.setMode(mode, event);
    } else {
      this._media.logger?.warnGroup("[vidstack] failed text track change request (invalid index)").labelledLog("Text Tracks", this._media.textTracks.toArray()).labelledLog("Index", index).labelledLog("Event", event).dispatch();
    }
  }
  ["media-mute-request"](event) {
    if (this.$state.muted())
      return;
    this._request._queue._enqueue("volume", event);
    this._$provider().setMuted(true);
  }
  ["media-unmute-request"](event) {
    const { muted, volume } = this.$state;
    if (!muted())
      return;
    this._request._queue._enqueue("volume", event);
    this._media.$provider().setMuted(false);
    if (volume() === 0) {
      this._request._queue._enqueue("volume", event);
      this._$provider().setVolume(0.25);
    }
  }
  ["media-volume-change-request"](event) {
    const { muted, volume } = this.$state;
    const newVolume = event.detail;
    if (volume() === newVolume)
      return;
    this._request._queue._enqueue("volume", event);
    this._$provider().setVolume(newVolume);
    if (newVolume > 0 && muted()) {
      this._request._queue._enqueue("volume", event);
      this._$provider().setMuted(false);
    }
  }
}
function throwIfNotReadyForPlayback(provider, canPlay) {
  if (provider && canPlay)
    return;
  throw Error(
    `[vidstack] media is not ready - wait for \`can-play\` event.` 
  );
}
function throwIfFullscreenNotSupported(target, fullscreen) {
  if (fullscreen?.supported)
    return;
  throw Error(
    `[vidstack] fullscreen is not currently available on target \`${target}\`` 
  );
}
class MediaRequestContext {
  constructor() {
    this._seeking = false;
    this._looping = false;
    this._replaying = false;
    this._queue = new Queue();
  }
}

var functionDebounce = debounce;

function debounce(fn, wait, callFirst) {
  var timeout = null;
  var debouncedFn = null;

  var clear = function() {
    if (timeout) {
      clearTimeout(timeout);

      debouncedFn = null;
      timeout = null;
    }
  };

  var flush = function() {
    var call = debouncedFn;
    clear();

    if (call) {
      call();
    }
  };

  var debounceWrapper = function() {
    if (!wait) {
      return fn.apply(this, arguments);
    }

    var context = this;
    var args = arguments;
    var callNow = callFirst && !timeout;
    clear();

    debouncedFn = function() {
      fn.apply(context, args);
    };

    timeout = setTimeout(function() {
      timeout = null;

      if (!callNow) {
        var call = debouncedFn;
        debouncedFn = null;

        return call();
      }
    }, wait);

    if (callNow) {
      return debouncedFn();
    }
  };

  debounceWrapper.cancel = clear;
  debounceWrapper.flush = flush;

  return debounceWrapper;
}

var functionThrottle = throttle;

function throttle(fn, interval, options) {
  var timeoutId = null;
  var throttledFn = null;
  var leading = (options && options.leading);
  var trailing = (options && options.trailing);

  if (leading == null) {
    leading = true; // default
  }

  if (trailing == null) {
    trailing = !leading; //default
  }

  if (leading == true) {
    trailing = false; // forced because there should be invocation per call
  }

  var cancel = function() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  var flush = function() {
    var call = throttledFn;
    cancel();

    if (call) {
      call();
    }
  };

  var throttleWrapper = function() {
    var callNow = leading && !timeoutId;
    var context = this;
    var args = arguments;

    throttledFn = function() {
      return fn.apply(context, args);
    };

    if (!timeoutId) {
      timeoutId = setTimeout(function() {
        timeoutId = null;

        if (trailing) {
          return throttledFn();
        }
      }, interval);
    }

    if (callNow) {
      callNow = false;
      return throttledFn();
    }
  };

  throttleWrapper.cancel = cancel;
  throttleWrapper.flush = flush;

  return throttleWrapper;
}

const TRACKED_EVENT = /* @__PURE__ */ new Set([
  "autoplay",
  "autoplay-fail",
  "can-load",
  "sources-change",
  "source-change",
  "load-start",
  "abort",
  "error",
  "loaded-metadata",
  "loaded-data",
  "can-play",
  "play",
  "play-fail",
  "pause",
  "playing",
  "seeking",
  "seeked",
  "waiting"
]);

class MediaStateManager extends MediaPlayerController {
  constructor(_request, _media) {
    super();
    this._request = _request;
    this._media = _media;
    this._trackedEvents = /* @__PURE__ */ new Map();
    this._firingWaiting = false;
    this._isPlayingOnDisconnect = false;
    this["seeking"] = functionThrottle(
      (event) => {
        const { seeking, currentTime, paused } = this.$state;
        seeking.set(true);
        currentTime.set(event.detail);
        this._satisfyRequest("seeking", event);
        if (paused()) {
          this._waitingTrigger = event;
          this._fireWaiting();
        }
      },
      150,
      { leading: true }
    );
    this._fireWaiting = functionDebounce(() => {
      if (!this._waitingTrigger)
        return;
      this._firingWaiting = true;
      const { waiting, playing } = this.$state;
      waiting.set(true);
      playing.set(false);
      const event = this.createEvent("waiting", { trigger: this._waitingTrigger });
      this._trackedEvents.set("waiting", event);
      this.dispatch(event);
      this._waitingTrigger = void 0;
      this._firingWaiting = false;
    }, 300);
  }
  onAttach(el) {
    el.setAttribute("aria-busy", "true");
    this.listen("fullscreen-change", this["fullscreen-change"].bind(this));
    this.listen("fullscreen-error", this["fullscreen-error"].bind(this));
    this.listen("orientation-change", this["orientation-change"].bind(this));
  }
  onConnect(el) {
    this._addTextTrackListeners();
    this._addQualityListeners();
    this._addAudioTrackListeners();
    this._resumePlaybackOnConnect();
    onDispose(this._pausePlaybackOnDisconnect.bind(this));
  }
  _handle(event) {
    if (!this.scope)
      return;
    const type = event.type;
    this[event.type]?.(event);
    if (!IS_SERVER) {
      if (TRACKED_EVENT.has(type))
        this._trackedEvents.set(type, event);
      this.dispatch(event);
    }
  }
  _resumePlaybackOnConnect() {
    if (!this._isPlayingOnDisconnect)
      return;
    if (this._media.$provider()?.paused) {
      requestAnimationFrame(() => {
        if (!this.scope)
          return;
        this._media.remote.play(new DOMEvent("dom-connect"));
      });
    }
    this._isPlayingOnDisconnect = false;
  }
  _pausePlaybackOnDisconnect() {
    if (this._isPlayingOnDisconnect)
      return;
    this._isPlayingOnDisconnect = !this._media.$state.paused();
    this._media.$provider()?.pause();
  }
  _resetTracking() {
    this._stopWaiting();
    this._request._replaying = false;
    this._request._looping = false;
    this._firingWaiting = false;
    this._waitingTrigger = void 0;
    this._trackedEvents.clear();
  }
  _satisfyRequest(request, event) {
    this._request._queue._serve(request, (requestEvent) => {
      event.request = requestEvent;
      event.triggers.add(requestEvent);
    });
  }
  _addTextTrackListeners() {
    this._onTextTracksChange();
    this._onTextTrackModeChange();
    const textTracks = this._media.textTracks;
    listenEvent(textTracks, "add", this._onTextTracksChange.bind(this));
    listenEvent(textTracks, "remove", this._onTextTracksChange.bind(this));
    listenEvent(textTracks, "mode-change", this._onTextTrackModeChange.bind(this));
  }
  _addQualityListeners() {
    const qualities = this._media.qualities;
    listenEvent(qualities, "add", this._onQualitiesChange.bind(this));
    listenEvent(qualities, "remove", this._onQualitiesChange.bind(this));
    listenEvent(qualities, "change", this._onQualityChange.bind(this));
    listenEvent(qualities, "auto-change", this._onAutoQualityChange.bind(this));
    listenEvent(qualities, "readonly-change", this._onCanSetQualityChange.bind(this));
  }
  _addAudioTrackListeners() {
    const audioTracks = this._media.audioTracks;
    listenEvent(audioTracks, "add", this._onAudioTracksChange.bind(this));
    listenEvent(audioTracks, "remove", this._onAudioTracksChange.bind(this));
    listenEvent(audioTracks, "change", this._onAudioTrackChange.bind(this));
  }
  _onTextTracksChange(event) {
    const { textTracks } = this.$state;
    textTracks.set(this._media.textTracks.toArray());
    this.dispatch("text-tracks-change", {
      detail: textTracks(),
      trigger: event
    });
  }
  _onTextTrackModeChange(event) {
    if (event)
      this._satisfyRequest("textTrack", event);
    const current = this._media.textTracks.selected, { textTrack } = this.$state;
    if (textTrack() !== current) {
      textTrack.set(current);
      this.dispatch("text-track-change", {
        detail: current,
        trigger: event
      });
    }
  }
  _onAudioTracksChange(event) {
    const { audioTracks } = this.$state;
    audioTracks.set(this._media.audioTracks.toArray());
    this.dispatch("audio-tracks-change", {
      detail: audioTracks(),
      trigger: event
    });
  }
  _onAudioTrackChange(event) {
    const { audioTrack } = this.$state;
    audioTrack.set(this._media.audioTracks.selected);
    this._satisfyRequest("audioTrack", event);
    this.dispatch("audio-track-change", {
      detail: audioTrack(),
      trigger: event
    });
  }
  _onQualitiesChange(event) {
    const { qualities } = this.$state;
    qualities.set(this._media.qualities.toArray());
    this.dispatch("qualities-change", {
      detail: qualities(),
      trigger: event
    });
  }
  _onQualityChange(event) {
    const { quality } = this.$state;
    quality.set(this._media.qualities.selected);
    this._satisfyRequest("quality", event);
    this.dispatch("quality-change", {
      detail: quality(),
      trigger: event
    });
  }
  _onAutoQualityChange() {
    this.$state.autoQuality.set(this._media.qualities.auto);
  }
  _onCanSetQualityChange() {
    this.$state.canSetQuality.set(!this._media.qualities.readonly);
  }
  ["provider-change"](event) {
    const prevProvider = this._media.$provider(), newProvider = event.detail;
    if (prevProvider?.type === newProvider?.type)
      return;
    prevProvider?.destroy?.();
    prevProvider?.scope?.dispose();
    this._media.$provider.set(event.detail);
    if (prevProvider && event.detail === null)
      this._resetMediaState(event);
  }
  ["provider-loader-change"](event) {
    {
      this._media.logger?.infoGroup(`Loader change \`${event.detail?.constructor.name}\``).labelledLog("Event", event).dispatch();
    }
  }
  ["autoplay"](event) {
    this.$state.autoplayError.set(null);
  }
  ["autoplay-fail"](event) {
    this.$state.autoplayError.set(event.detail);
    this._resetTracking();
  }
  ["can-load"](event) {
    this.$state.canLoad.set(true);
    this._trackedEvents.set("can-load", event);
    this._satisfyRequest("load", event);
    this._media.textTracks[TextTrackSymbol._canLoad]();
  }
  ["media-type-change"](event) {
    const sourceChangeEvent = this._trackedEvents.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const viewType = this.$state.viewType();
    this.$state.mediaType.set(event.detail);
    const providedViewType = this.$state.providedViewType(), currentViewType = providedViewType === "unknown" ? event.detail : providedViewType;
    if (viewType !== currentViewType) {
      if (IS_SERVER) {
        this.$state.inferredViewType.set(currentViewType);
      } else {
        setTimeout(() => {
          requestAnimationFrame(() => {
            if (!this.scope)
              return;
            this.$state.inferredViewType.set(event.detail);
            this.dispatch("view-type-change", {
              detail: currentViewType,
              trigger: event
            });
          });
        }, 0);
      }
    }
  }
  ["stream-type-change"](event) {
    const sourceChangeEvent = this._trackedEvents.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const { streamType, inferredStreamType } = this.$state;
    inferredStreamType.set(event.detail);
    event.detail = streamType();
  }
  ["rate-change"](event) {
    this.$state.playbackRate.set(event.detail);
    this._satisfyRequest("rate", event);
  }
  ["sources-change"](event) {
    this.$state.sources.set(event.detail);
  }
  ["source-change"](event) {
    const sourcesChangeEvent = this._trackedEvents.get("sources-change");
    if (sourcesChangeEvent)
      event.triggers.add(sourcesChangeEvent);
    this._resetMediaState(event);
    this._trackedEvents.set(event.type, event);
    this.$state.source.set(event.detail);
    this.el?.setAttribute("aria-busy", "true");
    {
      this._media.logger?.infoGroup("\u{1F4FC} Media source change").labelledLog("Source", event.detail).dispatch();
    }
  }
  _resetMediaState(event) {
    this._media.audioTracks[ListSymbol._reset](event);
    this._media.qualities[ListSymbol._reset](event);
    this._resetTracking();
    softResetMediaState(this._media.$state);
  }
  ["abort"](event) {
    const sourceChangeEvent = this._trackedEvents.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const canLoadEvent = this._trackedEvents.get("can-load");
    if (canLoadEvent && !event.triggers.hasType("can-load")) {
      event.triggers.add(canLoadEvent);
    }
  }
  ["load-start"](event) {
    const sourceChangeEvent = this._trackedEvents.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
  }
  ["error"](event) {
    this.$state.error.set(event.detail);
    const abortEvent = this._trackedEvents.get("abort");
    if (abortEvent)
      event.triggers.add(abortEvent);
  }
  ["loaded-metadata"](event) {
    const loadStartEvent = this._trackedEvents.get("load-start");
    if (loadStartEvent)
      event.triggers.add(loadStartEvent);
  }
  ["loaded-data"](event) {
    const loadStartEvent = this._trackedEvents.get("load-start");
    if (loadStartEvent)
      event.triggers.add(loadStartEvent);
  }
  ["can-play"](event) {
    const loadedMetadata = this._trackedEvents.get("loaded-metadata");
    if (loadedMetadata)
      event.triggers.add(loadedMetadata);
    this._onCanPlayDetail(event.detail);
    this.el?.setAttribute("aria-busy", "false");
  }
  ["can-play-through"](event) {
    this._onCanPlayDetail(event.detail);
    const canPlay = this._trackedEvents.get("can-play");
    if (canPlay)
      event.triggers.add(canPlay);
  }
  _onCanPlayDetail(detail) {
    const { seekable, seekableEnd, buffered, duration, canPlay } = this.$state;
    canPlay.set(true);
    buffered.set(detail.buffered);
    seekable.set(detail.seekable);
    duration.set(seekableEnd());
  }
  ["duration-change"](event) {
    const { live, duration } = this.$state, time = event.detail;
    if (!live())
      duration.set(!Number.isNaN(time) ? time : 0);
  }
  ["progress"](event) {
    const { buffered, seekable, live, duration, seekableEnd } = this.$state, detail = event.detail;
    buffered.set(detail.buffered);
    seekable.set(detail.seekable);
    if (live()) {
      duration.set(seekableEnd);
      this.dispatch("duration-change", {
        detail: seekableEnd(),
        trigger: event
      });
    }
  }
  ["play"](event) {
    const { paused, autoplayError, ended, autoplaying, playsinline, pointer, muted, viewType } = this.$state;
    event.autoplay = autoplaying();
    if (this._request._looping || !paused()) {
      event.stopImmediatePropagation();
      return;
    }
    const waitingEvent = this._trackedEvents.get("waiting");
    if (waitingEvent)
      event.triggers.add(waitingEvent);
    this._satisfyRequest("play", event);
    this._trackedEvents.set("play", event);
    paused.set(false);
    autoplayError.set(null);
    if (event.autoplay) {
      this._handle(
        this.createEvent("autoplay", {
          detail: { muted: muted() },
          trigger: event
        })
      );
      autoplaying.set(false);
    }
    if (ended() || this._request._replaying) {
      this._request._replaying = false;
      ended.set(false);
      this._handle(this.createEvent("replay", { trigger: event }));
    }
    if (!playsinline() && viewType() === "video" && pointer() === "coarse") {
      this._media.remote.enterFullscreen("prefer-media", event);
    }
  }
  ["play-fail"](event) {
    const { muted, autoplaying } = this.$state;
    const playEvent = this._trackedEvents.get("play");
    if (playEvent)
      event.triggers.add(playEvent);
    this._satisfyRequest("play", event);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    this._resetTracking();
    this._trackedEvents.set("play-fail", event);
    if (event.autoplay) {
      this._handle(
        this.createEvent("autoplay-fail", {
          detail: {
            muted: muted(),
            error: event.detail
          },
          trigger: event
        })
      );
      autoplaying.set(false);
    }
  }
  ["playing"](event) {
    const playEvent = this._trackedEvents.get("play"), seekedEvent = this._trackedEvents.get("seeked");
    if (playEvent)
      event.triggers.add(playEvent);
    else if (seekedEvent)
      event.triggers.add(seekedEvent);
    setTimeout(() => this._resetTracking(), 0);
    const {
      paused,
      playing,
      live,
      liveSyncPosition,
      seekableEnd,
      started,
      currentTime,
      seeking,
      ended
    } = this.$state;
    paused.set(false);
    playing.set(true);
    seeking.set(false);
    ended.set(false);
    if (this._request._looping) {
      event.stopImmediatePropagation();
      this._request._looping = false;
      return;
    }
    if (live() && !started() && currentTime() === 0) {
      const end = liveSyncPosition() ?? seekableEnd() - 2;
      if (Number.isFinite(end))
        this._media.$provider().setCurrentTime(end);
    }
    this["started"](event);
  }
  ["started"](event) {
    const { started } = this.$state;
    if (!started()) {
      started.set(true);
      this._handle(this.createEvent("started", { trigger: event }));
    }
  }
  ["pause"](event) {
    if (!this.el?.isConnected) {
      this._isPlayingOnDisconnect = true;
    }
    if (this._request._looping) {
      event.stopImmediatePropagation();
      return;
    }
    const seekedEvent = this._trackedEvents.get("seeked");
    if (seekedEvent)
      event.triggers.add(seekedEvent);
    this._satisfyRequest("pause", event);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    this._resetTracking();
  }
  ["time-update"](event) {
    const { currentTime, played, waiting } = this.$state, detail = event.detail;
    currentTime.set(detail.currentTime);
    played.set(detail.played);
    waiting.set(false);
    for (const track of this._media.textTracks) {
      track[TextTrackSymbol._updateActiveCues](detail.currentTime, event);
    }
  }
  ["volume-change"](event) {
    const { volume, muted } = this.$state, detail = event.detail;
    volume.set(detail.volume);
    muted.set(detail.muted || detail.volume === 0);
    this._satisfyRequest("volume", event);
  }
  ["seeked"](event) {
    const { seeking, currentTime, paused, duration, ended } = this.$state;
    if (this._request._seeking) {
      seeking.set(true);
      event.stopImmediatePropagation();
    } else if (seeking()) {
      const waitingEvent = this._trackedEvents.get("waiting");
      if (waitingEvent)
        event.triggers.add(waitingEvent);
      const seekingEvent = this._trackedEvents.get("seeking");
      if (seekingEvent && !event.triggers.has(seekingEvent)) {
        event.triggers.add(seekingEvent);
      }
      if (paused())
        this._stopWaiting();
      seeking.set(false);
      if (event.detail !== duration())
        ended.set(false);
      currentTime.set(event.detail);
      this._satisfyRequest("seeked", event);
      const origin = event?.originEvent;
      if (origin?.isTrusted && !/seek/.test(origin.type)) {
        this["started"](event);
      }
    }
  }
  ["waiting"](event) {
    if (this._firingWaiting || this._request._seeking)
      return;
    event.stopImmediatePropagation();
    this._waitingTrigger = event;
    this._fireWaiting();
  }
  ["end"](event) {
    const { loop } = this.$state;
    if (loop()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.dispatch("media-loop-request", {
            trigger: event
          });
        });
      }, 0);
      return;
    }
    this._onEnded(event);
  }
  _onEnded(event) {
    const { paused, seeking, ended, duration } = this.$state;
    if (!paused()) {
      this.dispatch("pause", { trigger: event });
    }
    if (seeking()) {
      this.dispatch("seeked", {
        detail: duration(),
        trigger: event
      });
    }
    ended.set(true);
    this._resetTracking();
    this.dispatch("ended", {
      trigger: event
    });
  }
  _stopWaiting() {
    this._fireWaiting.cancel();
    this.$state.waiting.set(false);
  }
  ["fullscreen-change"](event) {
    this.$state.fullscreen.set(event.detail);
    this._satisfyRequest("fullscreen", event);
  }
  ["fullscreen-error"](event) {
    this._satisfyRequest("fullscreen", event);
  }
  ["orientation-change"](event) {
    this._satisfyRequest("orientation", event);
  }
  ["picture-in-picture-change"](event) {
    this.$state.pictureInPicture.set(event.detail);
    this._satisfyRequest("pip", event);
  }
  ["picture-in-picture-error"](event) {
    this._satisfyRequest("pip", event);
  }
  ["title-change"](event) {
    event.stopImmediatePropagation();
    this.$state.inferredTitle.set(event.detail);
  }
  ["poster-change"](event) {
    event.stopImmediatePropagation();
    this.$state.inferredPoster.set(event.detail);
  }
}

class MediaStateSync extends MediaPlayerController {
  onSetup() {
    this._init();
    if (IS_SERVER)
      return;
    effect(this._watchLogLevel.bind(this));
    effect(this._watchProvidedTypes.bind(this));
    effect(this._watchTitle.bind(this));
    effect(this._watchAutoplay.bind(this));
    effect(this._watchPoster.bind(this));
    effect(this._watchLoop.bind(this));
    effect(this._watchControls.bind(this));
    effect(this._watchCrossOrigin.bind(this));
    effect(this._watchPlaysinline.bind(this));
    effect(this._watchLiveTolerance.bind(this));
    effect(this._watchLive.bind(this));
    effect(this._watchLiveEdge.bind(this));
  }
  _init() {
    const providedProps = {
      poster: "providedPoster",
      streamType: "providedStreamType",
      title: "providedTitle",
      viewType: "providedViewType"
    };
    for (const prop of Object.keys(this.$props)) {
      this.$state[providedProps[prop] ?? prop]?.set(this.$props[prop]());
    }
    this.$state.muted.set(this.$props.muted() || this.$props.volume() === 0);
  }
  // Sync "provided" props with internal state. Provided props are used to differentiate from
  // provider inferred values.
  _watchProvidedTypes() {
    const { viewType, streamType, title, poster } = this.$props;
    this.$state.providedPoster.set(poster());
    this.$state.providedStreamType.set(streamType());
    this.$state.providedViewType.set(viewType());
    this.$state.providedTitle.set(title());
  }
  _watchLogLevel() {
    this.$state.logLevel.set(this.$props.logLevel());
  }
  _watchTitle() {
    const { title } = this.$state;
    this.dispatch("title-change", { detail: title() });
  }
  _watchAutoplay() {
    const autoplay = this.$props.autoplay();
    this.$state.autoplay.set(autoplay);
    this.dispatch("autoplay-change", { detail: autoplay });
  }
  _watchLoop() {
    const loop = this.$props.loop();
    this.$state.loop.set(loop);
    this.dispatch("loop-change", { detail: loop });
  }
  _watchControls() {
    const controls = this.$props.controls();
    this.$state.controls.set(controls);
  }
  _watchPoster() {
    const { poster } = this.$state;
    this.dispatch("poster-change", { detail: poster() });
  }
  _watchCrossOrigin() {
    const crossorigin = this.$props.crossorigin();
    this.$state.crossorigin.set(crossorigin === true ? "" : crossorigin);
  }
  _watchPlaysinline() {
    const playsinline = this.$props.playsinline();
    this.$state.playsinline.set(playsinline);
    this.dispatch("playsinline-change", { detail: playsinline });
  }
  _watchLive() {
    this.dispatch("live-change", { detail: this.$state.live() });
  }
  _watchLiveTolerance() {
    this.$state.liveEdgeTolerance.set(this.$props.liveEdgeTolerance());
    this.$state.minLiveDVRWindow.set(this.$props.minLiveDVRWindow());
  }
  _watchLiveEdge() {
    this.dispatch("live-edge-change", { detail: this.$state.liveEdge() });
  }
}

const LOCAL_STORAGE_KEY = "@vidstack/log-colors";
const savedColors = init();
function getLogColor(key) {
  return savedColors.get(key);
}
function saveLogColor(key, { color = generateColor(), overwrite = false } = {}) {
  if (!savedColors.has(key) || overwrite) {
    savedColors.set(key, color);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Object.entries(savedColors)));
  }
}
function generateColor() {
  return `hsl(${Math.random() * 360}, 55%, 70%)`;
}
function init() {
  let colors;
  try {
    colors = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  } catch {
  }
  return new Map(Object.entries(colors ?? {}));
}

const LogLevelValue = Object.freeze({
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
});
const LogLevelColor = Object.freeze({
  silent: "white",
  error: "hsl(6, 58%, 50%)",
  warn: "hsl(51, 58%, 50%)",
  info: "hsl(219, 58%, 50%)",
  debug: "hsl(280, 58%, 50%)"
});

function round(num, decimalPlaces = 2) {
  return Number(num.toFixed(decimalPlaces));
}
function getNumberOfDecimalPlaces(num) {
  return String(num).split(".")[1]?.length ?? 0;
}
function clampNumber(min, value, max) {
  return Math.max(min, Math.min(max, value));
}

const s = 1e3;
const m = s * 60;
const h = m * 60;
const d = h * 24;
function ms(val) {
  const msAbs = Math.abs(val);
  if (msAbs >= d) {
    return Math.round(val / d) + "d";
  }
  if (msAbs >= h) {
    return Math.round(val / h) + "h";
  }
  if (msAbs >= m) {
    return Math.round(val / m) + "m";
  }
  if (msAbs >= s) {
    return Math.round(val / s) + "s";
  }
  return round(val, 2) + "ms";
}

class LogPrinter extends ViewController {
  constructor() {
    super(...arguments);
    this._level = "warn" ;
  }
  /**
   * The current log level.
   */
  get logLevel() {
    return this._level ;
  }
  set logLevel(level) {
    this._level = level;
  }
  onConnect() {
    this.listen("vds-log", (event) => {
      event.stopPropagation();
      const element = event.path?.[0] ?? (event.target instanceof ViewController ? event.target.el : event.target), eventTargetName = element?.$$COMPONENT_NAME?.replace(/^_/, "").replace(/Instance$/, "") ?? element?.tagName.toLowerCase() ?? "unknown";
      const { level = "warn", data } = event.detail ?? {};
      if (LogLevelValue[this._level] < LogLevelValue[level]) {
        return;
      }
      saveLogColor(eventTargetName);
      const hint = data?.length === 1 && isGroupedLog(data[0]) ? data[0].title : isString(data?.[0]) ? data[0] : "";
      console.groupCollapsed(
        `%c${level.toUpperCase()}%c ${eventTargetName}%c ${hint.slice(0, 50)}${hint.length > 50 ? "..." : ""}`,
        `background: ${LogLevelColor[level]}; color: white; padding: 1.5px 2.2px; border-radius: 2px; font-size: 11px;`,
        `color: ${getLogColor(eventTargetName)}; padding: 4px 0px; font-size: 11px;`,
        "color: gray; font-size: 11px; padding-left: 4px;"
      );
      if (data?.length === 1 && isGroupedLog(data[0])) {
        if (element)
          data[0].logs.unshift({ label: "Element", data: [element] });
        printGroup(level, data[0]);
      } else if (data) {
        print(level, ...data);
      }
      this._printTimeDiff();
      printStackTrace();
      console.groupEnd();
    });
    onDispose(() => {
      this._lastLogged = void 0;
    });
  }
  _printTimeDiff() {
    labelledPrint("Time since last log", this._calcLastLogTimeDiff());
  }
  _calcLastLogTimeDiff() {
    const time = performance.now();
    const diff = time - (this._lastLogged ?? (this._lastLogged = performance.now()));
    this._lastLogged = time;
    return ms(diff);
  }
}
function print(level, ...data) {
  console[level](...data);
}
function labelledPrint(label, ...data) {
  console.log(`%c${label}:`, "color: gray", ...data);
}
function printStackTrace() {
  console.groupCollapsed("%cStack Trace", "color: gray");
  console.trace();
  console.groupEnd();
}
function printGroup(level, groupedLog) {
  for (const log of groupedLog.logs) {
    if (isGroupedLog(log)) {
      console.groupCollapsed(groupedLog.title);
      printGroup(level, log);
      console.groupEnd();
    } else if ("label" in log && !isUndefined(log.label)) {
      labelledPrint(log.label, ...log.data);
    } else {
      print(level, ...log.data);
    }
  }
}

let $keyboard = signal(false);
if (!IS_SERVER) {
  listenEvent(document, "pointerdown", () => {
    $keyboard.set(false);
  });
  listenEvent(document, "keydown", (e) => {
    if (e.metaKey || e.altKey || e.ctrlKey)
      return;
    $keyboard.set(true);
  });
}
class FocusVisibleController extends ViewController {
  constructor() {
    super(...arguments);
    this._focused = signal(false);
  }
  onConnect(el) {
    effect(() => {
      if (!$keyboard()) {
        this._focused.set(false);
        updateFocusAttr(el, false);
        this.listen("pointerenter", this._onPointerEnter.bind(this));
        this.listen("pointerleave", this._onPointerLeave.bind(this));
        return;
      }
      const active = document.activeElement === el;
      this._focused.set(active);
      updateFocusAttr(el, active);
      this.listen("focus", this._onFocus.bind(this));
      this.listen("blur", this._onBlur.bind(this));
    });
  }
  focused() {
    return this._focused();
  }
  _onFocus() {
    this._focused.set(true);
    updateFocusAttr(this.el, true);
  }
  _onBlur() {
    this._focused.set(false);
    updateFocusAttr(this.el, false);
  }
  _onPointerEnter() {
    updateHoverAttr(this.el, true);
  }
  _onPointerLeave() {
    updateHoverAttr(this.el, false);
  }
}
function updateFocusAttr(el, isFocused) {
  setAttribute(el, "data-focus", isFocused);
  setAttribute(el, "data-hocus", isFocused);
}
function updateHoverAttr(el, isHovering) {
  setAttribute(el, "data-hocus", isHovering);
  setAttribute(el, "data-hover", isHovering);
}

var __defProp$f = Object.defineProperty;
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$f(target, key, result);
  return result;
};
const _MediaPlayer = class _MediaPlayer extends Component {
  constructor() {
    super();
    this.canPlayQueue = new RequestQueue();
    this._skipTitleUpdate = false;
    new MediaStateSync();
    const context = {
      player: this,
      scope: getScope(),
      qualities: new VideoQualityList(),
      audioTracks: new AudioTrackList(),
      $provider: signal(null),
      $providerSetup: signal(false),
      $props: this.$props,
      $state: this.$state
    };
    {
      const logPrinter = new LogPrinter();
      effect(() => {
        logPrinter.logLevel = this.$props.logLevel();
      });
    }
    context.logger = new Logger();
    context.remote = new MediaRemoteControl(context.logger );
    context.remote.setPlayer(this);
    context.$iosControls = computed(this._isIOSControls.bind(this));
    context.textTracks = new TextTrackList();
    context.textTracks[TextTrackSymbol._crossorigin] = this.$state.crossorigin;
    context.textRenderers = new TextRenderers(context);
    context.ariaKeys = {};
    this._media = context;
    provideContext(mediaContext, context);
    this.orientation = new ScreenOrientationController();
    new FocusVisibleController();
    new MediaKeyboardController(context);
    new MediaEventsLogger(context);
    const request = new MediaRequestContext();
    this._stateMgr = new MediaStateManager(request, context);
    this._requestMgr = new MediaRequestManager(this._stateMgr, request, context);
    context.delegate = new MediaPlayerDelegate(
      this._stateMgr._handle.bind(this._stateMgr),
      context
    );
    new MediaLoadController(this.startLoading.bind(this));
  }
  get _provider() {
    return this._media.$provider();
  }
  onSetup() {
    this._setupMediaAttributes();
    effect(this._watchCanPlay.bind(this));
    effect(this._watchMuted.bind(this));
    effect(this._watchPaused.bind(this));
    effect(this._watchVolume.bind(this));
    effect(this._watchCurrentTime.bind(this));
    effect(this._watchPlaysinline.bind(this));
    effect(this._watchPlaybackRate.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-player", "");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "region");
    if (IS_SERVER)
      this._watchTitle();
    else
      effect(this._watchTitle.bind(this));
    if (IS_SERVER)
      this._watchOrientation();
    else
      effect(this._watchOrientation.bind(this));
    listenEvent(el, "find-media-player", this._onFindPlayer.bind(this));
  }
  onConnect(el) {
    if (IS_IPHONE)
      setAttribute(el, "data-iphone", "");
    canChangeVolume().then(this.$state.canSetVolume.set);
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    this._onPointerChange(pointerQuery);
    pointerQuery.onchange = this._onPointerChange.bind(this);
    const resize = new ResizeObserver(animationFrameThrottle(this._onResize.bind(this)));
    resize.observe(el);
    effect(this._onResize.bind(this));
    this.dispatch("media-player-connect", {
      detail: this,
      bubbles: true,
      composed: true
    });
    this._media.logger.setTarget(el);
    onDispose(() => {
      resize.disconnect();
      pointerQuery.onchange = null;
      this._media.logger.setTarget(null);
    });
  }
  onDestroy() {
    this._media.player = null;
    this.canPlayQueue._reset();
  }
  _watchTitle() {
    if (this._skipTitleUpdate) {
      this._skipTitleUpdate = false;
      return;
    }
    const { title, live, viewType } = this.$state, isLive = live(), type = uppercaseFirstChar(viewType()), typeText = type !== "Unknown" ? `${isLive ? "Live " : ""}${type}` : isLive ? "Live" : "Media";
    const currentTitle = title();
    setAttribute(
      this.el,
      "aria-label",
      currentTitle ? `${typeText} - ${currentTitle}` : typeText + " Player"
    );
    if (!IS_SERVER && this.el && customElements.get(this.el.localName)) {
      this._skipTitleUpdate = true;
    }
    this.el?.removeAttribute("title");
  }
  _watchOrientation() {
    const orientation = this.orientation.landscape ? "landscape" : "portrait";
    this.$state.orientation.set(orientation);
    setAttribute(this.el, "data-orientation", orientation);
    this._onResize();
  }
  _watchCanPlay() {
    if (this.$state.canPlay() && this._provider)
      this.canPlayQueue._start();
    else
      this.canPlayQueue._stop();
  }
  _setupMediaAttributes() {
    if (_MediaPlayer[MEDIA_ATTRIBUTES]) {
      this.setAttributes(_MediaPlayer[MEDIA_ATTRIBUTES]);
      return;
    }
    const $attrs = {
      "data-captions": function() {
        const track = this.$state.textTrack();
        return !!track && isTrackCaptionKind(track);
      },
      "data-ios-controls": function() {
        return this._media.$iosControls();
      },
      "data-controls": function() {
        return this.controls.showing;
      },
      "data-buffering": function() {
        const { canPlay, waiting } = this.$state;
        return !canPlay() || waiting();
      },
      "data-error": function() {
        const { error } = this.$state;
        return !!error();
      },
      "data-autoplay-error": function() {
        const { autoplayError } = this.$state;
        return !!autoplayError();
      }
    };
    const alias = {
      canPictureInPicture: "can-pip",
      pictureInPicture: "pip"
    };
    for (const prop2 of mediaAttributes) {
      const attrName = "data-" + (alias[prop2] ?? camelToKebabCase(prop2));
      $attrs[attrName] = function() {
        return this.$state[prop2]();
      };
    }
    delete $attrs.title;
    _MediaPlayer[MEDIA_ATTRIBUTES] = $attrs;
    this.setAttributes($attrs);
  }
  _onFindPlayer(event) {
    event.detail(this);
  }
  _onResize() {
    if (IS_SERVER || !this.el)
      return;
    const width = this.el.clientWidth, height = this.el.clientHeight;
    this.$state.width.set(width);
    this.$state.height.set(height);
    setStyle(this.el, "--player-width", width + "px");
    setStyle(this.el, "--player-height", height + "px");
  }
  _onPointerChange(queryList) {
    if (IS_SERVER)
      return;
    const pointer = queryList.matches ? "coarse" : "fine";
    setAttribute(this.el, "data-pointer", pointer);
    this.$state.pointer.set(pointer);
    this._onResize();
  }
  _isIOSControls() {
    const { playsinline, fullscreen } = this.$state;
    return IS_IPHONE && !canFullscreen() && this.$state.mediaType() === "video" && (!playsinline() || fullscreen());
  }
  get provider() {
    return this._provider;
  }
  get controls() {
    return this._requestMgr._controls;
  }
  get title() {
    return peek(this.$state.providedTitle);
  }
  set title(newTitle) {
    if (this._skipTitleUpdate)
      return;
    this.$state.providedTitle.set(newTitle);
  }
  get qualities() {
    return this._media.qualities;
  }
  get audioTracks() {
    return this._media.audioTracks;
  }
  get textTracks() {
    return this._media.textTracks;
  }
  get textRenderers() {
    return this._media.textRenderers;
  }
  get paused() {
    return peek(this.$state.paused);
  }
  set paused(paused) {
    this._queuePausedUpdate(paused);
  }
  _watchPaused() {
    this._queuePausedUpdate(this.$props.paused());
  }
  _queuePausedUpdate(paused) {
    if (paused) {
      this.canPlayQueue._enqueue("paused", () => this._requestMgr._pause());
    } else
      this.canPlayQueue._enqueue("paused", () => this._requestMgr._play());
  }
  get muted() {
    return peek(this.$state.muted);
  }
  set muted(muted) {
    const $props = this.$props;
    $props.muted.set(muted);
  }
  _watchMuted() {
    this._queueMutedUpdate(this.$props.muted());
  }
  _queueMutedUpdate(muted) {
    this.canPlayQueue._enqueue("muted", () => {
      if (this._provider)
        this._provider.setMuted(muted);
    });
  }
  get currentTime() {
    return peek(this.$state.currentTime);
  }
  set currentTime(time) {
    this._queueCurrentTimeUpdate(time);
  }
  _watchCurrentTime() {
    this._queueCurrentTimeUpdate(this.$props.currentTime());
  }
  _queueCurrentTimeUpdate(time) {
    this.canPlayQueue._enqueue("currentTime", () => {
      if (time === peek(this.$state.currentTime))
        return;
      peek(() => {
        if (!this._provider)
          return;
        const boundTime = Math.min(
          Math.max(this.$state.seekableStart() + 0.1, time),
          this.$state.seekableEnd() - 0.1
        );
        if (Number.isFinite(boundTime))
          this._provider.setCurrentTime(boundTime);
      });
    });
  }
  get volume() {
    return peek(this.$state.volume);
  }
  set volume(volume) {
    const $props = this.$props;
    $props.volume.set(volume);
  }
  _watchVolume() {
    this._queueVolumeUpdate(this.$props.volume());
  }
  _queueVolumeUpdate(volume) {
    const clampedVolume = clampNumber(0, volume, 1);
    this.canPlayQueue._enqueue("volume", () => {
      if (this._provider)
        this._provider.setVolume(clampedVolume);
    });
  }
  get playbackRate() {
    return peek(this.$state.playbackRate);
  }
  set playbackRate(rate) {
    this._queuePlaybackRateUpdate(rate);
  }
  _watchPlaybackRate() {
    this._queuePlaybackRateUpdate(this.$props.playbackRate());
  }
  _queuePlaybackRateUpdate(rate) {
    this.canPlayQueue._enqueue("rate", () => {
      if (this._provider)
        this._provider.setPlaybackRate?.(rate);
    });
  }
  _watchPlaysinline() {
    this._queuePlaysinlineUpdate(this.$props.playsinline());
  }
  _queuePlaysinlineUpdate(inline) {
    this.canPlayQueue._enqueue("playsinline", () => {
      if (this._provider)
        this._provider.setPlaysinline?.(inline);
    });
  }
  async play(trigger) {
    return this._requestMgr._play(trigger);
  }
  async pause(trigger) {
    return this._requestMgr._pause(trigger);
  }
  async enterFullscreen(target, trigger) {
    return this._requestMgr._enterFullscreen(target, trigger);
  }
  async exitFullscreen(target, trigger) {
    return this._requestMgr._exitFullscreen(target, trigger);
  }
  enterPictureInPicture(trigger) {
    return this._requestMgr._enterPictureInPicture(trigger);
  }
  exitPictureInPicture(trigger) {
    return this._requestMgr._exitPictureInPicture(trigger);
  }
  seekToLiveEdge(trigger) {
    this._requestMgr._seekToLiveEdge(trigger);
  }
  startLoading(trigger) {
    this._media.delegate._notify("can-load", void 0, trigger);
  }
  matchQuery(query) {
    return scoped(() => PlayerQueryList.create(query), this.scope);
  }
  destroy() {
    this._media.remote.setPlayer(null);
    this.dispatch("destroy");
  }
};
_MediaPlayer.props = mediaPlayerProps;
_MediaPlayer.state = mediaState;
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "canPlayQueue", 2);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "provider", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "controls", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "orientation", 2);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "title", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "qualities", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "audioTracks", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "textTracks", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "textRenderers", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "paused", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "muted", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "currentTime", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "volume", 1);
__decorateClass$f([
  prop
], _MediaPlayer.prototype, "playbackRate", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "play", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "pause", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "enterFullscreen", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "exitFullscreen", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "enterPictureInPicture", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "exitPictureInPicture", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "seekToLiveEdge", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "startLoading", 1);
__decorateClass$f([
  method
], _MediaPlayer.prototype, "matchQuery", 1);
let MediaPlayer = _MediaPlayer;

function resolveStreamTypeFromHLSManifest(manifestSrc, requestInit) {
  return fetch(manifestSrc, requestInit).then((res) => res.text()).then((manifest) => {
    const renditionURI = resolveHLSRenditionURI(manifest);
    if (renditionURI) {
      return resolveStreamTypeFromHLSManifest(
        /^https?:/.test(renditionURI) ? renditionURI : new URL(renditionURI, manifestSrc).href,
        requestInit
      );
    }
    const streamType = /EXT-X-PLAYLIST-TYPE:\s*VOD/.test(manifest) ? "on-demand" : "live";
    if (streamType === "live" && resolveTargetDuration(manifest) >= 10 && (/#EXT-X-DVR-ENABLED:\s*true/.test(manifest) || manifest.includes("#EXT-X-DISCONTINUITY"))) {
      return "live:dvr";
    }
    return streamType;
  });
}
function resolveHLSRenditionURI(manifest) {
  const matches = manifest.match(/#EXT-X-STREAM-INF:[^\n]+(\n[^\n]+)*/g);
  return matches ? matches[0].split("\n")[1].trim() : null;
}
function resolveTargetDuration(manifest) {
  const lines = manifest.split("\n");
  for (const line of lines) {
    if (line.startsWith("#EXT-X-TARGETDURATION")) {
      const duration = parseFloat(line.split(":")[1]);
      if (!isNaN(duration)) {
        return duration;
      }
    }
  }
  return -1;
}

let warned = /* @__PURE__ */ new Set() ;
const sourceTypes = /* @__PURE__ */ new Map();
class SourceSelection {
  constructor(_domSources, _media, _loader, customLoaders = []) {
    this._domSources = _domSources;
    this._media = _media;
    this._loader = _loader;
    this._initialize = false;
    const HLS_LOADER = new HLSProviderLoader(), VIDEO_LOADER = new VideoProviderLoader(), AUDIO_LOADER = new AudioProviderLoader(), YOUTUBE_LOADER = new YouTubeProviderLoader(), VIMEO_LOADER = new VimeoProviderLoader(), EMBED_LOADERS = [YOUTUBE_LOADER, VIMEO_LOADER];
    this._loaders = computed(() => {
      return _media.$props.preferNativeHLS() ? [VIDEO_LOADER, AUDIO_LOADER, HLS_LOADER, ...EMBED_LOADERS, ...customLoaders] : [HLS_LOADER, VIDEO_LOADER, AUDIO_LOADER, ...EMBED_LOADERS, ...customLoaders];
    });
    const { $state } = _media;
    $state.sources.set(normalizeSrc(_media.$props.src()));
    for (const src of $state.sources()) {
      const loader = this._loaders().find((loader2) => loader2.canPlay(src));
      if (!loader)
        continue;
      const mediaType = loader.mediaType(src);
      this._media.$state.source.set(src);
      this._media.$state.mediaType.set(mediaType);
      this._media.$state.inferredViewType.set(mediaType);
      this._loader.set(loader);
      this._initialize = true;
    }
  }
  get _notify() {
    return this._media.delegate._notify;
  }
  connect() {
    const loader = this._loader();
    if (this._initialize) {
      this._notifySourceChange(this._media.$state.source(), loader);
      this._notifyLoaderChange(loader);
      this._initialize = false;
    }
    effect(this._onSourcesChange.bind(this));
    effect(this._onSourceChange.bind(this));
    effect(this._onSetup.bind(this));
    effect(this._onLoadSource.bind(this));
  }
  _onSourcesChange() {
    this._notify("sources-change", [
      ...normalizeSrc(this._media.$props.src()),
      ...this._domSources()
    ]);
  }
  _onSourceChange() {
    const { $state } = this._media;
    const sources = $state.sources(), currentSource = peek($state.source), newSource = this._findNewSource(currentSource, sources), noMatch = sources[0]?.src && !newSource.src && !newSource.type;
    if (noMatch && !warned.has(newSource.src) && !peek(this._loader)) {
      const source = sources[0];
      console.warn(
        `[vidstack] could not find a loader for any of the given media sources, consider providing \`type\`:

<media-provider>
  <source src="${source.src}" type="video/mp4" />
</media-provider>"

Falling back to fetching source headers...`
      );
      warned.add(newSource.src);
    }
    if (noMatch) {
      const { crossorigin } = $state, credentials = getRequestCredentials(crossorigin()), abort = new AbortController();
      Promise.all(
        sources.map(
          (source) => isString(source.src) && source.type === "?" ? fetch(source.src, {
            method: "HEAD",
            credentials,
            signal: abort.signal
          }).then((res) => {
            source.type = res.headers.get("content-type") || "??";
            sourceTypes.set(source.src, source.type);
            return source;
          }).catch(() => source) : source
        )
      ).then((sources2) => {
        if (abort.signal.aborted)
          return;
        this._findNewSource(peek($state.source), sources2);
        tick();
      });
      return () => abort.abort();
    }
    tick();
  }
  _findNewSource(currentSource, sources) {
    let newSource = { src: "", type: "" }, newLoader = null;
    for (const src of sources) {
      const loader = peek(this._loaders).find((loader2) => loader2.canPlay(src));
      if (loader) {
        newSource = src;
        newLoader = loader;
      }
    }
    if (!isSameSrc(currentSource, newSource)) {
      this._notifySourceChange(newSource, newLoader);
    }
    if (newLoader !== peek(this._loader)) {
      this._notifyLoaderChange(newLoader);
    }
    return newSource;
  }
  _notifySourceChange(src, loader) {
    this._notify("source-change", src);
    this._notify("media-type-change", loader?.mediaType(src) || "unknown");
  }
  _notifyLoaderChange(loader) {
    this._media.$providerSetup.set(false);
    this._notify("provider-change", null);
    loader && peek(() => loader.preconnect?.(this._media));
    this._loader.set(loader);
    this._notify("provider-loader-change", loader);
  }
  _onSetup() {
    const provider = this._media.$provider();
    if (!provider || peek(this._media.$providerSetup))
      return;
    if (this._media.$state.canLoad()) {
      scoped(() => provider.setup(this._media), provider.scope);
      this._media.$providerSetup.set(true);
      return;
    }
    peek(() => provider.preconnect?.(this._media));
  }
  _onLoadSource() {
    if (!this._media.$providerSetup())
      return;
    const provider = this._media.$provider(), source = this._media.$state.source(), crossorigin = peek(this._media.$state.crossorigin);
    if (isSameSrc(provider?.currentSrc, source)) {
      return;
    }
    if (this._media.$state.canLoad()) {
      const abort = new AbortController();
      if (isHLSSrc(source)) {
        if (!isHLSSupported()) {
          resolveStreamTypeFromHLSManifest(source.src, {
            credentials: getRequestCredentials(crossorigin),
            signal: abort.signal
          }).then((streamType) => {
            this._notify("stream-type-change", streamType);
          }).catch(noop);
        }
      } else {
        this._notify("stream-type-change", "on-demand");
      }
      peek(() => provider?.loadSource(source, peek(this._media.$state.preload)));
      return () => abort.abort();
    }
    try {
      isString(source.src) && preconnect(new URL(source.src).origin, "preconnect");
    } catch (error) {
      {
        this._media.logger?.infoGroup(`Failed to preconnect to source: ${source.src}`).labelledLog("Error", error).dispatch();
      }
    }
  }
}
function normalizeSrc(src) {
  return (isArray(src) ? src : [!isString(src) && "src" in src ? src : { src }]).map(
    ({ src: src2, type, ...props }) => ({
      src: src2,
      type: type ?? (isString(src2) ? sourceTypes.get(src2) : null) ?? (!isString(src2) || src2.startsWith("blob:") ? "video/object" : src2.includes("youtube") ? "video/youtube" : src2.includes("vimeo") ? "video/vimeo" : "?"),
      ...props
    })
  );
}
function isSameSrc(a, b) {
  return a?.src === b?.src && a?.type === b?.type;
}

class Tracks {
  constructor(_domTracks, _media) {
    this._domTracks = _domTracks;
    this._media = _media;
    this._prevTracks = [];
    effect(this._onTracksChange.bind(this));
  }
  _onTracksChange() {
    const newTracks = this._domTracks();
    for (const oldTrack of this._prevTracks) {
      if (!newTracks.some((t) => t.id === oldTrack.id)) {
        const track = oldTrack.id && this._media.textTracks.getById(oldTrack.id);
        if (track)
          this._media.textTracks.remove(track);
      }
    }
    for (const newTrack of newTracks) {
      const id = newTrack.id || TextTrack.createId(newTrack);
      if (!this._media.textTracks.getById(id)) {
        newTrack.id = id;
        this._media.textTracks.add(newTrack);
      }
    }
    this._prevTracks = newTracks;
  }
}

var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$e(target, key, result);
  return result;
};
class MediaProvider extends Component {
  constructor() {
    super(...arguments);
    this._domSources = signal([]);
    this._domTracks = signal([]);
    this._loader = null;
    this._loadRafId = -1;
  }
  onSetup() {
    this._media = useMediaContext();
    this._sources = new SourceSelection(
      this._domSources,
      this._media,
      this.$state.loader,
      this.$props.loaders()
    );
  }
  onAttach(el) {
    el.setAttribute("data-media-provider", "");
  }
  onConnect(el) {
    this._sources.connect();
    new Tracks(this._domTracks, this._media);
    const resize = new ResizeObserver(animationFrameThrottle(this._onResize.bind(this)));
    resize.observe(el);
    const mutation = new MutationObserver(this._onMutation.bind(this));
    mutation.observe(el, { attributes: true, childList: true });
    this._onResize();
    this._onMutation();
    onDispose(() => {
      resize.disconnect();
      mutation.disconnect();
    });
  }
  load(target) {
    window.cancelAnimationFrame(this._loadRafId);
    this._loadRafId = requestAnimationFrame(() => this._runLoader(target));
    onDispose(() => {
      window.cancelAnimationFrame(this._loadRafId);
    });
  }
  _runLoader(target) {
    if (!this.scope)
      return;
    const loader = this.$state.loader(), { $provider } = this._media;
    if (this._loader === loader && loader?.target === target && peek($provider))
      return;
    this._destroyProvider();
    this._loader = loader;
    if (loader)
      loader.target = target || null;
    if (!loader || !target)
      return;
    loader.load(this._media).then((provider) => {
      if (!this.scope)
        return;
      if (peek(this.$state.loader) !== loader)
        return;
      this._media.delegate._notify("provider-change", provider);
    });
  }
  onDestroy() {
    this._loader = null;
    this._destroyProvider();
  }
  _destroyProvider() {
    this._media.delegate._notify("provider-change", null);
  }
  _onResize() {
    if (!this.el)
      return;
    const player = this._media.player, width = this.el.offsetWidth, height = this.el.offsetHeight;
    if (!player)
      return;
    player.$state.mediaWidth.set(width);
    player.$state.mediaHeight.set(height);
    if (player.el) {
      setStyle(player.el, "--media-width", width + "px");
      setStyle(player.el, "--media-height", height + "px");
    }
  }
  _onMutation() {
    const sources = [], tracks = [], children = this.el.children;
    for (const el of children) {
      if (el instanceof HTMLSourceElement) {
        sources.push({
          src: el.src,
          type: el.type
        });
      } else if (el instanceof HTMLTrackElement) {
        tracks.push({
          id: el.id,
          src: el.src,
          kind: el.track.kind,
          language: el.srclang,
          label: el.label,
          default: el.default,
          type: el.getAttribute("data-type")
        });
      }
    }
    this._domSources.set(sources);
    this._domTracks.set(tracks);
    tick();
  }
}
MediaProvider.props = {
  loaders: []
};
MediaProvider.state = new State({
  loader: null
});
__decorateClass$e([
  method
], MediaProvider.prototype, "load", 1);

class Controls extends Component {
  onSetup() {
    this._media = useMediaContext();
    effect(this._watchProps.bind(this));
  }
  onAttach(el) {
    const { pictureInPicture, fullscreen } = this._media.$state;
    setStyle(el, "pointer-events", "none");
    setAttributeIfEmpty(el, "role", "group");
    this.setAttributes({
      "data-visible": this._isShowing.bind(this),
      "data-fullscreen": fullscreen,
      "data-pip": pictureInPicture
    });
    effect(() => {
      this.dispatch("change", { detail: this._isShowing() });
    });
    effect(this._hideControls.bind(this));
    effect(() => {
      const isFullscreen = fullscreen();
      for (const side of ["top", "right", "bottom", "left"]) {
        setStyle(el, `padding-${side}`, isFullscreen && `env(safe-area-inset-${side})`);
      }
    });
  }
  _hideControls() {
    if (!this.el)
      return;
    const { $iosControls } = this._media, { controls } = this._media.$state, isHidden = controls() || $iosControls();
    setAttribute(this.el, "aria-hidden", isHidden ? "true" : null);
    setStyle(this.el, "display", isHidden ? "none" : null);
  }
  _watchProps() {
    const { controls } = this._media.player, { hideDelay, hideOnMouseLeave } = this.$props;
    controls.defaultDelay = hideDelay() === 2e3 ? this._media.$props.controlsDelay() : hideDelay();
    controls.hideOnMouseLeave = hideOnMouseLeave();
  }
  _isShowing() {
    const { controlsVisible } = this._media.$state;
    return controlsVisible();
  }
}
Controls.props = {
  hideDelay: 2e3,
  hideOnMouseLeave: false
};

class ControlsGroup extends Component {
  onAttach(el) {
    setStyle(el, "pointer-events", "auto");
  }
}

class Popper extends ViewController {
  constructor(_delegate) {
    super();
    this._delegate = _delegate;
    this._showTimerId = -1;
    this._hideRafId = -1;
    this._stopAnimationEndListener = null;
    effect(this._watchTrigger.bind(this));
  }
  onDestroy() {
    this._stopAnimationEndListener?.();
    this._stopAnimationEndListener = null;
  }
  _watchTrigger() {
    const trigger = this._delegate._trigger();
    if (!trigger) {
      this.hide();
      return;
    }
    const show = this.show.bind(this), hide = this.hide.bind(this);
    this._delegate._listen(trigger, show, hide);
  }
  show(trigger) {
    window.cancelAnimationFrame(this._hideRafId);
    this._hideRafId = -1;
    this._stopAnimationEndListener?.();
    this._stopAnimationEndListener = null;
    this._showTimerId = window.setTimeout(
      () => {
        this._showTimerId = -1;
        const content = this._delegate._content();
        if (content)
          content.style.removeProperty("display");
        peek(() => this._delegate._onChange(true, trigger));
      },
      this._delegate._showDelay?.() ?? 0
    );
  }
  hide(trigger) {
    window.clearTimeout(this._showTimerId);
    this._showTimerId = -1;
    peek(() => this._delegate._onChange(false, trigger));
    this._hideRafId = requestAnimationFrame(() => {
      this._hideRafId = -1;
      const content = this._delegate._content();
      if (content) {
        const isAnimated = hasAnimation(content);
        const onHide = () => {
          content.style.display = "none";
          this._stopAnimationEndListener = null;
        };
        if (isAnimated) {
          this._stopAnimationEndListener?.();
          const stop = listenEvent(content, "animationend", onHide, { once: true });
          this._stopAnimationEndListener = stop;
        } else {
          onHide();
        }
      }
    });
  }
}

const tooltipContext = createContext();

let id = 0;
class Tooltip extends Component {
  constructor() {
    super();
    this._id = `media-tooltip-${++id}`;
    this._trigger = signal(null);
    this._content = signal(null);
    new FocusVisibleController();
    const { showDelay } = this.$props;
    new Popper({
      _trigger: this._trigger,
      _content: this._content,
      _showDelay: showDelay,
      _listen(trigger, show, hide) {
        listenEvent(trigger, "touchstart", (e) => e.preventDefault(), {
          passive: false
        });
        listenEvent(trigger, "focus", show);
        listenEvent(trigger, "blur", hide);
        listenEvent(trigger, "mouseenter", show);
        listenEvent(trigger, "mouseleave", hide);
      },
      _onChange: this._onShowingChange.bind(this)
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  onSetup() {
    provideContext(tooltipContext, {
      _trigger: this._trigger,
      _content: this._content,
      _attachTrigger: this._attachTrigger.bind(this),
      _detachTrigger: this._detachTrigger.bind(this),
      _attachContent: this._attachContent.bind(this),
      _detachContent: this._detachContent.bind(this)
    });
  }
  _attachTrigger(el) {
    this._trigger.set(el);
    let tooltipName = el.getAttribute("data-media-tooltip");
    if (tooltipName) {
      this.el?.setAttribute(`data-media-${tooltipName}-tooltip`, "");
    }
    setAttribute(el, "data-describedby", this._id);
  }
  _detachTrigger(el) {
    el.removeAttribute("data-describedby");
    el.removeAttribute("aria-describedby");
    this._trigger.set(null);
  }
  _attachContent(el) {
    el.setAttribute("id", this._id);
    el.style.display = "none";
    setAttributeIfEmpty(el, "role", "tooltip");
    this._content.set(el);
  }
  _detachContent(el) {
    el.removeAttribute("id");
    el.removeAttribute("role");
    this._content.set(null);
  }
  _onShowingChange(isShowing) {
    const trigger = this._trigger(), content = this._content();
    if (trigger) {
      setAttribute(trigger, "aria-describedby", isShowing ? this._id : null);
    }
    for (const el of [this.el, trigger, content]) {
      el && setAttribute(el, "data-visible", isShowing);
    }
  }
}
Tooltip.props = {
  showDelay: 500
};

class TooltipTrigger extends Component {
  constructor() {
    super();
    new FocusVisibleController();
  }
  onConnect(el) {
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        this._attach();
        const tooltip = useContext(tooltipContext);
        onDispose(() => {
          const button = this._getButton();
          button && tooltip._detachTrigger(button);
        });
      })
    );
  }
  _attach() {
    const button = this._getButton(), tooltip = useContext(tooltipContext);
    button && tooltip._attachTrigger(button);
  }
  _getButton() {
    const candidate = this.el.firstElementChild;
    return candidate?.localName === "button" || candidate?.getAttribute("role") === "button" ? candidate : this.el;
  }
}

class TooltipContent extends Component {
  constructor() {
    super();
    new FocusVisibleController();
    const { placement } = this.$props;
    this.setAttributes({
      "data-placement": placement
    });
  }
  onAttach(el) {
    this._attach(el);
    Object.assign(el.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "max-content"
    });
  }
  onConnect(el) {
    this._attach(el);
    const tooltip = useContext(tooltipContext);
    onDispose(() => tooltip._detachContent(el));
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        effect(this._watchPlacement.bind(this));
      })
    );
  }
  _attach(el) {
    const tooltip = useContext(tooltipContext);
    tooltip._attachContent(el);
  }
  _watchPlacement() {
    const { placement, offset: mainOffset, alignOffset } = this.$props;
    return autoPlacement(this.el, this._getTrigger(), placement(), {
      offsetVarName: "media-tooltip",
      xOffset: alignOffset(),
      yOffset: mainOffset()
    });
  }
  _getTrigger() {
    return useContext(tooltipContext)._trigger();
  }
}
TooltipContent.props = {
  placement: "top center",
  offset: 0,
  alignOffset: 0
};

class ToggleButtonController extends ViewController {
  constructor(_delegate) {
    super();
    this._delegate = _delegate;
    new FocusVisibleController();
    if (_delegate._keyShortcut) {
      new ARIAKeyShortcuts(_delegate._keyShortcut);
    }
  }
  onSetup() {
    const { disabled } = this.$props;
    this.setAttributes({
      "data-pressed": this._delegate._isPressed,
      "aria-pressed": this._isARIAPressed.bind(this),
      "aria-disabled": () => disabled() ? "true" : null
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    onPress(el, this._onMaybePress.bind(this));
    for (const type of ["click", "touchstart"]) {
      this.listen(type, this._onInteraction.bind(this));
    }
  }
  _isARIAPressed() {
    return ariaBool$1(this._delegate._isPressed());
  }
  _onPressed(event) {
    if (isWriteSignal(this._delegate._isPressed)) {
      this._delegate._isPressed.set((p) => !p);
    }
  }
  _onMaybePress(event) {
    const disabled = this.$props.disabled() || this.el.hasAttribute("data-disabled");
    if (disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    event.preventDefault();
    (this._delegate._onPress ?? this._onPressed).call(this, event);
  }
  _onInteraction(event) {
    if (this.$props.disabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
ToggleButtonController.props = {
  disabled: false
};

var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$d(target, key, result);
  return result;
};
class ToggleButton extends Component {
  constructor() {
    super();
    this._pressed = signal(false);
    new ToggleButtonController({
      _isPressed: this._pressed
    });
  }
  get pressed() {
    return this._pressed();
  }
}
ToggleButton.props = {
  disabled: false,
  defaultPressed: false
};
__decorateClass$d([
  prop
], ToggleButton.prototype, "pressed", 1);

class PlayButton extends Component {
  constructor() {
    super();
    new ToggleButtonController({
      _isPressed: this._isPressed.bind(this),
      _keyShortcut: "togglePaused",
      _onPress: this._onPress.bind(this)
    });
  }
  onSetup() {
    this._media = useMediaContext();
    const { paused, ended } = this._media.$state;
    this.setAttributes({
      "data-paused": paused,
      "data-ended": ended
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "play");
    setARIALabel(el, this._getLabel.bind(this));
  }
  _onPress(event) {
    const remote = this._media.remote;
    this._isPressed() ? remote.pause(event) : remote.play(event);
  }
  _isPressed() {
    const { paused } = this._media.$state;
    return !paused();
  }
  _getLabel() {
    const { paused } = this._media.$state;
    return paused() ? "Play" : "Pause";
  }
}
PlayButton.props = ToggleButtonController.props;

function ariaBool(value) {
  return value ? "true" : "false";
}
function $ariaBool(signal) {
  return () => ariaBool(signal());
}

class CaptionButton extends Component {
  constructor() {
    super();
    new ToggleButtonController({
      _isPressed: this._isPressed.bind(this),
      _keyShortcut: "toggleCaptions",
      _onPress: this._onPress.bind(this)
    });
  }
  onSetup() {
    this._media = useMediaContext();
    this.setAttributes({
      "data-active": this._isPressed.bind(this),
      "data-supported": () => !this._isHidden(),
      "aria-hidden": $ariaBool(this._isHidden.bind(this))
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "caption");
    setARIALabel(el, this._getLabel.bind(this));
  }
  _onPress(event) {
    this._media.remote.toggleCaptions(event);
  }
  _isPressed() {
    const { textTrack } = this._media.$state, track = textTrack();
    return !!track && isTrackCaptionKind(track);
  }
  _isHidden() {
    const { textTracks } = this._media.$state;
    return textTracks().filter(isTrackCaptionKind).length == 0;
  }
  _getLabel() {
    const { textTrack } = this._media.$state;
    return textTrack() ? "Closed-Captions Off" : "Closed-Captions On";
  }
}
CaptionButton.props = ToggleButtonController.props;

class FullscreenButton extends Component {
  constructor() {
    super();
    new ToggleButtonController({
      _isPressed: this._isPressed.bind(this),
      _keyShortcut: "toggleFullscreen",
      _onPress: this._onPress.bind(this)
    });
  }
  onSetup() {
    this._media = useMediaContext();
    const { fullscreen } = this._media.$state, isSupported = this._isSupported.bind(this);
    this.setAttributes({
      "data-active": fullscreen,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "fullscreen");
    setARIALabel(el, this._getLabel.bind(this));
  }
  _onPress(event) {
    const remote = this._media.remote, target = this.$props.target();
    this._isPressed() ? remote.exitFullscreen(target, event) : remote.enterFullscreen(target, event);
  }
  _isPressed() {
    const { fullscreen } = this._media.$state;
    return fullscreen();
  }
  _isSupported() {
    const { canFullscreen } = this._media.$state;
    return canFullscreen();
  }
  _getLabel() {
    const { fullscreen } = this._media.$state;
    return fullscreen() ? "Exit Fullscreen" : "Enter Fullscreen";
  }
}
FullscreenButton.props = {
  ...ToggleButtonController.props,
  target: "prefer-media"
};

class MuteButton extends Component {
  constructor() {
    super();
    new ToggleButtonController({
      _isPressed: this._isPressed.bind(this),
      _keyShortcut: "toggleMuted",
      _onPress: this._onPress.bind(this)
    });
  }
  onSetup() {
    this._media = useMediaContext();
    this.setAttributes({
      "data-muted": this._isPressed.bind(this),
      "data-state": this._getState.bind(this)
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-mute-button", "");
    el.setAttribute("data-media-tooltip", "mute");
    setARIALabel(el, this._getLabel.bind(this));
  }
  _onPress(event) {
    const remote = this._media.remote;
    this._isPressed() ? remote.unmute(event) : remote.mute(event);
  }
  _isPressed() {
    const { muted, volume } = this._media.$state;
    return muted() || volume() === 0;
  }
  _getLabel() {
    return this._isPressed() ? "Unmute" : "Mute";
  }
  _getState() {
    const { muted, volume } = this._media.$state, $volume = volume();
    if (muted() || $volume === 0)
      return "muted";
    else if ($volume >= 0.5)
      return "high";
    else if ($volume < 0.5)
      return "low";
  }
}
MuteButton.props = ToggleButtonController.props;

class PIPButton extends Component {
  constructor() {
    super();
    new ToggleButtonController({
      _isPressed: this._isPressed.bind(this),
      _keyShortcut: "togglePictureInPicture",
      _onPress: this._onPress.bind(this)
    });
  }
  onSetup() {
    this._media = useMediaContext();
    const { pictureInPicture } = this._media.$state, isSupported = this._isSupported.bind(this);
    this.setAttributes({
      "data-active": pictureInPicture,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "pip");
    setARIALabel(el, this._getLabel.bind(this));
  }
  _onPress(event) {
    const remote = this._media.remote;
    this._isPressed() ? remote.exitPictureInPicture(event) : remote.enterPictureInPicture(event);
  }
  _isPressed() {
    const { pictureInPicture } = this._media.$state;
    return pictureInPicture();
  }
  _isSupported() {
    const { canPictureInPicture } = this._media.$state;
    return canPictureInPicture();
  }
  _getLabel() {
    const { pictureInPicture } = this._media.$state;
    return pictureInPicture() ? "Exit Picture In Picture" : "Enter Picture In Picture";
  }
}
PIPButton.props = ToggleButtonController.props;

class SeekButton extends Component {
  constructor() {
    super();
    new FocusVisibleController();
  }
  onSetup() {
    this._media = useMediaContext();
    const { seeking } = this._media.$state, { seconds } = this.$props, isSupported = this._isSupported.bind(this);
    this.setAttributes({
      seconds,
      "data-seeking": seeking,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
    el.setAttribute("data-media-tooltip", "seek");
    setARIALabel(el, this._getLabel.bind(this));
  }
  onConnect(el) {
    onPress(el, this._onPress.bind(this));
  }
  _isSupported() {
    const { canSeek } = this._media.$state;
    return canSeek();
  }
  _getLabel() {
    const { seconds } = this.$props;
    return `Seek ${seconds() > 0 ? "forward" : "backward"} ${seconds()} seconds`;
  }
  _onPress(event) {
    const { seconds, disabled } = this.$props;
    if (disabled())
      return;
    const { currentTime } = this._media.$state, seekTo = currentTime() + seconds();
    this._media.remote.seek(seekTo, event);
  }
}
SeekButton.props = {
  disabled: false,
  seconds: 30
};

class LiveButton extends Component {
  constructor() {
    super();
    new FocusVisibleController();
  }
  onSetup() {
    this._media = useMediaContext();
    const { disabled } = this.$props, { live, liveEdge } = this._media.$state, isHidden = () => !live();
    this.setAttributes({
      "data-edge": liveEdge,
      "data-hidden": isHidden,
      "aria-disabled": $ariaBool(() => disabled() || liveEdge()),
      "aria-hidden": $ariaBool(isHidden)
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
    el.setAttribute("data-media-tooltip", "live");
  }
  onConnect(el) {
    onPress(el, this._onPress.bind(this));
  }
  _onPress(event) {
    const { disabled } = this.$props, { liveEdge } = this._media.$state;
    if (disabled() || liveEdge())
      return;
    this._media.remote.seekToLiveEdge(event);
  }
}
LiveButton.props = {
  disabled: false
};

const sliderState = new State({
  min: 0,
  max: 100,
  value: 0,
  pointerValue: 0,
  focused: false,
  dragging: false,
  pointing: false,
  get active() {
    return this.dragging || this.focused || this.pointing;
  },
  get fillRate() {
    return calcRate(this.min, this.max, this.value);
  },
  get fillPercent() {
    return this.fillRate * 100;
  },
  get pointerRate() {
    return calcRate(this.min, this.max, this.pointerValue);
  },
  get pointerPercent() {
    return this.pointerRate * 100;
  }
});
function calcRate(min, max, value) {
  const range = max - min, offset = value - min;
  return range > 0 ? offset / range : 0;
}

function getClampedValue(min, max, value, step) {
  return clampNumber(min, round(value, getNumberOfDecimalPlaces(step)), max);
}
function getValueFromRate(min, max, rate, step) {
  const boundRate = clampNumber(0, rate, 1), range = max - min, fill = range * boundRate, stepRatio = fill / step, steps = step * stepRatio;
  return min + steps;
}

const SliderKeyDirection = {
  Left: -1,
  ArrowLeft: -1,
  Up: 1,
  ArrowUp: 1,
  Right: 1,
  ArrowRight: 1,
  Down: -1,
  ArrowDown: -1
};
class SliderEventsController extends ViewController {
  constructor(_delegate, _media) {
    super();
    this._delegate = _delegate;
    this._media = _media;
    this._provider = null;
    this._touch = null;
    this._touchStartValue = null;
    this._onDocumentPointerMove = functionThrottle(
      (event) => {
        this._updatePointerValue(this._getPointerValue(event), event);
      },
      20,
      { leading: true }
    );
  }
  onConnect() {
    effect(this._attachEventListeners.bind(this));
    effect(this._attachPointerListeners.bind(this));
    if (this._delegate._swipeGesture) {
      const provider = this._media.player.el?.querySelector(
        "media-provider,[data-media-provider]"
      );
      if (provider) {
        this._provider = provider;
        listenEvent(provider, "touchstart", this._onTouchStart.bind(this), {
          passive: true
        });
        listenEvent(provider, "touchmove", this._onTouchMove.bind(this), {
          passive: false
        });
      }
    }
  }
  _onTouchStart(event) {
    this._touch = event.touches[0];
  }
  _onTouchMove(event) {
    if (isNull(this._touch) || isTouchPinchEvent(event))
      return;
    const touch = event.touches[0], xDiff = touch.clientX - this._touch.clientX, yDiff = touch.clientY - this._touch.clientY, isDragging = this.$state.dragging();
    if (!isDragging && Math.abs(yDiff) > 20) {
      return;
    }
    if (isDragging)
      return;
    if (Math.abs(xDiff) > 20) {
      this._touch = touch;
      this._touchStartValue = this.$state.value();
      this._onStartDragging(this._touchStartValue, event);
    }
  }
  _attachEventListeners() {
    if (this._delegate._isDisabled())
      return;
    this.listen("focus", this._onFocus.bind(this));
    this.listen("pointerenter", this._onPointerEnter.bind(this));
    this.listen("pointermove", this._onPointerMove.bind(this));
    this.listen("pointerleave", this._onPointerLeave.bind(this));
    this.listen("pointerdown", this._onPointerDown.bind(this));
    this.listen("keydown", this._onKeyDown.bind(this));
    this.listen("keyup", this._onKeyUp.bind(this));
  }
  _attachPointerListeners() {
    if (this._delegate._isDisabled() || !this.$state.dragging())
      return;
    listenEvent(document, "pointerup", this._onDocumentPointerUp.bind(this));
    listenEvent(document, "pointermove", this._onDocumentPointerMove.bind(this));
    if (IS_SAFARI) {
      listenEvent(document, "touchmove", this._onDocumentTouchMove.bind(this), {
        passive: false
      });
    }
  }
  _onFocus() {
    this._updatePointerValue(this.$state.value());
  }
  _updateValue(newValue, trigger) {
    const { value, min, max, dragging } = this.$state;
    const clampedValue = Math.max(min(), Math.min(newValue, max()));
    value.set(clampedValue);
    const event = this.createEvent("value-change", { detail: clampedValue, trigger });
    this.dispatch(event);
    this._delegate._onValueChange?.(event);
    if (dragging()) {
      const event2 = this.createEvent("drag-value-change", { detail: clampedValue, trigger });
      this.dispatch(event2);
      this._delegate._onDragValueChange?.(event2);
    }
  }
  _updatePointerValue(value, trigger) {
    const { pointerValue, dragging } = this.$state;
    pointerValue.set(value);
    this.dispatch("pointer-value-change", { detail: value, trigger });
    if (dragging()) {
      this._updateValue(value, trigger);
    }
  }
  _getPointerValue(event) {
    let thumbPositionRate, rect = this.el.getBoundingClientRect(), { min, max } = this.$state;
    if (this.$props.orientation() === "vertical") {
      const { bottom: trackBottom, height: trackHeight } = rect;
      thumbPositionRate = (trackBottom - event.clientY) / trackHeight;
    } else {
      if (this._touch && isNumber(this._touchStartValue)) {
        const { width } = this._provider.getBoundingClientRect(), rate = (event.clientX - this._touch.clientX) / width, range = max() - min(), diff = range * Math.abs(rate);
        thumbPositionRate = (rate < 0 ? this._touchStartValue - diff : this._touchStartValue + diff) / range;
      } else {
        const { left: trackLeft, width: trackWidth } = rect;
        thumbPositionRate = (event.clientX - trackLeft) / trackWidth;
      }
    }
    return Math.max(
      min(),
      Math.min(
        max(),
        this._delegate._roundValue(
          getValueFromRate(min(), max(), thumbPositionRate, this._delegate._getStep())
        )
      )
    );
  }
  _onPointerEnter(event) {
    this.$state.pointing.set(true);
  }
  _onPointerMove(event) {
    const { dragging } = this.$state;
    if (dragging())
      return;
    this._updatePointerValue(this._getPointerValue(event), event);
  }
  _onPointerLeave(event) {
    this.$state.pointing.set(false);
  }
  _onPointerDown(event) {
    if (event.button !== 0)
      return;
    const value = this._getPointerValue(event);
    this._onStartDragging(value, event);
    this._updatePointerValue(value, event);
  }
  _onStartDragging(value, trigger) {
    const { dragging } = this.$state;
    if (dragging())
      return;
    dragging.set(true);
    this._media.remote.pauseControls(trigger);
    const event = this.createEvent("drag-start", { detail: value, trigger });
    this.dispatch(event);
    this._delegate._onDragStart?.(event);
  }
  _onStopDragging(value, trigger) {
    const { dragging } = this.$state;
    if (!dragging())
      return;
    dragging.set(false);
    this._media.remote.resumeControls(trigger);
    const event = this.createEvent("drag-end", { detail: value, trigger });
    this.dispatch(event);
    this._delegate._onDragEnd?.(event);
    this._touch = null;
    this._touchStartValue = null;
  }
  _onKeyDown(event) {
    const { key } = event, { min, max } = this.$state;
    let newValue;
    if (key === "Home" || key === "PageUp") {
      newValue = min();
    } else if (key === "End" || key === "PageDown") {
      newValue = max();
    } else if (!event.metaKey && /[0-9]/.test(key)) {
      newValue = (max() - min()) / 10 * Number(key);
    }
    if (!isUndefined(newValue)) {
      this._updatePointerValue(newValue, event);
      this._updateValue(newValue, event);
      return;
    }
    const value = this._getKeyValue(event);
    if (isUndefined(value))
      return;
    const repeat = key === this._lastDownKey;
    if (!this.$state.dragging() && repeat)
      this._onStartDragging(value, event);
    this._updatePointerValue(value, event);
    if (!repeat)
      this._updateValue(value, event);
    this._lastDownKey = key;
  }
  _onKeyUp(event) {
    this._lastDownKey = "";
    const { dragging, value } = this.$state;
    if (!dragging())
      return;
    const newValue = this._getKeyValue(event) ?? value();
    this._updatePointerValue(newValue);
    this._onStopDragging(newValue, event);
  }
  _getKeyValue(event) {
    const { key, shiftKey } = event, isValidKey = Object.keys(SliderKeyDirection).includes(key);
    if (!isValidKey)
      return;
    event.preventDefault();
    event.stopPropagation();
    const { shiftKeyMultiplier } = this.$props;
    const { value, min, max } = this.$state, step = this._delegate._getStep(), keyStep = this._delegate._getKeyStep();
    const modifiedStep = !shiftKey ? keyStep : keyStep * shiftKeyMultiplier(), direction = Number(SliderKeyDirection[key]), diff = modifiedStep * direction, steps = (value() + diff) / step;
    return Math.max(min(), Math.min(max(), Number((step * steps).toFixed(3))));
  }
  // -------------------------------------------------------------------------------------------
  // Document (Pointer Events)
  // -------------------------------------------------------------------------------------------
  _onDocumentPointerUp(event) {
    if (event.button !== 0)
      return;
    const value = this._getPointerValue(event);
    this._updatePointerValue(value, event);
    this._onStopDragging(value, event);
  }
  _onDocumentTouchMove(event) {
    event.preventDefault();
  }
}

const sliderValueFormatContext = createContext(() => ({}));

const sliderContext = createContext();

class SliderController extends ViewController {
  constructor(_delegate) {
    super();
    this._delegate = _delegate;
    this._updateSliderVars = animationFrameThrottle(
      (fillPercent, pointerPercent) => {
        this.el?.style.setProperty("--slider-fill", fillPercent + "%");
        this.el?.style.setProperty("--slider-pointer", pointerPercent + "%");
      }
    );
  }
  onSetup() {
    this._media = useMediaContext();
    const focus = new FocusVisibleController();
    focus.attach(this);
    this.$state.focused = focus.focused.bind(focus);
    if (!hasProvidedContext(sliderValueFormatContext)) {
      provideContext(sliderValueFormatContext, {
        default: "value"
      });
    }
    provideContext(sliderContext, {
      _orientation: this.$props.orientation,
      _disabled: this._delegate._isDisabled,
      _preview: signal(null)
    });
    effect(this._watchValue.bind(this));
    effect(this._watchDisabled.bind(this));
    this._setupAttrs();
    new SliderEventsController(this._delegate, this._media).attach(this);
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "role", "slider");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "autocomplete", "off");
    if (IS_SERVER)
      this._watchCSSVars();
    else
      effect(this._watchCSSVars.bind(this));
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  _watchValue() {
    const { dragging, value, min, max } = this.$state;
    if (peek(dragging))
      return;
    value.set(getClampedValue(min(), max(), value(), this._delegate._getStep()));
  }
  _watchDisabled() {
    if (!this._delegate._isDisabled())
      return;
    const { dragging, pointing } = this.$state;
    dragging.set(false);
    pointing.set(false);
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  _getARIADisabled() {
    return ariaBool$1(this._delegate._isDisabled());
  }
  // -------------------------------------------------------------------------------------------
  // Attributes
  // -------------------------------------------------------------------------------------------
  _setupAttrs() {
    const { orientation } = this.$props, { dragging, active, pointing } = this.$state;
    this.setAttributes({
      "data-dragging": dragging,
      "data-pointing": pointing,
      "data-active": active,
      "aria-disabled": this._getARIADisabled.bind(this),
      "aria-valuemin": this.$state.min,
      "aria-valuemax": this.$state.max,
      "aria-valuenow": this._delegate._getARIAValueNow,
      "aria-valuetext": this._delegate._getARIAValueText,
      "aria-orientation": orientation
    });
  }
  _watchCSSVars() {
    const { fillPercent, pointerPercent } = this.$state;
    this._updateSliderVars(round(fillPercent(), 3), round(pointerPercent(), 3));
  }
}
SliderController.props = {
  disabled: false,
  step: 1,
  keyStep: 1,
  orientation: "horizontal",
  shiftKeyMultiplier: 5
};

class Slider extends Component {
  constructor() {
    super();
    new SliderController({
      _getStep: this.$props.step,
      _getKeyStep: this.$props.keyStep,
      _roundValue: Math.round,
      _isDisabled: this.$props.disabled,
      _getARIAValueNow: this._getARIAValueNow.bind(this),
      _getARIAValueText: this._getARIAValueText.bind(this)
    });
  }
  onSetup() {
    effect(this._watchValue.bind(this));
    effect(this._watchMinMax.bind(this));
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  _getARIAValueNow() {
    const { value } = this.$state;
    return Math.round(value());
  }
  _getARIAValueText() {
    const { value, max } = this.$state;
    return round(value() / max() * 100, 2) + "%";
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  _watchValue() {
    const { value } = this.$props;
    this.$state.value.set(value());
  }
  _watchMinMax() {
    const { min, max } = this.$props;
    this.$state.min.set(min());
    this.$state.max.set(max());
  }
}
Slider.props = {
  ...SliderController.props,
  min: 0,
  max: 100,
  value: 0
};
Slider.state = sliderState;

const cache = /* @__PURE__ */ new Map(), pending = /* @__PURE__ */ new Set(), registry = /* @__PURE__ */ new Set();
class ThumbnailsLoader {
  constructor($src, _media) {
    this.$src = $src;
    this._media = _media;
    this.$cues = signal([]);
    effect(this._onLoadCues.bind(this));
    registry.add(this);
    onDispose(() => registry.delete(this));
  }
  static create($src) {
    const media = useMediaContext();
    return new ThumbnailsLoader($src, media);
  }
  _onLoadCues() {
    const { canLoad } = this._media.$state;
    if (!canLoad())
      return;
    const controller = new AbortController(), { crossorigin } = this._media.$state;
    const src = this.$src();
    if (!src)
      return;
    if (cache.has(src)) {
      const cues = cache.get(src);
      cache.delete(src);
      cache.set(src, cues);
      if (cache.size > 30) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      this.$cues.set(cache.get(src));
    } else if (!pending.has(src)) {
      pending.add(src);
      import('media-captions').then(async ({ parseResponse }) => {
        try {
          const response = await fetch(src, {
            signal: controller.signal,
            credentials: getRequestCredentials(crossorigin())
          }), isJSON = response.headers.get("content-type") === "application/json";
          if (isJSON) {
            try {
              const { cues: cues2 } = parseJSONCaptionsFile(await response.text(), window.VTTCue);
              this._updateCues(src, cues2);
            } catch (e) {
            }
            return;
          }
          const { cues } = await parseResponse(response);
          this._updateCues(src, cues);
        } catch (e) {
        }
      });
    }
    return () => {
      controller.abort();
      this.$cues.set([]);
    };
  }
  _updateCues(currentSrc, cues) {
    this.$cues.set(cues);
    for (const t of registry) {
      if (peek(t.$src) === currentSrc)
        t.$cues.set(cues);
    }
    cache.set(currentSrc, cues);
    pending.delete(currentSrc);
  }
}

class Thumbnail extends Component {
  constructor() {
    super(...arguments);
    this._styleResets = [];
    this._requestResize = animationFrameThrottle(this._resize.bind(this));
  }
  onSetup() {
    this._media = useMediaContext();
    this._thumbnails = ThumbnailsLoader.create(this.$props.src);
    this.setAttributes({
      "data-loading": this._isLoading.bind(this),
      "data-error": this._hasError.bind(this),
      "data-hidden": this.$state.hidden,
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onConnect(el) {
    effect(this._watchImg.bind(this));
    effect(this._watchHidden.bind(this));
    effect(this._onLoadStart.bind(this));
    effect(this._onFindActiveCue.bind(this));
    effect(this._onResolveThumbnail.bind(this));
  }
  _watchImg() {
    const img = this.$state.img();
    if (!img)
      return;
    listenEvent(img, "load", this._onLoaded.bind(this));
    listenEvent(img, "error", this._onError.bind(this));
  }
  _onLoadStart() {
    const { src, loading, error } = this.$state;
    src();
    loading.set(true);
    error.set(null);
  }
  _onLoaded() {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(null);
    this._requestResize();
  }
  _onError(event) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event);
  }
  _isLoading() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  _hasError() {
    const { error } = this.$state;
    return !isNull(error());
  }
  _watchHidden() {
    const { hidden } = this.$state, { duration } = this._media.$state, cues = this._thumbnails.$cues();
    hidden.set(this._hasError() || !Number.isFinite(duration()) || cues.length === 0);
  }
  _getTime() {
    return this.$props.time();
  }
  _onFindActiveCue() {
    const time = this._getTime(), { activeCue } = this.$state, { duration } = this._media.$state, cues = this._thumbnails.$cues();
    if (!cues || !Number.isFinite(duration())) {
      activeCue.set(null);
      return;
    }
    activeCue.set(findActiveCue(cues, time));
  }
  _onResolveThumbnail() {
    let { activeCue } = this.$state, cue = activeCue(), baseURL = peek(this.$props.src);
    if (!/^https?:/.test(baseURL)) {
      baseURL = location.href;
    }
    if (!baseURL || !cue) {
      this.$state.src.set("");
      this._resetStyles();
      return;
    }
    const [src, coords = ""] = (cue.text || "").split("#");
    this.$state.coords.set(this._resolveThumbnailCoords(coords));
    this.$state.src.set(this._resolveThumbnailSrc(src, baseURL));
    this._requestResize();
  }
  _resolveThumbnailSrc(src, baseURL) {
    return /^https?:/.test(src) ? src : new URL(src, baseURL).href;
  }
  _resolveThumbnailCoords(coords) {
    const [props, values] = coords.split("="), resolvedCoords = {}, coordValues = values?.split(",");
    if (!props || !values)
      return null;
    for (let i = 0; i < props.length; i++)
      resolvedCoords[props[i]] = +coordValues[i];
    return resolvedCoords;
  }
  _resize() {
    if (!this.scope)
      return;
    const img = this.$state.img(), coords = this.$state.coords();
    if (!img || !this.el)
      return;
    const w = coords?.w ?? img.naturalWidth, h = coords?.h ?? img.naturalHeight, { maxWidth, maxHeight, minWidth, minHeight } = getComputedStyle(this.el), minRatio = Math.max(parseInt(minWidth) / w, parseInt(minHeight) / h), maxRatio = Math.min(parseInt(maxWidth) / w, parseInt(maxHeight) / h), scale = maxRatio < 1 ? maxRatio : minRatio > 1 ? minRatio : 1;
    this._style(this.el, "--thumbnail-width", `${w * scale}px`);
    this._style(this.el, "--thumbnail-height", `${h * scale}px`);
    this._style(img, "width", `${img.naturalWidth * scale}px`);
    this._style(img, "height", `${img.naturalHeight * scale}px`);
    this._style(
      img,
      "transform",
      coords ? `translate(-${coords.x * scale}px, -${coords.y * scale}px)` : ""
    );
    this._style(img, "max-width", "none");
  }
  _style(el, name, value) {
    el.style.setProperty(name, value);
    this._styleResets.push(() => el.style.removeProperty(name));
  }
  _resetStyles() {
    for (const reset of this._styleResets)
      reset();
    this._styleResets = [];
  }
}
Thumbnail.props = {
  src: "",
  time: 0
};
Thumbnail.state = new State({
  src: "",
  img: null,
  coords: null,
  activeCue: null,
  loading: false,
  error: null,
  hidden: false
});

class SliderThumbnail extends Thumbnail {
  onAttach(el) {
    this._slider = useState(Slider.state);
  }
  _getTime() {
    const { duration } = this._media.$state;
    return this._slider.pointerRate() * duration();
  }
}

var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$c(target, key, result);
  return result;
};
class SliderVideo extends Component {
  get video() {
    return this.$state.video();
  }
  onSetup() {
    this._media = useMediaContext();
    this._slider = useState(Slider.state);
    this.setAttributes({
      "data-loading": this._isLoading.bind(this),
      "data-hidden": this.$state.hidden,
      "data-error": this._hasError.bind(this),
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onAttach(el) {
    effect(this._watchVideo.bind(this));
    effect(this._watchSrc.bind(this));
    effect(this._watchHidden.bind(this));
    effect(this._onSrcChange.bind(this));
    effect(this._onUpdateTime.bind(this));
  }
  _watchVideo() {
    const video = this.$state.video();
    if (!video)
      return;
    if (video.readyState >= 2)
      this._onCanPlay();
    listenEvent(video, "canplay", this._onCanPlay.bind(this));
    listenEvent(video, "error", this._onError.bind(this));
  }
  _watchSrc() {
    const { src } = this.$state, { canLoad } = this._media.$state;
    src.set(canLoad() ? this.$props.src() : null);
  }
  _isLoading() {
    const { canPlay, hidden } = this.$state;
    return !canPlay() && !hidden();
  }
  _hasError() {
    const { error } = this.$state;
    return !isNull(error);
  }
  _watchHidden() {
    const { src, hidden } = this.$state, { canLoad, duration } = this._media.$state;
    hidden.set(canLoad() && (!src() || this._hasError() || !Number.isFinite(duration())));
  }
  _onSrcChange() {
    const { src, canPlay, error } = this.$state;
    src();
    canPlay.set(false);
    error.set(null);
  }
  _onCanPlay(event) {
    const { canPlay, error } = this.$state;
    canPlay.set(true);
    error.set(null);
    this.dispatch("can-play", { trigger: event });
  }
  _onError(event) {
    const { canPlay, error } = this.$state;
    canPlay.set(false);
    error.set(event);
    this.dispatch("error", { trigger: event });
  }
  _onUpdateTime() {
    const { video, canPlay } = this.$state, { duration } = this._media.$state, { pointerRate } = this._slider, media = video(), canUpdate = canPlay() && media && Number.isFinite(duration()) && Number.isFinite(pointerRate());
    if (canUpdate) {
      media.currentTime = pointerRate() * duration();
    }
  }
}
SliderVideo.props = {
  src: null
};
SliderVideo.state = new State({
  video: null,
  src: null,
  canPlay: false,
  error: null,
  hidden: false
});
__decorateClass$c([
  prop
], SliderVideo.prototype, "video", 1);

function padNumberWithZeroes(num, expectedLength) {
  const str = String(num);
  const actualLength = str.length;
  const shouldPad = actualLength < expectedLength;
  if (shouldPad) {
    const padLength = expectedLength - actualLength;
    const padding = `0`.repeat(padLength);
    return `${padding}${num}`;
  }
  return str;
}
function parseTime(duration) {
  const hours = Math.trunc(duration / 3600);
  const minutes = Math.trunc(duration % 3600 / 60);
  const seconds = Math.trunc(duration % 60);
  const fraction = Number((duration - Math.trunc(duration)).toPrecision(3));
  return {
    hours,
    minutes,
    seconds,
    fraction
  };
}
function formatTime(duration, shouldPadHours = null, shouldPadMinutes = null, shouldAlwaysShowHours = false) {
  const { hours, minutes, seconds } = parseTime(duration), paddedHours = shouldPadHours ? padNumberWithZeroes(hours, 2) : hours, paddedMinutes = shouldPadMinutes || isNull(shouldPadMinutes) && duration >= 3600 ? padNumberWithZeroes(minutes, 2) : minutes, paddedSeconds = padNumberWithZeroes(seconds, 2);
  if (hours > 0 || shouldAlwaysShowHours) {
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${paddedMinutes}:${paddedSeconds}`;
}
function formatSpokenTime(duration) {
  const spokenParts = [];
  const { hours, minutes, seconds } = parseTime(duration);
  if (hours > 0) {
    spokenParts.push(`${hours} hour`);
  }
  if (minutes > 0) {
    spokenParts.push(`${minutes} min`);
  }
  if (seconds > 0 || spokenParts.length === 0) {
    spokenParts.push(`${seconds} sec`);
  }
  return spokenParts.join(" ");
}

var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$b(target, key, result);
  return result;
};
class SliderValue extends Component {
  onSetup() {
    this._slider = useState(Slider.state);
    this._format = useContext(sliderValueFormatContext);
    this._text = computed(this.getValueText.bind(this));
  }
  getValueText() {
    const { type, format, decimalPlaces, padHours, padMinutes, showHours } = this.$props, { value: sliderValue, pointerValue, min, max } = this._slider, _format = format() ?? this._format.default;
    const value = type() === "current" ? sliderValue() : pointerValue();
    if (_format === "percent") {
      const range = max() - min();
      const percent = value / range * 100;
      return (this._format.percent ?? round)(percent, decimalPlaces()) + "\uFE6A";
    } else if (_format === "time") {
      return (this._format.time ?? formatTime)(value, padHours(), padMinutes(), showHours());
    } else {
      return this._format.value?.(value) ?? value.toFixed(2);
    }
  }
}
SliderValue.props = {
  type: "pointer",
  format: null,
  showHours: false,
  padHours: null,
  padMinutes: null,
  decimalPlaces: 2
};
__decorateClass$b([
  method
], SliderValue.prototype, "getValueText", 1);

class SliderPreview extends Component {
  onSetup() {
    this._slider = useContext(sliderContext);
    const { active } = useState(Slider.state);
    this.setAttributes({
      "data-visible": active
    });
  }
  onAttach(el) {
    Object.assign(el.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "max-content"
    });
  }
  onConnect(el) {
    const { _preview } = this._slider;
    _preview.set(el);
    onDispose(() => _preview.set(null));
    effect(this._updatePlacement.bind(this));
    const resize = new ResizeObserver(this._updatePlacement.bind(this));
    resize.observe(el);
    onDispose(() => resize.disconnect());
  }
  _updatePlacement() {
    const { _disabled, _orientation } = this._slider;
    if (_disabled())
      return;
    const el = this.el, { offset, noClamp } = this.$props;
    updateSliderPreviewPlacement(el, {
      clamp: !noClamp(),
      offset: offset(),
      orientation: _orientation()
    });
  }
}
SliderPreview.props = {
  offset: 0,
  noClamp: false
};
function updateSliderPreviewPlacement(el, {
  clamp,
  offset,
  orientation
}) {
  const { width, height } = el.getBoundingClientRect(), styles = {
    top: null,
    right: null,
    bottom: null,
    left: null
  };
  styles[orientation === "horizontal" ? "bottom" : "left"] = `calc(100% + var(--media-slider-preview-offset, ${offset}px))`;
  if (orientation === "horizontal") {
    const widthHalf = width / 2;
    if (!clamp) {
      styles.left = `calc(var(--slider-pointer) - ${widthHalf}px)`;
    } else {
      const leftClamp = `max(0px, calc(var(--slider-pointer) - ${widthHalf}px))`, rightClamp = `calc(100% - ${width}px)`;
      styles.left = `min(${leftClamp}, ${rightClamp})`;
    }
  } else {
    const heightHalf = height / 2;
    if (!clamp) {
      styles.bottom = `calc(var(--slider-pointer) - ${heightHalf}px)`;
    } else {
      const topClamp = `max(${heightHalf}px, calc(var(--slider-pointer) - ${heightHalf}px))`, bottomClamp = `calc(100% - ${height}px)`;
      styles.bottom = `min(${topClamp}, ${bottomClamp})`;
    }
  }
  Object.assign(el.style, styles);
}

class VolumeSlider extends Component {
  constructor() {
    super(...arguments);
    this._throttleVolumeChange = functionThrottle(this._onVolumeChange.bind(this), 25);
  }
  onSetup() {
    this._media = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "percent"
    });
    new SliderController({
      _getStep: this.$props.step,
      _getKeyStep: this.$props.keyStep,
      _isDisabled: this.$props.disabled,
      _roundValue: Math.round,
      _getARIAValueNow: this._getARIAValueNow.bind(this),
      _getARIAValueText: this._getARIAValueText.bind(this),
      _onDragValueChange: this._onDragValueChange.bind(this),
      _onValueChange: this._onValueChange.bind(this)
    }).attach(this);
    effect(this._watchVolume.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-volume-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Volume");
    const { canSetVolume } = this._media.$state;
    this.setAttributes({
      "data-supported": canSetVolume,
      "aria-hidden": $ariaBool(() => !canSetVolume())
    });
  }
  _getARIAValueNow() {
    const { value } = this.$state;
    return Math.round(value());
  }
  _getARIAValueText() {
    const { value, max } = this.$state;
    return round(value() / max() * 100, 2) + "%";
  }
  _watchVolume() {
    const { muted, volume } = this._media.$state;
    const newValue = muted() ? 0 : volume() * 100;
    this.$state.value.set(newValue);
    this.dispatch("value-change", { detail: newValue });
  }
  _onVolumeChange(event) {
    if (!event.trigger)
      return;
    const mediaVolume = round(event.detail / 100, 3);
    this._media.remote.changeVolume(mediaVolume, event);
  }
  _onValueChange(event) {
    this._throttleVolumeChange(event);
  }
  _onDragValueChange(event) {
    this._throttleVolumeChange(event);
  }
}
VolumeSlider.props = {
  ...SliderController.props,
  keyStep: 5,
  shiftKeyMultiplier: 2
};
VolumeSlider.state = sliderState;

class TimeSlider extends Component {
  constructor() {
    super();
    this._chapter = signal(null);
    this._playingBeforeDragStart = false;
    new SliderController({
      _swipeGesture: true,
      _getStep: this._getStep.bind(this),
      _getKeyStep: this._getKeyStep.bind(this),
      _isDisabled: this._isDisabled.bind(this),
      _roundValue: this._roundValue,
      _getARIAValueNow: this._getARIAValueNow.bind(this),
      _getARIAValueText: this._getARIAValueText.bind(this),
      _onDragStart: this._onDragStart.bind(this),
      _onDragValueChange: this._onDragValueChange.bind(this),
      _onDragEnd: this._onDragEnd.bind(this),
      _onValueChange: this._onValueChange.bind(this)
    });
  }
  onSetup() {
    this._media = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "time",
      value: this._formatValue.bind(this),
      time: this._formatTime.bind(this)
    });
    this.setAttributes({
      "data-chapters": this._hasChapters.bind(this)
    });
    this.setStyles({
      "--slider-progress": this._calcBufferedPercent.bind(this)
    });
    effect(this._watchCurrentTime.bind(this));
    effect(this._watchSeekingThrottle.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-time-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Seek");
  }
  onConnect(el) {
    effect(this._watchPreviewing.bind(this));
    observeActiveTextTrack(this._media.textTracks, "chapters", this._chapter.set);
  }
  _calcBufferedPercent() {
    const { bufferedEnd, duration } = this._media.$state;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1) * 100, 3) + "%";
  }
  _hasChapters() {
    const { duration } = this._media.$state;
    return this._chapter()?.cues.length && Number.isFinite(duration()) && duration() > 0;
  }
  _watchSeekingThrottle() {
    this._dispatchSeeking = functionThrottle(
      this._seeking.bind(this),
      this.$props.seekingRequestThrottle()
    );
  }
  _watchCurrentTime() {
    const { currentTime } = this._media.$state, { value, dragging } = this.$state, newValue = this._timeToPercent(currentTime());
    if (!peek(dragging)) {
      value.set(newValue);
      this.dispatch("value-change", { detail: newValue });
    }
  }
  _watchPreviewing() {
    const player = this._media.player.el, { _preview } = useContext(sliderContext);
    player && _preview() && setAttribute(player, "data-preview", this.$state.active());
  }
  _seeking(time, event) {
    this._media.remote.seeking(time, event);
  }
  _seek(time, percent, event) {
    this._dispatchSeeking.cancel();
    const { live } = this._media.$state;
    if (live() && percent >= 99) {
      this._media.remote.seekToLiveEdge(event);
      return;
    }
    this._media.remote.seek(time, event);
  }
  _onDragStart(event) {
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging()) {
      const { paused } = this._media.$state;
      this._playingBeforeDragStart = !paused();
      this._media.remote.pause(event);
    }
  }
  _onDragValueChange(event) {
    this._dispatchSeeking(this._percentToTime(event.detail), event);
  }
  _onDragEnd(event) {
    const percent = event.detail;
    this._seek(this._percentToTime(percent), percent, event);
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging() && this._playingBeforeDragStart) {
      this._media.remote.play(event);
      this._playingBeforeDragStart = false;
    }
  }
  _onValueChange(event) {
    const { dragging } = this.$state;
    if (dragging() || !event.trigger)
      return;
    this._onDragEnd(event);
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  _getStep() {
    const value = this.$props.step() / this._media.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  _getKeyStep() {
    const value = this.$props.keyStep() / this._media.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  _roundValue(value) {
    return round(value, 3);
  }
  _isDisabled() {
    const { canSeek } = this._media.$state;
    return this.$props.disabled() || !canSeek();
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  _getARIAValueNow() {
    const { value } = this.$state;
    return Math.round(value());
  }
  _getARIAValueText() {
    const time = this._percentToTime(this.$state.value()), { duration } = this._media.$state;
    return Number.isFinite(time) ? `${formatSpokenTime(time)} out of ${formatSpokenTime(duration())}` : "live";
  }
  // -------------------------------------------------------------------------------------------
  // Format
  // -------------------------------------------------------------------------------------------
  _percentToTime(percent) {
    const { duration } = this._media.$state;
    return round(percent / 100 * duration(), 5);
  }
  _timeToPercent(time) {
    const { liveEdge, duration } = this._media.$state, rate = Math.max(0, Math.min(1, liveEdge() ? 1 : Math.min(time, duration()) / duration()));
    return Number.isNaN(rate) ? 0 : Number.isFinite(rate) ? rate * 100 : 100;
  }
  _formatValue(percent) {
    const time = this._percentToTime(percent), { live, duration } = this._media.$state;
    return Number.isFinite(time) ? (live() ? time - duration() : time).toFixed(0) : "LIVE";
  }
  _formatTime(percent, padHours, padMinutes, showHours) {
    const time = this._percentToTime(percent), { live, duration } = this._media.$state, value = live() ? time - duration() : time;
    return Number.isFinite(time) ? `${value < 0 ? "-" : ""}${formatTime(Math.abs(value), padHours, padMinutes, showHours)}` : "LIVE";
  }
}
TimeSlider.props = {
  ...SliderController.props,
  step: 0.1,
  keyStep: 5,
  shiftKeyMultiplier: 2,
  pauseWhileDragging: false,
  seekingRequestThrottle: 100
};
TimeSlider.state = sliderState;

var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$a(target, key, result);
  return result;
};
class SliderChapters extends Component {
  constructor() {
    super(...arguments);
    this._titleRef = null;
    this._refs = [];
    this._$track = signal(null);
    this._$cues = signal([]);
    this._activeIndex = signal(-1);
    this._activePointerIndex = signal(-1);
    this._bufferedIndex = 0;
    this._updateBufferedPercent = animationFrameThrottle((bufferedPercent) => {
      let percent, cues = this._$cues();
      for (let i = this._bufferedIndex; i < this._refs.length; i++) {
        percent = this._calcPercent(cues[i], bufferedPercent);
        this._refs[i]?.style.setProperty("--chapter-progress", percent + "%");
        if (percent < 100) {
          this._bufferedIndex = i;
          break;
        }
      }
    });
    this._bufferedPercent = computed(this._calcMediaBufferedPercent.bind(this));
    this._onCuesChange = functionDebounce(
      () => {
        const track = peek(this._$track);
        if (!this.scope || !track || !track.cues.length)
          return;
        this._$cues.set(this._fillGaps(track.cues));
        this._activeIndex.set(0);
      },
      150,
      true
    );
  }
  get cues() {
    return this._$cues();
  }
  get activeCue() {
    return this._$cues()[this._activeIndex()] || null;
  }
  get activePointerCue() {
    return this._$cues()[this._activePointerIndex()] || null;
  }
  onSetup() {
    this._media = useMediaContext();
    this._sliderState = useState(TimeSlider.state);
  }
  onAttach(el) {
    observeActiveTextTrack(this._media.textTracks, "chapters", this._setTrack.bind(this));
    effect(this._onTrackChange.bind(this));
  }
  onConnect() {
    onDispose(() => this._reset.bind(this));
  }
  onDestroy() {
    this._setTrack(null);
  }
  setRefs(refs) {
    this._refs = refs;
    this._updateScope?.dispose();
    if (this._refs.length === 1) {
      const el = this._refs[0];
      el.style.width = "100%";
      el.style.setProperty("--chapter-fill", "var(--slider-fill)");
      el.style.setProperty("--chapter-progress", "var(--slider-progress)");
    } else if (this._refs.length > 0) {
      scoped(() => this._watch(), this._updateScope = createScope());
    }
  }
  _setTrack(track) {
    if (peek(this._$track) === track)
      return;
    this._reset();
    this._$track.set(track);
  }
  _reset() {
    this._refs = [];
    this._$cues.set([]);
    this._activeIndex.set(-1);
    this._activePointerIndex.set(-1);
    this._bufferedIndex = 0;
    this._updateScope?.dispose();
  }
  _watch() {
    if (!this._refs.length)
      return;
    effect(this._watchContainerWidths.bind(this));
    effect(this._watchFillPercent.bind(this));
    effect(this._watchPointerPercent.bind(this));
    effect(this._watchBufferedPercent.bind(this));
  }
  _watchContainerWidths() {
    let cue, cues = this._$cues(), endTime = cues[cues.length - 1].endTime;
    for (let i = 0; i < cues.length; i++) {
      cue = cues[i];
      if (this._refs[i]) {
        this._refs[i].style.width = round((cue.endTime - cue.startTime) / endTime * 100, 3) + "%";
      }
    }
  }
  _watchFillPercent() {
    let { liveEdge, ended } = this._media.$state, { fillPercent, value } = this._sliderState, cues = this._$cues(), isLiveEdge = liveEdge(), prevActiveIndex = peek(this._activeIndex), currentChapter = cues[prevActiveIndex];
    let currentActiveIndex = isLiveEdge ? this._$cues.length - 1 : this._findActiveChapterIndex(
      currentChapter ? currentChapter.startTime <= peek(value) ? prevActiveIndex : 0 : 0,
      fillPercent()
    );
    if (isLiveEdge || ended() || !currentChapter) {
      this._updateFillPercents(0, cues.length, "100%");
    } else if (currentActiveIndex > prevActiveIndex) {
      this._updateFillPercents(prevActiveIndex, currentActiveIndex, "100%");
    } else if (currentActiveIndex < prevActiveIndex) {
      this._updateFillPercents(currentActiveIndex + 1, prevActiveIndex + 1, "0%");
    }
    const percent = isLiveEdge ? "100%" : this._calcPercent(cues[currentActiveIndex], fillPercent()) + "%";
    this._updateFillPercent(this._refs[currentActiveIndex], percent);
    this._activeIndex.set(currentActiveIndex);
  }
  _watchPointerPercent() {
    let { pointing, pointerPercent } = this._sliderState;
    if (!pointing()) {
      this._activePointerIndex.set(-1);
      return;
    }
    const activeIndex = this._findActiveChapterIndex(0, pointerPercent());
    this._activePointerIndex.set(activeIndex);
  }
  _updateFillPercents(start, end, percent) {
    for (let i = start; i < end; i++)
      this._updateFillPercent(this._refs[i], percent);
  }
  _updateFillPercent(ref, percent) {
    ref && ref.style.setProperty("--chapter-fill", percent);
  }
  _findActiveChapterIndex(startIndex, percent) {
    let chapterPercent = 0, cues = this._$cues();
    for (let i = startIndex; i < cues.length; i++) {
      chapterPercent = this._calcPercent(cues[i], percent);
      if (chapterPercent >= 0 && chapterPercent < 100)
        return i;
    }
    return 0;
  }
  _watchBufferedPercent() {
    this._updateBufferedPercent(this._bufferedPercent());
  }
  _calcMediaBufferedPercent() {
    const { bufferedEnd, duration } = this._media.$state;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1), 3) * 100;
  }
  _calcPercent(cue, percent) {
    const cues = this._$cues();
    if (cues.length === 0)
      return 0;
    const lastChapter = cues[cues.length - 1], startPercent = cue.startTime / lastChapter.endTime * 100, endPercent = cue.endTime / lastChapter.endTime * 100;
    return Math.max(
      0,
      round(
        percent >= endPercent ? 100 : (percent - startPercent) / (endPercent - startPercent) * 100,
        3
      )
    );
  }
  _fillGaps(cues) {
    const chapters = [];
    if (cues[0].startTime !== 0) {
      chapters.push(new window.VTTCue(0, cues[0].startTime, ""));
    }
    for (let i = 0; i < cues.length - 1; i++) {
      const currentCue = cues[i], nextCue = cues[i + 1];
      chapters.push(currentCue);
      if (nextCue) {
        const timeDiff = nextCue.startTime - currentCue.endTime;
        if (timeDiff > 0) {
          chapters.push(new window.VTTCue(currentCue.endTime, currentCue.endTime + timeDiff, ""));
        }
      }
    }
    chapters.push(cues[cues.length - 1]);
    return chapters;
  }
  _onTrackChange() {
    if (!this.scope)
      return;
    const { disabled } = this.$props;
    if (disabled())
      return;
    const track = this._$track();
    if (track) {
      const onCuesChange = this._onCuesChange.bind(this);
      onCuesChange();
      onDispose(listenEvent(track, "add-cue", onCuesChange));
      onDispose(listenEvent(track, "remove-cue", onCuesChange));
    }
    this._titleRef = this._findChapterTitleRef();
    if (this._titleRef)
      effect(this._onChapterTitleChange.bind(this));
    return () => {
      if (this._titleRef) {
        this._titleRef.textContent = "";
        this._titleRef = null;
      }
    };
  }
  _onChapterTitleChange() {
    const cue = this.activePointerCue || this.activeCue;
    if (this._titleRef)
      this._titleRef.textContent = cue?.text || "";
  }
  _findParentSlider() {
    let node = this.el;
    while (node && node.getAttribute("role") !== "slider") {
      node = node.parentElement;
    }
    return node;
  }
  _findChapterTitleRef() {
    const slider = this._findParentSlider();
    return slider ? slider.querySelector('[data-part="chapter-title"]') : null;
  }
}
SliderChapters.props = {
  disabled: false
};
__decorateClass$a([
  prop
], SliderChapters.prototype, "cues", 1);
__decorateClass$a([
  prop
], SliderChapters.prototype, "activeCue", 1);
__decorateClass$a([
  prop
], SliderChapters.prototype, "activePointerCue", 1);
__decorateClass$a([
  method
], SliderChapters.prototype, "setRefs", 1);

const menuContext = createContext();

const FOCUSABLE_ELEMENTS_SELECTOR = /* @__PURE__ */ [
  "a[href]",
  "[tabindex]",
  "input",
  "select",
  "button"
].map((selector) => `${selector}:not([aria-hidden])`).join(",");
const VALID_KEYS = /* @__PURE__ */ new Set([
  "Escape",
  "Tab",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "PageUp",
  "End",
  "PageDown",
  "Enter",
  " "
]);
class MenuFocusController {
  constructor(_delegate) {
    this._delegate = _delegate;
    this._index = 0;
    this._el = null;
    this._elements = [];
  }
  get _items() {
    return this._elements;
  }
  _attachMenu(el) {
    listenEvent(el, "focus", this._onFocus.bind(this));
    this._el = el;
    onDispose(() => {
      this._el = null;
    });
    return this;
  }
  _listen() {
    if (!this._el)
      return;
    this._update();
    listenEvent(this._el, "keyup", this._onKeyUp.bind(this));
    listenEvent(this._el, "keydown", this._onKeyDown.bind(this));
    onDispose(() => {
      this._index = 0;
      this._elements = [];
    });
  }
  _update() {
    this._index = 0;
    this._elements = this._getFocusableElements();
  }
  _scroll(index = this._findActiveIndex()) {
    const element = this._elements[index], container = this._delegate._getScrollContainer();
    if (element && container) {
      requestAnimationFrame(() => {
        container.scrollTop = element.offsetTop - container.offsetHeight / 2 + element.offsetHeight / 2;
      });
    }
  }
  _focusAt(index) {
    this._index = index;
    this._elements[index]?.focus();
    this._scroll(index);
  }
  _findActiveIndex() {
    return this._elements.findIndex((el) => el.getAttribute("aria-checked") === "true");
  }
  _onFocus() {
    this._update();
    setTimeout(() => {
      const index = this._findActiveIndex();
      this._focusAt(index >= 0 ? index : 0);
    }, 100);
  }
  _onKeyUp(event) {
    if (!VALID_KEYS.has(event.key))
      return;
    event.stopPropagation();
    event.preventDefault();
  }
  _onKeyDown(event) {
    if (!VALID_KEYS.has(event.key))
      return;
    event.stopPropagation();
    event.preventDefault();
    switch (event.key) {
      case "Escape":
        this._delegate._closeMenu(event);
        break;
      case "Tab":
        this._focusAt(this._nextIndex(event.shiftKey ? -1 : 1));
        break;
      case "ArrowUp":
        this._focusAt(this._nextIndex(-1));
        break;
      case "ArrowDown":
        this._focusAt(this._nextIndex(1));
        break;
      case "Home":
      case "PageUp":
        this._focusAt(0);
        break;
      case "End":
      case "PageDown":
        this._focusAt(this._elements.length - 1);
        break;
    }
  }
  _nextIndex(delta) {
    let index = this._index;
    do {
      index = (index + delta + this._elements.length) % this._elements.length;
    } while (this._elements[index]?.offsetParent === null);
    return index;
  }
  _getFocusableElements() {
    if (!this._el)
      return [];
    const focusableElements = this._el.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR), elements = [];
    const is = (node) => {
      return node.getAttribute("role") === "menu";
    };
    for (const el of focusableElements) {
      if (el instanceof HTMLElement && el.offsetParent !== null && // does not have display: none
      isElementParent(this._el, el, is)) {
        elements.push(el);
      }
    }
    return elements;
  }
}

var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$9(target, key, result);
  return result;
};
let idCount = 0;
class Menu extends Component {
  constructor() {
    super();
    this._expanded = signal(false);
    this._disabled = signal(false);
    this._trigger = signal(null);
    this._content = signal(null);
    this._isTriggerDisabled = signal(false);
    this._submenus = /* @__PURE__ */ new Set();
    this._menuObserver = null;
    this._removeSubmenuBind = this._removeSubmenu.bind(this);
    this._onSubmenuOpenBind = this._onSubmenuOpen.bind(this);
    this._onSubmenuCloseBind = this._onSubmenuClose.bind(this);
    const { showDelay } = this.$props;
    this._popper = new Popper({
      _trigger: this._trigger,
      _content: this._content,
      _showDelay: showDelay,
      _listen: (trigger, show, hide) => {
        onPress(trigger, (event) => {
          if (this._expanded())
            hide(event);
          else
            show(event);
        });
        const closeTarget = this._getCloseTarget();
        if (closeTarget) {
          onPress(closeTarget, (event) => {
            event.stopPropagation();
            hide(event);
          });
        }
      },
      _onChange: this._onExpandedChange.bind(this)
    });
  }
  get triggerElement() {
    return this._trigger();
  }
  get contentElement() {
    return this._content();
  }
  get isSubmenu() {
    return !!this._parentMenu;
  }
  onSetup() {
    this._media = useMediaContext();
    const currentIdCount = ++idCount;
    this._menuId = `media-menu-${currentIdCount}`;
    this._menuButtonId = `media-menu-button-${currentIdCount}`;
    this._focus = new MenuFocusController({
      _getScrollContainer: this._findScrollContainer.bind(this),
      _closeMenu: this.close.bind(this)
    });
    if (hasProvidedContext(menuContext)) {
      this._parentMenu = useContext(menuContext);
    }
    this.setAttributes({
      "data-open": this._expanded,
      "data-submenu": this.isSubmenu,
      "data-disabled": this._isDisabled.bind(this)
    });
    provideContext(menuContext, {
      _button: this._trigger,
      _expanded: this._expanded,
      _hint: signal(""),
      _disable: this._disable.bind(this),
      _attachMenuButton: this._attachMenuButton.bind(this),
      _attachMenuItems: this._attachMenuItems.bind(this),
      _attachObserver: this._attachObserver.bind(this),
      _disableMenuButton: this._disableMenuButton.bind(this),
      _addSubmenu: this._addSubmenu.bind(this)
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
    this._focus._attachMenu(el);
  }
  onConnect(el) {
    effect(this._watchExpanded.bind(this));
    if (this.isSubmenu)
      this._parentMenu?._addSubmenu(this);
    requestAnimationFrame(() => {
      this._onResize();
    });
  }
  onDestroy() {
    this._trigger.set(null);
    this._content.set(null);
    this._menuObserver = null;
  }
  _watchExpanded() {
    const expanded = this._isExpanded();
    this._onResize();
    this._updateMenuItemsHidden(expanded);
    if (!expanded)
      return;
    effect(() => {
      const { height } = this._media.$state, content = this._content();
      content && setStyle(content, "--player-height", height() + "px");
    });
    this._focus._listen();
    this.listen("pointerup", this._onPointerUp.bind(this));
    listenEvent(window, "pointerup", this._onWindowPointerUp.bind(this));
  }
  _attachMenuButton(button) {
    const el = button.el, isMenuItem = this.isSubmenu, isARIADisabled = $ariaBool(this._isDisabled.bind(this));
    setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
    setAttributeIfEmpty(el, "role", isMenuItem ? "menuitem" : "button");
    setAttribute(el, "id", this._menuButtonId);
    setAttribute(el, "aria-haspopup", "menu");
    setAttribute(el, "aria-expanded", "false");
    setAttribute(el, "data-submenu", this.isSubmenu);
    if (!this.isSubmenu) {
      this._stopClickPropagation(el);
    }
    const watchAttrs = () => {
      setAttribute(el, "data-open", this._expanded());
      setAttribute(el, "aria-disabled", isARIADisabled());
    };
    if (IS_SERVER)
      watchAttrs();
    else
      effect(watchAttrs);
    this._trigger.set(el);
    onDispose(() => {
      this._trigger.set(null);
    });
  }
  _attachMenuItems(items) {
    const el = items.el;
    el.style.setProperty("display", "none");
    setAttribute(el, "id", this._menuId);
    setAttributeIfEmpty(el, "role", "menu");
    setAttributeIfEmpty(el, "tabindex", "-1");
    setAttribute(el, "data-submenu", this.isSubmenu);
    this._content.set(el);
    onDispose(() => this._content.set(null));
    if (!this.isSubmenu) {
      this._stopClickPropagation(el);
    }
    const watchAttrs = () => {
      setAttribute(el, "data-open", this._expanded());
    };
    if (IS_SERVER)
      watchAttrs();
    else
      effect(watchAttrs);
    this._focus._attachMenu(el);
    this._updateMenuItemsHidden(false);
    if (!IS_SERVER) {
      const onResize = animationFrameThrottle(this._onResize.bind(this)), mutations = new MutationObserver(onResize);
      onResize();
      mutations.observe(el, { childList: true, subtree: true });
      onDispose(() => mutations.disconnect());
    }
  }
  _attachObserver(observer) {
    this._menuObserver = observer;
  }
  _stopClickPropagation(el) {
    listenEvent(el, "click", (e) => e.stopPropagation());
    listenEvent(el, "pointerup", (e) => e.stopPropagation());
  }
  _updateMenuItemsHidden(expanded) {
    const content = peek(this._content);
    if (content)
      setAttribute(content, "aria-hidden", ariaBool$1(!expanded));
  }
  _disableMenuButton(disabled) {
    this._isTriggerDisabled.set(disabled);
  }
  _onExpandedChange(isExpanded, event) {
    event?.stopPropagation();
    if (this._expanded() === isExpanded)
      return;
    if (this._isDisabled()) {
      if (isExpanded)
        this._popper.hide(event);
      return;
    }
    const trigger = this._trigger(), content = this._content();
    if (trigger) {
      setAttribute(trigger, "aria-controls", isExpanded && this._menuId);
      setAttribute(trigger, "aria-expanded", ariaBool$1(isExpanded));
    }
    if (content)
      setAttribute(content, "aria-labelledby", isExpanded && this._menuButtonId);
    this._expanded.set(isExpanded);
    this._toggleMediaControls(event);
    tick();
    if (isKeyboardEvent(event)) {
      if (isExpanded) {
        content?.focus();
      } else {
        trigger?.focus();
      }
      for (const el of [this.el, content]) {
        el && el.setAttribute("data-keyboard", "");
      }
    } else {
      for (const el of [this.el, content]) {
        el && el.removeAttribute("data-keyboard");
      }
    }
    this.dispatch(isExpanded ? "open" : "close", { trigger: event });
    if (isExpanded) {
      if (!this.isSubmenu && this._media.activeMenu !== this) {
        this._media.activeMenu?.close(event);
        this._media.activeMenu = this;
      }
      this._menuObserver?._onOpen?.(event);
    } else {
      if (this.isSubmenu) {
        setTimeout(() => {
          for (const el of this._submenus)
            el.close(event);
        }, 300);
      } else {
        this._media.activeMenu = null;
      }
      this._menuObserver?._onClose?.(event);
    }
    if (isExpanded && !isKeyboardEvent(event)) {
      requestAnimationFrame(() => {
        this._focus._update();
        setTimeout(() => {
          this._focus._scroll();
        }, 100);
      });
    }
  }
  _isExpanded() {
    return !this._isDisabled() && this._expanded();
  }
  _isDisabled() {
    return this._disabled() || this._isTriggerDisabled();
  }
  _disable(disabled) {
    this._disabled.set(disabled);
  }
  _onPointerUp(event) {
    event.stopPropagation();
  }
  _onWindowPointerUp(event) {
    if (this.isSubmenu)
      return setTimeout(this.close.bind(this, event), 800);
    else
      this.close(event);
  }
  _getCloseTarget() {
    const target = this.el.querySelector('[data-part="close-target"]');
    return isElementParent(this.el, target, (node) => node.getAttribute("role") === "menu") ? target : null;
  }
  _findScrollContainer() {
    if (!this.isSubmenu) {
      const content = peek(this._content);
      return content || null;
    } else {
      let el = this.el;
      while (el && el.tagName !== "media-menu" && el.hasAttribute("data-submenu")) {
        el = el.parentNode;
      }
      return el;
    }
  }
  _toggleMediaControls(trigger) {
    if (this.isSubmenu)
      return;
    if (this._expanded())
      this._media.remote.pauseControls(trigger);
    else
      this._media.remote.resumeControls(trigger);
  }
  _addSubmenu(menu) {
    this._submenus.add(menu);
    listenEvent(menu, "open", this._onSubmenuOpenBind);
    listenEvent(menu, "close", this._onSubmenuCloseBind);
    onDispose(this._removeSubmenuBind);
  }
  _removeSubmenu(menu) {
    this._submenus.delete(menu);
  }
  _onSubmenuOpen(event) {
    for (const target of this._submenus) {
      if (target !== event.target) {
        for (const el of [target.el, target.triggerElement]) {
          el?.setAttribute("aria-hidden", "true");
        }
      }
    }
    requestAnimationFrame(() => {
      this._onResize();
    });
  }
  _onSubmenuClose() {
    for (const target of this._submenus) {
      for (const el of [target.el, target.triggerElement]) {
        el?.setAttribute("aria-hidden", "false");
      }
    }
    requestAnimationFrame(() => {
      this._onResize();
    });
  }
  _onResize() {
    const content = peek(this._content);
    if (!content || IS_SERVER)
      return;
    let { paddingTop, paddingBottom, borderTopWidth, borderBottomWidth } = getComputedStyle(content), height = parseFloat(paddingTop) + parseFloat(paddingBottom) + parseFloat(borderTopWidth) + parseFloat(borderBottomWidth), children = [...content.children];
    for (const child of children) {
      if (child instanceof HTMLElement && child.style.display === "contents") {
        children.push(...child.children);
      } else if (child.nodeType === 3) {
        height += parseInt(window.getComputedStyle(child).fontSize, 10);
      } else {
        height += child.offsetHeight || 0;
      }
    }
    requestAnimationFrame(() => {
      if (!content)
        return;
      setAttribute(content, "data-resizing", "");
      setTimeout(() => {
        if (content)
          setAttribute(content, "data-resizing", false);
      }, 400);
      setStyle(content, "--menu-height", height + "px");
    });
  }
  open(trigger) {
    if (peek(this._expanded))
      return;
    this._popper.show(trigger);
    tick();
  }
  close(trigger) {
    if (!peek(this._expanded))
      return;
    this._popper.hide(trigger);
    tick();
  }
}
Menu.props = {
  showDelay: 0
};
__decorateClass$9([
  prop
], Menu.prototype, "triggerElement", 1);
__decorateClass$9([
  prop
], Menu.prototype, "contentElement", 1);
__decorateClass$9([
  prop
], Menu.prototype, "isSubmenu", 1);
__decorateClass$9([
  method
], Menu.prototype, "open", 1);
__decorateClass$9([
  method
], Menu.prototype, "close", 1);

var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$8(target, key, result);
  return result;
};
class MenuButton extends Component {
  constructor() {
    super();
    new FocusVisibleController();
  }
  get expanded() {
    return this._menu?._expanded() ?? false;
  }
  onSetup() {
    this._menu = useContext(menuContext);
  }
  onAttach(el) {
    this._menu._attachMenuButton(this);
    effect(this._watchDisabled.bind(this));
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    const hint = Array.from(el.querySelectorAll('[data-part="hint"]')).pop();
    if (hint) {
      effect(() => {
        const text = this._menu._hint();
        if (text)
          hint.textContent = text;
      });
    }
    onPress(el, (trigger) => {
      this.dispatch("select", { trigger });
    });
  }
  _watchDisabled() {
    this._menu._disableMenuButton(this.$props.disabled());
  }
}
MenuButton.props = {
  disabled: false
};
__decorateClass$8([
  prop
], MenuButton.prototype, "expanded", 1);

class MenuItem extends MenuButton {
}

class MenuPortal extends Component {
  constructor() {
    super(...arguments);
    this._target = null;
  }
  onSetup() {
    this._media = useMediaContext();
    provideContext(menuPortalContext, {
      _attach: this._attachElement.bind(this)
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  // Need this so connect scope is defined.
  onConnect(el) {
  }
  onDestroy() {
    this._target?.remove();
    this._target = null;
  }
  _attachElement(el) {
    this._portal(false);
    this._target = el;
    requestScopedAnimationFrame(() => {
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        effect(this._watchDisabled.bind(this));
      });
    });
  }
  _watchDisabled() {
    const { fullscreen } = this._media.$state, { disabled } = this.$props, _disabled = disabled();
    this._portal(_disabled === "fullscreen" ? !fullscreen() : !_disabled);
  }
  _portal(shouldPortal) {
    if (!this._target)
      return;
    let container = this._getContainer(this.$props.container());
    if (!container)
      return;
    const isPortalled = this._target.parentElement === container;
    setAttribute(this._target, "data-portal", shouldPortal);
    if (shouldPortal) {
      if (!isPortalled) {
        this._target.remove();
        container.append(this._target);
      }
    } else if (isPortalled && this._target.parentElement === container) {
      this._target.remove();
      this.el?.append(this._target);
    }
  }
  _getContainer(selector) {
    if (selector instanceof HTMLElement)
      return selector;
    return selector ? document.querySelector(selector) : document.body;
  }
}
MenuPortal.props = {
  container: null,
  disabled: false
};
const menuPortalContext = createContext();

class MenuItems extends Component {
  constructor() {
    super();
    new FocusVisibleController();
    const { placement } = this.$props;
    this.setAttributes({
      "data-placement": placement
    });
  }
  onAttach(el) {
    this._menu = useContext(menuContext);
    this._menu._attachMenuItems(this);
    if (hasProvidedContext(menuPortalContext)) {
      const portal = useContext(menuPortalContext);
      if (portal) {
        provideContext(menuPortalContext, null);
        portal._attach(el);
        onDispose(() => portal._attach(null));
      }
    }
  }
  onConnect(el) {
    effect(this._watchPlacement.bind(this));
  }
  _watchPlacement() {
    if (!this.el)
      return;
    const placement = this.$props.placement();
    if (placement) {
      Object.assign(this.el.style, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "max-content"
      });
      const { offset: mainOffset, alignOffset } = this.$props;
      return autoPlacement(this.el, this._getButton(), placement, {
        offsetVarName: "media-menu",
        xOffset: alignOffset(),
        yOffset: mainOffset()
      });
    } else {
      this.el.removeAttribute("style");
      this.el.style.display = "none";
    }
  }
  _getButton() {
    return this._menu._button();
  }
}
MenuItems.props = {
  placement: null,
  offset: 0,
  alignOffset: 0
};

const radioControllerContext = createContext();

class RadioGroupController extends ViewController {
  constructor() {
    super(...arguments);
    this._group = /* @__PURE__ */ new Set();
    this._value = signal("");
    this._controller = null;
    this._onChangeBind = this._onChange.bind(this);
  }
  get _values() {
    return Array.from(this._group).map((radio) => radio._value());
  }
  get value() {
    return this._value();
  }
  set value(value) {
    this._onChange(value);
  }
  onSetup() {
    provideContext(radioControllerContext, {
      add: this._addRadio.bind(this),
      remove: this._removeRadio.bind(this)
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    if (!isMenuItem)
      setAttributeIfEmpty(el, "role", "radiogroup");
    this.setAttributes({ value: this._value });
  }
  onDestroy() {
    this._group.clear();
  }
  _addRadio(radio) {
    if (this._group.has(radio))
      return;
    this._group.add(radio);
    radio._onCheck = this._onChangeBind;
    radio._check(radio._value() === this._value());
  }
  _removeRadio(radio) {
    radio._onCheck = null;
    this._group.delete(radio);
  }
  _onChange(newValue, trigger) {
    const currentValue = peek(this._value);
    if (!newValue || newValue === currentValue)
      return;
    const currentRadio = this._findRadio(currentValue), newRadio = this._findRadio(newValue);
    currentRadio?._check(false, trigger);
    newRadio?._check(true, trigger);
    this._value.set(newValue);
    this._onValueChange?.(newValue, trigger);
  }
  _findRadio(newValue) {
    for (const radio of this._group) {
      if (newValue === peek(radio._value))
        return radio;
    }
    return null;
  }
}

var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$7(target, key, result);
  return result;
};
class RadioGroup extends Component {
  constructor() {
    super();
    this._controller = new RadioGroupController();
    this._controller._onValueChange = this._onValueChange.bind(this);
  }
  get values() {
    return this._controller._values;
  }
  get value() {
    return this._controller.value;
  }
  set value(newValue) {
    this._controller.value = newValue;
  }
  onSetup() {
    if (IS_SERVER)
      this._watchValue();
    else
      effect(this._watchValue.bind(this));
  }
  _watchValue() {
    this._controller.value = this.$props.value();
  }
  _onValueChange(value, trigger) {
    const event = this.createEvent("change", { detail: value, trigger });
    this.dispatch(event);
  }
}
RadioGroup.props = {
  value: ""
};
__decorateClass$7([
  prop
], RadioGroup.prototype, "values", 1);
__decorateClass$7([
  prop
], RadioGroup.prototype, "value", 1);

var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$6(target, key, result);
  return result;
};
class Radio extends Component {
  constructor() {
    super();
    this._checked = signal(false);
    this._controller = {
      _value: this.$props.value,
      _check: this._check.bind(this),
      _onCheck: null
    };
    new FocusVisibleController();
  }
  get checked() {
    return this._checked();
  }
  onSetup() {
    this.setAttributes({
      value: this.$props.value,
      "data-checked": this._checked,
      "aria-checked": $ariaBool(this._checked)
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
    setAttributeIfEmpty(el, "role", isMenuItem ? "menuitemradio" : "radio");
    effect(this._watchValue.bind(this));
  }
  onConnect(el) {
    this._addToGroup();
    onPress(el, this._onPress.bind(this));
    onDispose(this._onDisconnect.bind(this));
  }
  _onDisconnect() {
    scoped(() => {
      const group = useContext(radioControllerContext);
      group.remove(this._controller);
    }, this.connectScope);
  }
  _addToGroup() {
    const group = useContext(radioControllerContext);
    group.add(this._controller);
  }
  _watchValue() {
    const { value } = this.$props, newValue = value();
    if (peek(this._checked)) {
      this._controller._onCheck?.(newValue);
    }
  }
  _onPress(event) {
    if (peek(this._checked))
      return;
    this._onChange(true, event);
    this._onSelect(event);
    this._controller._onCheck?.(peek(this.$props.value), event);
  }
  _check(value, trigger) {
    if (peek(this._checked) === value)
      return;
    this._onChange(value, trigger);
  }
  _onChange(value, trigger) {
    this._checked.set(value);
    this.dispatch("change", { detail: value, trigger });
  }
  _onSelect(trigger) {
    this.dispatch("select", { trigger });
  }
}
Radio.props = {
  value: ""
};
__decorateClass$6([
  prop
], Radio.prototype, "checked", 1);

var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$5(target, key, result);
  return result;
};
class ChaptersRadioGroup extends Component {
  constructor() {
    super();
    this._index = signal(0);
    this._track = signal(null);
    this._cues = signal([]);
    this._controller = new RadioGroupController();
    this._controller._onValueChange = this._onValueChange.bind(this);
  }
  get value() {
    return this._controller.value;
  }
  get disabled() {
    return !this._cues()?.length;
  }
  onSetup() {
    this._media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this._menu = useContext(menuContext);
    }
    const { thumbnails } = this.$props;
    this.setAttributes({
      "data-thumbnails": () => !!thumbnails()
    });
  }
  onAttach(el) {
    this._menu?._attachObserver({
      _onOpen: this._onOpen.bind(this)
    });
  }
  getOptions() {
    return this._cues().map((cue, i) => ({
      cue,
      value: i + "",
      label: cue.text,
      startTime: formatTime(cue.startTime, false),
      duration: formatSpokenTime(cue.endTime - cue.startTime)
    }));
  }
  _onOpen() {
    peek(() => this._watchCurrentTime());
  }
  onConnect(el) {
    effect(this._watchValue.bind(this));
    effect(this._watchCurrentTime.bind(this));
    effect(this._watchControllerDisabled.bind(this));
    effect(this._watchTrack.bind(this));
    observeActiveTextTrack(this._media.textTracks, "chapters", this._track.set);
  }
  _watchTrack() {
    const track = this._track();
    if (!track)
      return;
    const onCuesChange = this._onCuesChange.bind(this, track);
    onCuesChange();
    listenEvent(track, "add-cue", onCuesChange);
    listenEvent(track, "remove-cue", onCuesChange);
    return () => {
      this._cues.set([]);
    };
  }
  _onCuesChange(track) {
    this._cues.set([...track.cues]);
  }
  _watchValue() {
    this._controller.value = this._getValue();
  }
  _watchCurrentTime() {
    if (!this._menu?._expanded())
      return;
    const track = this._track();
    if (!track) {
      this._index.set(-1);
      return;
    }
    const { currentTime } = this._media.$state, time = currentTime(), activeCueIndex = track.cues.findIndex((cue) => isCueActive(cue, time));
    this._index.set(activeCueIndex);
    if (activeCueIndex >= 0) {
      const cue = track.cues[activeCueIndex], radio = this.el.querySelector(`[aria-checked='true']`), playedPercent = (time - cue.startTime) / (cue.endTime - cue.startTime) * 100;
      radio && setStyle(radio, "--progress", round(playedPercent, 3) + "%");
    }
  }
  _watchControllerDisabled() {
    this._menu?._disable(this.disabled);
  }
  _getValue() {
    return this._index() + "";
  }
  _onValueChange(value, trigger) {
    if (this.disabled || !trigger)
      return;
    const index = +value, cues = this._track()?.cues;
    if (isNumber(index) && cues?.[index]) {
      this._index.set(index);
      this._media.remote.seek(cues[index].startTime, trigger);
      this.dispatch("change", { detail: cues[index], trigger });
    }
  }
}
ChaptersRadioGroup.props = {
  thumbnails: ""
};
__decorateClass$5([
  prop
], ChaptersRadioGroup.prototype, "value", 1);
__decorateClass$5([
  prop
], ChaptersRadioGroup.prototype, "disabled", 1);
__decorateClass$5([
  method
], ChaptersRadioGroup.prototype, "getOptions", 1);

var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$4(target, key, result);
  return result;
};
class AudioRadioGroup extends Component {
  constructor() {
    super();
    this._controller = new RadioGroupController();
    this._controller._onValueChange = this._onValueChange.bind(this);
  }
  get value() {
    return this._controller.value;
  }
  get disabled() {
    const { audioTracks } = this._media.$state;
    return audioTracks().length === 0;
  }
  onSetup() {
    this._media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this._menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this._watchValue.bind(this));
    effect(this._watchControllerDisabled.bind(this));
    effect(this._watchHintText.bind(this));
  }
  getOptions() {
    const { audioTracks } = this._media.$state;
    return audioTracks().map((track) => ({
      track,
      label: track.label,
      value: track.label.toLowerCase()
    }));
  }
  _watchValue() {
    this._controller.value = this._getValue();
  }
  _watchHintText() {
    const { emptyLabel } = this.$props, { audioTrack } = this._media.$state, track = audioTrack();
    this._menu?._hint.set(track?.label ?? emptyLabel());
  }
  _watchControllerDisabled() {
    this._menu?._disable(this.disabled);
  }
  _getValue() {
    const { audioTrack } = this._media.$state;
    const track = audioTrack();
    return track ? track.label.toLowerCase() : "";
  }
  _onValueChange(value, trigger) {
    if (this.disabled)
      return;
    const index = this._media.audioTracks.toArray().findIndex((track) => track.label.toLowerCase() === value);
    if (index >= 0) {
      const track = this._media.audioTracks[index];
      this._media.remote.changeAudioTrack(index, trigger);
      this.dispatch("change", { detail: track, trigger });
    }
  }
}
AudioRadioGroup.props = {
  emptyLabel: "Default"
};
__decorateClass$4([
  prop
], AudioRadioGroup.prototype, "value", 1);
__decorateClass$4([
  prop
], AudioRadioGroup.prototype, "disabled", 1);
__decorateClass$4([
  method
], AudioRadioGroup.prototype, "getOptions", 1);

var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key, result);
  return result;
};
class CaptionsRadioGroup extends Component {
  constructor() {
    super();
    this._controller = new RadioGroupController();
    this._controller._onValueChange = this._onValueChange.bind(this);
  }
  get value() {
    return this._controller.value;
  }
  get disabled() {
    const { textTracks } = this._media.$state;
    return textTracks().filter(isTrackCaptionKind).length === 0;
  }
  onSetup() {
    this._media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this._menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    super.onConnect?.(el);
    effect(this._watchValue.bind(this));
    effect(this._watchControllerDisabled.bind(this));
    effect(this._watchHintText.bind(this));
  }
  getOptions() {
    const { offLabel } = this.$props, { textTracks } = this._media.$state;
    return [
      { value: "off", label: offLabel },
      ...textTracks().filter(isTrackCaptionKind).map((track) => ({
        track,
        label: track.label,
        value: this._getTrackValue(track)
      }))
    ];
  }
  _watchValue() {
    this._controller.value = this._getValue();
  }
  _watchHintText() {
    const { offLabel } = this.$props, { textTrack } = this._media.$state, track = textTrack();
    this._menu?._hint.set(
      track && isTrackCaptionKind(track) && track.mode === "showing" ? track.label : offLabel()
    );
  }
  _watchControllerDisabled() {
    this._menu?._disable(this.disabled);
  }
  _getValue() {
    const { textTrack } = this._media.$state, track = textTrack();
    return track && isTrackCaptionKind(track) && track.mode === "showing" ? this._getTrackValue(track) : "off";
  }
  _onValueChange(value, trigger) {
    if (this.disabled)
      return;
    if (value === "off") {
      const track = this._media.textTracks.selected;
      if (track) {
        const index2 = this._media.textTracks.toArray().indexOf(track);
        this._media.remote.changeTextTrackMode(index2, "disabled", trigger);
        this.dispatch("change", { detail: null, trigger });
      }
      return;
    }
    const index = this._media.textTracks.toArray().findIndex((track) => this._getTrackValue(track) === value);
    if (index >= 0) {
      const track = this._media.textTracks[index];
      this._media.remote.changeTextTrackMode(index, "showing", trigger);
      this.dispatch("change", { detail: track, trigger });
    }
  }
  _getTrackValue(track) {
    return track.id + ":" + track.kind + "-" + track.label.toLowerCase();
  }
}
CaptionsRadioGroup.props = {
  offLabel: "Off"
};
__decorateClass$3([
  prop
], CaptionsRadioGroup.prototype, "value", 1);
__decorateClass$3([
  prop
], CaptionsRadioGroup.prototype, "disabled", 1);
__decorateClass$3([
  method
], CaptionsRadioGroup.prototype, "getOptions", 1);

var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
class SpeedRadioGroup extends Component {
  constructor() {
    super();
    this._controller = new RadioGroupController();
    this._controller._onValueChange = this._onValueChange.bind(this);
  }
  get value() {
    return this._controller.value;
  }
  get disabled() {
    const { rates } = this.$props, { canSetPlaybackRate } = this._media.$state;
    return !canSetPlaybackRate() || rates().length === 0;
  }
  onSetup() {
    this._media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this._menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this._watchValue.bind(this));
    effect(this._watchHintText.bind(this));
    effect(this._watchControllerDisabled.bind(this));
  }
  getOptions() {
    const { rates, normalLabel } = this.$props;
    return rates().map((rate) => ({
      label: rate === 1 ? normalLabel : rate + "\xD7",
      value: rate + ""
    }));
  }
  _watchValue() {
    this._controller.value = this._getValue();
  }
  _watchHintText() {
    const { normalLabel } = this.$props, { playbackRate } = this._media.$state, rate = playbackRate();
    this._menu?._hint.set(rate === 1 ? normalLabel() : rate + "\xD7");
  }
  _watchControllerDisabled() {
    this._menu?._disable(this.disabled);
  }
  _getValue() {
    const { playbackRate } = this._media.$state;
    return playbackRate() + "";
  }
  _onValueChange(value, trigger) {
    if (this.disabled)
      return;
    const rate = +value;
    this._media.remote.changePlaybackRate(rate, trigger);
    this.dispatch("change", { detail: rate, trigger });
  }
}
SpeedRadioGroup.props = {
  normalLabel: "Normal",
  rates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
};
__decorateClass$2([
  prop
], SpeedRadioGroup.prototype, "value", 1);
__decorateClass$2([
  prop
], SpeedRadioGroup.prototype, "disabled", 1);
__decorateClass$2([
  method
], SpeedRadioGroup.prototype, "getOptions", 1);

var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
class QualityRadioGroup extends Component {
  constructor() {
    super();
    this._sortedQualities = computed(() => {
      const { qualities } = this._media.$state;
      return [...qualities()].sort(
        (a, b) => b.height === a.height ? b.bitrate - a.bitrate : b.height - a.height
      );
    });
    this._controller = new RadioGroupController();
    this._controller._onValueChange = this._onValueChange.bind(this);
  }
  get value() {
    return this._controller.value;
  }
  get disabled() {
    const { canSetQuality, qualities } = this._media.$state;
    return !canSetQuality() || qualities().length === 0;
  }
  onSetup() {
    this._media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this._menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this._watchValue.bind(this));
    effect(this._watchControllerDisabled.bind(this));
    effect(this._watchHintText.bind(this));
  }
  getOptions() {
    const { autoLabel, hideBitrate } = this.$props;
    return [
      { value: "auto", label: autoLabel },
      ...this._sortedQualities().map((quality) => {
        const rate = quality.bitrate >= 0 ? `${round(quality.bitrate / 1e6, 2)} Mbps` : null;
        return {
          quality,
          label: quality.height + "p",
          value: this._getQualityId(quality),
          bitrate: () => !hideBitrate() ? rate : null
        };
      })
    ];
  }
  _watchValue() {
    this._controller.value = this._getValue();
  }
  _watchHintText() {
    const { autoLabel } = this.$props, { autoQuality, quality } = this._media.$state, qualityText = quality() ? quality().height + "p" : "";
    this._menu?._hint.set(
      !autoQuality() ? qualityText : autoLabel() + (qualityText ? ` (${qualityText})` : "")
    );
  }
  _watchControllerDisabled() {
    this._menu?._disable(this.disabled);
  }
  _onValueChange(value, trigger) {
    if (this.disabled)
      return;
    if (value === "auto") {
      this._media.remote.changeQuality(-1, trigger);
      this.dispatch("change", { detail: "auto", trigger });
      return;
    }
    const { qualities } = this._media.$state, index = peek(qualities).findIndex((quality) => this._getQualityId(quality) === value);
    if (index >= 0) {
      const quality = peek(qualities)[index];
      this._media.remote.changeQuality(index, trigger);
      this.dispatch("change", { detail: quality, trigger });
    }
  }
  _getValue() {
    const { quality, autoQuality } = this._media.$state;
    if (autoQuality())
      return "auto";
    const currentQuality = quality();
    return currentQuality ? this._getQualityId(currentQuality) : "auto";
  }
  _getQualityId(quality) {
    return quality.height + "_" + quality.bitrate;
  }
}
QualityRadioGroup.props = {
  autoLabel: "Auto",
  hideBitrate: false
};
__decorateClass$1([
  prop
], QualityRadioGroup.prototype, "value", 1);
__decorateClass$1([
  prop
], QualityRadioGroup.prototype, "disabled", 1);
__decorateClass$1([
  method
], QualityRadioGroup.prototype, "getOptions", 1);

class Gesture extends Component {
  constructor() {
    super(...arguments);
    this._provider = null;
    this._presses = 0;
    this._pressTimerId = -1;
  }
  onSetup() {
    this._media = useMediaContext();
    const { event, action } = this.$props;
    this.setAttributes({
      event,
      action
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-gesture", "");
    el.style.setProperty("pointer-events", "none");
  }
  onConnect(el) {
    this._provider = this._media.player.el?.querySelector(
      "[data-media-provider]"
    );
    effect(this._attachListener.bind(this));
  }
  _attachListener() {
    let eventType = this.$props.event();
    if (!this._provider || !eventType)
      return;
    if (/^dbl/.test(eventType)) {
      eventType = eventType.split(/^dbl/)[1];
    }
    if (eventType === "pointerup" || eventType === "pointerdown") {
      const pointer = this._media.$state.pointer();
      if (pointer === "coarse") {
        eventType = eventType === "pointerup" ? "touchend" : "touchstart";
      }
    }
    listenEvent(
      this._provider,
      eventType,
      this._acceptEvent.bind(this),
      { passive: false }
    );
  }
  _acceptEvent(event) {
    if (isPointerEvent(event) && (event.button !== 0 || this._media.activeMenu) || isTouchEvent(event) && this._media.activeMenu || isTouchPinchEvent(event) || !this._inBounds(event)) {
      return;
    }
    event.MEDIA_GESTURE = true;
    event.preventDefault();
    const eventType = peek(this.$props.event), isDblEvent = eventType?.startsWith("dbl");
    if (!isDblEvent) {
      if (this._presses === 0) {
        setTimeout(() => {
          if (this._presses === 1)
            this._handleEvent(event);
        }, 250);
      }
    } else if (this._presses === 1) {
      queueMicrotask(() => this._handleEvent(event));
      clearTimeout(this._pressTimerId);
      this._presses = 0;
      return;
    }
    if (this._presses === 0) {
      this._pressTimerId = window.setTimeout(() => {
        this._presses = 0;
      }, 275);
    }
    this._presses++;
  }
  _handleEvent(event) {
    this.el.setAttribute("data-triggered", "");
    requestAnimationFrame(() => {
      if (this._isTopLayer()) {
        this._performAction(peek(this.$props.action), event);
      }
      requestAnimationFrame(() => {
        this.el.removeAttribute("data-triggered");
      });
    });
  }
  /** Validate event occurred in gesture bounds. */
  _inBounds(event) {
    if (!this.el)
      return false;
    if (isPointerEvent(event) || isMouseEvent(event) || isTouchEvent(event)) {
      const touch = isTouchEvent(event) ? event.changedTouches[0] ?? event.touches[0] : void 0;
      const clientX = touch?.clientX ?? event.clientX;
      const clientY = touch?.clientY ?? event.clientY;
      const rect = this.el.getBoundingClientRect();
      const inBounds = clientY >= rect.top && clientY <= rect.bottom && clientX >= rect.left && clientX <= rect.right;
      return event.type.includes("leave") ? !inBounds : inBounds;
    }
    return true;
  }
  /** Validate gesture has the highest z-index in this triggered group. */
  _isTopLayer() {
    const gestures = this._media.player.el.querySelectorAll(
      "[data-media-gesture][data-triggered]"
    );
    return Array.from(gestures).sort(
      (a, b) => +getComputedStyle(b).zIndex - +getComputedStyle(a).zIndex
    )[0] === this.el;
  }
  _performAction(action, trigger) {
    if (!action)
      return;
    const willTriggerEvent = new DOMEvent("will-trigger", {
      detail: action,
      cancelable: true,
      trigger
    });
    this.dispatchEvent(willTriggerEvent);
    if (willTriggerEvent.defaultPrevented)
      return;
    const [method, value] = action.replace(/:([a-z])/, "-$1").split(":");
    if (action.includes(":fullscreen")) {
      this._media.remote.toggleFullscreen("prefer-media", trigger);
    } else if (action.includes("seek:")) {
      this._media.remote.seek(peek(this._media.$state.currentTime) + (+value || 0), trigger);
    } else {
      this._media.remote[kebabToCamelCase(method)](trigger);
    }
    this.dispatch("trigger", {
      detail: action,
      trigger
    });
  }
}
Gesture.props = {
  event: void 0,
  action: void 0
};

class CaptionsTextRenderer {
  constructor(_renderer) {
    this._renderer = _renderer;
    this.priority = 10;
    this._track = null;
    this._disposal = createDisposalBin();
  }
  attach() {
  }
  canRender() {
    return true;
  }
  detach() {
    this._disposal.empty();
    this._renderer.reset();
    this._track = null;
  }
  changeTrack(track) {
    if (!track || this._track === track)
      return;
    this._disposal.empty();
    if (track.readyState < 2) {
      this._renderer.reset();
      this._disposal.add(
        listenEvent(track, "load", () => this._changeTrack(track), { once: true })
      );
    } else {
      this._changeTrack(track);
    }
    this._disposal.add(
      listenEvent(track, "add-cue", (event) => {
        this._renderer.addCue(event.detail);
      }),
      listenEvent(track, "remove-cue", (event) => {
        this._renderer.removeCue(event.detail);
      })
    );
    this._track = track;
  }
  _changeTrack(track) {
    this._renderer.changeTrack({
      cues: [...track.cues],
      regions: [...track.regions]
    });
  }
}

class Captions extends Component {
  onSetup() {
    this._media = useMediaContext();
    this.setAttributes({
      "aria-hidden": $ariaBool(this._isHidden.bind(this))
    });
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
  }
  onConnect(el) {
    if (this._renderer) {
      effect(this._watchViewType.bind(this));
      return;
    }
    import('media-captions').then((lib) => {
      if (!this.connectScope)
        return;
      scoped(() => {
        this._lib = lib;
        const { CaptionsRenderer } = this._lib;
        this._renderer = new CaptionsRenderer(el);
        this._textRenderer = new CaptionsTextRenderer(this._renderer);
        effect(this._watchViewType.bind(this));
      }, this.connectScope);
    });
  }
  onDestroy() {
    if (this._textRenderer) {
      this._textRenderer.detach();
      this._media.textRenderers.remove(this._textRenderer);
    }
    this._renderer?.destroy();
  }
  _isHidden() {
    const { textTrack } = this._media.$state, track = textTrack();
    return this._media.$iosControls() || !track || !isTrackCaptionKind(track);
  }
  _watchViewType() {
    const { viewType } = this._media.$state;
    if (viewType() === "audio") {
      return this._setupAudioView();
    } else {
      return this._setupVideoView();
    }
  }
  _setupAudioView() {
    effect(this._onTrackChange.bind(this));
    return () => {
      this.el.textContent = "";
    };
  }
  _onTrackChange() {
    if (this._isHidden())
      return;
    const { textTrack } = this._media.$state;
    this._onCueChange();
    listenEvent(textTrack(), "cue-change", this._onCueChange.bind(this));
    effect(this._onUpdateTimedNodes.bind(this));
  }
  _onCueChange() {
    this.el.textContent = "";
    const { currentTime, textTrack } = this._media.$state, time = peek(currentTime), activeCues = peek(textTrack).activeCues;
    const { renderVTTCueString } = this._lib;
    for (const cue of activeCues) {
      const cueEl = document.createElement("div");
      cueEl.setAttribute("data-part", "cue");
      cueEl.innerHTML = renderVTTCueString(cue, time);
      this.el.append(cueEl);
    }
  }
  _onUpdateTimedNodes() {
    const { currentTime } = this._media.$state, { updateTimedVTTCueNodes } = this._lib;
    updateTimedVTTCueNodes(this.el, currentTime());
  }
  _setupVideoView() {
    effect(this._watchTextDirection.bind(this));
    effect(this._watchMediaTime.bind(this));
    this._media.textRenderers.add(this._textRenderer);
    return () => {
      this.el.textContent = "";
      this._textRenderer.detach();
      this._media.textRenderers.remove(this._textRenderer);
    };
  }
  _watchTextDirection() {
    this._renderer.dir = this.$props.textDir();
  }
  _watchMediaTime() {
    if (this._isHidden())
      return;
    const { currentTime } = this._media.$state;
    this._renderer.currentTime = currentTime();
  }
}
Captions.props = {
  textDir: "ltr"
};

class Poster extends Component {
  onSetup() {
    this._media = useMediaContext();
    this._watchImgSrc();
    this._watchImgAlt();
    this._watchHidden();
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
    effect(this._watchImg.bind(this));
    effect(this._watchImgSrc.bind(this));
    effect(this._watchImgAlt.bind(this));
    effect(this._watchHidden.bind(this));
    const { started } = this._media.$state;
    this.setAttributes({
      "data-visible": () => !started(),
      "data-loading": this._isLoading.bind(this),
      "data-error": this._hasError.bind(this),
      "data-hidden": this.$state.hidden
    });
  }
  onConnect(el) {
    const { canLoad, poster } = this._media.$state;
    window.requestAnimationFrame(() => {
      if (!canLoad())
        preconnect(poster());
    });
    effect(this._onLoadStart.bind(this));
  }
  _hasError() {
    const { error } = this.$state;
    return !isNull(error());
  }
  _watchHidden() {
    const { src } = this.$props, { $iosControls } = this._media, { poster } = this._media.$state;
    this.el && setAttribute(this.el, "display", $iosControls() ? "none" : null);
    this.$state.hidden.set(this._hasError() || !(src() || poster()) || $iosControls());
  }
  _isLoading() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  _watchImg() {
    const img = this.$state.img();
    if (!img)
      return;
    listenEvent(img, "load", this._onLoad.bind(this));
    listenEvent(img, "error", this._onError.bind(this));
  }
  _watchImgSrc() {
    const { canLoad, poster: defaultPoster } = this._media.$state;
    const src = this.$props.src(), poster = src || defaultPoster();
    if (src && defaultPoster() !== src) {
      this._media.$state.providedPoster.set(src);
    }
    this.$state.src.set(canLoad() && poster.length ? poster : null);
  }
  _watchImgAlt() {
    const { src, alt } = this.$state;
    alt.set(src() ? this.$props.alt() : null);
  }
  _onLoadStart() {
    const { loading, error } = this.$state, { canLoad, poster } = this._media.$state;
    loading.set(canLoad() && !!poster());
    error.set(null);
  }
  _onLoad() {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(null);
  }
  _onError(event) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event);
  }
}
Poster.props = {
  src: void 0,
  alt: void 0
};
Poster.state = new State({
  img: null,
  src: null,
  alt: null,
  loading: true,
  error: null,
  hidden: false
});

class Time extends Component {
  onSetup() {
    this._media = useMediaContext();
    this._watchTime();
    const { type, remainder } = this.$props;
    this.setAttributes({
      "data-type": type,
      "data-remainder": remainder
    });
  }
  onAttach(el) {
    effect(this._watchTime.bind(this));
  }
  _watchTime() {
    const { type, remainder, padHours, padMinutes, showHours } = this.$props, seconds = this._getSeconds(type()), duration = this._media.$state.duration();
    if (!Number.isFinite(seconds + duration)) {
      this.$state.timeText.set("LIVE");
      return;
    }
    const time = remainder() ? Math.max(0, duration - seconds) : seconds, formattedTime = formatTime(time, padHours(), padMinutes(), showHours());
    this.$state.timeText.set(formattedTime);
  }
  _getSeconds(type) {
    const { bufferedEnd, duration, currentTime } = this._media.$state;
    switch (type) {
      case "buffered":
        return bufferedEnd();
      case "duration":
        return duration();
      default:
        return currentTime();
    }
  }
}
Time.props = {
  type: "current",
  showHours: false,
  padHours: null,
  padMinutes: null,
  remainder: false
};
Time.state = new State({
  timeText: ""
});

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getProtoOf = Object.getPrototypeOf;
var __reflectGet = Reflect.get;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __superGet = (cls, obj, key) => __reflectGet(__getProtoOf(cls), key, obj);
class DefaultLayout extends Component {
  constructor() {
    super(...arguments);
    this.menuContainer = null;
  }
  get isMatch() {
    return this._whenQueryList.matches;
  }
  get isSmallLayout() {
    return this._whenSmQueryList.matches;
  }
  onSetup() {
    const { when, smallWhen, thumbnails, translations, menuGroup, noModal } = this.$props;
    this._whenQueryList = PlayerQueryList.create(when);
    this._whenSmQueryList = PlayerQueryList.create(smallWhen);
    this.setAttributes({
      "data-match": this._whenQueryList.$matches,
      "data-size": () => this._whenSmQueryList.matches ? "sm" : null
    });
    const self = this;
    provideContext(defaultLayoutContext, {
      smQueryList: this._whenSmQueryList,
      thumbnails,
      translations,
      menuGroup,
      noModal,
      get menuContainer() {
        return self.menuContainer;
      }
    });
  }
}
DefaultLayout.props = {
  when: "",
  smallWhen: "",
  thumbnails: "",
  customIcons: false,
  translations: null,
  menuGroup: "bottom",
  noModal: false
};
__decorateClass([
  prop
], DefaultLayout.prototype, "menuContainer", 2);
__decorateClass([
  prop
], DefaultLayout.prototype, "isMatch", 1);
__decorateClass([
  prop
], DefaultLayout.prototype, "isSmallLayout", 1);
const _DefaultAudioLayout = class _DefaultAudioLayout extends DefaultLayout {
};
_DefaultAudioLayout.props = {
  ...__superGet(_DefaultAudioLayout, _DefaultAudioLayout, "props"),
  when: "(view-type: audio)",
  smallWhen: "(width < 576)"
};
let DefaultAudioLayout = _DefaultAudioLayout;
const _DefaultVideoLayout = class _DefaultVideoLayout extends DefaultLayout {
};
_DefaultVideoLayout.props = {
  ...__superGet(_DefaultVideoLayout, _DefaultVideoLayout, "props"),
  when: "(view-type: video)",
  smallWhen: "(width < 576) or (height < 380)"
};
let DefaultVideoLayout = _DefaultVideoLayout;
function getDefaultLayoutLang(translations, word) {
  return translations()?.[word] ?? word;
}
const defaultLayoutContext = createContext();
function useDefaultLayoutContext() {
  return useContext(defaultLayoutContext);
}

{
  console.warn("[vidstack]: dev mode!");
}

class MediaPlayerInstance extends MediaPlayer {
}
class MediaProviderInstance extends MediaProvider {
}
class ControlsInstance extends Controls {
}
class ControlsGroupInstance extends ControlsGroup {
}
class ToggleButtonInstance extends ToggleButton {
}
class CaptionButtonInstance extends CaptionButton {
}
class FullscreenButtonInstance extends FullscreenButton {
}
class LiveButtonInstance extends LiveButton {
}
class MuteButtonInstance extends MuteButton {
}
class PIPButtonInstance extends PIPButton {
}
class PlayButtonInstance extends PlayButton {
}
class SeekButtonInstance extends SeekButton {
}
class TooltipInstance extends Tooltip {
}
class TooltipTriggerInstance extends TooltipTrigger {
}
class TooltipContentInstance extends TooltipContent {
}
class SliderInstance extends Slider {
}
class TimeSliderInstance extends TimeSlider {
}
class VolumeSliderInstance extends VolumeSlider {
}
class SliderThumbnailInstance extends SliderThumbnail {
}
class SliderValueInstance extends SliderValue {
}
class SliderVideoInstance extends SliderVideo {
}
class SliderPreviewInstance extends SliderPreview {
}
class SliderChaptersInstance extends SliderChapters {
}
class MenuInstance extends Menu {
}
class MenuButtonInstance extends MenuButton {
}
class MenuItemsInstance extends MenuItems {
}
class MenuItemInstance extends MenuItem {
}
class MenuPortalInstance extends MenuPortal {
}
class RadioGroupInstance extends RadioGroup {
}
class RadioInstance extends Radio {
}
class CaptionsInstance extends Captions {
}
class GestureInstance extends Gesture {
}
class PosterInstance extends Poster {
}
class ThumbnailInstance extends Thumbnail {
}
class TimeInstance extends Time {
}

const Slot = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React.Children.count(newElement) > 1)
          return React.Children.only(null);
        return React.isValidElement(newElement) ? newElement.props.children : null;
      } else {
        return child;
      }
    });
    return /* @__PURE__ */ React.createElement(SlotClone, { ...slotProps, ref: forwardedRef }, React.isValidElement(newElement) ? React.cloneElement(newElement, void 0, newChildren) : null);
  }
  return /* @__PURE__ */ React.createElement(SlotClone, { ...slotProps, ref: forwardedRef }, children);
});
Slot.displayName = "Slot";
const SlotClone = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...mergeProps(slotProps, children.props),
      ref: forwardedRef ? composeRefs(forwardedRef, children.ref) : children.ref
    });
  }
  return React.Children.count(children) > 1 ? React.Children.only(null) : null;
});
SlotClone.displayName = "SlotClone";
const Slottable = ({ children }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
};
function isSlottable(child) {
  return React.isValidElement(child) && child.type === Slottable;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}

const NODES = ["button", "div", "span", "img", "video", "audio"];
const Primitive = NODES.reduce((primitives, node) => {
  const Node = React.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    return /* @__PURE__ */ React.createElement(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitives, [node]: Node };
}, {});

function isRemotionProvider(provider) {
  return provider?.$$PROVIDER_TYPE === "REMOTION";
}
function isRemotionSource(src) {
  return src?.type === "video/remotion";
}

const mediaStateRecord = MediaPlayerInstance.state.record, initialMediaStore = Object.keys(mediaStateRecord).reduce(
  (store, prop) => ({
    ...store,
    [prop]() {
      return mediaStateRecord[prop];
    }
  }),
  {}
);
function useMediaState(prop, ref) {
  const $state = useStateContext(mediaState);
  if (!$state && !ref) {
    console.warn(
      `[vidstack] \`useMediaState\` requires \`RefObject<MediaPlayerInstance>\` argument if called outside the \`<MediaPlayer>\` component`
    );
  }
  return useSignal((ref?.current?.$state || $state || initialMediaStore)[prop]);
}
function useMediaStore(ref) {
  const $state = useStateContext(mediaState);
  if (!$state && !ref) {
    console.warn(
      `[vidstack] \`useMediaStore\` requires \`RefObject<MediaPlayerInstance>\` argument if called outside the \`<MediaPlayer>\` component`
    );
  }
  return useSignalRecord(ref?.current ? ref.current.$state : $state || initialMediaStore);
}

export { parseJSONCaptionsFile as $, ThumbnailsLoader as A, updateSliderPreviewPlacement as B, Logger as C, formatTime as D, formatSpokenTime as E, canChangeVolume as F, canOrientScreen as G, canRotateScreen as H, IS_SERVER as I, List as J, FullscreenController as K, ListSymbol as L, MediaPlayerInstance as M, canFullscreen as N, ScreenOrientationController as O, Primitive as P, QualitySymbol as Q, MediaControls as R, SliderInstance as S, TimeRange as T, MEDIA_KEY_SHORTCUTS as U, ARIAKeyShortcuts as V, softResetMediaState as W, getTimeRangesStart as X, getTimeRangesEnd as Y, TextRenderers as Z, isTrackCaptionKind as _, appendParamsToURL as a, SliderVideoInstance as a$, TextTrackList as a0, AudioTrackList as a1, isCueActive as a2, observeActiveTextTrack as a3, PlayerQueryList as a4, VideoQualityList as a5, AudioProviderLoader as a6, VideoProviderLoader as a7, YouTubeProviderLoader as a8, HLSProviderLoader as a9, MenuButton as aA, MenuItem as aB, MenuPortal as aC, menuPortalContext as aD, MenuItems as aE, Radio as aF, ChaptersRadioGroup as aG, AudioRadioGroup as aH, CaptionsRadioGroup as aI, SpeedRadioGroup as aJ, QualityRadioGroup as aK, ControlsInstance as aL, ControlsGroupInstance as aM, CaptionButtonInstance as aN, FullscreenButtonInstance as aO, LiveButtonInstance as aP, MuteButtonInstance as aQ, PIPButtonInstance as aR, PlayButtonInstance as aS, SeekButtonInstance as aT, TooltipInstance as aU, TooltipTriggerInstance as aV, TooltipContentInstance as aW, TimeSliderInstance as aX, VolumeSliderInstance as aY, SliderThumbnailInstance as aZ, SliderValueInstance as a_, VimeoProviderLoader as aa, isAudioProvider as ab, isVideoProvider as ac, isHLSProvider as ad, isYouTubeProvider as ae, isVimeoProvider as af, isHTMLAudioElement as ag, isHTMLVideoElement as ah, isHTMLMediaElement as ai, isHTMLIFrameElement as aj, sliderContext as ak, DefaultLayout as al, DefaultAudioLayout as am, DefaultVideoLayout as an, defaultLayoutContext as ao, getDefaultLayoutLang as ap, useDefaultLayoutContext as aq, ControlsGroup as ar, TooltipTrigger as as, TooltipContent as at, SliderController as au, SliderThumbnail as av, SliderVideo as aw, SliderValue as ax, SliderPreview as ay, SliderChapters as az, TextTrack as b, SliderPreviewInstance as b0, SliderChaptersInstance as b1, MenuInstance as b2, MenuButtonInstance as b3, MenuItemsInstance as b4, MenuItemInstance as b5, MenuPortalInstance as b6, RadioGroupInstance as b7, RadioInstance as b8, CaptionsInstance as b9, GestureInstance as ba, ThumbnailInstance as bb, TimeInstance as bc, useMediaStore as bd, coerceToError as c, TextTrackSymbol as d, IS_CHROME as e, IS_SAFARI as f, isHLSSrc as g, getNumberOfDecimalPlaces as h, isHLSSupported as i, isMediaStream as j, isRemotionSource as k, loadScript as l, canUsePictureInPicture as m, canUseVideoPresentation as n, canPlayHLSNatively as o, preconnect as p, isRemotionProvider as q, MediaProviderInstance as r, sliderState as s, mediaState as t, useMediaState as u, mediaContext as v, ToggleButtonInstance as w, PosterInstance as x, MediaRemoteControl as y, findActiveCue as z };
