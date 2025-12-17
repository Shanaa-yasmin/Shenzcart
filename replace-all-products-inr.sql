-- Replace all products with new INR-priced products (200-2000 range)
-- First clear existing products, then add new ones
-- Run this in your Supabase SQL Editor

-- Clear existing products
DELETE FROM products;

-- Reset the sequence if needed
-- ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- Insert new products with INR prices (200-2000 range)
INSERT INTO products (name, description, price, image_url, images, features, category, brand, stock_quantity, rating, reviews_count) VALUES

-- Electronics Category (799-1999 INR)
('Wireless Bluetooth Earbuds', 'Premium wireless earbuds with active noise cancellation and 24-hour battery life. Perfect for music, calls, and workouts.', 1299.00, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', 
ARRAY['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600'], 
ARRAY['Active Noise Cancellation', 'Wireless Charging Case', '24-Hour Battery Life', 'IPX7 Waterproof'], 'Electronics', 'SoundTech', 45, 4.3, 89),

('Gaming Mechanical Keyboard', 'RGB backlit mechanical keyboard with Cherry MX switches. Perfect for gaming and productivity.', 1899.00, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600',
ARRAY['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600'],
ARRAY['Cherry MX Blue Switches', 'RGB Backlighting', 'Anti-Ghosting', 'Detachable Cable'], 'Electronics', 'GamePro', 32, 4.7, 156),

('4K Webcam', 'Ultra HD 4K webcam with auto-focus and built-in microphone. Ideal for streaming and video calls.', 1599.00, 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600',
ARRAY['https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600'],
ARRAY['4K Ultra HD', 'Auto Focus', 'Built-in Microphone', 'USB Plug & Play'], 'Electronics', 'StreamCam', 28, 4.2, 73),

('Portable Power Bank', '20000mAh portable charger with fast charging. Keep your devices powered on the go.', 899.00, 'https://images.unsplash.com/photo-1609592806596-7d8b4c3e3d6e?w=600',
ARRAY['https://images.unsplash.com/photo-1609592806596-7d8b4c3e3d6e?w=600', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600'],
ARRAY['20000mAh Capacity', 'Fast Charging', 'Multiple USB Ports', 'LED Power Display'], 'Electronics', 'PowerMax', 67, 4.4, 201),

('Bluetooth Speaker', 'Portable Bluetooth speaker with 360-degree sound and 12-hour battery life.', 1199.00, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600',
ARRAY['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600'],
ARRAY['360-Degree Sound', '12-Hour Battery', 'IPX7 Waterproof', 'Bluetooth 5.0'], 'Electronics', 'SoundWave', 64, 4.4, 178),

-- Home & Kitchen Category (299-1299 INR)
('Stainless Steel Coffee Mug', 'Insulated travel mug that keeps drinks hot for 6 hours. Perfect for daily commute.', 599.00, 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=600',
ARRAY['https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=600', 'https://images.unsplash.com/photo-1506372023823-6d85d2df7c57?w=600'],
ARRAY['Double Wall Insulation', 'Leak Proof Lid', 'BPA Free', '16oz Capacity'], 'Home & Kitchen', 'BrewMaster', 89, 4.6, 134),

('Smart LED Light Bulb', 'WiFi-enabled smart bulb with 16 million colors and voice control compatibility.', 399.00, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600',
ARRAY['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'],
ARRAY['16 Million Colors', 'Voice Control', 'WiFi Connected', 'Energy Efficient'], 'Home & Kitchen', 'SmartHome', 156, 4.1, 298),

('Ceramic Dinner Plates Set', 'Elegant 12-piece ceramic dinner set. Microwave and dishwasher safe.', 1299.00, 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600',
ARRAY['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'],
ARRAY['12-Piece Set', 'Microwave Safe', 'Dishwasher Safe', 'Chip Resistant'], 'Home & Kitchen', 'DineWell', 43, 4.5, 87),

('Non-Stick Cookware Set', '5-piece non-stick cookware set. Perfect for everyday cooking.', 1199.00, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600', 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600'],
ARRAY['5-Piece Set', 'Non-Stick Coating', 'Dishwasher Safe', 'Heat Resistant'], 'Home & Kitchen', 'CookWell', 67, 4.2, 145),

-- Fashion Category (599-1999 INR)
('Classic Denim Jacket', 'Timeless denim jacket made from premium cotton. Perfect layering piece.', 1799.00, 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600',
ARRAY['https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600'],
ARRAY['100% Cotton', 'Classic Fit', 'Button Closure', 'Multiple Pockets'], 'Fashion', 'UrbanStyle', 78, 4.3, 112),

('Leather Crossbody Bag', 'Genuine leather crossbody bag with adjustable strap. Perfect for everyday use.', 1399.00, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600'],
ARRAY['Genuine Leather', 'Adjustable Strap', 'Multiple Compartments', 'Magnetic Closure'], 'Fashion', 'LeatherCraft', 34, 4.7, 89),

