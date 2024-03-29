import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import useAuthStatus from "../hooks/useAuthStatus";
import Spinner from "../components/Spinner";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        navigate("/create");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  } else if (loggedIn) {
    return <Navigate to="/create" />;
  }

  return (
    <div className="w-screen h-screen flex justify-center pt-10">
      <form
        onSubmit={onSubmit}
        className="whitespace-nowrap w-full md:w-[60%] max-h-[70%] bg-red-700 flex flex-col items-center gap-5 py-10 px-3  mx-5 md:mx-10 rounded-md outline-none-none"
      >
        <h1 className="text-2xl font-semibold font-sans text-zinc-100">
          Admin Login
        </h1>

        <input
          className="w-full md:w-[80%] rounded bg-zinc-100 focus:bg-opacity-75 border-none px-2 py-4  focus:outline-red-950 text-sm md:text-lg"
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={onChange}
        />

        <div className="w-full md:w-[80%] relative">
          <input
            className="w-full h-full rounded bg-zinc-100 focus:bg-opacity-75 border-none px-2 py-4  focus:outline-red-950 text-sm md:text-lg"
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            placeholder="Senha"
            onChange={onChange}
          />
          {showPassword ? (
            <AiFillEyeInvisible
              className="absolute right-2 top-[32%] text-xl cursor-pointer"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          ) : (
            <AiFillEye
              className="absolute right-2 top-[32%] text-xl cursor-pointer"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          )}
        </div>

        <button className="text-zinc-100 font-medium font-sans mb-16 w-full md:w-[80%] bg-red-900 h-52 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}
