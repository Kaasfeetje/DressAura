import Select from "react-select";
import type { ProductColor } from "~/controllers/productController";

const getOptions = (colors: ProductColor[]) =>
    colors.map((color) => ({
        value: color.id,
        label: (
            <div className="flex items-center gap-2">
                <div
                    style={{ backgroundColor: color.hexColor }}
                    className="h-5 w-5 rounded-full"
                ></div>
                {color.name}
            </div>
        ),
        name: color.name,
    }));

type Props = {
    colors: ProductColor[];
};
const ColorChoice = ({ colors }: Props) => {
    return (
        <Select
            filterOption={(option, searchText) =>
                option.data.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            }
            options={getOptions(colors)}
            placeholder="Select a color..."
        />
    );
};

export default ColorChoice;
