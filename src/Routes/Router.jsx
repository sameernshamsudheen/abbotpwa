import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage";
import HompPage from "../Pages/Homepage/HompPage";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/home",
      element: <HompPage />,

      // children: [
      //   {
      //     path: ROUTE_PATHS.DASHBOARD,
      //     element: <ProtectedRoute component={<DashboardPage />} />,
      //   },
      //   {
      //     path: ROUTE_PATHS.ASSET,
      //     element: <ProtectedRoute component={<AssetPage />} />,
      //   },
      //   {
      //     path: ROUTE_PATHS.ASSET_ADD,
      //     element: <ProtectedRoute component={<AssetAddPage />} />,
      //   },
      //   {
      //     path: ROUTE_PATHS.ASSET_DETAIL,
      //     element: <ProtectedRoute component={<AssetDetailsPage />} />,
      //   },
      //   {
      //     path: ROUTE_PATHS.ASSET_DETAIL_IMAGE_ADD,
      //     element: <ProtectedRoute component={<AssetDetailImageAddPage />} />,
      //   },
      //   {
      //     path: ROUTE_PATHS.ASSET_DETAIL_DOC_ADD,
      //     element: <ProtectedRoute component={<AssetDetailDocAddPage />} />,
      //   },
      //   {
      //     path: ROUTE_PATHS.ASSET_DETAIL_VIDEO_ADD,
      //     element: <ProtectedRoute component={<AssetDetailVideoAddPage />} />,
      //   },
      //   {
      //     path: ROUTE_PATHS.ASSET_DETAIL_ANIMATION_ADD,
      //     element: (
      //       <ProtectedRoute component={<AssetDetailAnimationAddPage />} />
      //     ),
      //   },
      //   {
      //     path: ROUTE_PATHS.ASSET_DETAIL_SLICE_ADD,
      //     element: <ProtectedRoute component={<AssetDetailSliceAddPage />} />,
      //   },
      //   {
      //     path: ROUTE_PATHS.AUTHOR,
      //     element: <ProtectedRoute component={<AuthorPage />} />,
      //   },
      //   {
      //     path: ROUTE_PATHS.SETTINGS,
      //     element: <ProtectedRoute component={<SettingsPage />} />,
      //   },
      // ],
    },
  ]);

  return <RouterProvider router={router} />;
};
