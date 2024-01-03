"use client"

import * as React from 'react';
import { B as createReactComponent, E as composeRefs, a as useSignal, A as noop, u as useStateContext, s as signal, e as effect, l as listenEvent, C as useReactContext, F as useReactScope, y as scoped, v as createDisposalBin, f as isString } from './vidstack-HvwwRO6V.js';
import { P as Primitive, aL as ControlsInstance, aM as ControlsGroupInstance, aU as TooltipInstance, aV as TooltipTriggerInstance, aW as TooltipContentInstance, aS as PlayButtonInstance, aN as CaptionButtonInstance, aO as FullscreenButtonInstance, aQ as MuteButtonInstance, aR as PIPButtonInstance, aT as SeekButtonInstance, aP as LiveButtonInstance, a_ as SliderValueInstance, S as SliderInstance, b0 as SliderPreviewInstance, aY as VolumeSliderInstance, I as IS_SERVER$1, bb as ThumbnailInstance, t as mediaState, aX as TimeSliderInstance, b1 as SliderChaptersInstance, aZ as SliderThumbnailInstance, a$ as SliderVideoInstance, b7 as RadioGroupInstance, b8 as RadioInstance, u as useMediaState, b2 as MenuInstance, b3 as MenuButtonInstance, b4 as MenuItemsInstance, b5 as MenuItemInstance, v as mediaContext, a3 as observeActiveTextTrack, ba as GestureInstance, b9 as CaptionsInstance, bc as TimeInstance, a4 as PlayerQueryList, _ as isTrackCaptionKind, D as formatTime, E as formatSpokenTime } from './vidstack-6eSzbFhe.js';
import { createPortal } from 'react-dom';

const ControlsBridge = createReactComponent(ControlsInstance);
const Root$8 = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(ControlsBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
});
Root$8.displayName = "Controls";
const ControlsGroupBridge = createReactComponent(ControlsGroupInstance);
const Group = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(ControlsGroupBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
});
Group.displayName = "ControlsGroup";

var controls = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Group: Group,
  Root: Root$8
});

const TooltipBridge = createReactComponent(TooltipInstance);
function Root$7({ children, ...props }) {
  return /* @__PURE__ */ React.createElement(TooltipBridge, { ...props }, children);
}
Root$7.displayName = "Tooltip";
const TriggerBridge = createReactComponent(TooltipTriggerInstance);
const Trigger = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(TriggerBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.button, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
Trigger.displayName = "TooltipTrigger";
const ContentBridge = createReactComponent(TooltipContentInstance);
const Content = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(ContentBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
Content.displayName = "TooltipContent";

var tooltip = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Content: Content,
  Root: Root$7,
  Trigger: Trigger
});

const PlayButtonBridge = createReactComponent(PlayButtonInstance);
const PlayButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(PlayButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.button, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
PlayButton.displayName = "PlayButton";

const CaptionButtonBridge = createReactComponent(CaptionButtonInstance);
const CaptionButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(CaptionButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.button, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
CaptionButton.displayName = "CaptionButton";

const FullscreenButtonBridge = createReactComponent(FullscreenButtonInstance);
const FullscreenButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(FullscreenButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.button, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
FullscreenButton.displayName = "FullscreenButton";

const MuteButtonBridge = createReactComponent(MuteButtonInstance);
const MuteButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(MuteButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.button, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
MuteButton.displayName = "MuteButton";

const PIPButtonBridge = createReactComponent(PIPButtonInstance);
const PIPButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(PIPButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.button, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
PIPButton.displayName = "PIPButton";

const SeekButtonBridge = createReactComponent(SeekButtonInstance);
const SeekButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(SeekButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.button, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
SeekButton.displayName = "SeekButton";

const LiveButtonBridge = createReactComponent(LiveButtonInstance);
const LiveButton = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(LiveButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.button, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
LiveButton.displayName = "LiveButton";

const SliderValueBridge = createReactComponent(SliderValueInstance);

const SliderBridge = createReactComponent(SliderInstance, {
  events: [
    "onDragStart",
    "onDragEnd",
    "onDragValueChange",
    "onValueChange",
    "onPointerValueChange"
  ]
});
const Root$6 = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(SliderBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children));
});
Root$6.displayName = "Slider";
const Thumb = React.forwardRef((props, forwardRef) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref: forwardRef }));
Thumb.displayName = "SliderThumb";
const Track$1 = React.forwardRef((props, forwardRef) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref: forwardRef }));
Track$1.displayName = "SliderTrack";
const TrackFill$1 = React.forwardRef((props, forwardRef) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref: forwardRef }));
TrackFill$1.displayName = "SliderTrackFill";
const PreviewBridge = createReactComponent(SliderPreviewInstance);
const Preview = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(PreviewBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
Preview.displayName = "SliderPreview";
const Value$2 = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(SliderValueBridge, { ...props }, (props2, instance) => {
    const $text = useSignal(() => instance.getValueText(), instance);
    return /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: forwardRef }, $text, children);
  });
});
Value$2.displayName = "SliderValue";

