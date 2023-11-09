/** @jsxImportSource @emotion/react */
import { gql, useMutation } from "@apollo/client";
import { useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { ContextContactType } from ".";
import { ContactInterface } from "../../lib/interface/contact";
import ModalFormContact, { HandleSubmitFormProps } from "../ModalFormContact";

const UPDATE_NAME = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

const UPDATE_PHONE = gql`
  mutation EditPhoneNumber(
    $pk_columns: phone_pk_columns_input!
    $phone_number: String!
  ) {
    update_phone_by_pk(
      pk_columns: $pk_columns
      _set: { number: $phone_number }
    ) {
      contact {
        id
        last_name
        first_name
        created_at
        phones {
          number
        }
      }
    }
  }
`;

const UPDATE_ADD_PHONE = gql`
  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {
    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {
      returning {
        contact {
          id
          last_name
          first_name
          phones {
            number
          }
        }
      }
    }
  }
`;

const ContactEdit = () => {
  const navigate = useNavigate();
  const { dataContact, loading, refetchContactDetail } =
    useOutletContext<ContextContactType>();

  const [favoriteContacts, setFavoriteContacts] = useLocalStorage<
    ContactInterface[]
  >("favoriteContacts", []);

  const [updateContactName, { loading: loadingUpdateName }] =
    useMutation(UPDATE_NAME);
  const [updateContactPhone, { loading: loadingUpdatePhone }] =
    useMutation(UPDATE_PHONE);
  const [updateContactAddPhone, { loading: loadingUpdateAddPhone }] =
    useMutation(UPDATE_ADD_PHONE);

  const isFavorite = useMemo<boolean>(() => {
    return (
      favoriteContacts?.some((item) => item.id === dataContact?.id) ?? false
    );
  }, [dataContact, favoriteContacts]);

  const handleSubmit = async ({ name, phoneNumber }: HandleSubmitFormProps) => {
    if (!dataContact) {
      return null;
    }
    const updateName = updateContactName({
      variables: {
        id: dataContact?.id,
        _set: {
          first_name: name.firstName,
          last_name: name.lastName,
        },
      },
    });

    const listDataPhones = phoneNumber;

    const dataUpdatePhone: { number: string }[] = listDataPhones.slice(
      0,
      dataContact.phones.length
    );

    const dataAddPhone: { number: string }[] = listDataPhones.slice(
      dataUpdatePhone.length,
      listDataPhones.length
    );

    const updatePhone = dataUpdatePhone.map((item, index) =>
      updateContactPhone({
        variables: {
          pk_columns: {
            number: dataContact?.phones[index].number,
            contact_id: dataContact?.id,
          },
          phone_number: item.number,
        },
      })
    );

    const updateAddPhone = dataAddPhone.map((item) =>
      updateContactAddPhone({
        variables: {
          contact_id: dataContact?.id,
          phone_number: item.number,
        },
      })
    );

    try {
      await Promise.all([updateName, ...updatePhone, ...updateAddPhone]);
      if (isFavorite) {
        setFavoriteContacts((prevValue: ContactInterface[]) =>
          prevValue.map((item: ContactInterface) => {
            if (item.id === dataContact.id) {
              return {
                ...item,
                first_name: name.firstName,
                last_name: name.lastName,
                phones: item.phones
                  .map((phone, index) => {
                    if (dataUpdatePhone[index]) {
                      return {
                        ...phone,
                        number: dataUpdatePhone[index].number,
                      };
                    }
                    return phone;
                  })
                  .concat(dataAddPhone),
              };
            }
            return item;
          })
        );
      }
      refetchContactDetail();
      navigate(-1);
      toast.success("Contact has been updated!");
    } catch (error) {
      toast.error("Contact has not been updated!");
    }
  };

  return (
    <ModalFormContact
      defaultName={{
        firstName: dataContact?.first_name || "",
        lastName: dataContact?.last_name || "",
      }}
      defaultPhoneNumber={dataContact?.phones || []}
      isLoading={loading}
      handleSubmit={handleSubmit}
      isLoadSubmit={
        loadingUpdateName || loadingUpdatePhone || loadingUpdateAddPhone
      }
    />
  );
};

export default ContactEdit;
