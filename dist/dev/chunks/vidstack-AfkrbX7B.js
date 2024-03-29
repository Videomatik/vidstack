"use client"

import 'react';
import { u as useStateContext, a as useSignal, b as useSignalRecord } from './vidstack-HvwwRO6V.js';
import { S as SliderInstance, s as sliderState } from './vidstack-6eSzbFhe.js';

const sliderStateRecord = SliderInstance.state.record, initialSliderStore = Object.keys(sliderStateRecord).reduce(
  (store, prop) => ({
    ...store,
    [prop]() {
      return sliderStateRecord[prop];
    }
  }),
  {}
);
function useSliderState(prop, ref) {
  const $state = useStateContext(sliderState);
  if (!$state && !ref) {
    console.warn(
      `[vidstack] \`useSliderState\` requires \`RefObject<SliderInstance>\` argument if called outside of a slider component`
    );
  }
  return useSignal((ref?.current?.$state || $state || initialSliderStore)[prop]);
}
function useSliderStore(ref) {
  const $state = useStateContext(sliderState);
  if (!$state && !ref) {
    console.warn(
      `[vidstack] \`useSliderStore\` requires \`RefObject<SliderInstance>\` argument if called outside of a slider component`
    );
  }
  return useSignalRecord(ref?.current ? ref.current.$state : $state || initialSliderStore);
}

export { useSliderStore as a, useSliderState as u };
