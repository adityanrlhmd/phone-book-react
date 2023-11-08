/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { MdClose, MdOutlineSearch } from "react-icons/md";

const formStyle = css`
  background-color: #f1f3f4;
  &:focus-within {
    background-color: white;
    box-shadow: -1px 1px 4px 1px rgba(0, 0, 0, 0.2);
  }
  transition: all 0.5s ease-in-out;
  border-radius: 8px;
  padding: 8px 16px;
  gap: 8px;
  position: relative;
  display: flex;
  align-items: center;
  width: 400px;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const SearchInput = () => {
  const [searchString, setSearchString] = useState("");

  return (
    <form css={formStyle} onSubmit={(e) => e.preventDefault()}>
      <MdOutlineSearch className="shrink-0" color="#5f6368" size={22} />
      <input
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        css={{
          border: 0,
          outline: 0,
          background: "transparent",
          width: "100%",
        }}
        placeholder="Search"
      />
      <button
        type="reset"
        disabled={searchString === ""}
        onClick={() => setSearchString("")}
        css={css`
          height: content-fit;
          display: flex;
          align-items: center;
          ${searchString === "" && `display: none;`}
        `}
      >
        <MdClose color="#5f6368" size={22} />
      </button>
    </form>
  );
};

export default SearchInput;
