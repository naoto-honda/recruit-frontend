/**
 * バリデーションエラーの型定義
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * バリデーション結果の型定義
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * タイトルのバリデーション
 * 制約: 1文字以上、50文字以下
 */
export function validateTitle(title: string): ValidationError | null {
  if (!title || title.trim().length === 0) {
    return {
      field: 'title',
      message: 'タイトルは1文字以上で入力してください',
    };
  }
  if (title.length > 50) {
    return {
      field: 'title',
      message: 'タイトルは50文字以下で入力してください',
    };
  }
  return null;
}

/**
 * 本文のバリデーション
 * 制約: 10文字以上、2000文字以下
 */
export function validateBody(body: string): ValidationError | null {
  if (!body || body.trim().length === 0) {
    return {
      field: 'body',
      message: '本文は10文字以上で入力してください',
    };
  }
  if (body.trim().length < 10) {
    return {
      field: 'body',
      message: '本文は10文字以上で入力してください',
    };
  }
  if (body.length > 2000) {
    return {
      field: 'body',
      message: '本文は2000文字以下で入力してください',
    };
  }
  return null;
}

/**
 * タイトルと本文の両方をバリデーション
 */
export function validateContent(title: string, body: string): ValidationResult {
  const errors: ValidationError[] = [];

  const titleError = validateTitle(title);
  if (titleError) {
    errors.push(titleError);
  }

  const bodyError = validateBody(body);
  if (bodyError) {
    errors.push(bodyError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
