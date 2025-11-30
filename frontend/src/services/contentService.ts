import type {
  Content,
  CreateContentDTO,
  UpdateContentDTO,
} from '../types/content';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * API呼び出しのエラークラス
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * fetch APIのラッパー関数
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
        response.statusText,
      );
    }

    // DELETEリクエストの場合はレスポンスボディがない可能性がある
    if (response.status === 204) {
      return undefined as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * コンテンツ関連のAPIサービス
 */
export const contentService = {
  /**
   * 全コンテンツ一覧を取得
   */
  async getAll(): Promise<Content[]> {
    return fetchApi<Content[]>('/content');
  },

  /**
   * 指定IDのコンテンツを取得
   */
  async getById(id: number): Promise<Content> {
    return fetchApi<Content>(`/content/${id}`);
  },

  /**
   * 新規コンテンツを作成
   */
  async create(data: CreateContentDTO): Promise<Content> {
    return fetchApi<Content>('/content', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * コンテンツを更新
   */
  async update(id: number, data: UpdateContentDTO): Promise<Content> {
    return fetchApi<Content>(`/content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * コンテンツを削除
   */
  async delete(id: number): Promise<void> {
    return fetchApi<void>(`/content/${id}`, {
      method: 'DELETE',
    });
  },
};
