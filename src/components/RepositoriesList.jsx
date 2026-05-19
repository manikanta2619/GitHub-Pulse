import RepositoryCard from './RepositoryCard';

/**
 * Repositories section — heading + grid of cards.
 */
export default function RepositoriesList({ repositories }) {
  if (!repositories || repositories.length === 0) return null;

  return (
    <div id="repositories-list" className="animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white">Top Repositories</h2>
          <p className="text-xs text-surface-300 dark:text-surface-700">Sorted by stars</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repositories.map((repo, i) => (
          <RepositoryCard key={repo.id} repo={repo} index={i} />
        ))}
      </div>
    </div>
  );
}
