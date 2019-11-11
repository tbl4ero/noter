const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const handleLogin = require('../controllers/handleLogin');
const handleReg = require('../controllers/handleReg');
const getProfile = require('../controllers/getProfile');
const addNote = require('../controllers/addNote');
const deleteNote = require('../controllers/deleteNote');
const getNote = require('../controllers/getNote');
const updateNote = require('../controllers/updateNote');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

router.post('/api/profile/', handleLogin);

router.post('/api/reg/:login', handleReg);

router.get('/api/profile/:token', getProfile);

router.delete('/api/note/:loginToken/:noteId', deleteNote);

router.put('/api/note/:loginToken', addNote);

router.get('/api/note/:noteId', getNote);

router.post('/api/note/:loginToken/:noteId', updateNote);

module.exports.router = router;