export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  product_count?: number;
}

export interface Review {
  id: number;
  product_id: number;
  user_name: string;
  user_avatar?: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  description: string;
  price: number;
  original_price?: number;
  discount_percent?: number;
  stock: number;
  rating: number;
  review_count: number;
  image_url: string;
  gallery_images?: string; // JSON array string
  features?: string;       // JSON array string
  specs?: string;          // JSON key-value string
  is_featured: boolean;
  is_new_arrival: boolean;
  is_trending: boolean;
  category_id: number;
  created_at: string;
  category?: Category;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
  created_at: string;
}

export interface OrderItem {
  id?: number;
  product_id?: number;
  product_name: string;
  product_image?: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: number;
  order_number: string;
  user_id?: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  postal_code: string;
  total_amount: number;
  discount_amount: number;
  shipping_fee: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: string;
  payment_status: string;
  created_at: string;
  items: OrderItem[];
}

export interface DashboardStats {
  total_revenue: number;
  total_orders: number;
  total_products: number;
  total_users: number;
  recent_orders: Order[];
  top_products: Product[];
}

export interface FilterOptions {
  category?: string;
  search?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}
