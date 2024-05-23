import mongoose from 'mongoose';

// Product schema
const productSchema = new mongoose.Schema({
  batchNo: { type: String, required: true },
  productName: { type: String, required: true },
  description: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true }, 
  dateOfEntry: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

export default Product;