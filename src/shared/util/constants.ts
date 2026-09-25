export const ROUTES = {
  home: "/",
  login: "/login",
  setup: "/setup",
  quizPlay: "/quiz/play",
  quizResult: "/quiz/result",
  history: "/history",
  historyDetail: (id: string) => `/history/${id}`,
} as const;

export const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Mudah",
  medium: "Sedang",
  hard: "Sulit",
};

export const TYPE_LABEL: Record<string, string> = {
  multiple: "Pilihan Ganda",
  boolean: "Benar / Salah",
};
