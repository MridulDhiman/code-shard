"use client";

import { useState } from "react";
import {signIn} from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Input from "./ui/Input";
import Button from "./ui/Button";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const router= useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

      if(!email || !password) {
        setError("Fill all details");
        return;
      }

      try {
        
        await signIn("credentials", {
          email,
          password,
          callbackUrl: `http://localhost:3000/your-work`
          });

          // router.push("/your-work");

      } catch (error) {
        
        setError("Invalid Credentials!");
        // throw error;
      }





         
    }

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-[80vh]">
        <form 
         className="flex flex-col gap-3 w-[30%]" 
        onSubmit={handleSubmit}>
            <Input type="text"  
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder="email"/>
            <Input 
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="password"/>
            <Button>Login</Button>
        </form>
        {success && <p className="text-green-700 decoration-dashed">✅{success}</p>}
        {error && <p className="text-red-700 decoration-wavy">⚠{error}</p>}
        <p>New User? <u><Link href="/register">Register</Link></u></p>
    </div>
  )
}

export default Login;