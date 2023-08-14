import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";

export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black opacity-50">
        <div className="h-24 w-24 border-y-4 border-cyan-500 rounded-[50%] animate-spin duration-500"></div>
      </div>
    );
  }

  return loggedIn ? <Outlet /> : <Navigate to="/admin" />;
}
