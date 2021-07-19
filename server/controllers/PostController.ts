import { Request, Response, NextFunction } from 'express';
import { PostService, PostType } from '../services/post/PostService';
import { PostInterestService } from '../services/post/PostInterestService';

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  // 더미데이터 - 실제 프론트에서 받아오는 구조로 재설계 필요
  const post: PostType = {
    title: '테스트',
    content: '테스트내용',
    location_id: 1,
    category_id: 2,
    view_count: 3,
    price: 5000,
    seller_id: 1,
    state: '판매중',
    thumbnail: 'test.url',
    interest_count: 5,
  };

  try {
    const result = await PostService.cratePost(post);
    res.status(200).json({
      message: 'success create post!',
    });
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 로그인 유저 정보 필요 X
    const { locationId, categoryId } = req.params;
    const result = await PostService.findPosts({
      location_id: +locationId,
      category_id: +categoryId,
    });
    res.status(200).json({
      result,
    });
  } catch (err) {
    next(err);
  }
};

const getPostBySellerNickname = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await PostService.findPostBySellerNickname({
      nickname: req.user.id,
    });
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const getPostInterestsByUserNickname = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await PostInterestService.findPostInterestsByUserNickname({
      nickname: req.user.id,
    });
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const result = await PostService.deletePost(+postId);

    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const user_id = /*req.user.id ||*/ 4;
    const result = await PostService.findPostById(+postId);
    await PostService.updatePostViewCount(+postId);

    if (!user_id) {
      res.status(200).json({
        result,
      });
    }

    const interest =
      await PostInterestService.findPostAlreadyInterestedByUserAndPostId({
        post_id: +postId,
        user_id,
      });

    const checked = interest.length ? true : false;
    const data = { ...result[0], checked };

    res.status(200).json({
      result: data,
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    // 더미데이터 -> 실제 프론트에서 데이터 받아오는 구조로 수정 필요
    const updates = {
      title: '수정된 제목입니다..',
      price: 999999,
      location_id: 1,
      category_id: 1,
      content: '수정된 내용입니다.',
      state: '수정된 상태',
      thumbnail: 'updated.url',
    };
    const result = await PostService.updatePost({
      post_id: +postId,
      ...updates,
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

const updatePostState = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const state = '수정할 상태값';
    const result = await PostService.updatePostState({
      post_id: +postId,
      state,
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

const creatPostInterest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const user_id = 1; // user_id 받아와야 함미다 (닉네임이 아님 --> 제거될 수 있음)
    const user =
      await PostInterestService.findPostAlreadyInterestedByUserAndPostId({
        post_id: +postId,
        user_id,
      });

    if (!user.length) {
      const result = await PostInterestService.createPostInterest({
        post_id: +postId,
        user_id,
      });
      await PostInterestService.updatePostInterestCount({ post_id: +postId });
      res.status(200).json({
        message: 'success create like',
      });
    }

    res.status(200).json({
      message: '이미 좋아요를 누른 게시물입니다...',
    });
  } catch (error) {
    next(error);
  }
};

const deletePostInterest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const user_id = 1; // 제거될 수 있음
    const user =
      await PostInterestService.findPostAlreadyInterestedByUserAndPostId({
        post_id: +postId,
        user_id,
      });

    if (!user.length) {
      res.status(300).json({
        message: '좋아요를 누르지 않은 게시물입니다...',
      });
    }
    const result = await PostInterestService.deletePostInterest({
      post_id: +postId,
      user_id,
    });
    res.status(200).json({
      message: 'success delete like',
    });
  } catch (error) {
    next(error);
  }
};

export const PostController = {
  createPost,
  getPosts,
  getPostBySellerNickname,
  deletePost,
  getPostById,
  updatePost,
  updatePostState,
  creatPostInterest,
  deletePostInterest,
  getPostInterestsByUserNickname,
};
