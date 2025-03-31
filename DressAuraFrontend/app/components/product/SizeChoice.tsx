import Select from "react-select";

const getOptions = (sizes: string[]) =>
    sizes.map((size) => ({
        value: size,
        label: (
            <div>
                Size:
                <span> {size}</span>
            </div>
        ),
    }));

type Props = {
    sizes: string[];
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
