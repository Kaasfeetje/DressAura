import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Dashboard | DressAura" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Dashboard() {
    return <div className="">teswadsf</div>;
}
