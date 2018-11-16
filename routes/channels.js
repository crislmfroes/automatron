const express = require('express');
const router = new express.Router();
const Channel = require('../models/channel');

//Teste
/*router.get('/', function (req, res, next) {
    res.json({ message: 'Olá mundo!' });
});*/

router.get('/channels', function (req, res, next) {
    Channel.find(function (err, channels) {
        if (err) res.send(err);
        res.json(channels);
        res.end();
    });
});

router.post('/channels', function (req, res, next) {
    let channel = new Channel({
        name: req.body.name,
        userId: req.body.userId,
    });
    channel.save(function (err) {
        if (err) res.send(err);
        res.json({ message: 'Channel created!' });
        res.end();
    });
});

router.get('/channels/:id', function (req, res, next) {
    Channel.findById(req.params.id, function (err, channels) {
        if (err) {
            res.send(err);
        }
        res.json(channels);
        res.end();
    });
});

router.post('/channels/:id/update', function (req, res, next) {
    let doc = {};
    if (req.body.name) doc.name = req.body.name;
    Channel.findByIdAndUpdate(req.params.id, doc, function (err, raw) {
        if (err) res.send(err);
        res.send({ message: raw });
        res.end();
    });
});

router.post('/channels/:id/data', function (req, res, next) {
    if (req.body.entries) {
        let doc = {
            $push: {
                dataPoints:
                {
                    entries: req.body.entries
                }
            }
        }
        console.log(doc.$push.dataPoints.entries);
        Channel.findAndUpdate(req.params.id, doc, function (err, raw) {
            if (err) res.send(err);
            res.send({ message: raw });
            res.end();
        });
    } else {
        res.end();
    }
});

router.get('/channels/:id/delete', function (req, res, next) {
    Channel.findByIdAndDelete(req.params.id, function (err, raw) {
        if (err) res.send(err);
        res.send(raw);
        res.end();
    });
});

module.exports = router;