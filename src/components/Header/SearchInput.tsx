/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FormEvent, useState } from "react";
import { MdClose, MdOutlineSearch } from "react-icons/md";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const isSearchPage = useMatch({ path: "/search" });
  const [searchString, setSearchString] = useState("");
  const [, setSearchParams] = useSearchParams();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSearchPage) {
      setSearchParams((params) => {
        params.set("q", searchString);
        return params;
      });
    } else {
      navigate(`/search?q=${searchString}`);
    }
  }

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <button type="submit" css={{ display: "flex", alignItems: "center" }}>
        <MdOutlineSearch color="#5f6368" size={24} />
      </button>

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
