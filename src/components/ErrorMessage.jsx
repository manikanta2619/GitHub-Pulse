export default function ErrorMessage({ message, onRetry }) {
  return (
    <div id="error-message" className="max-w-2xl mx-auto animate-slide-down">
      <div className="glass rounded-2xl border border-red-200/50 dark:border-red-900/30 p-5 flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/20">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">Something went wrong</h3>
          <p className="mt-1 text-sm text-surface-700 dark:text-surface-300">{message}</p>
        </div>
        {onRetry && (
          <button onClick={onRetry} className="px-4 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
