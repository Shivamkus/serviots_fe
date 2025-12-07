import { Routes, Route } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";
// import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import AuthLayout from "./layoutes/AuthLayout";
import MainLayout from "./layoutes/MainLayout";
import Task from "./pages/TaskList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import PublicLayout from "./layoutes/PublicLayout";

export default function App() {
  return (
    <Routes>
      {/* Routes WITHOUT Navbar */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Routes WITH Navbar */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/task" element={<Task />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
