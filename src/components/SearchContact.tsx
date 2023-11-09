/** @jsxImportSource @emotion/react */
import { gql, useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ContactInterface } from "../lib/interface/contact";
import ContactCard from "./ContactList/ContactCard";

const GET_SEARCH_CONTACTS = gql`
  query GetSearchContactList($where: contact_bool_exp) {
    contact(where: $where, order_by: { first_name: asc }) {
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

const containerStyle = css`
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
`;

const listStyle = css`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 12px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SearchContact = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");

  const { data: dataQuery, loading } = useQuery(GET_SEARCH_CONTACTS, {
    variables: {
      where: {
        first_name: { _ilike: `%${query}%` },
      },
    },
  });

  const dataContacts = useMemo<ContactInterface[]>(() => {
    if (dataQuery?.contact) {
      return dataQuery.contact;
    }

    return [];
  }, [dataQuery]);
  return (
    <main css={containerStyle}>
      {!loading && (
        <h2
          css={{
            fontSize: "0.875rem",
            fontWeight: 500,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Result ({dataContacts?.length})
        </h2>
      )}

      {dataContacts.length <= 0 && (
        <h2
          css={{
            fontSize: "0.875rem",
            fontWeight: 500,
            textTransform: "uppercase",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Contact not found
        </h2>
      )}

      {loading ? (
        <div css={{ margin: "0 auto" }}>
          <span className="loader"></span>
        </div>
      ) : (
        <ul css={listStyle}>
          {dataContacts?.map((contact, index) => (
            <li key={index}>
              <ContactCard {...contact} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default SearchContact;
