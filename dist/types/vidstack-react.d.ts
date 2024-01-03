import { M as MediaPlayer$1, a as MediaProvider$1, C as Controls, b as ControlsGroup, T as ToggleButton$1, c as CaptionButton$1, F as FullscreenButton$1, L as LiveButton$1, d as MuteButton$1, P as PIPButton$1, e as PlayButton$1, S as SeekButton$1, f as Tooltip, g as TooltipTrigger, h as TooltipContent, i as Slider, j as TimeSlider, V as VolumeSlider, k as SliderThumbnail, l as SliderValue, m as SliderVideo, n as SliderPreview, o as SliderChapters, p as Menu, q as MenuButton, r as MenuItems, s as MenuItem, t as MenuPortal, R as RadioGroup, u as Radio, v as Captions$1, G as Gesture$1, w as Poster$1, x as Thumbnail$1, y as Time$1, z as PlayerSrc$1, A as MediaProviderLoader, B as MediaProviderAdapter, D as MediaRemoteControl, E as MediaState, H as SliderState, I as SliderOrientation, J as TextTrack, K as TextTrackInit, N as AudioTrack, O as VideoQuality, b$ as MediaSrc, bU as MediaType, d2 as MediaSetupContext, c9 as TimeRange, at as MediaEvents, ew as DefaultLayoutTranslations, eE as TooltipPlacement } from './vidstack.js';
import { h as ReactElementProps, i as ReactProps, A as AnyRecord, S as State, f as Component, p as DisposalBin, c as Scope, W as WriteSignal, a as DeferredPromise, I as InferEventDetail } from './vidstack-framework.js';
import * as React from 'react';
import { CaptionsFileFormat, CaptionsParserFactory, VTTCue } from 'media-captions';
import { PlayableMediaTag, TimelineContextValue, SetTimelineContextValue, SetMediaVolumeContextValue } from 'remotion';

declare class MediaPlayerInstance extends MediaPlayer$1 {
}
declare class MediaProviderInstance extends MediaProvider$1 {
}
declare class ControlsInstance extends Controls {
}
declare class ControlsGroupInstance extends ControlsGroup {
}
declare class ToggleButtonInstance extends ToggleButton$1 {
}
declare class CaptionButtonInstance extends CaptionButton$1 {
}
declare class FullscreenButtonInstance extends FullscreenButton$1 {
}
declare class LiveButtonInstance extends LiveButton$1 {
}
declare class MuteButtonInstance extends MuteButton$1 {
}
declare class PIPButtonInstance extends PIPButton$1 {
}
declare class PlayButtonInstance extends PlayButton$1 {
}
declare class SeekButtonInstance extends SeekButton$1 {
}
declare class TooltipInstance extends Tooltip {
}
declare class TooltipTriggerInstance extends TooltipTrigger {
}
declare class TooltipContentInstance extends TooltipContent {
}
declare class SliderInstance extends Slider {
}
declare class TimeSliderInstance extends TimeSlider {
}
declare class VolumeSliderInstance extends VolumeSlider {
}
declare class SliderThumbnailInstance extends SliderThumbnail {
}
declare class SliderValueInstance extends SliderValue {
}
declare class SliderVideoInstance extends SliderVideo {
}
declare class SliderPreviewInstance extends SliderPreview {
}
declare class SliderChaptersInstance extends SliderChapters {
}
declare class MenuInstance extends Menu {
}
declare class MenuButtonInstance extends MenuButton {
}
declare class MenuItemsInstance extends MenuItems {
}
declare class MenuItemInstance extends MenuItem {
}
declare class MenuPortalInstance extends MenuPortal {
}
declare class RadioGroupInstance extends RadioGroup {
}
declare class RadioInstance extends Radio {
}
declare class CaptionsInstance extends Captions$1 {
}
declare class GestureInstance extends Gesture$1 {
}
declare class PosterInstance extends Poster$1 {
}
declare class ThumbnailInstance extends Thumbnail$1 {
}
declare class TimeInstance extends Time$1 {
}

interface RemotionMediaResource<InputProps extends RemotionInputProps = RemotionInputProps> {
    /** React component which is generally a Remotion video. */
    src: React.ComponentType;
    /** Remotion source type. */
    type: 'video/remotion';
    /**
     * Pass props to the component that you have specified using the component prop.
     */
    inputProps?: InputProps;
    /**
     * The width of the composition.
     *
     * @defaultValue 1920
     */
    compositionWidth?: number;
    /**
     * The height of the composition.
     *
     * @defaultValue 1080
     */
    compositionHeight?: number;
    /**
     * The frame rate of the video per second.
     *
     * @defaultValue 30
     */
    fps?: number;
    /**
     * The duration of the video in frames. Must be an integer and greater than 0.
     */
    durationInFrames: number;
    /**
     * Start the playback from a specific frame.
     *
     * @defaultValue 0
     */
    initialFrame?: number;
    /**
     * Limit playback to only play after a certain frame. The video will start from this frame and
     * move to this position once it has ended. Must be an integer, not smaller than 0, not bigger
     * than `outFrame` and not bigger than `durationInFrames - 1`.
     *
     * @defaultValue 0
     */
    inFrame?: number | null;
    /**
     * Limit playback to only play before a certain frame. The video will end at this frame
     * and move to the beginning once it has ended. Must be an integer, not smaller than 1, not
     * smaller than `inFrame` and not bigger than `durationInFrames`.
     *
     * @defaultValue `durationInFrames`
     */
    outFrame?: number;
    /**
     * If you use an `<Audio />` tag, it might not play in some browsers (specifically iOS Safari)
     * due to browser autoplay policies. This is why the player pre-mounts a set of audio tags with
     * silent audio that get played upon user interaction. These audio tags can then be used to play
     * real audio later and will not be subject to the autoplay policy of the browser.
     *
     * This option controls how many audio tags are being rendered, the default is 5. If you mount
     * more audio tags than shared audio tags are available, then an error will be thrown.
     *
     * If you'd like to opt out of this behavior, you can pass 0 to mount native audio tags
     * simultaneously as you mount Remotion's <Audio /> tags.
     *
     * @defaultValue 5
     */
    numberOfSharedAudioTags?: number;
    /**
     * A callback function that allows you to return a custom UI that gets displayed while the
     * provider is loading.
     */
    renderLoading?: RemotionLoadingRenderer;
    /**
     * A callback for rendering a custom error message.
     */
    errorFallback?: RemotionErrorRenderer;
    /**
     * Called when an error or uncaught exception has happened in the video.
     */
    onError?(error: Error): void;
}
interface RemotionInputProps extends Record<string, unknown> {
}
interface RemotionLoadingRenderer {
    (): React.ReactNode;
}
interface RemotionErrorRenderer {
    (error: Error): React.ReactNode;
}

type PlayerSrc = PlayerSrc$1 | RemotionMediaResource;

interface MediaPlayerProps extends Omit<ReactElementProps<MediaPlayerInstance>, 'src'> {
    /**
     * The URL or object of the current media resource/s to be considered for playback.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/loading#loading-source}
     */
    src?: PlayerSrc;
    aspectRatio?: string;
    asChild?: boolean;
    children: React.ReactNode;
    ref?: React.Ref<MediaPlayerInstance>;
}
/**
 * All media components exist inside the `<MediaPlayer>` component. This component's main
 * responsibilities are to manage media state updates, dispatch media events, handle media
 * requests, and expose media state through HTML attributes and CSS properties for styling
 * purposes.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/player}
 * @example
 * ```tsx
 * <MediaPlayer src="...">
 *   <MediaProvider />
 * </MediaPlayer>
 * ```
 */
declare const MediaPlayer: React.ForwardRefExoticComponent<Omit<MediaPlayerProps, "ref"> & React.RefAttributes<MediaPlayerInstance>>;

interface MediaProviderProps extends Omit<ReactElementProps<MediaProviderInstance>, 'loaders'> {
    loaders?: Array<{
        new (): MediaProviderLoader;
    }>;
    mediaProps?: React.HTMLAttributes<HTMLMediaElement>;
    children?: React.ReactNode;
    ref?: React.Ref<MediaProviderInstance>;
}
/**
 * Renders the current provider at this component location.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/provider}
 * @example
 * ```tsx
 * <MediaPlayer src="...">
 *   <MediaProvider />
 * </MediaPlayer>
 * ```
 */
declare const MediaProvider: React.ForwardRefExoticComponent<Omit<MediaProviderProps, "ref"> & React.RefAttributes<MediaProviderInstance>>;

interface IconProps extends React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>, React.RefAttributes<SVGElement | SVGSVGElement> {
    /**
     * The horizontal (width) and vertical (height) length of the underlying `<svg>` element.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/width}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/height}
     */
    size?: number;
    part?: string;
    paths?: string;
}
interface IconComponent extends React.ForwardRefExoticComponent<IconProps> {
}
declare const Icon: IconComponent;

/**
 * Creates a new `TextTrack` object and adds it to the player.
 *
 * @see {@link https://www.vidstack.io/docs/player/api/text-tracks}
 * @example
 * ```tsx
 * <MediaPlayer>
 *   <MediaProvider>
 *     <Track
 *       src="english.vtt"
 *       kind="subtitles"
 *       label="English"
 *       lang="en-US"
 *       default
 *     />
 *   </MediaProvider>
 * </MediaPlayer>
 * ```
 */
