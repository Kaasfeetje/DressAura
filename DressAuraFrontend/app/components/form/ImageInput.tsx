import { useState } from "react";
import TextInput from "./TextInput";
import { FaTrash } from "react-icons/fa6";

type Props = {
    images: string[]; // imageUrls will only be an array of strings
    setImages: (imageUrls: string[]) => void;
};

const ImageInput = ({ images, setImages }: Props) => {
    const [imageUrl, setImageUrl] = useState("");

    const handleAddImageUrl = () => {
        if (imageUrl.trim()) {
            setImages([...images, imageUrl.trim()]);
            setImageUrl(""); // Clear the input field after adding
        }
    };

    const handleDeleteImageUrl = (index: number) => {
        const updatedImageUrls = images.filter((_, i) => i !== index);
        setImages(updatedImageUrls);
    };

    return (
        <div className="mb-4 flex flex-col">
            <label>Images</label>
            <div className="mb-2 flex gap-2">
                <TextInput
                    label="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="bg-blue-500 p-2 text-white"
                >
                    Add Image
                </button>
            </div>
            {images.length > 0 && (
                <div>
                    {images.map((url, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <img
                                src={url}
                                alt={`image-${url}`}
                                className="h-20 w-20 object-cover"
                            />
                            <button
                                type="button"
                                className="bg-red-500 p-1 text-white"
                                onClick={() => handleDeleteImageUrl(index)}
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

export default ImageInput;
