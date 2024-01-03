"use client"

import * as React from 'react';
import { u as usePlayerQuery, R as Root, q as Trigger, w as Content, P as PlayButton, M as MuteButton, C as CaptionButton, a as PIPButton, F as FullscreenButton, S as SeekButton, x as Root$1, y as Track, z as TrackFill, A as Thumb, B as Preview, V as Value, D as Root$2, E as Chapters, H as Progress, I as Thumbnail, J as ChapterTitle, K as Value$1, d as ChapterTitle$1, L as LiveButton, T as Time, n as useChapterOptions, N as Items, O as Root$3, Q as Item, U as Root$4, W as Img, X as Root$5, Y as Button, Z as Portal, k as useAudioOptions, p as usePlaybackRateOptions, o as useVideoQualityOptions, l as useCaptionOptions, e as Captions, _ as Root$6, $ as Group, G as Gesture, a0 as Root$7, a1 as Track$1, a2 as TrackFill$1 } from '../chunks/vidstack-qMSxKkHl.js';
import { f as isString, a as useSignal, C as useReactContext, X as computed } from '../chunks/vidstack-HvwwRO6V.js';
import { u as useMediaState, _ as isTrackCaptionKind, k as isRemotionSource, v as mediaContext } from '../chunks/vidstack-6eSzbFhe.js';
import { a as RemotionSliderThumbnail, R as RemotionThumbnail } from '../chunks/vidstack-ggjrSlGx.js';
import 'react-dom';

const DefaultLayoutContext = React.createContext({});
function useDefaultLayoutLang(word) {
  const { translations } = React.useContext(DefaultLayoutContext);
  return translations?.[word] ?? word;
}

