import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// GET /api/orders - fetch all orders for a user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// POST /api/orders - create a new order
router.post('/', async (req, res) => {
  const { userId, items, total } = req.body;
  if (!userId || !items || !total) {
    return res.status(400).json({ error: 'userId, items, and total are required' });
  }

  try {
    // Calculate delivery date (3 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    
    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: total,
        status: 'confirmed',
        delivery_date: deliveryDate.toISOString()
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = Object.entries(items).map(([productId, quantity]) => ({
      order_id: order.id,
      product_id: productId,
      quantity: quantity
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// PATCH /api/orders/:id/cancel - cancel an order
router.patch('/:id/cancel', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!id || !userId) {
    return res.status(400).json({ error: 'Order ID and user ID are required' });
  }

  try {
    // First verify the order belongs to the user
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (orderError) throw orderError;
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Only allow canceling confirmed orders
    if (order.status !== 'confirmed') {
      return res.status(400).json({ 
        error: `Cannot cancel order with status: ${order.status}` 
      });
    }

    // Update order status to cancelled
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({ 
        status: 'cancelled'
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;
    return res.json(updatedOrder);

  } catch (error) {
    console.error('Error cancelling order:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to cancel order' 
    });
  }
});

export default router;
