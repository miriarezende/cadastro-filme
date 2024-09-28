export default function Header({ title, addButtonLabel, onClickAddButton, populateButtonLabel, showButton, onClickPopulateButton }) {
  return (
    <div className="flex justify-between my-8">
      <p className="text-3xl font-bold">{title}</p>
      {showButton && (
        <div>
          <button
            type="button"
            onClick={onClickAddButton}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {addButtonLabel}
          </button>
          
          <button
            type="button"
            onClick={onClickPopulateButton}
            className="text-white ml-5 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {populateButtonLabel}
          </button>
        </div>

      )}
    </div>
  );
}
