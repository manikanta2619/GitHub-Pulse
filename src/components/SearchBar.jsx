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
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="rounded-[32px] border border-slate-200/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-slate-700/80 dark:bg-slate-900/95 p-5 sm:p-6">
        <label htmlFor="search-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          GitHub username
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full group">
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur" />
            <div className="relative flex items-center rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm transition-colors duration-200 dark:border-slate-700 dark:bg-slate-950">
              <div className="text-slate-400 dark:text-slate-500 flex-shrink-0">
                <SearchIcon />
              </div>
              <input
                type="text"
                id="search-input"
                placeholder="e.g. facebook"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="w-full bg-transparent pl-3 pr-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                autoComplete="off"
                spellCheck="false"
              />
              {username && (
                <button
                  type="button"
                  onClick={() => setUsername("")}
                  className="ml-2 rounded-full p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
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
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
