import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactList";
import ContactView from "./components/ContactView";
import ContactEdit from "./components/ContactView/ContactEdit";
import PhoneList from "./components/ContactView/PhoneList";
import AddContact from "./components/AddContact";
import { Toaster } from "sonner";
import { gql, useQuery } from "@apollo/client";
import Header from "./components/Header";

const GET_CONTACTS = gql`
  query GetContactList {
    contact(order_by: { first_name: asc }) {
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

function App() {
  const {
    data: dataQuery,
    loading,
    refetch: refetchContactList,
  } = useQuery(GET_CONTACTS);

  return (
    <BrowserRouter>
      <Toaster richColors expand={false} />
      <Header />
      <Routes>
        <Route
          path="/"
          element={<ContactsList dataQuery={dataQuery} loading={loading} />}
        >
          <Route
            path="/add-contact"
            element={<AddContact refetchContactList={refetchContactList} />}
          />
        </Route>
        <Route
          path="/contact/:id"
          element={<ContactView refetchContactList={refetchContactList} />}
        >
          <Route path="/contact/:id" element={<PhoneList />}>
            <Route path="/contact/:id/edit" element={<ContactEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
