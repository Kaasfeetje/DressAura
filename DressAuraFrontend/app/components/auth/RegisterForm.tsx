import { useState, type ChangeEvent, type FormEvent } from "react";
import { z } from "zod";
import type { RegisterInput } from "~/controllers/authController";
import { Notification } from "../common/Notification";

const formSchema = z.object({
    firstName: z
        .string()
        .min(1, "First name is required")
        .max(50, "First name must be less than 50 characters"),
    lastName: z
        .string()
        .min(1, "Last name is required")
        .max(50, "Last name must be less than 50 characters"),
    profilePictureUrl: z
        .string()
        .refine((val) => val === "" || /^https?:\/\/[^\s]+$/.test(val), {
            message: "Invalid URL format",
        })
        .optional(),
});

type Props = {
    onSubmit: (data: RegisterInput) => void;
    isLoading: boolean;
};

const RegisterForm = ({ onSubmit, isLoading }: Props) => {
    const [showNotification, setShowNotification] = useState(false);

    const [formData, setFormData] = useState<RegisterInput>({
        firstName: "",
        lastName: "",
        profilePictureUrl: "",
    });

    const [errors, setErrors] = useState<RegisterInput>({
        firstName: "",
        lastName: "",
        profilePictureUrl: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = formSchema.safeParse(formData);

        if (!result.success) {
            const newErrors: RegisterInput = {
                firstName: "",
                lastName: "",
                profilePictureUrl: "",
            };

            result.error.errors.forEach((err) => {
                newErrors[err.path[0] as keyof RegisterInput] = err.message;
            });

            setErrors(newErrors);
        } else {
            if (formData.profilePictureUrl == "") {
                formData.profilePictureUrl = undefined;
            }
            onSubmit(formData);
            setShowNotification(true);
            setFormData({
                firstName: "",
                lastName: "",
                profilePictureUrl: "",
            });
            setErrors({
                firstName: "",
                lastName: "",
                profilePictureUrl: "",
            });
        }
    };

    return (
        <div className="mx-auto max-w-lg rounded-xl bg-white p-8 shadow-xl ring-1 ring-gray-200">
            {showNotification && <Notification message="Registered" />}
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
                Profile Form
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-4">
                    <label
                        htmlFor="firstName"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        First Name:
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`mt-1 w-full rounded-md border p-3 transition-all duration-300 focus:ring-2 focus:ring-blue-400 ${
                            errors.firstName
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.firstName}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="lastName"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Last Name:
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`mt-1 w-full rounded-md border p-3 transition-all duration-300 focus:ring-2 focus:ring-blue-400 ${
                            errors.lastName
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.lastName}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="profilePictureUrl"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Profile Picture URL:
                    </label>
                    <input
                        type="text"
                        id="profilePictureUrl"
                        name="profilePictureUrl"
                        value={formData.profilePictureUrl}
                        onChange={handleChange}
                        className={`mt-1 w-full rounded-md border p-3 transition-all duration-300 focus:ring-2 focus:ring-blue-400 ${
                            errors.profilePictureUrl
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Enter image URL"
                    />
                    {errors.profilePictureUrl && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.profilePictureUrl}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <button
                        disabled={isLoading || showNotification}
                        type="submit"
                        className="w-full rounded-md bg-blue-600 py-3 text-white transition duration-300 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:bg-blue-400"
                    >
                        {isLoading || showNotification
                            ? "Loading... "
                            : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
