/** @jsxImportSource @emotion/react */
import { gql, useMutation, useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { useMemo } from "react";
import ContentLoader from "react-content-loader";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { ContactInterface } from "../../lib/interface/contact";

export type ContextContactType = {
  dataContact: ContactInterface | null;
  loading: boolean;
  refetchContactDetail: () => void;
};

const containerStyle = css`
  height: 100%;
  padding: 2rem;
  background-color: white;
  margin-top: -80px;
  z-index: 10;
  flex-grow: 1;
`;

const GET_CONTACT_DETAIL = gql`
  query GetContactDetail($id: Int!) {
    contact_by_pk(id: $id) {
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

const DELETE_CONTACT = gql`
  mutation DeleteContact($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

export default function ContactView({
  refetchContactList,
}: {
  refetchContactList: () => void;
}) {
  const params = useParams();
  const navigate = useNavigate();

  const [favoriteContacts, setFavoriteContacts] = useLocalStorage<
    ContactInterface[]
  >("favoriteContacts", []);

  const {
    data: dataQuery,
    loading,
    refetch: refetchContactDetail,
  } = useQuery(GET_CONTACT_DETAIL, {
    variables: {
      id: parseInt(params.id!),
    },
  });

  const [deleteContact] = useMutation(DELETE_CONTACT);

  const dataContact = useMemo<ContactInterface | null>(() => {
    if (dataQuery?.contact_by_pk) {
      return dataQuery.contact_by_pk;
    }

    return null;
  }, [dataQuery]);

  const isFavorite = useMemo<boolean>(() => {
    return favoriteContacts.some((item) => item.id === dataContact?.id);
  }, [dataContact, favoriteContacts]);

  const toggleFavorite = (contact: ContactInterface) => {
    if (isFavorite) {
      setFavoriteContacts((prevValue: ContactInterface[]) =>
        prevValue.filter((item) => item.id !== contact.id)
      );
    } else {
      setFavoriteContacts((prevValue: ContactInterface[]) => [
        ...prevValue,
        contact,
      ]);
    }
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "1440px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      <header css={{ position: "relative" }}>
        {loading ? (
          <ContentLoader
            speed={2}
            width={"100%"}
            height={272}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="272" />
          </ContentLoader>
        ) : (
          <img
            css={{
              opacity: 0.5,
              filter: "blur(4px)",
              width: "100%",
              height: "272px",
              objectFit: "cover",
            }}
            src={`https://ui-avatars.com/api/?name=${dataContact?.first_name}%20${dataContact?.last_name}&background=random&size=262&font-size=0.4`}
          />
        )}
      </header>

      <main css={containerStyle}>
        <section
          css={{
            display: "flex",
            gap: 16,
            marginTop: -90,
            flexDirection: "column",
            paddingBottom: "2rem",
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          <div
            css={{
              position: "relative",
              borderRadius: "100%",
              width: 150,
              height: 150,
            }}
          >
            {!loading ? (
              <img
                css={{
                  borderRadius: "100%",
                  width: 150,
                  height: 150,
                }}
                src={`https://ui-avatars.com/api/?name=${dataContact?.first_name}%20${dataContact?.last_name}&background=random&size=262&font-size=0.4`}
              />
            ) : (
              <ContentLoader
                speed={2}
                width={150}
                height={150}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <circle cx="77" cy="77" r="74" />
              </ContentLoader>
            )}
          </div>

          <div
            css={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {!loading ? (
              <div css={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h1
                  css={{
                    fontSize: "1.5rem",
                    fontWeight: 500,
                  }}
                >
                  {dataContact?.first_name} {dataContact?.last_name}
                </h1>
              </div>
            ) : (
              <ContentLoader
                speed={2}
                width={200}
                height={30}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="4" ry="4" width="100%" height="30" />
              </ContentLoader>
            )}

            <div
              css={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
              }}
            >
              <button
                type="button"
                onClick={() => toggleFavorite(dataContact!)}
                disabled={!dataContact}
                css={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem 0.8rem",
                  borderRadius: "5px",
                  background: "#f1f3f4",
                  fontSize: "0.875rem",
                  width: "100%",
                  maxWidth: 200,
                  gap: 4,
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  css={{
                    fontSize: "1.1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {isFavorite ? <AiFillStar /> : <AiOutlineStar />}
                </span>
                {isFavorite ? "Hapus Favorit" : "Favorit"}
              </button>

              <button
                type="button"
                disabled={!dataContact}
                onClick={() => navigate(`/contact/${params.id}/edit`)}
                css={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem 0.8rem",
                  borderRadius: "5px",
                  background: "#f1f3f4",
                  fontSize: "0.875rem",
                  width: "100%",
                  maxWidth: 200,
                  whiteSpace: "nowrap",
                }}
              >
                <MdOutlineModeEditOutline
                  style={{ marginRight: 8 }}
                  size={18}
                />
                Edit Contact
              </button>

              <div className="flex justify-end items-end">
                <button
                  disabled={!dataContact}
                  onClick={() => {
                    if (confirm("Delete contact?")) {
                      deleteContact({
                        variables: {
                          id: parseInt(params.id!),
                        },
                      }).then(() => {
                        refetchContactList();
                        navigate("/");
                      });
                    }
                  }}
                  css={{
                    display: "flex",
                    alignItems: "center",
                    color: "#d44235",
                  }}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          </div>
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
      </main>
    </div>
  );
}
