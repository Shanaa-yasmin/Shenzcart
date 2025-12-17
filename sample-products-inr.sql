-- Sample Products with INR Prices for ShenzCart
-- Run this in your Supabase SQL Editor to add products with Indian Rupee pricing

INSERT INTO products (name, description, price, image_url, images, features, category, brand, stock_quantity, rating, reviews_count) VALUES

-- Electronics Category (INR Prices)
('Wireless Bluetooth Earbuds Pro', 'Premium wireless earbuds with active noise cancellation and 30-hour battery life. Perfect for music, calls, and workouts.', 6639.00, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', 
ARRAY['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600'], 
ARRAY['Active Noise Cancellation', 'Wireless Charging Case', '30-Hour Battery Life', 'IPX8 Waterproof'], 'Electronics', 'SoundTech', 25, 4.4, 156),

('Gaming RGB Keyboard', 'Mechanical keyboard with Cherry MX switches and RGB backlighting. Perfect for gaming and productivity.', 10789.00, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600',
ARRAY['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600'],
ARRAY['Cherry MX Red Switches', 'RGB Backlighting', 'Anti-Ghosting', 'USB-C Cable'], 'Electronics', 'GamePro', 18, 4.6, 89),

('Smartphone 128GB', 'Latest Android smartphone with 128GB storage, 48MP camera, and fast charging. Perfect for daily use.', 24900.00, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600'],
ARRAY['128GB Storage', '48MP Camera', 'Fast Charging', '6.5 inch Display'], 'Electronics', 'TechMobile', 45, 4.3, 234),

-- Home & Kitchen Category (INR Prices)
('Premium Coffee Maker', 'Automatic drip coffee maker with programmable timer and thermal carafe. Makes perfect coffee every time.', 8299.00, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
ARRAY['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600', 'https://images.unsplash.com/photo-1506372023823-6d85d2df7c57?w=600'],
ARRAY['Programmable Timer', 'Thermal Carafe', 'Auto Shut-off', '12-Cup Capacity'], 'Home & Kitchen', 'BrewMaster', 32, 4.5, 78),

('Non-Stick Cookware Set', '5-piece non-stick cookware set including frying pans, saucepan, and stockpot. Dishwasher safe.', 4149.00, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600', 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600'],
ARRAY['5-Piece Set', 'Non-Stick Coating', 'Dishwasher Safe', 'Heat Resistant Handles'], 'Home & Kitchen', 'CookWell', 67, 4.2, 145),

-- Fashion Category (INR Prices)
('Cotton T-Shirt', 'Premium 100% cotton t-shirt with comfortable fit. Available in multiple colors and sizes.', 1249.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600'],
ARRAY['100% Cotton', 'Comfortable Fit', 'Multiple Colors', 'Pre-Shrunk'], 'Fashion', 'ComfortWear', 156, 4.1, 89),

('Leather Wallet', 'Genuine leather bi-fold wallet with multiple card slots and coin pocket. Compact and durable design.', 2079.00, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600'],
ARRAY['Genuine Leather', 'Multiple Card Slots', 'Coin Pocket', 'RFID Blocking'], 'Fashion', 'LeatherCraft', 89, 4.7, 167);
