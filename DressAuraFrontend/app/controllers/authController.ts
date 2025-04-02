import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./reactQueryKeys";
import { makeApiRequest } from "./api";
import type { Gender } from "~/components/form/GenderInput";

export type UserType = {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    profilePictureUrl?: string;
    birthday?: string;
    phoneNumber?: string;
    gender?: Gender;
    isRegistered: boolean;
};

export enum UserStatus {
    LoggedIn = "LoggedIn",
    Unregistered = "Unregistered",
    Unauthorized = "Unauthorized",
}

export const useIsLoggedIn = () => {
    return useQuery({
        queryKey: [queryKeys.auth.isLoggedIn],
        queryFn: async (): Promise<UserStatus> => {
            const response = await fetch(
                `http://localhost:5158/api/auth/is-logged-in`,
                {
                    method: "GET",
                    credentials: "include",
                },
            );

            if (!response.ok) {
                return UserStatus.Unauthorized;
            }

            const data = (await response.json()) as UserType;
            if (data.isRegistered === false) {
                return UserStatus.Unregistered;
            }

            return UserStatus.LoggedIn;
        },
    });
};

export const useIsAdmin = () => {
    return useQuery({
        queryKey: [queryKeys.auth.isAdmin],
        queryFn: async (): Promise<UserStatus> => {
            const response = await fetch(
                `http://localhost:5158/api/auth/is-admin`,
                {
                    method: "GET",
                    credentials: "include",
                },
            );

            if (!response.ok) {
                return UserStatus.Unauthorized;
            }

            const data = (await response.json()) as UserType;
            if (data.isRegistered === false) {
                return UserStatus.Unregistered;
            }

            return UserStatus.LoggedIn;
        },
    });
};

export type RegisterInput = {
    firstName: string;
    lastName: string;
    profilePictureUrl: string | undefined;
};

export const registerUser = async (data: RegisterInput) => {
    return await makeApiRequest<UserType>("/api/auth/register", {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

export type UpdatePersonalDetailsInput = {
    firstName: string;
    lastName: string;
    birthday: string;
    phoneNumber?: string;
    gender?: Gender;
    profilePictureUrl?: string;
};

export const updatePersonalDetails = async (
    data: UpdatePersonalDetailsInput,
) => {
    return await makeApiRequest<UserType>("/api/auth/personal-details", {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

export const useAccount = () => {
    return useQuery({
        queryKey: [queryKeys.auth.account],
        queryFn: async () => {
            return await makeApiRequest<UserType>("/api/auth/account");
        },
    });
};
