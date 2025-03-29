import ProtectedRoute from "~/components/auth/ProtectedRoute";
import type { Route } from "./+types/register";
import RegisterForm from "~/components/auth/RegisterForm";
import { registerUser, type RegisterInput } from "~/services/authController";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
    Notification,
    NotificationType,
} from "~/components/common/Notification";
import { queryKeys } from "~/services/reactQueryKeys";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Register | DressAura" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Register() {
    return (
        <ProtectedRoute>
            <RegisterPage />
        </ProtectedRoute>
    );
}

const RegisterPage = () => {
    const [showError, setShowError] = useState<string | undefined>(undefined);
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: registerUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.auth.isLoggedIn],
            });
            setTimeout(() => {
                navigate("/");
            }, 1000);
        },
        onError: (e) => {
            setShowError(e.message);
        },
    });

    const onRegister = (data: RegisterInput) => {
        mutate(data);
    };

    return (
        <div>
            <RegisterForm onSubmit={onRegister} isLoading={isPending} />
            {showError && (
                <Notification
                    type={NotificationType.Error}
                    message={showError}
                />
            )}
        </div>
    );
};
