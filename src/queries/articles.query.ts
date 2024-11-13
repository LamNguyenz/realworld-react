import { QUERY_ARTICLE_KEY, QUERY_ARTICLES_KEY } from "@/constants/query.constant";
import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
} from "@/repositories/articles/articlesRepository";
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
        staleTime: 20000,
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
        staleTime: 20000,
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