function createDefaultMediaLayout({
  type,
  smLayoutWhen,
  SmallLayout,
  LargeLayout,
  UnknownStreamType
}) {
  const Layout = React.forwardRef(
    ({
      className,
      icons,
      thumbnails,
      translations,
      showMenuDelay,
      showTooltipDelay = type === "video" ? 500 : 700,
      smallLayoutWhen = smLayoutWhen,
      noModal = false,
      menuGroup = "bottom",
      hideQualityBitrate = false,
      children,
      ...props
    }, forwardRef) => {
      const $canLoad = useMediaState("canLoad"), $viewType = useMediaState("viewType"), $streamType = useMediaState("streamType"), isMatch = $viewType === type, isForcedLayout = typeof smallLayoutWhen === "boolean", isSmallLayoutMatch = usePlayerQuery(isString(smallLayoutWhen) ? smallLayoutWhen : ""), isSmallLayout = isForcedLayout ? smallLayoutWhen : isSmallLayoutMatch;
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          ...props,
          className: `vds-${type}-layout` + (className ? ` ${className}` : ""),
          "data-match": isMatch ? "" : null,
          "data-size": isSmallLayout ? "sm" : null,
          ref: forwardRef
        },
        ($canLoad || isForcedLayout) && isMatch ? /* @__PURE__ */ React.createElement(
          DefaultLayoutContext.Provider,
          {
            value: {
              thumbnails,
              translations,
              isSmallLayout,
              showMenuDelay,
              showTooltipDelay,
              hideQualityBitrate,
              noModal,
              menuGroup,
              Icons: icons
            }
          },
          $streamType === "unknown" ? UnknownStreamType ? /* @__PURE__ */ React.createElement(UnknownStreamType, null) : null : isSmallLayout ? /* @__PURE__ */ React.createElement(SmallLayout, null) : /* @__PURE__ */ React.createElement(LargeLayout, null),
          children
        ) : null
      );
    }
  );
  Layout.displayName = "DefaultMediaLayout";
  return Layout;
}
function DefaultTooltip({ content, placement, children }) {
  const { showTooltipDelay } = React.useContext(DefaultLayoutContext);
  return /* @__PURE__ */ React.createElement(Root, { showDelay: showTooltipDelay }, /* @__PURE__ */ React.createElement(Trigger, { asChild: true }, children), /* @__PURE__ */ React.createElement(Content, { className: "vds-tooltip-content", placement }, content));
}
DefaultTooltip.displayName = "DefaultTooltip";
function DefaultPlayButton({ tooltip }) {
  const { Icons } = React.useContext(DefaultLayoutContext), playText = useDefaultLayoutLang("Play"), pauseText = useDefaultLayoutLang("Pause"), paused = useMediaState("paused"), ended = useMediaState("ended"), label = paused ? playText : pauseText;
  return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: paused ? playText : pauseText, placement: tooltip }, /* @__PURE__ */ React.createElement(PlayButton, { className: "vds-play-button vds-button", "aria-label": label }, ended ? /* @__PURE__ */ React.createElement(Icons.PlayButton.Replay, { className: "vds-icon" }) : paused ? /* @__PURE__ */ React.createElement(Icons.PlayButton.Play, { className: "vds-icon" }) : /* @__PURE__ */ React.createElement(Icons.PlayButton.Pause, { className: "vds-icon" })));
}
DefaultPlayButton.displayName = "DefaultPlayButton";
function DefaultMuteButton({ tooltip }) {
  const { Icons } = React.useContext(DefaultLayoutContext), muteText = useDefaultLayoutLang("Mute"), unmuteText = useDefaultLayoutLang("Unmute"), muted = useMediaState("muted"), volume = useMediaState("volume"), label = muted ? unmuteText : muteText;
  return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: muted ? unmuteText : muteText, placement: tooltip }, /* @__PURE__ */ React.createElement(MuteButton, { className: "vds-mute-button vds-button", "aria-label": label }, muted || volume == 0 ? /* @__PURE__ */ React.createElement(Icons.MuteButton.Mute, { className: "vds-icon" }) : volume < 0.5 ? /* @__PURE__ */ React.createElement(Icons.MuteButton.VolumeLow, { className: "vds-icon" }) : /* @__PURE__ */ React.createElement(Icons.MuteButton.VolumeHigh, { className: "vds-icon" })));
}
DefaultMuteButton.displayName = "DefaultMuteButton";
function DefaultCaptionButton({ tooltip }) {
  const { Icons } = React.useContext(DefaultLayoutContext), onText = useDefaultLayoutLang("Closed-Captions On"), offText = useDefaultLayoutLang("Closed-Captions Off"), track = useMediaState("textTrack"), isOn = track && isTrackCaptionKind(track), label = track ? offText : onText;
  return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: isOn ? onText : offText, placement: tooltip }, /* @__PURE__ */ React.createElement(CaptionButton, { className: "vds-caption-button vds-button", "aria-label": label }, isOn ? /* @__PURE__ */ React.createElement(Icons.CaptionButton.On, { className: "vds-icon" }) : /* @__PURE__ */ React.createElement(Icons.CaptionButton.Off, { className: "vds-icon" })));
}
DefaultCaptionButton.displayName = "DefaultCaptionButton";
function DefaultPIPButton({ tooltip }) {
  const { Icons } = React.useContext(DefaultLayoutContext), enterText = useDefaultLayoutLang("Enter PiP"), exitText = useDefaultLayoutLang("Exit PiP"), pip = useMediaState("pictureInPicture"), label = pip ? exitText : enterText;
  return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: pip ? exitText : enterText, placement: tooltip }, /* @__PURE__ */ React.createElement(PIPButton, { className: "vds-pip-button vds-button", "aria-label": label }, pip ? /* @__PURE__ */ React.createElement(Icons.PIPButton.Exit, { className: "vds-icon" }) : /* @__PURE__ */ React.createElement(Icons.PIPButton.Enter, { className: "vds-icon" })));
}
DefaultPIPButton.displayName = "DefaultPIPButton";
function DefaultFullscreenButton({ tooltip }) {
  const { Icons } = React.useContext(DefaultLayoutContext), enterText = useDefaultLayoutLang("Enter Fullscreen"), exitText = useDefaultLayoutLang("Exit Fullscreen"), fullscreen = useMediaState("fullscreen"), label = fullscreen ? exitText : enterText;
  return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: fullscreen ? exitText : enterText, placement: tooltip }, /* @__PURE__ */ React.createElement(FullscreenButton, { className: "vds-fullscreen-button vds-button", "aria-label": label }, fullscreen ? /* @__PURE__ */ React.createElement(Icons.FullscreenButton.Exit, { className: "vds-icon" }) : /* @__PURE__ */ React.createElement(Icons.FullscreenButton.Enter, { className: "vds-icon" })));
}
DefaultFullscreenButton.displayName = "DefaultFullscreenButton";
function DefaultSeekButton({ seconds, tooltip }) {
  const { Icons } = React.useContext(DefaultLayoutContext), seekForwardText = useDefaultLayoutLang("Seek Forward"), seekBackwardText = useDefaultLayoutLang("Seek Backward"), label = seconds >= 0 ? seekForwardText : seekBackwardText;
  return /* @__PURE__ */ React.createElement(DefaultTooltip, { content: label, placement: tooltip }, /* @__PURE__ */ React.createElement(SeekButton, { className: "vds-seek-button vds-button", seconds, "aria-label": label }, seconds >= 0 ? /* @__PURE__ */ React.createElement(Icons.SeekButton.Forward, { className: "vds-icon" }) : /* @__PURE__ */ React.createElement(Icons.SeekButton.Backward, { className: "vds-icon" })));
}
DefaultSeekButton.displayName = "DefaultSeekButton";
function DefaultVolumeSlider() {
  const label = useDefaultLayoutLang("Volume");
  return /* @__PURE__ */ React.createElement(Root$1, { className: "vds-volume-slider vds-slider", "aria-label": label }, /* @__PURE__ */ React.createElement(Track, { className: "vds-slider-track" }), /* @__PURE__ */ React.createElement(TrackFill, { className: "vds-slider-track-fill vds-slider-track" }), /* @__PURE__ */ React.createElement(Thumb, { className: "vds-slider-thumb" }), /* @__PURE__ */ React.createElement(Preview, { className: "vds-slider-preview", noClamp: true }, /* @__PURE__ */ React.createElement(Value, { className: "vds-slider-value" })));
}
DefaultVolumeSlider.displayName = "DefaultVolumeSlider";
function DefaultTimeSlider() {
  const $src = useMediaState("currentSrc"), width = useMediaState("width"), { thumbnails } = React.useContext(DefaultLayoutContext), label = useDefaultLayoutLang("Seek"), $RemotionSliderThumbnail = useSignal(RemotionSliderThumbnail);
  return /* @__PURE__ */ React.createElement(Root$2, { className: "vds-time-slider vds-slider", "aria-label": label }, /* @__PURE__ */ React.createElement(Chapters, { className: "vds-slider-chapters", disabled: width < 768 }, (cues, forwardRef) => cues.map((cue) => /* @__PURE__ */ React.createElement("div", { className: "vds-slider-chapter", key: cue.startTime, ref: forwardRef }, /* @__PURE__ */ React.createElement(Track, { className: "vds-slider-track" }), /* @__PURE__ */ React.createElement(TrackFill, { className: "vds-slider-track-fill vds-slider-track" }), /* @__PURE__ */ React.createElement(Progress, { className: "vds-slider-progress vds-slider-track" })))), /* @__PURE__ */ React.createElement(Thumb, { className: "vds-slider-thumb" }), /* @__PURE__ */ React.createElement(Preview, { className: "vds-slider-preview" }, thumbnails ? /* @__PURE__ */ React.createElement(
    Thumbnail.Root,
    {
      src: thumbnails,
      className: "vds-slider-thumbnail vds-thumbnail"
    },
    /* @__PURE__ */ React.createElement(Thumbnail.Img, null)
  ) : $RemotionSliderThumbnail && isRemotionSource($src) ? /* @__PURE__ */ React.createElement($RemotionSliderThumbnail, { className: "vds-slider-thumbnail vds-thumbnail" }) : null, /* @__PURE__ */ React.createElement(ChapterTitle, { className: "vds-slider-chapter-title" }), /* @__PURE__ */ React.createElement(Value$1, { className: "vds-slider-value" })));
}
DefaultTimeSlider.displayName = "DefaultTimeSlider";
function DefaultChapterTitle() {
  return /* @__PURE__ */ React.createElement(ChapterTitle$1, { className: "vds-chapter-title" });
}
DefaultChapterTitle.displayName = "DefaultChapterTitle";
function DefaultLiveButton() {
  const live = useMediaState("live"), label = useDefaultLayoutLang("Skip To Live"), liveText = useDefaultLayoutLang("LIVE");
  return live ? /* @__PURE__ */ React.createElement(LiveButton, { className: "vds-live-button", "aria-label": label }, /* @__PURE__ */ React.createElement("span", { className: "vds-live-button-text" }, liveText)) : null;
}
DefaultLiveButton.displayName = "DefaultLiveButton";
function DefaultTimeGroup() {
  return /* @__PURE__ */ React.createElement("div", { className: "vds-time-group" }, /* @__PURE__ */ React.createElement(Time, { className: "vds-time", type: "current" }), /* @__PURE__ */ React.createElement("div", { className: "vds-time-divider" }, "/"), /* @__PURE__ */ React.createElement(Time, { className: "vds-time", type: "duration" }));
}
DefaultTimeGroup.displayName = "DefaultTimeGroup";
function DefaultTimeInfo() {
  const live = useMediaState("live");
  return live ? /* @__PURE__ */ React.createElement(DefaultLiveButton, null) : /* @__PURE__ */ React.createElement(DefaultTimeGroup, null);
}
DefaultTimeInfo.displayName = "DefaultTimeInfo";
function DefaultChaptersMenu({ tooltip, placement, portalClass }) {
  const { showMenuDelay, noModal, isSmallLayout, Icons, menuGroup } = React.useContext(DefaultLayoutContext), chaptersText = useDefaultLayoutLang("Chapters"), options = useChapterOptions(), disabled = !options.length, { thumbnails } = React.useContext(DefaultLayoutContext), $src = useMediaState("currentSrc"), $viewType = useMediaState("viewType"), $offset = !isSmallLayout && menuGroup === "bottom" && $viewType === "video" ? 26 : 0, $RemotionThumbnail = useSignal(RemotionThumbnail);
  const Content = /* @__PURE__ */ React.createElement(
    Items,
    {
      className: "vds-chapters-menu-items vds-menu-items",
      placement,
      offset: $offset
    },
    /* @__PURE__ */ React.createElement(
      Root$3,
      {
        className: "vds-chapters-radio-group vds-radio-group",
        value: options.selectedValue,
        "data-thumbnails": !!thumbnails
      },
      options.map(
        ({ cue, label, value, startTimeText, durationText, select, setProgressVar }) => /* @__PURE__ */ React.createElement(
          Item,
          {
            className: "vds-chapter-radio vds-radio",
            value,
            key: value,
            onSelect: select,
            ref: setProgressVar
          },
          thumbnails ? /* @__PURE__ */ React.createElement(Root$4, { src: thumbnails, className: "vds-thumbnail", time: cue.startTime }, /* @__PURE__ */ React.createElement(Img, null)) : $RemotionThumbnail && isRemotionSource($src) ? /* @__PURE__ */ React.createElement($RemotionThumbnail, { className: "vds-thumbnail", frame: cue.startTime * $src.fps }) : null,
          /* @__PURE__ */ React.createElement("div", { className: "vds-chapter-radio-content" }, /* @__PURE__ */ React.createElement("span", { className: "vds-chapter-radio-label" }, label), /* @__PURE__ */ React.createElement("span", { className: "vds-chapter-radio-start-time" }, startTimeText), /* @__PURE__ */ React.createElement("span", { className: "vds-chapter-radio-duration" }, durationText))
        )
      )
    )
  );
  return /* @__PURE__ */ React.createElement(Root$5, { className: "vds-chapters-menu vds-menu", showDelay: showMenuDelay }, /* @__PURE__ */ React.createElement(DefaultTooltip, { content: chaptersText, placement: tooltip }, /* @__PURE__ */ React.createElement(
    Button,
    {
      className: "vds-menu-button vds-button",
      disabled,
      "aria-label": chaptersText
    },
    /* @__PURE__ */ React.createElement(Icons.Menu.Chapters, { className: "vds-icon" })
  )), noModal || !isSmallLayout ? Content : /* @__PURE__ */ React.createElement(
    Portal,
    {
      className: portalClass,
      disabled: "fullscreen",
      "data-size": isSmallLayout ? "sm" : null
    },
    Content
  ));
}
DefaultChaptersMenu.displayName = "DefaultChaptersMenu";
function DefaultSettingsMenu({ tooltip, placement, portalClass }) {
  const { $state } = useReactContext(mediaContext), { showMenuDelay, Icons, isSmallLayout, menuGroup, noModal } = React.useContext(DefaultLayoutContext), settingsText = useDefaultLayoutLang("Settings"), $viewType = useMediaState("viewType"), $offset = !isSmallLayout && menuGroup === "bottom" && $viewType === "video" ? 26 : 0, $$hasMenuItems = React.useMemo(
    () => computed(() => {
      const { canSetPlaybackRate, canSetQuality, qualities, audioTracks, textTracks } = $state;
      return canSetPlaybackRate() || canSetQuality() && qualities().length || audioTracks().length || textTracks().filter(isTrackCaptionKind).length;
    }),
    []
  ), $hasMenuItems = useSignal($$hasMenuItems);
  if (!$hasMenuItems)
    return null;
  const Content = /* @__PURE__ */ React.createElement(
    Items,
    {
      className: "vds-settings-menu-items vds-menu-items",
      placement,
      offset: $offset
    },
    /* @__PURE__ */ React.createElement(DefaultAudioSubmenu, null),
    /* @__PURE__ */ React.createElement(DefaultSpeedSubmenu, null),
    /* @__PURE__ */ React.createElement(DefaultQualitySubmenu, null),
    /* @__PURE__ */ React.createElement(DefaultCaptionSubmenu, null)
  );
  return /* @__PURE__ */ React.createElement(Root$5, { className: "vds-settings-menu vds-menu", showDelay: showMenuDelay }, /* @__PURE__ */ React.createElement(DefaultTooltip, { content: settingsText, placement: tooltip }, /* @__PURE__ */ React.createElement(Button, { className: "vds-menu-button vds-button", "aria-label": settingsText }, /* @__PURE__ */ React.createElement(Icons.Menu.Settings, { className: "vds-icon vds-rotate-icon" }))), noModal || !isSmallLayout ? Content : /* @__PURE__ */ React.createElement(
    Portal,
    {
      className: portalClass,
      disabled: "fullscreen",
      "data-size": isSmallLayout ? "sm" : null
    },
    Content
  ));
}
DefaultSettingsMenu.displayName = "DefaultSettingsMenu";
function DefaultSubmenuButton({ label, hint, Icon, disabled }) {
  const { Icons } = React.useContext(DefaultLayoutContext);
  return /* @__PURE__ */ React.createElement(Button, { className: "vds-menu-button", disabled }, /* @__PURE__ */ React.createElement(Icons.Menu.ArrowLeft, { className: "vds-menu-button-close-icon vds-icon" }), /* @__PURE__ */ React.createElement(Icon, { className: "vds-menu-button-icon" }), /* @__PURE__ */ React.createElement("span", { className: "vds-menu-button-label" }, label), /* @__PURE__ */ React.createElement("span", { className: "vds-menu-button-hint" }, hint), /* @__PURE__ */ React.createElement(Icons.Menu.ArrowRight, { className: "vds-menu-button-open-icon vds-icon" }));
}
DefaultSubmenuButton.displayName = "DefaultSubmenuButton";
function DefaultAudioSubmenu() {
  const { Icons } = React.useContext(DefaultLayoutContext), label = useDefaultLayoutLang("Audio"), defaultText = useDefaultLayoutLang("Default"), track = useMediaState("audioTrack"), options = useAudioOptions();
  return /* @__PURE__ */ React.createElement(Root$5, { className: "vds-audio-menu vds-menu" }, /* @__PURE__ */ React.createElement(
    DefaultSubmenuButton,
    {
      label,
      hint: track?.label ?? defaultText,
      disabled: options.disabled,
      Icon: Icons.Menu.Audio
    }
  ), /* @__PURE__ */ React.createElement(Items, { className: "vds-menu-items" }, /* @__PURE__ */ React.createElement(
    Root$3,
    {
      className: "vds-audio-radio-group vds-radio-group",
      value: options.selectedValue
    },
    options.map(({ label: label2, value, select }) => /* @__PURE__ */ React.createElement(
      Item,
      {
        className: "vds-audio-radio vds-radio",
        value,
        onSelect: select,
        key: value
      },
      /* @__PURE__ */ React.createElement("div", { className: "vds-radio-check" }),
      /* @__PURE__ */ React.createElement("span", { className: "vds-radio-label" }, label2)
    ))
  )));
}
DefaultAudioSubmenu.displayName = "DefaultAudioSubmenu";
function DefaultSpeedSubmenu() {
  const { Icons } = React.useContext(DefaultLayoutContext), label = useDefaultLayoutLang("Speed"), normalText = useDefaultLayoutLang("Normal"), options = usePlaybackRateOptions({
    normalLabel: normalText
  }), hint = options.selectedValue === "1" ? normalText : options.selectedValue + "x";
  return /* @__PURE__ */ React.createElement(Root$5, { className: "vds-speed-menu vds-menu" }, /* @__PURE__ */ React.createElement(
    DefaultSubmenuButton,
    {
      label,
      hint,
      disabled: options.disabled,
      Icon: Icons.Menu.Speed
    }
  ), /* @__PURE__ */ React.createElement(Items, { className: "vds-menu-items" }, /* @__PURE__ */ React.createElement(
    Root$3,
    {
      className: "vds-speed-radio-group vds-radio-group",
      value: options.selectedValue
    },
    options.map(({ label: label2, value, select }) => /* @__PURE__ */ React.createElement(
      Item,
      {
        className: "vds-speed-radio vds-radio",
        value,
        onSelect: select,
        key: value
      },
      /* @__PURE__ */ React.createElement("div", { className: "vds-radio-check" }),
      /* @__PURE__ */ React.createElement("span", { className: "vds-radio-label" }, label2)
    ))
  )));
}
DefaultSpeedSubmenu.displayName = "DefaultSpeedSubmenu";
function DefaultQualitySubmenu() {
  const { hideQualityBitrate, Icons } = React.useContext(DefaultLayoutContext), label = useDefaultLayoutLang("Quality"), autoText = useDefaultLayoutLang("Auto"), options = useVideoQualityOptions({ auto: autoText, sort: "descending" }), currentQuality = options.selectedQuality?.height, hint = options.selectedValue !== "auto" && currentQuality ? `${currentQuality}p` : `${autoText}${currentQuality ? ` (${currentQuality}p)` : ""}`;
  return /* @__PURE__ */ React.createElement(Root$5, { className: "vds-quality-menu vds-menu" }, /* @__PURE__ */ React.createElement(
    DefaultSubmenuButton,
    {
      label,
      hint,
      disabled: options.disabled,
      Icon: Icons.Menu.Quality
    }
  ), /* @__PURE__ */ React.createElement(Items, { className: "vds-menu-items" }, /* @__PURE__ */ React.createElement(
    Root$3,
    {
      className: "vds-quality-radio-group vds-radio-group",
      value: options.selectedValue
    },
    options.map(({ label: label2, value, bitrateText, select }) => /* @__PURE__ */ React.createElement(
      Item,
      {
        className: "vds-quality-radio vds-radio",
        value,
        onSelect: select,
        key: value
      },
      /* @__PURE__ */ React.createElement("div", { className: "vds-radio-check" }),
      /* @__PURE__ */ React.createElement("span", { className: "vds-radio-label" }, label2),
      !hideQualityBitrate && bitrateText ? /* @__PURE__ */ React.createElement("span", { className: "vds-radio-hint" }, bitrateText) : null
    ))
  )));
}
DefaultQualitySubmenu.displayName = "DefaultQualitySubmenu";
function DefaultCaptionSubmenu() {
  const { Icons } = React.useContext(DefaultLayoutContext), label = useDefaultLayoutLang("Captions"), offText = useDefaultLayoutLang("Off"), options = useCaptionOptions({ off: offText }), hint = options.selectedTrack?.label ?? offText;
  return /* @__PURE__ */ React.createElement(Root$5, { className: "vds-captions-menu vds-menu" }, /* @__PURE__ */ React.createElement(
    DefaultSubmenuButton,
    {
      label,
      hint,
      disabled: options.disabled,
      Icon: Icons.Menu.Captions
    }
  ), /* @__PURE__ */ React.createElement(Items, { className: "vds-menu-items" }, /* @__PURE__ */ React.createElement(
    Root$3,
    {
      className: "vds-captions-radio-group vds-radio-group",
      value: options.selectedValue
    },
    options.map(({ label: label2, value, select }) => /* @__PURE__ */ React.createElement(
      Item,
      {
        className: "vds-caption-radio vds-radio",
        value,
        onSelect: select,
        key: value
      },
      /* @__PURE__ */ React.createElement("div", { className: "vds-radio-check" }),
      /* @__PURE__ */ React.createElement("span", { className: "vds-radio-label" }, label2)
    ))
  )));
}
DefaultCaptionSubmenu.displayName = "DefaultCaptionSubmenu";

