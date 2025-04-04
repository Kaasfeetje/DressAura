import { Link } from "react-router";
import { useIsAdmin, UserStatus } from "~/controllers/authController";

type Props = {
    isMobile?: boolean;
};

const AccountNavbar = ({ isMobile }: Props) => {
    const { data } = useIsAdmin();
    return (
        <aside
            className={`${isMobile ? "block h-fit md:hidden" : "hidden h-full pt-16 md:flex"} w-64 flex-col space-y-4 p-4 pl-0 text-gray-800`}
        >
            <div className="group p-2 pl-0">
                <Link
                    to="/account"
                    className="text-2xl transition duration-200 hover:underline"
                >
                    Account
                </Link>
            </div>
            <div className="group p-2 pl-0">
                <Link
                    to="/account/orders"
                    className="text-2xl transition duration-200 hover:underline"
                >
                    Orders
                </Link>
            </div>
            {data == UserStatus.LoggedIn && (
                <div className="group p-2 pl-0">
                    <Link
                        to="/dashboard"
                        className="text-2xl transition duration-200 hover:underline"
                    >
                        Admin dashboard
                    </Link>
                </div>
            )}
            <div className="group p-2 pl-0">
                <Link
                    to="/logout"
                    className="text-lg underline transition duration-200 hover:text-gray-500"
                >
                    Logout
                </Link>
            </div>
        </aside>
    );
};

export default AccountNavbar;
