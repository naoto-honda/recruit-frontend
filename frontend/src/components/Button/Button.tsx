import styled from 'styled-components';
import { Icon } from '../Icon/Icon';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'edit' | 'done' | 'cancel';
  style?: React.CSSProperties;
  iconName?: '+' | 'delete' | 'edit' | 'save' | 'cancel' | 'done' | 'logo';
  iconSize?: number;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: ${(props) => {
    if (props.size === 'small') return '40px';
    if (props.size === 'medium') return '60px';
    if (props.size === 'large') return '80px';
  }}
  font-size: ${(props) => {
    if (props.size === 'small') return '10px';
    if (props.size === 'large') return '14px';
    return '14px';
  }};
  font-family: 'Noto Sans JP', sans-serif;
  border: ${(props) => {
    if (props.type === 'done') return '2px solid #4CB3F8';
    return 'none';
  }};
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: opacity 0.2s;
  background-color: ${(props) => {
    if (props.disabled) return '#C8E6FA';
    if (props.type === 'edit') return '#4CB3F8';
    if (props.type === 'done') return '#FFFFFF';
    if (props.type === 'cancel') return '#B3B3B3';
    return '#6c757d';
  }};
  color: ${(props) => {
    if (props.type === 'edit') return '#ffffff';
    if (props.type === 'done') return '#4CB3F8';
    return '#ffffff';
  }}
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  &:hover {
    // background-color: ${(props) => (props.disabled ? '#C8E6FA' : '#3c8ec4')};
    background-color: ${(props) => {
      if (props.disabled) return '#C8E6FA';
      if (props.type === 'edit') return '#3c8ec4';
      if (props.type === 'done') return '#CCCCCC';
      if (props.type === 'cancel') return '#999999';
    }}
  }

  &:active {
    // background-color: ${(props) => (props.disabled ? '#C8E6FA' : '#347cab')};
    background-color: ${(props) => {
      if (props.disabled) return '#C8E6FA';
      if (props.type === 'edit') return '#347cab';
      if (props.type === 'done') return '#B3B3B3';
      if (props.type === 'cancel') return '#808080';
    }};
  }
`;

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  onClick,
  children,
  disabled = false,
  type = 'edit',
  style,
  iconName,
}) => {
  return (
    <StyledButton
      size={size}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={style}
    >
      {iconName && <Icon name={iconName} />}
      {children}
    </StyledButton>
  );
};
