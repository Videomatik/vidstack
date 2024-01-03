"use client"

import { d as TextTrackSymbol, P as Primitive, M as MediaPlayerInstance, q as isRemotionProvider, r as MediaProviderInstance, t as mediaState, v as mediaContext, b as TextTrack, w as ToggleButtonInstance, x as PosterInstance, u as useMediaState, y as MediaRemoteControl, z as findActiveCue, A as ThumbnailsLoader, I as IS_SERVER, B as updateSliderPreviewPlacement } from './chunks/vidstack-6eSzbFhe.js';
export { V as ARIAKeyShortcuts, a6 as AudioProviderLoader, aH as AudioRadioGroup, a1 as AudioTrackList, aN as CaptionButtonInstance, b9 as CaptionsInstance, aI as CaptionsRadioGroup, aG as ChaptersRadioGroup, ar as ControlsGroup, aM as ControlsGroupInstance, aL as ControlsInstance, am as DefaultAudioLayout, al as DefaultLayout, an as DefaultVideoLayout, aO as FullscreenButtonInstance, K as FullscreenController, ba as GestureInstance, a9 as HLSProviderLoader, J as List, aP as LiveButtonInstance, C as Logger, U as MEDIA_KEY_SHORTCUTS, R as MediaControls, aA as MenuButton, b3 as MenuButtonInstance, b2 as MenuInstance, aB as MenuItem, b5 as MenuItemInstance, aE as MenuItems, b4 as MenuItemsInstance, aC as MenuPortal, b6 as MenuPortalInstance, aQ as MuteButtonInstance, aR as PIPButtonInstance, aS as PlayButtonInstance, a4 as PlayerQueryList, aK as QualityRadioGroup, aF as Radio, b7 as RadioGroupInstance, b8 as RadioInstance, O as ScreenOrientationController, aT as SeekButtonInstance, az as SliderChapters, b1 as SliderChaptersInstance, au as SliderController, S as SliderInstance, ay as SliderPreview, b0 as SliderPreviewInstance, av as SliderThumbnail, aZ as SliderThumbnailInstance, ax as SliderValue, a_ as SliderValueInstance, aw as SliderVideo, a$ as SliderVideoInstance, aJ as SpeedRadioGroup, Z as TextRenderers, a0 as TextTrackList, bb as ThumbnailInstance, bc as TimeInstance, T as TimeRange, aX as TimeSliderInstance, at as TooltipContent, aW as TooltipContentInstance, aU as TooltipInstance, as as TooltipTrigger, aV as TooltipTriggerInstance, a7 as VideoProviderLoader, a5 as VideoQualityList, aa as VimeoProviderLoader, aY as VolumeSliderInstance, a8 as YouTubeProviderLoader, F as canChangeVolume, N as canFullscreen, G as canOrientScreen, o as canPlayHLSNatively, H as canRotateScreen, m as canUsePictureInPicture, n as canUseVideoPresentation, ao as defaultLayoutContext, E as formatSpokenTime, D as formatTime, ap as getDefaultLayoutLang, Y as getTimeRangesEnd, X as getTimeRangesStart, ab as isAudioProvider, a2 as isCueActive, ad as isHLSProvider, ag as isHTMLAudioElement, aj as isHTMLIFrameElement, ai as isHTMLMediaElement, ah as isHTMLVideoElement, _ as isTrackCaptionKind, ac as isVideoProvider, af as isVimeoProvider, ae as isYouTubeProvider, aD as menuPortalContext, a3 as observeActiveTextTrack, $ as parseJSONCaptionsFile, ak as sliderContext, s as sliderState, W as softResetMediaState, aq as useDefaultLayoutContext, bd as useMediaStore } from './chunks/vidstack-6eSzbFhe.js';
import * as React from 'react';
import { f as isString, l as listenEvent, D as DOMEvent, B as createReactComponent, u as useStateContext, C as useReactContext, a as useSignal, E as composeRefs, b as useSignalRecord, e as effect, F as useReactScope, s as signal, y as scoped } from './chunks/vidstack-HvwwRO6V.js';
export { J as appendTriggerEvent, I as findTriggerEvent, G as hasTriggerEvent, L as isKeyboardClick, M as isKeyboardEvent, K as isPointerEvent, H as walkTriggerEventChain } from './chunks/vidstack-HvwwRO6V.js';
export { I as Icon } from './chunks/vidstack-WDwMHJsO.js';
export { C as CaptionButton, e as Captions, d as ChapterTitle, c as Controls, F as FullscreenButton, G as Gesture, L as LiveButton, m as Menu, M as MuteButton, a as PIPButton, P as PlayButton, r as RadioGroup, S as SeekButton, s as Slider, g as Spinner, f as Thumbnail, T as Time, b as TimeSlider, t as Tooltip, v as VolumeSlider, i as useActiveTextCues, j as useActiveTextTrack, k as useAudioOptions, l as useCaptionOptions, n as useChapterOptions, p as usePlaybackRateOptions, u as usePlayerQuery, h as useTextCues, o as useVideoQualityOptions } from './chunks/vidstack-qMSxKkHl.js';
export { u as useSliderState, a as useSliderStore } from './chunks/vidstack-AfkrbX7B.js';
import 'react-dom';

