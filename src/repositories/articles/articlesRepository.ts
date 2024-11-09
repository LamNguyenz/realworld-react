import apiClient from "../apiClient";
import { craeteArticleParam } from "./articlesRepository.param";

export const createArticle = async ({ title, description, body, tagList }: craeteArticleParam) => {
  return await apiClient({
    method: "post",
    url: `/articles`,
    data: {
      article: {
        title,
        description,
        body,
        tagList,
      },
    },
  });
};
