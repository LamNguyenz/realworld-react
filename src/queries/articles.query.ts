import { createArticle } from "@/repositories/articles/articlesRepository";
import { useMutation } from "@tanstack/react-query";

export const useCreateArticleMutation = () =>
  useMutation({
    mutationFn: createArticle,
  });
