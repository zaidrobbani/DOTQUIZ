import { axiosTrivia } from "@/lib/axios";
import { tryCatch } from "@/lib/try-catch";
import { decodeBase64Utf8, shuffle } from "@/lib/utils";
import type {
  CategoryCountResponse,
  CategoryListResponse,
  QuestionsApiResponse,
  QuizQuestion,
  QuizSetupConfig,
  SessionTokenResponse,
  TriviaCategory,
} from "./dto";

export async function getCategories(): Promise<TriviaCategory[]> {
  const { data, error } = await tryCatch(
    axiosTrivia.get<CategoryListResponse>("/api_category.php"),
  );

  if (error || !data?.data) {
    throw error ?? new Error("Gagal mengambil daftar kategori.");
  }

  return data.data.trivia_categories;
}

export async function getCategoryQuestionCount(
  categoryId: number,
): Promise<CategoryCountResponse> {
  const { data, error } = await tryCatch(
    axiosTrivia.get<CategoryCountResponse>("/api_count.php", {
      params: { category: categoryId },
    }),
  );

  if (error || !data?.data) {
    throw error ?? new Error("Gagal mengambil jumlah soal kategori.");
  }

  return data.data;
}

async function requestSessionToken(): Promise<string> {
  const { data, error } = await tryCatch(
    axiosTrivia.get<SessionTokenResponse>("/api_token.php", {
      params: { command: "request" },
    }),
  );

  if (error || !data?.data?.token) {
    throw error ?? new Error("Gagal membuat session token.");
  }

  return data.data.token;
}

async function resetSessionToken(token: string): Promise<string> {
  const { data, error } = await tryCatch(
    axiosTrivia.get<SessionTokenResponse>("/api_token.php", {
      params: { command: "reset", token },
    }),
  );

  if (error || !data?.data?.token) {
    throw error ?? new Error("Gagal mereset session token.");
  }

  return data.data.token;
}

const RESPONSE_MESSAGES: Record<number, string> = {
  1: "Kombinasi kategori, kesulitan, dan jumlah soal ini tidak tersedia. Coba kurangi jumlah soal atau ganti filter.",
  2: "Parameter kuis tidak valid.",
  5: "Terlalu banyak permintaan ke Open Trivia DB. Tunggu beberapa detik lalu coba lagi.",
};

async function fetchQuestionsPayload(
  config: QuizSetupConfig,
  token: string,
): Promise<QuestionsApiResponse> {
  const { data, error } = await tryCatch(
    axiosTrivia.get<QuestionsApiResponse>("/api.php", {
      params: {
        amount: config.amount,
        category: config.categoryId ?? undefined,
        difficulty: config.difficulty ?? undefined,
        type: config.type ?? undefined,
        token,
        encode: "base64",
      },
    }),
  );

  if (error || !data?.data) {
    throw error ?? new Error("Gagal mengambil soal kuis.");
  }

  return data.data;
}

function buildQuizQuestion(
  raw: QuestionsApiResponse["results"][number],
): QuizQuestion {
  const category = decodeBase64Utf8(raw.category);
  const question = decodeBase64Utf8(raw.question);
  const correctAnswer = decodeBase64Utf8(raw.correct_answer);
  const incorrectAnswers = raw.incorrect_answers.map(decodeBase64Utf8);
  const decodedType = decodeBase64Utf8(raw.type);
  const decodedDifficulty = decodeBase64Utf8(raw.difficulty);

  return {
    id: crypto.randomUUID(),
    category,
    type: (decodedType || raw.type) as QuizQuestion["type"],
    difficulty: (decodedDifficulty ||
      raw.difficulty) as QuizQuestion["difficulty"],
    question,
    correctAnswer,
    options: shuffle([correctAnswer, ...incorrectAnswers]),
  };
}

export async function startQuiz(
  config: QuizSetupConfig,
): Promise<QuizQuestion[]> {
  let token = await requestSessionToken();
  let payload = await fetchQuestionsPayload(config, token);

  if (payload.response_code === 4) {
    token = await resetSessionToken(token);
    payload = await fetchQuestionsPayload(config, token);
  }

  if (payload.response_code !== 0) {
    throw new Error(
      RESPONSE_MESSAGES[payload.response_code] ??
        "Gagal memuat soal kuis, coba lagi.",
    );
  }

  return payload.results.map(buildQuizQuestion);
}
