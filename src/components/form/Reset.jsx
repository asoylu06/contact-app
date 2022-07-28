import Input from "./Input";
import Button from "./Button";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config";
import toast from "react-hot-toast";

function Reset({ setNotToReset }) {
  const [email, setEmail] = useState("");

  const notifyD = (text) =>
    toast.error(text, {
      duration: 4000,
      position: "top-right",
    });

  const notifyS = (text) =>
    toast.success(text, {
      duration: 4000,
      position: "top-right",
    });

  const reset = async (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        notifyS(
          "Password reset email sent! Don't forget to check your spam folder."
        );
        setEmail("");
        // ..
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        notifyD(errorMessage);
        // ..
      });
  };

  return (
    <div className="md:mr-4 mb-8 w-[90vw] md:max-w-xs">
      <h1 className="w-full text-center text-2xl bg-slate-400 rounded-xl shadow-2xl mb-4">
        RESET YOUR PASSWORD
      </h1>

      <form
        className="bg-slate-400 shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4"
        onSubmit={reset}
      >
        <div className="flex bg-white px-2 py-2 rounded-lg my-2 focus-within:bg-orange-100 focus-within:ring-4">
          <MdEmail className="text-slate-400 text-2xl group-focus:text-black" />
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required={true}
            className="outline-none w-full pl-2 focus:bg-orange-100"
          />
        </div>
        <div className="flex w-full text-blue-500 font-bold bg-green-300 py-1 rounded-lg justify-center mt-4 cursor-pointer">
          <Button className="" children={"RESET PASSWORD"} />
        </div>
        <div className="flex justify-start my-4">
          <span className="text-white text-sm">Back to the page </span>
          <p
            className="text-blue-600 text-sm hover:underline hover:text-blue-700 cursor-pointer"
            onClick={() => setNotToReset(false)}
          >
            Sign In
          </p>
        </div>
      </form>
    </div>
  );
}

export default Reset;