var slider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Preview: Preview,
  Root: Root$6,
  Thumb: Thumb,
  Track: Track$1,
  TrackFill: TrackFill$1,
  Value: Value$2
});

const VolumeSliderBridge = createReactComponent(VolumeSliderInstance);
const Root$5 = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(VolumeSliderBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children));
  }
);
Root$5.displayName = "VolumeSlider";
const Value$1 = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(SliderValueBridge, { ...props }, (props2, instance) => {
    const $text = useSignal(() => instance.getValueText(), instance);
    return /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, $text, children);
  });
});
Value$1.displayName = "SliderValue";

var volumeSlider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Preview: Preview,
  Root: Root$5,
  Thumb: Thumb,
  Track: Track$1,
  TrackFill: TrackFill$1,
  Value: Value$1
});

function createVTTCue(startTime = 0, endTime = 0, text = "") {
  if (IS_SERVER$1) {
    return {
      startTime,
      endTime,
      text,
      addEventListener: noop,
      removeEventListener: noop,
      dispatchEvent: noop
    };
  }
  return new window.VTTCue(startTime, endTime, text);
}

const ThumbnailBridge = createReactComponent(ThumbnailInstance);
const Root$4 = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(ThumbnailBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
});
Root$4.displayName = "Thumbnail";
const Img = React.forwardRef(({ children, ...props }, forwardRef) => {
  const { crossorigin } = useStateContext(mediaState), { src, img } = useStateContext(ThumbnailInstance.state), $src = useSignal(src), $crossorigin = useSignal(crossorigin);
  return /* @__PURE__ */ React.createElement(
    Primitive.img,
    {
      crossOrigin: $crossorigin,
      ...props,
      src: $src,
      ref: composeRefs(img.set, forwardRef)
    },
    children
  );
});
Img.displayName = "ThumbnailImg";

var thumbnail = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Img: Img,
  Root: Root$4
});

