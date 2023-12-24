import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage";
import HompPage from "../Pages/Homepage/HompPage";
import Returnpage from "../Pages/Returnpage/Returnpage";
import Removepage from "../Pages/Removepage/Removepage";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/home",
      element: <HompPage />,
    },
    {
      path: "/home/return",
      element: <Returnpage />,
    },
    {
      path: "/home/remove",
      element: <Removepage />,
    },
  ]);

  return <RouterProvider router={router} />;
};
