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
export interface CategoriesResponse extends MessageResponse {
  data: string[];
}

export type UpdateProductQuery = {
  name: string;
  discription: string;
  category: string;
  stock: number;
  price: number;
  photo:string;
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
  users: number[];
  products: number[];
  orders: number[];
};
export type Line = {
  users: number[];
  products: number[];
  discount: number[];
  revenue: number[];
};

export type Pie = {
  orderFullfillment: OrderFullfillment;
  productCategories: Record<string, number>[];
  stockAvailablity: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  usersAgeGroup: UsersAgeGroup;
  adminCustomer: {
    admin: number;
    customer: number;
  };
};

export type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

// search=men&sort=asc&category=laptops&price=2000&page
export type SearchProductQeury = {
  search: string;
  sort: string;
  category: string;
  price: number;
  page: number;
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
