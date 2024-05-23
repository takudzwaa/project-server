import { findById, create, findByIdAndUpdate, findByIdAndDelete } from '../models/Product';
import { Router } from 'express';
const router = Router();
export default router;

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await findById(productId);
      if (!product) {
        // If product not found, return 404 Not Found status
        return res.status(404).json({ error: 'Product not found' });
      }
      // If product found, send it as a JSON response
      res.json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/', async (req, res) => {
    const newProduct = req.body;
    try {
      const createdProduct = await create(newProduct);
      // Send the created product as a JSON response
      res.status(201).json(createdProduct);
    } catch (error) {
      // Handle any errors
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    try {
      // Use Mongoose to update the product by ID in the database
      const product = await findByIdAndUpdate(productId, updatedProduct, { new: true });
      if (!product) {
        // If product not found, return 404 Not Found status
        return res.status(404).json({ error: 'Product not found' });
      }
      // If product found and updated, send it as a JSON response
      res.json(product);
    } catch (error) {
      // Handle any errors
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

    router.delete('/:id', async (req, res) => {
        const productId = req.params.id;
        try {
        // Use Mongoose to find and delete the product by ID in the database
        const product = await findByIdAndDelete(productId);
        if (!product) {
            // If product not found, return 404 Not Found status
            return res.status(404).json({ error: 'Product not found' });
        }
        // If product found and deleted, send it as a JSON response
        res.json(product);
        } catch (error) {
        // Handle any errors
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    });