('Running Sneakers', 'Lightweight running shoes with breathable mesh upper. Perfect for daily runs.', 1999.00, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600'],
ARRAY['Breathable Mesh', 'Responsive Cushioning', 'Lightweight Design', 'Durable Outsole'], 'Fashion', 'RunFast', 92, 4.4, 167),

('Cotton T-Shirt', 'Premium 100% cotton t-shirt with comfortable fit. Available in multiple colors.', 699.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600'],
ARRAY['100% Cotton', 'Comfortable Fit', 'Multiple Colors', 'Pre-Shrunk'], 'Fashion', 'ComfortWear', 156, 4.1, 89),

('Leather Wallet', 'Genuine leather bi-fold wallet with multiple card slots. Compact and durable.', 899.00, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600'],
ARRAY['Genuine Leather', 'Multiple Card Slots', 'Coin Pocket', 'RFID Blocking'], 'Fashion', 'LeatherCraft', 89, 4.7, 167),

-- Sports & Outdoors Category (399-999 INR)
('Yoga Mat', 'Premium non-slip yoga mat with extra thickness. Eco-friendly material.', 799.00, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
ARRAY['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600'],
ARRAY['Non-Slip Surface', 'Extra Thick 6mm', 'Eco-Friendly', 'Carrying Strap'], 'Sports & Outdoors', 'YogaLife', 125, 4.6, 203),

('Water Bottle', 'Insulated stainless steel water bottle. Keeps drinks cold for 24 hours.', 499.00, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
ARRAY['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600', 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600'],
ARRAY['Double Wall Insulated', '24oz Capacity', 'BPA Free', 'Wide Mouth'], 'Sports & Outdoors', 'HydroMax', 187, 4.5, 156),

('Resistance Bands Set', 'Complete set of 5 resistance bands with different levels. Includes exercise guide.', 599.00, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600'],
ARRAY['5 Resistance Levels', 'Door Anchor Included', 'Exercise Guide', 'Portable Design'], 'Sports & Outdoors', 'FitGear', 98, 4.2, 134),

('Adjustable Dumbbells', 'Set of adjustable dumbbells for home workouts. Easy weight adjustment.', 999.00, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600'],
ARRAY['Adjustable Weight', 'Compact Design', 'Non-Slip Grip', 'Space Saving'], 'Sports & Outdoors', 'FitGear', 45, 4.3, 78),

-- Books & Media Category (299-699 INR)
('Wireless Booklight', 'Rechargeable LED reading light with adjustable brightness. Perfect for nighttime reading.', 399.00, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'],
ARRAY['Rechargeable Battery', 'Adjustable Brightness', 'Flexible Neck', 'Universal Clip'], 'Books & Media', 'ReadWell', 76, 4.3, 91),

('Book Stand', 'Adjustable wooden book stand for comfortable reading. Perfect for study and reading.', 599.00, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'],
ARRAY['Wooden Construction', 'Adjustable Angle', 'Portable Design', 'Anti-Slip Base'], 'Books & Media', 'ReadWell', 89, 4.1, 56),

('Notebook Set', 'Set of 3 premium notebooks with lined pages. Perfect for journaling and note-taking.', 299.00, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'],
ARRAY['3 Notebook Set', 'Premium Paper', 'Lined Pages', 'Hardcover Binding'], 'Books & Media', 'WriteWell', 134, 4.2, 67),

-- Beauty & Personal Care Category (599-1799 INR)
('Skincare Set', 'Complete 4-step skincare routine. Suitable for all skin types.', 1599.00, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600',
ARRAY['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600'],
ARRAY['4-Step Routine', 'All Skin Types', 'Dermatologist Tested', 'Cruelty Free'], 'Beauty & Personal Care', 'GlowSkin', 52, 4.6, 143),

('Electric Toothbrush', 'Rechargeable electric toothbrush with 3 cleaning modes and 2-minute timer.', 1299.00, 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600',
ARRAY['https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600', 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600'],
ARRAY['3 Cleaning Modes', '2-Minute Timer', '4 Brush Heads', 'Travel Case'], 'Beauty & Personal Care', 'SmileBright', 38, 4.5, 97),

('Face Moisturizer', 'Daily face moisturizer with SPF 30 protection. Suitable for all skin types.', 799.00, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600',
ARRAY['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600'],
ARRAY['SPF 30 Protection', 'All Skin Types', 'Non-Greasy Formula', 'Daily Use'], 'Beauty & Personal Care', 'GlowSkin', 78, 4.3, 89),

('Hair Dryer', 'Professional hair dryer with multiple heat settings and cool shot button.', 1799.00, 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600',
ARRAY['https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600', 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600'],
ARRAY['Multiple Heat Settings', 'Cool Shot Button', 'Lightweight Design', 'Professional Grade'], 'Beauty & Personal Care', 'StylePro', 29, 4.4, 112);
