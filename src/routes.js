import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";


const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/about",
    name: "about",
    component: () => import('./pages/AboutPage')
  },
  {
    path: "/stageMatches",
    name: "stageMatches",
    component: () => import('./pages/StageMatchesPage')
  },
  {
    path: "/favoriteMatches",
    name: "favoriteMatches",
    component: () => import('./pages/FavoriteMatchesPage')
  },
  {
    path: "/teamPage",
    name: "teamPage",
    component: () => import('./pages/TeamPage')
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
