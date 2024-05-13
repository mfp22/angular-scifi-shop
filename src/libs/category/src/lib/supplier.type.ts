import { Category } from './category.type';

export type Supplier = Category & {
  location: string;
  establishYear: number;
};
