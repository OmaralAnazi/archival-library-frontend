import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex minHeight="100vh" direction="column">
      <Header />
      <Flex flex="1" direction="column">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Flex>
      <Footer />
    </Flex>
  );
}

export default App;
