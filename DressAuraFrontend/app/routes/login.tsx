import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Login | DressAura" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Login() {
    const handleLogin = () => {
        document.location.href = "http://localhost:5158/api/auth/login";
    };

    return (
        <div className="">
            <button onClick={handleLogin}>Login with google</button>
        </div>
    );
}
