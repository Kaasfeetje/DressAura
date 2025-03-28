export type FetchResult<T> = {
    data: T | null;
    error: Error | null;
};

export const fetchData = async <T>(url: string): Promise<FetchResult<T>> => {
    try {
        const response = await fetch(`http://localhost:5158${url}`);

        // Check for non-2xx response statuses
        if (!response.ok) {
            throw new Error(
                `Failed to fetch from ${url}: ${response.statusText}`
            );
        }

        // Parse the response JSON
        const data: T = await response.json();

        return { data, error: null };
    } catch (error) {
        // Handle the error and return a consistent structure
        console.log(error);
        if (error instanceof Error) {
            return { data: null, error };
        } else {
            const unexpectedError = new Error("Unexpected error occurred");
            return { data: null, error: unexpectedError };
        }
    }
};
