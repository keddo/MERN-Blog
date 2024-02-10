import express from 'express'
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  updateUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router()

router.get('/test', test);
router.put('/:userId', verifyToken, updateUser);
router.delete('/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/', verifyToken, getUsers);
router.get('/:userId', getUser);

export default router;