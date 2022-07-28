import Input from "./Input";
import Button from "./Button";
import SelectOption from "./SelectOption";
import { BsPersonFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import toast from "react-hot-toast";

function Form() {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    gender: "",
  });

  const notifyS = (msg) => {
    toast.success(msg);
  };

  const notifyE = (msg) => {
    toast.error(msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, auth.currentUser.email), {
        ...contact,
        timestamp: serverTimestamp(),
      });
      setContact({
        name: "",
        phone: "",
        gender: "",
      });
      notifyS("Sussessfully added");
    } catch (e) {
      notifyE(`Error adding document: ${e}`);
    }
  };

  return (
    <div className="md:mr-4 mb-4 w-[90vw] md:max-w-xs">
      <h1 className="w-full text-center text-2xl bg-slate-400 rounded-xl shadow-2xl mb-4">
        ADD CONTACT
      </h1>

      <form
        className="bg-slate-400 shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="flex bg-white px-2 py-2 rounded-lg my-2 focus-within:bg-orange-100 focus-within:ring-4">
          <BsPersonFill className="text-slate-400 text-2xl group-focus:text-black" />
          <Input
            type="text"
            name="first"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            placeholder="Name"
            required={true}
            className="outline-none w-full pl-2 focus:bg-orange-100"
          />
        </div>

        <div className="flex bg-white px-2 py-2 rounded-lg my-2 focus-within:bg-orange-100 focus-within:ring-4">
          <BsFillTelephoneFill className="text-slate-400 text-2xl group-focus:text-black" />
          <Input
            type="Phone number"
            name="phone"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            placeholder="Phone number"
            required={true}
            className="outline-none w-full pl-2 focus:bg-orange-100"
          />
        </div>
        <SelectOption
          className="flex bg-white px-2 py-2 rounded-lg my-2 focus-within:bg-orange-100 w-full focus-within:ring-4"
          value={contact.gender}
          onChange={(e) => setContact({ ...contact, gender: e.target.value })}
          required
        />
        <Button
          className="w-full bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600"
          children={"ADD"}
          type="submit"
        />
      </form>
    </div>
  );
}

export default Form;
