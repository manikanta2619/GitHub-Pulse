import axios from "axios";

const BASE_URL = "https://api.github.com/users";

export const fetchUser = async (username) => {
  const response = await axios.get(`${BASE_URL}/${username}`);
  return response.data;
};

export const fetchRepos = async (username) => {
  const response = await axios.get(`${BASE_URL}/${username}/repos`);
  return response.data;
};
