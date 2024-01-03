import { type ComputePositionConfig } from '@floating-ui/dom';
export declare function setAttributeIfEmpty(target: Element, name: string, value: string): void;
export declare function setARIALabel(target: Element, $label: () => string | null): void;
export declare function isElementParent(owner: Element, node: Element | null, test?: (node: Element) => boolean): boolean;
export declare function onPress(target: EventTarget, handler: (event: PointerEvent | KeyboardEvent) => void): void;
export declare function isTouchPinchEvent(event: Event): boolean;
export declare function requestScopedAnimationFrame(callback: () => void): void | (() => undefined);
export declare function repaint(el: HTMLElement): void;
export declare function cloneTemplate<T extends HTMLElement>(template: HTMLTemplateElement, length: number, onCreate?: (el: T, index: number) => void): T[];
export declare function createTemplate(content: string): DocumentFragment;
export declare function cloneTemplateContent<T>(content: DocumentFragment): T;
export declare function autoPlacement(el: HTMLElement | null, trigger: HTMLElement | null, placement: string, { offsetVarName, xOffset, yOffset, ...options }: Partial<ComputePositionConfig> & {
    offsetVarName: string;
    xOffset: number;
    yOffset: number;
}): (() => void) | undefined;
export declare function hasAnimation(el: HTMLElement): boolean;
