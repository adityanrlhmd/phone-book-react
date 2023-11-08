/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { ContactInterface } from "../../lib/interface/contact";

const ContactCardFavorite = ({
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
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 60px;
      `}
    >
      <img
        css={{
          borderRadius: "100%",
          width: "3rem",
          height: "3rem",
        }}
        src={`https://ui-avatars.com/api/?name=${first_name}%20${last_name}&background=random&size=262&font-size=0.4`}
      />

      <p
        css={css`
          overflow: hidden;
          text-transform: capitalize;
          text-overflow: ellipsis;
          width: 60px;
          white-space: nowrap; 
        `}
      >{`${first_name}`}</p>
    </article>
  );
};

export default ContactCardFavorite;
