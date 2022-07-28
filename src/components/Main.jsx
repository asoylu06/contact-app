import Form from "./form/Form";
import Table from "./table/Table";
import NavIcon from "./NavIcon";
import Reset from "./form/Reset";
import { useEffect, useState } from "react";
import Login from "./form/Login";
import Register from "./form/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isRegistered, setIsRegistered] = useState(true);
  const [toReset, setToReset] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  if (isLoggedIn === undefined) {
    return (
      <div className="text-5xl text-green-500 flex justify-center items-center mt-56">
        Directing...
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <>
        <NavIcon />
        <div className="w-screen pt-20 flex flex-col justify-center items-center md:items-start md:flex-row">
          <Form />
          <Table />
        </div>
      </>
    );
  } else {
    if (!isRegistered) {
      return (
        <Register
          setRegistered={() => {
            setIsRegistered(true);
            setToReset(false);
          }}
        />
      );
    } else if (isRegistered && toReset) {
      return (
        <Reset
          setNotToReset={() => {
            setToReset(false);
            setIsRegistered(true);
          }}
        />
      );
    } else if (isRegistered && !toReset) {
      return (
        <Login
          setNotRegistered={() => {
            setIsRegistered(false);
            setToReset(false);
          }}
          setToReset={() => setToReset(true)}
        />
      );
    }
  }
}

export default Main;
