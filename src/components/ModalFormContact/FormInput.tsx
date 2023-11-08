/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { FaTrash } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";

const wrapInputStyle = css`
  background-color: #f1f3f4;
  &:focus-within {
    box-shadow: -1px 1px 4px 1px rgba(0, 0, 0, 0.2);
  }
  transition: all 0.5s ease-in-out;
  border-radius: 8px;
  padding: 10px 16px;
  gap: 4px;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const inputStyle = css`
  border: 0;
  outline: 0;
  background: transparent;
  width: 100%;
  font-size: 0.875rem;
`;

const FormInput = ({
  value,
  onChange,
  name,
  label,
  placeholder,
  type = "name",
  isShowRemoveBtn,
  onClickRemoveBtn,
}: {
  type?: "name" | "phoneNumber";
  isShowRemoveBtn?: boolean;
  placeholder: string;
  value: string;
  name: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClickRemoveBtn?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div css={{ width: "100%" }}>
      <label css={{ fontSize: "0.875rem" }}>{label}</label>
      <div css={wrapInputStyle}>
        {type === "name" ? (
          <input
            type="text"
            value={value}
            onChange={onChange}
            css={inputStyle}
            name={name}
            placeholder={placeholder}
          />
        ) : (
          <>
            <span
              css={{
                opacity: 0.56,
                marginRight: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <MdOutlinePhone size={20} />
            </span>

            {isShowRemoveBtn && (
              <button
                type="button"
                css={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  right: 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={onClickRemoveBtn}
              >
                <FaTrash size={14} />
              </button>
            )}

            <input
              type="number"
              value={value}
              onChange={onChange}
              css={inputStyle}
              name={name}
              placeholder={placeholder}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FormInput;
