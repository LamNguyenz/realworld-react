import { UNIT_PER_PAGE } from "@/constants";
import apiClient from "../apiClient";
import {
  craeteArticleParam,
  createCommentParam,
  deleteArticleParam,
  deleteCommentParam,
  getArticleParam,
  getArticlesParam,
  updateArticleParam,
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

export const updateArticle = async ({
  slug,
  title,
  description,
  body,
  tagList,
}: updateArticleParam) => {
  return await apiClient({
    method: "put",
    url: `/articles/${slug}`,
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

export const favoriteArticle = async (slug: string) => {
  return await apiClient({
    method: "post",
    url: `/articles/${slug}/favorite`,
  });
};

export const unFavoriteArticle = async (slug: string) => {
  return await apiClient({
    method: "delete",
    url: `/articles/${slug}/favorite`,
  });
};

export const getComments = async (slug: string) => {
  return await apiClient({
    method: "get",
    url: `/articles/${slug}/comments`,
  });
};

export const createComment = async ({ slug, body }: createCommentParam) => {
  return await apiClient({
    method: "post",
    url: `/articles/${slug}/comments`,
    data: {
      comment: {
        body,
      },
    },
  });
};

export const deleteComment = async ({ slug, id }: deleteCommentParam) => {
  return await apiClient({
    method: "delete",
    url: `/articles/${slug}/comments/${id}`,
  });
};