function DefaultAudioMenus() {
  const { isSmallLayout, noModal } = React.useContext(DefaultLayoutContext), placement = noModal ? "top end" : !isSmallLayout ? "top end" : null;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DefaultChaptersMenu, { tooltip: "top", placement, portalClass: "vds-audio-layout" }), /* @__PURE__ */ React.createElement(DefaultSettingsMenu, { tooltip: "top end", placement, portalClass: "vds-audio-layout" }));
}
DefaultAudioMenus.displayName = "DefaultAudioMenus";

function DefaultAudioLayoutLarge() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Captions, { className: "vds-captions" }), /* @__PURE__ */ React.createElement(Root$6, { className: "vds-controls" }, /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement(DefaultTimeSlider, null)), /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement(DefaultSeekButton, { seconds: -10, tooltip: "top start" }), /* @__PURE__ */ React.createElement(DefaultPlayButton, { tooltip: "top center" }), /* @__PURE__ */ React.createElement(DefaultSeekButton, { seconds: 10, tooltip: "top center" }), /* @__PURE__ */ React.createElement(DefaultTimeInfo, null), /* @__PURE__ */ React.createElement(DefaultChapterTitle, null), /* @__PURE__ */ React.createElement(DefaultMuteButton, { tooltip: "top center" }), /* @__PURE__ */ React.createElement(DefaultVolumeSlider, null), /* @__PURE__ */ React.createElement(DefaultCaptionButton, { tooltip: "top center" }), /* @__PURE__ */ React.createElement(DefaultAudioMenus, null))));
}
DefaultAudioLayoutLarge.displayName = "DefaultAudioLayoutLarge";

