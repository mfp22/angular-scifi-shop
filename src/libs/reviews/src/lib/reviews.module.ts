import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChipsComponent } from '@scifi/chips/chips.component';
import { MaterialModule } from '@scifi/material/material.module';
import { PageNotFoundComponent } from '@scifi/page-not-found/page-not-found.component';
import { SpinnerModule } from '@scifi/spinner/spinner.module';
import { NgLetModule } from 'ng-let';
import { RatingComponent } from './rating/rating.component';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';
import { ReviewsPaginationComponent } from './reviews-pagination/reviews-pagination.component';
import { ReviewsEffects } from './reviews.effects';
import { reviewsFeature } from './reviews.feature';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [
    ReviewsComponent,
    ReviewDialogComponent,
    ReviewsPageComponent,
    ReviewsPaginationComponent,
    RatingComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgLetModule,
    ReactiveFormsModule,
    SpinnerModule,
    PageNotFoundComponent,
    RouterModule.forChild([
      {
        path: '',
        title: 'Product reviews',
        component: ReviewsComponent,
      },
    ]),
    ChipsComponent,
    StoreModule.forFeature(reviewsFeature),
    EffectsModule.forFeature(ReviewsEffects),
  ],
  exports: [ReviewsComponent, RatingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReviewsModule {}
