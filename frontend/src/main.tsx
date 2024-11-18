import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import TwitterDashboard from './pages/TwitterDashboard';
import TwitterCategoryDashboard from './pages/TwitterCategoryDashboard';
import ChatGptResponse from './pages/ChatGptResponse'
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <TwitterDashboard category="general"/>,
  },
  {
    path:"/twitter/category/:category",
    element: <TwitterCategoryDashboard/>
  },
  {
    path:"/suggestions/:socialMediaPlatform/:postCategory",
    element: <ChatGptResponse/>
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
