import TextInput from "~/components/form/TextInput";
import type { Route } from "./+types/personalDetails";
import { useEffect, useState, type FormEvent } from "react";
import DateInput from "~/components/form/DateInput";
import PhoneInput from "~/components/form/PhoneInput";
import GenderInput, { Gender } from "~/components/form/GenderInput";
import SaveButton from "~/components/form/SaveButton";
import CancelButton from "~/components/form/CancelButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    updatePersonalDetails,
    useAccount,
    type UpdatePersonalDetailsInput,
} from "~/controllers/authController";
import { z } from "zod";
import { phoneRegex } from "~/utils/Validation";
import { queryKeys } from "~/controllers/reactQueryKeys";
import {
    Notification,
    NotificationType,
} from "~/components/common/Notification";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Account | DressAura" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export const UpdatePersonalDetailsInputSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    birthday: z.string().min(1, "Birthday is required"), // You can further validate the birthday if needed (e.g., regex for date format)
    phoneNumber: z
        .string()
        .regex(phoneRegex, "Invalid phone number format")
        .optional(),
    gender: z.enum([Gender.Male, Gender.Female, Gender.None]).optional(),
    profilePictureUrl: z.string().url().optional(),
});

export default function Account() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState<Gender>(Gender.None);

    const [errors, setErrors] = useState<any>({});
    const [showError, setShowError] = useState("");

    const queryClient = useQueryClient();
    const { data: userData } = useAccount();
    const { mutate } = useMutation({
        mutationFn: updatePersonalDetails,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.auth.isLoggedIn, queryKeys.auth.account],
            });
        },
        onError: (e) => {
            setShowError(e.message);
        },
    });

    useEffect(() => {
        if (userData) {
            setFirstName(userData.firstName ?? "");
            setLastName(userData.lastName ?? "");
            setBirthday(userData.birthday ?? "");
            setPhoneNumber(userData.phoneNumber ?? "");
            setGender(userData.gender ?? Gender.None);
        }
    }, [userData]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updateDetails: UpdatePersonalDetailsInput = {
            firstName,
            lastName,
            birthday,
            phoneNumber: phoneNumber === "" ? undefined : phoneNumber,
            gender,
        };
        try {
            UpdatePersonalDetailsInputSchema.parse(updateDetails);
            setErrors({});

            mutate(updateDetails);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: any = {};
                error.errors.forEach((err) => {
                    newErrors[err.path[0]] = err.message;
                });
                setErrors(newErrors);
            }
        }
    };

    return (
        <>
            {showError && (
                <Notification
                    type={NotificationType.Error}
                    message={showError}
                />
            )}
            <h1 className="mb-8 max-w-sm text-4xl font-bold">
                Personal details
            </h1>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <TextInput
                    label="First name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={errors.firstName}
                />
                <TextInput
                    label="Last name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={errors.lastName}
                />
                <DateInput
                    label="Birthday"
                    required
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    error={errors.birthday}
                />
                <PhoneInput
                    label="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    error={errors.phoneNumber}
                />
                <GenderInput
                    label="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    error={errors.gender}
                />
                <div>
                    <SaveButton />
                    <CancelButton onClick={() => navigate(-1)} />
                </div>
            </form>
        </>
    );
}
