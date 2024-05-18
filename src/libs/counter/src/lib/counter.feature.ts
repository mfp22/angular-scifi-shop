import { createFeature, createReducer, on } from '@ngrx/store';
import { CounterState } from './counter-state.type';
import { decrement, increment } from './counter.actions';

const initialState: CounterState = {
  count2: 0,
};

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ count2: state.count2 + 1 })),
  on(decrement, (state) => ({ count2: state.count2 - 1 })),
);

export const counterFeature = createFeature({
  name: 'count2',
  reducer: counterReducer,
});

export const { selectCount2 } = counterFeature;
