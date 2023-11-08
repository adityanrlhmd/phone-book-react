/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useMemo } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { ContactInterface } from "../../lib/interface/contact";
import ContactCard from "./ContactCard";
import ContactCardFavorite from "./ContactCardFavorite";

const containerStyle = css`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 0 20px 0;
`;

const listStyle = css`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 12px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ContactsList = ({
  dataQuery,
  loading,
}: {
  dataQuery?: { contact: ContactInterface[] };
  loading?: boolean;
}) => {
  const navigate = useNavigate();

  const [favoriteContacts, setFavoriteContacts] = useLocalStorage<
    ContactInterface[]
  >("favoriteContacts", []);

  useEffect(() => {
    if (dataQuery?.contact) {
      setFavoriteContacts((prevValue: ContactInterface[]) =>
        prevValue.filter((favoriteItem) =>
          dataQuery?.contact.some(
            (item: ContactInterface) => item.id === favoriteItem.id
          )
        )
      );
    }
  }, [dataQuery, setFavoriteContacts]);

  const dataContacts = useMemo<ContactInterface[]>(() => {
    if (dataQuery?.contact) {
      return dataQuery.contact;
    }

    return [];
  }, [dataQuery]);

  return (
    <>
      {loading && "Loading"}
      <main css={containerStyle}>
        {favoriteContacts?.length > 0 && (
          <section
            css={{
              padding: "12px 0px",
              width: "100%",
            }}
          >
            <h2
              css={{
                padding: "0px 20px",
                fontSize: "0.875rem",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              Favorite
            </h2>

            <ul
              css={{
                listStyleType: "none",
                display: "flex",
                gap: "12px",
                width: "100%",
                overflowY: "auto",
                padding: "12px 20px",
                "&::-webkit-scrollbar": {
                  width: 0,
                  height: 0,
                },
              }}
            >
              {favoriteContacts.map((contact, index) => (
                <li key={index}>
                  <ContactCardFavorite {...contact} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section
          css={{
            padding: "12px 20px",
            width: "100%",
          }}
        >
          <h2
            css={{
              fontSize: "0.875rem",
              fontWeight: 500,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Contacts ({dataContacts?.length})
          </h2>

          <ul css={listStyle}>
            {dataContacts?.map((contact, index) => (
              <li key={index}>
                <ContactCard {...contact} />
              </li>
            ))}
          </ul>
        </section>
      </main>

      <button
        type="button"
        onClick={() => navigate(`/add-contact`)}
        css={{
          position: "fixed",
          bottom: 30,
          right: 30,
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          padding: 12,
          borderRadius: "100%",
          boxShadow: "-1px 1px 4px 1px rgba(0, 0, 0, 0.2)",
        }}
      >
        <BsFillPersonPlusFill size={28} />
      </button>

      <Outlet />
    </>
  );
};

export default ContactsList;