declare function Track$2({ lang, ...props }: TrackProps$2): null;
declare namespace Track$2 {
    var displayName: string;
}
interface TrackProps$2 {
    /**
     * A unique identifier.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/id}
     */
    readonly id?: string;
    /**
     * URL of the text track resource. This attribute must be specified and its URL value must have
     * the same origin as the document — unless the <audio> or <video> parent element of the track
     * element has a `crossorigin` attribute.
     */
    readonly src?: string;
    /**
     * Used to directly pass in text track file contents.
     */
    readonly content?: string;
    /**
     * The captions file format to be parsed or a custom parser factory (functions that returns a
     * captions parser). Supported types include: 'vtt', 'srt', 'ssa', 'ass', and 'json'.
     *
     * @defaultValue 'vtt'
     */
    readonly type?: 'json' | CaptionsFileFormat | CaptionsParserFactory;
    /**
     * The text encoding type to be used when decoding data bytes to text.
     *
     * @defaultValue 'utf-8'
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API/Encodings}
     *
     */
    readonly encoding?: string;
    /**
     * Indicates that the track should be enabled unless the user's preferences indicate that
     * another track is more appropriate. This may only be used on one track element per media
     * element.
     *
     * @defaultValue false
     */
    readonly default?: boolean;
    /**
     * The kind of text track this object represents. This decides how the track will be handled
     * by the player.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/kind}
     */
    readonly kind: TextTrackKind;
    /**
     * A human-readable label for the text track. This will be displayed to the user.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/label}
     */
    readonly label?: string;
    /**
     * A string containing a language identifier. For example, `"en-US"` for United States English
     * or `"pt-BR"` for Brazilian Portuguese.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/language}
     * @see {@link https://datatracker.ietf.org/doc/html/rfc5646}
     */
    readonly language?: string;
    /**
     * A string containing a language identifier. For example, `"en-US"` for United States English
     * or `"pt-BR"` for Brazilian Portuguese. This is a short alias for `language`.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/language}
     * @see {@link https://datatracker.ietf.org/doc/html/rfc5646}
     */
    readonly lang?: TrackProps$2['language'];
    /**
     * React list key.
     */
    readonly key?: string;
}

interface RootProps$9 extends ReactElementProps<ControlsInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * This component creates a container for control groups.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/controls}
 * @example
 * ```tsx
 * <Controls.Root>
 *   <Controls.Group></Controls.Group>
 *   <Controls.Group></Controls.Group>
 * <Controls.Root>
 * ```
 */
declare const Root$9: React.ForwardRefExoticComponent<Omit<RootProps$9, "ref"> & React.RefAttributes<HTMLElement>>;
interface GroupProps extends ReactElementProps<ControlsGroupInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * This component creates a container for media controls.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/controls#group}
 * @example
 * ```tsx
 * <Controls.Root>
 *   <Controls.Group></Controls.Group>
 *   <Controls.Group></Controls.Group>
 * <Controls.Root>
 * ```
 */
declare const Group: React.ForwardRefExoticComponent<Omit<GroupProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare const controls_d_Group: typeof Group;
type controls_d_GroupProps = GroupProps;
declare namespace controls_d {
  export { controls_d_Group as Group, type controls_d_GroupProps as GroupProps, Root$9 as Root, type RootProps$9 as RootProps };
}

interface RootProps$8 extends ReactProps<TooltipInstance> {
    asChild?: boolean;
    children: React.ReactNode;
}
/**
 * A contextual text bubble that displays a description for an element that appears on pointer
 * hover or keyboard focus.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role}
 * @example
 * ```tsx
 * <Tooltip.Root>
 *   <Tooltip.Trigger></Tooltip.Trigger>
 *   <Tooltip.Content></Tooltip.Content>
 * </Tooltip.Root>
 * ```
 */
declare function Root$8({ children, ...props }: RootProps$8): React.JSX.Element;
declare namespace Root$8 {
    var displayName: string;
}
interface TriggerProps extends ReactElementProps<TooltipTriggerInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * Wraps the element that will trigger showing/hiding the tooltip on hover or keyboard focus. The
 * tooltip content is positioned relative to this element.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 * @example
 * ```tsx
 * <Tooltip.Root>
 *   <Tooltip.Trigger></Tooltip.Trigger>
 *   <Tooltip.Content></Tooltip.Content>
 * </Tooltip.Root>
 * ```
 */
declare const Trigger: React.ForwardRefExoticComponent<Omit<TriggerProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
interface ContentProps extends ReactElementProps<TooltipContentInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * This component contains the content that is visible when the tooltip trigger is interacted with.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/tooltip}
 * @example
 * ```tsx
 * <Tooltip.Root>
 *   <Tooltip.Trigger></Tooltip.Trigger>
 *   <Tooltip.Content></Tooltip.Content>
 * </Tooltip.Root>
 * ```
 */
declare const Content: React.ForwardRefExoticComponent<Omit<ContentProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare const tooltip_d_Content: typeof Content;
type tooltip_d_ContentProps = ContentProps;
declare const tooltip_d_Trigger: typeof Trigger;
type tooltip_d_TriggerProps = TriggerProps;
declare namespace tooltip_d {
  export { tooltip_d_Content as Content, type tooltip_d_ContentProps as ContentProps, Root$8 as Root, type RootProps$8 as RootProps, tooltip_d_Trigger as Trigger, type tooltip_d_TriggerProps as TriggerProps };
}

interface ToggleButtonProps extends ReactElementProps<ToggleButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A toggle button is a two-state button that can be either off (not pressed) or on (pressed).
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/toggle-button}
 * @example
 * ```tsx
 * <ToggleButton aria-label="...">
 *   <OnIcon />
 *   <OffIcon />
 * </ToggleButton>
 * ```
 */
declare const ToggleButton: React.ForwardRefExoticComponent<Omit<ToggleButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface PlayButtonProps extends ReactElementProps<PlayButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the playback state (play/pause) of the current media.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/play-button}
 * @example
 * ```tsx
 * const isPaused = useMediaState('paused');
 *
 * <PlayButton>
 *   {isPaused ? <PlayIcon /> : <PauseIcon />}
 * </PlayButton>
 * ```
 */
declare const PlayButton: React.ForwardRefExoticComponent<Omit<PlayButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface CaptionButtonProps extends ReactElementProps<CaptionButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the showing state of the captions.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/caption-button}
 * @example
 * ```tsx
 * const track = useMediaState('textTrack'),
 *   isOn = track && isTrackCaptionKind(track);
 *
 * <CaptionButton>
 *   {isOn ? <OnIcon /> : <OffIcon />}
 * </CaptionButton>
 * ```
 */
declare const CaptionButton: React.ForwardRefExoticComponent<Omit<CaptionButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface FullscreenButtonProps extends ReactElementProps<FullscreenButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the fullscreen mode of the player.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/fullscreen-button}
 * @see {@link https://www.vidstack.io/docs/player/core-concepts/fullscreen}
 * @example
 * ```tsx
 * const isActive = useMediaState('fullscreen');
 *
 * <FullscreenButton>
 *   {!isActive ? <EnterIcon /> : <ExitIcon />}
 * </FullscreenButton>
 * ```
 */
declare const FullscreenButton: React.ForwardRefExoticComponent<Omit<FullscreenButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface MuteButtonProps extends ReactElementProps<MuteButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the muted state of the player.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/mute-button}
 * @example
 * ```tsx
 * const volume = useMediaState('volume'),
 *   isMuted = useMediaState('muted');
 *
 * <MuteButton>
 *   {isMuted || volume == 0 ? (
 *     <MuteIcon />
 *   ) : volume < 0.5 ? (
 *     <VolumeLowIcon />
 *   ) : (
 *     <VolumeHighIcon />
 *   )}
 * </MuteButton>
 * ```
 */
declare const MuteButton: React.ForwardRefExoticComponent<Omit<MuteButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface PIPButtonProps extends ReactElementProps<PIPButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for toggling the picture-in-picture (PIP) mode of the player.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/pip-button}
 * @see {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture}
 * @example
 * ```tsx
 * const isActive = useMediaState('pictureInPicture');
 *
 * <PIPButton>
 *   {!isActive ? <EnterIcon /> : <ExitIcon />}
 * </PIPButton>
 * ```
 */
declare const PIPButton: React.ForwardRefExoticComponent<Omit<PIPButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface SeekButtonProps extends ReactElementProps<SeekButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button for seeking the current media playback forwards or backwards by a specified amount.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/seek-button}
 * @example
 * ```tsx
 * <SeekButton seconds={-10}>
 *   <SeekBackwardIcon />
 * </SeekButton>
 *
 * <SeekButton seconds={10}>
 *   <SeekForwardIcon />
 * </SeekButton>
 * ```
 */
declare const SeekButton: React.ForwardRefExoticComponent<Omit<SeekButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface LiveButtonProps extends ReactElementProps<LiveButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * This component displays the current live status of the stream. This includes whether it's
 * live, at the live edge, or not live. In addition, this component is a button during live streams
 * and will skip ahead to the live edge when pressed.
 *
 * 🚨 This component will have `aria-hidden="true"` applied when the current stream is _not_
 * live.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/live-button}
 * @example
 * ```tsx
 * <LiveButton>
 *   <LiveIcon />
 * </LiveButton>
 * ```
 */
declare const LiveButton: React.ForwardRefExoticComponent<Omit<LiveButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

type PrimitivePropsWithRef<E extends React.ElementType> = Omit<React.ComponentPropsWithRef<E>, 'style'> & {
    asChild?: boolean;
    style?: React.CSSProperties | (React.CSSProperties & Record<`--${string}`, string | null | undefined>) | undefined;
};

interface SliderValueProps extends ReactElementProps<SliderValueInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}

interface RootProps$7 extends ReactElementProps<SliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<SliderInstance>;
}
/**
 * Versatile and user-friendly input control designed for seamless cross-browser compatibility and
 * accessibility with ARIA support. It offers a smooth user experience for both mouse and touch
 * interactions and is highly customizable in terms of styling. Users can effortlessly input numeric
 * values within a specified range, defined by a minimum and maximum value.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider}
 * @example
 * ```tsx
 * <Slider.Root>
 *   <Slider.Track>
 *     <Slider.TrackFill />
 *   </Slider.Track>
 *   <Slider.Thumb />
 * </Slider.Root>
 * ```
 */
declare const Root$7: React.ForwardRefExoticComponent<Omit<RootProps$7, "ref"> & React.RefAttributes<SliderInstance>>;
interface ThumbProps extends PrimitivePropsWithRef<'div'> {
}
/**
 * Purely visual element used to display a draggable handle to the user for adjusting the value
 * on the slider component.
 *
 * @example
 * ```tsx
 * <Slider.Root>
 *   <Slider.Thumb />
 * </Slider.Root>
 * ```
 */
