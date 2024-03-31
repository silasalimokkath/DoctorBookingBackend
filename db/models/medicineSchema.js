import { Schema, model } from 'mongoose';

const medicineSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
});

const Medicine = model('Medicine', medicineSchema);

export default Medicine;
