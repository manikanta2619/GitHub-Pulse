import { useState, useEffect, useCallback } from 'react';
import { fetchUserDetails, fetchRepositories } from '../utils/api';

/**
 * Custom hook to fetch GitHub user profile + repositories.
 * @param {string} username – GitHub username to look up.
 * @returns {{ user, repositories, loading, error, refetch }}
 */
export default function useGitHub(username) {
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (name) => {
    if (!name) return;

    setLoading(true);
    setError(null);

    try {
      const [userData, reposData] = await Promise.all([
        fetchUserDetails(name),
        fetchRepositories(name),
      ]);

      setUser(userData);
      // Take top 5 repos by stars (per spec)
      setRepositories(reposData.slice(0, 5));
    } catch (err) {
      setError(err.message);
      setUser(null);
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(username);
  }, [username, fetchData]);

  const refetch = () => fetchData(username);

  return { user, repositories, loading, error, refetch };
}