declare const Thumb: React.ForwardRefExoticComponent<Omit<ThumbProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface TrackProps$1 extends PrimitivePropsWithRef<'div'> {
}
/**
 * Visual element inside the slider that serves as a horizontal or vertical bar, providing a
 * visual reference for the range or values that can be selected by moving the slider thumb along
 * it. Users can interact with the slider by dragging the thumb along the track to set a specific
 * value.
 *
 * @example
 * ```tsx
 * <Slider.Root>
 *   <Slider.Track>
 *     <Slider.TrackFill />
 *   </Slider.Track>
 * </Slider.Root>
 * ```
 */
declare const Track$1: React.ForwardRefExoticComponent<Omit<TrackProps$1, "ref"> & React.RefAttributes<HTMLElement>>;
interface TrackFillProps$1 extends PrimitivePropsWithRef<'div'> {
}
/**
 * Portion of the slider track that is visually filled or highlighted to indicate the selected or
 * currently chosen range or value. As the slider thumb is moved along the track, the track
 * fill dynamically adjusts to visually represent the portion of the track that corresponds to the
 * selected value or range, providing users with a clear visual indication of their selection.
 *
 * @example
 * ```tsx
 * <Slider.Root>
 *   <Slider.Track>
 *     <Slider.TrackFill />
 *   </Slider.Track>
 * </Slider.Root>
 * ```
 */
declare const TrackFill$1: React.ForwardRefExoticComponent<Omit<TrackFillProps$1, "ref"> & React.RefAttributes<HTMLElement>>;
interface PreviewProps extends ReactElementProps<SliderPreviewInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Used to provide users with a real-time or interactive preview of the value or selection they
 * are making as they move the slider thumb. This can include displaying the current pointer
 * value numerically, or displaying a thumbnail over the time slider.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/slider#preview}
 * @example
 * ```tsx
 * <Slider.Root>
 *   <Slider.Preview>
 *     <Slider.Value />
 *   </Slider.Preview>
 * </Slider.Root>
 * ```
 */
declare const Preview: React.ForwardRefExoticComponent<Omit<PreviewProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface ValueProps extends SliderValueProps {
}
/**
 * Displays the specific numeric representation of the current or pointer value of the slider.
 * When a user interacts with a slider by moving its thumb along the track, the slider value
 * changes accordingly.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/slider#preview}
 * @example
 * ```tsx
 * <Slider.Root>
 *   <Slider.Preview>
 *     <Slider.Value />
 *   </Slider.Preview>
 * </Slider.Root>
 * ```
 */
declare const Value$2: React.ForwardRefExoticComponent<Omit<ValueProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare const slider_d_Preview: typeof Preview;
type slider_d_PreviewProps = PreviewProps;
declare const slider_d_Thumb: typeof Thumb;
type slider_d_ThumbProps = ThumbProps;
type slider_d_ValueProps = ValueProps;
declare namespace slider_d {
  export { slider_d_Preview as Preview, type slider_d_PreviewProps as PreviewProps, Root$7 as Root, type RootProps$7 as RootProps, slider_d_Thumb as Thumb, type slider_d_ThumbProps as ThumbProps, Track$1 as Track, TrackFill$1 as TrackFill, type TrackFillProps$1 as TrackFillProps, type TrackProps$1 as TrackProps, Value$2 as Value, type slider_d_ValueProps as ValueProps };
}

interface RootProps$6 extends ReactElementProps<VolumeSliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<VolumeSliderInstance>;
}
/**
 * Versatile and user-friendly input volume control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the volume level within the range 0 (muted) to 100.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/volume-slider}
 * @example
 * ```tsx
 * <VolumeSlider.Root>
 *   <VolumeSlider.Track>
 *     <VolumeSlider.TrackFill />
 *   </VolumeSlider.Track>
 *   <VolumeSlider.Thumb />
 * </VolumeSlider.Root>
 * ```
 */
declare const Root$6: React.ForwardRefExoticComponent<Omit<RootProps$6, "ref"> & React.RefAttributes<VolumeSliderInstance>>;
/**
 * Displays the specific numeric representation of the current or pointer value of the volume
 * slider. When a user interacts with a slider by moving its thumb along the track, the slider value
 * and volume updates accordingly.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/volume-slider#preview}
 * @example
 * ```tsx
 * <VolumeSlider.Root>
 *   <VolumeSlider.Preview>
 *     <VolumeSlider.Value />
 *   </VolumeSlider.Preview>
 * </VolumeSlider.Root>
 * ```
 */
declare const Value$1: React.ForwardRefExoticComponent<Omit<ValueProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare const volumeSlider_d_Preview: typeof Preview;
type volumeSlider_d_PreviewProps = PreviewProps;
declare const volumeSlider_d_Thumb: typeof Thumb;
type volumeSlider_d_ThumbProps = ThumbProps;
type volumeSlider_d_ValueProps = ValueProps;
declare namespace volumeSlider_d {
  export { volumeSlider_d_Preview as Preview, type volumeSlider_d_PreviewProps as PreviewProps, Root$6 as Root, type RootProps$6 as RootProps, volumeSlider_d_Thumb as Thumb, type volumeSlider_d_ThumbProps as ThumbProps, Track$1 as Track, TrackFill$1 as TrackFill, type TrackFillProps$1 as TrackFillProps, type TrackProps$1 as TrackProps, Value$1 as Value, type volumeSlider_d_ValueProps as ValueProps };
}

interface RootProps$5 extends ReactElementProps<ThumbnailInstance, HTMLElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Used to load and display a preview thumbnail at the given `time`.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/thumbnail}
 * @example
 * ```tsx
 * <Thumbnail.Root src="thumbnails.vtt" time={10} >
 *   <Thumbnail.Img />
 * </Thumbnail.Root>
 * ```
 */
declare const Root$5: React.ForwardRefExoticComponent<Omit<RootProps$5, "ref"> & React.RefAttributes<HTMLElement>>;
interface ImgProps extends PrimitivePropsWithRef<'img'> {
    children?: React.ReactNode;
}
declare const Img: React.ForwardRefExoticComponent<Omit<ImgProps, "ref"> & React.RefAttributes<HTMLImageElement>>;

declare const thumbnail_d_Img: typeof Img;
type thumbnail_d_ImgProps = ImgProps;
declare namespace thumbnail_d {
  export { thumbnail_d_Img as Img, type thumbnail_d_ImgProps as ImgProps, Root$5 as Root, type RootProps$5 as RootProps };
}

interface RootProps$4 extends ReactElementProps<TimeSliderInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<TimeSliderInstance>;
}
/**
 * Versatile and user-friendly input time control designed for seamless cross-browser and provider
 * compatibility and accessibility with ARIA support. It offers a smooth user experience for both
 * mouse and touch interactions and is highly customizable in terms of styling. Users can
 * effortlessly change the current playback time within the range 0 to seekable end.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/time-slider}
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Track>
 *     <TimeSlider.TrackFill />
 *     <TimeSlider.Progress />
 *   </TimeSlider.Track>
 *   <TimeSlider.Thumb />
 * </TimeSlider.Root>
 * ```
 */
declare const Root$4: React.ForwardRefExoticComponent<Omit<RootProps$4, "ref"> & React.RefAttributes<TimeSliderInstance>>;
interface ChaptersProps extends Omit<ReactElementProps<SliderChaptersInstance>, 'children'> {
    children: (cues: VTTCue[], forwardRef: React.RefCallback<HTMLElement>) => React.ReactNode;
}
/**
 * Used to create predefined sections within a time slider interface based on the currently
 * active chapters text track.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/slider-chapters}
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Chapters>
 *     {(cues, forwardRef) =>
 *       cues.map((cue) => (
 *         <div key={cue.startTime} ref={forwardRef}>
 *           <TimeSlider.Track>
 *             <TimeSlider.TrackFill />
 *             <TimeSlider.Progress />
 *           </TimeSlider.Track>
 *        </div>
 *     ))}
 *   </TimeSlider.Chapters>
 * </TimeSlider.Root>
 * ```
 */
declare const Chapters: React.ForwardRefExoticComponent<ChaptersProps & React.RefAttributes<HTMLDivElement>>;
interface ChapterTitleProps$1 extends PrimitivePropsWithRef<'div'> {
}
/**
 * Used to display the active cue text based on the slider value and preview value.
 *
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Preview>
 *     <TimeSlider.Chapter />
 *   </TimeSlider.Preview>
 * </TimeSlider.Root>
 * ```
 */
declare const ChapterTitle$1: React.ForwardRefExoticComponent<Omit<ChapterTitleProps$1, "ref"> & React.RefAttributes<HTMLElement>>;
/**
 * Displays the specific numeric representation of the current or pointer value of the time slider.
 * When a user interacts with a slider by moving its thumb along the track, the slider value
 * and current playback time updates accordingly.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/time-slider#preview}
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Preview>
 *     <TimeSlider.Value />
 *   </TimeSlider.Preview>
 * </TimeSlider.Root>
 * ```
 */
declare const Value: React.ForwardRefExoticComponent<Omit<ValueProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface ProgressProps extends PrimitivePropsWithRef<'div'> {
}
/**
 * Visual element inside the slider that serves as a horizontal or vertical bar, providing a
 * visual reference for the range of playback that has buffered/loaded.
 *
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Track>
 *     <TimeSlider.Progress />
 *   </TimeSlider.Track>
 * </TimeSlider.Root>
 * ```
 */
declare const Progress: React.ForwardRefExoticComponent<Omit<ProgressProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface ThumbnailProps extends ReactElementProps<SliderThumbnailInstance, HTMLElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
type ThumbnailImgProps = ImgProps;
declare const Thumbnail: {
    readonly Root: React.ForwardRefExoticComponent<Omit<ThumbnailProps, "ref"> & React.RefAttributes<HTMLElement>>;
    readonly Img: React.ForwardRefExoticComponent<Omit<ImgProps, "ref"> & React.RefAttributes<HTMLImageElement>>;
};
interface VideoProps extends ReactElementProps<SliderVideoInstance, HTMLVideoElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLVideoElement>;
}
/**
 * Used to load a low-resolution video to be displayed when the user is hovering over or dragging
 * the time slider. The preview video will automatically be updated to be in-sync with the current
 * preview position, so ensure it has the same length as the original media (i.e., same duration).
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-video}
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Preview>
 *     <TimeSlider.Video src="preview.mp4" />
 *   </TimeSlider.Preview>
 * </TimeSlider.Root>
 * ```
 */
