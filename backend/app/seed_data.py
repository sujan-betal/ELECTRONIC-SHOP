import json
from sqlalchemy.orm import Session
from .database import engine, Base, SessionLocal
from . import models, crud, schemas

def seed_database():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # Check if already seeded
        if db.query(models.Category).first():
            print("Database already contains data. Skipping seed.")
            return

        print("Seeding database with modern electronic shop data...")

        # 1. Seed Categories
        categories_data = [
            {
                "name": "Smartphones & Tablets",
                "slug": "smartphones-tablets",
                "description": "Latest flagship smartphones, foldable devices, and powerful tablets.",
                "icon": "Smartphone",
                "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "name": "Laptops & Computers",
                "slug": "laptops-computers",
                "description": "High performance ultrabooks, gaming laptops, workstations, and monitors.",
                "icon": "Laptop",
                "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80"
            },
            {
                "name": "Audio & Headphones",
                "slug": "audio-headphones",
                "description": "Audiophile headphones, ANC earbuds, soundbars, and studio monitors.",
                "icon": "Headphones",
                "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "name": "Wearables & Watches",
                "slug": "wearables-watches",
                "description": "Smart health trackers, rugged outdoor watches, and smart rings.",
                "icon": "Watch",
                "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            },
            {
                "name": "Gaming & Consoles",
                "slug": "gaming-consoles",
                "description": "Next-gen consoles, VR headsets, mechanical keyboards, and controllers.",
                "icon": "Gamepad2",
                "image": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80"
            },
            {
                "name": "Cameras & Drones",
                "slug": "cameras-drones",
                "description": "Cinema cameras, mirrorless bodies, gimbals, and 4K aerial drones.",
                "icon": "Camera",
                "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80"
            },
            {
                "name": "Accessories & Power",
                "slug": "accessories-power",
                "description": "GaN chargers, magnetic docks, high-speed cables, and tech carry cases.",
                "icon": "Cpu",
                "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80"
            }
        ]

        created_categories = {}
        for cat in categories_data:
            c = models.Category(**cat)
            db.add(c)
            db.commit()
            db.refresh(c)
            created_categories[c.slug] = c.id

        # 2. Seed Users
        admin_user = crud.create_user(
            db,
            schemas.UserCreate(
                name="Admin Manager",
                email="admin@electronicshop.com",
                password="adminpassword123",
                avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
            ),
            role="admin"
        )

        demo_user = crud.create_user(
            db,
            schemas.UserCreate(
                name="Alex Vance",
                email="alex@example.com",
                password="userpassword123",
                avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
            ),
            role="customer"
        )

        # 3. Seed Products
        products_data = [
            {
                "name": "iPhone 16 Pro Max 256GB - Natural Titanium",
                "slug": "iphone-16-pro-max",
                "brand": "Apple",
                "category_id": created_categories["smartphones-tablets"],
                "description": "Featuring Grade 5 Titanium design, groundbreaking A18 Pro chip, 48MP Fusion camera with 5x Telephoto optical zoom, and revolutionary Camera Control button.",
                "price": 1199.00,
                "original_price": 1299.00,
                "discount_percent": 8,
                "stock": 35,
                "rating": 4.9,
                "review_count": 128,
                "image_url": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1510557880182-3d4d3cba3f21?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80"
                ]),
                "features": json.dumps([
                    "A18 Pro chip with 6-core GPU",
                    "6.9-inch Super Retina XDR display with ProMotion 120Hz",
                    "48MP Fusion, 48MP Ultra Wide & 5x Telephoto camera system",
                    "Up to 33 hours video playback with fast MagSafe charging",
                    "Aerospace-grade titanium frame with Ceramic Shield front"
                ]),
                "specs": json.dumps({
                    "Display": "6.9-inch OLED 120Hz ProMotion",
                    "Processor": "Apple A18 Pro (3nm)",
                    "Storage": "256 GB NVMe",
                    "RAM": "8 GB Unified",
                    "Camera": "48MP + 48MP + 12MP (5x Optical)",
                    "Battery": "4,685 mAh (All-day battery life)",
                    "OS": "iOS 18 with Apple Intelligence"
                }),
                "is_featured": True,
                "is_new_arrival": True,
                "is_trending": True
            },
            {
                "name": "Samsung Galaxy S25 Ultra 512GB - Titanium Gray",
                "slug": "samsung-galaxy-s25-ultra",
                "brand": "Samsung",
                "category_id": created_categories["smartphones-tablets"],
                "description": "Unleash Galaxy AI with built-in S-Pen, Snapdragon 8 Elite chipset, 200MP Quad Telephoto imaging, and ultra-bright anti-reflective Dynamic AMOLED 2X display.",
                "price": 1299.00,
                "original_price": 1399.00,
                "discount_percent": 7,
                "stock": 28,
                "rating": 4.8,
                "review_count": 94,
                "image_url": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"
                ]),
                "features": json.dumps([
                    "Snapdragon 8 Elite for Galaxy",
                    "200MP Main Camera with 100x Space Zoom & 8K Video",
                    "Integrated S Pen stylus with gesture controls",
                    "5000mAh battery with 45W Fast Charging",
                    "Corning Gorilla Armor anti-reflective glass"
                ]),
                "specs": json.dumps({
                    "Display": "6.8-inch Dynamic AMOLED 2X (2600 nits)",
                    "Processor": "Snapdragon 8 Elite (3nm)",
                    "Storage": "512 GB UFS 4.0",
                    "RAM": "12 GB LPDDR5X",
                    "Camera": "200MP + 50MP + 50MP + 10MP",
                    "Battery": "5,000 mAh (45W fast charge)",
                    "OS": "One UI 7 (Android 15)"
                }),
                "is_featured": True,
                "is_new_arrival": True,
                "is_trending": True
            },
            {
                "name": "MacBook Pro 16\" M3 Max - Space Black",
                "slug": "macbook-pro-16-m3-max",
                "brand": "Apple",
                "category_id": created_categories["laptops-computers"],
                "description": "Mind-blowing performance for extreme creative workflows. Liquid Retina XDR screen with up to 1600 nits peak brightness, hardware-accelerated ray tracing, and 22 hours battery.",
                "price": 3499.00,
                "original_price": 3799.00,
                "discount_percent": 8,
                "stock": 14,
                "rating": 5.0,
                "review_count": 47,
                "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80"
                ]),
                "features": json.dumps([
                    "M3 Max chip (16-core CPU, 40-core GPU)",
                    "48GB Unified Memory with 400GB/s bandwidth",
                    "1TB ultra-fast PCIe Gen4 NVMe SSD",
                    "16.2-inch Liquid Retina XDR display (120Hz ProMotion)",
                    "Up to 22 hours battery life and MagSafe 3 charging"
                ]),
                "specs": json.dumps({
                    "Display": "16.2-inch Liquid Retina XDR 3456x2234",
                    "Processor": "Apple M3 Max (16 CPU / 40 GPU)",
                    "RAM": "48 GB Unified Memory",
                    "Storage": "1 TB SSD",
                    "Ports": "3x Thunderbolt 4, HDMI, SDXC, MagSafe 3",
                    "Weight": "2.16 kg (4.8 lbs)"
                }),
                "is_featured": True,
                "is_new_arrival": False,
                "is_trending": True
            },
            {
                "name": "ASUS ROG Zephyrus G16 OLED Gaming Laptop",
                "slug": "asus-rog-zephyrus-g16",
                "brand": "ASUS",
                "category_id": created_categories["laptops-computers"],
                "description": "Ultra-slim CNC aluminum chassis packed with Intel Core Ultra 9 processor, NVIDIA GeForce RTX 4080 GPU, and breathtaking 2.5K 240Hz ROG Nebula OLED display.",
                "price": 2699.00,
                "original_price": 2899.00,
                "discount_percent": 7,
                "stock": 19,
                "rating": 4.9,
                "review_count": 62,
                "image_url": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"
                ]),
                "features": json.dumps([
                    "Intel Core Ultra 9 185H with AI NPU",
                    "NVIDIA GeForce RTX 4080 12GB GDDR6 (115W TGP)",
                    "16-inch 2.5K OLED 240Hz 0.2ms Display with G-SYNC",
                    "32GB LPDDR5X RAM & 2TB PCIe 4.0 NVMe SSD",
                    "Slash Lighting programmable matrix on aluminum lid"
                ]),
                "specs": json.dumps({
                    "Display": "16.0-inch 2.5K OLED 240Hz 100% DCI-P3",
                    "Processor": "Intel Core Ultra 9 185H",
                    "Graphics": "NVIDIA GeForce RTX 4080 Laptop GPU",
                    "RAM": "32 GB LPDDR5X 7467MHz",
                    "Storage": "2 TB PCIe 4.0 NVMe M.2 SSD",
                    "Cooling": "ROG Intelligent Cooling with Vapor Chamber"
                }),
                "is_featured": True,
                "is_new_arrival": True,
                "is_trending": False
            },
            {
                "name": "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
                "slug": "sony-wh-1000xm5",
                "brand": "Sony",
                "category_id": created_categories["audio-headphones"],
                "description": "Industry-leading noise cancellation with two processors and 8 microphones. Hi-Res Audio wireless, crystal clear hands-free calls, and ultra-comfortable lightweight design.",
                "price": 398.00,
                "original_price": 449.00,
                "discount_percent": 11,
                "stock": 42,
                "rating": 4.9,
                "review_count": 310,
                "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80"
                ]),
                "features": json.dumps([
                    "Integrated Processor V1 & HD Noise Cancelling Processor QN1",
                    "Auto NC Optimizer adjusts cancellation based on environment",
                    "30-hour battery life with 3 min quick charge for 3 hours playback",
                    "Multipoint connection pairs with 2 Bluetooth devices seamlessly"
                ]),
                "specs": json.dumps({
                    "Type": "Over-Ear Wireless ANC",
                    "Driver Unit": "30mm Carbon Fiber Composite",
                    "Battery Life": "Up to 30 hours (ANC On)",
                    "Codec Support": "LDAC, AAC, SBC",
                    "Weight": "250 grams"
                }),
                "is_featured": True,
                "is_new_arrival": False,
                "is_trending": True
            },
            {
                "name": "Apple AirPods Pro (2nd Gen) with MagSafe Case USB-C",
                "slug": "airpods-pro-2-usbc",
                "brand": "Apple",
                "category_id": created_categories["audio-headphones"],
                "description": "Powered by H2 chip with up to 2x more Active Noise Cancellation, Adaptive Audio, Personalized Spatial Audio with dynamic head tracking, and USB-C case.",
                "price": 249.00,
                "original_price": 279.00,
                "discount_percent": 11,
                "stock": 60,
                "rating": 4.8,
                "review_count": 480,
                "image_url": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80"
                ]),
                "features": json.dumps([
                    "Apple H2 headphone chip & U1 chip in case",
                    "Adaptive Audio & Conversation Awareness",
                    "Personalized Spatial Audio with dynamic head tracking",
                    "IP54 dust, sweat, and water resistance for buds and case",
                    "Up to 30 hours listening time with charging case"
                ]),
                "specs": json.dumps({
                    "Type": "True Wireless In-Ear Earbuds",
                    "Connectivity": "Bluetooth 5.3",
                    "Battery": "6 hrs per charge (30 hrs with Case)",
                    "Charging": "USB-C, MagSafe, Apple Watch charger, Qi",
                    "ANC": "2x Active Noise Cancellation + Transparency"
                }),
                "is_featured": False,
                "is_new_arrival": False,
                "is_trending": True
            },
            {
                "name": "Apple Watch Ultra 2 GPS + Cellular 49mm Titanium",
                "slug": "apple-watch-ultra-2",
                "brand": "Apple",
                "category_id": created_categories["wearables-watches"],
                "description": "The most rugged and capable Apple Watch. Built with lightweight aerospace titanium case, precision dual-frequency GPS, up to 36 hours battery, and 3000 nits display.",
                "price": 799.00,
                "original_price": 849.00,
                "discount_percent": 6,
                "stock": 22,
                "rating": 4.9,
                "review_count": 89,
                "image_url": "https://images.unsplash.com/photo-1544117518-3b2164911381?w=800&auto=format&fit=crop&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1544117518-3b2164911381?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
                ]),
                "features": json.dumps([
                    "49mm aerospace-grade titanium case with flat sapphire crystal",
                    "S9 SiP chip with Double Tap touchless gesture control",
                    "3000 nits brightest display ever on an Apple Watch",
                    "100m water resistance & EN13319 certified dive computer"
                ]),
                "specs": json.dumps({
                    "Case": "49mm Titanium",
                    "Display": "3000 nits Always-On Retina OLED",
                    "Battery": "36 hours normal use (72 hours Low Power)",
                    "Sensors": "ECG, Blood Oxygen, Depth Gauge, Water Temp",
                    "GPS": "Precision Dual-Frequency L1 & L5 GPS"
                }),
                "is_featured": True,
                "is_new_arrival": True,
                "is_trending": True
            },
            {
                "name": "Sony PlayStation 5 Pro 2TB Console",
                "slug": "playstation-5-pro",
                "brand": "Sony",
                "category_id": created_categories["gaming-consoles"],
                "description": "Experience games with PlayStation Spectral Super Resolution (PSSR) AI upscaling, 67% more compute units GPU, advanced ray tracing, and 2TB high-speed SSD.",
                "price": 699.99,
                "original_price": 749.99,
                "discount_percent": 7,
                "stock": 18,
                "rating": 4.9,
                "review_count": 142,
                "image_url": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80"
                ]),
                "features": json.dumps([
                    "PlayStation Spectral Super Resolution (PSSR) AI Upscaling",
                    "Upgraded GPU with 67% more Compute Units & 28% faster memory",
                    "Advanced Ray Tracing reflection and refraction calculation",
                    "2TB custom ultra-fast NVMe SSD built-in storage",
                    "Includes DualSense Wireless Controller with Haptic Feedback"
                ]),
                "specs": json.dumps({
                    "CPU": "AMD Zen 2 8-core / 16-thread 3.85GHz",
                    "GPU": "AMD RDNA architecture 16.7 TFLOPs",
                    "RAM": "16GB GDDR6 + 2GB DDR5",
                    "Storage": "2TB NVMe PCIe 4.0 SSD",
                    "Output": "4K 120Hz, 8K support, VRR"
                }),
                "is_featured": True,
                "is_new_arrival": True,
                "is_trending": True
            },
            {
                "name": "Sony Alpha a7 IV Full-Frame Mirrorless Camera",
                "slug": "sony-alpha-a7-iv",
                "brand": "Sony",
                "category_id": created_categories["cameras-drones"],
                "description": "A true hybrid full-frame powerhouse featuring 33MP Exmor R sensor, BIONZ XR engine, 4K 60p 10-bit 4:2:2 video, and real-time Eye AF for humans, animals, and birds.",
                "price": 2498.00,
                "original_price": 2699.00,
                "discount_percent": 7,
                "stock": 12,
                "rating": 4.9,
                "review_count": 76,
                "image_url": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80"
                ]),
                "features": json.dumps([
                    "33MP Full-Frame Exmor R Back-Illuminated CMOS Sensor",
                    "4K 60p 10-bit 4:2:2 Recording with S-Cinetone color science",
                    "759-point Phase Detection AF with Real-Time Tracking",
                    "5.5-stop 5-axis in-body optical image stabilization"
                ]),
                "specs": json.dumps({
                    "Sensor": "33 Megapixel Full-Frame Exmor R CMOS",
                    "Video": "4K 60p 10-Bit 4:2:2 All-Intra",
                    "ISO Range": "100 - 51,200 (Expandable to 50-204,800)",
                    "Viewfinder": "3.68M-dot OLED EVF 120fps",
                    "Weight": "658g body only"
                }),
                "is_featured": True,
                "is_new_arrival": False,
                "is_trending": False
            },
            {
                "name": "DJI Mini 4 Pro Drone with RC 2 Smart Controller",
                "slug": "dji-mini-4-pro",
                "brand": "DJI",
                "category_id": created_categories["cameras-drones"],
                "description": "Sub-249g ultra-lightweight foldable camera drone with omnidirectional obstacle sensing, 4K/60fps HDR true vertical shooting, and 20km FHD video transmission.",
                "price": 959.00,
                "original_price": 1059.00,
                "discount_percent": 9,
                "stock": 17,
                "rating": 4.9,
                "review_count": 95,
                "image_url": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80"
                ]),
                "features": json.dumps([
                    "Under 249g weight (No FAA registration required in many regions)",
                    "Omnidirectional active obstacle sensing system",
                    "4K/60fps HDR video & 4K/100fps slow-motion",
                    "True vertical shooting optimized for social media reels"
                ]),
                "specs": json.dumps({
                    "Takeoff Weight": "< 249 grams",
                    "Max Flight Time": "34 minutes (Standard) / 45 mins (Plus)",
                    "Max Transmission": "20 km O4 Video Transmission",
                    "Camera Sensor": "1/1.3-inch CMOS 48MP f/1.7",
                    "Storage": "MicroSD up to 512GB"
                }),
                "is_featured": False,
                "is_new_arrival": True,
                "is_trending": True
            },
            {
                "name": "Logitech MX Master 3S Wireless Performance Mouse",
                "slug": "logitech-mx-master-3s",
                "brand": "Logitech",
                "category_id": created_categories["accessories-power"],
                "description": "Iconic ergonomic shape reimagined with Quiet Clicks, 8000 DPI track-on-glass optical sensor, and MagSpeed electromagnetic scrolling wheel.",
                "price": 99.99,
                "original_price": 119.99,
                "discount_percent": 16,
                "stock": 50,
                "rating": 4.9,
                "review_count": 420,
                "image_url": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80"
                ]),
                "features": json.dumps([
                    "MagSpeed electromagnetic scroll wheel scrolls 1,000 lines/sec",
                    "Quiet Click switches offer 90% less click noise",
                    "8,000 DPI Darkfield sensor tracks on any surface including glass",
                    "USB-C quick charge stays powered for 70 days on full charge"
                ]),
                "specs": json.dumps({
                    "DPI Range": "200 to 8000 DPI",
                    "Buttons": "7 customizable buttons + gesture button",
                    "Battery": "500 mAh Li-Po (Up to 70 days)",
                    "Connectivity": "Bluetooth Low Energy & Logi Bolt USB",
                    "Weight": "141 grams"
                }),
                "is_featured": False,
                "is_new_arrival": False,
                "is_trending": True
            },
            {
                "name": "Anker Prime 27650mAh Power Bank (250W 3-Port)",
                "slug": "anker-prime-250w-power-bank",
                "brand": "Anker",
                "category_id": created_categories["accessories-power"],
                "description": "Massive 27,650mAh capacity with lightning-fast 250W total multi-device output. Smart digital display shows realtime input/output wattage and battery health.",
                "price": 179.99,
                "original_price": 199.99,
                "discount_percent": 10,
                "stock": 38,
                "rating": 4.8,
                "review_count": 110,
                "image_url": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80"
                ]),
                "features": json.dumps([
                    "250W Maximum Combined Power Delivery",
                    "Single port output up to 140W (Fast charges 16\" MacBook Pro to 50% in 28 mins)",
                    "Smart digital LCD screen with Bluetooth app companion",
                    "Airline approved 99.54Wh battery capacity"
                ]),
                "specs": json.dumps({
                    "Capacity": "27,650 mAh (99.54 Wh)",
                    "Max Total Output": "250W",
                    "Ports": "2x USB-C (140W Max each) + 1x USB-A (65W Max)",
                    "Recharge Speed": "170W dual USB-C ultra-fast recharge",
                    "Weight": "665g"
                }),
                "is_featured": False,
                "is_new_arrival": True,
                "is_trending": False
            }
        ]

        created_products = []
        for p_data in products_data:
            p = models.Product(**p_data)
            db.add(p)
            db.commit()
            db.refresh(p)
            created_products.append(p)

        # 4. Seed Reviews
        sample_reviews = [
            {
                "product_id": created_products[0].id,
                "user_name": "Marcus Sterling",
                "user_avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
                "rating": 5,
                "comment": "The camera performance on the iPhone 16 Pro Max is simply unbeatable. The titanium finish feels premium and remarkably lightweight in the hand."
            },
            {
                "product_id": created_products[0].id,
                "user_name": "Elena Rostova",
                "user_avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
                "rating": 5,
                "comment": "Battery easily lasts almost two full days of heavy usage. Sound quality and display brightness in direct sunlight are phenomenal!"
            },
            {
                "product_id": created_products[2].id,
                "user_name": "David Chen",
                "user_avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
                "rating": 5,
                "comment": "The M3 Max is a desktop-class monster inside a laptop. Compiling massive codebases and rendering 8K footage without breaking a sweat or even spinning the fans loud."
            },
            {
                "product_id": created_products[4].id,
                "user_name": "Sarah Jenkins",
                "user_avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
                "rating": 5,
                "comment": "ANC on the Sony WH-1000XM5 completely blocks out airplane engine noise and noisy office chatter. The soundstage is rich and immersive."
            }
        ]

        for rev in sample_reviews:
            r = models.Review(**rev)
            db.add(r)

        # 5. Seed an initial demo order
        sample_order = models.Order(
            order_number="ORD-DEMO2026",
            user_id=demo_user.id,
            customer_name="Alex Vance",
            customer_email="alex@example.com",
            customer_phone="+1 (555) 234-5678",
            shipping_address="742 Evergreen Terrace",
            city="Tech City",
            postal_code="94016",
            total_amount=1597.00,
            discount_amount=79.85,
            shipping_fee=0.0,
            status="delivered",
            payment_method="card",
            payment_status="paid"
        )
        db.add(sample_order)
        db.commit()
        db.refresh(sample_order)

        order_item1 = models.OrderItem(
            order_id=sample_order.id,
            product_id=created_products[0].id,
            product_name=created_products[0].name,
            product_image=created_products[0].image_url,
            quantity=1,
            price=1199.00,
            total=1199.00
        )
        order_item2 = models.OrderItem(
            order_id=sample_order.id,
            product_id=created_products[4].id,
            product_name=created_products[4].name,
            product_image=created_products[4].image_url,
            quantity=1,
            price=398.00,
            total=398.00
        )
        db.add_all([order_item1, order_item2])
        db.commit()

        print(f"Database seeded successfully with {len(created_categories)} categories, {len(created_products)} products, and sample orders!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
