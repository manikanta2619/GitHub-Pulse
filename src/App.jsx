import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import RepoCard from "./components/RepoCard";
import { fetchUser, fetchRepos } from "./services/githubApi";

// Inline SVG icons (no external dependency needed)
const GitHubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const StarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return JSON.parse(stored);
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSearch = async () => {
    if (!username.trim()) return;

    try {
      setLoading(true);
      setError("");
      setUser(null);
      setRepos([]);

      const userData = await fetchUser(username.trim());

      let repoData = await fetchRepos(username.trim());

      // Sort by stars descending, take top 5
      repoData = repoData
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);

      setUser(userData);
      setRepos(repoData);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("User not found. Please check the username and try again.");
      } else if (err.response?.status === 403) {
        setError("API rate limit exceeded. Please try again later.");
      } else {
        setError("Something went wrong. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
              <GitHubIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                GitHub Dashboard
              </h1>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium hidden sm:block">
                Explore users & repositories
              </p>
            </div>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
          </button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero text (shown when no results) */}
        {!user && !loading && !error && (
          <div className="text-center mb-8 animate-[fadeIn_0.5s_ease-out]">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Discover
              </span>{" "}
              GitHub Profiles
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto">
              Search any GitHub user to explore their profile, stats, and top repositories.
            </p>
          </div>
        )}

        {/* Search */}
        <SearchBar
          username={username}
          setUsername={setUsername}
          handleSearch={handleSearch}
        />

        {/* Loading spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <GitHubIcon className="w-6 h-6 text-indigo-500 animate-pulse" />
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-400 dark:text-gray-500">
              Fetching profile…
            </p>
          </div>
        )}

        {/* Error message */}
        {error && !loading && (
          <div className="max-w-lg mx-auto bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-xl p-5 text-center animate-[fadeIn_0.3s_ease-out]">
            <p className="text-red-600 dark:text-red-400 font-medium text-sm">
              {error}
            </p>
            <button
              onClick={handleSearch}
              className="mt-3 px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* User Profile */}
        {user && !loading && (
          <div className="animate-[slideUp_0.5s_ease-out]">
            <UserCard user={user} />
          </div>
        )}

        {/* Repositories */}
        {repos.length > 0 && !loading && (
          <div className="animate-[slideUp_0.5s_ease-out]">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <StarIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Top Repositories
                </h2>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Sorted by stars
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="py-6 text-center text-xs text-gray-400 dark:text-gray-600">
        <p>
          Built with <span className="text-red-400">♥</span> using React & Tailwind CSS
        </p>
      </footer>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;
