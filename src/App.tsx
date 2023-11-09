import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AddContact from "./components/AddContact";
import ContactsList from "./components/ContactList";
import ContactView from "./components/ContactView";
import ContactEdit from "./components/ContactView/ContactEdit";
import PhoneList from "./components/ContactView/PhoneList";
import Header from "./components/Header";
import SearchContact from "./components/SearchContact";

const GET_CONTACTS = gql`
  query GetContactList($offset: Int!, $limit: Int!) {
    contact(offset: $offset, limit: $limit, order_by: { first_name: asc }) {
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

const GET_ALL_CONTACTS = gql`
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
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  const offset = (currentPage - 1) * pageSize;
  const limit = pageSize;

  const {
    data: dataAllQuery,
    loading: loadingAllQuery,
    refetch: refetchQueryAll,
  } = useQuery(GET_ALL_CONTACTS);

  const {
    data: dataQuery,
    loading: loadingQuery,
    refetch: refetchQuery,
  } = useQuery(GET_CONTACTS, {
    variables: { offset, limit },
  });

  const refetchContactList = () => {
    refetchQuery();
    refetchQueryAll();
  };

  return (
    <BrowserRouter>
      <Toaster
        richColors
        expand={false}
        duration={2000}
        position="top-center"
      />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ContactsList
              dataQuery={dataQuery}
              dataAllQuery={dataAllQuery}
              loadingAllQuery={loadingAllQuery}
              loadingQuery={loadingQuery}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
            />
          }
        >
          <Route
            path="/add-contact"
            element={<AddContact refetchContactList={refetchContactList} />}
          />
        </Route>
        <Route path="/search" element={<SearchContact />} />
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
