import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import {
createComment,
deleteComment,
editComment,
getComments,
getPostComments,
likeComment
} from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/', verifyToken, createComment);
router.get('/:postId', getPostComments);
router.put('/like/:commentId', verifyToken, likeComment);
router.put('/edit/:commentId', verifyToken, editComment);
router.delete('/:commentId', verifyToken, deleteComment);
router.get('/', verifyToken, getComments);

export default router;