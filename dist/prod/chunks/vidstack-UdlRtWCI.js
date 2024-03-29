"use client"

import 'react';
import { u as useStateContext, a as useSignal, b as useSignalRecord } from './vidstack-8AXyyPGc.js';
import { S as SliderInstance, s as sliderState } from './vidstack-UzM8r9FW.js';

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
  return useSignal((ref?.current?.$state || $state || initialSliderStore)[prop]);
}
function useSliderStore(ref) {
  const $state = useStateContext(sliderState);
  return useSignalRecord(ref?.current ? ref.current.$state : $state || initialSliderStore);
}

export { useSliderStore as a, useSliderState as u };
