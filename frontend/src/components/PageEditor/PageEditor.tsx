import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { Content, UpdateContentDTO } from '../../types/content';
import { validateBody, validateTitle } from '../../utils/validation';
import { Button } from '../Button/Button';
import { Footer } from '../Footer/Footer';
import { Icon } from '../Icon/Icon';

const EditorContainer = styled.div`
  flex: 1;
  padding: 40px;
  font-family: 'Noto Sans JP', sans-serif;
  overflow-y: auto;
  background-color: #ffffff;
  height: 100%;
  position: relative;

  @media (max-width: 768px) {
    padding: 30px 16px 20px 16px;
    min-height: 100%;
    height: auto;
  }
`;

const MenuButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 5px;
    left: 5px;
    z-index: 1001;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 4px;
    background-color: #4cb3f8;
    color: white;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const EditContent = styled.div`
  width: 100%;
  height: 640px;
  padding: 30px;
  border-radius: 10px;
  background-color: #f5f8fa;

  @media (max-width: 768px) {
    height: auto;
    min-height: 500px;
    padding: 20px 16px;
  }
`;

const TitleSection = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
  }
`;

const TitleEditContainer = styled.div`
  width: 100%;
`;

const TitleEditButtonContainer = styled.div`
  width: 110px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleInput = styled.input<{ hasError: boolean }>`
  width: 100%;
  height: 100%;
  font-size: 24px;
  padding-left: 30px;
  font-weight: bold;
  border: 1px solid ${(props) => (props.hasError ? '#dc3545' : '#dee2e6')};
  border-radius: 4px;
  font-family: 'Noto Sans JP', sans-serif;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${(props) => (props.hasError ? '#dc3545' : '#007bff')};
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    padding-left: 16px;
  }
`;

const BodySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const BodyEditContainer = styled.div`
  width: 100%;
  height: 500px;
  @media (max-width: 768px) {
    height: 450px;
  }
`;

const BodyTextarea = styled.textarea<{ hasError: boolean }>`
  width: 100%;
  height: 500px;
  padding: 30px;
  font-size: 16px;
  border: 1px solid ${(props) => (props.hasError ? '#dc3545' : '#dee2e6')};
  border-radius: 4px;
  font-family: 'Noto Sans JP', sans-serif;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
  background-color: #ffffff;

  &:focus {
    border-color: ${(props) => (props.hasError ? '#dc3545' : '#007bff')};
  }

  @media (max-width: 768px) {
    height: 450px;
    padding: 16px;
    font-size: 14px;
  }
`;

const BodyDisplay = styled.div`
  padding: 30px;
  font-size: 16px;
  width: 100%;
  height: 500px;
  overflow-y: auto;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: #ffffff;
  white-space: pre-wrap;

  @media (max-width: 768px) {
    padding: 16px;
    font-size: 14px;
    height: 450px;
    min-height: 200px;
  }
`;

const BodyEditButtonContainer = styled.div`
  width: 110px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;

const CharacterCount = styled.div`
  font-size: 12px;
  color: #6c757d;
  margin-top: 4px;
  text-align: right;
