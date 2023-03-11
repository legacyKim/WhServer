const express = require('express');
const app = express.Router();

const WriteListSchema = require('../models/WriteListSchema.js');
const MemoListSchema = require('../models/MemoListSchema.js');

app.get('/api/WriteList', (req, res) => {
    WriteListSchema.find({}, (err, docs) => {
        if (err) {
            console.error(err);
        } else {
            res.json(docs);
        }
    });
});

app.get('/api/Memo', (req, res) => {
    MemoListSchema.find({}, (err, docs) => {
        if (err) {
            console.error(err);
        } else {
            res.json(docs);
        }
    });
})

app.post('/api/Memo', (req, res) => {
    try {
        const { memo } = req.body;
        const newMemo = new MemoListSchema({ memo });
        newMemo.save();
        res.json(newMemo);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

app.delete('/api/Memo', (req, res) => {

    MemoListSchema.deleteOne({ memo: req.body.memo }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.status(200).send('Success');
        }
    });
});

module.exports = app;
