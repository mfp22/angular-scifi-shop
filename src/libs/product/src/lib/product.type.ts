export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  categoryName: string;
  supplierName: string;
  thumbnail: string;
  numOfTimesOrdered: number;
  totalUnitsOrdered?: number | null;
  numOfReviews: number;
  averageRating: string | null;
};

export type SingleProduct = Product & {
  totalRatings: number;
  averageRating?: string;
};

export type ExpressCheckoutItem = {
  product: Product;
  quantity: number;
};
