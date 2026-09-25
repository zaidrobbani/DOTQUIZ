"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryQuestionCount, startQuiz } from "./action";
import type { QuizSetupConfig } from "./dto";

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["trivia", "categories"],
    queryFn: getCategories,
    staleTime: Infinity,
  });
};

export const useCategoryCountQuery = (categoryId: number | null) => {
  return useQuery({
    queryKey: ["trivia", "category-count", categoryId],
    queryFn: () => getCategoryQuestionCount(categoryId as number),
    enabled: categoryId !== null,
    staleTime: 5 * 60 * 1000,
  });
};

export const useStartQuizMutation = () => {
  return useMutation({
    mutationFn: (config: QuizSetupConfig) => startQuiz(config),
  });
};
