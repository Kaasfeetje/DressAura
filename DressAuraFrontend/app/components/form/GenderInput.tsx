import { useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";

export enum Gender {
    None = "none",
    Male = "male",
    Female = "female",
}

type Props = {
    label: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: Gender;
    error?: string;
};

const GenderInput = ({
    label,
    value,
    onChange,
    required = false,
    error,
}: Props) => {
    const [touched, setTouched] = useState(false);

    const isInvalid = (required && touched && value === Gender.None) || !!error;

    return (
        <div className="flex w-full max-w-sm flex-col">
            <label className="font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative mt-1">
                <select
                    value={value}
                    onChange={onChange}
                    onBlur={() => setTouched(true)}
                    className={`w-full border px-3 py-2 ${isInvalid ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                >
                    <option value={Gender.None} disabled={required}>
                        Select a gender
                    </option>
                    <option value={Gender.Male}>Male</option>
                    <option value={Gender.Female}>Female</option>
                </select>
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

export default GenderInput;
