const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.get('/', function (req, res, next) {
  User.find(function (err, users) {
    if (err) res.send(err);
    res.json(users);
    res.end();
  });
});

router.post('/', function (req, res, next) {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function (err) {
    if (err) res.send(err);
    res.json({ message: 'User created!' });
    res.end();
  });
});

router.get('/:id', function (req, res, next) {
  User.find({ _id: req.params.id }, function (err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
    res.end();
  });
});

router.post('/:id/update', function (req, res, next) {
  const doc = {
    name: req.body.name,
    password: req.body.password
  };
  User.updateOne({ _id: req.params.id }, doc, function (err, raw) {
    if (err) res.send(err);
    res.send({ message: raw });
  });
});

router.get('/:id/delete', function (req, res, next) {
  User.deleteOne({ _id: req.params.id }, function (err, mongoRes) {
    if (err) res.send(err);
    res.send(mongoRes);
  });
});

module.exports = router;
