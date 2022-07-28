import TableBodyRow from "./TableBodyRow";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function TableBody() {
  const [contacts, setContacts] = useState([]);
  const [parent] = useAutoAnimate(/* optional config */);

  const getContactsOnSnapshot = async () => {
    const q = query(
      collection(db, auth.currentUser.email),
      orderBy("timestamp", "asc")
    );
    onSnapshot(q, (snapshot) => {
      const contacts = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setContacts(contacts);
    });
  };

  useEffect(() => {
    getContactsOnSnapshot();
  }, []);

  return (
    <tbody ref={parent} className="bg-slate-400">
      {contacts.map((contact, index) => (
        <TableBodyRow key={contact.id} {...contact} num={index + 1} />
      ))}
    </tbody>
  );
}

export default TableBody;
