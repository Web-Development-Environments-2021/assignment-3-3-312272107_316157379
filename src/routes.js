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
    component: () => import("./pages/search/SearchPage")
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
    path: "/favorites",
    name: "favorites",
    component: () => import('./pages/favorites/DynamicFavoritesPage')
  },
  {
    path: "/teamPage/:team_name",
    name: "teamPage",
    component: () => import('./pages/TeamPage')
  },
  {
    path: "/playerPage/:player_id",
    name: "playerPage",
    component: () => import('./pages/PlayerPage')
  },
  {
    path: "/LeagueManagePage",
    name: "LeagueManagePage",
    component: () => import('./pages/LeagueManagePage')
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
