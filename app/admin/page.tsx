'use client'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

type Props = {}

export default function Admin({}: Props) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e: any) => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);

      if(userCredentials.user) {
        console.log(userCredentials);
        router.push("/");
      }
    } catch(err) {
      console.log(err);
    }
  } 

  return (
    <div className="w-screen h-screen flex justify-center pt-10">
      <form onSubmit={onSubmit} className="whitespace-nowrap w-full md:w-[60%] max-h-[70%] bg-cyan-700 flex flex-col items-center gap-5 py-10 px-3  mx-5 md:mx-10 rounded-md outline-none-none">
        <h1 className="text-2xl font-semibold font-sans text-zinc-100">Admin Login</h1>

        <input 
          className="w-full md:w-[80%] rounded bg-zinc-100 focus:bg-opacity-75 border-none  focus:outline-cyan-950 text-sm md:text-lg"
          type="email" 
          name="email" 
          id="email" 
          placeholder="Email" 
          onChange={onChange}
        />

        <div className="w-full md:w-[80%] h-full relative">
              <input
                className="w-full rounded bg-zinc-100 focus:bg-opacity-75 border-none  focus:outline-cyan-950 text-sm md:text-lg"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Senha"
                onChange={onChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible className="absolute right-2 top-2 md:top-3 text-xl cursor-pointer" onClick={() => setShowPassword(prevState => !prevState)} />
              ) : (
                <AiFillEye className="absolute right-2 top-2 md:top-3 text-xl cursor-pointer" onClick={() => setShowPassword(prevState => !prevState)} />
              )}
            </div>

            <button     className="text-zinc-100 font-medium font-sans mb-16 w-full md:w-[80%] bg-cyan-900 h-52 rounded">Entrar</button>
      </form>

      
    </div>
  )
}