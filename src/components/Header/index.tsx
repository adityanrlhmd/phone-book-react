/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { LuPlus } from "react-icons/lu";
import { useMatch } from "react-router-dom";
import SearchInput from "./SearchInput";

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

const Header = () => {
  const isHomePage = useMatch({ path: "/" });

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

        {isHomePage && (
          <button
            css={{
              alignItems: "center",
              gap: 8,
              backgroundColor: "white",
              padding: "0.25rem 0.7rem 0.25rem 0.5rem",
              fontSize: "0.875rem",
              borderRadius: "10px",
              boxShadow: "-1px 1px 4px 1px rgba(0, 0, 0, 0.2)",
              display: "none",
              "@media (min-width: 768px)": {
                display: "flex",
              },
            }}
          >
            <span
              css={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.8rem",
              }}
            >
              <LuPlus />
            </span>
            <span css={{ display: "flex", alignItems: "center" }}>
              Add contact
            </span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
