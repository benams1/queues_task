const express = require('express');
const router = express.Router();
const apiRoute = require('./api.route')

const routes = [
  {
    path: '/api',
    route: apiRoute
  }

];

routes.forEach(route => {
  router.use(route.path, route.route);
});

// router.get('/', (req, res) => res.sendStatus(200)) test

module.exports = router;
