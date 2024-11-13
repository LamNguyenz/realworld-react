import { UNIT_PER_PAGE } from "@/constants";
import apiClient from "../apiClient";
import {
  craeteArticleParam,
  deleteArticleParam,
  getArticleParam,
  getArticlesParam,
} from "./articlesRepository.param";

export const getArticles = async ({
  page,
  limit = UNIT_PER_PAGE,
  isGlobal,
}: getArticlesParam) => {
  return await apiClient({
    method: "get",
    url: `/articles${isGlobal ? "" : "/feed"}?limit=${limit}&&offset=${
      (page - 1) * limit
    }`,
  });
};

export const getArticle = async ({ slug }: getArticleParam) => {
  return await apiClient({
    method: "get",
    url: `/articles/${slug}`,
  });
};

export const createArticle = async ({
  title,
  description,
  body,
  tagList,
}: craeteArticleParam) => {
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

export const deleteArticle = async ({ slug }: deleteArticleParam) => {
  return await apiClient({
    method: "delete",
    url: `/articles/${slug}`,
  });
};
