import Explore from "./pages/explore/Explore";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
    requireAuth: false,
    hideFromHeaderForGuestUsers: false,
    hideFromHeaderForLoggedInUsers: false,
  },
  {
    name: "Login",
    path: "/login",
    element: <Login />,
    requireAuth: false,
    hideFromHeaderForGuestUsers: false,
    hideFromHeaderForLoggedInUsers: true,
  },
  {
    name: "Signup",
    path: "/signup",
    element: <Signup />,
    requireAuth: false,
    hideFromHeaderForGuestUsers: false,
    hideFromHeaderForLoggedInUsers: true,
  },
  {
    name: "Explore",
    path: "/explore",
    element: <Explore />,
    requireAuth: true,
    hideFromHeaderForGuestUsers: false,
    hideFromHeaderForLoggedInUsers: false,
  },
];

export default routes;
