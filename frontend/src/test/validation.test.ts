import { describe, expect, it } from 'vitest';
import {
  validateBody,
  validateContent,
  validateTitle,
} from '../utils/validation';

describe('validateTitle', () => {
  it('空文字列の場合はエラーを返す', () => {
    const result = validateTitle('');
    expect(result).not.toBeNull();
    expect(result?.field).toBe('title');
    expect(result?.message).toBe('タイトルは1文字以上で入力してください');
  });

  it('空白のみの場合はエラーを返す', () => {
    const result = validateTitle('   ');
    expect(result).not.toBeNull();
    expect(result?.field).toBe('title');
    expect(result?.message).toBe('タイトルは1文字以上で入力してください');
  });

  it('1文字の場合はエラーを返さない', () => {
    const result = validateTitle('あ');
    expect(result).toBeNull();
  });

  it('50文字の場合はエラーを返さない', () => {
    const title = 'あ'.repeat(50);
    const result = validateTitle(title);
    expect(result).toBeNull();
  });

  it('51文字の場合はエラーを返す', () => {
    const title = 'あ'.repeat(51);
    const result = validateTitle(title);
    expect(result).not.toBeNull();
    expect(result?.field).toBe('title');
    expect(result?.message).toBe('タイトルは50文字以下で入力してください');
  });

  it('有効なタイトルの場合はエラーを返さない', () => {
    const result = validateTitle('テストタイトル');
    expect(result).toBeNull();
  });
});

describe('validateBody', () => {
  it('空文字列の場合はエラーを返す', () => {
    const result = validateBody('');
    expect(result).not.toBeNull();
    expect(result?.field).toBe('body');
    expect(result?.message).toBe('本文は10文字以上で入力してください');
  });

  it('空白のみの場合はエラーを返す', () => {
    const result = validateBody('   ');
    expect(result).not.toBeNull();
    expect(result?.field).toBe('body');
    expect(result?.message).toBe('本文は10文字以上で入力してください');
  });

  it('9文字の場合はエラーを返す', () => {
    const body = 'あ'.repeat(9);
    const result = validateBody(body);
    expect(result).not.toBeNull();
    expect(result?.field).toBe('body');
    expect(result?.message).toBe('本文は10文字以上で入力してください');
  });

  it('10文字の場合はエラーを返さない', () => {
    const body = 'あ'.repeat(10);
    const result = validateBody(body);
    expect(result).toBeNull();
  });

  it('2000文字の場合はエラーを返さない', () => {
    const body = 'あ'.repeat(2000);
    const result = validateBody(body);
    expect(result).toBeNull();
  });

  it('2001文字の場合はエラーを返す', () => {
    const body = 'あ'.repeat(2001);
    const result = validateBody(body);
    expect(result).not.toBeNull();
    expect(result?.field).toBe('body');
    expect(result?.message).toBe('本文は2000文字以下で入力してください');
  });

  it('先頭と末尾に空白がある場合、trim後の長さで判定する', () => {
    const body = '   ' + 'あ'.repeat(10) + '   ';
    const result = validateBody(body);
    expect(result).toBeNull();
  });
});

describe('validateContent', () => {
  it('タイトルと本文が両方有効な場合はエラーなし', () => {
    const result = validateContent('テストタイトル', 'あ'.repeat(10));
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('タイトルが無効な場合はエラーを返す', () => {
    const result = validateContent('', 'あ'.repeat(10));
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe('title');
  });

  it('本文が無効な場合はエラーを返す', () => {
    const result = validateContent('テストタイトル', 'あ'.repeat(9));
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe('body');
  });

  it('タイトルと本文が両方無効な場合は両方のエラーを返す', () => {
    const result = validateContent('', 'あ'.repeat(9));
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(2);
  });
});
