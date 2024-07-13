const express = require('express');
const router = express.Router();
const { index, fbyId, destroy, create } = require('../controllers/garments');

router.get('/garments', index);
router.post('/garments', create);
router.get('/', (req, res) => {
  res.render('index');
});
router.get('/garments/:id', fbyId);
router.delete('/garments/:id', destroy);

module.exports = router;
