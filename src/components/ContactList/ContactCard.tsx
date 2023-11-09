/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { ContactInterface } from "../../lib/interface/contact";

const ContactCard = ({
  id,
  first_name,
  last_name,
}: ContactInterface) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => {
        navigate(`/contact/${id}`);
      }}
      role="button"
      css={css`
        cursor: pointer;
        position: relative;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        border-radius: 10px;
        border: 1px solid #E0E0E0;
        transition: all 0.5s ease-in-out;
        &:hover {
          background-color: white;
          box-shadow: -1px 1px 4px 1px rgba(0, 0, 0, 0.2);
        }
      `}
    >
      <img
        css={{
          borderRadius: "100%",
          width: "5rem",
          height: "5rem",
        }}
        src={
          `https://ui-avatars.com/api/?name=${first_name}%20${last_name}&background=random&size=262&font-size=0.4`
        }
      />

      <span
        css={{ textTransform: "capitalize" }}
      >{`${first_name} ${last_name}`}</span>
    </article>
  );
};

export default ContactCard;
