import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

const apiClient = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

// Add auth token if available
const token = import.meta.env.VITE_GITHUB_TOKEN;
if (token) {
  apiClient.defaults.headers.common['Authorization'] = `token ${token}`;
}

/**
 * Fetch a GitHub user's profile details.
 * @param {string} username
 * @returns {Promise<object>}
 */
export async function fetchUserDetails(username) {
  try {
    const response = await apiClient.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found. Please check the username and try again.');
    } else if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later or add a GitHub token.');
    } else {
      throw new Error('Failed to fetch user data. Please check your connection and try again.');
    }
  }
}

/**
 * Fetch a GitHub user's repositories, sorted by stars (descending).
 * @param {string} username
 * @param {number} perPage
 * @returns {Promise<Array>}
 */
export async function fetchRepositories(username, perPage = 30) {
  try {
    const response = await apiClient.get(`/users/${username}/repos`, {
      params: {
        sort: 'stars',
        direction: 'desc',
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found.');
    } else if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded.');
    } else {
      throw new Error('Failed to fetch repositories.');
    }
  }
}
