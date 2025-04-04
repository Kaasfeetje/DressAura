import { useState } from "react";
import TextInput from "./TextInput";
import { FaTrash } from "react-icons/fa6";

type Props = {
    sizes: string[]; // sizes will only be an array of strings
    setSizes: (sizes: string[]) => void;
};

const SizeInput = ({ sizes, setSizes }: Props) => {
    const [sizeName, setSizeName] = useState("");

    const handleAddSize = () => {
        if (sizeName.trim()) {
            setSizes([...sizes, sizeName.trim()]);
            setSizeName(""); // Clear the input field after adding
        }
    };

    const handleDeleteSize = (index: number) => {
        const updatedSizes = sizes.filter((_, i) => i !== index);
        setSizes(updatedSizes);
    };

    return (
        <div className="mb-4 flex flex-col">
            <label>Sizes</label>
            <div className="mb-2 flex gap-2">
                <TextInput
                    label="Size Name"
                    value={sizeName}
                    onChange={(e) => setSizeName(e.target.value)}
                />
                <button
                    type="button"
                    className="bg-blue-500 p-2 text-white"
                    onClick={handleAddSize}
                >
                    Add Size
                </button>
            </div>
            {sizes.length > 0 && (
                <div>
                    {sizes.map((size, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span>{size}</span>
                            <button
                                type="button"
                                className="bg-red-500 p-1 text-white"
                                onClick={() => handleDeleteSize(index)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SizeInput;
