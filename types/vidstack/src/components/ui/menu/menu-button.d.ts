import { Component } from 'maverick.js';
import { DOMEvent } from 'maverick.js/std';
/**
 * A button that controls the opening and closing of a menu component. The button will become a
 * menuitem when used inside a submenu.
 *
 * @attr data-open - Whether menu is currently open.
 * @attr data-focus - Whether button is being keyboard focused.
 * @attr data-hocus - Whether button is being keyboard focused or hovered over.
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 */
export declare class MenuButton extends Component<MenuButtonProps, {}, MenuButtonEvents> {
    static props: MenuButtonProps;
    private _menu;
    get expanded(): boolean;
    constructor();
    protected onSetup(): void;
    protected onAttach(el: HTMLElement): void;
    protected onConnect(el: HTMLElement): void;
    private _watchDisabled;
}
export interface MenuButtonProps {
    /**
     * Whether the button should be disabled (non-interactive).
     */
    disabled: boolean;
}
export interface MenuButtonEvents {
    select: MenuButtonSelectEvent;
}
/**
 * Fired when the button is pressed via mouse, touch, or keyboard.
 */
export interface MenuButtonSelectEvent extends DOMEvent<void> {
    target: MenuButton;
}
