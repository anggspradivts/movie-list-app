import { createBrowserRouter } from "react-router-dom";
import MovieDetailPage from "./pages/MovieDetail";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import ActorDetails from "./pages/ActorDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movie/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "/actor/:actorId",
        element: <ActorDetails />
      },
      
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />
  },
]);
