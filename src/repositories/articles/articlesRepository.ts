import { UNIT_PER_PAGE } from "@/constants";
import apiClient from "../apiClient";
import { craeteArticleParam, getArticlesParam } from "./articlesRepository.param";

export const getArticles = async ({ page, limit = UNIT_PER_PAGE, isGlobal }: getArticlesParam) => {
  return await apiClient({
    method: "get",
    url: `/articles${isGlobal ? "" : "/feed"}?limit=${limit}&&offset=${(page - 1) * limit}`,
  });
};

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
