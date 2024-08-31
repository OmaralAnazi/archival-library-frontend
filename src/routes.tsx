import Account from "./pages/account/Account";
import Explore from "./pages/explore/Explore";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Upload from "./pages/upload/Upload";

const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
    requireAuth: false,
    hideFromHeaderForGuestUsers: true,
    hideFromHeaderForLoggedInUsers: true,
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
    requireAuth: false,
    hideFromHeaderForGuestUsers: false,
    hideFromHeaderForLoggedInUsers: false,
  },
  {
    name: "Upload",
    path: "/upload",
    element: <Upload />,
    requireAuth: true,
    hideFromHeaderForGuestUsers: true,
    hideFromHeaderForLoggedInUsers: false,
  },
  {
    name: "Account",
    path: "/account",
    element: <Account />,
    requireAuth: true,
    hideFromHeaderForGuestUsers: true,
    hideFromHeaderForLoggedInUsers: false,
  },
];

export default routes;
