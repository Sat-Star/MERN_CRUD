import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Contacts from './Contacts';
import AddContact from './AddContact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [reload, setReload] = useState(false);
  const [id, setId] = useState(false);

  const url = "http://localhost:2000";

  useEffect(() => {
    const fetchData = async () => {
      const api = await axios.get(`${url}/`, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      console.log(api.data.contact);
      setContacts(api.data.contact);

    }
    fetchData();
  }, [reload])

  const handleModal = () => {
    setshowModal(!showModal);
    setOpacity(!opacity);
  };

  return (
    <>
      <ToastContainer />
      <AddContact
        handleModal={handleModal}
        showModal={showModal}
        url={url}
        reload={reload}
        setReload={setReload}
        id={id} setId={setId}
        contacts={contacts} />

      <Contacts
        contacts={contacts}
        opacity={opacity}
        url={url}
        reload={reload}
        setReload={setReload}
        setId={setId}
        handleModal={handleModal} />
    </>
  )
}

export default App;