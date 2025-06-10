import Home from "@/pages/home/home";
import MovieDetailPage from "@/pages/movie/movieDetails";

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
    }
}