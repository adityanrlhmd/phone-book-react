/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MdOutlinePhone } from "react-icons/md";
import { Outlet, useOutletContext } from "react-router-dom";
import { ContextContactType } from ".";
import ContentLoader from "react-content-loader";

const listStyle = css`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 12px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const PhoneList = () => {
  const { dataContact, loading, refetchContactDetail } =
    useOutletContext<ContextContactType>();

  return (
    <>
      <section css={{ padding: "2rem 0px", width: "100%" }}>
        {loading ? (
          <ul css={listStyle}>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <li css={{ width: "100%" }} key={index}>
                  <ContentLoader
                    speed={2}
                    width={"100%"}
                    height={61}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="0" y="0" rx="7" ry="7" width="100%" height="61" />
                  </ContentLoader>
                </li>
              ))}
          </ul>
        ) : (
          <ul css={listStyle}>
            {dataContact?.phones.map((phone, index) => (
              <li
                key={index}
                css={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  border: "1px solid #E0E0E0",
                  padding: "0.5rem 0.8rem",
                  borderRadius: "10px",
                }}
              >
                <span
                  css={{ opacity: 0.36, display: "flex", alignItems: "center" }}
                >
                  <MdOutlinePhone size={24} />
                </span>

                <div css={{ display: "flex", flexDirection: "column" }}>
                  <span css={{ opacity: 0.36, fontSize: "0.75rem" }}>
                    Phone {index + 1}
                  </span>

                  <a href={`tel:${phone.number}`} target="_blank">
                    {phone.number}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Outlet
        context={
          {
            dataContact,
            loading,
            refetchContactDetail,
          } satisfies ContextContactType
        }
      />
    </>
  );
};

export default PhoneList;
