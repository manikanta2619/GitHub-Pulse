// Language color mapping
const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", Java: "#b07219",
  "C++": "#f34b7d", C: "#555555", "C#": "#178600", Go: "#00ADD8", Rust: "#dea584",
  Ruby: "#701516", PHP: "#4F5D95", Swift: "#F05138", Kotlin: "#A97BFF", Dart: "#00B4AB",
  Shell: "#89e051", HTML: "#e34c26", CSS: "#563d7c", Vue: "#41b883", Lua: "#000080",
};

const StarIcon = () => (
  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ForkIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const RepoCard = ({ repo }) => {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 group"
    >
      {/* Repo name + arrow */}
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors truncate">
          {repo.name}
        </h2>
        <span className="flex-shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-indigo-500 transition-colors mt-1">
          <ArrowIcon />
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm line-clamp-2 leading-relaxed">
        {repo.description || "No description"}
      </p>

      {/* Footer: stars, forks, language */}
      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <StarIcon />
          <span className="font-medium">{repo.stargazers_count.toLocaleString()}</span>
        </span>

        <span className="flex items-center gap-1">
          <ForkIcon />
          <span>{repo.forks_count.toLocaleString()}</span>
        </span>

        {repo.language && (
          <span className="flex items-center gap-1.5 ml-auto">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: LANG_COLORS[repo.language] || "#6366f1" }}
            />
            <span className="text-xs font-medium">{repo.language}</span>
          </span>
        )}
      </div>
    </a>
  );
};

export default RepoCard;
