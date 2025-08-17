import type { RouteRecordRaw } from 'vue-router';
import isAdminGuard from '../guards/is-admin.guard';
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'administration',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
  // children: [
  //   {
  //     path: 'login',
  //     name: 'login',
  //     component: () => import('@/modules/auth/views/LoginView.vue'),
  //   },
  //   {
  //     path: 'register',
  //     name: 'register',
  //     component: () => import('@/modules/auth/views/RegisterView.vue'),
  //   },
  // ],
};
