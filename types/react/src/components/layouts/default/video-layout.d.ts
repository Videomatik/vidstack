import * as React from 'react';
import { type DefaultMediaLayoutProps } from './shared-layout';
export interface DefaultVideoLayoutProps extends DefaultMediaLayoutProps {
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
export { DefaultVideoLayout };
declare function DefaultVideoLayoutLarge(): React.JSX.Element;
declare namespace DefaultVideoLayoutLarge {
    var displayName: string;
}
export { DefaultVideoLayoutLarge };
declare function DefaultVideoLayoutSmall(): React.JSX.Element;
declare namespace DefaultVideoLayoutSmall {
    var displayName: string;
}
export { DefaultVideoLayoutSmall };
declare function DefaultVideoGestures(): React.JSX.Element;
declare namespace DefaultVideoGestures {
    var displayName: string;
}
export { DefaultVideoGestures };
declare function DefaultBufferingIndicator(): React.JSX.Element;
declare namespace DefaultBufferingIndicator {
    var displayName: string;
}
export { DefaultBufferingIndicator };
