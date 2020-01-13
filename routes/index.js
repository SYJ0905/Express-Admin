const express = require('express');

const router = express.Router();
// const firebaseAdmin = require('../plugins/firebase-admin');
const firebase = require('../plugins/firebase');

const firebaseAuth = firebase.auth();

/* GET home page. */
// route: /
router.get('/', (req, res) => {
  const authUid = req.session.uid;
  res.render('index', {
    title: '測試留言板',
    authUid,
  });
});

// route: /
router.post('/', (req, res) => {
  firebaseAuth.signOut()
    .then(() => {
      console.log('登出');
      req.session.uid = null;
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
