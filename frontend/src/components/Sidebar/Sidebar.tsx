import styled from 'styled-components';
import type { Content } from '../../types/content';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  width: 240px;
  background-color: #ffffff;
  border-right: 1px solid #dee2e6;
  height: 100%;
  overflow-y: auto;
  font-family: 'Noto Sans JP', sans-serif;
  position: relative;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 280px;
    transform: translateX(${(props) => (props.isOpen ? '0' : '-100%')});
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 32px 20px;

  @media (max-width: 768px) {
    padding: 80px 24px 16px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 18px;
`;

const SidebarButtonContainer = styled.div`
  background-color: #f5f8fa;
  width: 100%;
  display: flex;
  padding: 10px;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;

const PageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PageItem = styled.li<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 32px;
  background-color: ${(props) => (props.isActive ? '#e9ecef' : 'transparent')};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e9ecef;
  }

  @media (max-width: 768px) {
    padding: 0 24px;
    height: 48px;
  }
`;

const PageTitle = styled.span<{ isActive: boolean }>`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: ${(props) => (props.isActive ? '#32A8F8' : '#212529')};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const CloseButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    margin-left: auto;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
    background-color: #999999;

    &:hover {
      cursor: pointer;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #6c757d;
  font-size: 14px;
  padding: 24px 0;
`;

interface SidebarProps {
  contents: Content[];
  selectedContentId: number | null;
  onSelectContent: (id: number) => void;
  onMenuEditContent: () => void;
  onMenuCreateContent: () => void;
  onMenuEditDone: () => void;
  onDeleteContent: (id: number) => void;
  editMode: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  contents,
  selectedContentId,
  onSelectContent,
  onMenuEditContent,
  onDeleteContent,
  onMenuCreateContent,
  onMenuEditDone,
  editMode,
  isOpen = true,
  onClose,
}) => {
  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (window.confirm('このページを削除しますか？')) {
      onDeleteContent(id);
    }
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <Logo>
          <Icon name="logo" size={32} />
          <span>Service Name</span>
        </Logo>
        {onClose && (
          <CloseButton onClick={onClose} aria-label="閉じる">
            <Icon name="cancel" size={24} />
          </CloseButton>
        )}
      </SidebarHeader>

      <PageList>
        {contents.length === 0 ? (
          <EmptyState>ページがありません</EmptyState>
        ) : (
          contents.map((content) => (
            <PageItem
              key={content.id}
              isActive={selectedContentId === content.id}
              onClick={() => onSelectContent(content.id)}
            >
              <PageTitle isActive={selectedContentId === content.id}>
                {content.title || `ページ ${content.id}`}
              </PageTitle>
              {editMode && (
                <DeleteButton
                  onClick={(e) => handleDelete(e, content.id)}
                  aria-label="削除"
                >
                  <Icon name="delete" size={16} />
                </DeleteButton>
              )}
            </PageItem>
          ))
        )}
      </PageList>

      <SidebarButtonContainer>
        {editMode ? (
          <>
            <Button
              onClick={onMenuCreateContent}
              size="large"
              type="done"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0px',
                width: '100px',
              }}
              iconName="+"
            >
              <span style={{ fontSize: '10px' }}>New page</span>
            </Button>

            <Button
              onClick={onMenuEditDone}
              size="large"
              type="edit"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0px',
                width: '100px',
              }}
            >
              <Icon name="done" size={24} />
              <span style={{ fontSize: '10px', color: '#ffffff' }}>Done</span>
            </Button>
          </>
        ) : (
          <Button
            onClick={onMenuEditContent}
            size="large"
            type="edit"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0px',
              width: '100px',
            }}
            iconName="edit"
          >
            <span style={{ fontSize: '10px', color: '#ffffff' }}>Edit</span>
          </Button>
        )}
      </SidebarButtonContainer>
    </SidebarContainer>
  );
};
