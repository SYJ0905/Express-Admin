const express = require('express');

const router = express.Router();
const firebaseAdmin = require('../plugins/firebase-admin');

// middleware
// check login
const login = (req, res, next) => {
  const uid = req.session.uid;
  if (uid) {
    next();
  } else {
    res.redirect('/');
  }
};

// route: /user
router.get('/', login, (req, res) => {
  firebaseAdmin.ref(`user/${req.session.uid}`).once('value', (dataSnapshot) => {
    res.render('user', {
      title: '會員專區',
      nickname: dataSnapshot.val().nickname,
    });
  });
});
module.exports = router;