declare const Video: React.ForwardRefExoticComponent<Omit<VideoProps, "ref"> & React.RefAttributes<HTMLVideoElement>>;
interface VideoProviderProps {
    instance: SliderVideoInstance;
    children?: React.ReactNode;
}

declare const timeSlider_d_Chapters: typeof Chapters;
type timeSlider_d_ChaptersProps = ChaptersProps;
declare const timeSlider_d_Preview: typeof Preview;
type timeSlider_d_PreviewProps = PreviewProps;
declare const timeSlider_d_Progress: typeof Progress;
type timeSlider_d_ProgressProps = ProgressProps;
declare const timeSlider_d_Thumb: typeof Thumb;
type timeSlider_d_ThumbProps = ThumbProps;
declare const timeSlider_d_Thumbnail: typeof Thumbnail;
type timeSlider_d_ThumbnailImgProps = ThumbnailImgProps;
type timeSlider_d_ThumbnailProps = ThumbnailProps;
declare const timeSlider_d_Value: typeof Value;
type timeSlider_d_ValueProps = ValueProps;
declare const timeSlider_d_Video: typeof Video;
type timeSlider_d_VideoProps = VideoProps;
type timeSlider_d_VideoProviderProps = VideoProviderProps;
declare namespace timeSlider_d {
  export { ChapterTitle$1 as ChapterTitle, type ChapterTitleProps$1 as ChapterTitleProps, timeSlider_d_Chapters as Chapters, type timeSlider_d_ChaptersProps as ChaptersProps, timeSlider_d_Preview as Preview, type timeSlider_d_PreviewProps as PreviewProps, timeSlider_d_Progress as Progress, type timeSlider_d_ProgressProps as ProgressProps, Root$4 as Root, type RootProps$4 as RootProps, timeSlider_d_Thumb as Thumb, type timeSlider_d_ThumbProps as ThumbProps, timeSlider_d_Thumbnail as Thumbnail, type timeSlider_d_ThumbnailImgProps as ThumbnailImgProps, type timeSlider_d_ThumbnailProps as ThumbnailProps, Track$1 as Track, TrackFill$1 as TrackFill, type TrackFillProps$1 as TrackFillProps, type TrackProps$1 as TrackProps, timeSlider_d_Value as Value, type timeSlider_d_ValueProps as ValueProps, timeSlider_d_Video as Video, type timeSlider_d_VideoProps as VideoProps, type timeSlider_d_VideoProviderProps as VideoProviderProps };
}

interface RootProps$3 extends ReactElementProps<RadioGroupInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<RadioGroupInstance>;
}
/**
 * A radio group consists of options where only one of them can be checked. Each option is
 * provided as a radio (i.e., a selectable element).
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio-group}
 * @example
 * ```tsx
 * <RadioGroup.Root>
 *   <RadioGroup.Item value="1080">1080p</RadioGroup.Item>
 *   <RadioGroup.Item value="720">720p</RadioGroup.Item>
 * </RadioGroup.Root>
 * ```
 */
declare const Root$3: React.ForwardRefExoticComponent<Omit<RootProps$3, "ref"> & React.RefAttributes<RadioGroupInstance>>;
interface ItemProps$1 extends ReactElementProps<RadioInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * A radio represents a option that a user can select inside of a radio group. Only one radio
 * can be checked in a group.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/radio}
 * @example
 * ```tsx
 * <RadioGroup.Item value="1080">1080p</RadioGroup.Item>
 * ```
 */
declare const Item$1: React.ForwardRefExoticComponent<Omit<ItemProps$1, "ref"> & React.RefAttributes<HTMLElement>>;

declare namespace radioGroup_d {
  export { Item$1 as Item, type ItemProps$1 as ItemProps, Root$3 as Root, type RootProps$3 as RootProps };
}

interface RootProps$2 extends ReactElementProps<MenuInstance> {
    asChild?: boolean;
    children: React.ReactNode;
    ref?: React.Ref<MenuInstance>;
}
/**
 * Root menu container used to hold and manage a menu button and menu items. This component is
 * used to display options in a floating panel. They can be nested to create submenus.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Content placement="top end"></Menu.Content>
 * </Menu.Root>
 * ```
 */
declare const Root$2: React.ForwardRefExoticComponent<Omit<RootProps$2, "ref"> & React.RefAttributes<MenuInstance>>;
interface ButtonProps extends ReactElementProps<MenuButtonInstance, HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * A button that controls the opening and closing of a menu component. The button will become a
 * `menuitem` when used inside a submenu.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Content placement="top end"></Menu.Content>
 * </Menu.Root>
 * ```
 */
declare const Button: React.ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
interface PortalProps extends Omit<ReactElementProps<MenuPortalInstance>, 'container'> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Portals menu items into the document body.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu#portal}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Portal>
 *     <Menu.Content placement="top end"></Menu.Content>
 *   </Menu.Portal>
 * </Menu.Root>
 * ```
 */
declare const Portal: React.ForwardRefExoticComponent<Omit<PortalProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface ItemsProps extends ReactElementProps<MenuItemsInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Used to group and display settings or arbitrary content in a floating panel.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Items placement="top end"></Menu.Items>
 * </Menu.Root>
 * ```
 */
declare const Items: React.ForwardRefExoticComponent<Omit<ItemsProps, "ref"> & React.RefAttributes<HTMLElement>>;
interface ItemProps extends ReactElementProps<MenuItemInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Represents a specific option or action, typically displayed as a text label or icon, which
 * users can select to access or perform a particular function or view related content.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Button></Menu.Button>
 *   <Menu.Content placement="top end">
 *     <Menu.Item></Menu.Item>
 *   </Menu.Content>
 * </Menu.Root>
 * ```
 */
declare const Item: React.ForwardRefExoticComponent<Omit<ItemProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare const menu_d_Button: typeof Button;
type menu_d_ButtonProps = ButtonProps;
declare const menu_d_Item: typeof Item;
type menu_d_ItemProps = ItemProps;
declare const menu_d_Items: typeof Items;
type menu_d_ItemsProps = ItemsProps;
declare const menu_d_Portal: typeof Portal;
type menu_d_PortalProps = PortalProps;
declare namespace menu_d {
  export { menu_d_Button as Button, type menu_d_ButtonProps as ButtonProps, Items as Content, type ItemsProps as ContentProps, menu_d_Item as Item, type menu_d_ItemProps as ItemProps, menu_d_Items as Items, type menu_d_ItemsProps as ItemsProps, menu_d_Portal as Portal, type menu_d_PortalProps as PortalProps, Item$1 as Radio, Root$3 as RadioGroup, type RootProps$3 as RadioGroupProps, type ItemProps$1 as RadioProps, Root$2 as Root, type RootProps$2 as RootProps };
}

interface ChapterTitleProps extends PrimitivePropsWithRef<'span'> {
}
/**
 * This component is used to load and display the current chapter title based on the text tracks
 * provided.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/chapter-title}
 * @example
 * ```tsx
 * <ChapterTitle />
 * ```
 */
declare const ChapterTitle: React.ForwardRefExoticComponent<Omit<ChapterTitleProps, "ref"> & React.RefAttributes<HTMLElement>>;

interface GestureProps extends ReactElementProps<GestureInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<GestureInstance>;
}
/**
 * This component enables actions to be performed on the media based on user gestures.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/gesture}
 * @example
 * ```tsx
 * <Gesture event="pointerup" action="toggle:paused" />
 * <Gesture event="dblpointerup" action="toggle:fullscreen" />
 * ```
 */
declare const Gesture: React.ForwardRefExoticComponent<Omit<GestureProps, "ref"> & React.RefAttributes<GestureInstance>>;

interface CaptionsProps extends ReactElementProps<CaptionsInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<CaptionsInstance>;
}
/**
 * Renders and displays captions/subtitles. This will be an overlay for video and a simple
 * captions box for audio.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/captions}
 * @example
 * ```tsx
 * <Captions />
 * ```
 */
declare const Captions: React.ForwardRefExoticComponent<Omit<CaptionsProps, "ref"> & React.RefAttributes<CaptionsInstance>>;

interface PosterProps extends ReactElementProps<PosterInstance, HTMLImageElement> {
    alt: string;
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLImageElement>;
}
/**
 * Loads and displays the current media poster image. By default, the media provider's
 * loading strategy is respected meaning the poster won't load until the media can.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/media/poster}
 * @example
 * ```tsx
 * <MediaPlayer>
 *   <MediaProvider>
 *     <Poster src="..." alt="..." />
 *   </MediaProvider>
 * </MediaPlayer>
 * ```
 */
declare const Poster: React.ForwardRefExoticComponent<Omit<PosterProps, "ref"> & React.RefAttributes<HTMLImageElement>>;

interface TimeProps extends ReactElementProps<TimeInstance> {
    asChild?: boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}
/**
 * Outputs a media duration (eg: `currentTime`, `duration`, `bufferedAmount`, etc.) value as time
 * formatted text.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/time}
 * @example
 * ```tsx
 * <Time type="current" />
 * ```
 */
declare const Time: React.ForwardRefExoticComponent<Omit<TimeProps, "ref"> & React.RefAttributes<HTMLElement>>;

interface RootProps$1 extends PrimitivePropsWithRef<'div'> {
    children?: React.ReactNode;
}
declare const Root$1: React.ForwardRefExoticComponent<Omit<RootProps$1, "ref"> & React.RefAttributes<HTMLElement>>;

interface TextProps extends PrimitivePropsWithRef<'span'> {
}
declare const Text: React.ForwardRefExoticComponent<Omit<TextProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare const caption_d_Text: typeof Text;
type caption_d_TextProps = TextProps;
declare namespace caption_d {
  export { Root$1 as Root, type RootProps$1 as RootProps, caption_d_Text as Text, type caption_d_TextProps as TextProps };
}