const TimeSliderContext = React.createContext({
  $chapters: signal(null)
});
TimeSliderContext.displayName = "TimeSliderContext";
const TimeSliderBridge = createReactComponent(TimeSliderInstance);
const Root$3 = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    const $chapters = React.useMemo(() => signal(null), []);
    return /* @__PURE__ */ React.createElement(TimeSliderContext.Provider, { value: { $chapters } }, /* @__PURE__ */ React.createElement(TimeSliderBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children)));
  }
);
Root$3.displayName = "TimeSlider";
const SliderChaptersBridge = createReactComponent(SliderChaptersInstance);
const Chapters = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(SliderChaptersBridge, { ...props }, (props2, instance) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, /* @__PURE__ */ React.createElement(ChapterTracks, { instance }, children)));
  }
);
Chapters.displayName = "SliderChapters";
function ChapterTracks({ instance, children }) {
  const $cues = useSignal(() => instance.cues, instance), refs = React.useRef([]), emptyCue = React.useRef(), { $chapters } = React.useContext(TimeSliderContext);
  if (!emptyCue.current) {
    emptyCue.current = createVTTCue();
  }
  React.useEffect(() => {
    $chapters.set(instance);
    return () => void $chapters.set(null);
  }, [instance]);
  React.useEffect(() => {
    instance.setRefs(refs.current);
  }, [$cues]);
  return children($cues.length ? $cues : [emptyCue.current], (el) => {
    if (!el) {
      refs.current.length = 0;
      return;
    }
    refs.current.push(el);
  });
}
ChapterTracks.displayName = "SliderChapterTracks";
const ChapterTitle$1 = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    const { $chapters } = React.useContext(TimeSliderContext), [title, setTitle] = React.useState();
    React.useEffect(() => {
      return effect(() => {
        const chapters = $chapters(), cue = chapters?.activePointerCue || chapters?.activeCue;
        setTitle(cue?.text || "");
      });
    }, []);
    return /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref: forwardRef }, title, children);
  }
);
ChapterTitle$1.displayName = "SliderChapterTitle";
const Value = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(SliderValueBridge, { ...props }, (props2, instance) => {
    const $text = useSignal(() => instance.getValueText(), instance);
    return /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, $text, children);
  });
});
Value.displayName = "SliderValue";
const Progress = React.forwardRef((props, forwardRef) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref: forwardRef }));
Progress.displayName = "SliderProgress";
const SliderThumbnailBridge = createReactComponent(SliderThumbnailInstance);
const ThumbnailRoot = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(SliderThumbnailBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
ThumbnailRoot.displayName = "SliderThumbnail";
const Thumbnail = {
  Root: ThumbnailRoot,
  Img: Img
};
const VideoBridge = createReactComponent(SliderVideoInstance, {
  events: ["onCanPlay", "onError"]
});
const Video = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(VideoBridge, { ...props }, (props2, instance) => /* @__PURE__ */ React.createElement(VideoProvider, { ...props2, instance, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
Video.displayName = "SliderVideo";
const VideoProvider = React.forwardRef(
  ({ instance, children, ...props }, forwardRef) => {
    const { crossorigin, canLoad } = useStateContext(mediaState), { src, video } = instance.$state, $src = useSignal(src), $canLoad = useSignal(canLoad), $crossorigin = useSignal(crossorigin);
    return /* @__PURE__ */ React.createElement(
      Primitive.video,
      {
        style: { maxWidth: "unset" },
        ...props,
        src: $src || void 0,
        muted: true,
        playsInline: true,
        preload: $canLoad ? "auto" : "none",
        crossOrigin: $crossorigin || void 0,
        ref: composeRefs(video.set, forwardRef)
      },
      children
    );
  }
);
VideoProvider.displayName = "SliderVideoProvider";

var timeSlider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ChapterTitle: ChapterTitle$1,
  Chapters: Chapters,
  Preview: Preview,
  Progress: Progress,
  Root: Root$3,
  Thumb: Thumb,
  Thumbnail: Thumbnail,
  Track: Track$1,
  TrackFill: TrackFill$1,
  Value: Value,
  Video: Video
});

const RadioGroupBridge = createReactComponent(RadioGroupInstance, {
  events: ["onChange"]
});
const Root$2 = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(RadioGroupBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children));
  }
);
Root$2.displayName = "RadioGroup";
const ItemBridge$1 = createReactComponent(RadioInstance, {
  events: ["onChange", "onSelect"]
});
const Item$1 = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(ItemBridge$1, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
});
Item$1.displayName = "RadioItem";

var radioGroup = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Item: Item$1,
  Root: Root$2
});

const IS_SERVER = typeof document === "undefined";

const MenuBridge = createReactComponent(MenuInstance, {
  events: ["onOpen", "onClose"]
});
const Root$1 = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(MenuBridge, { ...props, ref: forwardRef }, (props2, instance) => /* @__PURE__ */ React.createElement(
    Primitive.div,
    {
      ...props2,
      style: { display: !instance.isSubmenu ? "contents" : void 0, ...props2.style }
    },
    children
  ));
});
Root$1.displayName = "Menu";
const ButtonBridge = createReactComponent(MenuButtonInstance, {
  events: ["onSelect"]
});
const Button = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(ButtonBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.button, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
  }
);
Button.displayName = "MenuButton";
const Portal = React.forwardRef(
  ({ disabled = false, children, ...props }, forwardRef) => {
    let fullscreen = useMediaState("fullscreen"), shouldPortal = disabled === "fullscreen" ? !fullscreen : !disabled;
    return IS_SERVER || !shouldPortal ? children : createPortal(
      /* @__PURE__ */ React.createElement(
        Primitive.div,
        {
          ...props,
          style: { display: "contents", ...props.style },
          ref: forwardRef
        },
        children
      ),
      document.body
    );
  }
);
Portal.displayName = "MenuPortal";
const ItemsBridge = createReactComponent(MenuItemsInstance);
const Items = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(ItemsBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
});
Items.displayName = "MenuItems";
const ItemBridge = createReactComponent(MenuItemInstance);
const Item = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(ItemBridge, { ...props }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2, ref: composeRefs(props2.ref, forwardRef) }, children));
});
Item.displayName = "MenuItem";

