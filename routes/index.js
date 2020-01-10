const express = require('express');

const router = express.Router();

/* GET home page. */
// route: /
router.get('/', (req, res) => {
  res.render('index', {
    title: '測試留言板',
  });
});

module.exports = router;