interface RootProps extends React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>, React.RefAttributes<SVGElement | SVGSVGElement> {
    /**
     * The horizontal (width) and vertical (height) length of the spinner.
     *
     * @defaultValue 96
     */
    size?: number;
}
/**
 * @docs {@link https://www.vidstack.io/docs/player/components/display/buffering-indicator}
 * @example
 * ```html
 * <Spinner.Root>
 *   <Spinner.Track />
 *   <Spinner.TrackFill />
 * </Spinner>
 * ```
 */
declare const Root: React.ForwardRefExoticComponent<Omit<RootProps, "ref"> & React.RefAttributes<SVGSVGElement | SVGElement>>;
interface TrackProps extends React.PropsWithoutRef<React.SVGProps<SVGCircleElement>>, React.RefAttributes<SVGCircleElement> {
}
declare const Track: React.ForwardRefExoticComponent<Omit<TrackProps, "ref"> & React.RefAttributes<SVGCircleElement>>;
interface TrackFillProps extends React.PropsWithoutRef<React.SVGProps<SVGCircleElement>>, React.RefAttributes<SVGCircleElement> {
    /**
     * The percentage of the track that should be filled.
     */
    fillPercent?: number;
}
declare const TrackFill: React.ForwardRefExoticComponent<Omit<TrackFillProps, "ref"> & React.RefAttributes<SVGCircleElement>>;

declare const spinner_d_Root: typeof Root;
type spinner_d_RootProps = RootProps;
declare const spinner_d_Track: typeof Track;
declare const spinner_d_TrackFill: typeof TrackFill;
type spinner_d_TrackFillProps = TrackFillProps;
type spinner_d_TrackProps = TrackProps;
declare namespace spinner_d {
  export { spinner_d_Root as Root, type spinner_d_RootProps as RootProps, spinner_d_Track as Track, spinner_d_TrackFill as TrackFill, type spinner_d_TrackFillProps as TrackFillProps, type spinner_d_TrackProps as TrackProps };
}

/**
 * This hook is used to subscribe to specific state on a component instance.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-state}
 */
declare function useState<T extends AnyRecord, R extends keyof T>(ctor: {
    state: State<T>;
}, prop: R, ref: React.RefObject<Component<any, T, any, any> | null>): T[R];
/**
 * This hook is used to subscribe to multiple states on a component instance.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-store}
 */
declare function useStore<T extends AnyRecord>(ctor: {
    state: State<T>;
}, ref: React.RefObject<Component<any, T, any, any> | null>): T;

/**
 * Returns the nearest parent player component.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-media-player}
 */
declare function useMediaPlayer(): MediaPlayerInstance | null;

/**
 * Creates a new `PlayerQueryList` object that can then be used to determine if the
 * player and document matches the query string, as well as to monitor any changes to detect
 * when it matches (or stops matching) that query.
 *
 * A player query supports the same syntax as media queries and allows media state properties
 * to be used like so:
 *
 * ```ts
 * const matches = usePlayerQuery("(width < 680) and (streamType: on-demand)");
 * ```
 *
 * You can also use media queries:
 *
 * ```ts
 * const matches = usePlayerQuery("@media (min-width: 300px)");
 * ```
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-player-query}
 */
declare function usePlayerQuery(query: string): boolean;

/**
 * Returns the current parent media provider.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-media-provider}
 */
declare function useMediaProvider(): MediaProviderAdapter | null;

/**
 * A media remote provides a simple facade for dispatching media requests to the nearest media
 * player.
 *
 * @param target - The DOM event target to dispatch request events from. Defaults to player
 * if no target is provided.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-media-remote}
 */
declare function useMediaRemote(target?: EventTarget | null | React.RefObject<EventTarget | null>): MediaRemoteControl;

/**
 * This hook is used to subscribe to a specific media state.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-media-state}
 */
declare function useMediaState<T extends keyof MediaState>(prop: T, ref?: React.RefObject<MediaPlayerInstance | null>): MediaState[T];
/**
 * This hook is used to subscribe to the current media state on the nearest parent player.
 *
 * @docs {@link https://vidstack.io/docs/player/core-concepts/state#reading}
 */
declare function useMediaStore(ref?: React.RefObject<MediaPlayerInstance | null>): Readonly<MediaState>;

interface ThumbnailData {
    url: string;
    cue: VTTCue;
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * Fetches and parses a WebVTT file. The function will return the parsed thumbnail
 * data such as the VTTCue, coordinates, dimensions, and url. It's safe to call this hook in
 * multiple places with the same `src` argument as work is de-duped and cached.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-thumbnails}
 */
declare function useThumbnails(src: string): ThumbnailData[];
/**
 * Returns the active thumbnail based on the given time.
 *
 * @param thumbnails - thumbnail data returned from called `useThumbnails("...")`.
 * @param time - the current time to determine which thumbnail is active.
 */
declare function useActiveThumbnail(thumbnails: ThumbnailData[], time: number): ThumbnailData | null;

/**
 * This hook is used to subscribe to a specific slider state.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-slider-state}
 */
declare function useSliderState<T extends keyof SliderState>(prop: T, ref?: React.RefObject<SliderInstance | VolumeSliderInstance | TimeSliderInstance | null>): SliderState[T];
/**
 * This hook is used to subscribe to the current slider state on the given or nearest slider
 * component.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-slider-state#store}
 */
declare function useSliderStore(ref?: React.RefObject<SliderInstance | VolumeSliderInstance | TimeSliderInstance | null>): Readonly<SliderState>;

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-slider-preview}
 */
declare function useSliderPreview({ clamp, offset, orientation, }?: UseSliderPreview): {
    previewRootRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    previewRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    previewValue: number;
    isPreviewVisible: boolean;
};
interface UseSliderPreview {
    /**
     * Whether the preview should be clamped to the start and end of the slider root. If `true` the
     * preview won't be placed outside the root bounds.
     */
    clamp?: boolean;
    /**
     * The distance in pixels between the preview and the slider root. You can also set
     * the CSS variable `--media-slider-preview-offset` to adjust this offset.
     */
    offset?: number;
    /**
     * The orientation of the slider.
     */
    orientation?: SliderOrientation;
}

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-text-cues}
 */
declare function useTextCues(track: TextTrack | null): VTTCue[];

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-active-text-cues}
 */
declare function useActiveTextCues(track: TextTrack | null): VTTCue[];

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-active-text-track}
 */
declare function useActiveTextTrack(kind: TextTrackKind | TextTrackKind[]): TextTrack | null;

/**
 * Creates a new `TextTrack` object and adds it to the player.
 *
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/create-text-track}
 */
declare function createTextTrack(init: TextTrackInit): TextTrack;

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-audio-options}
 */
declare function useAudioOptions(): AudioOptions;
type AudioOptions = AudioOption[] & {
    readonly disabled: boolean;
    readonly selectedTrack: AudioTrack | null;
    readonly selectedValue: string | undefined;
};
interface AudioOption {
    readonly track: AudioTrack;
    readonly label: string;
    readonly value: string;
    readonly selected: boolean;
    select(trigger?: Event): void;
}

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-caption-options}
 */
declare function useCaptionOptions({ off }?: UseCaptionOptions): CaptionOptions;
interface UseCaptionOptions {
    /**
     * Whether an option should be included for turning off all captions. A string can be provided
     * to specify the label.
     */
    off?: boolean | string;
}
type CaptionOptions = CaptionOption[] & {
    readonly disabled: boolean;
    readonly selectedTrack: TextTrack | null;
    readonly selectedValue: string;
};
interface CaptionOption {
    readonly track: TextTrack | null;
    readonly label: string;
    readonly value: string;
    readonly selected: boolean;
    select(trigger?: Event): void;
}

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-chapter-options}
 */
declare function useChapterOptions(): ChapterOptions;
type ChapterOptions = ChapterOption[] & {
    readonly selectedValue: string | undefined;
};
interface ChapterOption {
    readonly cue: VTTCue;
    readonly label: string;
    readonly value: string;
    readonly selected: boolean;
    readonly startTimeText: string;
    readonly durationText: string;
    select(trigger?: Event): void;
    setProgressVar(ref: HTMLElement | null): void;
}

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-video-quality-options}
 */
declare function useVideoQualityOptions({ auto, sort, }?: UseVideoQualityOptions): VideoQualityOptions;
interface UseVideoQualityOptions {
    /**
     * Whether an auto option should be included. A string can be provided to specify the label.
     */
    auto?: boolean | string;
    /**
     * Specifies how the options should be sorted. The sorting algorithm looks at both the quality
     * resolution and bitrate.
     *
     * - Ascending: 480p, 720p, 720p (higher bitrate), 1080p
     * - Descending: 1080p, 720p (higher bitrate), 720p, 480p
     *
     * @default 'descending'
     */
    sort?: 'ascending' | 'descending';
}
type VideoQualityOptions = VideoQualityOption[] & {
    readonly disabled: boolean;
    readonly selectedQuality: VideoQuality | null;
    readonly selectedValue: string;
};
interface VideoQualityOption {
    readonly quality: VideoQuality | null;
    readonly label: string;
    readonly value: string;
    readonly selected: boolean;
    readonly autoSelected: boolean;
    readonly bitrateText: string | null;
    select(trigger?: Event): void;
}

/**
 * @docs {@link https://www.vidstack.io/docs/player/api/hooks/use-playback-rate-options}
 */
declare function usePlaybackRateOptions({ rates, normalLabel, }?: UsePlaybackRateOptions): PlaybackRateOptions;
interface UsePlaybackRateOptions {
    rates?: (number | {
        label: string;
        rate: number;
    })[];
    normalLabel?: string | null;
}
type PlaybackRateOptions = PlaybackRateOption[] & {
    readonly disabled: boolean;
    readonly selectedValue: string | undefined;
};
interface PlaybackRateOption {
    readonly label: string;
    readonly value: string;
    readonly rate: number;
    readonly selected: boolean;
    select(trigger?: Event): void;
}

