const express = require('express');

const router = express.Router();

// route: /signup
router.get('/', (req, res) => {
  res.render('signup', {
    title: '註冊',
  });
});

router.post('/', () => {});

module.exports = router;
