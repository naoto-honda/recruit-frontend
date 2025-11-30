import { useCallback, useEffect, useState } from 'react';
import { contentService } from '../services/contentService';
import type {
  Content,
  CreateContentDTO,
  UpdateContentDTO,
} from '../types/content';

/**
 * コンテンツ一覧を管理するカスタムフック
 */
export function useContentList() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // ページの一覧取得API（サイドバー用）
  const fetchContents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contentService.getAll();
      console.log('初期取得データ', data);

      setContents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  // ページの作成API
  const createContent = useCallback(async (data: CreateContentDTO) => {
    try {
      const newContent = await contentService.create(data);
      setContents((prev) => [...prev, newContent]);
      return newContent;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Unknown error');
    }
  }, []);

  // ページの削除API
  const deleteContent = useCallback(async (id: number) => {
    try {
      await contentService.delete(id);
      setContents((prev) => prev.filter((content) => content.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Unknown error');
    }
  }, []);

  return {
    contents,
    loading,
    error,
    refetch: fetchContents,
    createContent,
    deleteContent,
    updateContentInList: (updatedContent: Content) => {
      setContents((prev) =>
        prev.map((c) => (c.id === updatedContent.id ? updatedContent : c)),
      );
    },
  };
}

/**
 * 単一のコンテンツを管理するカスタムフック
 */
export function useContent(id: number | null) {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ページの取得API
  const fetchContent = useCallback(async () => {
    if (!id) {
      setContent(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await contentService.getById(id);
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setContent(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // ページの更新API
  const updateContent = useCallback(
    async (data: UpdateContentDTO) => {
      if (!id) {
        throw new Error('Content ID is required');
      }

      try {
        setLoading(true);
        setError(null);
        const updated = await contentService.update(id, data);
        setContent(updated);
        return updated;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [id],
  );

  return {
    content,
    loading,
    error,
    refetch: fetchContent,
    updateContent,
  };
}
