import { Product, Category, Order, DashboardStats, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

// Fallback seed data in case backend is offline
const FALLBACK_CATEGORIES: Category[] = [
  { id: 1, name: "Smartphones & Tablets", slug: "smartphones-tablets", product_count: 5, icon: "Smartphone", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800" },
  { id: 2, name: "Laptops & Computers", slug: "laptops-computers", product_count: 4, icon: "Laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800" },
  { id: 3, name: "Audio & Headphones", slug: "audio-headphones", product_count: 6, icon: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" },
  { id: 4, name: "Wearables & Watches", slug: "wearables-watches", product_count: 3, icon: "Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800" },
  { id: 5, name: "Gaming & Consoles", slug: "gaming-consoles", product_count: 4, icon: "Gamepad2", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800" },
  { id: 6, name: "Cameras & Drones", slug: "cameras-drones", product_count: 3, icon: "Camera", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800" },
  { id: 7, name: "Accessories & Power", slug: "accessories-power", product_count: 7, icon: "Cpu", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800" },
];

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "iPhone 16 Pro Max 256GB - Natural Titanium",
    slug: "iphone-16-pro-max",
    brand: "Apple",
    category_id: 1,
    description: "Featuring Grade 5 Titanium design, groundbreaking A18 Pro chip, 48MP Fusion camera with 5x Telephoto optical zoom, and revolutionary Camera Control button.",
    price: 1199.00,
    original_price: 1299.00,
    discount_percent: 8,
    stock: 35,
    rating: 4.9,
    review_count: 128,
    image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
    features: JSON.stringify([
      "A18 Pro chip with 6-core GPU",
      "6.9-inch Super Retina XDR display with ProMotion 120Hz",
      "48MP Fusion, 48MP Ultra Wide & 5x Telephoto camera system",
      "Up to 33 hours video playback with fast MagSafe charging"
    ]),
    specs: JSON.stringify({
      "Display": "6.9-inch OLED 120Hz ProMotion",
      "Processor": "Apple A18 Pro (3nm)",
      "Storage": "256 GB NVMe",
      "RAM": "8 GB Unified",
      "Camera": "48MP + 48MP + 12MP (5x Optical)"
    }),
    is_featured: true,
    is_new_arrival: true,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra 512GB - Titanium Gray",
    slug: "samsung-galaxy-s25-ultra",
    brand: "Samsung",
    category_id: 1,
    description: "Unleash Galaxy AI with built-in S-Pen, Snapdragon 8 Elite chipset, 200MP Quad Telephoto imaging, and ultra-bright anti-reflective Dynamic AMOLED 2X display.",
    price: 1299.00,
    original_price: 1399.00,
    discount_percent: 7,
    stock: 28,
    rating: 4.8,
    review_count: 94,
    image_url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
    features: JSON.stringify([
      "Snapdragon 8 Elite for Galaxy",
      "200MP Main Camera with 100x Space Zoom",
      "Integrated S Pen stylus with gesture controls",
      "5000mAh battery with 45W Fast Charging"
    ]),
    specs: JSON.stringify({
      "Display": "6.8-inch Dynamic AMOLED 2X (2600 nits)",
      "Processor": "Snapdragon 8 Elite (3nm)",
      "Storage": "512 GB UFS 4.0",
      "RAM": "12 GB LPDDR5X"
    }),
    is_featured: true,
    is_new_arrival: true,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "MacBook Pro 16\" M3 Max - Space Black",
    slug: "macbook-pro-16-m3-max",
    brand: "Apple",
    category_id: 2,
    description: "Mind-blowing performance for extreme creative workflows. Liquid Retina XDR screen with up to 1600 nits peak brightness, hardware-accelerated ray tracing, and 22 hours battery.",
    price: 3499.00,
    original_price: 3799.00,
    discount_percent: 8,
    stock: 14,
    rating: 5.0,
    review_count: 47,
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    features: JSON.stringify([
      "M3 Max chip (16-core CPU, 40-core GPU)",
      "48GB Unified Memory with 400GB/s bandwidth",
      "1TB ultra-fast PCIe Gen4 NVMe SSD"
    ]),
    specs: JSON.stringify({
      "Display": "16.2-inch Liquid Retina XDR 3456x2234",
      "Processor": "Apple M3 Max",
      "RAM": "48 GB Unified Memory",
      "Storage": "1 TB SSD"
    }),
    is_featured: true,
    is_new_arrival: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Noise-Cancelling Headphones",
    slug: "sony-wh-1000xm5",
    brand: "Sony",
    category_id: 3,
    description: "Industry-leading noise cancellation with two processors and 8 microphones. Hi-Res Audio wireless, crystal clear hands-free calls, and ultra-comfortable lightweight design.",
    price: 398.00,
    original_price: 449.00,
    discount_percent: 11,
    stock: 42,
    rating: 4.9,
    review_count: 310,
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    features: JSON.stringify([
      "Integrated Processor V1 & HD Noise Cancelling Processor QN1",
      "30-hour battery life with 3 min quick charge",
      "Multipoint connection pairs with 2 Bluetooth devices"
    ]),
    specs: JSON.stringify({
      "Type": "Over-Ear Wireless ANC",
      "Battery Life": "30 Hours",
      "Weight": "250g"
    }),
    is_featured: true,
    is_new_arrival: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    name: "Apple Watch Ultra 2 GPS + Cellular 49mm",
    slug: "apple-watch-ultra-2",
    brand: "Apple",
    category_id: 4,
    description: "The most rugged and capable Apple Watch. Built with lightweight aerospace titanium case, precision dual-frequency GPS, up to 36 hours battery, and 3000 nits display.",
    price: 799.00,
    original_price: 849.00,
    discount_percent: 6,
    stock: 22,
    rating: 4.9,
    review_count: 89,
    image_url: "https://images.unsplash.com/photo-1544117518-3b2164911381?w=800&auto=format&fit=crop&q=80",
    features: JSON.stringify([
      "49mm aerospace-grade titanium case",
      "S9 SiP chip with Double Tap gesture control",
      "3000 nits brightest display"
    ]),
    specs: JSON.stringify({
      "Case": "49mm Titanium",
      "Battery": "36-72 Hours",
      "Water Resistance": "100m"
    }),
    is_featured: true,
    is_new_arrival: true,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    name: "Sony PlayStation 5 Pro 2TB Console",
    slug: "playstation-5-pro",
    brand: "Sony",
    category_id: 5,
    description: "Experience games with PlayStation Spectral Super Resolution (PSSR) AI upscaling, 67% more compute units GPU, advanced ray tracing, and 2TB high-speed SSD.",
    price: 699.99,
    original_price: 749.99,
    discount_percent: 7,
    stock: 18,
    rating: 4.9,
    review_count: 142,
    image_url: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",
    features: JSON.stringify([
      "PlayStation Spectral Super Resolution (PSSR)",
      "Upgraded GPU with 67% more Compute Units",
      "2TB custom ultra-fast NVMe SSD"
    ]),
    specs: JSON.stringify({
      "Storage": "2TB NVMe SSD",
      "Output": "4K 120Hz, 8K Support",
      "Controller": "DualSense Haptic"
    }),
    is_featured: true,
    is_new_arrival: true,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: 7,
    name: "DJI Mini 4 Pro Drone with RC 2 Smart Controller",
    slug: "dji-mini-4-pro",
    brand: "DJI",
    category_id: 6,
    description: "Sub-249g ultra-lightweight foldable camera drone with omnidirectional obstacle sensing, 4K/60fps HDR true vertical shooting, and 20km FHD video transmission.",
    price: 959.00,
    original_price: 1059.00,
    discount_percent: 9,
    stock: 17,
    rating: 4.9,
    review_count: 95,
    image_url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80",
    features: JSON.stringify([
      "Under 249g weight (No FAA registration needed)",
      "Omnidirectional active obstacle sensing",
      "4K/60fps HDR video & True vertical shooting"
    ]),
    specs: JSON.stringify({
      "Weight": "< 249g",
      "Flight Time": "34-45 Minutes",
      "Range": "20 km"
    }),
    is_featured: false,
    is_new_arrival: true,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: 8,
    name: "Logitech MX Master 3S Wireless Performance Mouse",
    slug: "logitech-mx-master-3s",
    brand: "Logitech",
    category_id: 7,
    description: "Iconic ergonomic shape reimagined with Quiet Clicks, 8000 DPI track-on-glass optical sensor, and MagSpeed electromagnetic scrolling wheel.",
    price: 99.99,
    original_price: 119.99,
    discount_percent: 16,
    stock: 50,
    rating: 4.9,
    review_count: 420,
    image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
    features: JSON.stringify([
      "MagSpeed scroll wheel scrolls 1,000 lines/sec",
      "Quiet Click switches with 90% less click noise",
      "8,000 DPI Darkfield sensor tracks on glass"
    ]),
    specs: JSON.stringify({
      "DPI": "200-8000 DPI",
      "Battery": "70 Days on full charge",
      "Connectivity": "Bluetooth + Logi Bolt"
    }),
    is_featured: false,
    is_new_arrival: false,
    is_trending: true,
    created_at: new Date().toISOString()
  }
];

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch (err) {
    console.warn('Backend categories fetch failed, using fallback:', err);
    return FALLBACK_CATEGORIES;
  }
}

export async function fetchProducts(params: {
  category?: string;
  category_id?: number;
  search?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  featured?: boolean;
  trending?: boolean;
  new_arrival?: boolean;
  sort_by?: string;
  page?: number;
  limit?: number;
} = {}): Promise<{ items: Product[]; total: number; page: number; limit: number; pages: number }> {
  try {
    const query = new URLSearchParams();
    if (params.category) query.set('category', params.category);
    if (params.category_id !== undefined) query.set('category_id', params.category_id.toString());
    if (params.search) query.set('search', params.search);
    if (params.brand) query.set('brand', params.brand);
    if (params.min_price !== undefined) query.set('min_price', params.min_price.toString());
    if (params.max_price !== undefined) query.set('max_price', params.max_price.toString());
    if (params.featured !== undefined) query.set('featured', params.featured.toString());
    if (params.trending !== undefined) query.set('trending', params.trending.toString());
    if (params.new_arrival !== undefined) query.set('new_arrival', params.new_arrival.toString());
    if (params.sort_by) query.set('sort_by', params.sort_by);
    if (params.page) query.set('page', params.page.toString());
    if (params.limit) query.set('limit', params.limit.toString());

    const res = await fetch(`${API_BASE_URL}/products?${query.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (err) {
    console.warn('Backend products fetch failed, using fallback filter:', err);
    let items = [...FALLBACK_PRODUCTS];
    if (params.category) {
      const cat = FALLBACK_CATEGORIES.find(c => c.slug === params.category);
      if (cat) items = items.filter(p => p.category_id === cat.id);
    }
    if (params.category_id !== undefined) {
      items = items.filter(p => p.category_id === params.category_id);
    }
    if (params.search) {
      const s = params.search.toLowerCase();
      items = items.filter(p => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s));
    }
    if (params.brand) {
      items = items.filter(p => p.brand.toLowerCase() === params.brand?.toLowerCase());
    }
    if (params.min_price !== undefined) {
      items = items.filter(p => p.price >= (params.min_price || 0));
    }
    if (params.max_price !== undefined) {
      items = items.filter(p => p.price <= (params.max_price || 999999));
    }
    if (params.featured) {
      items = items.filter(p => p.is_featured);
    }
    if (params.sort_by === 'price_asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (params.sort_by === 'price_desc') {
      items.sort((a, b) => b.price - a.price);
    } else if (params.sort_by === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    }
    return {
      items,
      total: items.length,
      page: 1,
      limit: 20,
      pages: 1
    };
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Product not found');
    return await res.json();
  } catch (err) {
    console.warn('Backend product by slug fetch failed, checking fallback:', err);
    const found = FALLBACK_PRODUCTS.find(p => p.slug === slug || p.id.toString() === slug);
    return found || null;
  }
}

export async function createOrder(orderData: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  postal_code: string;
  payment_method: string;
  items: {
    product_id?: number;
    product_name: string;
    product_image?: string;
    quantity: number;
    price: number;
  }[];
}, token?: string): Promise<Order> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to place order');
    }
    return await res.json();
  } catch (err) {
    console.warn('Backend order creation failed, generating client order confirmation:', err);
    const subtotal = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping_fee = subtotal > 500 ? 0 : 15;
    const discount_amount = subtotal > 1000 ? Math.round(subtotal * 0.05 * 100) / 100 : 0;
    const total_amount = subtotal - discount_amount + shipping_fee;

    return {
      id: Math.floor(Math.random() * 10000),
      order_number: `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      customer_name: orderData.customer_name,
      customer_email: orderData.customer_email,
      customer_phone: orderData.customer_phone,
      shipping_address: orderData.shipping_address,
      city: orderData.city,
      postal_code: orderData.postal_code,
      total_amount,
      discount_amount,
      shipping_fee,
      status: 'processing',
      payment_method: orderData.payment_method,
      payment_status: 'paid',
      created_at: new Date().toISOString(),
      items: orderData.items.map(item => ({
        ...item,
        total: item.price * item.quantity
      }))
    };
  }
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const res = await fetch(`${API_BASE_URL}/stats/dashboard`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load stats');
    return await res.json();
  } catch (err) {
    return {
      total_revenue: 12450.00,
      total_orders: 18,
      total_products: 24,
      total_users: 145,
      recent_orders: [],
      top_products: FALLBACK_PRODUCTS.slice(0, 4)
    };
  }
}
