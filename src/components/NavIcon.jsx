import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useRef, useEffect } from "react";
import { auth } from "../firebase-config";

function Navbar() {
  const wrapper = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(auth.currentUser.displayName);
  const [userEmail, setUserEmail] = useState(auth.currentUser.email);
  const [userPhoto, setUserPhoto] = useState(auth.currentUser.photoURL);

  useEffect(() => {
    if (auth.currentUser) {
      let interval = setInterval(() => {
        if (
          auth.currentUser.displayName &&
          auth.currentUser.email &&
          auth.currentUser.photoURL
        ) {
          clearInterval(interval);
          setUserName(auth.currentUser.displayName);
          setUserEmail(auth.currentUser.email);
          setUserPhoto(auth.currentUser.photoURL);
        }
      }, 100);
    }
  }, [userName, userEmail, userPhoto]);

  const logOut = (e) => {
    e.preventDefault();
    signOut(auth);
  };

  const clickOutside = (e) => {
    if (wrapper.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="absolute" id="navbar" ref={wrapper}>
      {/* <!-- Dropdown menu --> */}
      <div className="flex justify-end items-center md:order-2 mt-6 ml-[calc(100vw-72px)]">
        <img
          className="md:w-[48px] md:h-[48px] md:min-w-[48px] md:min-h-[48px] h-12 w-12 rounded-full md:mr-0 hover:ring-4 hover:ring-gray-300 dark:hover:ring-gray-600 object-cover object-center cursor-pointer"
          src={
            userPhoto ||
            "https://qph.cf2.quoracdn.net/main-qimg-f86719b5cbde69c03e6d06d58b99708e.webp"
          }
          alt="user"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div
            className="absolute min-w-[150px] z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="bottom"
            // ref={wrapper}
            style={{
              // position: "absolut",
              inset: "0px auto auto 0px",
              marginLeft: "calc(100vw - 180px)",
              marginTop: "80px",
              // transform: "translate3d(644.8px, 74.4px, 0px)",
            }}
          >
            <div className="py-3 px-4">
              <span className="block text-sm text-gray-900 dark:text-white">
                {userName}
              </span>
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {userEmail}
              </span>
            </div>
            <ul className="py-1" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#!"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={logOut}
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
