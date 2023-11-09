/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useMemo } from "react";
import ContentLoader from "react-content-loader";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
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

interface DataContact {
  perPageContacts: ContactInterface[];
  allContacts: ContactInterface[];
}

const ContactsList = ({
  dataAllQuery,
  dataQuery,
  setCurrentPage,
  pageSize,
  loadingQuery,
  loadingAllQuery,
}: {
  dataAllQuery?: { contact: ContactInterface[] };
  dataQuery?: { contact: ContactInterface[] };
  loadingQuery?: boolean;
  loadingAllQuery?: boolean;
  setCurrentPage: (pageNumber: number) => void;
  pageSize: number;
}) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [favoriteContacts, setFavoriteContacts] = useLocalStorage<
    ContactInterface[]
  >("favoriteContacts", []);

  const currentPage = Number(searchParams.get("page")) || 1;
  const loading = loadingAllQuery || loadingQuery;

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage, setCurrentPage]);

  useEffect(() => {
    if (dataAllQuery?.contact) {
      setFavoriteContacts((prevValue: ContactInterface[]) =>
        prevValue.filter((favoriteItem) =>
          dataAllQuery?.contact.some(
            (item: ContactInterface) => item.id === favoriteItem.id
          )
        )
      );
    }
  }, [dataAllQuery, setFavoriteContacts]);

  const dataContacts = useMemo<DataContact>(() => {
    // const perPageContactsWithoutFavorite = dataQuery?.contact.filter(
    //   (item) => !favoriteContacts.some((favorite) => favorite.id === item.id)
    // );

    return {
      perPageContacts: dataQuery?.contact ?? [],
      allContacts: dataAllQuery?.contact ?? [],
    };
  }, [dataQuery, dataAllQuery]);

  const onPageChange = (pageNumber: number) => {
    setSearchParams((params) => {
      params.set("page", `${pageNumber}`);
      return params;
    });
  };

  return (
    <>
      {dataContacts.allContacts.length <= 0 && !loading ? (
        <h2
          css={{
            fontSize: "1.25rem",
            fontWeight: 500,
            textTransform: "uppercase",
            marginBottom: 12,
            textAlign: "center",
            margin: "20px 0",
          }}
        >
          Please Add a Contact
        </h2>
      ) : (
        <main css={containerStyle}>
          {favoriteContacts?.length > 0 && (
            <section
              css={{
                padding: "12px 0px",
                width: "100%",
              }}
            >
              {!loading && (
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
              )}

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
                {loadingAllQuery
                  ? Array(7)
                      .fill(0)
                      .map((_, index) => (
                        <li css={{ width: "48" }} key={index}>
                          <ContentLoader
                            speed={2}
                            width={48}
                            height={48}
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <circle cx="24" cy="24" r="24" />
                          </ContentLoader>
                        </li>
                      ))
                  : favoriteContacts.map((contact, index) => (
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
            {!loading && (
              <h2
                css={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Contacts ({dataContacts?.allContacts.length})
              </h2>
            )}

            <ul css={listStyle}>
              {loading
                ? Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <li css={{ width: "100%" }} key={index}>
                        <ContentLoader
                          speed={2}
                          width={"100%"}
                          height={122}
                          backgroundColor="#f3f3f3"
                          foregroundColor="#ecebeb"
                        >
                          <rect
                            x="0"
                            y="0"
                            rx="7"
                            ry="7"
                            width="100%"
                            height="122"
                          />
                        </ContentLoader>
                      </li>
                    ))
                : dataContacts.perPageContacts.map((contact, index) => (
                    <li key={index}>
                      <ContactCard {...contact} />
                    </li>
                  ))}
            </ul>

            <div
              css={{
                marginTop: 24,
                marginBottom: 60,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                currentPage={currentPage}
                itemsPerPage={pageSize}
                onPageChange={onPageChange}
                totalItems={dataContacts.allContacts.length}
                pageNeighbours={1}
                withProgressBar={true}
              />
            </div>
          </section>
        </main>
      )}

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
          padding: 16,
          borderRadius: "100%",
          boxShadow: "-1px 1px 4px 1px rgba(0, 0, 0, 0.2)",
          "@media (min-width: 768px)": {
            display: "none",
          },
        }}
      >
        <BsFillPersonPlusFill size={28} />
      </button>

      <Outlet />
    </>
  );
};

export default ContactsList;
