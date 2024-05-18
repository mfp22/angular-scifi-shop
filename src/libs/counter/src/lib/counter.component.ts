import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { decrement, increment } from './counter.actions';
import { counterFeature, selectCount } from './counter.feature';

@Component({
  selector: 'lib-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  count$ = this.store.select(selectCount);

  increment = () => this.store.dispatch(increment());
  decrement = () => this.store.dispatch(decrement());

  constructor(private store: Store) {}
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(counterFeature),
    RouterModule.forChild([{ path: '', component: CounterComponent }]),
  ],
})
export class CounterModule {}