/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=add-note) */
declare const AddNoteIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=add-playlist) */
declare const AddPlaylistIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=add-user) */
declare const AddUserIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=add) */
declare const AddIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=airplay) */
declare const AirplayIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-collapse-in) */
declare const ArrowCollapseInIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-collapse) */
declare const ArrowCollapseIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-down) */
declare const ArrowDownIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-expand-out) */
declare const ArrowExpandOutIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-expand) */
declare const ArrowExpandIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-left) */
declare const ArrowLeftIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-right) */
declare const ArrowRightIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=arrow-up) */
declare const ArrowUpIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=bookmark) */
declare const BookmarkIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=camera) */
declare const CameraIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chapters) */
declare const ChaptersIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chat-collapse) */
declare const ChatCollapseIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chat) */
declare const ChatIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chevron-down) */
declare const ChevronDownIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chevron-left) */
declare const ChevronLeftIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chevron-right) */
declare const ChevronRightIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chevron-up) */
declare const ChevronUpIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=chromecast) */
declare const ChromecastIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=clip) */
declare const ClipIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=closed-captions-on) */
declare const ClosedCaptionsOnIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=closed-captions) */
declare const ClosedCaptionsIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=comment) */
declare const CommentIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=computer) */
declare const ComputerIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=device) */
declare const DeviceIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=download) */
declare const DownloadIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=episodes) */
declare const EpisodesIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=eye) */
declare const EyeIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=fast-backward) */
declare const FastBackwardIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=fast-forward) */
declare const FastForwardIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=flag) */
declare const FlagIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=fullscreen-arrow-exit) */
declare const FullscreenArrowExitIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=fullscreen-arrow) */
declare const FullscreenArrowIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=fullscreen-exit) */
declare const FullscreenExitIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=fullscreen) */
declare const FullscreenIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=heart) */
declare const HeartIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=info) */
declare const InfoIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=language) */
declare const LanguageIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=link) */
declare const LinkIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=lock-closed) */
declare const LockClosedIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=lock-open) */
declare const LockOpenIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=menu-horizontal) */
declare const MenuHorizontalIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=menu-vertical) */
declare const MenuVerticalIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=microphone) */
declare const MicrophoneIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=mobile) */
declare const MobileIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=moon) */
declare const MoonIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=music-off) */
declare const MusicOffIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=music) */
declare const MusicIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=mute) */
declare const MuteIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=next) */
declare const NextIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=notification) */
declare const NotificationIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=odometer) */
declare const OdometerIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=pause) */
declare const PauseIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=picture-in-picture-exit) */
declare const PictureInPictureExitIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=picture-in-picture) */
declare const PictureInPictureIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=play) */
declare const PlayIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=playback-speed-circle) */
declare const PlaybackSpeedCircleIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=playlist) */
declare const PlaylistIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=previous) */
declare const PreviousIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=question-mark) */
declare const QuestionMarkIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=queue-list) */
declare const QueueListIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=radio-button-selected) */
declare const RadioButtonSelectedIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=radio-button) */
declare const RadioButtonIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=repeat-on) */
declare const RepeatOnIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=repeat-square-on) */
declare const RepeatSquareOnIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=repeat-square) */
declare const RepeatSquareIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=repeat) */
declare const RepeatIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=replay) */
declare const ReplayIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=rotate) */
declare const RotateIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=search) */
declare const SearchIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-backward-10) */
declare const SeekBackward10Icon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-backward-15) */
declare const SeekBackward15Icon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-backward-30) */
declare const SeekBackward30Icon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-backward) */
declare const SeekBackwardIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-forward-10) */
declare const SeekForward10Icon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-forward-15) */
declare const SeekForward15Icon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-forward-30) */
declare const SeekForward30Icon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=seek-forward) */
declare const SeekForwardIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=send) */
declare const SendIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=settings-menu) */
declare const SettingsMenuIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=settings-switch) */
declare const SettingsSwitchIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=settings) */
declare const SettingsIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=share-arrow) */
declare const ShareArrowIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=share) */
declare const ShareIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=shuffle-on) */
declare const ShuffleOnIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=shuffle) */
declare const ShuffleIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=stop) */
declare const StopIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=subtitles) */
declare const SubtitlesIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=sun) */
declare const SunIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=theatre-mode-exit) */
declare const TheatreModeExitIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=theatre-mode) */
declare const TheatreModeIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=thumbs-down) */
declare const ThumbsDownIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=thumbs-up) */
declare const ThumbsUpIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=timer) */
declare const TimerIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=transcript) */
declare const TranscriptIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=tv) */
declare const TvIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=user) */
declare const UserIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=volume-high) */
declare const VolumeHighIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=volume-low) */
declare const VolumeLowIcon: IconComponent;
/** [Click here to preview icon](https://vidstack.io/media-icons?lib=react&icon=x-mark) */
declare const XMarkIcon: IconComponent;

interface RemotionThumbnailProps extends Omit<PrimitivePropsWithRef<'div'>, 'children' | 'onError'> {
    /** The video frame to display. */
    frame: number;
    /**
     * A callback function that allows you to return a custom UI that gets displayed while the
     * thumbnail is loading. If this prop is not provided it will default to the loading renderer
     * given to the player source.
     */
    renderLoading?: RemotionLoadingRenderer;
    /**
     * A callback for rendering a custom error message. If this prop is not provided it will default
     * to the error renderer given to the player source.
     */
    errorFallback?: RemotionErrorRenderer;
    /**
     * Called when an error or uncaught exception has happened in the video. If this prop is not
     * provided it will default to the error callback given to the player source.
     */
    onError?(error: Error): void;
}
/**
 * @docs {@link https://www.vidstack.io/docs/player/components/remotion/remotion-thumbnail}
 * @example
 * ```tsx
 * <RemotionThumbnail frame={100} />
 * ```
 */
declare const RemotionThumbnail: React.ForwardRefExoticComponent<Omit<RemotionThumbnailProps, "ref"> & React.RefAttributes<HTMLElement>>;

interface RemotionPosterProps extends RemotionThumbnailProps {
}
/**
 * @attr data-visible - Whether poster should be shown.
 * @docs {@link https://www.vidstack.io/docs/player/components/remotion/remotion-poster}
 * @example
 * ```tsx
 * <MediaPlayer>
 *   <MediaProvider>
 *     <RemotionPoster frame={100} />
 *   </MediaProvider>
 * </MediaPlayer>
 * ```
 */
declare const RemotionPoster: React.ForwardRefExoticComponent<Omit<RemotionPosterProps, "ref"> & React.RefAttributes<HTMLElement>>;

interface RemotionSliderThumbnailProps extends Omit<RemotionThumbnailProps, 'frame'> {
}
/**
 * @docs {@link https://www.vidstack.io/docs/player/components/remotion/remotion-slider-thumbnail}
 * @example
 * ```tsx
 * <TimeSlider.Root>
 *   <TimeSlider.Preview>
 *     <RemotionSliderThumbnail />
 *   </TimeSlider.Preview>
 * </TimeSlider.Root>
 * ```
 */
declare const RemotionSliderThumbnail: React.ForwardRefExoticComponent<Omit<RemotionSliderThumbnailProps, "ref"> & React.RefAttributes<HTMLElement>>;

declare class RemotionProviderLoader implements MediaProviderLoader {
    target: HTMLElement;
    constructor();
    canPlay(src: MediaSrc): boolean;
    mediaType(): MediaType;
    load(): Promise<MediaProviderAdapter>;
}

declare class RemotionLayoutEngine {
    protected _src: RemotionMediaResource | null;
    protected _viewport: HTMLElement | null;
    protected _canvas: HTMLElement | null;
    protected _container: HTMLElement | null;
    protected _disposal: DisposalBin;
    constructor();
    setSrc(src: RemotionMediaResource | null): void;
    setContainer(container: HTMLElement | null): void;
    destroy(): void;
    protected _onResize(entries?: ResizeObserverEntry[]): void;
    protected _getRect(el: HTMLElement, entry?: ResizeObserverEntry): LayoutRect;
    protected _calcScale(rect: LayoutRect): number;
    protected _calcTransform(rect: LayoutRect, scale: number): {
        x?: undefined;
        y?: undefined;
        centerX?: undefined;
        centerY?: undefined;
    } | {
        x: number;
        y: number;
        centerX: number;
        centerY: number;
    };
}
interface LayoutRect {
    width: number;
    height: number;
    top: number;
    left: number;
}

declare class RemotionPlaybackEngine {
    protected _src: RemotionMediaResource;
    protected _onFrameChange: (frame: number) => void;
    protected _onEnd: () => void;
    protected _disposal: DisposalBin;
    protected _frame: number;
    protected _framesAdvanced: number;
    protected _playbackRate: number;
    protected _playing: boolean;
    protected _rafId: number;
    protected _timerId: number;
    protected _startedAt: number;
    protected _isRunningInBackground: boolean;
    get frame(): number;
    set frame(frame: number);
    constructor(_src: RemotionMediaResource, _onFrameChange: (frame: number) => void, _onEnd: () => void);
    play(): void;
    stop(): void;
    setPlaybackRate(rate: number): void;
    destroy(): void;
    protected _update(): void;
    protected _tick: () => void;
    protected _queueNextFrame(callback: () => void): void;
    protected _calculateNextFrame(): {
        nextFrame: number;
        framesToAdvance: number;
        ended: boolean;
    };
    protected _onVisibilityChange(): void;
}

