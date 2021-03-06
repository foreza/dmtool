const express = require('express');
const config = require('config');
const multer = require('multer');

const upload = multer();
const firestore = require('../firestore');
const router = express.Router();
const characterConfig = config.get('characters');

router.post('/character', (req, res) => {
  const roomKey = req.roomKey;
  const data = req.body;

  firestore
    .collection('rooms')
    .doc(roomKey)
    .collection('characters')
    .add(data);

  res.end();
});

router.get('/character/:characterId', (req, res) => {
  res.render('dm/characterDetail', { characterId: req.params.characterId.trim(), roomKey: req.roomKey });
})

router.get('/characters', (req, res) => {
  const roomKey = req.roomKey;
  res.render('dm/characters', { roomKey });
});

router.patch('/character/:characterId', upload.array(), (req, res, next) => {
  const roomKey = req.roomKey;
  const characterId = req.params.characterId;
  const body = Object.assign({}, req.body);
  delete body.characterId;

  firestore.collection('rooms').doc(roomKey).collection('characters').doc(characterId)
    .update(body)
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      next(err);
    })
})

router.get('/character/:characterId/form', (req, res, next) => {
  const roomKey = req.roomKey;
  const characterId = req.params.characterId.trim();
  let template = null;
  firestore.collection('rooms').doc(roomKey).get()
    .then(roomRef => {
      template = roomRef.data().characterTemplate;

      return firestore.collection('rooms').doc(roomKey).collection('characters').doc(characterId).get();
    })
    .then((charRef) => {
      const character = Object.assign({}, charRef.data(), { id: charRef.id });
      res.render('dm/characterForm', { template, character });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

router.get('/characters/template/form', (req, res, next) => {
  const template = characterConfig.template;
  const roomKey = req.roomKey;
  firestore.collection('rooms').doc(roomKey).get()
    .then((docRef) => {
      const template = docRef.data().characterTemplate;
      res.render('dm/characterForm', { template, character: null });
    })
    .catch(err => {
      next(err);
    });
});

router.patch('/characters/template', (req, res, next) => {
  const roomKey = req.roomKey;
  firestore.collection('rooms').doc(roomKey).update({ characterTemplate: JSON.parse(req.body.template) })
    .then((doc) => {
      res.status(200).end();
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/characters/template', (req, res, next) => {
  const roomKey = req.roomKey;
  firestore.collection('rooms').doc(roomKey).get()
    .then((doc) => {
      const room = doc.data();
      const template = JSON.stringify(room.characterTemplate);
      res.render('dm/characterTemplate', { title: room.name, template, roomKey });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
