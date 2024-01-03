import * as React from 'react';
import { type DefaultLayoutTranslations, type TooltipPlacement } from 'vidstack';
import type { PrimitivePropsWithRef } from '../../primitives/nodes';
import * as MenuBase from '../../ui/menu';
import * as TooltipBase from '../../ui/tooltip';
import type { DefaultLayoutIcon, DefaultLayoutIcons } from './icons';
interface DefaultMediaButtonProps {
    tooltip: TooltipBase.ContentProps['placement'];
}
interface DefaultMediaMenuProps {
    tooltip: TooltipBase.ContentProps['placement'];
    placement: MenuBase.ContentProps['placement'];
    portalClass?: string;
}
export interface DefaultMediaLayoutProps extends PrimitivePropsWithRef<'div'> {
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
export interface CreateDefaultMediaLayout {
    type: 'audio' | 'video';
    smLayoutWhen: string;
    SmallLayout: React.FC;
    LargeLayout: React.FC;
    UnknownStreamType?: React.FC;
}
export declare function createDefaultMediaLayout({ type, smLayoutWhen, SmallLayout, LargeLayout, UnknownStreamType, }: CreateDefaultMediaLayout): React.ForwardRefExoticComponent<Omit<DefaultMediaLayoutProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface DefaultTooltipProps {
    content: string;
    placement?: TooltipPlacement;
    children: React.ReactNode;
}
declare function DefaultTooltip({ content, placement, children }: DefaultTooltipProps): React.JSX.Element;
declare namespace DefaultTooltip {
    var displayName: string;
}
export { DefaultTooltip };
declare function DefaultPlayButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultPlayButton {
    var displayName: string;
}
export { DefaultPlayButton };
declare function DefaultMuteButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultMuteButton {
    var displayName: string;
}
export { DefaultMuteButton };
declare function DefaultCaptionButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultCaptionButton {
    var displayName: string;
}
export { DefaultCaptionButton };
declare function DefaultPIPButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultPIPButton {
    var displayName: string;
}
export { DefaultPIPButton };
declare function DefaultFullscreenButton({ tooltip }: DefaultMediaButtonProps): React.JSX.Element;
declare namespace DefaultFullscreenButton {
    var displayName: string;
}
export { DefaultFullscreenButton };
declare function DefaultSeekButton({ seconds, tooltip }: DefaultMediaButtonProps & {
    seconds: number;
}): React.JSX.Element;
declare namespace DefaultSeekButton {
    var displayName: string;
}
export { DefaultSeekButton };
declare function DefaultVolumeSlider(): React.JSX.Element;
declare namespace DefaultVolumeSlider {
    var displayName: string;
}
export { DefaultVolumeSlider };
declare function DefaultTimeSlider(): React.JSX.Element;
declare namespace DefaultTimeSlider {
    var displayName: string;
}
export { DefaultTimeSlider };
declare function DefaultChapterTitle(): React.JSX.Element;
declare namespace DefaultChapterTitle {
    var displayName: string;
}
export { DefaultChapterTitle };
declare function DefaultLiveButton(): React.JSX.Element | null;
declare namespace DefaultLiveButton {
    var displayName: string;
}
export { DefaultLiveButton };
declare function DefaultTimeGroup(): React.JSX.Element;
declare namespace DefaultTimeGroup {
    var displayName: string;
}
export { DefaultTimeGroup };
declare function DefaultTimeInfo(): React.JSX.Element;
declare namespace DefaultTimeInfo {
    var displayName: string;
}
export { DefaultTimeInfo };
declare function DefaultChaptersMenu({ tooltip, placement, portalClass }: DefaultMediaMenuProps): React.JSX.Element;
declare namespace DefaultChaptersMenu {
    var displayName: string;
}
export { DefaultChaptersMenu };
declare function DefaultSettingsMenu({ tooltip, placement, portalClass }: DefaultMediaMenuProps): React.JSX.Element | null;
declare namespace DefaultSettingsMenu {
    var displayName: string;
}
export { DefaultSettingsMenu };
export interface DefaultSubmenuButtonProps {
    label: string;
    hint: string;
    disabled: boolean;
    Icon: DefaultLayoutIcon;
}
declare function DefaultSubmenuButton({ label, hint, Icon, disabled }: DefaultSubmenuButtonProps): React.JSX.Element;
declare namespace DefaultSubmenuButton {
    var displayName: string;
}
export { DefaultSubmenuButton };