class LibASSTextRenderer {
  constructor(loader, config) {
    this.loader = loader;
    this.config = config;
    this.priority = 1;
    this._instance = null;
    this._track = null;
    this._typeRE = /(ssa|ass)$/;
  }
  canRender(track, video) {
    return !!video && !!track.src && (isString(track.type) && this._typeRE.test(track.type) || this._typeRE.test(track.src));
  }
  attach(video) {
    if (!video)
      return;
    this.loader().then(async (mod) => {
      this._instance = new mod.default({
        ...this.config,
        video,
        subUrl: this._track?.src || ""
      });
      listenEvent(this._instance, "ready", () => {
        const canvas = this._instance?._canvas;
        if (canvas)
          canvas.style.pointerEvents = "none";
      });
      listenEvent(this._instance, "error", (event) => {
        if (this._track) {
          this._track[TextTrackSymbol._readyState] = 3;
          this._track.dispatchEvent(
            new DOMEvent("error", {
              trigger: event,
              detail: event.error
            })
          );
        }
      });
    });
  }
  changeTrack(track) {
    if (!track || track.readyState === 3) {
      this._freeTrack();
    } else if (this._track !== track) {
      this._instance?.setTrackByUrl(track.src);
      this._track = track;
    }
  }
  detach() {
    this._freeTrack();
  }
  _freeTrack() {
    this._instance?.freeTrack();
    this._track = null;
  }
}

const playerCallbacks = [
  "onAbort",
  "onAudioTrackChange",
  "onAudioTracksChange",
  "onAutoplay",
  "onAutoplayChange",
  "onAutoplayFail",
  "onCanLoad",
  "onCanPlay",
  "onCanPlayThrough",
  "onControlsChange",
  "onDestroy",
  "onDurationChange",
  "onEmptied",
  "onEnd",
  "onEnded",
  "onError",
  "onFindMediaPlayer",
  "onFullscreenChange",
  "onFullscreenError",
  "onLiveChange",
  "onLiveEdgeChange",
  "onLoadedData",
  "onLoadedMetadata",
  "onLoadStart",
  "onLoopChange",
  "onOrientationChange",
  "onPause",
  "onPictureInPictureChange",
  "onPictureInPictureError",
  "onPlay",
  "onPlayFail",
  "onPlaying",
  "onPlaysinlineChange",
  "onPosterChange",
  "onProgress",
  "onProviderChange",
  "onProviderLoaderChange",
  "onProviderSetup",
  "onQualitiesChange",
  "onQualityChange",
  "onRateChange",
  "onReplay",
  "onSeeked",
  "onSeeking",
  "onSourceChange",
  "onSourceChange",
  "onStalled",
  "onStarted",
  "onStreamTypeChange",
  "onSuspend",
  "onTextTrackChange",
  "onTextTracksChange",
  "onTimeUpdate",
  "onTitleChange",
  "onVdsLog",
  "onVideoPresentationChange",
  "onVolumeChange",
  "onWaiting"
];

