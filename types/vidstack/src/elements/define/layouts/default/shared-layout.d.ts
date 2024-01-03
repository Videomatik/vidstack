import { type TemplateResult } from 'lit-html';
import { type ReadSignal } from 'maverick.js';
import { type MenuPlacement, type TooltipPlacement } from '../../../../components';
export declare function DefaultPlayButton({ tooltip }: {
    tooltip: TooltipPlacement;
}): TemplateResult<1>;
export declare function DefaultMuteButton({ tooltip }: {
    tooltip: TooltipPlacement;
}): TemplateResult<1>;
export declare function DefaultCaptionButton({ tooltip }: {
    tooltip: TooltipPlacement;
}): TemplateResult<1>;
export declare function DefaultPIPButton(): TemplateResult<1>;
export declare function DefaultFullscreenButton({ tooltip }: {
    tooltip: TooltipPlacement;
}): TemplateResult<1>;
export declare function DefaultSeekButton({ seconds, tooltip, }: {
    seconds: number;
    tooltip: TooltipPlacement;
}): TemplateResult<1>;
export declare function DefaultVolumeSlider(): TemplateResult<1>;
export declare function DefaultTimeSlider(): TemplateResult<1>;
export declare function DefaultLiveButton(): TemplateResult<1> | null;
export declare function DefaultTimeGroup(): TemplateResult<1>;
export declare function DefaultTimeInfo(): any;
export declare function DefaultChaptersMenu({ placement, tooltip, portal, }: {
    portal?: boolean;
    placement: MenuPlacement | ReadSignal<MenuPlacement | null>;
    tooltip: TooltipPlacement | ReadSignal<TooltipPlacement>;
}): TemplateResult<1>;
export declare function DefaultSettingsMenu({ placement, portal, tooltip, }: {
    portal?: boolean;
    tooltip: TooltipPlacement | ReadSignal<TooltipPlacement>;
    placement: MenuPlacement | ReadSignal<MenuPlacement | null>;
}): any;
export declare function createMenuContainer(className: string): HTMLElement;
