import Input from "./Input";
import Button from "./Button";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth, db } from "../../firebase-config";
import toast from "react-hot-toast";
import { serverTimestamp, setDoc } from "firebase/firestore";

function Login({ setToReset, setNotRegistered }) {
  const [remember, setRemember] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  remember
    ? setPersistence(auth, browserLocalPersistence)
    : setPersistence(auth, browserSessionPersistence);

  function loginWithEmailAndPassword(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("User logged in successfully");
        // ...
      })
      .catch((error) => {
        //   const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  }

  let provider = new GoogleAuthProvider();

  function loginWithGoogle(e) {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("User logged in successfully");
        // ...
      })
      .catch((error) => {
        //   const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  }

  return (
    <div className="md:mr-4 mb-8 w-[90vw] md:max-w-xs">
      <h1 className="w-full text-center text-2xl bg-slate-400 rounded-xl shadow-2xl mb-4">
        SIGN IN
      </h1>

      <form
        className="bg-slate-400 shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4"
        onSubmit={loginWithEmailAndPassword}
      >
        <div className="flex bg-white px-2 py-2 rounded-lg my-2 focus-within:bg-orange-100 focus-within:ring-4">
          <MdEmail className="text-slate-400 text-2xl group-focus:text-black" />
          <Input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            placeholder="Email"
            required={true}
            className="outline-none w-full pl-2 focus:bg-orange-100"
          />
        </div>
        <div className="flex bg-white px-2 py-2 rounded-lg my-2 focus-within:bg-orange-100 focus-within:ring-4">
          <RiLockPasswordFill className="text-slate-400 text-2xl group-focus:text-black" />
          <Input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            placeholder="Password"
            required={true}
            className="outline-none w-full pl-2 focus:bg-orange-100"
          />
        </div>
        <Button
          className="w-full bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-700 mb-4"
          children={"Sign In"}
          type="submit"
        />
        <p className="text-center">------------ OR -------------</p>

        <div
          className="flex w-full text-blue-500 font-bold bg-green-300 py-1 rounded-lg justify-center mt-4 cursor-pointer"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="w-6 h-6 mr-2" />
          <Button className="" children={"Sign In With Google"} />
        </div>
        <div className="flex justify-between items-center flex-col md:flex-row mt-4">
          <div className="form-group form-check">
            <Input
              type="checkbox"
              className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              id="exampleCheck2"
              required={false}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label
              className="form-check-label inline-block"
              htmlFor="exampleCheck2"
            >
              Remember me
            </label>
          </div>
        </div>
        <div className="flex justify-start my-4">
          <span className="text-white text-sm">Don't you have an account?</span>
          <p
            className="text-blue-600 text-sm hover:underline hover:text-blue-700 cursor-pointer"
            onClick={() => setNotRegistered(true)}
          >
            Register
          </p>
        </div>
        <div className="flex justify-start my-4">
          <span className="text-white text-sm">Forgot your passwor?</span>
          <p
            className="text-blue-600 text-sm hover:underline hover:text-blue-700 cursor-pointer"
            onClick={() => setToReset(true)}
          >
            Reset
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
