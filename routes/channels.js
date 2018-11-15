const express = require('express');
const router = new express.Router();
const Channel = require('../models/channel')

//Teste
router.get('/', function (req, res, next) {
    res.json({ message: 'Olá mundo!' });
});

router.get('/channels', function (req, res, next) {
        Channel.find(function (err, channels) {
            if (err) res.send(err);
            res.json(channels);
            res.end();
        });
    });

router.post('/channels', function (req, res, next) {
    let channel = new Channel();
    channel.name = req.body.name;
    channel.save(function (err) {
        if (err) res.send(err);
        res.json({ message: 'Channel created!' });
        res.end();
    });
});

router.get('/channels/:id', function (req, res, next) {
    Channel.find({_id: req.params.id}, function (err, channels) {
        if (err) {
            res.send(err);
        }
        res.json(channels);
        res.end();
    });
});

router.post('/channels/:id/update', function (req, res, next) {
    const doc = {
        name: req.body.name,
        $push: {dataPoints: { entries: { umidade: req.body.umidity }}}
    };
    Channel.updateOne({ _id: req.params.id }, doc, function (err, raw) {
        if (err) res.send(err);
        res.send({message: raw});
    });
});

router.get('/channels/:id/delete', function (req, res, next) {
    Channel.deleteOne({ _id: req.params.id }, function (err, mongoRes) {
        if (err) res.send(err);
        res.send(mongoRes);
    });
})

module.exports = router;