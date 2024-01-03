import * as React from 'react';
import type { DefaultLayoutTranslations } from 'vidstack';
import type { DefaultLayoutIcons } from './icons';
export declare const DefaultLayoutContext: React.Context<DefaultLayoutContext>;
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
export declare function useDefaultLayoutLang(word: keyof DefaultLayoutTranslations): string;
export {};
