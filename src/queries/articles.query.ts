import {
  QUERY_ARTICLE_KEY,
  QUERY_ARTICLES_KEY,
  QUERY_TAG_KEY,
} from "@/constants/query.constant";
import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  updateArticle,
} from "@/repositories/articles/articlesRepository";
import { getTags } from "@/repositories/tags/tagsRepository";
import { useMutation, useSuspenseQueries } from "@tanstack/react-query";

export const useGetArticlesQueries = ({
  isGlobal,
  page,
}: {
  isGlobal: boolean;
  page: number;
}) => {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: [QUERY_ARTICLES_KEY, { isGlobal, page }],
        queryFn: () => getArticles({ isGlobal, page }).then((res) => res.data),
      },
      {
        queryKey: [QUERY_TAG_KEY],
        queryFn: () => getTags().then((res) => res.data),
      },
    ],
  });
};

export const useGetArticleQueries = (slug: string) => {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: [QUERY_ARTICLE_KEY, slug],
        queryFn: () => getArticle({ slug }).then((res) => res.data?.article),
      },
    ],
  });
};

export const useCreateArticleMutation = () =>
  useMutation({
    mutationFn: createArticle,
  });

export const useDeleteArticleMutation = () =>
  useMutation({
    mutationFn: deleteArticle,
  });

export const useUpdateArticleMutation = () =>
  useMutation({
    mutationFn: updateArticle,
  });