var menu = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Button: Button,
  Content: Items,
  Item: Item,
  Items: Items,
  Portal: Portal,
  Radio: Item$1,
  RadioGroup: Root$2,
  Root: Root$1
});

function useActiveTextCues(track) {
  const [activeCues, setActiveCues] = React.useState([]);
  React.useEffect(() => {
    if (!track) {
      setActiveCues([]);
      return;
    }
    return listenEvent(track, "cue-change", () => {
      setActiveCues(track.activeCues);
    });
  }, [track]);
  return activeCues;
}

function useActiveTextTrack(kind) {
  const media = useReactContext(mediaContext), [track, setTrack] = React.useState(null);
  React.useEffect(() => {
    return observeActiveTextTrack(media.textTracks, kind, setTrack);
  }, [kind]);
  return track;
}

const ChapterTitle = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    const $started = useMediaState("started"), $mainTitle = useMediaState("title"), $track = useActiveTextTrack("chapters"), $cues = useActiveTextCues($track), $chapterTitle = $cues[0]?.text || "";
    return /* @__PURE__ */ React.createElement(Primitive.span, { ...props, ref: forwardRef }, $started ? $chapterTitle || $mainTitle : $mainTitle || $chapterTitle, children);
  }
);
ChapterTitle.displayName = "ChapterTitle";

const GestureBridge = createReactComponent(GestureInstance, {
  events: ["onWillTrigger", "onTrigger"]
});
const Gesture = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(GestureBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children));
  }
);
Gesture.displayName = "Gesture";

const CaptionsBridge = createReactComponent(CaptionsInstance);
const Captions = React.forwardRef(
  ({ children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(CaptionsBridge, { ...props, ref: forwardRef }, (props2) => /* @__PURE__ */ React.createElement(Primitive.div, { ...props2 }, children));
  }
);
Captions.displayName = "Captions";

const TimeBridge = createReactComponent(TimeInstance);
const Time = React.forwardRef(({ children, ...props }, forwardRef) => {
  return /* @__PURE__ */ React.createElement(TimeBridge, { ...props }, (props2, instance) => /* @__PURE__ */ React.createElement(TimeText, { ...props2, instance, ref: composeRefs(props2.ref, forwardRef) }, children));
});
Time.displayName = "Time";
const TimeText = React.forwardRef(
  ({ instance, children, ...props }, forwardRef) => {
    const { timeText } = instance.$state, $timeText = useSignal(timeText);
    return /* @__PURE__ */ React.createElement(Primitive.div, { ...props, ref: forwardRef }, $timeText, children);
  }
);
TimeText.displayName = "TimeText";

const Root = React.forwardRef(
  ({ size = 96, children, ...props }, forwardRef) => {
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        width: size,
        height: size,
        fill: "none",
        viewBox: "0 0 120 120",
        "aria-hidden": "true",
        "data-part": "root",
        ...props,
        ref: forwardRef
      },
      children
    );
  }
);
const Track = React.forwardRef(
  ({ width = 8, children, ...props }, ref) => /* @__PURE__ */ React.createElement(
    "circle",
    {
      cx: "60",
      cy: "60",
      r: "54",
      stroke: "currentColor",
      strokeWidth: width,
      "data-part": "track",
      ...props,
      ref
    },
    children
  )
);
const TrackFill = React.forwardRef(
  ({ width = 8, fillPercent = 50, children, ...props }, ref) => /* @__PURE__ */ React.createElement(
    "circle",
    {
      cx: "60",
      cy: "60",
      r: "54",
      stroke: "currentColor",
      pathLength: "100",
      strokeWidth: width,
      strokeDasharray: 100,
      strokeDashoffset: 100 - fillPercent,
      "data-part": "track-fill",
      ...props,
      ref
    },
    children
  )
);

var spinner = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Root: Root,
  Track: Track,
  TrackFill: TrackFill
});

function usePlayerQuery(query) {
  const scope = useReactScope(), queryList = React.useMemo(() => scoped(() => PlayerQueryList.create(query), scope), [query]), [matches, setMatches] = React.useState(queryList.matches);
  React.useEffect(() => {
    setMatches(queryList.matches);
    return listenEvent(queryList, "change", () => {
      setMatches(queryList.matches);
    });
  }, [query]);
  return matches;
}

