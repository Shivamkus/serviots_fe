import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {

    const token = localStorage.getItem("token");

  // If token exists, prevent login/signup and redirect to home
  if (token) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <Outlet />
    </div>
  );
}