`;

interface PageEditorProps {
  content: Content | null;
  onSave: (data: UpdateContentDTO) => Promise<void>;
  loading?: boolean;
  onMenuClick?: () => void;
}

export const PageEditor: React.FC<PageEditorProps> = ({
  content,
  onSave,
  loading = false,
  onMenuClick,
}) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);
  const [isBodyEditing, setIsBodyEditing] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  useEffect(() => {
    if (content) {
      setTitle(content.title || '');
      setBody(content.body || '');
      setIsTitleEditing(false);
      setIsBodyEditing(false);
      setErrors({});
    } else {
      setTitle('');
      setBody('');
      setIsTitleEditing(false);
      setIsBodyEditing(false);
      setErrors({});
    }
  }, [content]);

  const handleTitleSave = async () => {
    const titleError = validateTitle(title);

    if (titleError) {
      setErrors((prev) => ({ ...prev, title: titleError.message }));
      return;
    }

    try {
      await onSave({ title });
      setIsTitleEditing(false);
      setErrors((prev) => ({ ...prev, title: undefined }));
    } catch (error) {
      console.error('タイトルの保存に失敗しました:', error);
      alert('タイトルの保存に失敗しました。もう一度お試しください。');
    }
  };

  const handleTitleCancel = () => {
    setTitle(content?.title || '');
    setErrors({});
    setIsTitleEditing(false);
  };

  const handleBodySave = async () => {
    const bodyError = validateBody(body);

    if (bodyError) {
      setErrors((prev) => ({ ...prev, body: bodyError.message }));
      return;
    }

    try {
      await onSave({ body });
      setIsBodyEditing(false);
      setErrors((prev) => ({ ...prev, body: undefined }));
    } catch (error) {
      console.error('本文の保存に失敗しました:', error);
      alert('本文の保存に失敗しました。もう一度お試しください。');
    }
  };

  const handleBodyCancel = () => {
    setBody(content?.body || '');
    setIsBodyEditing(false);
  };

  if (!content) {
    return (
      <EditorContainer>
        <div
          style={{ textAlign: 'center', color: '#6c757d', marginTop: '48px' }}
        >
          左側のサイドバーからページを選択するか、新規ページを作成してください。
        </div>
        {onMenuClick && (
          <MenuButton onClick={onMenuClick} aria-label="メニューを開く">
            <Icon name="edit" size={24} />
          </MenuButton>
        )}
      </EditorContainer>
    );
  }

  return (
    <EditorContainer>
      {onMenuClick && (
        <MenuButton onClick={onMenuClick} aria-label="メニューを開く">
          <Icon name="edit" size={24} />
        </MenuButton>
      )}
      <EditContent>
        <TitleSection>
          {isTitleEditing ? (
            <TitleEditContainer>
              <TitleInput
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) {
                    setErrors((prev) => ({ ...prev, title: undefined }));
                  }
                }}
                placeholder={
                  !title && !isTitleEditing
                    ? '新しいページ'
                    : 'タイトルを入力（1-50文字）'
                }
                maxLength={50}
                hasError={!!errors.title}
                disabled={loading}
              />
              {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
              <CharacterCount>{title.length} / 50</CharacterCount>
            </TitleEditContainer>
          ) : (
            <div
              style={{
                paddingLeft: '30px',
                width: '100%',
                fontSize: '24px',
                fontWeight: 'bold',
                minHeight: '24px',
                border: '1px solid transparent',
                borderRadius: '4px',
              }}
            >
              {title || '新しいページ'}
            </div>
          )}
          {isTitleEditing ? (
            <TitleEditButtonContainer>
              <Button
                onClick={handleTitleCancel}
                size="small"
                type="cancel"
                disabled={loading}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0px',
                  width: '40px',
                }}
                iconName="cancel"
              >
                <span style={{ fontSize: '10px', color: '#FFFFFF' }}>
                  Cancel
                </span>
              </Button>
              <Button
                onClick={handleTitleSave}
                size="small"
                type="edit"
                disabled={loading}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0px',
                  width: '40px',
                }}
                iconName="save"
              >
                <span style={{ fontSize: '10px', color: '#FFFFFF' }}>Save</span>
              </Button>
            </TitleEditButtonContainer>
          ) : (
            <Button
              onClick={() => setIsTitleEditing(true)}
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
        </TitleSection>

        <BodySection>
          {isBodyEditing ? (
            <BodyEditContainer>
              <BodyTextarea
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                  if (errors.body) {
                    setErrors((prev) => ({ ...prev, body: undefined }));
                  }
                }}
                placeholder="本文を入力（10-2000文字）"
                maxLength={2000}
                hasError={!!errors.body}
                disabled={loading}
              />
              {errors.body && <ErrorMessage>{errors.body}</ErrorMessage>}
              <CharacterCount>{body.length} / 2000</CharacterCount>
            </BodyEditContainer>
          ) : (
            <BodyDisplay>{body}</BodyDisplay>
          )}
          {isBodyEditing ? (
            <BodyEditButtonContainer>
              <Button
                onClick={handleBodyCancel}
                size="small"
                type="cancel"
                disabled={loading}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0px',
                  width: '40px',
                }}
                iconName="cancel"
              >
                {/* <Icon name="cancel" size={12} /> */}
                <span style={{ fontSize: '10px', color: '#FFFFFF' }}>
                  Cancel
                </span>
              </Button>
              <Button
                onClick={handleBodySave}
                size="small"
                type="edit"
                disabled={loading}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0px',
                  width: '40px',
                }}
                iconName="save"
              >
                <span style={{ fontSize: '10px', color: '#FFFFFF' }}>Save</span>
              </Button>
            </BodyEditButtonContainer>
          ) : (
            <Button
              onClick={() => setIsBodyEditing(true)}
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
        </BodySection>
      </EditContent>
      <Footer />
    </EditorContainer>
  );
};
