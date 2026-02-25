// NetworkModule: Setup HTTP client yang dipake seluruh app
// Serupa dengan Dagger Hilt NetworkModule di Kotlin
// Kotlin: OkHttpClient + Retrofit + Interceptors + Chucker
// React Native: fetch + Interceptors + Reactotron (debug)

import {BASE_URL} from '../common/Constant';
import {
  requestInterceptor,
  handleNetworkError,
  responseInterceptor,
  setTokenGetter,
} from './ResponseInterceptor';
import {checkResponseJson} from './ResponseJsonChecker';

const TIME_OUT = 60000; 
const IS_DEBUG = __DEV__; 

interface RequestConfig {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  requiresAuth?: boolean;
}

// ---- NetworkModule (Singleton) ----
class NetworkModule {
  private baseUrl: string;
  private timeOut: number;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.timeOut = TIME_OUT;

    // getToken = { "" }
    setTokenGetter(() => {
      // TODO: ambil token dari storage/auth state
      return '';
    });
  }

  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    // 1. Request Interceptor: inject auth token
    const headers = requestInterceptor(
      {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      config.requiresAuth ?? false,
    );

    // 2. Logging (HttpLoggingInterceptor.Level.BODY)
    if (IS_DEBUG) {
      console.log(`[HTTP ${config.method || 'GET'}] ${url}`);
      if (config.body) {
        console.log('[HTTP Body]', config.body);
      }
    }

    // 3. Fetch dengan timeout
    let response: Response;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeOut);

    try {
      response = await fetch(url, {
        method: config.method || 'GET',
        headers,
        body: config.body,
        signal: controller.signal,
      });
    } catch (error) {
      handleNetworkError(error);
    } finally {
      clearTimeout(timeoutId);
    }

    // 4. Debug logging response (serupa Chucker di Kotlin)
    if (IS_DEBUG) {
      console.log(`[HTTP Response] ${response!.status} ${url}`);
    }

    // 5. Response Interceptor: cek HTTP status
    responseInterceptor(response!);

    // 6. Parse JSON
    const json = await checkResponseJson<T>(response!);

    return json;
  }
}

// Singleton instance
export const networkModule = new NetworkModule(BASE_URL);
