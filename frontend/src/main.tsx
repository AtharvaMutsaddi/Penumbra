import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ChatGPTResponse from './pages/ChatGPTResponse.jsx'
import { InstagramDashboard } from './pages/InstagramDashboard.tsx';
import { InstagramCategoryDashboard } from './pages/InstagramCategoryDashboard.tsx';
import TwitterDashboard from './pages/TwitterDashboard';
import TwitterCategoryDashboard from './pages/TwitterCategoryDashboard';
import YoutubeDashboard from './pages/YoutubeDashboard'
import VideoAnalytics from './pages/VideoAnalytics'
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
  },
  {
    path:"/twitter/category/:category",
    element: <TwitterCategoryDashboard/>
  },
  {
    path: "/youtube",
    element: <YoutubeDashboard/>,
  },
  {
    path: `/youtube/:id`,
    element: <VideoAnalytics/>
  }

]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
