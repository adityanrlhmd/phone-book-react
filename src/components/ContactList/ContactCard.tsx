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
        padding: 25px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        border-radius: 10px;
        border: 1px solid #E0E0E0;
        &:hover {
          background: #f5f5f5;
          .action-btn {
            visibility: visible;
          }
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
