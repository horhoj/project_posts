import axios, { AxiosRequestConfig } from 'axios';
import { FetchPostsResponse } from './postsTypes';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

interface FetchPostList {
  limit: number;
  skip: number;
}

export const fetchPostList = async ({
  skip,
  limit,
}: FetchPostList): Promise<FetchPostsResponse> => {
  const axiosRequestConfig: AxiosRequestConfig = {
    method: 'get',
    url: '/posts',
    params: { limit, skip },
  };

  const response = await axiosInstance.request<FetchPostsResponse>(
    axiosRequestConfig,
  );

  return response.data;
};