function useTextCues(track) {
  const [cues, setCues] = React.useState([]);
  React.useEffect(() => {
    if (!track)
      return;
    function onCuesChange(track2) {
      setCues([...track2.cues]);
    }
    const disposal = createDisposalBin();
    disposal.add(
      listenEvent(track, "add-cue", () => onCuesChange(track)),
      listenEvent(track, "remove-cue", () => onCuesChange(track))
    );
    onCuesChange(track);
    return () => {
      disposal.empty();
      setCues([]);
    };
  }, [track]);
  return cues;
}

function useAudioOptions() {
  const media = useReactContext(mediaContext), { audioTracks, audioTrack } = media.$state, $audioTracks = useSignal(audioTracks);
  useSignal(audioTrack);
  return React.useMemo(() => {
    const options = $audioTracks.map((track) => ({
      track,
      label: track.label,
      value: getTrackValue$1(track),
      get selected() {
        return audioTrack() === track;
      },
      select(trigger) {
        const index = audioTracks().indexOf(track);
        if (index >= 0)
          media.remote.changeAudioTrack(index, trigger);
      }
    }));
    Object.defineProperty(options, "disabled", {
      get() {
        return !options.length;
      }
    });
    Object.defineProperty(options, "selectedTrack", {
      get() {
        return audioTrack();
      }
    });
    Object.defineProperty(options, "selectedValue", {
      get() {
        const track = audioTrack();
        return track ? getTrackValue$1(track) : void 0;
      }
    });
    return options;
  }, [$audioTracks]);
}
function getTrackValue$1(track) {
  return track.label.toLowerCase();
}

function useCaptionOptions({ off = true } = {}) {
  const media = useReactContext(mediaContext), { textTracks, textTrack } = media.$state, $textTracks = useSignal(textTracks);
  useSignal(textTrack);
  return React.useMemo(() => {
    const captionTracks = $textTracks.filter(isTrackCaptionKind), options = captionTracks.map((track) => ({
      track,
      label: track.label,
      value: getTrackValue(track),
      get selected() {
        return textTrack() === track;
      },
      select(trigger) {
        const index = textTracks().indexOf(track);
        if (index >= 0)
          media.remote.changeTextTrackMode(index, "showing", trigger);
      }
    }));
    if (off) {
      options.unshift({
        track: null,
        label: isString(off) ? off : "Off",
        value: "off",
        get selected() {
          return !textTrack();
        },
        select(trigger) {
          media.remote.toggleCaptions(trigger);
        }
      });
    }
    Object.defineProperty(options, "disabled", {
      get() {
        return !captionTracks.length;
      }
    });
    Object.defineProperty(options, "selectedTrack", {
      get() {
        return textTrack();
      }
    });
    Object.defineProperty(options, "selectedValue", {
      get() {
        const track = textTrack();
        return track ? getTrackValue(track) : "off";
      }
    });
    return options;
  }, [$textTracks]);
}
function getTrackValue(track) {
  return track.id + ":" + track.kind + "-" + track.label.toLowerCase();
}

function useChapterOptions() {
  const media = useReactContext(mediaContext), track = useActiveTextTrack("chapters"), cues = useTextCues(track);
  useActiveTextCues(track);
  return React.useMemo(() => {
    const options = track ? cues.map((cue, i) => {
      let currentRef = null, stopProgressEffect;
      return {
        cue,
        label: cue.text,
        value: i + "",
        startTimeText: formatTime(cue.startTime, false),
        durationText: formatSpokenTime(cue.endTime - cue.startTime),
        get selected() {
          return cue === track.activeCues[0];
        },
        setProgressVar(ref) {
          if (!ref || cue !== track.activeCues[0]) {
            stopProgressEffect?.();
            stopProgressEffect = void 0;
            ref?.style.setProperty("--progress", "0%");
            currentRef = null;
            return;
          }
          if (currentRef === ref)
            return;
          currentRef = ref;
          stopProgressEffect?.();
          stopProgressEffect = effect(() => {
            const { currentTime } = media.$state, time = currentTime(), progress = Math.min((time - cue.startTime) / (cue.endTime - cue.startTime), 1) * 100;
            ref.style.setProperty("--progress", progress.toFixed(3) + "%");
          });
        },
        select(trigger) {
          media.remote.seek(cue.startTime, trigger);
        }
      };
    }) : [];
    Object.defineProperty(options, "selectedValue", {
      get() {
        const index = options.findIndex((option) => option.selected);
        return (index >= 0 ? index : 0) + "";
      }
    });
    return options;
  }, [cues]);
}

