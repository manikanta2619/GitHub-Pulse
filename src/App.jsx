import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import RepoCard from "./components/RepoCard";
import { fetchUser, fetchRepos } from "./services/githubApi";

// Inline SVG icons (no external dependency needed)
const StarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const GitHubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
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
    if (!username.trim()) {
      setError("Enter a GitHub username.");
      setUser(null);
      setRepos([]);
      return;
    }

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
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        onReset={() => {
          setUsername("");
          setUser(null);
          setRepos([]);
          setError("");
          setLoading(false);
          try {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } catch {}
          const input = document.getElementById("search-input");
          if (input) input.focus();
        }}
      />

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
          setUsername={(value) => {
            setUsername(value);
            if (error) setError("");
          }}
          handleSearch={handleSearch}
        />

        {/* Loading spinner as a full-width card */}
        {loading && (
          <div className="mb-8">
            <div className="glass rounded-2xl p-8 flex items-center justify-center min-h-[140px]">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700" />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GitHubIcon className="w-6 h-6 text-indigo-500 animate-pulse" />
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Fetching from GitHub...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && !loading && (
          <div className="max-w-4xl mx-auto mt-4 rounded-[28px] border border-rose-200/90 bg-rose-50/90 px-5 py-4 text-left shadow-sm dark:border-rose-800/80 dark:bg-rose-950/20 animate-[fadeIn_0.3s_ease-out]">
            <p className="text-sm font-medium text-rose-700 dark:text-rose-200">
              {error}
            </p>
          </div>
        )}

        {/* User Profile */}
        {user && !loading && (
          <div className="animate-[slideUp_0.5s_ease-out]">
            <UserCard user={user} />
          </div>
        )}

        {/* Repositories wrapped in a single card container */}
        {repos.length > 0 && !loading && (
          <div className="animate-[slideUp_0.5s_ease-out]">
            <div className="glass rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <StarIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Top Repositories</h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Showing up to five highest-starred public repos.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
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
