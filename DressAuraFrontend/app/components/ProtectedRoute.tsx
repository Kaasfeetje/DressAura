import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { useIsLoggedIn } from "~/services/authController";

type Props = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
    const { data: isAuthenticated } = useIsLoggedIn();
    const navigate = useNavigate();

    useEffect(() => {
        // If not authenticated, redirect to login page
        if (isAuthenticated === false) {
            navigate("/login"); // Redirect to login page
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated === null) {
        // Render a loading state while checking authentication
        return <div>Loading...</div>; // You can customize this
    }

    if (isAuthenticated) {
        return children;
    }

    return null;
};

export default ProtectedRoute;
