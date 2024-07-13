const Products = require('../models/products.js');
const Garments = require('../models/garment.js');

const create = async (req, res) => {
  const { gar_id } = req.params;
  const product = req.body;
  try {
    const Product = await Products.create(product);
    const Garment = await Garments.findById(gar_id);
    Product.garment.push(Garment);
    Garment.products.push(Product);

    await Product.save();
    await Garment.save();
    console.log(Product);
    res.redirect(`/garments/${gar_id}`);
  } catch (err) {
    console.log(err.message);
  }
};
const fbId = async (req, res) => {
  const { id_pro } = req.params;

  try {
    const product = await Products.findById(id_pro).populate('garment');
    // console.log(product.garment[0].nam);
    res.render(`products/profile`, { product });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { create, fbId };
