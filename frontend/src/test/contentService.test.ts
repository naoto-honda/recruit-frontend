import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, contentService } from '../services/contentService';
import type { Content } from '../types/content';

// fetchをモック化
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('contentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('全コンテンツ一覧を取得できる', async () => {
      const mockContents: Content[] = [
        { id: 1, title: 'タイトル1', body: '本文1' },
        { id: 2, title: 'タイトル2', body: '本文2' },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockContents,
      });

      const result = await contentService.getAll();
      expect(result).toEqual(mockContents);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/content',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        }),
      );
    });

    it('エラー時はApiErrorをスローする', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(contentService.getAll()).rejects.toThrow(ApiError);
    });
  });

  describe('getById', () => {
    it('指定IDのコンテンツを取得できる', async () => {
      const mockContent: Content = {
        id: 1,
        title: 'テストタイトル',
        body: 'テスト本文',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockContent,
      });

      const result = await contentService.getById(1);
      expect(result).toEqual(mockContent);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/content/1',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        }),
      );
    });

    it('存在しないIDの場合はエラーをスローする', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(contentService.getById(999)).rejects.toThrow(ApiError);
    });
  });

  describe('create', () => {
    it('新規コンテンツを作成できる', async () => {
      const newContent: Content = {
        id: 1,
        title: '新しいタイトル',
        body: '新しい本文',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => newContent,
      });

      const result = await contentService.create({
        title: '新しいタイトル',
        body: '新しい本文',
      });

      expect(result).toEqual(newContent);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/content',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            title: '新しいタイトル',
            body: '新しい本文',
          }),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        }),
      );
    });

    it('タイトルのみで作成できる', async () => {
      const newContent: Content = {
        id: 1,
        title: 'タイトルのみ',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => newContent,
      });

      const result = await contentService.create({
        title: 'タイトルのみ',
      });

      expect(result).toEqual(newContent);
    });
  });

  describe('update', () => {
    it('コンテンツを更新できる', async () => {
      const updatedContent: Content = {
        id: 1,
        title: '更新されたタイトル',
        body: '更新された本文',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => updatedContent,
      });

      const result = await contentService.update(1, {
        title: '更新されたタイトル',
        body: '更新された本文',
      });

      expect(result).toEqual(updatedContent);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/content/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({
            title: '更新されたタイトル',
            body: '更新された本文',
          }),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        }),
      );
    });

    it('タイトルのみを更新できる', async () => {
      const updatedContent: Content = {
        id: 1,
        title: '更新されたタイトル',
        body: '元の本文',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => updatedContent,
      });

      const result = await contentService.update(1, {
        title: '更新されたタイトル',
      });

      expect(result).toEqual(updatedContent);
    });
  });

  describe('delete', () => {
    it('コンテンツを削除できる', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      await contentService.delete(1);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/content/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        }),
      );
    });

    it('削除エラー時はApiErrorをスローする', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(contentService.delete(999)).rejects.toThrow(ApiError);
    });
  });
});
