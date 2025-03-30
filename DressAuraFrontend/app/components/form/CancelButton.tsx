type Props = {
    onClick: () => void;
};

const CancelButton = ({ onClick }: Props) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`mt-4 block w-full max-w-sm cursor-pointer rounded-lg bg-gray-300 px-4 py-2 font-semibold text-black shadow-md transition duration-200 hover:bg-gray-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none`}
        >
            Cancel
        </button>
    );
};

export default CancelButton;
