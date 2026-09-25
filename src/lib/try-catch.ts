type Success<T> = { data: T; error: null };
type Failure = { data: null; error: Error };
export type Result<T> = Success<T> | Failure;

export async function tryCatch<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    if (error instanceof Error) return { data: null, error };
    return { data: null, error: new Error(String(error)) };
  }
}
