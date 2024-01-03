"use client"

import { q as onDispose, l as listenEvent, D as DOMEvent, x as scoped } from './vidstack-8AXyyPGc.js';
import { b as TextTrack, d as TextTrackSymbol, m as canUsePictureInPicture, n as canUseVideoPresentation, o as canPlayHLSNatively } from './vidstack-rVU9ynQ5.js';
import { H as HTMLMediaProvider } from './vidstack-4Qbe6uzp.js';
import 'react';
import './vidstack-Bio1UGiO.js';

class NativeHLSTextTracks {
  constructor(_video, _ctx) {
    this.m = _video;
    this.b = _ctx;
    _video.textTracks.onaddtrack = this.Xc.bind(this);
    onDispose(this.dd.bind(this));
  }
  Xc(event) {
    const nativeTrack = event.track;
    if (!nativeTrack || findTextTrackElement(this.m, nativeTrack))
      return;
    const track = new TextTrack({
      id: nativeTrack.id,
      kind: nativeTrack.kind,
      label: nativeTrack.label,
      language: nativeTrack.language,
      type: "vtt"
    });
    track[TextTrackSymbol.U] = { track: nativeTrack };
    track[TextTrackSymbol.N] = 2;
    track[TextTrackSymbol.ue] = true;
    let lastIndex = 0;
    const onCueChange = (event2) => {
      if (!nativeTrack.cues)
        return;
      for (let i = lastIndex; i < nativeTrack.cues.length; i++) {
        track.addCue(nativeTrack.cues[i], event2);
        lastIndex++;
      }
    };
    onCueChange(event);
    nativeTrack.oncuechange = onCueChange;
    this.b.textTracks.add(track, event);
    track.setMode(nativeTrack.mode, event);
  }
  dd() {
    this.m.textTracks.onaddtrack = null;
    for (const track of this.b.textTracks) {
      const nativeTrack = track[TextTrackSymbol.U]?.track;
      if (nativeTrack?.oncuechange)
        nativeTrack.oncuechange = null;
    }
  }
}
function findTextTrackElement(video, track) {
  return Array.from(video.children).find((el) => el.track === track);
}

class VideoPictureInPicture {
  constructor(_video, _media) {
    this.m = _video;
    this.a = _media;
    this.C = (active, event) => {
      this.a.delegate.c("picture-in-picture-change", active, event);
    };
    listenEvent(this.m, "enterpictureinpicture", this.Kg.bind(this));
    listenEvent(this.m, "leavepictureinpicture", this.Lg.bind(this));
  }
  get active() {
    return document.pictureInPictureElement === this.m;
  }
  get supported() {
    return canUsePictureInPicture(this.m);
  }
  async enter() {
    return this.m.requestPictureInPicture();
  }
  exit() {
    return document.exitPictureInPicture();
  }
  Kg(event) {
    this.C(true, event);
  }
  Lg(event) {
    this.C(false, event);
  }
}

class VideoPresentation {
  constructor(_video, _media) {
    this.m = _video;
    this.a = _media;
    this.J = "inline";
    listenEvent(this.m, "webkitpresentationmodechanged", this.Va.bind(this));
  }
  get Te() {
    return canUseVideoPresentation(this.m);
  }
  async lc(mode) {
    if (this.J === mode)
      return;
    this.m.webkitSetPresentationMode(mode);
  }
  Va(event) {
    const prevMode = this.J;
    this.J = this.m.webkitPresentationMode;
    this.a.player?.dispatch(
      new DOMEvent("video-presentation-change", {
        detail: this.J,
        trigger: event
      })
    );
    ["fullscreen", "picture-in-picture"].forEach((type) => {
      if (this.J === type || prevMode === type) {
        this.a.delegate.c(`${type}-change`, this.J === type, event);
      }
    });
  }
}
class FullscreenPresentationAdapter {
  constructor(_presentation) {
    this.ga = _presentation;
  }
  get active() {
    return this.ga.J === "fullscreen";
  }
  get supported() {
    return this.ga.Te;
  }
  async enter() {
    this.ga.lc("fullscreen");
  }
  async exit() {
    this.ga.lc("inline");
  }
}
class PIPPresentationAdapter {
  constructor(_presentation) {
    this.ga = _presentation;
  }
  get active() {
    return this.ga.J === "picture-in-picture";
  }
  get supported() {
    return this.ga.Te;
  }
  async enter() {
    this.ga.lc("picture-in-picture");
  }
  async exit() {
    this.ga.lc("inline");
  }
}

class VideoProvider extends HTMLMediaProvider {
  constructor(video, ctx) {
    super(video);
    this.$$PROVIDER_TYPE = "VIDEO";
    scoped(() => {
      if (canUseVideoPresentation(video)) {
        const presentation = new VideoPresentation(video, ctx);
        this.fullscreen = new FullscreenPresentationAdapter(presentation);
        this.pictureInPicture = new PIPPresentationAdapter(presentation);
      } else if (canUsePictureInPicture(video)) {
        this.pictureInPicture = new VideoPictureInPicture(video, ctx);
      }
    }, this.scope);
  }
  get type() {
    return "video";
  }
  setup(ctx) {
    super.setup(ctx);
    if (canPlayHLSNatively(this.video)) {
      new NativeHLSTextTracks(this.video, ctx);
    }
    ctx.textRenderers.Ge(this.video);
    onDispose(() => {
      ctx.textRenderers.Ge(null);
    });
    if (this.type === "video")
      ctx.delegate.c("provider-setup", this);
  }
  /**
   * The native HTML `<video>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement}
   */
  get video() {
    return this.a;
  }
}

export { VideoProvider };
