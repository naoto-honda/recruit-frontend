import { styled } from 'styled-components';

const FooterContainer = styled.footer`
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: NotoSansJP-Regular;
  font-size: 12px;
  color: #333333;
  letter-spacing: 0;
  font-weight: 400;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 500;
  background-color: #ffffff;
  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    margin: 20px 0 0 0;
    padding: 0 16px;
  }
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>Copyright © 2021 Sample</p>
      <p>運営会社</p>
    </FooterContainer>
  );
};
