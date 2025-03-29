import { useState, type ChangeEvent, type FormEvent } from "react";
import { z } from "zod";
import type { RegisterInput } from "~/services/authController";
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
        <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-xl ring-1 ring-gray-200">
            {showNotification && <Notification message="Registered" />}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Profile Form
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-4">
                    <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        First Name:
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`mt-1 p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
                            errors.firstName
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.firstName}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Last Name:
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`mt-1 p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
                            errors.lastName
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.lastName}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="profilePictureUrl"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Profile Picture URL:
                    </label>
                    <input
                        type="text"
                        id="profilePictureUrl"
                        name="profilePictureUrl"
                        value={formData.profilePictureUrl}
                        onChange={handleChange}
                        className={`mt-1 p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
                            errors.profilePictureUrl
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Enter image URL"
                    />
                    {errors.profilePictureUrl && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.profilePictureUrl}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <button
                        disabled={isLoading || showNotification}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 disabled:bg-blue-400"
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
