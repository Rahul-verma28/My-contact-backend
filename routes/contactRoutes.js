const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/validateUser');
const {getContacts, getContact, createContact, deleteContact, updateContact} = require('../controllers/contactController');

router.use(validateUser)

router.route('/').get(getContacts).post(createContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;