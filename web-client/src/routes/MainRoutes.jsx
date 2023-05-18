import { Routes, Route } from "react-router-dom";
import {Home,Food, User} from "../pages/";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="/food"  element={<Food />} />
      <Route path="/user"  element={<User />} />
    </Routes>
  );
};

export default MainRoutes;
