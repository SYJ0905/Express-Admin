const express = require('express');

const router = express.Router();
const firebaseAdmin = require('../plugins/firebase-admin');
// route: /user
router.get('/', (req, res) => {
  firebaseAdmin.ref(`user/${req.session.uid}`)
    .once('value', (dataSnapshot) => {
      res.render('user', {
        title: '會員專區',
        nickname: dataSnapshot.val().nickname,
      });
    });
});
module.exports = router;
