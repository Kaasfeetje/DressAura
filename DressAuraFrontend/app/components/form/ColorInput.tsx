import TextInput from "./TextInput";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import type { ColorRequestType } from "~/controllers/productController";

type Props = {
    colors: ColorRequestType[];
    setColors: (colors: ColorRequestType[]) => void;
};

const ColorInput = ({ colors, setColors }: Props) => {
    const [colorName, setColorName] = useState("");
    const [colorHex, setColorHex] = useState("");

    const handleAddColor = () => {
        if (colorName && colorHex) {
            setColors([...colors, { name: colorName, hexValue: colorHex }]);
            setColorName("");
            setColorHex("");
        }
    };

    const handleDeleteColor = (index: number) => {
        const updatedColors = colors.filter((_, i) => i !== index);
        setColors(updatedColors);
    };

    return (
        <div className="mb-4 flex flex-col">
            <label>Colors</label>
            <div className="mb-2 flex gap-2">
                <TextInput
                    label="Color Name"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                />
                <TextInput
                    label="Hex Value"
                    value={colorHex}
                    onChange={(e) => setColorHex(e.target.value)}
                />
                <button
                    type="button"
                    className="bg-blue-500 p-2 text-white"
                    onClick={handleAddColor}
                >
                    Add Color
                </button>
            </div>
            {colors.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                    <span>
                        {color.name} - {color.hexValue}
                    </span>
                    <button
                        type="button"
                        className="bg-red-500 p-1 text-white"
                        onClick={() => handleDeleteColor(index)}
                    >
                        <FaTrash />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ColorInput;
