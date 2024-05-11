import { Component, Input } from '@angular/core';
import { Review } from '@scifi/types';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.sass'],
})
export class RatingComponent {
  @Input() review: Review | undefined;
}
