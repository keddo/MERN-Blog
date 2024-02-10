import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';

import {create, deletePost, getPosts, updatePost} from '../controllers/post.controller.js'

const router = express.Router();

router.post('/', verifyToken, create);
router.get('/', getPosts);
router.delete('/:postId/:userId', verifyToken, deletePost);
router.put('/:postId/:userId', verifyToken, updatePost);

export default router;