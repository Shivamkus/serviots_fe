import { Navigate, Outlet } from "react-router-dom";
import Nav from "../components/Nav";

export default function MainLayout() {
    const token = localStorage.getItem("token");
    
      // If token exists, prevent login/signup and redirect to home
      if (!token) {
        return <Navigate to="/login" replace />;
      }
  return (
    <>
      <Nav />
      <div className="p-6">
        <Outlet />
      </div>
    </>
  );
}
