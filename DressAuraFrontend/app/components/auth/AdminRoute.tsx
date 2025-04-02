import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { useIsAdmin, UserStatus } from "~/controllers/authController";

type Props = {
    children: ReactNode;
};

const AdminRoute = ({ children }: Props) => {
    const { data: isAuthenticated } = useIsAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === UserStatus.Unregistered) {
            navigate("/register");
        }

        if (isAuthenticated === UserStatus.Unauthorized) {
            navigate(-1);
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

export default AdminRoute;
