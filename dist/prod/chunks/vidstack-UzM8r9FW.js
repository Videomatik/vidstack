"use client"

import * as React from 'react';
import { M as EventsTarget, D as DOMEvent, V as ViewController, l as listenEvent, q as onDispose, n as isFunction, i as isUndefined, N as waitTimeout, s as signal, p as peek, k as isArray, S as State, w as tick, O as createContext, P as useContext, Q as isNull, f as isString, j as deferredPromise, c as isNumber, R as Component, e as effect, K as isKeyboardClick, T as isTouchEvent, x as scoped, U as setStyle, t as setAttribute, W as getScope, L as isKeyboardEvent, X as computed, Y as root, Z as unwrap, _ as kebabToCamelCase, m as camelToKebabCase, $ as waitIdlePeriod, a0 as provideContext, y as animationFrameThrottle, a1 as uppercaseFirstChar, a2 as prop, a3 as method, z as noop, a4 as ariaBool$1, a5 as isWriteSignal, a6 as hasProvidedContext, a7 as useState, d as createScope, J as isPointerEvent, a8 as isMouseEvent, v as createDisposalBin, C as composeRefs, u as useStateContext, a as useSignal, b as useSignalRecord } from './vidstack-8AXyyPGc.js';

var _a$2;
const GROUPED_LOG = Symbol(0);
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

const ADD = Symbol(0), REMOVE = Symbol(0), RESET = Symbol(0), SELECT = Symbol(0), READONLY = Symbol(0), SET_READONLY = Symbol(0), ON_RESET = Symbol(0), ON_REMOVE = Symbol(0), ON_USER_SELECT = Symbol(0);
const ListSymbol = {
  pa: ADD,
  Zb: REMOVE,
  I: RESET,
  qa: SELECT,
  _b: READONLY,
  Nc: SET_READONLY,
  oe: ON_RESET,
  pe: ON_REMOVE,
  qe: ON_USER_SELECT
};

