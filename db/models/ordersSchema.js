import { Schema, model } from 'mongoose';

const orderSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prescription: {
    type: Schema.Types.ObjectId,
    ref: 'Prescription',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Order = model('Order', orderSchema);
export default Order;
