import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import ListingPage from "./pages/ListingPage";

function App() {
  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/listPage" element={<ListingPage />} />
      </Routes>
    </>
  );
}

export default App;
