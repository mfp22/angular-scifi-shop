import { createFeature, createReducer, on } from '@ngrx/store';
import { CounterState } from '@scifi/types';
import { decrement, increment } from './counter.actions';

const initialState: CounterState = {
  count: 0,
};

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ count: state.count + 1 })),
  on(decrement, (state) => ({ count: state.count - 1 })),
);

export const counterFeature = createFeature({
  name: 'count',
  reducer: counterReducer,
});

export const { selectCount } = counterFeature;
