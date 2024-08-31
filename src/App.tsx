import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./pages/not-found/NotFound";
import { Flex } from "@chakra-ui/react";
import routes from "./routes";
import AuthChecker from "./components/AuthChecker";

function App() {
  return (
    <Flex minHeight="100vh" direction="column">
      <Header />
      <Flex flex="1" direction="column">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.requireAuth ? <AuthChecker>{route.element}</AuthChecker> : route.element
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Flex>
      <Footer />
    </Flex>
  );
}

export default App;
