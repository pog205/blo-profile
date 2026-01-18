import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts";
import {
  CustomPage,
  LinksPage,
  ShopPage,
  AnalyticsPage,
  SettingsPage,
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <CustomPage />,
      },
      {
        path: "custom",
        element: <CustomPage />,
      },
      {
        path: "links",
        element: <LinksPage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
