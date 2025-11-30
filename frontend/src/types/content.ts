/**
 * コンテンツの型定義
 * バックエンドのContentエンティティに対応
 */
export interface Content {
  id: number;
  title?: string;
  body?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * コンテンツ作成用のDTO
 */
export interface CreateContentDTO {
  title?: string;
  body?: string;
}

/**
 * コンテンツ更新用のDTO
 */
export interface UpdateContentDTO {
  title?: string;
  body?: string;
}
