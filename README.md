# ShenzCart

A full-stack e-commerce web application built with React (Vite) + Node/Express + Supabase (PostgreSQL + Auth).

## Tech Stack
- Frontend: React + Vite, CSS
- Backend: Node.js + Express
- Database & Auth: Supabase (PostgreSQL + Auth)

## Prerequisites
- Node.js 18+
- A Supabase project with:
  - URL and anon key
  - `products` table (id uuid/serial, name text, description text, price numeric, image_url text)

## Setup (Windows)

1) Clone/install deps
```
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

2) Configure environment variables
- Copy `.env.example` to `.env` in both `backend/` and `frontend/` and fill your Supabase URL and anon key.

3) Run the servers (two terminals)
```
# Terminal 1 (Backend)
cd backend
npm run dev

# Terminal 2 (Frontend)
cd frontend
npm run dev
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Supabase Schema
```sql
-- Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  image_url text,
  images text[],
  features text[],
  category text,
  brand text,
  stock_quantity integer default 0,
  rating numeric(2,1) default 0,
  reviews_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders table
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  total_amount numeric(10,2) not null,
  status text not null default 'confirmed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order items table
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  quantity integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## Sample Data
To add more products to your store, run the SQL script:
```bash
# In Supabase SQL Editor, copy and run the contents of:
sample-products.sql
```

This will add 18 diverse products across 6 categories:
- Electronics (4 products)
- Home & Kitchen (3 products) 
- Fashion (3 products)
- Sports & Outdoors (3 products)
- Books & Media (2 products)
- Beauty & Personal Care (2 products)

## Notes
- Auth is handled on the frontend using Supabase Auth (email/password).
- Cart is persisted via a `cartId` stored in `localStorage` and synchronized with backend in-memory storage for demo purposes.
- Do not commit `.env` files.
