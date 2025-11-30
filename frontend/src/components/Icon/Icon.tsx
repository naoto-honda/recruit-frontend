import styled from 'styled-components';

interface IconProps {
  name: '+' | 'delete' | 'edit' | 'save' | 'cancel' | 'done' | 'logo';
  size?: number;
  onClick?: () => void;
  className?: string;
}

const IconContainer = styled.span<{ size: number; clickable: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

/**
 * アイコンコンポーネント
 * Design/img/icon/ のSVGアイコンを使用
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  onClick,
  className,
}) => {
  const iconPath = `../../../public/img/icon/${name}.svg`;

  return (
    <IconContainer
      size={size}
      clickable={!!onClick}
      onClick={onClick}
      className={className}
    >
      <img src={iconPath} alt={name} sizes={`${size}px`} />
    </IconContainer>
  );
};
