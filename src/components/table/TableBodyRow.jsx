import TableBodyRowCol from "./TableBodyRowCol";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useState } from "react";
import Modal from "../form/Modal";
import toast from "react-hot-toast";

function TableBodyRow({ num, name, phone, gender, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState("");

  async function remove(e) {
    const id = e.target.id ? e.target.id : e.target.parentElement.id;
    const selectedDoc = doc(db, auth.currentUser.email, id);
    await deleteDoc(selectedDoc);
  }

  const notifyS = (msg) => {
    toast.success(msg);
  };

  const notifyE = (msg) => {
    toast.error(msg);
  };

  async function handleEdit(newInfo) {
    const id = currentId;
    const selectedDoc = doc(db, auth.currentUser.email, id);
    try {
      await updateDoc(selectedDoc, newInfo);
      setIsEditing(false);
      notifyS("Contact updated successfully");
    } catch (error) {
      notifyE(`Error updating contact: ${error}`);
    }
  }

  const closeModal = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing && <Modal onClick={closeModal} onEdit={handleEdit} />}
      <tr>
        <TableBodyRowCol children={num} />
        <TableBodyRowCol children={name} />
        <TableBodyRowCol children={phone} />
        <TableBodyRowCol
          children={
            window.innerWidth > "768" ? gender : gender.toUpperCase()[0]
          }
        />
        <TableBodyRowCol>
          <MdOutlineDeleteForever
            className="text-red-300 text-2xl cursor-pointer hover:scale-150 transition-all ease-in-out hover:transition-all hover:ease-in-out mx-auto md:mx-0"
            id={id}
            onClick={remove}
          />
        </TableBodyRowCol>
        <TableBodyRowCol>
          <MdEdit
            className=" text-green-300 text-2xl cursor-pointer hover:scale-150 transition-all ease-in-out hover:transition-all hover:ease-in-out mx-auto md:mx-0"
            id={id}
            onClick={() => {
              setIsEditing(true);
              setCurrentId(id);
            }}
          />
        </TableBodyRowCol>
      </tr>
    </>
  );
}

export default TableBodyRow;
