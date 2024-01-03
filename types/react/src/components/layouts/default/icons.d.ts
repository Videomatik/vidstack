import * as React from 'react';
export declare const defaultLayoutIcons: DefaultLayoutIcons;
export interface DefaultLayoutIconProps extends React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> {
}
export interface DefaultLayoutIcon {
    (props: DefaultLayoutIconProps): React.ReactNode;
}
export interface DefaultLayoutIcons {
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
