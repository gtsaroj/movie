import { lazy } from "react";

const FavouritePage = lazy(() => import("@/pages/favourite/favouritePage").then(component => ({ default: component.FavouritePage })));
const Home = lazy(() => import("@/pages/home/home").then(component => ({ default: component.default })));
const MovieDetailPage = lazy(() => import("@/pages/movie/movieDetails").then(component => ({ default: component.MovieDetailPage })));
const MoviesPage = lazy(() => import("@/pages/movies/moviesPage").then(component => ({ default: component.MoviesPage })));

interface Router {
    [path: string]: {
        requireAuth?: boolean;
        isAccessPublicOnly?: boolean;
        isAccessToAnyOne?: boolean;
        element: React.ReactNode;

    };
}




export const routers: Router = {
    "/": {
        element: <Home />,
        isAccessToAnyOne: true
    },
    "/movie/:id": {
        element: <MovieDetailPage />,
        isAccessToAnyOne: true
    },
    "/favourites": {
        element: <FavouritePage />,
        isAccessToAnyOne: true
    },
    "/movies": {
        element: <MoviesPage />,
        isAccessToAnyOne: true
    }
}