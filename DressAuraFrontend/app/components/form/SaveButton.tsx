type Props = {};

const SaveButton = (props: Props) => {
    return (
        <button
            type="submit"
            className={`mt-4 block w-full max-w-sm cursor-pointer rounded-lg bg-black px-4 py-2 font-semibold text-white shadow-md transition duration-200 hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none`}
        >
            Save
        </button>
    );
};

export default SaveButton;
