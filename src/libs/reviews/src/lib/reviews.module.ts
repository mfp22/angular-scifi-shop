import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews/reviews.component';
import { MaterialModule } from '@scifi/material/material.module';
import { EffectsModule } from '@ngrx/effects';
import { ReviewsEffects } from '../../../../app/ngrx/reviews/reviews.effects';
import { StoreModule } from '@ngrx/store';
import { reviewsFeature } from '../../../../app/ngrx/reviews/reviews.feature';
import { NgLetModule } from 'ng-let';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';
import { SpinnerModule } from '@scifi/spinner/spinner.module';
import { PageNotFoundComponent } from '@scifi/page-not-found/page-not-found.component';
import { ReviewsPaginationComponent } from './reviews-pagination/reviews-pagination.component';
import { RatingComponent } from './rating/rating.component';
import { ChipsComponent } from '@scifi/chips/chips.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ReviewsComponent,
    ReviewDialogComponent,
    ReviewsPageComponent,
    ReviewsPaginationComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgLetModule,
    ReactiveFormsModule,
    SpinnerModule,
    PageNotFoundComponent,
    RouterModule,
    ChipsComponent,
    StoreModule.forFeature(reviewsFeature),
    EffectsModule.forFeature(ReviewsEffects)
  ],
  exports: [
    ReviewsComponent,
    RatingComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReviewsModule { }
