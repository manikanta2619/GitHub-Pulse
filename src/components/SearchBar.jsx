const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SearchBar = ({ username, setUsername, handleSearch }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
      <div className="relative w-full sm:w-80 group">
        {/* Glow effect on focus */}
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-focus-within:opacity-75 blur transition-opacity duration-500" />

        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
          <div className="ml-4 text-gray-400 flex-shrink-0">
            <SearchIcon />
          </div>

          <input
            type="text"
            placeholder="Search GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="flex-1 py-3.5 px-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-sm font-medium"
            autoComplete="off"
            spellCheck="false"
          />

          {username && (
            <button
              type="button"
              onClick={() => setUsername("")}
              className="p-2 mr-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Clear search"
            >
              <XIcon />
            </button>
          )}
        </div>
      </div>

      <button
        onClick={handleSearch}
        disabled={!username.trim()}
        className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none text-sm"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
