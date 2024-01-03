import * as React from 'react';
import { type PrimitivePropsWithRef } from '../primitives/nodes';
export interface ChapterTitleProps extends PrimitivePropsWithRef<'span'> {
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
export { ChapterTitle };
