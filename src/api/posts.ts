import axios, { AxiosRequestConfig } from 'axios';
import { FetchPostsResponse, Post } from './postsTypes';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

const DIFF_POST_LIST_LS = 'DIFF_POST_LIST_LS';

interface FetchPostListPayload {
  limit: number;
  skip: number;
}

const getDiffPostList = () => {
  const diffPostListStr = localStorage.getItem(DIFF_POST_LIST_LS);
  const diffPostList: Post[] = diffPostListStr
    ? JSON.parse(diffPostListStr)
    : [];

  return diffPostList;
};

const setDiffPostList = (diffPostList: Post[]) => {
  localStorage.setItem(DIFF_POST_LIST_LS, JSON.stringify(diffPostList));
};

export const fetchPostList = async ({
  skip,
  limit,
}: FetchPostListPayload): Promise<FetchPostsResponse> => {
  const axiosRequestConfig: AxiosRequestConfig = {
    method: 'get',
    url: '/posts',
    params: { limit, skip },
  };

  const response = await axiosInstance.request<FetchPostsResponse>(
    axiosRequestConfig,
  );

  const diffPostList = getDiffPostList();

  const postListFromServer = response.data.posts;

  diffPostList.forEach((diffPostItem) => {
    const index = postListFromServer.findIndex(
      (postItemFromServer) => postItemFromServer.id === diffPostItem.id,
    );
    if (index > -1) {
      postListFromServer[index] = diffPostItem;
    } else {
      // postListFromServer.push(diffPostItem);
    }
  });

  return { ...response.data, posts: postListFromServer };
  // return response.data;
};

interface FetchPostItemPayload {
  id: number;
}

export const fetchPostItem = async ({
  id,
}: FetchPostItemPayload): Promise<Post> => {
  const axiosRequestConfig: AxiosRequestConfig = {
    method: 'get',
    url: `/posts/${id}`,
  };

  const response = await axiosInstance.request<Post>(axiosRequestConfig);

  const diffPostList = getDiffPostList();

  const postFromDiffPostList = diffPostList.find((item) => item.id === id);

  return postFromDiffPostList ? postFromDiffPostList : response.data;
};

interface PatchPostItemPayload {
  post: Post;
}

export const patchPostItem = async ({
  post,
}: PatchPostItemPayload): Promise<void> => {
  const axiosRequestConfig: AxiosRequestConfig = {
    method: 'put',
    url: `/posts/${post.id}`,
    data: post,
  };

  await axiosInstance.request<unknown>(axiosRequestConfig);

  const diffPostList = getDiffPostList();

  const index = diffPostList.findIndex((item) => item.id === post.id);

  console.log(index);

  if (index > -1) {
    diffPostList[index] = post;
    console.log(12312);
  } else {
    diffPostList.push(post);
  }

  setDiffPostList(diffPostList);
};
