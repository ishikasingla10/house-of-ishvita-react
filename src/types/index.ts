// Type Checking: TypeScript types for the application
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'party' | 'ethnic' | 'professional' | 'casual';
  description: string;
  sizes: string[];
  material?: string;
  care?: string[];
  features?: string[];
  stockStatus: 'in_stock' | 'out_of_stock' | 'low_stock';
  additionalImages?: string[];
  ratings: {
    average: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

// GraphQL Types
export interface GraphQLProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
}

export interface GraphQLQuery {
  products: GraphQLProduct[];
  product: GraphQLProduct;
}
