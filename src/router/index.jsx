import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Landing from '../pages/Landing';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import PasswordRecovery from '../pages/Auth/PasswordRecovery';
import Dashboard from '../pages/Dashboard';
import Onboarding from '../pages/Onboarding';
import Scan from '../pages/Scan';
import Recommendations from '../pages/Products/Recommendations';
import Reviews from '../pages/Reviews';
import Tracking from '../pages/Tracking';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Subscription from '../pages/Subscription';

import ScanResult from '../pages/Scan/Result';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Landing /></Layout>,
  },
  {
    path: '/login',
    element: <Layout><Login /></Layout>,
  },
  {
    path: '/signup',
    element: <Layout><Signup /></Layout>,
  },
  {
    path: '/password-recovery',
    element: <Layout><PasswordRecovery /></Layout>,
  },
  {
    path: '/dashboard',
    element: <Layout><Dashboard /></Layout>,
  },
  {
    path: '/onboarding',
    element: <Layout><Onboarding /></Layout>,
  },
  {
    path: '/scan',
    element: <Layout><Scan /></Layout>,
  },
  {
    path: '/scan/result/:id',
    element: <Layout><ScanResult /></Layout>,
  },
  {
    path: '/products',
    element: <Layout><Recommendations /></Layout>,
  },
  {
    path: '/reviews',
    element: <Layout><Reviews /></Layout>,
  },
  {
    path: '/tracking',
    element: <Layout><Tracking /></Layout>,
  },
  {
    path: '/profile',
    element: <Layout><Profile /></Layout>,
  },
  {
    path: '/settings',
    element: <Layout><Settings /></Layout>,
  },
  {
    path: '/subscription',
    element: <Layout><Subscription /></Layout>,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
