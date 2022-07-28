import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Main from "./components/Main";
import { auth } from "./firebase-config";
// import NavIcon from "./components/NavIcon";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <>
      <Toaster />
      {/* <NavIcon /> */}
      <div
        className={
          isLoggedIn
            ? ""
            : "w-screen pt-20 flex flex-col justify-center items-center md:items-start md:flex-row"
        }
      >
        <Main />
      </div>
    </>
  );
}

export default App;
