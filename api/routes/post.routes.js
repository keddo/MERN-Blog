import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';

import {create, deletePost, getPosts, updatePost, getPost} from '../controllers/post.controller.js'

const router = express.Router();

router.post('/', verifyToken, create);
router.get('/', getPosts);
router.get('/:postId', getPost);
// router.get('/:postId/:userId', verifyToken, getPost)
router.delete('/:postId/:userId', verifyToken, deletePost);
router.put('/:postId/:userId', verifyToken, updatePost);

export default router;