function useVideoQualityOptions({
  auto = true,
  sort = "descending"
} = {}) {
  const media = useReactContext(mediaContext), { qualities, quality, autoQuality, canSetQuality } = media.$state, $qualities = useSignal(qualities);
  useSignal(quality);
  useSignal(autoQuality);
  useSignal(canSetQuality);
  return React.useMemo(() => {
    const options = [...$qualities].sort(sort === "descending" ? sortDescending : sortAscending).map((_quality) => {
      return {
        quality: _quality,
        label: _quality.height + "p",
        value: getQualityValue(_quality),
        bitrateText: _quality.bitrate >= 0 ? `${(_quality.bitrate / 1e6).toFixed(2)} Mbps` : null,
        get selected() {
          return _quality === quality();
        },
        get autoSelected() {
          return autoQuality();
        },
        select(trigger) {
          const index = qualities().indexOf(_quality);
          if (index >= 0)
            media.remote.changeQuality(index, trigger);
        }
      };
    });
    if (auto) {
      options.unshift({
        quality: null,
        label: isString(auto) ? auto : "Auto",
        value: "auto",
        bitrateText: null,
        get selected() {
          return autoQuality();
        },
        get autoSelected() {
          return autoQuality();
        },
        select(trigger) {
          media.remote.requestAutoQuality(trigger);
        }
      });
    }
    Object.defineProperty(options, "disabled", {
      get() {
        return !canSetQuality() || !$qualities.length;
      }
    });
    Object.defineProperty(options, "selectedQuality", {
      get() {
        return quality();
      }
    });
    Object.defineProperty(options, "selectedValue", {
      get() {
        const $quality = quality();
        return !autoQuality() && $quality ? getQualityValue($quality) : "auto";
      }
    });
    return options;
  }, [$qualities, sort]);
}
function sortAscending(a, b) {
  return a.height === b.height ? a.bitrate - b.bitrate : a.height - b.height;
}
function sortDescending(a, b) {
  return b.height === a.height ? b.bitrate - a.bitrate : b.height - a.height;
}
function getQualityValue(quality) {
  return quality.height + "_" + quality.bitrate;
}

const DEFAULT_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
function usePlaybackRateOptions({
  rates = DEFAULT_RATES,
  normalLabel = "Normal"
} = {}) {
  const media = useReactContext(mediaContext), { playbackRate, canSetPlaybackRate } = media.$state;
  useSignal(playbackRate);
  useSignal(canSetPlaybackRate);
  return React.useMemo(() => {
    const options = rates.map((opt) => {
      const label = typeof opt === "number" ? opt === 1 && normalLabel ? normalLabel : opt + "x" : opt.label, rate = typeof opt === "number" ? opt : opt.rate;
      return {
        label,
        value: rate + "",
        rate,
        get selected() {
          return playbackRate() === rate;
        },
        select(trigger) {
          media.remote.changePlaybackRate(rate, trigger);
        }
      };
    });
    Object.defineProperty(options, "disabled", {
      get() {
        return !canSetPlaybackRate() || !options.length;
      }
    });
    Object.defineProperty(options, "selectedValue", {
      get() {
        return playbackRate() + "";
      }
    });
    return options;
  }, [rates]);
}

export { Group as $, Thumb as A, Preview as B, CaptionButton as C, Root$3 as D, Chapters as E, FullscreenButton as F, Gesture as G, Progress as H, Thumbnail as I, ChapterTitle$1 as J, Value as K, LiveButton as L, MuteButton as M, Items as N, Root$2 as O, PlayButton as P, Item$1 as Q, Root$7 as R, SeekButton as S, Time as T, Root$4 as U, Value$1 as V, Img as W, Root$1 as X, Button as Y, Portal as Z, Root$8 as _, PIPButton as a, Root as a0, Track as a1, TrackFill as a2, timeSlider as b, controls as c, ChapterTitle as d, Captions as e, thumbnail as f, spinner as g, useTextCues as h, useActiveTextCues as i, useActiveTextTrack as j, useAudioOptions as k, useCaptionOptions as l, menu as m, useChapterOptions as n, useVideoQualityOptions as o, usePlaybackRateOptions as p, Trigger as q, radioGroup as r, slider as s, tooltip as t, usePlayerQuery as u, volumeSlider as v, Content as w, Root$5 as x, Track$1 as y, TrackFill$1 as z };
