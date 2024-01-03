import { type RootPart, type TemplateResult } from 'lit-html';
export declare class LitElement extends HTMLElement {
    rootPart: RootPart | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export interface LitRenderer {
    render(): TemplateResult;
}
