import { createAction, props } from '@ngrx/store';
import { Category } from './category.type';
import { Supplier } from './supplier.type';

export const loadCategories = createAction('[Nav Component] Load Categories');
export const loadSuppliers = createAction('[Nav Component] Load Suppliers');

export const loadCategoriesSuccess = createAction(
  '[Nav Component] Load Categories - Success',
  props<{ categories: Category[] }>(),
);

export const loadSuppliersSuccess = createAction(
  '[Nav Component] Load Suppliers - Success',
  props<{ suppliers: Supplier[] }>(),
);