var _a$1;
class List extends EventsTarget {
  constructor() {
    super(...arguments);
    this.s = [];
    /* @internal */
    this[_a$1] = false;
  }
  get length() {
    return this.s.length;
  }
  get readonly() {
    return this[ListSymbol._b];
  }
  /**
   * Transform list to an array.
   */
  toArray() {
    return [...this.s];
  }
  [(_a$1 = ListSymbol._b, Symbol.iterator)]() {
    return this.s.values();
  }
  /* @internal */
  [ListSymbol.pa](item, trigger) {
    const index = this.s.length;
    if (!("" + index in this)) {
      Object.defineProperty(this, index, {
        get() {
          return this.s[index];
        }
      });
    }
    if (this.s.includes(item))
      return;
    this.s.push(item);
    this.dispatchEvent(new DOMEvent("add", { detail: item, trigger }));
  }
  /* @internal */
  [ListSymbol.Zb](item, trigger) {
    const index = this.s.indexOf(item);
    if (index >= 0) {
      this[ListSymbol.pe]?.(item, trigger);
      this.s.splice(index, 1);
      this.dispatchEvent(new DOMEvent("remove", { detail: item, trigger }));
    }
  }
  /* @internal */
  [ListSymbol.I](trigger) {
    for (const item of [...this.s])
      this[ListSymbol.Zb](item, trigger);
    this.s = [];
    this[ListSymbol.Nc](false, trigger);
    this[ListSymbol.oe]?.();
  }
  /* @internal */
  [ListSymbol.Nc](readonly, trigger) {
    if (this[ListSymbol._b] === readonly)
      return;
    this[ListSymbol._b] = readonly;
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
var ms = [
  "msFullscreenEnabled",
  "msFullscreenElement",
  "msRequestFullscreen",
  "msExitFullscreen",
  "MSFullscreenChange",
  "MSFullscreenError",
  "-ms-fullscreen"
];
var document$1 = typeof window !== "undefined" && typeof window.document !== "undefined" ? window.document : {};
var vendor = "fullscreenEnabled" in document$1 && Object.keys(key) || webkit[0] in document$1 && webkit || moz[0] in document$1 && moz || ms[0] in document$1 && ms || [];
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
    this.vb = false;
    this.Oc = false;
  }
  get active() {
    return this.Oc;
  }
  get supported() {
    return CAN_FULLSCREEN;
  }
  onConnect() {
    listenEvent(fscreen$1, "fullscreenchange", this.Pc.bind(this));
    listenEvent(fscreen$1, "fullscreenerror", this.$b.bind(this));
    onDispose(this.za.bind(this));
  }
  async za() {
    if (CAN_FULLSCREEN)
      await this.exit();
  }
  Pc(event) {
    const active = isFullscreen(this.el);
    if (active === this.Oc)
      return;
    if (!active)
      this.vb = false;
    this.Oc = active;
    this.dispatch("fullscreen-change", { detail: active, trigger: event });
  }
  $b(event) {
    if (!this.vb)
      return;
    this.dispatch("fullscreen-error", { detail: null, trigger: event });
    this.vb = false;
  }
  async enter() {
    try {
      this.vb = true;
      if (!this.el || isFullscreen(this.el))
        return;
      assertFullscreenAPI();
      return fscreen$1.requestFullscreen(this.el);
    } catch (error) {
      this.vb = false;
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
    "[vidstack] no fullscreen API"
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
    this.wb = signal(this.re());
    this.Sa = signal(false);
  }
  /**
   * The current screen orientation type.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get type() {
    return this.wb();
  }
  /**
   * Whether the screen orientation is currently locked.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get locked() {
    return this.Sa();
  }
  /**
   * Whether the viewport is in a portrait orientation.
   *
   * @signal
   */
  get portrait() {
    return this.wb().startsWith("portrait");
  }
  /**
   * Whether the viewport is in a landscape orientation.
   *
   * @signal
   */
  get landscape() {
    return this.wb().startsWith("landscape");
  }
  /**
   * Whether the native Screen Orientation API is available.
   */
  get supported() {
    return _ScreenOrientationController.supported;
  }
  onConnect() {
    if (this.supported) {
      listenEvent(screen.orientation, "change", this.se.bind(this));
    } else {
      const query = window.matchMedia("(orientation: landscape)");
      query.onchange = this.se.bind(this);
      onDispose(() => query.onchange = null);
    }
    onDispose(this.za.bind(this));
  }
  async za() {
    if (this.supported && this.Sa())
      await this.unlock();
  }
  se(event) {
    this.wb.set(this.re());
    this.dispatch("orientation-change", {
      detail: {
        orientation: peek(this.wb),
        lock: this.ac
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
    if (peek(this.Sa) || this.ac === lockType)
      return;
    this.te();
    await screen.orientation.lock(lockType);
    this.Sa.set(true);
    this.ac = lockType;
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
    if (!peek(this.Sa))
      return;
    this.te();
    this.ac = void 0;
    await screen.orientation.unlock();
    this.Sa.set(false);
  }
  te() {
    if (this.supported)
      return;
    throw Error(
      "[vidstack] no orientation API"
    );
  }
  re() {
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
    return this.aa.length;
  }
  constructor(start, end) {
    if (isArray(start)) {
      this.aa = start;
    } else if (!isUndefined(start) && !isUndefined(end)) {
      this.aa = [[start, end]];
    } else {
      this.aa = [];
    }
  }
  start(index) {
    return this.aa[index][0] ?? Infinity;
  }
  end(index) {
    return this.aa[index][1] ?? Infinity;
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
  logLevel: "silent",
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

const CROSSORIGIN = Symbol(0), READY_STATE = Symbol(0), UPDATE_ACTIVE_CUES = Symbol(0), CAN_LOAD = Symbol(0), ON_MODE_CHANGE = Symbol(0), NATIVE = Symbol(0), NATIVE_HLS = Symbol(0);
const TextTrackSymbol = {
  Ta: CROSSORIGIN,
  N: READY_STATE,
  Ua: UPDATE_ACTIVE_CUES,
  Q: CAN_LOAD,
  Va: ON_MODE_CHANGE,
  U: NATIVE,
  ue: NATIVE_HLS
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
    this.Q = false;
    this.Wa = 0;
    this.J = "disabled";
    this.ve = {};
    this.bc = [];
    this.K = [];
    this.Xa = [];
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
          this.we(init.content, VTTCue, VTTRegion);
        } else {
          parseText(init.content, { type: init.type }).then(({ cues, regions }) => {
            this.K = cues;
            this.bc = regions;
            this.N();
          });
        }
      });
    } else if (!init.src)
      this[TextTrackSymbol.N] = 2;
  }
  static createId(track) {
    return `id::${track.type}-${track.kind}-${track.src ?? track.label}`;
  }
  get metadata() {
    return this.ve;
  }
  get regions() {
    return this.bc;
  }
  get cues() {
    return this.K;
  }
  get activeCues() {
    return this.Xa;
  }
  /**
   * - 0: Not Loading
   * - 1: Loading
   * - 2: Ready
   * - 3: Error
   */
  get readyState() {
    return this[TextTrackSymbol.N];
  }
  get mode() {
    return this.J;
  }
  set mode(mode) {
    this.setMode(mode);
  }
  addCue(cue, trigger) {
    let i = 0, length = this.K.length;
    for (i = 0; i < length; i++)
      if (cue.endTime <= this.K[i].startTime)
        break;
    if (i === length)
      this.K.push(cue);
    else
      this.K.splice(i, 0, cue);
    if (trigger?.type !== "cuechange") {
      this[TextTrackSymbol.U]?.track.addCue(cue);
    }
    this.dispatchEvent(new DOMEvent("add-cue", { detail: cue, trigger }));
    if (isCueActive(cue, this.Wa)) {
      this[TextTrackSymbol.Ua](this.Wa, trigger);
    }
  }
  removeCue(cue, trigger) {
    const index = this.K.indexOf(cue);
    if (index >= 0) {
      const isActive = this.Xa.includes(cue);
      this.K.splice(index, 1);
      this[TextTrackSymbol.U]?.track.removeCue(cue);
      this.dispatchEvent(new DOMEvent("remove-cue", { detail: cue, trigger }));
      if (isActive) {
        this[TextTrackSymbol.Ua](this.Wa, trigger);
      }
    }
  }
  setMode(mode, trigger) {
    if (this.J === mode)
      return;
    this.J = mode;
    if (mode === "disabled") {
      this.Xa = [];
      this.xe();
    } else if (this.readyState === 2) {
      this[TextTrackSymbol.Ua](this.Wa, trigger);
    } else {
      this.ye();
    }
    this.dispatchEvent(new DOMEvent("mode-change", { detail: this, trigger }));
    this[TextTrackSymbol.Va]?.();
  }
  /* @internal */
  [(_a = TextTrackSymbol.N, _b = TextTrackSymbol.Va, _c = TextTrackSymbol.U, TextTrackSymbol.Ua)](currentTime, trigger) {
    this.Wa = currentTime;
    if (this.mode === "disabled" || !this.K.length)
      return;
    const activeCues = [];
    for (let i = 0, length = this.K.length; i < length; i++) {
      const cue = this.K[i];
      if (isCueActive(cue, currentTime))
        activeCues.push(cue);
    }
    let changed = activeCues.length !== this.Xa.length;
    if (!changed) {
      for (let i = 0; i < activeCues.length; i++) {
        if (!this.Xa.includes(activeCues[i])) {
          changed = true;
          break;
        }
      }
    }
    this.Xa = activeCues;
    if (changed)
      this.xe(trigger);
  }
  /* @internal */
  [TextTrackSymbol.Q]() {
    this.Q = true;
    if (this.J !== "disabled")
      this.ye();
  }
  async ye() {
    if (!this.Q || !this.src || this[TextTrackSymbol.N] > 0)
      return;
    this[TextTrackSymbol.N] = 1;
    this.dispatchEvent(new DOMEvent("load-start"));
    try {
      const { parseResponse, VTTCue, VTTRegion } = await import('media-captions'), crossorigin = this[TextTrackSymbol.Ta]?.();
      const response = fetch(this.src, {
        headers: this.type === "json" ? { "Content-Type": "application/json" } : void 0,
        credentials: getRequestCredentials(crossorigin)
      });
      if (this.type === "json") {
        this.we(await (await response).text(), VTTCue, VTTRegion);
      } else {
        const { errors, metadata, regions, cues } = await parseResponse(response, {
          type: this.type,
          encoding: this.encoding
        });
        if (errors[0]?.code === 0) {
          throw errors[0];
        } else {
          this.ve = metadata;
          this.bc = regions;
          this.K = cues;
        }
      }
      this.N();
    } catch (error) {
      this.ze(error);
    }
  }
  N() {
    this[TextTrackSymbol.N] = 2;
    if (!this.src || this.type !== "vtt") {
      const nativeTrack = this[TextTrackSymbol.U]?.track;
      if (nativeTrack)
        for (const cue of this.K)
          nativeTrack.addCue(cue);
    }
    const loadEvent = new DOMEvent("load");
    this[TextTrackSymbol.Ua](this.Wa, loadEvent);
    this.dispatchEvent(loadEvent);
  }
  ze(error) {
    this[TextTrackSymbol.N] = 3;
    this.dispatchEvent(new DOMEvent("error", { detail: error }));
  }
  we(json, VTTCue, VTTRegion) {
    try {
      const { regions, cues } = parseJSONCaptionsFile(json, VTTCue, VTTRegion);
      this.bc = regions;
      this.K = cues;
    } catch (error) {
      this.ze(error);
    }
  }
  xe(trigger) {
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
  constructor(_logger = void 0) {
    this.ub = _logger;
    this.B = null;
    this.ba = null;
    this.Qc = -1;
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
    this.B = target;
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
    if (this.ba)
      return this.ba;
    (target ?? this.B)?.dispatchEvent(
      new DOMEvent("find-media-player", {
        detail: (player) => void (this.ba = player),
        bubbles: true,
        composed: true
      })
    );
    return this.ba;
  }
  /**
   * Set the current `<media-player>` element so the remote can support toggle methods such as
   * `togglePaused` as they rely on the current media state.
   */
  setPlayer(player) {
    this.ba = player;
  }
  /**
   * Dispatch a request to start the media loading process. This will only work if the media
   * player has been initialized with a custom loading strategy `<media-player load="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#loading-strategies}
   */
  startLoading(trigger) {
    this.t("media-start-loading", trigger);
  }
  /**
   * Dispatch a request to begin/resume media playback.
   */
  play(trigger) {
    this.t("media-play-request", trigger);
  }
  /**
   * Dispatch a request to pause media playback.
   */
  pause(trigger) {
    this.t("media-pause-request", trigger);
  }
  /**
   * Dispatch a request to set the media volume to mute (0).
   */
  mute(trigger) {
    this.t("media-mute-request", trigger);
  }
  /**
   * Dispatch a request to unmute the media volume and set it back to it's previous state.
   */
  unmute(trigger) {
    this.t("media-unmute-request", trigger);
  }
  /**
   * Dispatch a request to enter fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/fullscreen#remote-control}
   */
  enterFullscreen(target, trigger) {
    this.t("media-enter-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to exit fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/fullscreen#remote-control}
   */
  exitFullscreen(target, trigger) {
    this.t("media-exit-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to lock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/screen-orientation#remote-control}
   */
  lockScreenOrientation(lockType, trigger) {
    this.t("media-orientation-lock-request", trigger, lockType);
  }
  /**
   * Dispatch a request to unlock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/screen-orientation#remote-control}
   */
  unlockScreenOrientation(trigger) {
    this.t("media-orientation-unlock-request", trigger);
  }
  /**
   * Dispatch a request to enter picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture#remote-control}
   */
  enterPictureInPicture(trigger) {
    this.t("media-enter-pip-request", trigger);
  }
  /**
   * Dispatch a request to exit picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture#remote-control}
   */
  exitPictureInPicture(trigger) {
    this.t("media-exit-pip-request", trigger);
  }
  /**
   * Notify the media player that a seeking process is happening and to seek to the given `time`.
   */
  seeking(time, trigger) {
    this.t("media-seeking-request", trigger, time);
  }
  /**
   * Notify the media player that a seeking operation has completed and to seek to the given `time`.
   * This is generally called after a series of `remote.seeking()` calls.
   */
  seek(time, trigger) {
    this.t("media-seek-request", trigger, time);
  }
  seekToLiveEdge(trigger) {
    this.t("media-live-edge-request", trigger);
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
    this.t("media-volume-change-request", trigger, Math.max(0, Math.min(1, volume)));
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
    this.t("media-audio-track-change-request", trigger, index);
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
    this.t("media-quality-change-request", trigger, index);
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
    this.t("media-text-track-change-request", trigger, {
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
    this.t("media-rate-change-request", trigger, rate);
  }
  /**
   * Dispatch a request to resume idle tracking on controls.
   */
  resumeControls(trigger) {
    this.t("media-resume-controls-request", trigger);
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
    this.t("media-pause-controls-request", trigger);
  }
  /**
   * Dispatch a request to toggle the media playback state.
   */
  togglePaused(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
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
      return;
    }
    const tracks = player.state.textTracks, track = player.state.textTrack;
    if (track) {
      const index = tracks.indexOf(track);
      this.changeTextTrackMode(index, "disabled", trigger);
      this.Qc = index;
    } else {
      let index = this.Qc;
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
      this.Qc = -1;
    }
  }
  t(type, trigger, detail) {
    const request = new DOMEvent(type, {
      bubbles: true,
      composed: true,
      detail,
      trigger
    });
    let target = trigger?.target || null;
    if (target && target instanceof Component)
      target = target.el;
    const shouldUsePlayer = !target || target === document || target === window || target === document.body || this.ba?.el && target instanceof Node && !this.ba.el.contains(target);
    target = shouldUsePlayer ? this.B ?? this.getPlayer()?.el : target ?? this.B;
    if (this.ba) {
      this.ba.canPlayQueue.k(type, () => target?.dispatchEvent(request));
    } else {
      target?.dispatchEvent(request);
    }
  }
  Aa(method) {
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
    this.Rc = -2;
    this.Ya = false;
    this.Ae = signal(false);
    this.Sc = signal(false);
    this.xb = null;
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
    return this.Ae() || hideControlsOnMouseLeave();
  }
  set hideOnMouseLeave(hide) {
    this.Ae.set(hide);
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
    this.Tc();
    if (!this.Ya) {
      this.cc(true, delay, trigger);
    }
  }
  /**
   * Hide controls.
   */
  hide(delay = this.defaultDelay, trigger) {
    this.Tc();
    if (!this.Ya) {
      this.cc(false, delay, trigger);
    }
  }
  /**
   * Whether all idle tracking on controls should be paused until resumed again.
   */
  pause(trigger) {
    this.Ya = true;
    this.Tc();
    this.cc(true, 0, trigger);
  }
  resume(trigger) {
    this.Ya = false;
    if (this.$state.paused())
      return;
    this.cc(false, this.defaultDelay, trigger);
  }
  onConnect() {
    effect(this.cg.bind(this));
    effect(this.Uc.bind(this));
    const onPlay = this.yb.bind(this), onPause = this.Ba.bind(this);
    this.listen("can-play", (event) => this.show(0, event));
    this.listen("play", onPlay);
    this.listen("pause", onPause);
    this.listen("autoplay-fail", onPause);
  }
  cg() {
    const { started, pointer, paused } = this.$state;
    if (!started() || pointer() !== "fine")
      return;
    const shouldHideOnMouseLeave = this.hideOnMouseLeave;
    if (!shouldHideOnMouseLeave || !this.Sc()) {
      effect(() => {
        if (!paused())
          this.listen("pointermove", this.Be.bind(this));
      });
    }
    if (shouldHideOnMouseLeave) {
      this.listen("mouseenter", this.dg.bind(this));
      this.listen("mouseleave", this.eg.bind(this));
    }
  }
  Uc() {
    const { paused, started, autoplayError } = this.$state;
    if (paused() || autoplayError() && !started())
      return;
    const onStopIdle = this.Be.bind(this);
    effect(() => {
      const pointer = this.$state.pointer(), isTouch = pointer === "coarse", events = [isTouch ? "touchend" : "pointerup", "keydown"];
      for (const eventType of events) {
        this.listen(eventType, onStopIdle, { passive: false });
      }
    });
  }
  yb(event) {
    this.show(0, event);
    this.hide(void 0, event);
  }
  Ba(event) {
    this.show(0, event);
  }
  dg(event) {
    this.Sc.set(false);
    this.show(0, event);
    this.hide(void 0, event);
  }
  eg(event) {
    this.Sc.set(true);
    this.hide(0, event);
  }
  Tc() {
    window.clearTimeout(this.Rc);
    this.Rc = -1;
  }
  Be(event) {
    if (
      // @ts-expect-error
      event.MEDIA_GESTURE || this.Ya || isTouchPinchEvent(event)
    ) {
      return;
    }
    if (isKeyboardEvent(event)) {
      if (event.key === "Escape") {
        this.el?.focus();
        this.xb = null;
      } else if (this.xb) {
        event.preventDefault();
        requestAnimationFrame(() => {
          this.xb?.focus();
          this.xb = null;
        });
      }
    }
    this.show(0, event);
    this.hide(this.defaultDelay, event);
  }
  cc(visible, delay, trigger) {
    if (delay === 0) {
      this.C(visible, trigger);
      return;
    }
    this.Rc = window.setTimeout(() => {
      if (!this.scope)
        return;
      this.C(visible && !this.Ya, trigger);
    }, delay);
  }
  C(visible, trigger) {
    if (this.$state.controlsVisible() === visible)
      return;
    this.$state.controlsVisible.set(visible);
    if (!visible && document.activeElement && this.el?.contains(document.activeElement)) {
      this.xb = document.activeElement;
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
    this.Ce = true;
    this.m = null;
    this.A = null;
    this.zb = /* @__PURE__ */ new Set();
  }
  canRender(_, video) {
    return !!video;
  }
  attach(video) {
    this.m = video;
    if (video)
      video.textTracks.onchange = this.C.bind(this);
  }
  addTrack(track) {
    this.zb.add(track);
    this.fg(track);
  }
  removeTrack(track) {
    track[TextTrackSymbol.U]?.remove?.();
    track[TextTrackSymbol.U] = null;
    this.zb.delete(track);
  }
  changeTrack(track) {
    const current = track?.[TextTrackSymbol.U];
    if (current && current.track.mode !== "showing") {
      current.track.mode = "showing";
    }
    this.A = track;
  }
  setDisplay(display) {
    this.Ce = display;
    this.C();
  }
  detach() {
    if (this.m)
      this.m.textTracks.onchange = null;
    for (const track of this.zb)
      this.removeTrack(track);
    this.zb.clear();
    this.m = null;
    this.A = null;
  }
  fg(track) {
    if (!this.m)
      return;
    const el = track[TextTrackSymbol.U] ??= this.gg(track);
    if (el instanceof HTMLElement) {
      this.m.append(el);
      el.track.mode = el.default ? "showing" : "hidden";
    }
  }
  gg(track) {
    const el = document.createElement("track"), isDefault = track.default || track.mode === "showing", isSupported = track.src && track.type === "vtt";
    el.id = track.id;
    el.src = isSupported ? track.src : "https://cdn.jsdelivr.net/npm/vidstack@next/empty.vtt";
    el.label = track.label;
    el.kind = track.kind;
    el.default = isDefault;
    track.language && (el.srclang = track.language);
    if (isDefault && !isSupported) {
      this.De(track, el.track);
    }
    return el;
  }
  De(track, native) {
    if (track.src && track.type === "vtt" || native.cues?.length)
      return;
    for (const cue of track.cues)
      native.addCue(cue);
  }
  C(event) {
    for (const track of this.zb) {
      const nativeTrack = track[TextTrackSymbol.U]?.track;
      if (!nativeTrack)
        continue;
      if (!this.Ce) {
        nativeTrack.mode = "disabled";
        continue;
      }
      const isShowing = nativeTrack.mode === "showing";
      if (isShowing)
        this.De(track, nativeTrack);
      track.setMode(isShowing ? "showing" : "disabled", event);
    }
  }
}

class TextRenderers {
  constructor(_media) {
    this.a = _media;
    this.m = null;
    this.dc = [];
    this.Ee = false;
    this.ca = null;
    this.Ca = null;
    const textTracks = _media.textTracks;
    this.Vc = textTracks;
    effect(this.Wc.bind(this));
    onDispose(this.Fe.bind(this));
    listenEvent(textTracks, "add", this.Xc.bind(this));
    listenEvent(textTracks, "remove", this.hg.bind(this));
    listenEvent(textTracks, "mode-change", this.fa.bind(this));
  }
  Wc() {
    const { $state, $iosControls } = this.a;
    this.Ee = $state.controls() || $iosControls();
    this.fa();
  }
  add(renderer) {
    this.dc.push(renderer);
    this.fa();
  }
  remove(renderer) {
    renderer.detach();
    this.dc.splice(this.dc.indexOf(renderer), 1);
    this.fa();
  }
  /* @internal */
  Ge(video) {
    requestAnimationFrame(() => {
      this.m = video;
      if (video) {
        this.ca = new NativeTextRenderer();
        this.ca.attach(video);
        for (const track of this.Vc)
          this.He(track);
      }
      this.fa();
    });
  }
  He(track) {
    if (!isTrackCaptionKind(track))
      return;
    this.ca?.addTrack(track);
  }
  ig(track) {
    if (!isTrackCaptionKind(track))
      return;
    this.ca?.removeTrack(track);
  }
  Xc(event) {
    this.He(event.detail);
  }
  hg(event) {
    this.ig(event.detail);
  }
  fa() {
    const currentTrack = this.Vc.selected;
    if (this.m && (this.Ee || currentTrack?.[TextTrackSymbol.ue])) {
      this.Ca?.changeTrack(null);
      this.ca?.setDisplay(true);
      this.ca?.changeTrack(currentTrack);
      return;
    }
    this.ca?.setDisplay(false);
    this.ca?.changeTrack(null);
    if (!currentTrack) {
      this.Ca?.changeTrack(null);
      return;
    }
    const customRenderer = this.dc.sort((a, b) => a.priority - b.priority).find((renderer) => renderer.canRender(currentTrack, this.m));
    if (this.Ca !== customRenderer) {
      this.Ca?.detach();
      customRenderer?.attach(this.m);
      this.Ca = customRenderer ?? null;
    }
    customRenderer?.changeTrack(currentTrack);
  }
  Fe() {
    this.ca?.detach();
    this.ca = null;
    this.Ca?.detach();
    this.Ca = null;
  }
}

class TextTrackList extends List {
  constructor() {
    super(...arguments);
    this.Q = false;
    this.ec = {};
    this.Ke = this.jg.bind(this);
  }
  get selected() {
    const track = this.s.find((t) => t.mode === "showing" && isTrackCaptionKind(t));
    return track ?? null;
  }
  add(init, trigger) {
    const isTrack = init instanceof TextTrack, track = isTrack ? init : new TextTrack(init);
    if (this.ec[init.kind] && init.default)
      delete init.default;
    track.addEventListener("mode-change", this.Ke);
    this[ListSymbol.pa](track, trigger);
    track[TextTrackSymbol.Ta] = this[TextTrackSymbol.Ta];
    if (this.Q)
      track[TextTrackSymbol.Q]();
    if (init.default) {
      this.ec[init.kind] = track;
      track.mode = "showing";
    }
    return this;
  }
  remove(track, trigger) {
    if (!this.s.includes(track))
      return;
    if (track === this.ec[track.kind])
      delete this.ec[track.kind];
    track.mode = "disabled";
    track[TextTrackSymbol.Va] = null;
    track.removeEventListener("mode-change", this.Ke);
    this[ListSymbol.Zb](track, trigger);
    return this;
  }
  clear(trigger) {
    for (const track of [...this.s]) {
      this.remove(track, trigger);
    }
    return this;
  }
  getById(id) {
    return this.s.find((track) => track.id === id) ?? null;
  }
  getByKind(kind) {
    const kinds = Array.isArray(kind) ? kind : [kind];
    return this.s.filter((track) => kinds.includes(track.kind));
  }
  /* @internal */
  [(TextTrackSymbol.Q)]() {
    if (this.Q)
      return;
    for (const track of this.s)
      track[TextTrackSymbol.Q]();
    this.Q = true;
  }
  jg(event) {
    const track = event.detail;
    if (track.mode === "showing") {
      const kinds = isTrackCaptionKind(track) ? ["captions", "subtitles"] : [track.kind];
      for (const t of this.s) {
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

const SELECTED = Symbol(0);
class SelectList extends List {
  get selected() {
    return this.s.find((item) => item.selected) ?? null;
  }
  get selectedIndex() {
    return this.s.findIndex((item) => item.selected);
  }
  /* @internal */
  [ListSymbol.pe](item, trigger) {
    this[ListSymbol.qa](item, false, trigger);
  }
  /* @internal */
  [ListSymbol.pa](item, trigger) {
    item[SELECTED] = false;
    Object.defineProperty(item, "selected", {
      get() {
        return this[SELECTED];
      },
      set: (selected) => {
        if (this.readonly)
          return;
        this[ListSymbol.qe]?.();
        this[ListSymbol.qa](item, selected);
      }
    });
    super[ListSymbol.pa](item, trigger);
  }
  /* @internal */
  [ListSymbol.qa](item, selected, trigger) {
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
    return this.s.find((track) => track.id === id) ?? null;
  }
}

const globalEval = eval;
const equalsRE = /:\s+'?"?(.*?)'?"?\)/g, notRE = /\s+not\s+/g, andRE = /\s+and\s+/g, orRE = /\s+or\s+/g, pxRE = /(\d)px/g;
const _PlayerQueryList = class _PlayerQueryList extends EventsTarget {
  constructor(store, query) {
    super();
    this.fc = signal("true");
    this.Yc = /* @__PURE__ */ new Set();
    this.Zc = signal(true);
    this.$matches = computed(() => {
      let currentEval = this.fc();
      if (currentEval === "never")
        return false;
      for (const prop of this.Yc) {
        const value = this.Me[prop](), replaceValue = isString(value) ? `'${value}'` : value + "";
        currentEval = currentEval.replace(camelToKebabCase(prop), replaceValue);
      }
      return globalEval(`!!(${currentEval})`) && this.Zc();
    });
    this.Le = query;
    this.Me = store;
    root((dispose) => {
      effect(this.kg.bind(this));
      effect(this.lg.bind(this));
      this.Ne = dispose;
    });
  }
  get query() {
    return unwrap(this.Le);
  }
  get matches() {
    return this.$matches();
  }
  kg() {
    const query = this.query;
    if (query === "")
      return;
    if (query === "never") {
      this.fc.set(query);
      return;
    }
    const queryList = query.trim().split(/\s*,\s*/g), mediaQueries = queryList.filter((q) => q.startsWith("@media")).join(","), playerQueries = queryList.filter((q) => !q.startsWith("@media"));
    if (mediaQueries.length) {
      const mediaQuery = window.matchMedia(mediaQueries.replace(/@media\s/g, "")), onChange = () => void this.Zc.set(mediaQuery.matches);
      onChange();
      listenEvent(mediaQuery, "change", onChange);
    }
    if (playerQueries.length) {
      const evaluation = this.mg(playerQueries), validProps = Object.keys(mediaState.record);
      for (const query2 of evaluation.matchAll(/\(([-a-zA-Z]+)\s/g)) {
        const prop = kebabToCamelCase(query2[1]);
        if (validProps.includes(prop)) {
          this.Yc.add(prop);
        }
      }
      this.fc.set(evaluation);
    }
    return () => {
      this.Yc.clear();
      this.fc.set("true");
      this.Zc.set(true);
    };
  }
  lg() {
    this.$matches();
    this.dispatchEvent(new Event("change"));
  }
  mg(queryList) {
    return queryList.map(
      (query) => "(" + query.replace(equalsRE, ' == "$1")').replace(notRE, "!").replace(andRE, " && ").replace(orRE, " || ").replace(pxRE, "$1").trim() + ")"
    ).join(" || ");
  }
  destroy() {
    this.Ne();
  }
};
_PlayerQueryList.create = (query) => {
  const media = useMediaContext();
  return new _PlayerQueryList(media.$state, query);
};
let PlayerQueryList = _PlayerQueryList;

const SET_AUTO = Symbol(0), ENABLE_AUTO = Symbol(0);
const QualitySymbol = {
  Za: SET_AUTO,
  _a: ENABLE_AUTO
};

class VideoQualityList extends SelectList {
  constructor() {
    super(...arguments);
    this.gc = false;
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
    return this.gc || this.readonly;
  }
  /* @internal */
  [(ListSymbol.qe)]() {
    this[QualitySymbol.Za](false);
  }
  /* @internal */
  [ListSymbol.oe](trigger) {
    this[QualitySymbol.Za](false, trigger);
  }
  /**
   * Request automatic quality selection (if supported). This will be a no-op if the list is
   * `readonly` as that already implies auto-selection.
   */
  autoSelect(trigger) {
    if (this.readonly || this.gc || !this[QualitySymbol._a])
      return;
    this[QualitySymbol._a]?.();
    this[QualitySymbol.Za](true, trigger);
  }
  /* @internal */
  [QualitySymbol.Za](auto, trigger) {
    if (this.gc === auto)
      return;
    this.gc = auto;
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
    this.a = _media;
    this.$a = null;
  }
  onConnect() {
    effect(this.ng.bind(this));
  }
  ng() {
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
      listenEvent(target, "keyup", this.Ab.bind(this));
      listenEvent(target, "keydown", this.Bb.bind(this));
      listenEvent(target, "keydown", this.og.bind(this), { capture: true });
    });
  }
  Ab(event) {
    const focusedEl = document.activeElement;
    if (!event.key || !this.$state.canSeek() || focusedEl?.matches(IGNORE_SELECTORS)) {
      return;
    }
    let { method, value } = this._c(event);
    if (!isString(value) && !isArray(value)) {
      value?.callback(event);
      return;
    }
    if (method?.startsWith("seek")) {
      event.preventDefault();
      event.stopPropagation();
      if (this.$a) {
        this.Oe(event, method === "seekForward");
        this.$a = null;
      } else {
        this.a.remote.seek(this.hc, event);
        this.hc = void 0;
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
  Bb(event) {
    if (!event.key || MODIFIER_KEYS.has(event.key))
      return;
    const focusedEl = document.activeElement;
    if (focusedEl?.matches(IGNORE_SELECTORS) || isKeyboardClick(event) && focusedEl?.matches(BUTTON_SELECTORS)) {
      return;
    }
    let { method, value } = this._c(event);
    if (!isString(value) && !isArray(value)) {
      value?.callback(event);
      return;
    }
    if (!method && !event.metaKey && /[0-9]/.test(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      this.a.remote.seek(this.$state.duration() / 10 * Number(event.key), event);
      return;
    }
    if (!method)
      return;
    event.preventDefault();
    event.stopPropagation();
    switch (method) {
      case "seekForward":
      case "seekBackward":
        this.ra(event, method, method === "seekForward");
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
          this.a.remote.changeVolume(
            this.$state.volume() + (method === "volumeUp" ? +value2 : -value2),
            event
          );
        }
        break;
      case "toggleFullscreen":
        this.a.remote.toggleFullscreen("prefer-media", event);
        break;
      case "speedUp":
      case "slowDown":
        const playbackRate = this.$state.playbackRate();
        this.a.remote.changePlaybackRate(
          Math.max(0.25, Math.min(2, playbackRate + (method === "speedUp" ? 0.25 : -0.25))),
          event
        );
        break;
      default:
        this.a.remote[method]?.(event);
    }
  }
  og(event) {
    if (isHTMLMediaElement(event.target) && this._c(event).method) {
      event.preventDefault();
    }
  }
  _c(event) {
    const keyShortcuts = {
      ...this.$props.keyShortcuts(),
      ...this.a.ariaKeys
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
  pg(event, type) {
    const seekBy = event.shiftKey ? 10 : 5;
    return this.hc = Math.max(
      0,
      Math.min(
        (this.hc ?? this.$state.currentTime()) + (type === "seekForward" ? +seekBy : -seekBy),
        this.$state.duration()
      )
    );
  }
  Oe(event, forward) {
    this.$a?.dispatchEvent(
      new KeyboardEvent(event.type, {
        key: !forward ? "Left" : "Right",
        shiftKey: event.shiftKey,
        trigger: event
      })
    );
  }
  ra(event, type, forward) {
    if (!this.$state.canSeek())
      return;
    if (!this.$a)
      this.$a = this.el.querySelector("[data-media-time-slider]");
    if (this.$a) {
      this.Oe(event, forward);
    } else {
      this.a.remote.seeking(this.pg(event, type), event);
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
    this.$c = _shortcut;
  }
  onAttach(el) {
    const { $props, ariaKeys } = useMediaContext(), keys = el.getAttribute("aria-keyshortcuts");
    if (keys) {
      ariaKeys[this.$c] = keys;
      if (!IS_SERVER) {
        onDispose(() => {
          delete ariaKeys[this.$c];
        });
      }
      return;
    }
    const shortcuts = $props.keyShortcuts()[this.$c];
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
    return new (await import('./vidstack-a2UN8s0u.js')).AudioProvider(this.target);
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
    return new (await import('./vidstack-fUbSlpyy.js')).VideoProvider(this.target, ctx);
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
    return new (await import('./vidstack-ban587CL.js')).YouTubeProvider(this.target);
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
    return new (await import('./vidstack-0nK932FL.js')).HLSProvider(this.target, context);
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
    return new (await import('./vidstack-EeSTLmRw.js')).VimeoProvider(this.target);
  }
}

const MEDIA_ATTRIBUTES = Symbol(0);
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
  logLevel: "silent",
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

class MediaLoadController extends MediaPlayerController {
  constructor(_callback) {
    super();
    this.Da = _callback;
  }
  async onAttach(el) {
    if (IS_SERVER)
      return;
    const load = this.$props.load();
    if (load === "eager") {
      requestAnimationFrame(this.Da);
    } else if (load === "idle") {
      waitIdlePeriod(this.Da);
    } else if (load === "visible") {
      const observer = new IntersectionObserver((entries) => {
        if (!this.scope)
          return;
        if (entries[0].isIntersecting) {
          observer.disconnect();
          this.Da();
        }
      });
      observer.observe(el);
      return observer.disconnect.bind(observer);
    }
  }
}

class MediaPlayerDelegate {
  constructor(_handle, _media) {
    this.Y = _handle;
    this.a = _media;
    this.c = (type, ...init) => {
      if (IS_SERVER)
        return;
      this.Y(
        new DOMEvent(type, {
          detail: init?.[0],
          trigger: init?.[1]
        })
      );
    };
  }
  async kc(info, trigger) {
    if (IS_SERVER)
      return;
    const { $state, logger } = this.a;
    if (peek($state.canPlay))
      return;
    const detail = {
      duration: info?.duration ?? peek($state.duration),
      seekable: info?.seekable ?? peek($state.seekable),
      buffered: info?.buffered ?? peek($state.buffered),
      provider: peek(this.a.$provider)
    };
    this.c("can-play", detail, trigger);
    tick();
    const provider = peek(this.a.$provider), { muted, volume, playsinline } = this.a.$props;
    if (provider) {
      provider.setVolume(peek(volume));
      provider.setMuted(peek(muted));
      provider.setPlaysinline?.(peek(playsinline));
    }
    if ($state.canPlay() && $state.autoplay() && !$state.started()) {
      await this.ph(trigger);
    }
  }
  async ph(trigger) {
    const { player, $state } = this.a;
    $state.autoplaying.set(true);
    const attemptEvent = new DOMEvent("autoplay-attempt", { trigger });
    try {
      await player.play(attemptEvent);
    } catch (error) {
    }
  }
}

class Queue {
  constructor() {
    this.e = /* @__PURE__ */ new Map();
  }
  /**
   * Queue the given `item` under the given `key` to be processed at a later time by calling
   * `serve(key)`.
   */
  k(key, item) {
    if (!this.e.has(key))
      this.e.set(key, /* @__PURE__ */ new Set());
    this.e.get(key).add(item);
  }
  /**
   * Process all items in queue for the given `key`.
   */
  ud(key, callback) {
    const items = this.e.get(key);
    if (items)
      for (const item of items)
        callback(item);
    this.e.delete(key);
  }
  /**
   * Removes all queued items under the given `key`.
   */
  rc(key) {
    this.e.delete(key);
  }
  /**
   * The number of items currently queued under the given `key`.
   */
  qh(key) {
    return this.e.get(key)?.size ?? 0;
  }
  /**
   * Clear all items in the queue.
   */
  I() {
    this.e.clear();
  }
}

class RequestQueue {
  constructor() {
    this.Nb = false;
    this.Fd = deferredPromise();
    this.e = /* @__PURE__ */ new Map();
  }
  /**
   * The number of callbacks that are currently in queue.
   */
  get qh() {
    return this.e.size;
  }
  /**
   * Whether items in the queue are being served immediately, otherwise they're queued to
   * be processed later.
   */
  get Sj() {
    return this.Nb;
  }
  /**
   * Waits for the queue to be flushed (ie: start serving).
   */
  async Tj() {
    if (this.Nb)
      return;
    await this.Fd.promise;
  }
  /**
   * Queue the given `callback` to be invoked at a later time by either calling the `serve()` or
   * `start()` methods. If the queue has started serving (i.e., `start()` was already called),
   * then the callback will be invoked immediately.
   *
   * @param key - Uniquely identifies this callback so duplicates are ignored.
   * @param callback - The function to call when this item in the queue is being served.
   */
  k(key, callback) {
    if (this.Nb) {
      callback();
      return;
    }
    this.e.delete(key);
    this.e.set(key, callback);
  }
  /**
   * Invokes the callback with the given `key` in the queue (if it exists).
   */
  ud(key) {
    this.e.get(key)?.();
    this.e.delete(key);
  }
  /**
   * Flush all queued items and start serving future requests immediately until `stop()` is called.
   */
  Cb() {
    this.kf();
    this.Nb = true;
    if (this.e.size > 0)
      this.kf();
  }
  /**
   * Stop serving requests, they'll be queued until you begin processing again by calling `start()`.
   */
  sa() {
    this.Nb = false;
  }
  /**
   * Stop serving requests, empty the request queue, and release any promises waiting for the
   * queue to flush.
   */
  I() {
    this.sa();
    this.e.clear();
    this.lf();
  }
  kf() {
    for (const key of this.e.keys())
      this.ud(key);
    this.lf();
  }
  lf() {
    this.Fd.resolve();
    this.Fd = deferredPromise();
  }
}

function coerceToError(error) {
  return error instanceof Error ? error : Error(JSON.stringify(error));
}

class MediaRequestManager extends MediaPlayerController {
  constructor(_stateMgr, _request, _media) {
    super();
    this.ha = _stateMgr;
    this.f = _request;
    this.a = _media;
    this.Jk = new RequestQueue();
    this.wd = false;
    this.Ik = _media.$provider;
    this.Jb = new MediaControls();
    this.sc = new FullscreenController();
    this.ua = new ScreenOrientationController();
  }
  onAttach() {
    this.listen("fullscreen-change", this.Pc.bind(this));
  }
  onConnect() {
    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this)), handle = this.rh.bind(this);
    for (const name of names) {
      if (name.startsWith("media-")) {
        this.listen(name, handle);
      }
    }
    effect(this.Kk.bind(this));
    effect(this.sh.bind(this));
    effect(this.th.bind(this));
    effect(this.uh.bind(this));
  }
  onDestroy() {
    this.Jk.I();
  }
  Kk() {
    const provider = this.Ik(), canPlay = this.$state.canPlay();
    if (provider && canPlay) {
      this.Jk.Cb();
    }
    return () => {
      this.Jk.sa();
    };
  }
  rh(event) {
    event.stopPropagation();
    if (!this[event.type])
      return;
    if (peek(this.Ik)) {
      this[event.type](event);
    } else {
      this.Jk.k(event.type, () => {
        if (peek(this.Ik))
          this[event.type](event);
      });
    }
  }
  async tc(trigger) {
    if (IS_SERVER)
      return;
    const { canPlay, paused, ended, autoplaying, seekableStart } = this.$state;
    if (!peek(paused))
      return;
    if (trigger?.type === "media-play-request") {
      this.f.e.k("play", trigger);
    }
    try {
      const provider = peek(this.Ik);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      if (peek(ended)) {
        provider.setCurrentTime(seekableStart() + 0.1);
      }
      return await provider.play();
    } catch (error) {
      const errorEvent = this.createEvent("play-fail", {
        detail: coerceToError(error),
        trigger
      });
      errorEvent.autoplay = autoplaying();
      this.ha.Y(errorEvent);
      throw error;
    }
  }
  async vd(trigger) {
    if (IS_SERVER)
      return;
    const { canPlay, paused } = this.$state;
    if (peek(paused))
      return;
    if (trigger?.type === "media-pause-request") {
      this.f.e.k("pause", trigger);
    }
    const provider = peek(this.Ik);
    throwIfNotReadyForPlayback(provider, peek(canPlay));
    return provider.pause();
  }
  _e(trigger) {
    if (IS_SERVER)
      return;
    const { canPlay, live, liveEdge, canSeek, liveSyncPosition, seekableEnd, userBehindLiveEdge } = this.$state;
    userBehindLiveEdge.set(false);
    if (peek(() => !live() || liveEdge() || !canSeek()))
      return;
    const provider = peek(this.Ik);
    throwIfNotReadyForPlayback(provider, peek(canPlay));
    provider.setCurrentTime(liveSyncPosition() ?? seekableEnd() - 2);
  }
  async $e(target = "prefer-media", trigger) {
    if (IS_SERVER)
      return;
    const adapter = this.af(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (adapter.active)
      return;
    if (peek(this.$state.pictureInPicture)) {
      this.wd = true;
      await this.xd(trigger);
    }
    if (trigger?.type === "media-enter-fullscreen-request") {
      this.f.e.k("fullscreen", trigger);
    }
    return adapter.enter();
  }
  async bf(target = "prefer-media", trigger) {
    if (IS_SERVER)
      return;
    const adapter = this.af(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (!adapter.active)
      return;
    if (trigger?.type === "media-exit-fullscreen-request") {
      this.f.e.k("fullscreen", trigger);
    }
    try {
      const result = await adapter.exit();
      if (this.wd && peek(this.$state.canPictureInPicture)) {
        await this.yd();
      }
      return result;
    } finally {
      this.wd = false;
    }
  }
  af(target) {
    const provider = peek(this.Ik);
    return target === "prefer-media" && this.sc.supported || target === "media" ? this.sc : provider?.fullscreen;
  }
  async yd(trigger) {
    if (IS_SERVER)
      return;
    this.cf();
    if (this.$state.pictureInPicture())
      return;
    if (trigger?.type === "media-enter-pip-request") {
      this.f.e.k("pip", trigger);
    }
    return await this.Ik().pictureInPicture.enter();
  }
  async xd(trigger) {
    if (IS_SERVER)
      return;
    this.cf();
    if (!this.$state.pictureInPicture())
      return;
    if (trigger?.type === "media-exit-pip-request") {
      this.f.e.k("pip", trigger);
    }
    return await this.Ik().pictureInPicture.exit();
  }
  cf() {
    if (this.$state.canPictureInPicture())
      return;
    throw Error(
      "[vidstack] no pip support"
    );
  }
  sh() {
    this.Jb.defaultDelay = this.$props.controlsDelay();
  }
  th() {
    const { canLoad, canFullscreen } = this.$state, supported = this.sc.supported || this.Ik()?.fullscreen?.supported || false;
    if (canLoad() && peek(canFullscreen) === supported)
      return;
    canFullscreen.set(supported);
  }
  uh() {
    const { canLoad, canPictureInPicture } = this.$state, supported = this.Ik()?.pictureInPicture?.supported || false;
    if (canLoad() && peek(canPictureInPicture) === supported)
      return;
    canPictureInPicture.set(supported);
  }
  ["media-audio-track-change-request"](event) {
    if (this.a.audioTracks.readonly) {
      return;
    }
    const index = event.detail, track = this.a.audioTracks[index];
    if (track) {
      this.f.e.k("audioTrack", event);
      track.selected = true;
    }
  }
  async ["media-enter-fullscreen-request"](event) {
    try {
      await this.$e(event.detail, event);
    } catch (error) {
      this.$b(error, event);
    }
  }
  async ["media-exit-fullscreen-request"](event) {
    try {
      await this.bf(event.detail, event);
    } catch (error) {
      this.$b(error, event);
    }
  }
  async Pc(event) {
    const lockType = peek(this.$props.fullscreenOrientation), isFullscreen = event.detail;
    if (isUndefined(lockType) || !this.ua.supported)
      return;
    if (isFullscreen) {
      if (this.ua.locked)
        return;
      this.dispatch("media-orientation-lock-request", {
        detail: lockType,
        trigger: event
      });
    } else if (this.ua.locked) {
      this.dispatch("media-orientation-unlock-request", {
        trigger: event
      });
    }
  }
  $b(error, request) {
    this.ha.Y(
      this.createEvent("fullscreen-error", {
        detail: coerceToError(error)
      })
    );
  }
  async ["media-orientation-lock-request"](event) {
    try {
      this.f.e.k("orientation", event);
      await this.ua.lock(event.detail);
    } catch (error) {
      this.f.e.rc("orientation");
    }
  }
  async ["media-orientation-unlock-request"](event) {
    try {
      this.f.e.k("orientation", event);
      await this.ua.unlock();
    } catch (error) {
      this.f.e.rc("orientation");
    }
  }
  async ["media-enter-pip-request"](event) {
    try {
      await this.yd(event);
    } catch (error) {
      this.df(error, event);
    }
  }
  async ["media-exit-pip-request"](event) {
    try {
      await this.xd(event);
    } catch (error) {
      this.df(error, event);
    }
  }
  df(error, request) {
    this.ha.Y(
      this.createEvent("picture-in-picture-error", {
        detail: coerceToError(error)
      })
    );
  }
  ["media-live-edge-request"](event) {
    const { live, liveEdge, canSeek } = this.$state;
    if (!live() || liveEdge() || !canSeek())
      return;
    this.f.e.k("seeked", event);
    try {
      this._e();
    } catch (error) {
    }
  }
  async ["media-loop-request"](event) {
    try {
      this.f.Ia = true;
      this.f.hb = true;
      await this.tc(event);
    } catch (e) {
      this.f.Ia = false;
      this.f.hb = false;
    }
  }
  async ["media-pause-request"](event) {
    if (this.$state.paused())
      return;
    try {
      await this.vd(event);
    } catch (error) {
      this.f.e.rc("pause");
    }
  }
  async ["media-play-request"](event) {
    if (!this.$state.paused())
      return;
    try {
      await this.tc(event);
    } catch (e) {
    }
  }
  ["media-rate-change-request"](event) {
    const { playbackRate, canSetPlaybackRate } = this.$state;
    if (playbackRate() === event.detail || !canSetPlaybackRate())
      return;
    const provider = this.Ik();
    if (!provider?.setPlaybackRate)
      return;
    this.f.e.k("rate", event);
    provider.setPlaybackRate(event.detail);
  }
  ["media-quality-change-request"](event) {
    if (this.a.qualities.readonly) {
      return;
    }
    this.f.e.k("quality", event);
    const index = event.detail;
    if (index < 0) {
      this.a.qualities.autoSelect(event);
    } else {
      const quality = this.a.qualities[index];
      if (quality) {
        quality.selected = true;
      }
    }
  }
  ["media-pause-controls-request"](event) {
    this.f.e.k("controls", event);
    this.Jb.pause(event);
  }
  ["media-resume-controls-request"](event) {
    this.f.e.k("controls", event);
    this.Jb.resume(event);
  }
  ["media-seek-request"](event) {
    const { seekableStart, seekableEnd, ended, canSeek, live, userBehindLiveEdge } = this.$state;
    if (ended())
      this.f.hb = true;
    this.f.ra = false;
    this.f.e.rc("seeking");
    const boundTime = Math.min(Math.max(seekableStart() + 0.1, event.detail), seekableEnd() - 0.1);
    if (!Number.isFinite(boundTime) || !canSeek())
      return;
    this.f.e.k("seeked", event);
    this.Ik().setCurrentTime(boundTime);
    if (live() && event.isOriginTrusted && Math.abs(seekableEnd() - boundTime) >= 2) {
      userBehindLiveEdge.set(true);
    }
  }
  ["media-seeking-request"](event) {
    this.f.e.k("seeking", event);
    this.$state.seeking.set(true);
    this.f.ra = true;
  }
  ["media-start-loading"](event) {
    if (this.$state.canLoad())
      return;
    this.f.e.k("load", event);
    this.ha.Y(this.createEvent("can-load"));
  }
  ["media-text-track-change-request"](event) {
    const { index, mode } = event.detail, track = this.a.textTracks[index];
    if (track) {
      this.f.e.k("textTrack", event);
      track.setMode(mode, event);
    }
  }
  ["media-mute-request"](event) {
    if (this.$state.muted())
      return;
    this.f.e.k("volume", event);
    this.Ik().setMuted(true);
  }
  ["media-unmute-request"](event) {
    const { muted, volume } = this.$state;
    if (!muted())
      return;
    this.f.e.k("volume", event);
    this.a.$provider().setMuted(false);
    if (volume() === 0) {
      this.f.e.k("volume", event);
      this.Ik().setVolume(0.25);
    }
  }
  ["media-volume-change-request"](event) {
    const { muted, volume } = this.$state;
    const newVolume = event.detail;
    if (volume() === newVolume)
      return;
    this.f.e.k("volume", event);
    this.Ik().setVolume(newVolume);
    if (newVolume > 0 && muted()) {
      this.f.e.k("volume", event);
      this.Ik().setMuted(false);
    }
  }
}
function throwIfNotReadyForPlayback(provider, canPlay) {
  if (provider && canPlay)
    return;
  throw Error(
    "[vidstack] media not ready"
  );
}
function throwIfFullscreenNotSupported(target, fullscreen) {
  if (fullscreen?.supported)
    return;
  throw Error(
    "[vidstack] no fullscreen support"
  );
}
class MediaRequestContext {
  constructor() {
    this.ra = false;
    this.Ia = false;
    this.hb = false;
    this.e = new Queue();
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
    this.f = _request;
    this.a = _media;
    this.p = /* @__PURE__ */ new Map();
    this.uc = false;
    this.Kb = false;
    this["seeking"] = functionThrottle(
      (event) => {
        const { seeking, currentTime, paused } = this.$state;
        seeking.set(true);
        currentTime.set(event.detail);
        this.G("seeking", event);
        if (paused()) {
          this.ib = event;
          this.Ad();
        }
      },
      150,
      { leading: true }
    );
    this.Ad = functionDebounce(() => {
      if (!this.ib)
        return;
      this.uc = true;
      const { waiting, playing } = this.$state;
      waiting.set(true);
      playing.set(false);
      const event = this.createEvent("waiting", { trigger: this.ib });
      this.p.set("waiting", event);
      this.dispatch(event);
      this.ib = void 0;
      this.uc = false;
    }, 300);
  }
  onAttach(el) {
    el.setAttribute("aria-busy", "true");
    this.listen("fullscreen-change", this["fullscreen-change"].bind(this));
    this.listen("fullscreen-error", this["fullscreen-error"].bind(this));
    this.listen("orientation-change", this["orientation-change"].bind(this));
  }
  onConnect(el) {
    this.vh();
    this.wh();
    this.xh();
    this.yh();
    onDispose(this.zh.bind(this));
  }
  Y(event) {
    if (!this.scope)
      return;
    const type = event.type;
    this[event.type]?.(event);
    if (!IS_SERVER) {
      if (TRACKED_EVENT.has(type))
        this.p.set(type, event);
      this.dispatch(event);
    }
  }
  yh() {
    if (!this.Kb)
      return;
    if (this.a.$provider()?.paused) {
      requestAnimationFrame(() => {
        if (!this.scope)
          return;
        this.a.remote.play(new DOMEvent("dom-connect"));
      });
    }
    this.Kb = false;
  }
  zh() {
    if (this.Kb)
      return;
    this.Kb = !this.a.$state.paused();
    this.a.$provider()?.pause();
  }
  jb() {
    this.ef();
    this.f.hb = false;
    this.f.Ia = false;
    this.uc = false;
    this.ib = void 0;
    this.p.clear();
  }
  G(request, event) {
    this.f.e.ud(request, (requestEvent) => {
      event.request = requestEvent;
      event.triggers.add(requestEvent);
    });
  }
  vh() {
    this.zd();
    this.ff();
    const textTracks = this.a.textTracks;
    listenEvent(textTracks, "add", this.zd.bind(this));
    listenEvent(textTracks, "remove", this.zd.bind(this));
    listenEvent(textTracks, "mode-change", this.ff.bind(this));
  }
  wh() {
    const qualities = this.a.qualities;
    listenEvent(qualities, "add", this.qc.bind(this));
    listenEvent(qualities, "remove", this.qc.bind(this));
    listenEvent(qualities, "change", this.gb.bind(this));
    listenEvent(qualities, "auto-change", this.Ah.bind(this));
    listenEvent(qualities, "readonly-change", this.Bh.bind(this));
  }
  xh() {
    const audioTracks = this.a.audioTracks;
    listenEvent(audioTracks, "add", this.gf.bind(this));
    listenEvent(audioTracks, "remove", this.gf.bind(this));
    listenEvent(audioTracks, "change", this.Ch.bind(this));
  }
  zd(event) {
    const { textTracks } = this.$state;
    textTracks.set(this.a.textTracks.toArray());
    this.dispatch("text-tracks-change", {
      detail: textTracks(),
      trigger: event
    });
  }
  ff(event) {
    if (event)
      this.G("textTrack", event);
    const current = this.a.textTracks.selected, { textTrack } = this.$state;
    if (textTrack() !== current) {
      textTrack.set(current);
      this.dispatch("text-track-change", {
        detail: current,
        trigger: event
      });
    }
  }
  gf(event) {
    const { audioTracks } = this.$state;
    audioTracks.set(this.a.audioTracks.toArray());
    this.dispatch("audio-tracks-change", {
      detail: audioTracks(),
      trigger: event
    });
  }
  Ch(event) {
    const { audioTrack } = this.$state;
    audioTrack.set(this.a.audioTracks.selected);
    this.G("audioTrack", event);
    this.dispatch("audio-track-change", {
      detail: audioTrack(),
      trigger: event
    });
  }
  qc(event) {
    const { qualities } = this.$state;
    qualities.set(this.a.qualities.toArray());
    this.dispatch("qualities-change", {
      detail: qualities(),
      trigger: event
    });
  }
  gb(event) {
    const { quality } = this.$state;
    quality.set(this.a.qualities.selected);
    this.G("quality", event);
    this.dispatch("quality-change", {
      detail: quality(),
      trigger: event
    });
  }
  Ah() {
    this.$state.autoQuality.set(this.a.qualities.auto);
  }
  Bh() {
    this.$state.canSetQuality.set(!this.a.qualities.readonly);
  }
  ["provider-change"](event) {
    const prevProvider = this.a.$provider(), newProvider = event.detail;
    if (prevProvider?.type === newProvider?.type)
      return;
    prevProvider?.destroy?.();
    prevProvider?.scope?.dispose();
    this.a.$provider.set(event.detail);
    if (prevProvider && event.detail === null)
      this.hf(event);
  }
  ["provider-loader-change"](event) {
  }
  ["autoplay"](event) {
    this.$state.autoplayError.set(null);
  }
  ["autoplay-fail"](event) {
    this.$state.autoplayError.set(event.detail);
    this.jb();
  }
  ["can-load"](event) {
    this.$state.canLoad.set(true);
    this.p.set("can-load", event);
    this.G("load", event);
    this.a.textTracks[TextTrackSymbol.Q]();
  }
  ["media-type-change"](event) {
    const sourceChangeEvent = this.p.get("source-change");
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
    const sourceChangeEvent = this.p.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const { streamType, inferredStreamType } = this.$state;
    inferredStreamType.set(event.detail);
    event.detail = streamType();
  }
  ["rate-change"](event) {
    this.$state.playbackRate.set(event.detail);
    this.G("rate", event);
  }
  ["sources-change"](event) {
    this.$state.sources.set(event.detail);
  }
  ["source-change"](event) {
    const sourcesChangeEvent = this.p.get("sources-change");
    if (sourcesChangeEvent)
      event.triggers.add(sourcesChangeEvent);
    this.hf(event);
    this.p.set(event.type, event);
    this.$state.source.set(event.detail);
    this.el?.setAttribute("aria-busy", "true");
  }
  hf(event) {
    this.a.audioTracks[ListSymbol.I](event);
    this.a.qualities[ListSymbol.I](event);
    this.jb();
    softResetMediaState(this.a.$state);
  }
  ["abort"](event) {
    const sourceChangeEvent = this.p.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
    const canLoadEvent = this.p.get("can-load");
    if (canLoadEvent && !event.triggers.hasType("can-load")) {
      event.triggers.add(canLoadEvent);
    }
  }
  ["load-start"](event) {
    const sourceChangeEvent = this.p.get("source-change");
    if (sourceChangeEvent)
      event.triggers.add(sourceChangeEvent);
  }
  ["error"](event) {
    this.$state.error.set(event.detail);
    const abortEvent = this.p.get("abort");
    if (abortEvent)
      event.triggers.add(abortEvent);
  }
  ["loaded-metadata"](event) {
    const loadStartEvent = this.p.get("load-start");
    if (loadStartEvent)
      event.triggers.add(loadStartEvent);
  }
  ["loaded-data"](event) {
    const loadStartEvent = this.p.get("load-start");
    if (loadStartEvent)
      event.triggers.add(loadStartEvent);
  }
  ["can-play"](event) {
    const loadedMetadata = this.p.get("loaded-metadata");
    if (loadedMetadata)
      event.triggers.add(loadedMetadata);
    this.jf(event.detail);
    this.el?.setAttribute("aria-busy", "false");
  }
  ["can-play-through"](event) {
    this.jf(event.detail);
    const canPlay = this.p.get("can-play");
    if (canPlay)
      event.triggers.add(canPlay);
  }
  jf(detail) {
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
    if (this.f.Ia || !paused()) {
      event.stopImmediatePropagation();
      return;
    }
    const waitingEvent = this.p.get("waiting");
    if (waitingEvent)
      event.triggers.add(waitingEvent);
    this.G("play", event);
    this.p.set("play", event);
    paused.set(false);
    autoplayError.set(null);
    if (event.autoplay) {
      this.Y(
        this.createEvent("autoplay", {
          detail: { muted: muted() },
          trigger: event
        })
      );
      autoplaying.set(false);
    }
    if (ended() || this.f.hb) {
      this.f.hb = false;
      ended.set(false);
      this.Y(this.createEvent("replay", { trigger: event }));
    }
    if (!playsinline() && viewType() === "video" && pointer() === "coarse") {
      this.a.remote.enterFullscreen("prefer-media", event);
    }
  }
  ["play-fail"](event) {
    const { muted, autoplaying } = this.$state;
    const playEvent = this.p.get("play");
    if (playEvent)
      event.triggers.add(playEvent);
    this.G("play", event);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    this.jb();
    this.p.set("play-fail", event);
    if (event.autoplay) {
      this.Y(
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
    const playEvent = this.p.get("play"), seekedEvent = this.p.get("seeked");
    if (playEvent)
      event.triggers.add(playEvent);
    else if (seekedEvent)
      event.triggers.add(seekedEvent);
    setTimeout(() => this.jb(), 0);
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
    if (this.f.Ia) {
      event.stopImmediatePropagation();
      this.f.Ia = false;
      return;
    }
    if (live() && !started() && currentTime() === 0) {
      const end = liveSyncPosition() ?? seekableEnd() - 2;
      if (Number.isFinite(end))
        this.a.$provider().setCurrentTime(end);
    }
    this["started"](event);
  }
  ["started"](event) {
    const { started } = this.$state;
    if (!started()) {
      started.set(true);
      this.Y(this.createEvent("started", { trigger: event }));
    }
  }
  ["pause"](event) {
    if (!this.el?.isConnected) {
      this.Kb = true;
    }
    if (this.f.Ia) {
      event.stopImmediatePropagation();
      return;
    }
    const seekedEvent = this.p.get("seeked");
    if (seekedEvent)
      event.triggers.add(seekedEvent);
    this.G("pause", event);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    this.jb();
  }
  ["time-update"](event) {
    const { currentTime, played, waiting } = this.$state, detail = event.detail;
    currentTime.set(detail.currentTime);
    played.set(detail.played);
    waiting.set(false);
    for (const track of this.a.textTracks) {
      track[TextTrackSymbol.Ua](detail.currentTime, event);
    }
  }
  ["volume-change"](event) {
    const { volume, muted } = this.$state, detail = event.detail;
    volume.set(detail.volume);
    muted.set(detail.muted || detail.volume === 0);
    this.G("volume", event);
  }
  ["seeked"](event) {
    const { seeking, currentTime, paused, duration, ended } = this.$state;
    if (this.f.ra) {
      seeking.set(true);
      event.stopImmediatePropagation();
    } else if (seeking()) {
      const waitingEvent = this.p.get("waiting");
      if (waitingEvent)
        event.triggers.add(waitingEvent);
      const seekingEvent = this.p.get("seeking");
      if (seekingEvent && !event.triggers.has(seekingEvent)) {
        event.triggers.add(seekingEvent);
      }
      if (paused())
        this.ef();
      seeking.set(false);
      if (event.detail !== duration())
        ended.set(false);
      currentTime.set(event.detail);
      this.G("seeked", event);
      const origin = event?.originEvent;
      if (origin?.isTrusted && !/seek/.test(origin.type)) {
        this["started"](event);
      }
    }
  }
  ["waiting"](event) {
    if (this.uc || this.f.ra)
      return;
    event.stopImmediatePropagation();
    this.ib = event;
    this.Ad();
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
    this.Eb(event);
  }
  Eb(event) {
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
    this.jb();
    this.dispatch("ended", {
      trigger: event
    });
  }
  ef() {
    this.Ad.cancel();
    this.$state.waiting.set(false);
  }
  ["fullscreen-change"](event) {
    this.$state.fullscreen.set(event.detail);
    this.G("fullscreen", event);
  }
  ["fullscreen-error"](event) {
    this.G("fullscreen", event);
  }
  ["orientation-change"](event) {
    this.G("orientation", event);
  }
  ["picture-in-picture-change"](event) {
    this.$state.pictureInPicture.set(event.detail);
    this.G("pip", event);
  }
  ["picture-in-picture-error"](event) {
    this.G("pip", event);
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
    this.Dh();
    if (IS_SERVER)
      return;
    effect(this.Fh.bind(this));
    effect(this.vc.bind(this));
    effect(this.Gh.bind(this));
    effect(this.md.bind(this));
    effect(this.Hh.bind(this));
    effect(this.Wc.bind(this));
    effect(this.Ih.bind(this));
    effect(this.Bd.bind(this));
    effect(this.Jh.bind(this));
    effect(this.Kh.bind(this));
    effect(this.Lh.bind(this));
  }
  Dh() {
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
  Fh() {
    const { viewType, streamType, title, poster } = this.$props;
    this.$state.providedPoster.set(poster());
    this.$state.providedStreamType.set(streamType());
    this.$state.providedViewType.set(viewType());
    this.$state.providedTitle.set(title());
  }
  Eh() {
    return;
  }
  vc() {
    const { title } = this.$state;
    this.dispatch("title-change", { detail: title() });
  }
  Gh() {
    const autoplay = this.$props.autoplay();
    this.$state.autoplay.set(autoplay);
    this.dispatch("autoplay-change", { detail: autoplay });
  }
  Hh() {
    const loop = this.$props.loop();
    this.$state.loop.set(loop);
    this.dispatch("loop-change", { detail: loop });
  }
  Wc() {
    const controls = this.$props.controls();
    this.$state.controls.set(controls);
  }
  md() {
    const { poster } = this.$state;
    this.dispatch("poster-change", { detail: poster() });
  }
  Ih() {
    const crossorigin = this.$props.crossorigin();
    this.$state.crossorigin.set(crossorigin === true ? "" : crossorigin);
  }
  Bd() {
    const playsinline = this.$props.playsinline();
    this.$state.playsinline.set(playsinline);
    this.dispatch("playsinline-change", { detail: playsinline });
  }
  Kh() {
    this.dispatch("live-change", { detail: this.$state.live() });
  }
  Jh() {
    this.$state.liveEdgeTolerance.set(this.$props.liveEdgeTolerance());
    this.$state.minLiveDVRWindow.set(this.$props.minLiveDVRWindow());
  }
  Lh() {
    this.dispatch("live-edge-change", { detail: this.$state.liveEdge() });
  }
}

function round(num, decimalPlaces = 2) {
  return Number(num.toFixed(decimalPlaces));
}
function getNumberOfDecimalPlaces(num) {
  return String(num).split(".")[1]?.length ?? 0;
}
function clampNumber(min, value, max) {
  return Math.max(min, Math.min(max, value));
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
    this.Lb = signal(false);
  }
  onConnect(el) {
    effect(() => {
      if (!$keyboard()) {
        this.Lb.set(false);
        updateFocusAttr(el, false);
        this.listen("pointerenter", this.Dd.bind(this));
        this.listen("pointerleave", this.Ed.bind(this));
        return;
      }
      const active = document.activeElement === el;
      this.Lb.set(active);
      updateFocusAttr(el, active);
      this.listen("focus", this.Mb.bind(this));
      this.listen("blur", this.Oh.bind(this));
    });
  }
  focused() {
    return this.Lb();
  }
  Mb() {
    this.Lb.set(true);
    updateFocusAttr(this.el, true);
  }
  Oh() {
    this.Lb.set(false);
    updateFocusAttr(this.el, false);
  }
  Dd() {
    updateHoverAttr(this.el, true);
  }
  Ed() {
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
    this.xc = false;
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
    context.remote = new MediaRemoteControl(void 0);
    context.remote.setPlayer(this);
    context.$iosControls = computed(this.Ph.bind(this));
    context.textTracks = new TextTrackList();
    context.textTracks[TextTrackSymbol.Ta] = this.$state.crossorigin;
    context.textRenderers = new TextRenderers(context);
    context.ariaKeys = {};
    this.a = context;
    provideContext(mediaContext, context);
    this.orientation = new ScreenOrientationController();
    new FocusVisibleController();
    new MediaKeyboardController(context);
    const request = new MediaRequestContext();
    this.ha = new MediaStateManager(request, context);
    this.Z = new MediaRequestManager(this.ha, request, context);
    context.delegate = new MediaPlayerDelegate(
      this.ha.Y.bind(this.ha),
      context
    );
    new MediaLoadController(this.startLoading.bind(this));
  }
  get i() {
    return this.a.$provider();
  }
  onSetup() {
    this.Qh();
    effect(this.Rh.bind(this));
    effect(this.Sh.bind(this));
    effect(this.Uc.bind(this));
    effect(this.Gd.bind(this));
    effect(this.kb.bind(this));
    effect(this.Bd.bind(this));
    effect(this.Th.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-player", "");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "region");
    if (IS_SERVER)
      this.vc();
    else
      effect(this.vc.bind(this));
    if (IS_SERVER)
      this.mf();
    else
      effect(this.mf.bind(this));
    listenEvent(el, "find-media-player", this.Uh.bind(this));
  }
  onConnect(el) {
    if (IS_IPHONE)
      setAttribute(el, "data-iphone", "");
    canChangeVolume().then(this.$state.canSetVolume.set);
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    this.nf(pointerQuery);
    pointerQuery.onchange = this.nf.bind(this);
    const resize = new ResizeObserver(animationFrameThrottle(this.P.bind(this)));
    resize.observe(el);
    effect(this.P.bind(this));
    this.dispatch("media-player-connect", {
      detail: this,
      bubbles: true,
      composed: true
    });
    onDispose(() => {
      resize.disconnect();
      pointerQuery.onchange = null;
    });
  }
  onDestroy() {
    this.a.player = null;
    this.canPlayQueue.I();
  }
  vc() {
    if (this.xc) {
      this.xc = false;
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
      this.xc = true;
    }
    this.el?.removeAttribute("title");
  }
  mf() {
    const orientation = this.orientation.landscape ? "landscape" : "portrait";
    this.$state.orientation.set(orientation);
    setAttribute(this.el, "data-orientation", orientation);
    this.P();
  }
  Rh() {
    if (this.$state.canPlay() && this.i)
      this.canPlayQueue.Cb();
    else
      this.canPlayQueue.sa();
  }
  Qh() {
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
        return this.a.$iosControls();
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
  Uh(event) {
    event.detail(this);
  }
  P() {
    if (IS_SERVER || !this.el)
      return;
    const width = this.el.clientWidth, height = this.el.clientHeight;
    this.$state.width.set(width);
    this.$state.height.set(height);
    setStyle(this.el, "--player-width", width + "px");
    setStyle(this.el, "--player-height", height + "px");
  }
  nf(queryList) {
    if (IS_SERVER)
      return;
    const pointer = queryList.matches ? "coarse" : "fine";
    setAttribute(this.el, "data-pointer", pointer);
    this.$state.pointer.set(pointer);
    this.P();
  }
  Ph() {
    const { playsinline, fullscreen } = this.$state;
    return IS_IPHONE && !canFullscreen() && this.$state.mediaType() === "video" && (!playsinline() || fullscreen());
  }
  get provider() {
    return this.i;
  }
  get controls() {
    return this.Z.Jb;
  }
  get title() {
    return peek(this.$state.providedTitle);
  }
  set title(newTitle) {
    if (this.xc)
      return;
    this.$state.providedTitle.set(newTitle);
  }
  get qualities() {
    return this.a.qualities;
  }
  get audioTracks() {
    return this.a.audioTracks;
  }
  get textTracks() {
    return this.a.textTracks;
  }
  get textRenderers() {
    return this.a.textRenderers;
  }
  get paused() {
    return peek(this.$state.paused);
  }
  set paused(paused) {
    this.of(paused);
  }
  Uc() {
    this.of(this.$props.paused());
  }
  of(paused) {
    if (paused) {
      this.canPlayQueue.k("paused", () => this.Z.vd());
    } else
      this.canPlayQueue.k("paused", () => this.Z.tc());
  }
  get muted() {
    return peek(this.$state.muted);
  }
  set muted(muted) {
    const $props = this.$props;
    $props.muted.set(muted);
  }
  Sh() {
    this.Vh(this.$props.muted());
  }
  Vh(muted) {
    this.canPlayQueue.k("muted", () => {
      if (this.i)
        this.i.setMuted(muted);
    });
  }
  get currentTime() {
    return peek(this.$state.currentTime);
  }
  set currentTime(time) {
    this.pf(time);
  }
  kb() {
    this.pf(this.$props.currentTime());
  }
  pf(time) {
    this.canPlayQueue.k("currentTime", () => {
      if (time === peek(this.$state.currentTime))
        return;
      peek(() => {
        if (!this.i)
          return;
        const boundTime = Math.min(
          Math.max(this.$state.seekableStart() + 0.1, time),
          this.$state.seekableEnd() - 0.1
        );
        if (Number.isFinite(boundTime))
          this.i.setCurrentTime(boundTime);
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
  Gd() {
    this.Wh(this.$props.volume());
  }
  Wh(volume) {
    const clampedVolume = clampNumber(0, volume, 1);
    this.canPlayQueue.k("volume", () => {
      if (this.i)
        this.i.setVolume(clampedVolume);
    });
  }
  get playbackRate() {
    return peek(this.$state.playbackRate);
  }
  set playbackRate(rate) {
    this.qf(rate);
  }
  Th() {
    this.qf(this.$props.playbackRate());
  }
  qf(rate) {
    this.canPlayQueue.k("rate", () => {
      if (this.i)
        this.i.setPlaybackRate?.(rate);
    });
  }
  Bd() {
    this.Xh(this.$props.playsinline());
  }
  Xh(inline) {
    this.canPlayQueue.k("playsinline", () => {
      if (this.i)
        this.i.setPlaysinline?.(inline);
    });
  }
  async play(trigger) {
    return this.Z.tc(trigger);
  }
  async pause(trigger) {
    return this.Z.vd(trigger);
  }
  async enterFullscreen(target, trigger) {
    return this.Z.$e(target, trigger);
  }
  async exitFullscreen(target, trigger) {
    return this.Z.bf(target, trigger);
  }
  enterPictureInPicture(trigger) {
    return this.Z.yd(trigger);
  }
  exitPictureInPicture(trigger) {
    return this.Z.xd(trigger);
  }
  seekToLiveEdge(trigger) {
    this.Z._e(trigger);
  }
  startLoading(trigger) {
    this.a.delegate.c("can-load", void 0, trigger);
  }
  matchQuery(query) {
    return scoped(() => PlayerQueryList.create(query), this.scope);
  }
  destroy() {
    this.a.remote.setPlayer(null);
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

const sourceTypes = /* @__PURE__ */ new Map();
class SourceSelection {
  constructor(_domSources, _media, _loader, customLoaders = []) {
    this.yc = _domSources;
    this.a = _media;
    this.ia = _loader;
    this.Hd = false;
    const HLS_LOADER = new HLSProviderLoader(), VIDEO_LOADER = new VideoProviderLoader(), AUDIO_LOADER = new AudioProviderLoader(), YOUTUBE_LOADER = new YouTubeProviderLoader(), VIMEO_LOADER = new VimeoProviderLoader(), EMBED_LOADERS = [YOUTUBE_LOADER, VIMEO_LOADER];
    this.Id = computed(() => {
      return _media.$props.preferNativeHLS() ? [VIDEO_LOADER, AUDIO_LOADER, HLS_LOADER, ...EMBED_LOADERS, ...customLoaders] : [HLS_LOADER, VIDEO_LOADER, AUDIO_LOADER, ...EMBED_LOADERS, ...customLoaders];
    });
    const { $state } = _media;
    $state.sources.set(normalizeSrc(_media.$props.src()));
    for (const src of $state.sources()) {
      const loader = this.Id().find((loader2) => loader2.canPlay(src));
      if (!loader)
        continue;
      const mediaType = loader.mediaType(src);
      this.a.$state.source.set(src);
      this.a.$state.mediaType.set(mediaType);
      this.a.$state.inferredViewType.set(mediaType);
      this.ia.set(loader);
      this.Hd = true;
    }
  }
  get c() {
    return this.a.delegate.c;
  }
  connect() {
    const loader = this.ia();
    if (this.Hd) {
      this.rf(this.a.$state.source(), loader);
      this.sf(loader);
      this.Hd = false;
    }
    effect(this.Yh.bind(this));
    effect(this.Zh.bind(this));
    effect(this._h.bind(this));
    effect(this.$h.bind(this));
  }
  Yh() {
    this.c("sources-change", [
      ...normalizeSrc(this.a.$props.src()),
      ...this.yc()
    ]);
  }
  Zh() {
    const { $state } = this.a;
    const sources = $state.sources(), currentSource = peek($state.source), newSource = this.tf(currentSource, sources), noMatch = sources[0]?.src && !newSource.src && !newSource.type;
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
        this.tf(peek($state.source), sources2);
        tick();
      });
      return () => abort.abort();
    }
    tick();
  }
  tf(currentSource, sources) {
    let newSource = { src: "", type: "" }, newLoader = null;
    for (const src of sources) {
      const loader = peek(this.Id).find((loader2) => loader2.canPlay(src));
      if (loader) {
        newSource = src;
        newLoader = loader;
      }
    }
    if (!isSameSrc(currentSource, newSource)) {
      this.rf(newSource, newLoader);
    }
    if (newLoader !== peek(this.ia)) {
      this.sf(newLoader);
    }
    return newSource;
  }
  rf(src, loader) {
    this.c("source-change", src);
    this.c("media-type-change", loader?.mediaType(src) || "unknown");
  }
  sf(loader) {
    this.a.$providerSetup.set(false);
    this.c("provider-change", null);
    loader && peek(() => loader.preconnect?.(this.a));
    this.ia.set(loader);
    this.c("provider-loader-change", loader);
  }
  _h() {
    const provider = this.a.$provider();
    if (!provider || peek(this.a.$providerSetup))
      return;
    if (this.a.$state.canLoad()) {
      scoped(() => provider.setup(this.a), provider.scope);
      this.a.$providerSetup.set(true);
      return;
    }
    peek(() => provider.preconnect?.(this.a));
  }
  $h() {
    if (!this.a.$providerSetup())
      return;
    const provider = this.a.$provider(), source = this.a.$state.source(), crossorigin = peek(this.a.$state.crossorigin);
    if (isSameSrc(provider?.currentSrc, source)) {
      return;
    }
    if (this.a.$state.canLoad()) {
      const abort = new AbortController();
      if (isHLSSrc(source)) {
        if (!isHLSSupported()) {
          resolveStreamTypeFromHLSManifest(source.src, {
            credentials: getRequestCredentials(crossorigin),
            signal: abort.signal
          }).then((streamType) => {
            this.c("stream-type-change", streamType);
          }).catch(noop);
        }
      } else {
        this.c("stream-type-change", "on-demand");
      }
      peek(() => provider?.loadSource(source, peek(this.a.$state.preload)));
      return () => abort.abort();
    }
    try {
      isString(source.src) && preconnect(new URL(source.src).origin, "preconnect");
    } catch (error) {
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
    this.zc = _domTracks;
    this.a = _media;
    this.uf = [];
    effect(this.ai.bind(this));
  }
  ai() {
    const newTracks = this.zc();
    for (const oldTrack of this.uf) {
      if (!newTracks.some((t) => t.id === oldTrack.id)) {
        const track = oldTrack.id && this.a.textTracks.getById(oldTrack.id);
        if (track)
          this.a.textTracks.remove(track);
      }
    }
    for (const newTrack of newTracks) {
      const id = newTrack.id || TextTrack.createId(newTrack);
      if (!this.a.textTracks.getById(id)) {
        newTrack.id = id;
        this.a.textTracks.add(newTrack);
      }
    }
    this.uf = newTracks;
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
    this.yc = signal([]);
    this.zc = signal([]);
    this.ia = null;
    this.Jd = -1;
  }
  onSetup() {
    this.a = useMediaContext();
    this.vf = new SourceSelection(
      this.yc,
      this.a,
      this.$state.loader,
      this.$props.loaders()
    );
  }
  onAttach(el) {
    el.setAttribute("data-media-provider", "");
  }
  onConnect(el) {
    this.vf.connect();
    new Tracks(this.zc, this.a);
    const resize = new ResizeObserver(animationFrameThrottle(this.P.bind(this)));
    resize.observe(el);
    const mutation = new MutationObserver(this.wf.bind(this));
    mutation.observe(el, { attributes: true, childList: true });
    this.P();
    this.wf();
    onDispose(() => {
      resize.disconnect();
      mutation.disconnect();
    });
  }
  load(target) {
    window.cancelAnimationFrame(this.Jd);
    this.Jd = requestAnimationFrame(() => this.bi(target));
    onDispose(() => {
      window.cancelAnimationFrame(this.Jd);
    });
  }
  bi(target) {
    if (!this.scope)
      return;
    const loader = this.$state.loader(), { $provider } = this.a;
    if (this.ia === loader && loader?.target === target && peek($provider))
      return;
    this.xf();
    this.ia = loader;
    if (loader)
      loader.target = target || null;
    if (!loader || !target)
      return;
    loader.load(this.a).then((provider) => {
      if (!this.scope)
        return;
      if (peek(this.$state.loader) !== loader)
        return;
      this.a.delegate.c("provider-change", provider);
    });
  }
  onDestroy() {
    this.ia = null;
    this.xf();
  }
  xf() {
    this.a.delegate.c("provider-change", null);
  }
  P() {
    if (!this.el)
      return;
    const player = this.a.player, width = this.el.offsetWidth, height = this.el.offsetHeight;
    if (!player)
      return;
    player.$state.mediaWidth.set(width);
    player.$state.mediaHeight.set(height);
    if (player.el) {
      setStyle(player.el, "--media-width", width + "px");
      setStyle(player.el, "--media-height", height + "px");
    }
  }
  wf() {
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
    this.yc.set(sources);
    this.zc.set(tracks);
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
    this.a = useMediaContext();
    effect(this.ci.bind(this));
  }
  onAttach(el) {
    const { pictureInPicture, fullscreen } = this.a.$state;
    setStyle(el, "pointer-events", "none");
    setAttributeIfEmpty(el, "role", "group");
    this.setAttributes({
      "data-visible": this.yf.bind(this),
      "data-fullscreen": fullscreen,
      "data-pip": pictureInPicture
    });
    effect(() => {
      this.dispatch("change", { detail: this.yf() });
    });
    effect(this.di.bind(this));
    effect(() => {
      const isFullscreen = fullscreen();
      for (const side of ["top", "right", "bottom", "left"]) {
        setStyle(el, `padding-${side}`, isFullscreen && `env(safe-area-inset-${side})`);
      }
    });
  }
  di() {
    if (!this.el)
      return;
    const { $iosControls } = this.a, { controls } = this.a.$state, isHidden = controls() || $iosControls();
    setAttribute(this.el, "aria-hidden", isHidden ? "true" : null);
    setStyle(this.el, "display", isHidden ? "none" : null);
  }
  ci() {
    const { controls } = this.a.player, { hideDelay, hideOnMouseLeave } = this.$props;
    controls.defaultDelay = hideDelay() === 2e3 ? this.a.$props.controlsDelay() : hideDelay();
    controls.hideOnMouseLeave = hideOnMouseLeave();
  }
  yf() {
    const { controlsVisible } = this.a.$state;
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
    this.j = _delegate;
    this.Bc = -1;
    this.Cc = -1;
    this.Ja = null;
    effect(this.ei.bind(this));
  }
  onDestroy() {
    this.Ja?.();
    this.Ja = null;
  }
  ei() {
    const trigger = this.j.D();
    if (!trigger) {
      this.hide();
      return;
    }
    const show = this.show.bind(this), hide = this.hide.bind(this);
    this.j.Ac(trigger, show, hide);
  }
  show(trigger) {
    window.cancelAnimationFrame(this.Cc);
    this.Cc = -1;
    this.Ja?.();
    this.Ja = null;
    this.Bc = window.setTimeout(
      () => {
        this.Bc = -1;
        const content = this.j.v();
        if (content)
          content.style.removeProperty("display");
        peek(() => this.j.C(true, trigger));
      },
      this.j.zf?.() ?? 0
    );
  }
  hide(trigger) {
    window.clearTimeout(this.Bc);
    this.Bc = -1;
    peek(() => this.j.C(false, trigger));
    this.Cc = requestAnimationFrame(() => {
      this.Cc = -1;
      const content = this.j.v();
      if (content) {
        const isAnimated = hasAnimation(content);
        const onHide = () => {
          content.style.display = "none";
          this.Ja = null;
        };
        if (isAnimated) {
          this.Ja?.();
          const stop = listenEvent(content, "animationend", onHide, { once: true });
          this.Ja = stop;
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
    this.da = `media-tooltip-${++id}`;
    this.D = signal(null);
    this.v = signal(null);
    new FocusVisibleController();
    const { showDelay } = this.$props;
    new Popper({
      D: this.D,
      v: this.v,
      zf: showDelay,
      Ac(trigger, show, hide) {
        listenEvent(trigger, "touchstart", (e) => e.preventDefault(), {
          passive: false
        });
        listenEvent(trigger, "focus", show);
        listenEvent(trigger, "blur", hide);
        listenEvent(trigger, "mouseenter", show);
        listenEvent(trigger, "mouseleave", hide);
      },
      C: this.fi.bind(this)
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  onSetup() {
    provideContext(tooltipContext, {
      D: this.D,
      v: this.v,
      Kd: this.Kd.bind(this),
      Ld: this.Ld.bind(this),
      Md: this.Md.bind(this),
      Nd: this.Nd.bind(this)
    });
  }
  Kd(el) {
    this.D.set(el);
    let tooltipName = el.getAttribute("data-media-tooltip");
    if (tooltipName) {
      this.el?.setAttribute(`data-media-${tooltipName}-tooltip`, "");
    }
    setAttribute(el, "data-describedby", this.da);
  }
  Ld(el) {
    el.removeAttribute("data-describedby");
    el.removeAttribute("aria-describedby");
    this.D.set(null);
  }
  Md(el) {
    el.setAttribute("id", this.da);
    el.style.display = "none";
    setAttributeIfEmpty(el, "role", "tooltip");
    this.v.set(el);
  }
  Nd(el) {
    el.removeAttribute("id");
    el.removeAttribute("role");
    this.v.set(null);
  }
  fi(isShowing) {
    const trigger = this.D(), content = this.v();
    if (trigger) {
      setAttribute(trigger, "aria-describedby", isShowing ? this.da : null);
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
        this.Ka();
        const tooltip = useContext(tooltipContext);
        onDispose(() => {
          const button = this.Dc();
          button && tooltip.Ld(button);
        });
      })
    );
  }
  Ka() {
    const button = this.Dc(), tooltip = useContext(tooltipContext);
    button && tooltip.Kd(button);
  }
  Dc() {
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
    this.Ka(el);
    Object.assign(el.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "max-content"
    });
  }
  onConnect(el) {
    this.Ka(el);
    const tooltip = useContext(tooltipContext);
    onDispose(() => tooltip.Nd(el));
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        effect(this.Od.bind(this));
      })
    );
  }
  Ka(el) {
    const tooltip = useContext(tooltipContext);
    tooltip.Md(el);
  }
  Od() {
    const { placement, offset: mainOffset, alignOffset } = this.$props;
    return autoPlacement(this.el, this.gi(), placement(), {
      offsetVarName: "media-tooltip",
      xOffset: alignOffset(),
      yOffset: mainOffset()
    });
  }
  gi() {
    return useContext(tooltipContext).D();
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
    this.j = _delegate;
    new FocusVisibleController();
    if (_delegate.lb) {
      new ARIAKeyShortcuts(_delegate.lb);
    }
  }
  onSetup() {
    const { disabled } = this.$props;
    this.setAttributes({
      "data-pressed": this.j.n,
      "aria-pressed": this.hi.bind(this),
      "aria-disabled": () => disabled() ? "true" : null
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    onPress(el, this.ii.bind(this));
    for (const type of ["click", "touchstart"]) {
      this.listen(type, this.ji.bind(this));
    }
  }
  hi() {
    return ariaBool$1(this.j.n());
  }
  ki(event) {
    if (isWriteSignal(this.j.n)) {
      this.j.n.set((p) => !p);
    }
  }
  ii(event) {
    const disabled = this.$props.disabled() || this.el.hasAttribute("data-disabled");
    if (disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    event.preventDefault();
    (this.j.z ?? this.ki).call(this, event);
  }
  ji(event) {
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
    this.Af = signal(false);
    new ToggleButtonController({
      n: this.Af
    });
  }
  get pressed() {
    return this.Af();
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
      n: this.n.bind(this),
      lb: "togglePaused",
      z: this.z.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    const { paused, ended } = this.a.$state;
    this.setAttributes({
      "data-paused": paused,
      "data-ended": ended
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "play");
    setARIALabel(el, this._.bind(this));
  }
  z(event) {
    const remote = this.a.remote;
    this.n() ? remote.pause(event) : remote.play(event);
  }
  n() {
    const { paused } = this.a.$state;
    return !paused();
  }
  _() {
    const { paused } = this.a.$state;
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
      n: this.n.bind(this),
      lb: "toggleCaptions",
      z: this.z.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    this.setAttributes({
      "data-active": this.n.bind(this),
      "data-supported": () => !this.mb(),
      "aria-hidden": $ariaBool(this.mb.bind(this))
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "caption");
    setARIALabel(el, this._.bind(this));
  }
  z(event) {
    this.a.remote.toggleCaptions(event);
  }
  n() {
    const { textTrack } = this.a.$state, track = textTrack();
    return !!track && isTrackCaptionKind(track);
  }
  mb() {
    const { textTracks } = this.a.$state;
    return textTracks().filter(isTrackCaptionKind).length == 0;
  }
  _() {
    const { textTrack } = this.a.$state;
    return textTrack() ? "Closed-Captions Off" : "Closed-Captions On";
  }
}
CaptionButton.props = ToggleButtonController.props;

class FullscreenButton extends Component {
  constructor() {
    super();
    new ToggleButtonController({
      n: this.n.bind(this),
      lb: "toggleFullscreen",
      z: this.z.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    const { fullscreen } = this.a.$state, isSupported = this.Ob.bind(this);
    this.setAttributes({
      "data-active": fullscreen,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "fullscreen");
    setARIALabel(el, this._.bind(this));
  }
  z(event) {
    const remote = this.a.remote, target = this.$props.target();
    this.n() ? remote.exitFullscreen(target, event) : remote.enterFullscreen(target, event);
  }
  n() {
    const { fullscreen } = this.a.$state;
    return fullscreen();
  }
  Ob() {
    const { canFullscreen } = this.a.$state;
    return canFullscreen();
  }
  _() {
    const { fullscreen } = this.a.$state;
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
      n: this.n.bind(this),
      lb: "toggleMuted",
      z: this.z.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    this.setAttributes({
      "data-muted": this.n.bind(this),
      "data-state": this.li.bind(this)
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-mute-button", "");
    el.setAttribute("data-media-tooltip", "mute");
    setARIALabel(el, this._.bind(this));
  }
  z(event) {
    const remote = this.a.remote;
    this.n() ? remote.unmute(event) : remote.mute(event);
  }
  n() {
    const { muted, volume } = this.a.$state;
    return muted() || volume() === 0;
  }
  _() {
    return this.n() ? "Unmute" : "Mute";
  }
  li() {
    const { muted, volume } = this.a.$state, $volume = volume();
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
      n: this.n.bind(this),
      lb: "togglePictureInPicture",
      z: this.z.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    const { pictureInPicture } = this.a.$state, isSupported = this.Ob.bind(this);
    this.setAttributes({
      "data-active": pictureInPicture,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "pip");
    setARIALabel(el, this._.bind(this));
  }
  z(event) {
    const remote = this.a.remote;
    this.n() ? remote.exitPictureInPicture(event) : remote.enterPictureInPicture(event);
  }
  n() {
    const { pictureInPicture } = this.a.$state;
    return pictureInPicture();
  }
  Ob() {
    const { canPictureInPicture } = this.a.$state;
    return canPictureInPicture();
  }
  _() {
    const { pictureInPicture } = this.a.$state;
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
    this.a = useMediaContext();
    const { seeking } = this.a.$state, { seconds } = this.$props, isSupported = this.Ob.bind(this);
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
    setARIALabel(el, this._.bind(this));
  }
  onConnect(el) {
    onPress(el, this.z.bind(this));
  }
  Ob() {
    const { canSeek } = this.a.$state;
    return canSeek();
  }
  _() {
    const { seconds } = this.$props;
    return `Seek ${seconds() > 0 ? "forward" : "backward"} ${seconds()} seconds`;
  }
  z(event) {
    const { seconds, disabled } = this.$props;
    if (disabled())
      return;
    const { currentTime } = this.a.$state, seekTo = currentTime() + seconds();
    this.a.remote.seek(seekTo, event);
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
    this.a = useMediaContext();
    const { disabled } = this.$props, { live, liveEdge } = this.a.$state, isHidden = () => !live();
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
    onPress(el, this.z.bind(this));
  }
  z(event) {
    const { disabled } = this.$props, { liveEdge } = this.a.$state;
    if (disabled() || liveEdge())
      return;
    this.a.remote.seekToLiveEdge(event);
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
    this.j = _delegate;
    this.a = _media;
    this.i = null;
    this.va = null;
    this.nb = null;
    this.ui = functionThrottle(
      (event) => {
        this.wa(this.Ec(event), event);
      },
      20,
      { leading: true }
    );
  }
  onConnect() {
    effect(this.mi.bind(this));
    effect(this.ni.bind(this));
    if (this.j.oi) {
      const provider = this.a.player.el?.querySelector(
        "media-provider,[data-media-provider]"
      );
      if (provider) {
        this.i = provider;
        listenEvent(provider, "touchstart", this.pi.bind(this), {
          passive: true
        });
        listenEvent(provider, "touchmove", this.qi.bind(this), {
          passive: false
        });
      }
    }
  }
  pi(event) {
    this.va = event.touches[0];
  }
  qi(event) {
    if (isNull(this.va) || isTouchPinchEvent(event))
      return;
    const touch = event.touches[0], xDiff = touch.clientX - this.va.clientX, yDiff = touch.clientY - this.va.clientY, isDragging = this.$state.dragging();
    if (!isDragging && Math.abs(yDiff) > 20) {
      return;
    }
    if (isDragging)
      return;
    if (Math.abs(xDiff) > 20) {
      this.va = touch;
      this.nb = this.$state.value();
      this.Pd(this.nb, event);
    }
  }
  mi() {
    if (this.j.L())
      return;
    this.listen("focus", this.Mb.bind(this));
    this.listen("pointerenter", this.Dd.bind(this));
    this.listen("pointermove", this.ri.bind(this));
    this.listen("pointerleave", this.Ed.bind(this));
    this.listen("pointerdown", this.si.bind(this));
    this.listen("keydown", this.Bb.bind(this));
    this.listen("keyup", this.Ab.bind(this));
  }
  ni() {
    if (this.j.L() || !this.$state.dragging())
      return;
    listenEvent(document, "pointerup", this.ti.bind(this));
    listenEvent(document, "pointermove", this.ui.bind(this));
    if (IS_SAFARI) {
      listenEvent(document, "touchmove", this.vi.bind(this), {
        passive: false
      });
    }
  }
  Mb() {
    this.wa(this.$state.value());
  }
  Qd(newValue, trigger) {
    const { value, min, max, dragging } = this.$state;
    const clampedValue = Math.max(min(), Math.min(newValue, max()));
    value.set(clampedValue);
    const event = this.createEvent("value-change", { detail: clampedValue, trigger });
    this.dispatch(event);
    this.j.o?.(event);
    if (dragging()) {
      const event2 = this.createEvent("drag-value-change", { detail: clampedValue, trigger });
      this.dispatch(event2);
      this.j.ob?.(event2);
    }
  }
  wa(value, trigger) {
    const { pointerValue, dragging } = this.$state;
    pointerValue.set(value);
    this.dispatch("pointer-value-change", { detail: value, trigger });
    if (dragging()) {
      this.Qd(value, trigger);
    }
  }
  Ec(event) {
    let thumbPositionRate, rect = this.el.getBoundingClientRect(), { min, max } = this.$state;
    if (this.$props.orientation() === "vertical") {
      const { bottom: trackBottom, height: trackHeight } = rect;
      thumbPositionRate = (trackBottom - event.clientY) / trackHeight;
    } else {
      if (this.va && isNumber(this.nb)) {
        const { width } = this.i.getBoundingClientRect(), rate = (event.clientX - this.va.clientX) / width, range = max() - min(), diff = range * Math.abs(rate);
        thumbPositionRate = (rate < 0 ? this.nb - diff : this.nb + diff) / range;
      } else {
        const { left: trackLeft, width: trackWidth } = rect;
        thumbPositionRate = (event.clientX - trackLeft) / trackWidth;
      }
    }
    return Math.max(
      min(),
      Math.min(
        max(),
        this.j.Pb(
          getValueFromRate(min(), max(), thumbPositionRate, this.j.La())
        )
      )
    );
  }
  Dd(event) {
    this.$state.pointing.set(true);
  }
  ri(event) {
    const { dragging } = this.$state;
    if (dragging())
      return;
    this.wa(this.Ec(event), event);
  }
  Ed(event) {
    this.$state.pointing.set(false);
  }
  si(event) {
    if (event.button !== 0)
      return;
    const value = this.Ec(event);
    this.Pd(value, event);
    this.wa(value, event);
  }
  Pd(value, trigger) {
    const { dragging } = this.$state;
    if (dragging())
      return;
    dragging.set(true);
    this.a.remote.pauseControls(trigger);
    const event = this.createEvent("drag-start", { detail: value, trigger });
    this.dispatch(event);
    this.j.Rd?.(event);
  }
  Bf(value, trigger) {
    const { dragging } = this.$state;
    if (!dragging())
      return;
    dragging.set(false);
    this.a.remote.resumeControls(trigger);
    const event = this.createEvent("drag-end", { detail: value, trigger });
    this.dispatch(event);
    this.j.Fc?.(event);
    this.va = null;
    this.nb = null;
  }
  Bb(event) {
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
      this.wa(newValue, event);
      this.Qd(newValue, event);
      return;
    }
    const value = this.Cf(event);
    if (isUndefined(value))
      return;
    const repeat = key === this.Sd;
    if (!this.$state.dragging() && repeat)
      this.Pd(value, event);
    this.wa(value, event);
    if (!repeat)
      this.Qd(value, event);
    this.Sd = key;
  }
  Ab(event) {
    this.Sd = "";
    const { dragging, value } = this.$state;
    if (!dragging())
      return;
    const newValue = this.Cf(event) ?? value();
    this.wa(newValue);
    this.Bf(newValue, event);
  }
  Cf(event) {
    const { key, shiftKey } = event, isValidKey = Object.keys(SliderKeyDirection).includes(key);
    if (!isValidKey)
      return;
    event.preventDefault();
    event.stopPropagation();
    const { shiftKeyMultiplier } = this.$props;
    const { value, min, max } = this.$state, step = this.j.La(), keyStep = this.j.Qb();
    const modifiedStep = !shiftKey ? keyStep : keyStep * shiftKeyMultiplier(), direction = Number(SliderKeyDirection[key]), diff = modifiedStep * direction, steps = (value() + diff) / step;
    return Math.max(min(), Math.min(max(), Number((step * steps).toFixed(3))));
  }
  // -------------------------------------------------------------------------------------------
  // Document (Pointer Events)
  // -------------------------------------------------------------------------------------------
  ti(event) {
    if (event.button !== 0)
      return;
    const value = this.Ec(event);
    this.wa(value, event);
    this.Bf(value, event);
  }
  vi(event) {
    event.preventDefault();
  }
}

const sliderValueFormatContext = createContext(() => ({}));

const sliderContext = createContext();

class SliderController extends ViewController {
  constructor(_delegate) {
    super();
    this.j = _delegate;
    this.yi = animationFrameThrottle(
      (fillPercent, pointerPercent) => {
        this.el?.style.setProperty("--slider-fill", fillPercent + "%");
        this.el?.style.setProperty("--slider-pointer", pointerPercent + "%");
      }
    );
  }
  onSetup() {
    this.a = useMediaContext();
    const focus = new FocusVisibleController();
    focus.attach(this);
    this.$state.focused = focus.focused.bind(focus);
    if (!hasProvidedContext(sliderValueFormatContext)) {
      provideContext(sliderValueFormatContext, {
        default: "value"
      });
    }
    provideContext(sliderContext, {
      ua: this.$props.orientation,
      Gc: this.j.L,
      Df: signal(null)
    });
    effect(this.E.bind(this));
    effect(this.Rb.bind(this));
    this.wi();
    new SliderEventsController(this.j, this.a).attach(this);
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "role", "slider");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "autocomplete", "off");
    if (IS_SERVER)
      this.Ef();
    else
      effect(this.Ef.bind(this));
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  E() {
    const { dragging, value, min, max } = this.$state;
    if (peek(dragging))
      return;
    value.set(getClampedValue(min(), max(), value(), this.j.La()));
  }
  Rb() {
    if (!this.j.L())
      return;
    const { dragging, pointing } = this.$state;
    dragging.set(false);
    pointing.set(false);
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  xi() {
    return ariaBool$1(this.j.L());
  }
  // -------------------------------------------------------------------------------------------
  // Attributes
  // -------------------------------------------------------------------------------------------
  wi() {
    const { orientation } = this.$props, { dragging, active, pointing } = this.$state;
    this.setAttributes({
      "data-dragging": dragging,
      "data-pointing": pointing,
      "data-active": active,
      "aria-disabled": this.xi.bind(this),
      "aria-valuemin": this.$state.min,
      "aria-valuemax": this.$state.max,
      "aria-valuenow": this.j.ja,
      "aria-valuetext": this.j.ka,
      "aria-orientation": orientation
    });
  }
  Ef() {
    const { fillPercent, pointerPercent } = this.$state;
    this.yi(round(fillPercent(), 3), round(pointerPercent(), 3));
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
      La: this.$props.step,
      Qb: this.$props.keyStep,
      Pb: Math.round,
      L: this.$props.disabled,
      ja: this.ja.bind(this),
      ka: this.ka.bind(this)
    });
  }
  onSetup() {
    effect(this.E.bind(this));
    effect(this.zi.bind(this));
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  ja() {
    const { value } = this.$state;
    return Math.round(value());
  }
  ka() {
    const { value, max } = this.$state;
    return round(value() / max() * 100, 2) + "%";
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  E() {
    const { value } = this.$props;
    this.$state.value.set(value());
  }
  zi() {
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
    this.a = _media;
    this.$cues = signal([]);
    effect(this.Ai.bind(this));
    registry.add(this);
    onDispose(() => registry.delete(this));
  }
  static create($src) {
    const media = useMediaContext();
    return new ThumbnailsLoader($src, media);
  }
  Ai() {
    const { canLoad } = this.a.$state;
    if (!canLoad())
      return;
    const controller = new AbortController(), { crossorigin } = this.a.$state;
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
              this.Ff(src, cues2);
            } catch (e) {
            }
            return;
          }
          const { cues } = await parseResponse(response);
          this.Ff(src, cues);
        } catch (e) {
        }
      });
    }
    return () => {
      controller.abort();
      this.$cues.set([]);
    };
  }
  Ff(currentSrc, cues) {
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
    this.Ud = [];
    this.Gf = animationFrameThrottle(this.Gi.bind(this));
  }
  onSetup() {
    this.a = useMediaContext();
    this.Td = ThumbnailsLoader.create(this.$props.src);
    this.setAttributes({
      "data-loading": this.Sb.bind(this),
      "data-error": this.xa.bind(this),
      "data-hidden": this.$state.hidden,
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onConnect(el) {
    effect(this.Vd.bind(this));
    effect(this.pb.bind(this));
    effect(this.Fa.bind(this));
    effect(this.Bi.bind(this));
    effect(this.Ci.bind(this));
  }
  Vd() {
    const img = this.$state.img();
    if (!img)
      return;
    listenEvent(img, "load", this.rd.bind(this));
    listenEvent(img, "error", this.V.bind(this));
  }
  Fa() {
    const { src, loading, error } = this.$state;
    src();
    loading.set(true);
    error.set(null);
  }
  rd() {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(null);
    this.Gf();
  }
  V(event) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event);
  }
  Sb() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  xa() {
    const { error } = this.$state;
    return !isNull(error());
  }
  pb() {
    const { hidden } = this.$state, { duration } = this.a.$state, cues = this.Td.$cues();
    hidden.set(this.xa() || !Number.isFinite(duration()) || cues.length === 0);
  }
  Hf() {
    return this.$props.time();
  }
  Bi() {
    const time = this.Hf(), { activeCue } = this.$state, { duration } = this.a.$state, cues = this.Td.$cues();
    if (!cues || !Number.isFinite(duration())) {
      activeCue.set(null);
      return;
    }
    activeCue.set(findActiveCue(cues, time));
  }
  Ci() {
    let { activeCue } = this.$state, cue = activeCue(), baseURL = peek(this.$props.src);
    if (!/^https?:/.test(baseURL)) {
      baseURL = location.href;
    }
    if (!baseURL || !cue) {
      this.$state.src.set("");
      this.Di();
      return;
    }
    const [src, coords = ""] = (cue.text || "").split("#");
    this.$state.coords.set(this.Ei(coords));
    this.$state.src.set(this.Fi(src, baseURL));
    this.Gf();
  }
  Fi(src, baseURL) {
    return /^https?:/.test(src) ? src : new URL(src, baseURL).href;
  }
  Ei(coords) {
    const [props, values] = coords.split("="), resolvedCoords = {}, coordValues = values?.split(",");
    if (!props || !values)
      return null;
    for (let i = 0; i < props.length; i++)
      resolvedCoords[props[i]] = +coordValues[i];
    return resolvedCoords;
  }
  Gi() {
    if (!this.scope)
      return;
    const img = this.$state.img(), coords = this.$state.coords();
    if (!img || !this.el)
      return;
    const w = coords?.w ?? img.naturalWidth, h = coords?.h ?? img.naturalHeight, { maxWidth, maxHeight, minWidth, minHeight } = getComputedStyle(this.el), minRatio = Math.max(parseInt(minWidth) / w, parseInt(minHeight) / h), maxRatio = Math.min(parseInt(maxWidth) / w, parseInt(maxHeight) / h), scale = maxRatio < 1 ? maxRatio : minRatio > 1 ? minRatio : 1;
    this.qb(this.el, "--thumbnail-width", `${w * scale}px`);
    this.qb(this.el, "--thumbnail-height", `${h * scale}px`);
    this.qb(img, "width", `${img.naturalWidth * scale}px`);
    this.qb(img, "height", `${img.naturalHeight * scale}px`);
    this.qb(
      img,
      "transform",
      coords ? `translate(-${coords.x * scale}px, -${coords.y * scale}px)` : ""
    );
    this.qb(img, "max-width", "none");
  }
  qb(el, name, value) {
    el.style.setProperty(name, value);
    this.Ud.push(() => el.style.removeProperty(name));
  }
  Di() {
    for (const reset of this.Ud)
      reset();
    this.Ud = [];
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
    this.R = useState(Slider.state);
  }
  Hf() {
    const { duration } = this.a.$state;
    return this.R.pointerRate() * duration();
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
    this.a = useMediaContext();
    this.R = useState(Slider.state);
    this.setAttributes({
      "data-loading": this.Sb.bind(this),
      "data-hidden": this.$state.hidden,
      "data-error": this.xa.bind(this),
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onAttach(el) {
    effect(this.Hi.bind(this));
    effect(this.gd.bind(this));
    effect(this.pb.bind(this));
    effect(this.Ii.bind(this));
    effect(this.Ji.bind(this));
  }
  Hi() {
    const video = this.$state.video();
    if (!video)
      return;
    if (video.readyState >= 2)
      this.ic();
    listenEvent(video, "canplay", this.ic.bind(this));
    listenEvent(video, "error", this.V.bind(this));
  }
  gd() {
    const { src } = this.$state, { canLoad } = this.a.$state;
    src.set(canLoad() ? this.$props.src() : null);
  }
  Sb() {
    const { canPlay, hidden } = this.$state;
    return !canPlay() && !hidden();
  }
  xa() {
    const { error } = this.$state;
    return !isNull(error);
  }
  pb() {
    const { src, hidden } = this.$state, { canLoad, duration } = this.a.$state;
    hidden.set(canLoad() && (!src() || this.xa() || !Number.isFinite(duration())));
  }
  Ii() {
    const { src, canPlay, error } = this.$state;
    src();
    canPlay.set(false);
    error.set(null);
  }
  ic(event) {
    const { canPlay, error } = this.$state;
    canPlay.set(true);
    error.set(null);
    this.dispatch("can-play", { trigger: event });
  }
  V(event) {
    const { canPlay, error } = this.$state;
    canPlay.set(false);
    error.set(event);
    this.dispatch("error", { trigger: event });
  }
  Ji() {
    const { video, canPlay } = this.$state, { duration } = this.a.$state, { pointerRate } = this.R, media = video(), canUpdate = canPlay() && media && Number.isFinite(duration()) && Number.isFinite(pointerRate());
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
    this.R = useState(Slider.state);
    this.Tb = useContext(sliderValueFormatContext);
    this.Ki = computed(this.getValueText.bind(this));
  }
  getValueText() {
    const { type, format, decimalPlaces, padHours, padMinutes, showHours } = this.$props, { value: sliderValue, pointerValue, min, max } = this.R, _format = format() ?? this.Tb.default;
    const value = type() === "current" ? sliderValue() : pointerValue();
    if (_format === "percent") {
      const range = max() - min();
      const percent = value / range * 100;
      return (this.Tb.percent ?? round)(percent, decimalPlaces()) + "\uFE6A";
    } else if (_format === "time") {
      return (this.Tb.time ?? formatTime)(value, padHours(), padMinutes(), showHours());
    } else {
      return this.Tb.value?.(value) ?? value.toFixed(2);
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
    this.R = useContext(sliderContext);
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
    const { Df: _preview } = this.R;
    _preview.set(el);
    onDispose(() => _preview.set(null));
    effect(this.If.bind(this));
    const resize = new ResizeObserver(this.If.bind(this));
    resize.observe(el);
    onDispose(() => resize.disconnect());
  }
  If() {
    const { Gc: _disabled, ua: _orientation } = this.R;
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
    this.Jf = functionThrottle(this.bb.bind(this), 25);
  }
  onSetup() {
    this.a = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "percent"
    });
    new SliderController({
      La: this.$props.step,
      Qb: this.$props.keyStep,
      L: this.$props.disabled,
      Pb: Math.round,
      ja: this.ja.bind(this),
      ka: this.ka.bind(this),
      ob: this.ob.bind(this),
      o: this.o.bind(this)
    }).attach(this);
    effect(this.Gd.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-volume-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Volume");
    const { canSetVolume } = this.a.$state;
    this.setAttributes({
      "data-supported": canSetVolume,
      "aria-hidden": $ariaBool(() => !canSetVolume())
    });
  }
  ja() {
    const { value } = this.$state;
    return Math.round(value());
  }
  ka() {
    const { value, max } = this.$state;
    return round(value() / max() * 100, 2) + "%";
  }
  Gd() {
    const { muted, volume } = this.a.$state;
    const newValue = muted() ? 0 : volume() * 100;
    this.$state.value.set(newValue);
    this.dispatch("value-change", { detail: newValue });
  }
  bb(event) {
    if (!event.trigger)
      return;
    const mediaVolume = round(event.detail / 100, 3);
    this.a.remote.changeVolume(mediaVolume, event);
  }
  o(event) {
    this.Jf(event);
  }
  ob(event) {
    this.Jf(event);
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
    this.Kf = signal(null);
    this.Xd = false;
    new SliderController({
      oi: true,
      La: this.La.bind(this),
      Qb: this.Qb.bind(this),
      L: this.L.bind(this),
      Pb: this.Pb,
      ja: this.ja.bind(this),
      ka: this.ka.bind(this),
      Rd: this.Rd.bind(this),
      ob: this.ob.bind(this),
      Fc: this.Fc.bind(this),
      o: this.o.bind(this)
    });
  }
  onSetup() {
    this.a = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "time",
      value: this.Li.bind(this),
      time: this.Mi.bind(this)
    });
    this.setAttributes({
      "data-chapters": this.Ni.bind(this)
    });
    this.setStyles({
      "--slider-progress": this.Oi.bind(this)
    });
    effect(this.kb.bind(this));
    effect(this.Pi.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-time-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Seek");
  }
  onConnect(el) {
    effect(this.Qi.bind(this));
    observeActiveTextTrack(this.a.textTracks, "chapters", this.Kf.set);
  }
  Oi() {
    const { bufferedEnd, duration } = this.a.$state;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1) * 100, 3) + "%";
  }
  Ni() {
    const { duration } = this.a.$state;
    return this.Kf()?.cues.length && Number.isFinite(duration()) && duration() > 0;
  }
  Pi() {
    this.Wd = functionThrottle(
      this.ra.bind(this),
      this.$props.seekingRequestThrottle()
    );
  }
  kb() {
    const { currentTime } = this.a.$state, { value, dragging } = this.$state, newValue = this.Ri(currentTime());
    if (!peek(dragging)) {
      value.set(newValue);
      this.dispatch("value-change", { detail: newValue });
    }
  }
  Qi() {
    const player = this.a.player.el, { Df: _preview } = useContext(sliderContext);
    player && _preview() && setAttribute(player, "data-preview", this.$state.active());
  }
  ra(time, event) {
    this.a.remote.seeking(time, event);
  }
  Si(time, percent, event) {
    this.Wd.cancel();
    const { live } = this.a.$state;
    if (live() && percent >= 99) {
      this.a.remote.seekToLiveEdge(event);
      return;
    }
    this.a.remote.seek(time, event);
  }
  Rd(event) {
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging()) {
      const { paused } = this.a.$state;
      this.Xd = !paused();
      this.a.remote.pause(event);
    }
  }
  ob(event) {
    this.Wd(this.Ub(event.detail), event);
  }
  Fc(event) {
    const percent = event.detail;
    this.Si(this.Ub(percent), percent, event);
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging() && this.Xd) {
      this.a.remote.play(event);
      this.Xd = false;
    }
  }
  o(event) {
    const { dragging } = this.$state;
    if (dragging() || !event.trigger)
      return;
    this.Fc(event);
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  La() {
    const value = this.$props.step() / this.a.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  Qb() {
    const value = this.$props.keyStep() / this.a.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  Pb(value) {
    return round(value, 3);
  }
  L() {
    const { canSeek } = this.a.$state;
    return this.$props.disabled() || !canSeek();
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  ja() {
    const { value } = this.$state;
    return Math.round(value());
  }
  ka() {
    const time = this.Ub(this.$state.value()), { duration } = this.a.$state;
    return Number.isFinite(time) ? `${formatSpokenTime(time)} out of ${formatSpokenTime(duration())}` : "live";
  }
  // -------------------------------------------------------------------------------------------
  // Format
  // -------------------------------------------------------------------------------------------
  Ub(percent) {
    const { duration } = this.a.$state;
    return round(percent / 100 * duration(), 5);
  }
  Ri(time) {
    const { liveEdge, duration } = this.a.$state, rate = Math.max(0, Math.min(1, liveEdge() ? 1 : Math.min(time, duration()) / duration()));
    return Number.isNaN(rate) ? 0 : Number.isFinite(rate) ? rate * 100 : 100;
  }
  Li(percent) {
    const time = this.Ub(percent), { live, duration } = this.a.$state;
    return Number.isFinite(time) ? (live() ? time - duration() : time).toFixed(0) : "LIVE";
  }
  Mi(percent, padHours, padMinutes, showHours) {
    const time = this.Ub(percent), { live, duration } = this.a.$state, value = live() ? time - duration() : time;
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
    this.Ma = null;
    this.S = [];
    this.Hc = signal(null);
    this.$ = signal([]);
    this.Vb = signal(-1);
    this.Ic = signal(-1);
    this._d = 0;
    this.Yi = animationFrameThrottle((bufferedPercent) => {
      let percent, cues = this.$();
      for (let i = this._d; i < this.S.length; i++) {
        percent = this.be(cues[i], bufferedPercent);
        this.S[i]?.style.setProperty("--chapter-progress", percent + "%");
        if (percent < 100) {
          this._d = i;
          break;
        }
      }
    });
    this.Zi = computed(this._i.bind(this));
    this.aj = functionDebounce(
      () => {
        const track = peek(this.Hc);
        if (!this.scope || !track || !track.cues.length)
          return;
        this.$.set(this.$i(track.cues));
        this.Vb.set(0);
      },
      150,
      true
    );
  }
  get cues() {
    return this.$();
  }
  get activeCue() {
    return this.$()[this.Vb()] || null;
  }
  get activePointerCue() {
    return this.$()[this.Ic()] || null;
  }
  onSetup() {
    this.a = useMediaContext();
    this.Yd = useState(TimeSlider.state);
  }
  onAttach(el) {
    observeActiveTextTrack(this.a.textTracks, "chapters", this.Lf.bind(this));
    effect(this.$d.bind(this));
  }
  onConnect() {
    onDispose(() => this.I.bind(this));
  }
  onDestroy() {
    this.Lf(null);
  }
  setRefs(refs) {
    this.S = refs;
    this.Zd?.dispose();
    if (this.S.length === 1) {
      const el = this.S[0];
      el.style.width = "100%";
      el.style.setProperty("--chapter-fill", "var(--slider-fill)");
      el.style.setProperty("--chapter-progress", "var(--slider-progress)");
    } else if (this.S.length > 0) {
      scoped(() => this.Ti(), this.Zd = createScope());
    }
  }
  Lf(track) {
    if (peek(this.Hc) === track)
      return;
    this.I();
    this.Hc.set(track);
  }
  I() {
    this.S = [];
    this.$.set([]);
    this.Vb.set(-1);
    this.Ic.set(-1);
    this._d = 0;
    this.Zd?.dispose();
  }
  Ti() {
    if (!this.S.length)
      return;
    effect(this.Ui.bind(this));
    effect(this.Vi.bind(this));
    effect(this.Wi.bind(this));
    effect(this.Xi.bind(this));
  }
  Ui() {
    let cue, cues = this.$(), endTime = cues[cues.length - 1].endTime;
    for (let i = 0; i < cues.length; i++) {
      cue = cues[i];
      if (this.S[i]) {
        this.S[i].style.width = round((cue.endTime - cue.startTime) / endTime * 100, 3) + "%";
      }
    }
  }
  Vi() {
    let { liveEdge, ended } = this.a.$state, { fillPercent, value } = this.Yd, cues = this.$(), isLiveEdge = liveEdge(), prevActiveIndex = peek(this.Vb), currentChapter = cues[prevActiveIndex];
    let currentActiveIndex = isLiveEdge ? this.$.length - 1 : this.Mf(
      currentChapter ? currentChapter.startTime <= peek(value) ? prevActiveIndex : 0 : 0,
      fillPercent()
    );
    if (isLiveEdge || ended() || !currentChapter) {
      this.ae(0, cues.length, "100%");
    } else if (currentActiveIndex > prevActiveIndex) {
      this.ae(prevActiveIndex, currentActiveIndex, "100%");
    } else if (currentActiveIndex < prevActiveIndex) {
      this.ae(currentActiveIndex + 1, prevActiveIndex + 1, "0%");
    }
    const percent = isLiveEdge ? "100%" : this.be(cues[currentActiveIndex], fillPercent()) + "%";
    this.Nf(this.S[currentActiveIndex], percent);
    this.Vb.set(currentActiveIndex);
  }
  Wi() {
    let { pointing, pointerPercent } = this.Yd;
    if (!pointing()) {
      this.Ic.set(-1);
      return;
    }
    const activeIndex = this.Mf(0, pointerPercent());
    this.Ic.set(activeIndex);
  }
  ae(start, end, percent) {
    for (let i = start; i < end; i++)
      this.Nf(this.S[i], percent);
  }
  Nf(ref, percent) {
    ref && ref.style.setProperty("--chapter-fill", percent);
  }
  Mf(startIndex, percent) {
    let chapterPercent = 0, cues = this.$();
    for (let i = startIndex; i < cues.length; i++) {
      chapterPercent = this.be(cues[i], percent);
      if (chapterPercent >= 0 && chapterPercent < 100)
        return i;
    }
    return 0;
  }
  Xi() {
    this.Yi(this.Zi());
  }
  _i() {
    const { bufferedEnd, duration } = this.a.$state;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1), 3) * 100;
  }
  be(cue, percent) {
    const cues = this.$();
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
  $i(cues) {
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
  $d() {
    if (!this.scope)
      return;
    const { disabled } = this.$props;
    if (disabled())
      return;
    const track = this.Hc();
    if (track) {
      const onCuesChange = this.aj.bind(this);
      onCuesChange();
      onDispose(listenEvent(track, "add-cue", onCuesChange));
      onDispose(listenEvent(track, "remove-cue", onCuesChange));
    }
    this.Ma = this.bj();
    if (this.Ma)
      effect(this.cj.bind(this));
    return () => {
      if (this.Ma) {
        this.Ma.textContent = "";
        this.Ma = null;
      }
    };
  }
  cj() {
    const cue = this.activePointerCue || this.activeCue;
    if (this.Ma)
      this.Ma.textContent = cue?.text || "";
  }
  dj() {
    let node = this.el;
    while (node && node.getAttribute("role") !== "slider") {
      node = node.parentElement;
    }
    return node;
  }
  bj() {
    const slider = this.dj();
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
    this.j = _delegate;
    this.la = 0;
    this.ya = null;
    this.ea = [];
  }
  get s() {
    return this.ea;
  }
  Of(el) {
    listenEvent(el, "focus", this.Mb.bind(this));
    this.ya = el;
    onDispose(() => {
      this.ya = null;
    });
    return this;
  }
  Ac() {
    if (!this.ya)
      return;
    this.fa();
    listenEvent(this.ya, "keyup", this.Ab.bind(this));
    listenEvent(this.ya, "keydown", this.Bb.bind(this));
    onDispose(() => {
      this.la = 0;
      this.ea = [];
    });
  }
  fa() {
    this.la = 0;
    this.ea = this.ej();
  }
  Pf(index = this.Qf()) {
    const element = this.ea[index], container = this.j.fj();
    if (element && container) {
      requestAnimationFrame(() => {
        container.scrollTop = element.offsetTop - container.offsetHeight / 2 + element.offsetHeight / 2;
      });
    }
  }
  rb(index) {
    this.la = index;
    this.ea[index]?.focus();
    this.Pf(index);
  }
  Qf() {
    return this.ea.findIndex((el) => el.getAttribute("aria-checked") === "true");
  }
  Mb() {
    this.fa();
    setTimeout(() => {
      const index = this.Qf();
      this.rb(index >= 0 ? index : 0);
    }, 100);
  }
  Ab(event) {
    if (!VALID_KEYS.has(event.key))
      return;
    event.stopPropagation();
    event.preventDefault();
  }
  Bb(event) {
    if (!VALID_KEYS.has(event.key))
      return;
    event.stopPropagation();
    event.preventDefault();
    switch (event.key) {
      case "Escape":
        this.j.gj(event);
        break;
      case "Tab":
        this.rb(this.ce(event.shiftKey ? -1 : 1));
        break;
      case "ArrowUp":
        this.rb(this.ce(-1));
        break;
      case "ArrowDown":
        this.rb(this.ce(1));
        break;
      case "Home":
      case "PageUp":
        this.rb(0);
        break;
      case "End":
      case "PageDown":
        this.rb(this.ea.length - 1);
        break;
    }
  }
  ce(delta) {
    let index = this.la;
    do {
      index = (index + delta + this.ea.length) % this.ea.length;
    } while (this.ea[index]?.offsetParent === null);
    return index;
  }
  ej() {
    if (!this.ya)
      return [];
    const focusableElements = this.ya.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR), elements = [];
    const is = (node) => {
      return node.getAttribute("role") === "menu";
    };
    for (const el of focusableElements) {
      if (el instanceof HTMLElement && el.offsetParent !== null && // does not have display: none
      isElementParent(this.ya, el, is)) {
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
    this.M = signal(false);
    this.Gc = signal(false);
    this.D = signal(null);
    this.v = signal(null);
    this.Rf = signal(false);
    this.Wb = /* @__PURE__ */ new Set();
    this.Jc = null;
    this.sj = this.tj.bind(this);
    this.qj = this.uj.bind(this);
    this.rj = this.vj.bind(this);
    const { showDelay } = this.$props;
    this.Kc = new Popper({
      D: this.D,
      v: this.v,
      zf: showDelay,
      Ac: (trigger, show, hide) => {
        onPress(trigger, (event) => {
          if (this.M())
            hide(event);
          else
            show(event);
        });
        const closeTarget = this.hj();
        if (closeTarget) {
          onPress(closeTarget, (event) => {
            event.stopPropagation();
            hide(event);
          });
        }
      },
      C: this.ij.bind(this)
    });
  }
  get triggerElement() {
    return this.D();
  }
  get contentElement() {
    return this.v();
  }
  get isSubmenu() {
    return !!this.fe;
  }
  onSetup() {
    this.a = useMediaContext();
    const currentIdCount = ++idCount;
    this.de = `media-menu-${currentIdCount}`;
    this.ee = `media-menu-button-${currentIdCount}`;
    this.sb = new MenuFocusController({
      fj: this.jj.bind(this),
      gj: this.close.bind(this)
    });
    if (hasProvidedContext(menuContext)) {
      this.fe = useContext(menuContext);
    }
    this.setAttributes({
      "data-open": this.M,
      "data-submenu": this.isSubmenu,
      "data-disabled": this.L.bind(this)
    });
    provideContext(menuContext, {
      kj: this.D,
      M: this.M,
      Xb: signal(""),
      Na: this.Na.bind(this),
      ge: this.ge.bind(this),
      he: this.he.bind(this),
      ie: this.ie.bind(this),
      je: this.je.bind(this),
      ke: this.ke.bind(this)
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
    this.sb.Of(el);
  }
  onConnect(el) {
    effect(this.lj.bind(this));
    if (this.isSubmenu)
      this.fe?.ke(this);
    requestAnimationFrame(() => {
      this.P();
    });
  }
  onDestroy() {
    this.D.set(null);
    this.v.set(null);
    this.Jc = null;
  }
  lj() {
    const expanded = this.mj();
    this.P();
    this.Sf(expanded);
    if (!expanded)
      return;
    effect(() => {
      const { height } = this.a.$state, content = this.v();
      content && setStyle(content, "--player-height", height() + "px");
    });
    this.sb.Ac();
    this.listen("pointerup", this.nj.bind(this));
    listenEvent(window, "pointerup", this.oj.bind(this));
  }
  ge(button) {
    const el = button.el, isMenuItem = this.isSubmenu, isARIADisabled = $ariaBool(this.L.bind(this));
    setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
    setAttributeIfEmpty(el, "role", isMenuItem ? "menuitem" : "button");
    setAttribute(el, "id", this.ee);
    setAttribute(el, "aria-haspopup", "menu");
    setAttribute(el, "aria-expanded", "false");
    setAttribute(el, "data-submenu", this.isSubmenu);
    if (!this.isSubmenu) {
      this.Tf(el);
    }
    const watchAttrs = () => {
      setAttribute(el, "data-open", this.M());
      setAttribute(el, "aria-disabled", isARIADisabled());
    };
    if (IS_SERVER)
      watchAttrs();
    else
      effect(watchAttrs);
    this.D.set(el);
    onDispose(() => {
      this.D.set(null);
    });
  }
  he(items) {
    const el = items.el;
    el.style.setProperty("display", "none");
    setAttribute(el, "id", this.de);
    setAttributeIfEmpty(el, "role", "menu");
    setAttributeIfEmpty(el, "tabindex", "-1");
    setAttribute(el, "data-submenu", this.isSubmenu);
    this.v.set(el);
    onDispose(() => this.v.set(null));
    if (!this.isSubmenu) {
      this.Tf(el);
    }
    const watchAttrs = () => {
      setAttribute(el, "data-open", this.M());
    };
    if (IS_SERVER)
      watchAttrs();
    else
      effect(watchAttrs);
    this.sb.Of(el);
    this.Sf(false);
    if (!IS_SERVER) {
      const onResize = animationFrameThrottle(this.P.bind(this)), mutations = new MutationObserver(onResize);
      onResize();
      mutations.observe(el, { childList: true, subtree: true });
      onDispose(() => mutations.disconnect());
    }
  }
  ie(observer) {
    this.Jc = observer;
  }
  Tf(el) {
    listenEvent(el, "click", (e) => e.stopPropagation());
    listenEvent(el, "pointerup", (e) => e.stopPropagation());
  }
  Sf(expanded) {
    const content = peek(this.v);
    if (content)
      setAttribute(content, "aria-hidden", ariaBool$1(!expanded));
  }
  je(disabled) {
    this.Rf.set(disabled);
  }
  ij(isExpanded, event) {
    event?.stopPropagation();
    if (this.M() === isExpanded)
      return;
    if (this.L()) {
      if (isExpanded)
        this.Kc.hide(event);
      return;
    }
    const trigger = this.D(), content = this.v();
    if (trigger) {
      setAttribute(trigger, "aria-controls", isExpanded && this.de);
      setAttribute(trigger, "aria-expanded", ariaBool$1(isExpanded));
    }
    if (content)
      setAttribute(content, "aria-labelledby", isExpanded && this.ee);
    this.M.set(isExpanded);
    this.pj(event);
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
      if (!this.isSubmenu && this.a.activeMenu !== this) {
        this.a.activeMenu?.close(event);
        this.a.activeMenu = this;
      }
      this.Jc?.le?.(event);
    } else {
      if (this.isSubmenu) {
        setTimeout(() => {
          for (const el of this.Wb)
            el.close(event);
        }, 300);
      } else {
        this.a.activeMenu = null;
      }
      this.Jc?.Uj?.(event);
    }
    if (isExpanded && !isKeyboardEvent(event)) {
      requestAnimationFrame(() => {
        this.sb.fa();
        setTimeout(() => {
          this.sb.Pf();
        }, 100);
      });
    }
  }
  mj() {
    return !this.L() && this.M();
  }
  L() {
    return this.Gc() || this.Rf();
  }
  Na(disabled) {
    this.Gc.set(disabled);
  }
  nj(event) {
    event.stopPropagation();
  }
  oj(event) {
    if (this.isSubmenu)
      return setTimeout(this.close.bind(this, event), 800);
    else
      this.close(event);
  }
  hj() {
    const target = this.el.querySelector('[data-part="close-target"]');
    return isElementParent(this.el, target, (node) => node.getAttribute("role") === "menu") ? target : null;
  }
  jj() {
    if (!this.isSubmenu) {
      const content = peek(this.v);
      return content || null;
    } else {
      let el = this.el;
      while (el && el.tagName !== "media-menu" && el.hasAttribute("data-submenu")) {
        el = el.parentNode;
      }
      return el;
    }
  }
  pj(trigger) {
    if (this.isSubmenu)
      return;
    if (this.M())
      this.a.remote.pauseControls(trigger);
    else
      this.a.remote.resumeControls(trigger);
  }
  ke(menu) {
    this.Wb.add(menu);
    listenEvent(menu, "open", this.qj);
    listenEvent(menu, "close", this.rj);
    onDispose(this.sj);
  }
  tj(menu) {
    this.Wb.delete(menu);
  }
  uj(event) {
    for (const target of this.Wb) {
      if (target !== event.target) {
        for (const el of [target.el, target.triggerElement]) {
          el?.setAttribute("aria-hidden", "true");
        }
      }
    }
    requestAnimationFrame(() => {
      this.P();
    });
  }
  vj() {
    for (const target of this.Wb) {
      for (const el of [target.el, target.triggerElement]) {
        el?.setAttribute("aria-hidden", "false");
      }
    }
    requestAnimationFrame(() => {
      this.P();
    });
  }
  P() {
    const content = peek(this.v);
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
    if (peek(this.M))
      return;
    this.Kc.show(trigger);
    tick();
  }
  close(trigger) {
    if (!peek(this.M))
      return;
    this.Kc.hide(trigger);
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
    return this.l?.M() ?? false;
  }
  onSetup() {
    this.l = useContext(menuContext);
  }
  onAttach(el) {
    this.l.ge(this);
    effect(this.Rb.bind(this));
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    const hint = Array.from(el.querySelectorAll('[data-part="hint"]')).pop();
    if (hint) {
      effect(() => {
        const text = this.l.Xb();
        if (text)
          hint.textContent = text;
      });
    }
    onPress(el, (trigger) => {
      this.dispatch("select", { trigger });
    });
  }
  Rb() {
    this.l.je(this.$props.disabled());
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
    this.B = null;
  }
  onSetup() {
    this.a = useMediaContext();
    provideContext(menuPortalContext, {
      Ka: this.wj.bind(this)
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  // Need this so connect scope is defined.
  onConnect(el) {
  }
  onDestroy() {
    this.B?.remove();
    this.B = null;
  }
  wj(el) {
    this.Uf(false);
    this.B = el;
    requestScopedAnimationFrame(() => {
      requestScopedAnimationFrame(() => {
        if (!this.connectScope)
          return;
        effect(this.Rb.bind(this));
      });
    });
  }
  Rb() {
    const { fullscreen } = this.a.$state, { disabled } = this.$props, _disabled = disabled();
    this.Uf(_disabled === "fullscreen" ? !fullscreen() : !_disabled);
  }
  Uf(shouldPortal) {
    if (!this.B)
      return;
    let container = this.xj(this.$props.container());
    if (!container)
      return;
    const isPortalled = this.B.parentElement === container;
    setAttribute(this.B, "data-portal", shouldPortal);
    if (shouldPortal) {
      if (!isPortalled) {
        this.B.remove();
        container.append(this.B);
      }
    } else if (isPortalled && this.B.parentElement === container) {
      this.B.remove();
      this.el?.append(this.B);
    }
  }
  xj(selector) {
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
    this.l = useContext(menuContext);
    this.l.he(this);
    if (hasProvidedContext(menuPortalContext)) {
      const portal = useContext(menuPortalContext);
      if (portal) {
        provideContext(menuPortalContext, null);
        portal.Ka(el);
        onDispose(() => portal.Ka(null));
      }
    }
  }
  onConnect(el) {
    effect(this.Od.bind(this));
  }
  Od() {
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
      return autoPlacement(this.el, this.Dc(), placement, {
        offsetVarName: "media-menu",
        xOffset: alignOffset(),
        yOffset: mainOffset()
      });
    } else {
      this.el.removeAttribute("style");
      this.el.style.display = "none";
    }
  }
  Dc() {
    return this.l.kj();
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
    this.tb = /* @__PURE__ */ new Set();
    this.ma = signal("");
    this.d = null;
    this.Bj = this.C.bind(this);
  }
  get yj() {
    return Array.from(this.tb).map((radio) => radio.ma());
  }
  get value() {
    return this.ma();
  }
  set value(value) {
    this.C(value);
  }
  onSetup() {
    provideContext(radioControllerContext, {
      add: this.zj.bind(this),
      remove: this.Aj.bind(this)
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    if (!isMenuItem)
      setAttributeIfEmpty(el, "role", "radiogroup");
    this.setAttributes({ value: this.ma });
  }
  onDestroy() {
    this.tb.clear();
  }
  zj(radio) {
    if (this.tb.has(radio))
      return;
    this.tb.add(radio);
    radio.Lc = this.Bj;
    radio.Yb(radio.ma() === this.ma());
  }
  Aj(radio) {
    radio.Lc = null;
    this.tb.delete(radio);
  }
  C(newValue, trigger) {
    const currentValue = peek(this.ma);
    if (!newValue || newValue === currentValue)
      return;
    const currentRadio = this.Vf(currentValue), newRadio = this.Vf(newValue);
    currentRadio?.Yb(false, trigger);
    newRadio?.Yb(true, trigger);
    this.ma.set(newValue);
    this.o?.(newValue, trigger);
  }
  Vf(newValue) {
    for (const radio of this.tb) {
      if (newValue === peek(radio.ma))
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
    this.d = new RadioGroupController();
    this.d.o = this.o.bind(this);
  }
  get values() {
    return this.d.yj;
  }
  get value() {
    return this.d.value;
  }
  set value(newValue) {
    this.d.value = newValue;
  }
  onSetup() {
    if (IS_SERVER)
      this.E();
    else
      effect(this.E.bind(this));
  }
  E() {
    this.d.value = this.$props.value();
  }
  o(value, trigger) {
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
    this.Oa = signal(false);
    this.d = {
      ma: this.$props.value,
      Yb: this.Yb.bind(this),
      Lc: null
    };
    new FocusVisibleController();
  }
  get checked() {
    return this.Oa();
  }
  onSetup() {
    this.setAttributes({
      value: this.$props.value,
      "data-checked": this.Oa,
      "aria-checked": $ariaBool(this.Oa)
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
    setAttributeIfEmpty(el, "role", isMenuItem ? "menuitemradio" : "radio");
    effect(this.E.bind(this));
  }
  onConnect(el) {
    this.Cj();
    onPress(el, this.z.bind(this));
    onDispose(this.za.bind(this));
  }
  za() {
    scoped(() => {
      const group = useContext(radioControllerContext);
      group.remove(this.d);
    }, this.connectScope);
  }
  Cj() {
    const group = useContext(radioControllerContext);
    group.add(this.d);
  }
  E() {
    const { value } = this.$props, newValue = value();
    if (peek(this.Oa)) {
      this.d.Lc?.(newValue);
    }
  }
  z(event) {
    if (peek(this.Oa))
      return;
    this.C(true, event);
    this.Dj(event);
    this.d.Lc?.(peek(this.$props.value), event);
  }
  Yb(value, trigger) {
    if (peek(this.Oa) === value)
      return;
    this.C(value, trigger);
  }
  C(value, trigger) {
    this.Oa.set(value);
    this.dispatch("change", { detail: value, trigger });
  }
  Dj(trigger) {
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
    this.la = signal(0);
    this.A = signal(null);
    this.K = signal([]);
    this.d = new RadioGroupController();
    this.d.o = this.o.bind(this);
  }
  get value() {
    return this.d.value;
  }
  get disabled() {
    return !this.K()?.length;
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.l = useContext(menuContext);
    }
    const { thumbnails } = this.$props;
    this.setAttributes({
      "data-thumbnails": () => !!thumbnails()
    });
  }
  onAttach(el) {
    this.l?.ie({
      le: this.le.bind(this)
    });
  }
  getOptions() {
    return this.K().map((cue, i) => ({
      cue,
      value: i + "",
      label: cue.text,
      startTime: formatTime(cue.startTime, false),
      duration: formatSpokenTime(cue.endTime - cue.startTime)
    }));
  }
  le() {
    peek(() => this.kb());
  }
  onConnect(el) {
    effect(this.E.bind(this));
    effect(this.kb.bind(this));
    effect(this.na.bind(this));
    effect(this.Hk.bind(this));
    observeActiveTextTrack(this.a.textTracks, "chapters", this.A.set);
  }
  Hk() {
    const track = this.A();
    if (!track)
      return;
    const onCuesChange = this.aj.bind(this, track);
    onCuesChange();
    listenEvent(track, "add-cue", onCuesChange);
    listenEvent(track, "remove-cue", onCuesChange);
    return () => {
      this.K.set([]);
    };
  }
  aj(track) {
    this.K.set([...track.cues]);
  }
  E() {
    this.d.value = this.oa();
  }
  kb() {
    if (!this.l?.M())
      return;
    const track = this.A();
    if (!track) {
      this.la.set(-1);
      return;
    }
    const { currentTime } = this.a.$state, time = currentTime(), activeCueIndex = track.cues.findIndex((cue) => isCueActive(cue, time));
    this.la.set(activeCueIndex);
    if (activeCueIndex >= 0) {
      const cue = track.cues[activeCueIndex], radio = this.el.querySelector(`[aria-checked='true']`), playedPercent = (time - cue.startTime) / (cue.endTime - cue.startTime) * 100;
      radio && setStyle(radio, "--progress", round(playedPercent, 3) + "%");
    }
  }
  na() {
    this.l?.Na(this.disabled);
  }
  oa() {
    return this.la() + "";
  }
  o(value, trigger) {
    if (this.disabled || !trigger)
      return;
    const index = +value, cues = this.A()?.cues;
    if (isNumber(index) && cues?.[index]) {
      this.la.set(index);
      this.a.remote.seek(cues[index].startTime, trigger);
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
    this.d = new RadioGroupController();
    this.d.o = this.o.bind(this);
  }
  get value() {
    return this.d.value;
  }
  get disabled() {
    const { audioTracks } = this.a.$state;
    return audioTracks().length === 0;
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.l = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.E.bind(this));
    effect(this.na.bind(this));
    effect(this.Pa.bind(this));
  }
  getOptions() {
    const { audioTracks } = this.a.$state;
    return audioTracks().map((track) => ({
      track,
      label: track.label,
      value: track.label.toLowerCase()
    }));
  }
  E() {
    this.d.value = this.oa();
  }
  Pa() {
    const { emptyLabel } = this.$props, { audioTrack } = this.a.$state, track = audioTrack();
    this.l?.Xb.set(track?.label ?? emptyLabel());
  }
  na() {
    this.l?.Na(this.disabled);
  }
  oa() {
    const { audioTrack } = this.a.$state;
    const track = audioTrack();
    return track ? track.label.toLowerCase() : "";
  }
  o(value, trigger) {
    if (this.disabled)
      return;
    const index = this.a.audioTracks.toArray().findIndex((track) => track.label.toLowerCase() === value);
    if (index >= 0) {
      const track = this.a.audioTracks[index];
      this.a.remote.changeAudioTrack(index, trigger);
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
    this.d = new RadioGroupController();
    this.d.o = this.o.bind(this);
  }
  get value() {
    return this.d.value;
  }
  get disabled() {
    const { textTracks } = this.a.$state;
    return textTracks().filter(isTrackCaptionKind).length === 0;
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.l = useContext(menuContext);
    }
  }
  onConnect(el) {
    super.onConnect?.(el);
    effect(this.E.bind(this));
    effect(this.na.bind(this));
    effect(this.Pa.bind(this));
  }
  getOptions() {
    const { offLabel } = this.$props, { textTracks } = this.a.$state;
    return [
      { value: "off", label: offLabel },
      ...textTracks().filter(isTrackCaptionKind).map((track) => ({
        track,
        label: track.label,
        value: this.Nk(track)
      }))
    ];
  }
  E() {
    this.d.value = this.oa();
  }
  Pa() {
    const { offLabel } = this.$props, { textTrack } = this.a.$state, track = textTrack();
    this.l?.Xb.set(
      track && isTrackCaptionKind(track) && track.mode === "showing" ? track.label : offLabel()
    );
  }
  na() {
    this.l?.Na(this.disabled);
  }
  oa() {
    const { textTrack } = this.a.$state, track = textTrack();
    return track && isTrackCaptionKind(track) && track.mode === "showing" ? this.Nk(track) : "off";
  }
  o(value, trigger) {
    if (this.disabled)
      return;
    if (value === "off") {
      const track = this.a.textTracks.selected;
      if (track) {
        const index2 = this.a.textTracks.toArray().indexOf(track);
        this.a.remote.changeTextTrackMode(index2, "disabled", trigger);
        this.dispatch("change", { detail: null, trigger });
      }
      return;
    }
    const index = this.a.textTracks.toArray().findIndex((track) => this.Nk(track) === value);
    if (index >= 0) {
      const track = this.a.textTracks[index];
      this.a.remote.changeTextTrackMode(index, "showing", trigger);
      this.dispatch("change", { detail: track, trigger });
    }
  }
  Nk(track) {
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
    this.d = new RadioGroupController();
    this.d.o = this.o.bind(this);
  }
  get value() {
    return this.d.value;
  }
  get disabled() {
    const { rates } = this.$props, { canSetPlaybackRate } = this.a.$state;
    return !canSetPlaybackRate() || rates().length === 0;
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.l = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.E.bind(this));
    effect(this.Pa.bind(this));
    effect(this.na.bind(this));
  }
  getOptions() {
    const { rates, normalLabel } = this.$props;
    return rates().map((rate) => ({
      label: rate === 1 ? normalLabel : rate + "\xD7",
      value: rate + ""
    }));
  }
  E() {
    this.d.value = this.oa();
  }
  Pa() {
    const { normalLabel } = this.$props, { playbackRate } = this.a.$state, rate = playbackRate();
    this.l?.Xb.set(rate === 1 ? normalLabel() : rate + "\xD7");
  }
  na() {
    this.l?.Na(this.disabled);
  }
  oa() {
    const { playbackRate } = this.a.$state;
    return playbackRate() + "";
  }
  o(value, trigger) {
    if (this.disabled)
      return;
    const rate = +value;
    this.a.remote.changePlaybackRate(rate, trigger);
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
    this.Ej = computed(() => {
      const { qualities } = this.a.$state;
      return [...qualities()].sort(
        (a, b) => b.height === a.height ? b.bitrate - a.bitrate : b.height - a.height
      );
    });
    this.d = new RadioGroupController();
    this.d.o = this.o.bind(this);
  }
  get value() {
    return this.d.value;
  }
  get disabled() {
    const { canSetQuality, qualities } = this.a.$state;
    return !canSetQuality() || qualities().length === 0;
  }
  onSetup() {
    this.a = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.l = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.E.bind(this));
    effect(this.na.bind(this));
    effect(this.Pa.bind(this));
  }
  getOptions() {
    const { autoLabel, hideBitrate } = this.$props;
    return [
      { value: "auto", label: autoLabel },
      ...this.Ej().map((quality) => {
        const rate = quality.bitrate >= 0 ? `${round(quality.bitrate / 1e6, 2)} Mbps` : null;
        return {
          quality,
          label: quality.height + "p",
          value: this.me(quality),
          bitrate: () => !hideBitrate() ? rate : null
        };
      })
    ];
  }
  E() {
    this.d.value = this.oa();
  }
  Pa() {
    const { autoLabel } = this.$props, { autoQuality, quality } = this.a.$state, qualityText = quality() ? quality().height + "p" : "";
    this.l?.Xb.set(
      !autoQuality() ? qualityText : autoLabel() + (qualityText ? ` (${qualityText})` : "")
    );
  }
  na() {
    this.l?.Na(this.disabled);
  }
  o(value, trigger) {
    if (this.disabled)
      return;
    if (value === "auto") {
      this.a.remote.changeQuality(-1, trigger);
      this.dispatch("change", { detail: "auto", trigger });
      return;
    }
    const { qualities } = this.a.$state, index = peek(qualities).findIndex((quality) => this.me(quality) === value);
    if (index >= 0) {
      const quality = peek(qualities)[index];
      this.a.remote.changeQuality(index, trigger);
      this.dispatch("change", { detail: quality, trigger });
    }
  }
  oa() {
    const { quality, autoQuality } = this.a.$state;
    if (autoQuality())
      return "auto";
    const currentQuality = quality();
    return currentQuality ? this.me(currentQuality) : "auto";
  }
  me(quality) {
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
    this.i = null;
    this.Qa = 0;
    this.Wf = -1;
  }
  onSetup() {
    this.a = useMediaContext();
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
    this.i = this.a.player.el?.querySelector(
      "[data-media-provider]"
    );
    effect(this.Fj.bind(this));
  }
  Fj() {
    let eventType = this.$props.event();
    if (!this.i || !eventType)
      return;
    if (/^dbl/.test(eventType)) {
      eventType = eventType.split(/^dbl/)[1];
    }
    if (eventType === "pointerup" || eventType === "pointerdown") {
      const pointer = this.a.$state.pointer();
      if (pointer === "coarse") {
        eventType = eventType === "pointerup" ? "touchend" : "touchstart";
      }
    }
    listenEvent(
      this.i,
      eventType,
      this.Gj.bind(this),
      { passive: false }
    );
  }
  Gj(event) {
    if (isPointerEvent(event) && (event.button !== 0 || this.a.activeMenu) || isTouchEvent(event) && this.a.activeMenu || isTouchPinchEvent(event) || !this.Hj(event)) {
      return;
    }
    event.MEDIA_GESTURE = true;
    event.preventDefault();
    const eventType = peek(this.$props.event), isDblEvent = eventType?.startsWith("dbl");
    if (!isDblEvent) {
      if (this.Qa === 0) {
        setTimeout(() => {
          if (this.Qa === 1)
            this.Xf(event);
        }, 250);
      }
    } else if (this.Qa === 1) {
      queueMicrotask(() => this.Xf(event));
      clearTimeout(this.Wf);
      this.Qa = 0;
      return;
    }
    if (this.Qa === 0) {
      this.Wf = window.setTimeout(() => {
        this.Qa = 0;
      }, 275);
    }
    this.Qa++;
  }
  Xf(event) {
    this.el.setAttribute("data-triggered", "");
    requestAnimationFrame(() => {
      if (this.Ij()) {
        this.Jj(peek(this.$props.action), event);
      }
      requestAnimationFrame(() => {
        this.el.removeAttribute("data-triggered");
      });
    });
  }
  /** Validate event occurred in gesture bounds. */
  Hj(event) {
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
  Ij() {
    const gestures = this.a.player.el.querySelectorAll(
      "[data-media-gesture][data-triggered]"
    );
    return Array.from(gestures).sort(
      (a, b) => +getComputedStyle(b).zIndex - +getComputedStyle(a).zIndex
    )[0] === this.el;
  }
  Jj(action, trigger) {
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
      this.a.remote.toggleFullscreen("prefer-media", trigger);
    } else if (action.includes("seek:")) {
      this.a.remote.seek(peek(this.a.$state.currentTime) + (+value || 0), trigger);
    } else {
      this.a.remote[kebabToCamelCase(method)](trigger);
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
    this.T = _renderer;
    this.priority = 10;
    this.A = null;
    this.ta = createDisposalBin();
  }
  attach() {
  }
  canRender() {
    return true;
  }
  detach() {
    this.ta.empty();
    this.T.reset();
    this.A = null;
  }
  changeTrack(track) {
    if (!track || this.A === track)
      return;
    this.ta.empty();
    if (track.readyState < 2) {
      this.T.reset();
      this.ta.add(
        listenEvent(track, "load", () => this.Yf(track), { once: true })
      );
    } else {
      this.Yf(track);
    }
    this.ta.add(
      listenEvent(track, "add-cue", (event) => {
        this.T.addCue(event.detail);
      }),
      listenEvent(track, "remove-cue", (event) => {
        this.T.removeCue(event.detail);
      })
    );
    this.A = track;
  }
  Yf(track) {
    this.T.changeTrack({
      cues: [...track.cues],
      regions: [...track.regions]
    });
  }
}

class Captions extends Component {
  onSetup() {
    this.a = useMediaContext();
    this.setAttributes({
      "aria-hidden": $ariaBool(this.mb.bind(this))
    });
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
  }
  onConnect(el) {
    if (this.T) {
      effect(this.Zf.bind(this));
      return;
    }
    import('media-captions').then((lib) => {
      if (!this.connectScope)
        return;
      scoped(() => {
        this.X = lib;
        const { CaptionsRenderer } = this.X;
        this.T = new CaptionsRenderer(el);
        this.Ra = new CaptionsTextRenderer(this.T);
        effect(this.Zf.bind(this));
      }, this.connectScope);
    });
  }
  onDestroy() {
    if (this.Ra) {
      this.Ra.detach();
      this.a.textRenderers.remove(this.Ra);
    }
    this.T?.destroy();
  }
  mb() {
    const { textTrack } = this.a.$state, track = textTrack();
    return this.a.$iosControls() || !track || !isTrackCaptionKind(track);
  }
  Zf() {
    const { viewType } = this.a.$state;
    if (viewType() === "audio") {
      return this.Kj();
    } else {
      return this.Lj();
    }
  }
  Kj() {
    effect(this.$d.bind(this));
    return () => {
      this.el.textContent = "";
    };
  }
  $d() {
    if (this.mb())
      return;
    const { textTrack } = this.a.$state;
    this._f();
    listenEvent(textTrack(), "cue-change", this._f.bind(this));
    effect(this.Mj.bind(this));
  }
  _f() {
    this.el.textContent = "";
    const { currentTime, textTrack } = this.a.$state, time = peek(currentTime), activeCues = peek(textTrack).activeCues;
    const { renderVTTCueString } = this.X;
    for (const cue of activeCues) {
      const cueEl = document.createElement("div");
      cueEl.setAttribute("data-part", "cue");
      cueEl.innerHTML = renderVTTCueString(cue, time);
      this.el.append(cueEl);
    }
  }
  Mj() {
    const { currentTime } = this.a.$state, { updateTimedVTTCueNodes } = this.X;
    updateTimedVTTCueNodes(this.el, currentTime());
  }
  Lj() {
    effect(this.Nj.bind(this));
    effect(this.Oj.bind(this));
    this.a.textRenderers.add(this.Ra);
    return () => {
      this.el.textContent = "";
      this.Ra.detach();
      this.a.textRenderers.remove(this.Ra);
    };
  }
  Nj() {
    this.T.dir = this.$props.textDir();
  }
  Oj() {
    if (this.mb())
      return;
    const { currentTime } = this.a.$state;
    this.T.currentTime = currentTime();
  }
}
Captions.props = {
  textDir: "ltr"
};

class Poster extends Component {
  onSetup() {
    this.a = useMediaContext();
    this.$f();
    this.ag();
    this.pb();
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
    effect(this.Vd.bind(this));
    effect(this.$f.bind(this));
    effect(this.ag.bind(this));
    effect(this.pb.bind(this));
    const { started } = this.a.$state;
    this.setAttributes({
      "data-visible": () => !started(),
      "data-loading": this.Sb.bind(this),
      "data-error": this.xa.bind(this),
      "data-hidden": this.$state.hidden
    });
  }
  onConnect(el) {
    const { canLoad, poster } = this.a.$state;
    window.requestAnimationFrame(() => {
      if (!canLoad())
        preconnect(poster());
    });
    effect(this.Fa.bind(this));
  }
  xa() {
    const { error } = this.$state;
    return !isNull(error());
  }
  pb() {
    const { src } = this.$props, { $iosControls } = this.a, { poster } = this.a.$state;
    this.el && setAttribute(this.el, "display", $iosControls() ? "none" : null);
    this.$state.hidden.set(this.xa() || !(src() || poster()) || $iosControls());
  }
  Sb() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  Vd() {
    const img = this.$state.img();
    if (!img)
      return;
    listenEvent(img, "load", this.mc.bind(this));
    listenEvent(img, "error", this.V.bind(this));
  }
  $f() {
    const { canLoad, poster: defaultPoster } = this.a.$state;
    const src = this.$props.src(), poster = src || defaultPoster();
    if (src && defaultPoster() !== src) {
      this.a.$state.providedPoster.set(src);
    }
    this.$state.src.set(canLoad() && poster.length ? poster : null);
  }
  ag() {
    const { src, alt } = this.$state;
    alt.set(src() ? this.$props.alt() : null);
  }
  Fa() {
    const { loading, error } = this.$state, { canLoad, poster } = this.a.$state;
    loading.set(canLoad() && !!poster());
    error.set(null);
  }
  mc() {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(null);
  }
  V(event) {
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
    this.a = useMediaContext();
    this.bg();
    const { type, remainder } = this.$props;
    this.setAttributes({
      "data-type": type,
      "data-remainder": remainder
    });
  }
  onAttach(el) {
    effect(this.bg.bind(this));
  }
  bg() {
    const { type, remainder, padHours, padMinutes, showHours } = this.$props, seconds = this.Pj(type()), duration = this.a.$state.duration();
    if (!Number.isFinite(seconds + duration)) {
      this.$state.timeText.set("LIVE");
      return;
    }
    const time = remainder() ? Math.max(0, duration - seconds) : seconds, formattedTime = formatTime(time, padHours(), padMinutes(), showHours());
    this.$state.timeText.set(formattedTime);
  }
  Pj(type) {
    const { bufferedEnd, duration, currentTime } = this.a.$state;
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
    return this.ne.matches;
  }
  get isSmallLayout() {
    return this.Mc.matches;
  }
  onSetup() {
    const { when, smallWhen, thumbnails, translations, menuGroup, noModal } = this.$props;
    this.ne = PlayerQueryList.create(when);
    this.Mc = PlayerQueryList.create(smallWhen);
    this.setAttributes({
      "data-match": this.ne.$matches,
      "data-size": () => this.Mc.matches ? "sm" : null
    });
    const self = this;
    provideContext(defaultLayoutContext, {
      smQueryList: this.Mc,
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
  return useSignal((ref?.current?.$state || $state || initialMediaStore)[prop]);
}
function useMediaStore(ref) {
  const $state = useStateContext(mediaState);
  return useSignalRecord(ref?.current ? ref.current.$state : $state || initialMediaStore);
}

export { parseJSONCaptionsFile as $, ThumbnailsLoader as A, updateSliderPreviewPlacement as B, formatTime as C, formatSpokenTime as D, canChangeVolume as E, canOrientScreen as F, GroupedLog as G, canRotateScreen as H, IS_SERVER as I, List as J, FullscreenController as K, ListSymbol as L, MediaPlayerInstance as M, canFullscreen as N, ScreenOrientationController as O, Primitive as P, QualitySymbol as Q, MediaControls as R, SliderInstance as S, TimeRange as T, MEDIA_KEY_SHORTCUTS as U, ARIAKeyShortcuts as V, softResetMediaState as W, getTimeRangesStart as X, getTimeRangesEnd as Y, TextRenderers as Z, isTrackCaptionKind as _, appendParamsToURL as a, SliderVideoInstance as a$, TextTrackList as a0, AudioTrackList as a1, isCueActive as a2, observeActiveTextTrack as a3, PlayerQueryList as a4, VideoQualityList as a5, AudioProviderLoader as a6, VideoProviderLoader as a7, YouTubeProviderLoader as a8, HLSProviderLoader as a9, MenuButton as aA, MenuItem as aB, MenuPortal as aC, menuPortalContext as aD, MenuItems as aE, Radio as aF, ChaptersRadioGroup as aG, AudioRadioGroup as aH, CaptionsRadioGroup as aI, SpeedRadioGroup as aJ, QualityRadioGroup as aK, ControlsInstance as aL, ControlsGroupInstance as aM, CaptionButtonInstance as aN, FullscreenButtonInstance as aO, LiveButtonInstance as aP, MuteButtonInstance as aQ, PIPButtonInstance as aR, PlayButtonInstance as aS, SeekButtonInstance as aT, TooltipInstance as aU, TooltipTriggerInstance as aV, TooltipContentInstance as aW, TimeSliderInstance as aX, VolumeSliderInstance as aY, SliderThumbnailInstance as aZ, SliderValueInstance as a_, VimeoProviderLoader as aa, isAudioProvider as ab, isVideoProvider as ac, isHLSProvider as ad, isYouTubeProvider as ae, isVimeoProvider as af, isHTMLAudioElement as ag, isHTMLVideoElement as ah, isHTMLMediaElement as ai, isHTMLIFrameElement as aj, sliderContext as ak, DefaultLayout as al, DefaultAudioLayout as am, DefaultVideoLayout as an, defaultLayoutContext as ao, getDefaultLayoutLang as ap, useDefaultLayoutContext as aq, ControlsGroup as ar, TooltipTrigger as as, TooltipContent as at, SliderController as au, SliderThumbnail as av, SliderVideo as aw, SliderValue as ax, SliderPreview as ay, SliderChapters as az, TextTrack as b, SliderPreviewInstance as b0, SliderChaptersInstance as b1, MenuInstance as b2, MenuButtonInstance as b3, MenuItemsInstance as b4, MenuItemInstance as b5, MenuPortalInstance as b6, RadioGroupInstance as b7, RadioInstance as b8, CaptionsInstance as b9, GestureInstance as ba, ThumbnailInstance as bb, TimeInstance as bc, useMediaStore as bd, coerceToError as c, TextTrackSymbol as d, IS_CHROME as e, IS_SAFARI as f, isHLSSrc as g, getNumberOfDecimalPlaces as h, isHLSSupported as i, isMediaStream as j, isRemotionSource as k, loadScript as l, canUsePictureInPicture as m, canUseVideoPresentation as n, canPlayHLSNatively as o, preconnect as p, isRemotionProvider as q, MediaProviderInstance as r, sliderState as s, mediaState as t, useMediaState as u, mediaContext as v, ToggleButtonInstance as w, PosterInstance as x, MediaRemoteControl as y, findActiveCue as z };
