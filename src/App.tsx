import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Explore from "./pages/explore/Explore";
import Upload from "./pages/upload/Upload";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex minHeight="100vh" direction="column">
      <Header />
      <Flex flex="1" direction="column">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Flex>
      <Footer />
    </Flex>
  );
}

export default App;
