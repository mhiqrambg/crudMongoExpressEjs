const mongoose = require('mongoose');
const Product = require('./products');

const garmentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tidak Boleh Kosong'],
    minlength: 3,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

garmentsSchema.post('findOneAndDelete', async function (garment) {
  if (garment.products.length) {
    const res = await Product.deleteMany({ _id: { $in: garment.products } });
    console.log(res);
  }
});

const Garment = mongoose.model('Garment', garmentsSchema);

module.exports = Garment;
