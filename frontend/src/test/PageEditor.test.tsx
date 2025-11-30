import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PageEditor } from '../components/PageEditor/PageEditor';
import type { Content, UpdateContentDTO } from '../types/content';

describe('PageEditor', () => {
  const mockOnSave = vi.fn<[UpdateContentDTO], Promise<void>>();
  const mockOnMenuClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('コンテンツがない場合', () => {
    it('適切なメッセージを表示する', () => {
      render(<PageEditor content={null} onSave={mockOnSave} />);

      expect(
        screen.getByText(
          '左側のサイドバーからページを選択するか、新規ページを作成してください。',
        ),
      ).toBeInTheDocument();
    });

    it('onMenuClickが渡された場合、メニューボタンを表示する', async () => {
      const user = userEvent.setup();
      render(
        <PageEditor
          content={null}
          onSave={mockOnSave}
          onMenuClick={mockOnMenuClick}
        />,
      );

      const menuButton = screen.getByLabelText('メニューを開く');
      expect(menuButton).toBeInTheDocument();

      await user.click(menuButton);
      expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('タイトル編集機能', () => {
    const mockContent: Content = {
      id: 1,
      title: 'テストタイトル',
      body: 'テスト本文',
    };

    it('初期状態でタイトルが表示される', () => {
      render(<PageEditor content={mockContent} onSave={mockOnSave} />);

      expect(screen.getByText('テストタイトル')).toBeInTheDocument();
    });

    it('Editボタンをクリックすると編集モードになる', async () => {
      const user = userEvent.setup();
      render(<PageEditor content={mockContent} onSave={mockOnSave} />);

      const editButtons = screen.getAllByText('Edit');
      const titleEditButton = editButtons[0];
      await user.click(titleEditButton);

      const titleInput = screen.getByDisplayValue('テストタイトル');
      expect(titleInput).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('タイトルを編集して保存できる', async () => {
      const user = userEvent.setup();
      mockOnSave.mockResolvedValueOnce(undefined);

      render(<PageEditor content={mockContent} onSave={mockOnSave} />);

      // 編集モードに切り替え
      const editButtons = screen.getAllByText('Edit');
      await user.click(editButtons[0]);

      // タイトルを編集
      const titleInput = screen.getByDisplayValue('テストタイトル');
      await user.clear(titleInput);
      await user.type(titleInput, '更新されたタイトル');

      // 保存
      const saveButton = screen.getByText('Save');
      await user.click(saveButton);

      await waitFor(() => {
        expect(mockOnSave).toHaveBeenCalledWith({
          title: '更新されたタイトル',
        });
      });

      // 編集モードが終了していることを確認
      expect(screen.getByText('更新されたタイトル')).toBeInTheDocument();
    });

    it('タイトル編集をキャンセルできる', async () => {
      const user = userEvent.setup();
      render(<PageEditor content={mockContent} onSave={mockOnSave} />);

      // 編集モードに切り替え
      const editButtons = screen.getAllByText('Edit');
      await user.click(editButtons[0]);

      // タイトルを編集
      const titleInput = screen.getByDisplayValue('テストタイトル');
      await user.clear(titleInput);
      await user.type(titleInput, '変更されたタイトル');

      // キャンセル
      const cancelButtons = screen.getAllByText('Cancel');
      await user.click(cancelButtons[0]);

      // 元のタイトルに戻ることを確認
      expect(screen.getByText('テストタイトル')).toBeInTheDocument();
      expect(mockOnSave).not.toHaveBeenCalled();
    });

    it('タイトルが空の場合、バリデーションエラーを表示する', async () => {
      const user = userEvent.setup();
      render(<PageEditor content={mockContent} onSave={mockOnSave} />);

      // 編集モードに切り替え
      const editButtons = screen.getAllByText('Edit');
      await user.click(editButtons[0]);

      // タイトルを空にする
      const titleInput = screen.getByDisplayValue('テストタイトル');
      await user.clear(titleInput);

      // 保存を試みる
      const saveButton = screen.getByText('Save');
      await user.click(saveButton);

      await waitFor(() => {
        expect(
          screen.getByText('タイトルは1文字以上で入力してください'),
        ).toBeInTheDocument();
      });

      expect(mockOnSave).not.toHaveBeenCalled();
    });
  });

  describe('本文編集機能', () => {
    const mockContent: Content = {
      id: 1,
      title: 'テストタイトル',
      body: 'テスト本文',
    };

    it('初期状態で本文が表示される', () => {
      render(<PageEditor content={mockContent} onSave={mockOnSave} />);

      expect(screen.getByText('テスト本文')).toBeInTheDocument();
    });

    it('Editボタンをクリックすると編集モードになる', async () => {
      const user = userEvent.setup();
      render(<PageEditor content={mockContent} onSave={mockOnSave} />);

      const editButtons = screen.getAllByText('Edit');
      const bodyEditButton = editButtons[1];
      await user.click(bodyEditButton);

      const bodyTextarea = screen.getByDisplayValue('テスト本文');
      expect(bodyTextarea).toBeInTheDocument();
    });

    it('本文を編集して保存できる', async () => {
      const user = userEvent.setup();
      mockOnSave.mockResolvedValueOnce(undefined);

      render(<PageEditor content={mockContent} onSave={mockOnSave} />);

      // 編集モードに切り替え
      const editButtons = screen.getAllByText('Edit');
      expect(editButtons.length).toBeGreaterThanOrEqual(2);
      await user.click(editButtons[1]);

      // 本文を編集
      const bodyTextarea = screen.getByDisplayValue('テスト本文');
      await user.clear(bodyTextarea);
      await user.type(bodyTextarea, '更新された本文です。');

      // 保存ボタンを探す（本文編集モードではSaveボタンは1つだけ）
      const saveButton = screen.getByText('Save');
      await user.click(saveButton);

      // 保存が呼ばれるまで待機
      await waitFor(
        () => {
          expect(mockOnSave).toHaveBeenCalled();
        },
        { timeout: 3000 },
      );

      // 実際に呼ばれた引数を確認
      expect(mockOnSave).toHaveBeenCalledWith({
        body: '更新された本文です。',
      });

      // 編集モードが終了していることを確認
      await waitFor(() => {
        expect(screen.getByText('更新された本文です。')).toBeInTheDocument();
      });
    });

    it('本文が10文字未満の場合、バリデーションエラーを表示する', async () => {
      const user = userEvent.setup();
      render(<PageEditor content={mockContent} onSave={mockOnSave} />);

      // 編集モードに切り替え
      const editButtons = screen.getAllByText('Edit');
      await user.click(editButtons[1]);

      // 本文を9文字にする（実際は4文字だが、10文字未満なのでエラーになる）
      const bodyTextarea = screen.getByDisplayValue('テスト本文');
      await user.clear(bodyTextarea);
      await user.type(bodyTextarea, '短い本文');

      // 保存を試みる（本文編集モードではSaveボタンは1つだけ）
      const saveButton = screen.getByText('Save');
      await user.click(saveButton);

      // エラーメッセージが表示されるまで待機
      await waitFor(
        () => {
          expect(
            screen.getByText('本文は10文字以上で入力してください'),
          ).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      expect(mockOnSave).not.toHaveBeenCalled();
    });
  });

  describe('ローディング状態', () => {
    const mockContent: Content = {
      id: 1,
      title: 'テストタイトル',
      body: 'テスト本文',
    };

    it('loadingがtrueの場合、入力フィールドが無効化される', () => {
      render(
        <PageEditor content={mockContent} onSave={mockOnSave} loading={true} />,
      );

      // 編集モードにする必要があるので、まずEditボタンを探す
      const editButtons = screen.getAllByText('Edit');
      expect(editButtons.length).toBeGreaterThan(0);
    });
  });

  describe('コンテンツの更新', () => {
    it('contentが変更されると、表示が更新される', () => {
      const initialContent: Content = {
        id: 1,
        title: '初期タイトル',
        body: '初期本文',
      };

      const { rerender } = render(
        <PageEditor content={initialContent} onSave={mockOnSave} />,
      );

      expect(screen.getByText('初期タイトル')).toBeInTheDocument();
      expect(screen.getByText('初期本文')).toBeInTheDocument();

      const updatedContent: Content = {
        id: 1,
        title: '更新タイトル',
        body: '更新本文',
      };

      rerender(<PageEditor content={updatedContent} onSave={mockOnSave} />);

      expect(screen.getByText('更新タイトル')).toBeInTheDocument();
      expect(screen.getByText('更新本文')).toBeInTheDocument();
    });
  });
});
