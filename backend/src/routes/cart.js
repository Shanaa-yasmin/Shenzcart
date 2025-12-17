import express from 'express';

// In-memory cart store: { [cartId]: { items: { [productId]: quantity } } }
const carts = new Map();

const router = express.Router();

function getCart(cartId) {
  if (!carts.has(cartId)) carts.set(cartId, { items: {} });
  return carts.get(cartId);
}

// GET /api/cart?cartId=...
router.get('/', (req, res) => {
  const cartId = req.query.cartId;
  if (!cartId) return res.status(400).json({ error: 'cartId is required' });
  return res.json(getCart(cartId));
});

// POST /api/cart/add
// body: { cartId, productId, quantity }
router.post('/add', (req, res) => {
  const { cartId, productId, quantity } = req.body;
  if (!cartId || !productId || !quantity) {
    return res.status(400).json({ error: 'cartId, productId, and quantity are required' });
  }
  const cart = getCart(cartId);
  cart.items[productId] = (cart.items[productId] || 0) + Number(quantity);
  return res.json(cart);
});

// POST /api/cart/remove
// body: { cartId, productId }
router.post('/remove', (req, res) => {
  const { cartId, productId } = req.body;
  if (!cartId || !productId) return res.status(400).json({ error: 'cartId and productId are required' });
  const cart = getCart(cartId);
  delete cart.items[productId];
  return res.json(cart);
});

// POST /api/cart/clear
// body: { cartId }
router.post('/clear', (req, res) => {
  const { cartId } = req.body;
  if (!cartId) return res.status(400).json({ error: 'cartId is required' });
  carts.set(cartId, { items: {} });
  return res.json(getCart(cartId));
});

export default router;
