/**
 * User profile card — avatar, name, bio, location, stats, and profile link.
 */
export default function UserProfile({ user }) {
  if (!user) return null;

  const stats = [
    { label: 'Repositories', value: user.public_repos, icon: '📦' },
    { label: 'Followers', value: user.followers, icon: '👥' },
    { label: 'Following', value: user.following, icon: '➡️' },
    { label: 'Gists', value: user.public_gists, icon: '📝' },
  ];

  const formatNumber = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return n;
  };

  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  return (
    <div id="user-profile" className="animate-slide-up">
      <div className="glass-strong rounded-3xl overflow-hidden card-hover">
        {/* Banner */}
        <div className="h-32 sm:h-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-purple-500 to-brand-700" />
          <div className="absolute inset-0 dot-pattern opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 dark:from-surface-900/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative px-6 sm:px-8 pb-8 -mt-16">
          {/* Avatar */}
          <div className="relative inline-block">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-white dark:ring-surface-900 shadow-xl">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {user.hireable && (
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                HIREABLE
              </span>
            )}
          </div>

          {/* Info */}
          <div className="mt-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">
                  {user.name || user.login}
                </h2>
                <p className="text-brand-500 font-mono text-sm font-medium">@{user.login}</p>
              </div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm inline-flex items-center gap-2 self-start"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View Profile
              </a>
            </div>

            {user.bio && (
              <p className="mt-3 text-surface-700 dark:text-surface-300 text-sm leading-relaxed max-w-xl">
                {user.bio}
              </p>
            )}

            {/* Meta */}
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-surface-300 dark:text-surface-700">
              {user.location && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {user.location}
                </span>
              )}
              {user.company && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  {user.company}
                </span>
              )}
              {user.blog && (
                <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-brand-500 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  Website
                </a>
              )}
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Joined {joinDate}
              </span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-surface-50/80 dark:bg-surface-800/50 p-4 text-center transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                <span className="text-lg">{stat.icon}</span>
                <p className="mt-1 text-2xl font-bold text-surface-900 dark:text-white">
                  {formatNumber(stat.value)}
                </p>
                <p className="text-[11px] font-medium text-surface-300 dark:text-surface-700 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
