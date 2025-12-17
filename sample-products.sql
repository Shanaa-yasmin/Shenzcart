-- Sample Products for ShenzCart
-- Run this in your Supabase SQL Editor to add more products

INSERT INTO products (name, description, price, image_url, images, features, category, brand, stock_quantity, rating, reviews_count) VALUES

-- Electronics Category
('Wireless Bluetooth Earbuds', 'Premium wireless earbuds with active noise cancellation and 24-hour battery life. Perfect for music, calls, and workouts.', 79.99, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', 
ARRAY['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600', 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600'], 
ARRAY['Active Noise Cancellation', 'Wireless Charging Case', '24-Hour Battery Life', 'IPX7 Waterproof'], 'Electronics', 'SoundTech', 45, 4.3, 89),

('Gaming Mechanical Keyboard', 'RGB backlit mechanical keyboard with Cherry MX switches. Perfect for gaming and productivity with customizable lighting.', 129.99, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600',
ARRAY['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600', 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600'],
ARRAY['Cherry MX Blue Switches', 'RGB Backlighting', 'Anti-Ghosting', 'Detachable Cable'], 'Electronics', 'GamePro', 32, 4.7, 156),

('4K Webcam', 'Ultra HD 4K webcam with auto-focus and built-in microphone. Ideal for streaming, video calls, and content creation.', 89.99, 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600',
ARRAY['https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600'],
ARRAY['4K Ultra HD', 'Auto Focus', 'Built-in Microphone', 'USB Plug & Play'], 'Electronics', 'StreamCam', 28, 4.2, 73),

('Portable Power Bank', '20000mAh portable charger with fast charging and multiple ports. Keep your devices powered on the go.', 34.99, 'https://images.unsplash.com/photo-1609592806596-7d8b4c3e3d6e?w=600',
ARRAY['https://images.unsplash.com/photo-1609592806596-7d8b4c3e3d6e?w=600', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600'],
ARRAY['20000mAh Capacity', 'Fast Charging', 'Multiple USB Ports', 'LED Power Display'], 'Electronics', 'PowerMax', 67, 4.4, 201),

-- Home & Kitchen Category
('Stainless Steel Coffee Mug', 'Insulated stainless steel travel mug that keeps drinks hot for 6 hours and cold for 12 hours. Perfect for daily commute.', 24.99, 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=600',
ARRAY['https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=600', 'https://images.unsplash.com/photo-1506372023823-6d85d2df7c57?w=600'],
ARRAY['Double Wall Insulation', 'Leak Proof Lid', 'BPA Free', '16oz Capacity'], 'Home & Kitchen', 'BrewMaster', 89, 4.6, 134),

('Smart LED Light Bulb', 'WiFi-enabled smart bulb with 16 million colors and voice control compatibility. Control from anywhere with smartphone app.', 19.99, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600',
ARRAY['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'],
ARRAY['16 Million Colors', 'Voice Control', 'WiFi Connected', 'Energy Efficient'], 'Home & Kitchen', 'SmartHome', 156, 4.1, 298),

('Ceramic Dinner Plates Set', 'Elegant 12-piece ceramic dinner set including plates, bowls, and mugs. Microwave and dishwasher safe.', 69.99, 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600',
ARRAY['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'],
ARRAY['12-Piece Set', 'Microwave Safe', 'Dishwasher Safe', 'Chip Resistant'], 'Home & Kitchen', 'DineWell', 43, 4.5, 87),

-- Fashion Category
('Classic Denim Jacket', 'Timeless denim jacket made from premium cotton. Perfect layering piece for any casual outfit.', 59.99, 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600',
ARRAY['https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600'],
ARRAY['100% Cotton', 'Classic Fit', 'Button Closure', 'Multiple Pockets'], 'Fashion', 'UrbanStyle', 78, 4.3, 112),

('Leather Crossbody Bag', 'Genuine leather crossbody bag with adjustable strap. Compact yet spacious design perfect for everyday use.', 89.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600'],
ARRAY['Genuine Leather', 'Adjustable Strap', 'Multiple Compartments', 'Magnetic Closure'], 'Fashion', 'LeatherCraft', 34, 4.7, 89),

('Running Sneakers', 'Lightweight running shoes with breathable mesh upper and responsive cushioning. Perfect for daily runs and workouts.', 119.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600'],
ARRAY['Breathable Mesh', 'Responsive Cushioning', 'Lightweight Design', 'Durable Outsole'], 'Fashion', 'RunFast', 92, 4.4, 167),

-- Sports & Outdoors Category
('Yoga Mat', 'Premium non-slip yoga mat with extra thickness for comfort. Eco-friendly material perfect for all types of yoga practice.', 39.99, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
ARRAY['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600'],
ARRAY['Non-Slip Surface', 'Extra Thick 6mm', 'Eco-Friendly', 'Carrying Strap Included'], 'Sports & Outdoors', 'YogaLife', 125, 4.6, 203),

('Water Bottle', 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours. BPA-free with wide mouth for easy filling.', 29.99, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
ARRAY['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600', 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600'],
ARRAY['Double Wall Insulated', '24oz Capacity', 'BPA Free', 'Wide Mouth Opening'], 'Sports & Outdoors', 'HydroMax', 187, 4.5, 156),

('Resistance Bands Set', 'Complete set of 5 resistance bands with different resistance levels. Includes door anchor and exercise guide.', 24.99, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600'],
ARRAY['5 Resistance Levels', 'Door Anchor Included', 'Exercise Guide', 'Portable Design'], 'Sports & Outdoors', 'FitGear', 98, 4.2, 134),

-- Books & Media Category
('Wireless Booklight', 'Rechargeable LED reading light with adjustable brightness. Clips onto books and e-readers for comfortable nighttime reading.', 16.99, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'],
ARRAY['Rechargeable Battery', 'Adjustable Brightness', 'Flexible Neck', 'Universal Clip'], 'Books & Media', 'ReadWell', 76, 4.3, 91),

('Bluetooth Speaker', 'Portable Bluetooth speaker with 360-degree sound and 12-hour battery life. Waterproof design perfect for outdoor use.', 49.99, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600',
ARRAY['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600'],
ARRAY['360-Degree Sound', '12-Hour Battery', 'IPX7 Waterproof', 'Bluetooth 5.0'], 'Books & Media', 'SoundWave', 64, 4.4, 178),

-- Beauty & Personal Care Category
('Skincare Set', 'Complete 4-step skincare routine including cleanser, toner, serum, and moisturizer. Suitable for all skin types.', 79.99, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600',
ARRAY['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600'],
ARRAY['4-Step Routine', 'All Skin Types', 'Dermatologist Tested', 'Cruelty Free'], 'Beauty & Personal Care', 'GlowSkin', 52, 4.6, 143),

('Electric Toothbrush', 'Rechargeable electric toothbrush with 3 cleaning modes and 2-minute timer. Includes 4 brush heads and travel case.', 89.99, 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600',
ARRAY['https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600', 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600'],
ARRAY['3 Cleaning Modes', '2-Minute Timer', '4 Brush Heads', 'Travel Case Included'], 'Beauty & Personal Care', 'SmileBright', 38, 4.5, 97);
