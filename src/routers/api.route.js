const express = require('express');
const router = express.Router();
const controller = require('../controller')

router.get('/:queue_name', controller.getMessage)

router.post('/:queue_name', controller.addMessage)

module.exports = router;
