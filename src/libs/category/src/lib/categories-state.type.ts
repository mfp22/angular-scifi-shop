import { Status } from '@scifi/http';
import { Category } from './category.type';
import { Supplier } from './supplier.type';

export type CategoriesState = {
  categories: Category[] | null;
  suppliers: Supplier[] | null;
  categoriesLoadStatus: Status;
  suppliersLoadStatus: Status;
};
