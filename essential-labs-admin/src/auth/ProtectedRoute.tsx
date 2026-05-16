import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

export function RequireAuth() {
  const { isAuthed } = useAuth();
  const loc = useLocation();
  if (!isAuthed)
    return <Navigate to="/login" replace state={{ from: `${loc.pathname}${loc.search}` }} />;
  return <Outlet />;
}
