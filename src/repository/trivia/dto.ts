export interface TriviaCategory {
  id: number;
  name: string;
}

export interface CategoryListResponse {
  trivia_categories: TriviaCategory[];
}

export interface CategoryCountBreakdown {
  total_question_count: number;
  total_easy_question_count: number;
  total_medium_question_count: number;
  total_hard_question_count: number;
}

export interface CategoryCountResponse {
  category_id: number;
  category_question_count: CategoryCountBreakdown;
}

export type QuestionDifficulty = "easy" | "medium" | "hard";
export type QuestionType = "multiple" | "boolean";

export interface RawTriviaQuestion {
  category: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionsApiResponse {
  response_code: number;
  results: RawTriviaQuestion[];
}

export interface SessionTokenResponse {
  response_code: number;
  response_message: string;
  token: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizSetupConfig {
  amount: number;
  categoryId: number | null;
  categoryName: string;
  difficulty: QuestionDifficulty | null;
  type: QuestionType | null;
  durationSeconds: number;
}

export interface StartQuizResult {
  questions: QuizQuestion[];
  config: QuizSetupConfig;
}
