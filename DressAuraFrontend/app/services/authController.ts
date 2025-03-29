import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./reactQueryKeys";

export const useIsLoggedIn = () => {
    return useQuery({
        queryKey: [queryKeys.auth.isLoggedIn],
        queryFn: async (): Promise<boolean> => {
            const response = await fetch(
                `http://localhost:5158/api/auth/is-logged-in`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                return false;
            }
            return true;
        },
    });
};
