const express = require('express');
//create a router
const router = express.Router();
//users array
const users = require('../models/usersArray');
const {  getOneUser, createNewUser, updateUser, deleteUser } = require('../controller/appController')

router.get('/single-user/:id', getOneUser);
router.post('/create-user', createNewUser);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

module.exports = router;
