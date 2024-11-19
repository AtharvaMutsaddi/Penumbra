import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TwitterDashboard from './pages/TwitterDashboard.jsx';
import TwitterCategoryDashboard from './pages/TwitterCategoryDashboard.jsx';
import { InstagramDashboard } from './pages/InstagramDashboard.tsx';
import { InstagramCategoryDashboard } from './pages/InstagramCategoryDashboard.tsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <TwitterDashboard category="general" />,
  },
  {
    path: "/twitter/category/:category",
    element: <TwitterCategoryDashboard />
  },
  {
    path: "/instagram/",
    element: <InstagramDashboard />
  },
  {
    path: "/instagram/category/:category",
    element: <InstagramCategoryDashboard />,
  }

]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
