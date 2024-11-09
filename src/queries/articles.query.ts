import { createArticle, getArticles } from "@/repositories/articles/articlesRepository";
import { useMutation, useQueries } from "@tanstack/react-query";

export const useGetArticlesQueries = ({ isGlobal, page }: { isGlobal: boolean; page: number }) => {
  return useQueries({
    queries: [
      {
        queryKey: ["articles", {isGlobal, page }],
        queryFn: () => getArticles({ isGlobal, page }).then((res) => res.data),
        staleTime: 20000,
      },
    ],
  });
};

export const useCreateArticleMutation = () =>
  useMutation({
    mutationFn: createArticle,
  });
