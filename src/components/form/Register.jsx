import Input from "./Input";
import Button from "./Button";
import { BsPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import { auth } from "../../firebase-config";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Register({ setRegistered }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const register = async (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      )
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: userInfo.username,
          }).catch((error) => {
            toast.error(error.message);
          });
          toast.success("User created successfully");
          // ...
        })
        .catch((error) => {
          //   const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          // ..
        });
    }
  };

  return (
    <div className="md:mr-4 mb-8 w-[90vw] md:max-w-xs">
      <h1 className="w-full text-center text-2xl bg-slate-400 rounded-xl shadow-2xl mb-4">
        REGISTER
      </h1>

      <form
        className="bg-slate-400 shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4"
        onSubmit={register}
      >
        <div className="flex bg-white px-2 py-2 rounded-lg my-2 focus-within:bg-orange-100 focus-within:ring-4">
          <BsPersonFill className="text-slate-400 text-2xl group-focus:text-black" />
          <Input
            type="text"
            name="first"
            value={userInfo.username}
            onChange={(e) => {
              setUserInfo({ ...userInfo, username: e.target.value });
            }}
            placeholder="Name"
            required={true}
            className="outline-none w-full pl-2 focus:bg-orange-100"
          />
        </div>

        <div className="flex bg-white px-2 py-2 rounded-lg my-2 focus-within:bg-orange-100 focus-within:ring-4">
          <MdEmail className="text-slate-400 text-2xl group-focus:text-black" />
          <Input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={(e) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
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
            onChange={(e) => {
              setUserInfo({ ...userInfo, password: e.target.value });
            }}
            placeholder="Password"
            required={true}
            className="outline-none w-full pl-2 focus:bg-orange-100"
          />
        </div>

        <div className="flex bg-white px-2 py-2 rounded-lg my-2 focus-within:bg-orange-100 focus-within:ring-4">
          <RiLockPasswordFill className="text-slate-400 text-2xl group-focus:text-black" />
          <Input
            type="password"
            name="password"
            value={userInfo.confirmPassword}
            onChange={(e) => {
              setUserInfo({ ...userInfo, confirmPassword: e.target.value });
            }}
            placeholder="Confirm Password"
            required={true}
            className="outline-none w-full pl-2 focus:bg-orange-100"
          />
        </div>

        <Button
          className="w-full bg-blue-500 text-white py-1 rounded-lg"
          children={"REGISTER"}
          type="submit"
        />

        <div className="flex justify-center my-4">
          <span className="text-white text-sm">Alread have an account?</span>
          <p
            className="text-blue-600 text-sm hover:underline hover:text-blue-700 cursor-pointer"
            onClick={() => setRegistered(true)}
          >
            Login
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
