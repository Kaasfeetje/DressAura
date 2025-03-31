import Select from "react-select";
import type { SizeType } from "~/controllers/productController";

const getOptions = (sizes: SizeType[]) =>
    sizes.map((size) => ({
        value: size.id,
        label: (
            <div>
                Size:
                <span> {size.name}</span>
            </div>
        ),
    }));

type Props = {
    sizes: SizeType[];
};
const SizeChoice = ({ sizes }: Props) => {
    return (
        <Select
            isSearchable={false}
            options={getOptions(sizes)}
            placeholder="Select a size..."
        />
    );
};

export default SizeChoice;
