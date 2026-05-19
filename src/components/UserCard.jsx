const MapPinIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const UsersIcon = ({ className }) => (
  <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const GitBranchIcon = ({ className }) => (
  <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const UserCard = ({ user }) => {
  const formatCount = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return n;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl dark:shadow-2xl dark:shadow-indigo-500/5 rounded-2xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
      {/* Gradient banner */}
      <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="px-6 pb-8 -mt-16 relative">
        {/* Avatar */}
        <div className="relative inline-block">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-28 h-28 rounded-2xl border-4 border-white dark:border-gray-800 shadow-lg object-cover"
          />
          {user.hireable && (
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
              HIREABLE
            </span>
          )}
        </div>

        {/* Name & Username */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {user.name || user.login}
            </h2>
            <p className="text-indigo-500 font-medium text-sm">@{user.login}</p>
          </div>

          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200 text-sm self-start"
          >
            <ExternalLinkIcon />
            Visit GitHub
          </a>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-xl">
            {user.bio}
          </p>
        )}

        {/* Location */}
        {user.location && (
          <p className="mt-3 flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
            <MapPinIcon />
            {user.location}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center transition-transform duration-200 hover:scale-105">
            <UsersIcon className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCount(user.followers)}
            </h3>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Followers
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center transition-transform duration-200 hover:scale-105">
            <UsersIcon className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCount(user.following)}
            </h3>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Following
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center transition-transform duration-200 hover:scale-105">
            <GitBranchIcon className="w-5 h-5 text-pink-500 mx-auto mb-1" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCount(user.public_repos)}
            </h3>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Repos
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center transition-transform duration-200 hover:scale-105">
            <div className="text-indigo-500 text-lg font-semibold mx-auto mb-1">@</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.login}
            </h3>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Username
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
