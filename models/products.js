const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tidak Boleh Kosong'],
  },
  qty: {
    type: String,
    required: true,
  },
  garment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Garment',
      // required: true,
    },
  ],
});

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;
