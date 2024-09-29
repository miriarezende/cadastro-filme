import LoadingRing from "../loadingRing/page";

export default function Header({ title, addButtonLabel, onClickAddButton, populateButtonLabel, showButton, onClickPopulateButton, showLoading }) {
  return (
    <div className={`flex my-3 ${showButton ? "justify-between" : "justify-center"}`}>
      <p className="text-3xl font-bold text-indigo-950">{title}</p>
      {showButton && (
        <div>
          <button
            type="button"
            onClick={onClickAddButton}
            className="text-gray-300 bg-indigo-800 hover:bg-indigo-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          >
            {addButtonLabel}
          </button>
          {populateButtonLabel && (
            <button
              type="button"
              onClick={onClickPopulateButton}
              className="text-gray-300 ml-5 bg-indigo-700	hover:bg-indigo-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              {!showLoading ? populateButtonLabel : <LoadingRing />}
            </button>
          )}
        </div>

      )}
    </div>
  );
}
