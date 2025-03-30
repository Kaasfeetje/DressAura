import ProtectedRoute from "~/components/auth/ProtectedRoute";
import Navbar from "~/components/common/Navbar/Navbar";
import { Outlet } from "react-router";
import type { Route } from "./+types/accountLayout";
import AccountNavbar from "~/components/account/AccountNavbar";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Account | DressAura" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Account() {
    return (
        <ProtectedRoute>
            <Navbar />
            <AccountPage />
        </ProtectedRoute>
    );
}

const AccountPage = () => {
    return (
        // <div className="flex pt-4">
        <div className="mx-auto flex max-w-7xl px-2 pt-4 sm:px-6 lg:px-8">
            <AccountNavbar />

            <main className="w-full">
                <Outlet />
            </main>
        </div>
    );
};