function DefaultAudioLayoutSmall() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Captions, { className: "vds-captions" }), /* @__PURE__ */ React.createElement(Root$6, { className: "vds-controls" }, /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement(DefaultLivePlayButton, null), /* @__PURE__ */ React.createElement(DefaultMuteButton, { tooltip: "top start" }), /* @__PURE__ */ React.createElement(DefaultLiveButton, null), /* @__PURE__ */ React.createElement(DefaultChapterTitle, null), /* @__PURE__ */ React.createElement(DefaultCaptionButton, { tooltip: "top center" }), /* @__PURE__ */ React.createElement(DefaultAudioMenus, null)), /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement(DefaultTimeSlider, null)), /* @__PURE__ */ React.createElement(DefaultTimeControlsGroup, null), /* @__PURE__ */ React.createElement(DefaultBottomControlsGroup, null)));
}
DefaultAudioLayoutSmall.displayName = "DefaultAudioLayoutSmall";
function DefaultLivePlayButton() {
  const live = useMediaState("live"), canSeek = useMediaState("canSeek");
  return live && !canSeek ? /* @__PURE__ */ React.createElement(DefaultPlayButton, { tooltip: "top start" }) : null;
}
DefaultLivePlayButton.displayName = "DefaultLivePlayButton";
function DefaultTimeControlsGroup() {
  const live = useMediaState("live");
  return !live ? /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement(Time, { className: "vds-time", type: "current" }), /* @__PURE__ */ React.createElement("div", { className: "vds-controls-spacer" }), /* @__PURE__ */ React.createElement(Time, { className: "vds-time", type: "duration" })) : null;
}
DefaultTimeControlsGroup.displayName = "DefaultTimeControlsGroup";
function DefaultBottomControlsGroup() {
  const canSeek = useMediaState("canSeek");
  return canSeek ? /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement("div", { className: "vds-controls-spacer" }), /* @__PURE__ */ React.createElement(DefaultSeekButton, { seconds: -10, tooltip: "top center" }), /* @__PURE__ */ React.createElement(DefaultPlayButton, { tooltip: "top center" }), /* @__PURE__ */ React.createElement(DefaultSeekButton, { seconds: 10, tooltip: "top center" }), /* @__PURE__ */ React.createElement("div", { className: "vds-controls-spacer" })) : null;
}
DefaultBottomControlsGroup.displayName = "DefaultBottomControlsGroup";

