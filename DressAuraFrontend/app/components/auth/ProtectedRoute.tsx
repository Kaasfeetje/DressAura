import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { useIsLoggedIn, UserStatus } from "~/services/authController";

type Props = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
    const { data: isAuthenticated } = useIsLoggedIn();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === UserStatus.Unregistered) {
            navigate("/register");
        }

        if (isAuthenticated === UserStatus.Unauthorized) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (
        isAuthenticated === UserStatus.LoggedIn ||
        (isAuthenticated === UserStatus.Unregistered &&
            location?.pathname === "/register")
    ) {
        return children;
    }

    return null;
};

export default ProtectedRoute;
