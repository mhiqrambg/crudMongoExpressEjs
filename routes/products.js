const express = require('express');
const router = express();
const { create, fbId } = require('../controllers/products');

router.post('/garments/:gar_id/products', create);
router.get('/garments/:id_garment/:id_pro', fbId);
module.exports = router;
