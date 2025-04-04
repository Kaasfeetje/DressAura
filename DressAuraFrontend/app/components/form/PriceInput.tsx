import { useState, type ChangeEvent } from "react";
import { FaCircleExclamation } from "react-icons/fa6";

type Props = {
    label: string;
    placeholder?: string;
    required?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    error?: string;
};

const PriceInput = ({
    label,
    placeholder,
    value,
    onChange,
    required = false,
    error,
}: Props) => {
    const [touched, setTouched] = useState(false);

    const isInvalid = required && touched && value.trim() === "";
    const hasError = error || isInvalid;

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;

        if (/[^0-9.]/.test(newValue)) {
            newValue = newValue.replace(/[^0-9.]/g, "");
        }

        if (newValue.split(".").length > 1) {
            newValue = newValue.slice(0, newValue.lastIndexOf(".") + 3);
        }

        onChange({
            ...e,
            target: { ...e.target, value: newValue },
        });
    };

    return (
        <div className="flex w-full max-w-sm flex-col">
            <label className="font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative mt-1">
                <input
                    type="text"
                    placeholder={placeholder || ""}
                    value={value}
                    onChange={handlePriceChange}
                    onBlur={() => setTouched(true)}
                    className={`w-full border px-3 py-2 ${
                        hasError ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                {hasError && (
                    <FaCircleExclamation
                        className="absolute top-1/2 right-3 -translate-y-1/2 transform text-red-500"
                        size={18}
                    />
                )}
            </div>
            {hasError && (
                <p className="mt-1 text-sm text-red-500">
                    {error || "This field is required."}
                </p>
            )}
        </div>
    );
};

export default PriceInput;
