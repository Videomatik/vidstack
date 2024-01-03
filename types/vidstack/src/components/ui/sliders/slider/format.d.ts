export declare const sliderValueFormatContext: import("maverick.js/dist/types/maverick-O2JmNECw.js").C<SliderValueFormat>;
export interface SliderValueFormat {
    default?: 'value' | 'percent' | 'time';
    value?(value: number): string;
    percent?(percent: number, decimalPlaces: number): string;
    time?(value: number, padHours: boolean | null, padMinutes: boolean | null, showHours: boolean): string;
}
