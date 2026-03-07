import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts";
import ErrorBoundary from "../components/ErrorBoundary";
import {
  HomePage,
  CustomPage,
  LinksPage,
  ShopPage,
  AnalyticsPage,
  SettingsPage,
  AuthPage,
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/custom",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <CustomPage />,
      },
    ],
  },
  {
    path: "/links",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <LinksPage />,
      },
    ],
  },
  {
    path: "/shop",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <ShopPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <AnalyticsPage />,
      },
    ],
  },
  {
    path: "/settings",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "/analytics",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <AnalyticsPage />,
      },
    ],
  },
]);