const MediaLayout$1 = createDefaultMediaLayout({
  type: "audio",
  smLayoutWhen: "(width < 576)",
  SmallLayout: DefaultAudioLayoutSmall,
  LargeLayout: DefaultAudioLayoutLarge
});
function DefaultAudioLayout(props) {
  return /* @__PURE__ */ React.createElement(MediaLayout$1, { ...props });
}
DefaultAudioLayout.displayName = "DefaultAudioLayout";

const MediaLayout = createDefaultMediaLayout({
  type: "video",
  smLayoutWhen: "(width < 576) or (height < 380)",
  SmallLayout: DefaultVideoLayoutSmall,
  LargeLayout: DefaultVideoLayoutLarge,
  UnknownStreamType: DefaultBufferingIndicator
});
function DefaultVideoLayout(props) {
  return /* @__PURE__ */ React.createElement(MediaLayout, { ...props });
}
DefaultVideoLayout.displayName = "DefaultVideoLayout";
function DefaultVideoLayoutLarge() {
  const { menuGroup } = React.useContext(DefaultLayoutContext);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DefaultVideoGestures, null), /* @__PURE__ */ React.createElement(DefaultBufferingIndicator, null), /* @__PURE__ */ React.createElement(Captions, { className: "vds-captions" }), /* @__PURE__ */ React.createElement(Root$6, { className: "vds-controls" }, /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement("div", { className: "vds-controls-spacer" }), menuGroup === "top" && /* @__PURE__ */ React.createElement(DefaultVideoMenus, null)), /* @__PURE__ */ React.createElement("div", { className: "vds-controls-spacer" }), /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement(DefaultTimeSlider, null)), /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement(DefaultPlayButton, { tooltip: "top start" }), /* @__PURE__ */ React.createElement(DefaultMuteButton, { tooltip: "top" }), /* @__PURE__ */ React.createElement(DefaultVolumeSlider, null), /* @__PURE__ */ React.createElement(DefaultTimeInfo, null), /* @__PURE__ */ React.createElement(DefaultChapterTitle, null), /* @__PURE__ */ React.createElement(DefaultCaptionButton, { tooltip: "top" }), menuGroup === "bottom" && /* @__PURE__ */ React.createElement(DefaultVideoMenus, null), /* @__PURE__ */ React.createElement(DefaultPIPButton, { tooltip: "top" }), /* @__PURE__ */ React.createElement(DefaultFullscreenButton, { tooltip: "top end" }))));
}
DefaultVideoLayoutLarge.displayName = "DefaultVideoLayoutLarge";
function DefaultVideoLayoutSmall() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DefaultVideoGestures, null), /* @__PURE__ */ React.createElement(DefaultBufferingIndicator, null), /* @__PURE__ */ React.createElement(Captions, { className: "vds-captions" }), /* @__PURE__ */ React.createElement(Root$6, { className: "vds-controls" }, /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement("div", { className: "vds-controls-spacer" }), /* @__PURE__ */ React.createElement(DefaultCaptionButton, { tooltip: "bottom" }), /* @__PURE__ */ React.createElement(DefaultVideoMenus, null), /* @__PURE__ */ React.createElement(DefaultMuteButton, { tooltip: "bottom end" })), /* @__PURE__ */ React.createElement("div", { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement(DefaultPlayButton, { tooltip: "top" })), /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement(DefaultTimeInfo, null), /* @__PURE__ */ React.createElement(DefaultChapterTitle, null), /* @__PURE__ */ React.createElement("div", { className: "vds-controls-spacer" }), /* @__PURE__ */ React.createElement(DefaultFullscreenButton, { tooltip: "top end" })), /* @__PURE__ */ React.createElement(Group, { className: "vds-controls-group" }, /* @__PURE__ */ React.createElement(DefaultTimeSlider, null))), /* @__PURE__ */ React.createElement(DefaultVideoStartDuration, null));
}
DefaultVideoLayoutSmall.displayName = "DefaultVideoLayoutSmall";
function DefaultVideoStartDuration() {
  const $duration = useMediaState("duration");
  if ($duration === 0)
    return null;
  return /* @__PURE__ */ React.createElement("div", { className: "vds-start-duration" }, /* @__PURE__ */ React.createElement(Time, { className: "vds-time", type: "duration" }));
}
DefaultVideoStartDuration.displayName = "DefaultVideoStartDuration";
function DefaultVideoGestures() {
  return /* @__PURE__ */ React.createElement("div", { className: "vds-gestures" }, /* @__PURE__ */ React.createElement(Gesture, { className: "vds-gesture", event: "pointerup", action: "toggle:paused" }), /* @__PURE__ */ React.createElement(Gesture, { className: "vds-gesture", event: "pointerup", action: "toggle:controls" }), /* @__PURE__ */ React.createElement(Gesture, { className: "vds-gesture", event: "dblpointerup", action: "toggle:fullscreen" }), /* @__PURE__ */ React.createElement(Gesture, { className: "vds-gesture", event: "dblpointerup", action: "seek:-10" }), /* @__PURE__ */ React.createElement(Gesture, { className: "vds-gesture", event: "dblpointerup", action: "seek:10" }));
}
DefaultVideoGestures.displayName = "DefaultVideoGestures";
function DefaultBufferingIndicator() {
  return /* @__PURE__ */ React.createElement("div", { className: "vds-buffering-indicator" }, /* @__PURE__ */ React.createElement(Root$7, { className: "vds-buffering-spinner" }, /* @__PURE__ */ React.createElement(Track$1, { className: "vds-buffering-track" }), /* @__PURE__ */ React.createElement(TrackFill$1, { className: "vds-buffering-track-fill" })));
}
DefaultBufferingIndicator.displayName = "DefaultBufferingIndicator";
function DefaultVideoMenus() {
  const { isSmallLayout, noModal, menuGroup } = React.useContext(DefaultLayoutContext), side = menuGroup === "top" || isSmallLayout ? "bottom" : "top", tooltip = `${side} end`, placement = noModal ? `${side} end` : !isSmallLayout ? `${side} end` : null;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DefaultChaptersMenu, { tooltip, placement, portalClass: "vds-video-layout" }), /* @__PURE__ */ React.createElement(DefaultSettingsMenu, { tooltip, placement, portalClass: "vds-video-layout" }));
}
DefaultVideoMenus.displayName = "DefaultVideoMenus";

export { DefaultLayoutContext as D, DefaultAudioLayout, DefaultBufferingIndicator, DefaultCaptionButton, DefaultChapterTitle, DefaultChaptersMenu, DefaultFullscreenButton, DefaultLiveButton, DefaultMuteButton, DefaultPIPButton, DefaultPlayButton, DefaultSeekButton, DefaultSettingsMenu, DefaultSubmenuButton, DefaultTimeGroup, DefaultTimeInfo, DefaultTimeSlider, DefaultTooltip, DefaultVideoGestures, DefaultVideoLayout, DefaultVideoLayoutLarge, DefaultVideoLayoutSmall, DefaultVolumeSlider, createDefaultMediaLayout, useDefaultLayoutLang as u };
