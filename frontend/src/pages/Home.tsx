import { useState } from 'react';
import styled from 'styled-components';
import { PageEditor } from '../components/PageEditor/PageEditor';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { useContent, useContentList } from '../hooks/useContent';
import type { UpdateContentDTO } from '../types/content';

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

export const Home: React.FC = () => {
  const [selectedContentId, setSelectedContentId] = useState<number | null>(
    null,
  );
  const [sidebarEditMode, setSidebarEditMode] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const { contents, deleteContent, createContent, updateContentInList } =
    useContentList();

  const {
    content,
    loading: contentLoading,
    updateContent,
  } = useContent(selectedContentId);

  const handleSelectContent = (id: number) => {
    setSelectedContentId(id);
    // モバイルでページ選択時にサイドバーを閉じる
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleCreateContent = async () => {
    try {
      const newContent = await createContent({
        title: '新しいページ',
        body: '',
      });
      setSelectedContentId(newContent.id);
      // モバイルで新規ページ作成時にサイドバーを閉じる
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      }
    } catch (error) {
      console.error('ページの作成に失敗しました:', error);
      alert('ページの作成に失敗しました。もう一度お試しください。');
    }
  };

  const handleDeleteContent = async (id: number) => {
    try {
      await deleteContent(id);
      // 削除したページが選択されていた場合、選択を解除
      if (selectedContentId === id) {
        setSelectedContentId(null);
      }
    } catch (error) {
      console.error('ページの削除に失敗しました:', error);
      alert('ページの削除に失敗しました。もう一度お試しください。');
    }
  };

  const handleSaveContent = async (data: UpdateContentDTO) => {
    if (!selectedContentId) {
      throw new Error('Content ID is required');
    }
    const updated = await updateContent(data);
    // サイドバーのcontents配列も更新
    updateContentInList(updated);
  };

  const handleEditContent = () => {
    setSidebarEditMode(true);
  };

  const handleEditModeDone = () => {
    setSidebarEditMode(false);
  };

  return (
    <Container>
      <Sidebar
        contents={contents}
        selectedContentId={selectedContentId}
        onSelectContent={handleSelectContent}
        onMenuEditContent={handleEditContent}
        onMenuEditDone={handleEditModeDone}
        onDeleteContent={handleDeleteContent}
        onMenuCreateContent={handleCreateContent}
        editMode={sidebarEditMode}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {isSidebarOpen && <Overlay onClick={() => setIsSidebarOpen(false)} />}
      <PageEditor
        content={content}
        onSave={handleSaveContent}
        loading={contentLoading}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
    </Container>
  );
};
