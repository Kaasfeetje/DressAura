import { Link } from "react-router";
import type { Route } from "./+types/account";
import { useAccount } from "~/controllers/authController";
import { Gender } from "~/components/form/GenderInput";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Account | DressAura" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Account() {
    const { data: userData } = useAccount();

    const title =
        userData?.gender === Gender.Male
            ? "Mr."
            : userData?.gender === Gender.Female
              ? "Mrs."
              : "";

    return (
        <div className="container mx-auto p-6">
            <h1 className="mb-8 text-4xl font-bold">
                Welcome {userData?.firstName}
            </h1>

            <div className="space-y-6">
                {/* Account Info Section */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold">
                        Personal Details
                    </h2>
                    <div className="space-y-2">
                        <div>
                            <strong>Email:</strong>{" "}
                            <span>
                                {userData?.email || "email@example.com"}
                            </span>
                        </div>
                        <div>
                            <strong>Name:</strong>{" "}
                            <span>
                                {title} {userData?.lastName || "Doe"}
                            </span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link
                            to="/account/personal-details"
                            className="text-blue-600 hover:underline"
                        >
                            Change personal details
                        </Link>
                    </div>
                </div>

                {/* Shipping Address Section */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold">
                        Shipping Address
                    </h2>
                    <div>
                        <div>
                            <strong>City:</strong> <span>{"City"}</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link
                            to="/account/shipping"
                            className="text-blue-600 hover:underline"
                        >
                            Change shipping address
                        </Link>
                    </div>
                </div>

                {/* Logout Link */}
                <div className="mt-6">
                    <Link to="/logout" className="text-red-600 hover:underline">
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
}
