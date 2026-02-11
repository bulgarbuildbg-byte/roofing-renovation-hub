import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

const ProtectedRoute = ({ children, requireAdmin = false }: Props) => {
  const { user, loading, isAdmin, isStaff } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/admin" replace />;
  if (!isStaff) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
