import { Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

export function debouncedSignal<T>(
  signal: Signal<T>,
  debounceDelay: number,
  initialValue: T
) {
  const signalObservable = toObservable(signal);
  return toSignal(signalObservable.pipe(debounceTime(debounceDelay)), {
    initialValue,
  });
}
