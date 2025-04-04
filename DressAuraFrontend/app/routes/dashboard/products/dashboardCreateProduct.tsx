import TextInput from "~/components/form/TextInput";
import PriceInput from "~/components/form/PriceInput";
import ColorInput from "~/components/form/ColorInput";
import SizeInput from "~/components/form/SizeInput";
import ImageInput from "~/components/form/ImageInput";
import { z } from "zod";
import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "~/controllers/productController";
import {
    Notification,
    NotificationType,
} from "~/components/common/Notification";

const ColorRequestSchema = z.object({
    name: z.string().min(1, "Color name is required"),
    hexValue: z
        .string()
        .regex(
            /^#[0-9A-Fa-f]{6}$/,
            `Invalid hex value. Please provide a valid hex color code (e.g., #FFFFFF).`,
        ),
});

const ProductRequestSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    price: z.number().min(0, "Price must be a positive number"),
    stockQuantity: z.number().optional(),
    brand: z.string().optional(),
    category: z.string().optional(),
    thumbnailImage: z.string().url("Invalid URL for thumbnail image"),
    images: z
        .array(z.string().url("Invalid URL in images array"))
        .min(1, "Must have at least one image"),
    colors: z.array(ColorRequestSchema).min(1, "Must have at least one color"),
    sizes: z
        .array(z.string().min(1, "Size must be a non-empty string"))
        .min(1, "Must have at least one size"),
});

export default function DashboardCreateProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [colors, setColors] = useState<{ name: string; hexValue: string }[]>(
        [],
    );
    const [sizes, setSizes] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);

    const [errors, setErrors] = useState<any>({});
    const [showError, setShowError] = useState("");

    const { mutate } = useMutation({
        mutationFn: createProduct,
        onSuccess: async () => {},
        onError: (e) => {
            setShowError(e.message);
        },
    });

    const resetValues = () => {
        setName("");
        setDescription("");
        setPrice("");
        setBrand("");
        setCategory("");
        setThumbnailImage("");
        setStockQuantity("");
        setColors([]);
        setSizes([]);
        setImages([]);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            name,
            description,
            price: parseFloat(price),
            brand,
            category,
            thumbnailImage,
            stockQuantity: stockQuantity ? parseInt(stockQuantity) : undefined,
            colors,
            sizes,
            images,
        };

        try {
            ProductRequestSchema.parse(formData);
            setErrors({});

            mutate(formData);
            resetValues();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: any = {};
                error.errors.forEach((err) => {
                    newErrors[err.path[0]] = err.message;
                });
                setErrors(newErrors);
            } else {
                console.error("Unexpected error:", error);
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
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
            >
                <h1>Create Product</h1>

                <TextInput
                    label="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                />

                <PriceInput
                    label="Price"
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    error={errors.price}
                />

                <TextInput
                    label="Thumbnail image (url)"
                    value={thumbnailImage}
                    required
                    onChange={(e) => setThumbnailImage(e.target.value)}
                    error={errors.thumbnailImage}
                />

                <TextInput
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={errors.description}
                />

                <TextInput
                    label="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    error={errors.brand}
                />

                <TextInput
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    error={errors.category}
                />

                <TextInput
                    label="Stock Quantity"
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    error={errors.stockQuantity}
                />

                <ColorInput colors={colors} setColors={setColors} />
                {errors.colors && (
                    <span className="text-red-500">{errors.colors}</span>
                )}

                <SizeInput sizes={sizes} setSizes={setSizes} />
                {errors.sizes && (
                    <span className="text-red-500">{errors.sizes}</span>
                )}

                <ImageInput images={images} setImages={setImages} />
                {errors.images && (
                    <span className="text-red-500">{errors.images}</span>
                )}

                <button type="submit" className="mt-4">
                    Add Product
                </button>
            </form>
        </>
    );
}
