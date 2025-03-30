import { useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { z } from "zod";
import { phoneRegex } from "~/utils/Validation";

const phoneNumberSchema = z
    .string()
    .regex(phoneRegex, "Invalid phone number format");

type Props = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    error?: string;
};

const PhoneInput = ({
    label,
    value,
    onChange,
    required = false,
    error,
}: Props) => {
    const [touched, setTouched] = useState(false);

    const isInvalid =
        (required && touched && value.trim() === "") ||
        (value && !phoneNumberSchema.safeParse(value).success) ||
        !!error;

    return (
        <div className="flex w-full max-w-sm flex-col">
            <label className="font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative mt-1">
                <input
                    type="tel"
                    value={value}
                    onChange={onChange}
                    onBlur={() => setTouched(true)}
                    placeholder="06-1234678"
                    className={`w-full border px-3 py-2 ${
                        isInvalid ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {isInvalid && (
                    <FaCircleExclamation
                        className="absolute top-1/2 right-3 -translate-y-1/2 transform text-red-500"
                        size={18}
                    />
                )}
            </div>
            {isInvalid && (
                <p className="mt-1 text-sm text-red-500">
                    {error ||
                        (value.trim() === ""
                            ? `Enter a ${label.toLowerCase()}`
                            : "Invalid phone number format")}
                </p>
            )}
        </div>
    );
};

export default PhoneInput;
