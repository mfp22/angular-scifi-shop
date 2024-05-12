import { SocialUser } from '@abacritt/angularx-social-login';
import { Address } from '@scifi/address';
import { Pagination } from '@scifi/pagination';
import { ExpressCheckoutItem, Product, SingleProduct } from '@scifi/product';

export type Customer = {
  id: number;
  name: string;
  email: string;
  username: string;
  joinDate: string;
  phone: string | null;
  billingAddressId: number | null;
  shippingAddressId: number | null;
  password: string;
  avatar: string | null;
  billingAddress?: Address | null;
  shippingAddress?: Address | null;
};

export type AuthCredentials = {
  name?: string;
  email?: string;
  username: string;
  password: string;
};

export type OAuthCredentials = {
  name: string;
  email: string;
  authId: string;
  provider: string;
  thumbnail: string;
};

export type NewOrderRequest = {
  billingAddress: Address;
  shippingAddress: Address;
  item?: {
    productId: number;
    quantity: number;
  };
};

export type Order = {
  id: number;
  customerId: number;
  billingAddressId: number;
  shippingAddressId: number;
  status: string;
  paymentMethod: string;
  total: string;
  createdAt: string;
  shippingAddress: Address;
  orderItems: {
    quantity: number;
    product: Product;
  }[];
};

export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export type NewReviewRequest = {
  customerId: number;
  productId: number;
  orderId: number;
  title: string;
  body: string;
  rating: Rating;
  recommend?: boolean;
};

export type UpdateReviewRequest = {
  title?: string;
  body?: string;
  recommend?: boolean | null;
  rating?: Rating;
};

export type UpdateCustomerRequest = {
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  phone?: string | null;
  avatar?: string | null;
};

export type Review = NewReviewRequest & {
  id: number;
  recommend: boolean | null;
  createdAt?: string;
  addedAt?: string;
  product?: Product;
  customer?: {
    username: string;
    avatar: string | null;
  };
};

export type ReviewsResponse = Pagination & {
  reviews: Review[] | [];
};

export type CustomerReviewsResponse = Pagination & {
  customer: Customer;
  reviews: Review[] | [];
};

export type FavoritesResponse = Pagination & {
  favorites: Review[] | [];
};

export type NewOrderResponse = Order & {
  billingAddress: Address;
};

export type CustomerNewAddress = {
  newAddress: Address;
  customer: Customer;
};

export type DeleteUserResponse = {
  msg: string;
  deletedUser: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

export type SingleOrderResponse = NewOrderResponse;

export type OrdersResponse = {
  id: number;
  name: string;
  username: string;
  orders: Order[] | [];
};

export type Category = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  products: number;
};

export type Supplier = Category & {
  location: string;
  establishYear: number;
};

export type PaymentEvent = {
  status: 'completed' | 'pending';
  paymentMethod: 'Card' | 'Klarna' | 'PayPal';
  total: number;
};

// Response returned from searching order history for a specific product id
export type OrderSearchResponse = {
  productId: number;
  lastOrdered: {
    orderId: number;
    orderDate: string;
  } | null;
  review: Review | null;
};

/* NgRx types for state management */
export type AuthState = {
  showOverlay: boolean;
  currentUser: Customer | null;
  loggedInUserId: number | string | null;
  loginStatus: Status;
  logoutStatus: Status;
  signupStatus: Status;
  logoutMsg: string | null;
  socialUser: SocialUser | null;
};

export type ApiError = {
  error?: {
    status: number;
    info: string;
    message?: string;
    stack?: string;
  };
};

export type StacktraceError = {
  error: {
    message: string;
    stack: string;
  };
};

export type DialogContent = ApiError & {
  title: string;
  content?: string;
  buttons?: {
    newOrder?: string;
  };
  deletedUser?: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

export type NotificationState = {
  showDialog: boolean;
  data: DialogContent | null;
};

export type Status = 'pending' | 'loading' | 'success' | 'error';
export type AddressId = 'billingAddressId' | 'shippingAddressId';

export type ProductsState = {
  pagination: Pagination;
  products: Product[] | [] | null;
  singleProduct: SingleProduct | null;
  searchTerm: string | null;
  orderSearchResult: OrderSearchResponse | null;
  loadStatus: Status;
  searchStatus: Status;
};

export type ProductsUrlParams = {
  page?: string | number;
  limit?: string | number;
  minPrice?: string | number;
  maxPrice?: string | number;
  category?: string;
  supplier?: string;
  product?: string;
  hideOutOfStock?: boolean;
  orderBy?: string;
  order?: string;
  avgRating?: string | number;
};

export type ReviewsState = {
  pagination: Pagination;
  reviews: Review[] | [] | null;
  customer: Customer | null;
  favorites: Review[] | [] | null;
  singleReview: Review | null;
  activeId: number;
  loadStatus: Status;
  createStatus: Status;
  updateStatus: Status;
  deleteStatus: Status;
};

export type CartItemDetail = {
  quantity: number;
  product: Product;
};

export type Cart = {
  id: number;
  name: string;
  username: string;
  cartItems: CartItemDetail[] | [];
};

export type CartItem = {
  productId: number;
  customerId: number;
  quantity: number;
};

export type CartState = {
  loadStatus: Status;
  updateStatus: Status;
  activeId: number;
  cart: Cart | null;
};

export type WishlistItem = {
  productId: number;
  customerId: number;
};

export type WishlistBasic = WishlistItem[] | [];

export type Wishlist = {
  id: number;
  name: string;
  username: string;
  wishlistItems: { product: Product }[] | [];
};

export type WishlistState = {
  loadStatus: Status;
  updateStatus: Status;
  activeId: number;
  wishlist: Wishlist | null;
};

export type AccountActiveItem =
  | 'billingAddress'
  | 'shippingAddress'
  | 'password'
  | 'account'
  | null;

export type AccountState = {
  account: Customer | null;
  loadStatus: Status;
  updateStatus: Status;
  deleteStatus: Status;
  activeItem: AccountActiveItem;
};

export type OrdersState = {
  orders: OrdersResponse | null;
  singleOrder: SingleOrderResponse | null;
  expressCheckoutItem: ExpressCheckoutItem | null;
  newOrder: NewOrderResponse | null;
  loadStatus: Status;
  createStatus: Status;
  updateStatus: Status;
  deleteStatus: Status;
};

export type CategoriesState = {
  categories: Category[] | null;
  suppliers: Supplier[] | null;
  categoriesLoadStatus: Status;
  suppliersLoadStatus: Status;
};

export type AppState = {
  authSlice: AuthState;
  accountSlice: AccountState;
  categoriesSlice: CategoriesState;
  cartSlice: CartState;
  notificationSlice: NotificationState;
};
