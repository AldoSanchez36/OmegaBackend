// host + /api/borrar
const { Router } = require('express');
// const { borrarOne, borrarAll } = require('../controllers/forms');
const router = Router();

router.post('/',borrarOne);
router.post('/all',borrarAll);

module.exports = router;