const express = require('express');
const usersRouter = express.Router();

const userController = require('../controllers/user.cjs')

usersRouter.get('/', userController.getAll);
usersRouter.get('/:id', userController.getUser);
usersRouter.post('/', userController.createUser);
usersRouter.put('/:id', userController.updateUser);
usersRouter.delete('/:id', userController.deleteUser);

module.exports = usersRouter;