const MediaPlayerBridge = createReactComponent(MediaPlayerInstance, {
  events: playerCallbacks,
  eventsRegex: /^on(Hls|Media)/
});
const MediaPlayer = React.forwardRef(
  ({ aspectRatio, children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(
      MediaPlayerBridge,
      {
        ...props,
        src: props.src,
        ref: forwardRef,
        style: {
          aspectRatio,
          ...props.style
        }
      },
      (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children)
    );
  }
);
MediaPlayer.displayName = "MediaPlayer";

const MediaProviderBridge = createReactComponent(MediaProviderInstance);
const MediaProvider = React.forwardRef(
  ({ loaders = [], children, mediaProps, ...props }, forwardRef) => {
    const reactLoaders = React.useMemo(() => loaders.map((Loader) => new Loader()), loaders);
    return /* @__PURE__ */ React.createElement(MediaProviderBridge, { ...props, loaders: reactLoaders, ref: forwardRef }, (props2, instance) => /* @__PURE__ */ React.createElement("div", { ...props2 }, /* @__PURE__ */ React.createElement(MediaOutlet, { ...mediaProps, provider: instance }), children));
  }
);
MediaProvider.displayName = "MediaProvider";
const YOUTUBE_TYPE = { src: "", type: "video/youtube" }, VIMEO_TYPE = { src: "", type: "video/vimeo" }, REMOTION_TYPE = { src: "", type: "video/remotion" };
function MediaOutlet({ provider, ...props }) {
  const { controls, crossorigin, poster } = useStateContext(mediaState), { loader } = provider.$state, {
    $iosControls: $$iosControls,
    $provider: $$provider,
    $providerSetup: $$providerSetup
  } = useReactContext(mediaContext), $controls = useSignal(controls), $iosControls = useSignal($$iosControls), $nativeControls = $controls || $iosControls, $crossorigin = useSignal(crossorigin), $poster = useSignal(poster), $loader = useSignal(loader), $provider = useSignal($$provider), $providerSetup = useSignal($$providerSetup), $mediaType = $loader?.mediaType(), isYouTubeEmbed = $loader?.canPlay(YOUTUBE_TYPE), isVimeoEmbed = $loader?.canPlay(VIMEO_TYPE), isEmbed = isYouTubeEmbed || isVimeoEmbed;
  if ($loader?.canPlay(REMOTION_TYPE)) {
    return /* @__PURE__ */ React.createElement("div", { "data-remotion-canvas": true }, /* @__PURE__ */ React.createElement(
      "div",
      {
        "data-remotion-container": true,
        ref: (el) => {
          provider.load(el);
        }
      },
      isRemotionProvider($provider) && $providerSetup ? React.createElement($provider.render) : null
    ));
  }
  return isEmbed ? React.createElement(
    React.Fragment,
    null,
    React.createElement("iframe", {
      className: isYouTubeEmbed ? "vds-youtube" : "vds-vimeo",
      suppressHydrationWarning: true,
      "data-no-controls": !$nativeControls ? "" : void 0,
      ref(el) {
        provider.load(el);
      }
    }),
    !$nativeControls ? React.createElement("div", { className: "vds-blocker" }) : null
  ) : $mediaType ? React.createElement($mediaType === "audio" ? "audio" : "video", {
    ...props,
    controls: $nativeControls ? "" : null,
    crossOrigin: typeof $crossorigin === "boolean" ? "" : $crossorigin,
    poster: $mediaType === "video" && $nativeControls && $poster ? $poster : null,
    preload: "none",
    "aria-hidden": "true",
    suppressHydrationWarning: true,
    ref(el) {
      provider.load(el);
    }
  }) : null;
}
MediaOutlet.displayName = "MediaOutlet";

function createTextTrack(init) {
  const media = useReactContext(mediaContext), track = React.useMemo(() => new TextTrack(init), Object.values(init));
  React.useEffect(() => {
    media.textTracks.add(track);
    return () => void media.textTracks.remove(track);
  }, [track]);
  return track;
}

function Track({ lang, ...props }) {
  createTextTrack({ language: lang, ...props });
  return null;
}
Track.displayName = "Track";

const ToggleButtonBridge = createReactComponent(ToggleButtonInstance);
const ToggleButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(ToggleButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.button, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
ToggleButton.displayName = "ToggleButton";

const PosterBridge = createReactComponent(PosterInstance);
const Poster = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(PosterBridge, { ...props }, (props2, instance) => /* @__PURE__ */ React.createElement(PosterImg, { ...props2, instance, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
Poster.displayName = "Poster";
const PosterImg = React.forwardRef(
  ({ instance, children, ...props }, forwardRef) => {
    const { crossorigin } = useStateContext(mediaState), { src, alt, img } = instance.$state, $crossorigin = useSignal(crossorigin), $src = useSignal(src), $alt = useSignal(alt);
    return /* @__PURE__ */ React.createElement(
      Primitive.img,
      {
        ...props,
        src: $src || void 0,
        alt: $alt || void 0,
        crossOrigin: /ytimg\.com|vimeo/.test($src || "") ? void 0 : $crossorigin,
        ref: composeRefs(img.set, forwardRef)
      },
      children
    );
  }
);
PosterImg.displayName = "PosterImg";

const Root = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(
    Primitive.div,
    {
      translate: "yes",
      "aria-live": "off",
      "aria-atomic": "true",
      ...props,
      ref: forwardRef
    },
    children
  );
});
Root.displayName = "Caption";
const Text = React.forwardRef((props, forwardRef) => {
  const textTrack = useMediaState("textTrack"), [activeCue, setActiveCue] = React.useState();
  React.useEffect(() => {
    if (!textTrack)
      return;
    function onCueChange() {
      setActiveCue(textTrack?.activeCues[0]);
    }
    textTrack.addEventListener("cue-change", onCueChange);
    return () => {
      textTrack.removeEventListener("cue-change", onCueChange);
      setActiveCue(void 0);
    };
  }, [textTrack]);
  return /* @__PURE__ */ React.createElement(
    Primitive.span,
    {
      ...props,
      "data-part": "cue",
      dangerouslySetInnerHTML: {
        __html: activeCue?.text || ""
      },
      ref: forwardRef
    }
  );
});
Text.displayName = "CaptionText";

var caption = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Root: Root,
  Text: Text
});

function useState(ctor, prop, ref) {
  const initialValue = React.useMemo(() => ctor.state.record[prop], [ctor, prop]);
  return useSignal(ref.current ? ref.current.$state[prop] : initialValue);
}
const storesCache = /* @__PURE__ */ new Map();
function useStore(ctor, ref) {
  const initialStore = React.useMemo(() => {
    let store = storesCache.get(ctor);
    if (!store) {
      store = new Proxy(ctor.state.record, {
        get: (_, prop) => () => ctor.state.record[prop]
      });
      storesCache.set(ctor, store);
    }
    return store;
  }, [ctor]);
  return useSignalRecord(ref.current ? ref.current.$state : initialStore);
}

function useMediaPlayer() {
  const context = useReactContext(mediaContext);
  if (!context) {
    throw Error(
      "[vidstack] no media context was found - was this called outside of `<MediaPlayer>`?"
    );
  }
  return context?.player || null;
}

function useMediaProvider() {
  const [provider, setProvider] = React.useState(null), context = useReactContext(mediaContext);
  if (!context) {
    throw Error(
      "[vidstack] no media context was found - was this called outside of `<MediaPlayer>`?"
    );
  }
  React.useEffect(() => {
    if (!context)
      return;
    return effect(() => {
      setProvider(context.$provider());
    });
  }, []);
  return provider;
}

function useMediaRemote(target) {
  const media = useReactContext(mediaContext), remote = React.useRef();
  if (!remote.current) {
    remote.current = new MediaRemoteControl();
  }
  React.useEffect(() => {
    const ref = target && "current" in target ? target.current : target, isPlayerRef = ref instanceof MediaPlayerInstance, player = isPlayerRef ? ref : media?.player;
    remote.current.setPlayer(player ?? null);
    remote.current.setTarget(ref ?? null);
  }, [media, target && "current" in target ? target.current : target]);
  return remote.current;
}

function useThumbnails(src) {
  const scope = useReactScope(), $src = React.useMemo(() => signal(src), []), loader = React.useMemo(() => scoped(() => ThumbnailsLoader.create($src), scope), []), $cues = useSignal(loader.$cues), data = React.useMemo(() => {
    const items = [], baseURL = /^https?:/.test(src) || IS_SERVER ? src : location.href;
    for (const cue of $cues) {
      const [url, dataText = ""] = (cue.text || "").split("#"), data2 = resolveThumbnailData(dataText);
      items.push({
        url: resolveThumbnailSrc(url, baseURL),
        cue,
        x: data2.x ?? -1,
        y: data2.y ?? -1,
        width: data2.width ?? -1,
        height: data2.height ?? -1
      });
    }
    return items;
  }, [$cues]);
  if (!scope) {
    console.warn(
      `[vidstack] \`useThumbnails\` must be called inside a child component of \`<MediaPlayer>\``
    );
  }
  React.useEffect(() => {
    $src.set(src);
  }, [src]);
  return data;
}
function useActiveThumbnail(thumbnails, time) {
  const cues = React.useMemo(() => thumbnails.map((t) => t.cue), [thumbnails]);
  return React.useMemo(() => {
    const cue = findActiveCue(cues, time);
    return thumbnails.find((t) => t.cue === cue) || null;
  }, [thumbnails, cues, time]);
}
function resolveThumbnailSrc(src, baseURL) {
  return /^https?:/.test(src) ? src : new URL(src, baseURL).href;
}
const propNames = {
  x: "x",
  y: "y",
  w: "width",
  h: "height"
};
function resolveThumbnailData(data) {
  const [props, values] = data.split("="), resolvedData = {}, dataValues = values?.split(",");
  if (!props || !values)
    return {};
  for (let i = 0; i < props.length; i++) {
    resolvedData[propNames[props[i]]] = +dataValues[i];
  }
  return resolvedData;
}

function useSliderPreview({
  clamp = false,
  offset = 0,
  orientation = "horizontal"
} = {}) {
  const [rootRef, setRootRef] = React.useState(null), [previewRef, setPreviewRef] = React.useState(null), [pointerValue, setPointerValue] = React.useState(0), [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    if (!rootRef)
      return;
    const dragging = signal(false);
    function updatePointerValue(event) {
      if (!rootRef)
        return;
      setPointerValue(getPointerValue(rootRef, event, orientation));
    }
    return effect(() => {
      if (!dragging()) {
        listenEvent(rootRef, "pointerenter", () => {
          setIsVisible(true);
          previewRef?.setAttribute("data-visible", "");
        });
        listenEvent(rootRef, "pointerdown", (event) => {
          dragging.set(true);
          updatePointerValue(event);
        });
        listenEvent(rootRef, "pointerleave", () => {
          setIsVisible(false);
          previewRef?.removeAttribute("data-visible");
        });
        listenEvent(rootRef, "pointermove", (event) => {
          updatePointerValue(event);
        });
        return;
      }
      previewRef?.setAttribute("data-dragging", "");
      listenEvent(document, "pointerup", (event) => {
        dragging.set(false);
        previewRef?.removeAttribute("data-dragging");
        updatePointerValue(event);
      });
      listenEvent(document, "pointermove", (event) => {
        updatePointerValue(event);
      });
      listenEvent(document, "touchmove", (e) => e.preventDefault(), {
        passive: false
      });
    });
  }, [rootRef]);
  React.useEffect(() => {
    if (previewRef) {
      previewRef.style.setProperty("--slider-pointer", pointerValue + "%");
    }
  }, [previewRef, pointerValue]);
  React.useEffect(() => {
    if (!previewRef)
      return;
    const update = () => {
      updateSliderPreviewPlacement(previewRef, {
        offset,
        clamp,
        orientation
      });
    };
    update();
    const resize = new ResizeObserver(update);
    resize.observe(previewRef);
    return () => resize.disconnect();
  }, [previewRef, clamp, offset, orientation]);
  return {
    previewRootRef: setRootRef,
    previewRef: setPreviewRef,
    previewValue: pointerValue,
    isPreviewVisible: isVisible
  };
}
function getPointerValue(root, event, orientation) {
  let thumbPositionRate, rect = root.getBoundingClientRect();
  if (orientation === "vertical") {
    const { bottom: trackBottom, height: trackHeight } = rect;
    thumbPositionRate = (trackBottom - event.clientY) / trackHeight;
  } else {
    const { left: trackLeft, width: trackWidth } = rect;
    thumbPositionRate = (event.clientX - trackLeft) / trackWidth;
  }
  return round(Math.max(0, Math.min(100, 100 * thumbPositionRate)));
}
function round(num) {
  return Number(num.toFixed(3));
}

export { caption as Caption, LibASSTextRenderer, MediaPlayer, MediaPlayerInstance, MediaProvider, MediaProviderInstance, MediaRemoteControl, Poster, PosterInstance, TextTrack, ThumbnailsLoader, ToggleButton, ToggleButtonInstance, Track, createTextTrack, findActiveCue, mediaContext, mediaState, updateSliderPreviewPlacement, useActiveThumbnail, useMediaPlayer, useMediaProvider, useMediaRemote, useMediaState, useSliderPreview, useState, useStore, useThumbnails };
