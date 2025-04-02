import Navbar from "~/components/common/Navbar/Navbar";
import type { Route } from "./+types/dashboard";
import AdminRoute from "~/components/auth/AdminRoute";

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
            <DashboardPage />
        </AdminRoute>
    );
}

const DashboardPage = () => {
    return (
        <div className="mx-auto flex max-w-7xl px-2 pt-4 sm:px-6 lg:px-8"></div>
    );
};
