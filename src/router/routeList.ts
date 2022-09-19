import { FC } from 'react';
import { P404page } from '../pages/P404page';
import { PostListPage } from '../pages/PostListPage';
import { PostItemPage } from '../pages/PostItemPage';

interface RouteItem {
  path: string;
  component: FC;
}

export const routeNameList = [
  'PostListPage',
  'PostEditItem',
  'Page404',
] as const;

export type Routes = typeof routeNameList[number];

export const routeList: Record<Routes, RouteItem> = {
  PostListPage: {
    path: '/posts',
    component: PostListPage,
  },

  PostEditItem: {
    path: '/posts/:id',
    component: PostItemPage,
  },

  Page404: {
    path: '*',
    component: P404page,
  },
};
