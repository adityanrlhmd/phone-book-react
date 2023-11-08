/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SearchInput from "./SearchInput";

const Header = () => {
  const containerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    max-width: 1440px;
    margin: 0 auto;
    gap: 8px;
    @media (max-width: 640px) {
      flex-direction: column;
      align-items: center;
    }
  `;

  return (
    <header
      css={{
        backgroundColor: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div css={containerStyle}>
        <a href="/">
          <h1 css={{ fontSize: "1.5rem", textAlign: "center" }}>Phone Book</h1>
        </a>
        <SearchInput />
      </div>
    </header>
  );
};

export default Header;
