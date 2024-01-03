import { type TemplateResult } from 'lit-html';
import { type ReadSignal } from 'maverick.js';
import type { RadioOption } from '../../../../components';
export declare function renderMenuButton({ label, icon }: {
    label: ReadSignal<string>;
    icon: string;
}): TemplateResult<1>;
export declare function renderRadioGroup({ options, hideLabel, children, }: {
    options: ReadSignal<RadioOption[]>;
    hideLabel?: boolean;
    children?: TemplateResult | ((option: RadioOption) => TemplateResult | null) | null;
}): TemplateResult<1>;
