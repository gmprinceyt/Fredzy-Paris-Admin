export interface StatsResponse extends MessageResponse {
  data: Stats;
}

export interface PieResponse extends MessageResponse {
  charts: Pie;
}

export interface LineResponse extends MessageResponse {
  data: Line;
}

export interface BarResponse extends MessageResponse {
  data: Bar;
}

export interface SearchProductResponse {
  success: boolean;
  products: Product[];
  pageLength: number;
}
export interface ProductResponse extends MessageResponse {
  data: Product[];
}
export interface SingalProductResponse extends MessageResponse {
  data: Product;
}
export interface CategoriesResponse extends MessageResponse {
  data: string[];
}

export type UpdateProductQuery = {
  name: string;
  discription: string;
  category: string;
  stock: number;
  price: number;
  photo: File[];
};

export type AddProductQuery = {
  name: string;
  discription: string;
  category: string;
  stock: number;
  price: number;
  photo: File[];
};

export type Stats = {
  categoryCount: Record<string, number>[];
  dataIncresmentlastMonth: CountAndChange;
  countData: countData;
  lastSixMonthData: {
    lastSixMonthOrderCount: number[];
    lastSixMonthRevenues: number[];
  };
  genderCount: {
    male: number;
    female: number;
  };
  modefiedlatestFourTransaction: LatestTransaction[];
};

export interface MessageResponse {
  statusCode: number;
  message: string;
  data: object;
  success: boolean;
}

export type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  discription: string;
  photo: string;
};

export type Bar = {
  lastSixMonthUsers: number[];
  lastSixMonthProducts: number[];
  lastTwelveMonthOrders: number[];
};
export type Line = {
  lastTwavleMonthUser: number[];
  lastTwavleMonthProduct: number[];
  lastTwavleMonthDiscount: number[];
  lastTwavleMonthRevenue: number[];
};

export type Pie = {
  orderfullfieldRadio: OrderFullfillment;
  productCategories: Record<string, number>[];
  stockAvailadblity: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  ageRadio: UsersAgeGroup;
  UsersRadio: { user: number; admin: number };
};

export type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type SearchProductQeury = {
  search: string;
  sort: string;
  category: string;
  price: number | null;
  page: number;
};

export interface AllOrderResponse extends MessageResponse {
  data: OrderResponse[];
}
export interface OrderDetailsResponse extends MessageResponse {
  data: OrderResponse;
}
export interface GetSingleUser extends MessageResponse {
  data: UserType;
}
export interface GetAllUser extends MessageResponse {
  data: UserType[];
}

type OrderResponse = {
  shippingInfo: ShippingInfo;
  _id: string;
  user: { _id: string; name: string };
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: CartItems[];
  createdAt: Date;
  updatedAt: Date;
  status: "Processing" | "Shipped" | "Delivered" | "OutOfDelivery";
};

type UserType = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "user" | "admin";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
};

type CartItems = {
  productId: string;
  price: number;
  quantity: number;
  name: string;
  photo: string;
};

type ShippingInfo = {
  address: string;
  state: string;
  country: string;
  city: string;
  pincode: number;
};

type countData = {
  totalRevenue: number;
  OrderCount: number;
  ProductCount: number;
  UserCount: number;
};

type CountAndChange = {
  revenue: number;
  product: number;
  users: number;
  order: number;
};

type OrderFullfillment = {
  processing: number;
  shipped: number;
  delivered: number;
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

type UsersAgeGroup = {
  teen: number;
  adult: number;
  old: number;
};
