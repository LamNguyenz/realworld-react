import apiClient from "../apiClient"

export const getTags = () => {
  return apiClient({
    method: "get",
    url: `/tags`,
  });
};