declare class RemotionProvider implements MediaProviderAdapter {
    readonly container: HTMLElement;
    protected readonly $$PROVIDER_TYPE = "REMOTION";
    readonly scope: Scope;
    protected _ctx: MediaSetupContext;
    protected _src: WriteSignal<RemotionMediaResource<RemotionInputProps> | null>;
    protected _setup: boolean;
    protected _played: number;
    protected _playedRange: TimeRange;
    protected _audio: any;
    protected _waiting: WriteSignal<boolean>;
    protected _waitingPromise: DeferredPromise<void, string> | null;
    protected _mediaTags: WriteSignal<PlayableMediaTag[]>;
    protected _mediaElements: WriteSignal<HTMLMediaElement[]>;
    protected _bufferingElements: Set<HTMLMediaElement>;
    protected _timeline: TimelineContextValue | null;
    protected _frame: WriteSignal<Record<string, number>>;
    protected _layoutEngine: RemotionLayoutEngine;
    protected _playbackEngine: RemotionPlaybackEngine | null;
    protected _setTimeline: SetTimelineContextValue;
    protected _setMediaVolume: SetMediaVolumeContextValue;
    protected get _notify(): <Type extends keyof MediaEvents>(type: Type, ...init: InferEventDetail<MediaEvents[Type]> extends void | undefined ? [detail?: undefined, trigger?: Event | undefined] : [detail: InferEventDetail<MediaEvents[Type]>, trigger?: Event | undefined]) => void;
    get type(): string;
    get currentSrc(): RemotionMediaResource<RemotionInputProps> | null;
    get frame(): Record<string, number>;
    constructor(container: HTMLElement);
    setup(ctx: MediaSetupContext): void;
    protected _watchMediaTags(): void;
    protected _discoverMediaElements(): void;
    protected _watchMediaElements(): void;
    protected _onFrameChange(frame: number): void;
    protected _onFrameEnd(): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    setMuted(value: React.SetStateAction<boolean>): void;
    setCurrentTime(time: number): void;
    setVolume(value: React.SetStateAction<number>): void;
    setPlaybackRate(rate: React.SetStateAction<number>): void;
    protected _getPlayedRange(currentTime: number): TimeRange;
    loadSource(src: MediaSrc): Promise<void>;
    destroy(): void;
    changeSrc(src: RemotionMediaResource | null): void;
    render: () => React.ReactNode;
    renderVideo: ({ src }: {
        src: RemotionMediaResource;
    }) => React.ReactNode;
    protected _ready(src: RemotionMediaResource | null): void;
    protected _onWaitFor(el: HTMLMediaElement): void;
    protected _onStopWaitingFor(el: HTMLMediaElement): void;
    protected _watchWaiting(): void;
    protected _setFrame(value: React.SetStateAction<Record<string, number>>): void;
    protected _setPlaying(value: React.SetStateAction<boolean>): void;
    protected _createTimelineContextValue(): TimelineContextValue;
}

/** @see {@link https://www.vidstack.io/docs/player/providers/remotion} */
declare function isRemotionProvider(provider: any): provider is RemotionProvider;
declare function isRemotionSource(src?: MediaSrc | null): src is RemotionMediaResource;

declare const defaultLayoutIcons: DefaultLayoutIcons;
interface DefaultLayoutIconProps extends React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> {
}
interface DefaultLayoutIcon {
    (props: DefaultLayoutIconProps): React.ReactNode;
}
interface DefaultLayoutIcons {
    PlayButton: {
        Play: DefaultLayoutIcon;
        Pause: DefaultLayoutIcon;
        Replay: DefaultLayoutIcon;
    };
    MuteButton: {
        Mute: DefaultLayoutIcon;
        VolumeLow: DefaultLayoutIcon;
        VolumeHigh: DefaultLayoutIcon;
    };
    CaptionButton: {
        On: DefaultLayoutIcon;
        Off: DefaultLayoutIcon;
    };
    PIPButton: {
        Enter: DefaultLayoutIcon;
        Exit: DefaultLayoutIcon;
    };
    FullscreenButton: {
        Enter: DefaultLayoutIcon;
        Exit: DefaultLayoutIcon;
    };
    SeekButton: {
        Backward: DefaultLayoutIcon;
        Forward: DefaultLayoutIcon;
    };
    Menu: {
        ArrowLeft: DefaultLayoutIcon;
        ArrowRight: DefaultLayoutIcon;
        Audio: DefaultLayoutIcon;
        Chapters: DefaultLayoutIcon;
        Quality: DefaultLayoutIcon;
        Captions: DefaultLayoutIcon;
        Settings: DefaultLayoutIcon;
        Speed: DefaultLayoutIcon;
    };
}

interface DefaultMediaButtonProps {
    tooltip: ContentProps['placement'];
}
interface DefaultMediaMenuProps {
    tooltip: ContentProps['placement'];
    placement: ItemsProps['placement'];
    portalClass?: string;
}
interface DefaultMediaLayoutProps extends PrimitivePropsWithRef<'div'> {
    children?: React.ReactNode;
    /**
     * The icons to be rendered and displayed inside the layout.
     */
    icons: DefaultLayoutIcons;
    /**
     * The absolute or relative URL to a [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)
     * file resource.
     */
    thumbnails?: string;
    /**
     * Translation map from english to your desired language for words used throughout the layout.
     */
    translations?: DefaultLayoutTranslations | null;
    /**
     * Specifies the number of milliseconds to wait before tooltips are visible after interacting
     * with a control.
     *
     * @defaultValue 700
     */
    showTooltipDelay?: number;
    /**
     * Specifies the number of milliseconds to wait before menus are visible after opening them.
     *
     * @defaultValue 0
     */
    showMenuDelay?: number;
    /**
     * Whether the bitrate should be hidden in the settings quality menu next to each option.
     *
     * @defaultValue false
     */
    hideQualityBitrate?: boolean;
    /**
     * A player query string that determines when the small (e.g., mobile) UI should be displayed. The
     * special string 'never' will indicate that the small device optimized UI should never be
     * displayed.
     *
     * @defaultValue '(width < 576) or (height < 380)'
     */
    smallLayoutWhen?: string | boolean;
    /**
     * Specifies whether menu buttons should be placed in the top or bottom controls group. This
     * only applies to the large video layout.
     *
     * @defaultValue 'bottom'
     */
    menuGroup?: 'top' | 'bottom';
    /**
     * Whether modal menus should be disabled when the small layout is active. A modal menu is
     * a floating panel that floats up from the bottom of the screen (outside of the player). It's
     * enabled by default as it provides a better user experience for touch devices.
     *
     * @defaultValue false
     */
    noModal?: boolean;
}
interface CreateDefaultMediaLayout {
    type: 'audio' | 'video';
    smLayoutWhen: string;
    SmallLayout: React.FC;
    LargeLayout: React.FC;
    UnknownStreamType?: React.FC;
}
declare function createDefaultMediaLayout({ type, smLayoutWhen, SmallLayout, LargeLayout, UnknownStreamType, }: CreateDefaultMediaLayout): React.ForwardRefExoticComponent<Omit<DefaultMediaLayoutProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface DefaultTooltipProps {
    content: string;
    placement?: TooltipPlacement;
    children: React.ReactNode;
}
declare function DefaultTooltip({ content, placement, children }: DefaultTooltipProps): React.JSX.Element;
declare namespace DefaultTooltip {
    var displayName: string;
}

declare function DefaultPlayButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultPlayButton {
    var displayName: string;
}

declare function DefaultMuteButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultMuteButton {
    var displayName: string;
}

declare function DefaultCaptionButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultCaptionButton {
    var displayName: string;
}

declare function DefaultPIPButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultPIPButton {
    var displayName: string;
}

declare function DefaultFullscreenButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultFullscreenButton {
    var displayName: string;
}

declare function DefaultSeekButton({ seconds, tooltip }: DefaultMediaButtonProps & {
    seconds: number;
}): React.JSX.Element;
declare namespace DefaultSeekButton {
    var displayName: string;
}

declare function DefaultVolumeSlider(): React.JSX.Element;
declare namespace DefaultVolumeSlider {
    var displayName: string;
}

declare function DefaultTimeSlider(): React.JSX.Element;
declare namespace DefaultTimeSlider {
    var displayName: string;
}

declare function DefaultChapterTitle(): React.JSX.Element;
declare namespace DefaultChapterTitle {
    var displayName: string;
}

declare function DefaultLiveButton(): React.JSX.Element | null;
declare namespace DefaultLiveButton {
    var displayName: string;
}

declare function DefaultTimeGroup(): React.JSX.Element;
declare namespace DefaultTimeGroup {
    var displayName: string;
}

declare function DefaultTimeInfo(): React.JSX.Element;
declare namespace DefaultTimeInfo {
    var displayName: string;
}

declare function DefaultChaptersMenu({ tooltip, placement, portalClass }: DefaultMediaMenuProps): React.JSX.Element;
declare namespace DefaultChaptersMenu {
    var displayName: string;
}

declare function DefaultSettingsMenu({ tooltip, placement, portalClass }: DefaultMediaMenuProps): React.JSX.Element | null;
declare namespace DefaultSettingsMenu {
    var displayName: string;
}

interface DefaultSubmenuButtonProps {
    label: string;
    hint: string;
    disabled: boolean;
    Icon: DefaultLayoutIcon;
}
declare function DefaultSubmenuButton({ label, hint, Icon, disabled }: DefaultSubmenuButtonProps): React.JSX.Element;
declare namespace DefaultSubmenuButton {
    var displayName: string;
}

interface DefaultAudioLayoutProps extends DefaultMediaLayoutProps {
}
/**
 * The audio layout is our production-ready UI that's displayed when the media view type is set to
 * 'audio'. It includes support for audio tracks, slider chapters, and captions out of the box. It
 * doesn't support live streams just yet.
 *
 * @attr data-match - Whether this layout is being used (query match).
 * @attr data-size - The active layout size.
 * @example
 * ```tsx
 * <MediaPlayer src="audio.mp3">
 *   <MediaProvider />
 *   <DefaultAudioLayout icons={defaultLayoutIcons} />
 * </MediaPlayer>
 * ```
 */
declare function DefaultAudioLayout(props: DefaultAudioLayoutProps): React.JSX.Element;
declare namespace DefaultAudioLayout {
    var displayName: string;
}

interface DefaultVideoLayoutProps extends DefaultMediaLayoutProps {
}
/**
 * The video layout is our production-ready UI that's displayed when the media view type is set to
 * 'video'. It includes support for picture-in-picture, fullscreen, slider chapters, slider
 * previews, captions, and audio/quality settings out of the box. It doesn't support live
 * streams just yet.
 *
 * @attr data-match - Whether this layout is being used (query match).
 * @attr data-size - The active layout size.
 * @example
 * ```tsx
 * <MediaPlayer src="video.mp4">
 *   <MediaProvider />
 *   <DefaultVideoLayout thumbnails="thumbnails.vtt" icons={defaultLayoutIcons} />
 * </MediaPlayer>
 * ```
 */
declare function DefaultVideoLayout(props: DefaultVideoLayoutProps): React.JSX.Element;
declare namespace DefaultVideoLayout {
    var displayName: string;
}

