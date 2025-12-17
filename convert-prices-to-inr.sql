-- Convert all product prices from USD to INR
-- Exchange rate: 1 USD = 83 INR (approximate)
-- Run this in your Supabase SQL Editor

UPDATE products 
SET price = ROUND(price * 83, 2)
WHERE price IS NOT NULL;

-- Optional: Add a currency column to track currency type
-- ALTER TABLE products ADD COLUMN currency VARCHAR(3) DEFAULT 'INR';

-- Verify the conversion
SELECT 
    name, 
    price as price_inr,
    ROUND(price / 83, 2) as original_usd_price
FROM products 
ORDER BY price DESC
LIMIT 10;
