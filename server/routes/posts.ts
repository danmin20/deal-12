import express from 'express';
import { PostController } from '../controllers/PostController';

const postsRouter = express.Router();

// @ GET 요청
// 위치번호(0일 시 모든 위치)와 카테고리 번호(0일시 모든 카테고리)에 해당하는 모든 포스트 목록 조회
postsRouter.get(
  '/location/:locationId/category/:categoryId',
  PostController.getPosts
);
// 포스트번호에 해당하는 포스트 디테일 조회
postsRouter.get('/:postId', PostController.getPostById);

// @ POST 요청
// 제출된 데이터에 맞는 포스트를 생성
postsRouter.post('/', PostController.createPost);
// 포스트번호에 해당하는 포스트에 로그인 된 유저의 관심 생성
postsRouter.post('/:postId/interest', PostController.creatPostInterest);

// @ PUT 요청
// 포스트번호에 맞는 포스트의 내용을 수정
postsRouter.put('/:postId', PostController.updatePost);
// 포스트 번호에 해당하는 포스트 상태만 수정
postsRouter.put('/:postId/state', PostController.updatePostState);

// @ DELETE 요청
// 포스트번호에 해당하는 포스트를 삭제
postsRouter.delete('/:postId', PostController.deletePost);
// 포스트번호에 해당하는 관심내용 삭제
postsRouter.delete('/:postId/interest', PostController.deletePostInterest);

export default postsRouter;
