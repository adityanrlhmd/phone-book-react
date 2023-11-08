import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ModalFormContact, { HandleSubmitFormProps } from "./ModalFormContact";

const ADD_CONTACT = gql`
  mutation AddContactWithPhones(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name
        last_name: $last_name
        phones: { data: $phones }
      }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

const AddContact = ({
  refetchContactList,
}: {
  refetchContactList: () => void;
}) => {
  const navigate = useNavigate();

  const [addContact, { loading }] = useMutation(ADD_CONTACT);

  const handleSubmit = ({ name, phoneNumber }: HandleSubmitFormProps) => {
    addContact({
      variables: {
        first_name: name.firstName,
        last_name: name.lastName,
        phones: phoneNumber,
      },
    })
      .then(() => {
        navigate("/");
        refetchContactList();
        toast.success("Contact has been created!");
      })
      .catch(() => {
        toast.error("Contact has not been created!");
      });
  };

  return (
    <ModalFormContact handleSubmit={handleSubmit} isLoadSubmit={loading} />
  );
};

export default AddContact;
