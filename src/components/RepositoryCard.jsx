// Language color mapping
const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219',
  'C++': '#f34b7d', C: '#555555', 'C#': '#178600', Go: '#00ADD8', Rust: '#dea584',
  Ruby: '#701516', PHP: '#4F5D95', Swift: '#F05138', Kotlin: '#A97BFF', Dart: '#00B4AB',
  Shell: '#89e051', HTML: '#e34c26', CSS: '#563d7c', Vue: '#41b883', Lua: '#000080',
  Scala: '#c22d40', Haskell: '#5e5086', R: '#198CE7', Jupyter: '#DA5B0B', Vim: '#199f4b',
};

export default function RepositoryCard({ repo, index }) {
  const langColor = LANG_COLORS[repo.language] || '#6366f1';

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block glass rounded-2xl p-5 card-hover group animate-slide-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <svg className="w-4 h-4 flex-shrink-0 text-surface-300 dark:text-surface-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white truncate group-hover:text-brand-500 transition-colors">
            {repo.name}
          </h3>
        </div>
        {/* Arrow */}
        <svg className="w-4 h-4 flex-shrink-0 text-surface-200 dark:text-surface-800 group-hover:text-brand-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      {/* Description */}
      {repo.description && (
        <p className="mt-2 text-xs text-surface-700 dark:text-surface-300 line-clamp-2 leading-relaxed">
          {repo.description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center gap-4 text-xs text-surface-300 dark:text-surface-700">
        {/* Language */}
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColor }} />
            {repo.language}
          </span>
        )}
        {/* Stars */}
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {repo.stargazers_count.toLocaleString()}
        </span>
        {/* Forks */}
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {repo.forks_count.toLocaleString()}
        </span>
      </div>
    </a>
  );
}