declare function DefaultVideoLayoutLarge(): React.JSX.Element;
declare namespace DefaultVideoLayoutLarge {
    var displayName: string;
}

declare function DefaultVideoLayoutSmall(): React.JSX.Element;
declare namespace DefaultVideoLayoutSmall {
    var displayName: string;
}

declare function DefaultVideoGestures(): React.JSX.Element;
declare namespace DefaultVideoGestures {
    var displayName: string;
}

declare function DefaultBufferingIndicator(): React.JSX.Element;
declare namespace DefaultBufferingIndicator {
    var displayName: string;
}

declare const DefaultLayoutContext: React.Context<DefaultLayoutContext>;
interface DefaultLayoutContext {
    thumbnails?: string;
    menuContainer?: React.RefObject<HTMLElement | null>;
    translations?: DefaultLayoutTranslations | null;
    isSmallLayout: boolean;
    showMenuDelay?: number;
    showTooltipDelay?: number;
    hideQualityBitrate?: boolean;
    menuGroup: 'top' | 'bottom';
    noModal: boolean;
    Icons: DefaultLayoutIcons;
}
declare function useDefaultLayoutLang(word: keyof DefaultLayoutTranslations): string;

export { type ItemsProps as $, type RootProps$7 as A, type PreviewProps as B, type ContentProps as C, type RootProps$6 as D, type RootProps$4 as E, type FullscreenButtonProps as F, type GroupProps as G, type ChaptersProps as H, type IconProps as I, type ChapterTitleProps$1 as J, type ThumbnailProps as K, type LiveButtonProps as L, type MediaPlayerProps as M, type ThumbnailImgProps as N, type VideoProps as O, type PlayerSrc as P, radioGroup_d as Q, type RootProps$9 as R, type SeekButtonProps as S, Track$2 as T, type RootProps$3 as U, type ValueProps as V, type ItemProps$1 as W, menu_d as X, type RootProps$2 as Y, type ButtonProps as Z, type PortalProps as _, MediaPlayer as a, useMediaStore as a$, type ItemProps as a0, ChapterTitle as a1, type ChapterTitleProps as a2, type GestureProps as a3, Gesture as a4, Captions as a5, type CaptionsProps as a6, type PosterProps as a7, Poster as a8, type TimeProps as a9, SliderInstance as aA, TimeSliderInstance as aB, VolumeSliderInstance as aC, SliderThumbnailInstance as aD, SliderValueInstance as aE, SliderVideoInstance as aF, SliderPreviewInstance as aG, SliderChaptersInstance as aH, MenuInstance as aI, MenuButtonInstance as aJ, MenuItemsInstance as aK, MenuItemInstance as aL, MenuPortalInstance as aM, RadioGroupInstance as aN, RadioInstance as aO, CaptionsInstance as aP, GestureInstance as aQ, PosterInstance as aR, ThumbnailInstance as aS, TimeInstance as aT, useState as aU, useStore as aV, useMediaPlayer as aW, usePlayerQuery as aX, useMediaProvider as aY, useMediaRemote as aZ, useMediaState as a_, Time as aa, caption_d as ab, type RootProps$1 as ac, type TextProps as ad, thumbnail_d as ae, type RootProps$5 as af, type ImgProps as ag, spinner_d as ah, type RootProps as ai, type TrackProps as aj, type TrackFillProps as ak, MediaPlayerInstance as al, MediaProviderInstance as am, ControlsInstance as an, ControlsGroupInstance as ao, ToggleButtonInstance as ap, CaptionButtonInstance as aq, FullscreenButtonInstance as ar, LiveButtonInstance as as, MuteButtonInstance as at, PIPButtonInstance as au, PlayButtonInstance as av, SeekButtonInstance as aw, TooltipInstance as ax, TooltipTriggerInstance as ay, TooltipContentInstance as az, type MediaProviderProps as b, FlagIcon as b$, type ThumbnailData as b0, useThumbnails as b1, useActiveThumbnail as b2, useSliderState as b3, useSliderStore as b4, useSliderPreview as b5, type UseSliderPreview as b6, useTextCues as b7, useActiveTextCues as b8, useActiveTextTrack as b9, ArrowDownIcon as bA, ArrowExpandOutIcon as bB, ArrowExpandIcon as bC, ArrowLeftIcon as bD, ArrowRightIcon as bE, ArrowUpIcon as bF, BookmarkIcon as bG, CameraIcon as bH, ChaptersIcon as bI, ChatCollapseIcon as bJ, ChatIcon as bK, ChevronDownIcon as bL, ChevronLeftIcon as bM, ChevronRightIcon as bN, ChevronUpIcon as bO, ChromecastIcon as bP, ClipIcon as bQ, ClosedCaptionsOnIcon as bR, ClosedCaptionsIcon as bS, CommentIcon as bT, ComputerIcon as bU, DeviceIcon as bV, DownloadIcon as bW, EpisodesIcon as bX, EyeIcon as bY, FastBackwardIcon as bZ, FastForwardIcon as b_, createTextTrack as ba, useAudioOptions as bb, type AudioOptions as bc, type AudioOption as bd, useCaptionOptions as be, type UseCaptionOptions as bf, type CaptionOptions as bg, type CaptionOption as bh, useChapterOptions as bi, type ChapterOptions as bj, type ChapterOption as bk, useVideoQualityOptions as bl, type UseVideoQualityOptions as bm, type VideoQualityOptions as bn, type VideoQualityOption as bo, usePlaybackRateOptions as bp, type UsePlaybackRateOptions as bq, type PlaybackRateOptions as br, type PlaybackRateOption as bs, AddNoteIcon as bt, AddPlaylistIcon as bu, AddUserIcon as bv, AddIcon as bw, AirplayIcon as bx, ArrowCollapseInIcon as by, ArrowCollapseIcon as bz, MediaProvider as c, TranscriptIcon as c$, FullscreenArrowExitIcon as c0, FullscreenArrowIcon as c1, FullscreenExitIcon as c2, FullscreenIcon as c3, HeartIcon as c4, InfoIcon as c5, LanguageIcon as c6, LinkIcon as c7, LockClosedIcon as c8, LockOpenIcon as c9, ReplayIcon as cA, RotateIcon as cB, SearchIcon as cC, SeekBackward10Icon as cD, SeekBackward15Icon as cE, SeekBackward30Icon as cF, SeekBackwardIcon as cG, SeekForward10Icon as cH, SeekForward15Icon as cI, SeekForward30Icon as cJ, SeekForwardIcon as cK, SendIcon as cL, SettingsMenuIcon as cM, SettingsSwitchIcon as cN, SettingsIcon as cO, ShareArrowIcon as cP, ShareIcon as cQ, ShuffleOnIcon as cR, ShuffleIcon as cS, StopIcon as cT, SubtitlesIcon as cU, SunIcon as cV, TheatreModeExitIcon as cW, TheatreModeIcon as cX, ThumbsDownIcon as cY, ThumbsUpIcon as cZ, TimerIcon as c_, MenuHorizontalIcon as ca, MenuVerticalIcon as cb, MicrophoneIcon as cc, MobileIcon as cd, MoonIcon as ce, MusicOffIcon as cf, MusicIcon as cg, MuteIcon as ch, NextIcon as ci, NotificationIcon as cj, OdometerIcon as ck, PauseIcon as cl, PictureInPictureExitIcon as cm, PictureInPictureIcon as cn, PlayIcon as co, PlaybackSpeedCircleIcon as cp, PlaylistIcon as cq, PreviousIcon as cr, QuestionMarkIcon as cs, QueueListIcon as ct, RadioButtonSelectedIcon as cu, RadioButtonIcon as cv, RepeatOnIcon as cw, RepeatSquareOnIcon as cx, RepeatSquareIcon as cy, RepeatIcon as cz, Icon as d, TvIcon as d0, UserIcon as d1, VolumeHighIcon as d2, VolumeLowIcon as d3, XMarkIcon as d4, type RemotionThumbnailProps as d5, RemotionThumbnail as d6, type RemotionPosterProps as d7, RemotionPoster as d8, type RemotionSliderThumbnailProps as d9, DefaultTimeSlider as dA, DefaultChapterTitle as dB, DefaultLiveButton as dC, DefaultTimeGroup as dD, DefaultTimeInfo as dE, DefaultChaptersMenu as dF, DefaultSettingsMenu as dG, DefaultSubmenuButton as dH, type DefaultMediaLayoutProps as dI, type CreateDefaultMediaLayout as dJ, createDefaultMediaLayout as dK, type DefaultTooltipProps as dL, type DefaultSubmenuButtonProps as dM, defaultLayoutIcons as dN, type DefaultLayoutIconProps as dO, type DefaultLayoutIcon as dP, type DefaultLayoutIcons as dQ, DefaultLayoutContext as dR, useDefaultLayoutLang as dS, RemotionSliderThumbnail as da, RemotionProviderLoader as db, RemotionProvider as dc, isRemotionProvider as dd, isRemotionSource as de, type RemotionMediaResource as df, type RemotionInputProps as dg, type RemotionLoadingRenderer as dh, type RemotionErrorRenderer as di, DefaultAudioLayout as dj, type DefaultAudioLayoutProps as dk, DefaultVideoLayout as dl, DefaultVideoLayoutLarge as dm, DefaultVideoLayoutSmall as dn, DefaultVideoGestures as dp, DefaultBufferingIndicator as dq, type DefaultVideoLayoutProps as dr, DefaultTooltip as ds, DefaultPlayButton as dt, DefaultMuteButton as du, DefaultCaptionButton as dv, DefaultPIPButton as dw, DefaultFullscreenButton as dx, DefaultSeekButton as dy, DefaultVolumeSlider as dz, type IconComponent as e, type TrackProps$2 as f, controls_d as g, type RootProps$8 as h, type TriggerProps as i, type ToggleButtonProps as j, ToggleButton as k, type PlayButtonProps as l, PlayButton as m, type CaptionButtonProps as n, CaptionButton as o, FullscreenButton as p, type MuteButtonProps as q, MuteButton as r, type PIPButtonProps as s, tooltip_d as t, PIPButton as u, SeekButton as v, LiveButton as w, slider_d as x, volumeSlider_d as y, timeSlider_d as z };
