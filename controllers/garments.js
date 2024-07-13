const { off } = require('../app.js');
const Garments = require('../models/garment.js');

const index = async (req, res) => {
  try {
    const data = await Garments.find();
    res.render('garments/index', { garments: data });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while retrieving garments');
  }
};

const create = async (req, res) => {
  const data = await Garments.create(req.body);
  try {
    if (data) {
      res.redirect('/garments');
    }
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const fbyId = async (req, res) => {
  try {
    const { id } = req.params;

    const garments = await Garments.findById(id).populate('products');
    if (!garments) {
      return res.status(404).send('Garment not found');
    } else {
      res.render('garments/profile', { garments });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('An error occurred while retrieving the garment');
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await Garments.findOneAndDelete({ _id: id });
    res.redirect('/garments');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('An error occurred while retrieving the garment');
  }
};

module.exports = { index, create, fbyId, destroy };
