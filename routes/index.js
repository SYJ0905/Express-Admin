const express = require('express');

const router = express.Router();
// const firebaseAdmin = require('../plugins/firebase-admin');
// const firebase = require('../plugins/firebase');

/* GET home page. */
// route: /
router.get('/', (req, res) => {
  const authUid = req.session.uid;
  res.render('index', {
    title: '測試留言板',
    authUid,
  });
});

module.exports = router;
