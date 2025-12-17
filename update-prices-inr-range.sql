-- Update all product prices to INR range (200-2000)
-- This will replace all existing prices with new INR prices
-- Run this in your Supabase SQL Editor

-- First, let's see current products count
SELECT COUNT(*) as total_products FROM products;

-- Update prices to be in 200-2000 INR range based on categories
UPDATE products 
SET price = CASE 
    WHEN category = 'Electronics' THEN 
        CASE 
            WHEN name ILIKE '%earbuds%' OR name ILIKE '%headphone%' THEN 1299.00
            WHEN name ILIKE '%keyboard%' OR name ILIKE '%mouse%' THEN 1899.00
            WHEN name ILIKE '%webcam%' OR name ILIKE '%camera%' THEN 1599.00
            WHEN name ILIKE '%power bank%' OR name ILIKE '%charger%' THEN 899.00
            WHEN name ILIKE '%speaker%' THEN 1199.00
            WHEN name ILIKE '%toothbrush%' THEN 1799.00
            ELSE 1499.00
        END
    WHEN category = 'Home & Kitchen' THEN
        CASE 
            WHEN name ILIKE '%mug%' OR name ILIKE '%bottle%' THEN 599.00
            WHEN name ILIKE '%light%' OR name ILIKE '%bulb%' THEN 399.00
            WHEN name ILIKE '%plates%' OR name ILIKE '%dinner%' THEN 1299.00
            WHEN name ILIKE '%coffee%' THEN 799.00
            ELSE 899.00
        END
    WHEN category = 'Fashion' THEN
        CASE 
            WHEN name ILIKE '%jacket%' OR name ILIKE '%coat%' THEN 1799.00
            WHEN name ILIKE '%bag%' OR name ILIKE '%purse%' THEN 1399.00
            WHEN name ILIKE '%shoes%' OR name ILIKE '%sneakers%' THEN 1999.00
            WHEN name ILIKE '%shirt%' OR name ILIKE '%tshirt%' THEN 699.00
            WHEN name ILIKE '%wallet%' THEN 899.00
            ELSE 1199.00
        END
    WHEN category = 'Sports & Outdoors' THEN
        CASE 
            WHEN name ILIKE '%yoga%' OR name ILIKE '%mat%' THEN 799.00
            WHEN name ILIKE '%bottle%' OR name ILIKE '%water%' THEN 499.00
            WHEN name ILIKE '%resistance%' OR name ILIKE '%bands%' THEN 599.00
            WHEN name ILIKE '%dumbbell%' OR name ILIKE '%weight%' THEN 1299.00
            ELSE 899.00
        END
    WHEN category = 'Books & Media' THEN
        CASE 
            WHEN name ILIKE '%light%' OR name ILIKE '%lamp%' THEN 399.00
            WHEN name ILIKE '%speaker%' OR name ILIKE '%bluetooth%' THEN 999.00
            WHEN name ILIKE '%book%' THEN 299.00
            ELSE 599.00
        END
    WHEN category = 'Beauty & Personal Care' THEN
        CASE 
            WHEN name ILIKE '%skincare%' OR name ILIKE '%set%' THEN 1599.00
            WHEN name ILIKE '%toothbrush%' THEN 1299.00
            WHEN name ILIKE '%cream%' OR name ILIKE '%lotion%' THEN 799.00
            ELSE 999.00
        END
    ELSE 799.00  -- Default price for any other category
END
WHERE price IS NOT NULL;

-- Verify the updated prices
SELECT 
    category,
    name, 
    price,
    stock_quantity
FROM products 
ORDER BY category, price DESC;
