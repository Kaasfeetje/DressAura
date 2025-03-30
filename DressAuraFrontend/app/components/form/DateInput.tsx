import { useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";

type Props = {
    label: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    error?: string;
};

const DateInput = ({
    label,
    value,
    onChange,
    required = false,
    error,
}: Props) => {
    const [touched, setTouched] = useState(false);

    const isInvalid = (required && touched && value.trim() === "") || !!error;

    return (
        <div className="flex w-full max-w-sm flex-col">
            <label className="font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative mt-1">
                <input
                    type="date"
                    value={value}
                    onChange={onChange}
                    onBlur={() => setTouched(true)}
                    className={`w-full border px-3 py-2 ${
                        isInvalid ? "border-red-500 pr-8" : "border-gray-300"
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
                    {error || `Enter a valid ${label.toLowerCase()}`}
                </p>
            )}
        </div>
    );
};

export default DateInput;
