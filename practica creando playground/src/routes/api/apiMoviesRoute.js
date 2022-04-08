const express = require('express');
const router = express.Router();
const moviesController = require('../../controllers/api/moviesControllerApi');

router.get('/', moviesController.list);
router.get('/detail/:id', moviesController.detail);



router.post('/add', moviesController.create);
router.delete('/destroy/:id', moviesController.destroy);


module.exports = router;