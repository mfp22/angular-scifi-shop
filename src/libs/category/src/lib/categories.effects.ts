import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { dispatchErrorAction } from '@scifi/dialog/notification.actions';
import { catchError, exhaustMap, map } from 'rxjs';
import {
  loadCategories,
  loadCategoriesSuccess,
  loadSuppliers,
  loadSuppliersSuccess,
} from './categories.actions';
import { CategoriesService } from './categories.service';

@Injectable()
export class CategoriesEffects {
  loadCategories$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadCategories),
      exhaustMap(() =>
        this.categoriesService.getCategories().pipe(
          map((categories) => loadCategoriesSuccess(categories)),
          catchError(dispatchErrorAction),
        ),
      ),
    ),
  );

  loadSuppliers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadSuppliers),
      exhaustMap(() =>
        this.categoriesService.getSuppliers().pipe(
          map((suppliers) => loadSuppliersSuccess(suppliers)),
          catchError(dispatchErrorAction),
        ),
      ),
    ),
  );

  constructor(private _actions$: Actions, private categoriesService: CategoriesService) {}
}
