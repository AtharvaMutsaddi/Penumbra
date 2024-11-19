import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import TwitterDashboard from './pages/TwitterDashboard.jsx';
import TwitterCategoryDashboard from './pages/TwitterCategoryDashboard.jsx';
import ChatGPTResponse from './pages/ChatGPTResponse.jsx'
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
    path: "/suggestions/:socialMediaPlatform/:postCategory",
    element: <ChatGPTResponse />
  },
  {
    path: "/instagram",
    element: <InstagramDashboard />
  },
  {
    path: "/instagram/category/:category",
    element: <InstagramCategoryDashboard />
  }

]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
