// ResponseJsonChecker: Validasi & convert response body ke JSON
// Serupa dengan Retrofit Converter.Factory di Kotlin
// Intercept response, coba parse, log error kalau gagal

export const checkResponseJson = async <T>(response: Response): Promise<T> => {
  try {
    const json: T = await response.json();
    return json;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('CompanyCORP', `error: ${JSON.stringify(errorMessage)}`);
    throw new Error(errorMessage);
  }
};
