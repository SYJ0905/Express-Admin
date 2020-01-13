const express = require('express');

const router = express.Router();
const firebaseAdmin = require('../plugins/firebase-admin');
const firebase = require('../plugins/firebase');

const firebaseAuth = firebase.auth();

/* GET home page. */
// route: /
router.get('/', (req, res) => {
  const authUid = req.session.uid;
  firebaseAdmin.ref('list').once('value')
    .then((dataSnapshot) => {
      console.log('顯示留言列表成功');
      const listData = [];
      dataSnapshot.forEach((item) => {
        const itemInfo = item.val(); // item.val() 為一物件
        listData.push(itemInfo);
      });
      res.render('index', {
        title: '測試留言板',
        authUid,
        errors: req.flash('errorMessages'),
        listData,
      });
    })
    .catch((error) => {
      console.log('顯示留言列表錯誤', error.message);
    });
});

// route: /
router.post('/', (req, res) => {
  firebaseAuth.signOut()
    .then(() => {
      console.log('登出成功');
      req.session.uid = null;
      res.redirect('/');
    })
    .catch((error) => {
      console.log('登出錯誤', error.message);
    });
});

module.exports = router;
