import express from 'express';
import { ChatController } from '../controllers/ChatController';
import { authenticateAccessToken } from '../middlewares/authenticate';

const chatRouter = express.Router();

// 채팅룸 가져오기 (문의하기)
chatRouter.post(
  '/chatroom',
  authenticateAccessToken,
  ChatController.getChatRoom
);

// 판매글 채팅목록
chatRouter.get(
  '/post/:postId',
  authenticateAccessToken,
  ChatController.getChatRoomByPostId
);

// 채팅내용 가져오기
chatRouter.post(
  '/chatroom/:chatroomId',
  authenticateAccessToken,
  ChatController.getChatsByChatRoomId
);

export default chatRouter;