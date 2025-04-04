import Navbar from "~/components/common/Navbar/Navbar";
import type { Route } from "./+types/dashboard";
import AdminRoute from "~/components/auth/AdminRoute";
import { Link, Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Dashboard | DressAura" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Dashboard() {
    return (
        <AdminRoute>
            <Navbar />
            <main className="mx-auto max-w-7xl px-2 pt-4 sm:px-6 lg:px-8">
                <header>
                    <Link to="/dashboard/products/create">Add product</Link>
                </header>
                <Outlet />
            </main>
        </AdminRoute>
    );
}
