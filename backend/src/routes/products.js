import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// GET /api/products - fetch all products
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// GET /api/products/:id - fetch a single product
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(404).json({ error: 'Product not found' });
  return res.json(data);
});

export default router;
