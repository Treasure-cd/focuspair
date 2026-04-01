"use client"
import TextInput from "./ui/TextInput"
import Button from "./ui/Button"
import { useState, useEffect } from "react"
import { SignInIcon } from "@phosphor-icons/react"
import Loader from "./ui/Loader"
import { useToast } from "@/context/ToastProvider"
import { useRouter } from "next/navigation"
import { login } from "../app/actions/auth"


const LoginForm = () => {

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [isIdentifierValid, setIsIdentifierValid] = useState(false);
    const [identifierError, setIdentifierError] = useState<string | null>("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [passwordError, setPasswordError] = useState<string | null>("");
    const [isIdentiierTouched, setIsIdentifierTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();
    const router = useRouter();


    const validateIdentifier = (identifier: string): string | null => {
      const regex = /^[A-Za-z0-9._%+-@]{3,}$/;
      
      if (identifier.trim().length < 3 && !regex.test(identifier)) {
          return "Email or username must be 3 characters or longer"
      }

      return null;

    }

    const validatePassword = (password: string): string | null => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
      if (!regex.test(password)) {
        if (password.trim().length < 8) return "Password must be more than 8 characters";
        if (!/\d/.test(password)) return "Password must contain at least one digit";
        
      }
      return null;
    }

    useEffect(() => {
      const identifierValid = validateIdentifier(identifier);
      const passwordValid = validatePassword(password);

      setIdentifierError(identifierValid);
      setPasswordError(passwordValid);

      setIsIdentifierValid(identifierValid === null);
      setIsPasswordValid(passwordValid === null);
    }, [identifier, password])


    const handleSubmit = async() => {
      try {
        setIsLoading(true);
        await login(identifier, password);
        console.log("SET FALSE")
        setIsLoading(false);
        console.log("Router.push home")
        router.push("/home")

        
      } catch (err: any) {
        showToast(err.message, "bad");
      } finally {
        setIsLoading(false);
      }
      }


  return (
    <>
         <div className="flex flex-col p-1 mb-2">
          <label className="mb-1">Your Email or Username</label>
          <TextInput
            type="email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter your email or username"
            isValid={isIdentifierValid}
            errorText={isIdentiierTouched? identifierError: null}
            onBlur={() => setIsIdentifierTouched(true)}
            

          />  
        </div>
        <div className="flex flex-col p-1">
          <label className="mb-1">Your Password</label>
          <TextInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            showPasswordToggle
            isValid={isPasswordValid}
            errorText={isPasswordTouched? passwordError: null}
            onBlur={() => setIsPasswordTouched(true)}
           />  
        </div>
        <div className="flex flex-col p-1 my-2.5 items-center">  
        <Button
            type="form-button"
            disabled={!isPasswordValid || !isIdentifierValid || isLoading}
            onClick={handleSubmit}
         >
          {isLoading?
            (<Loader />) :  <>Sign Up <SignInIcon /></> 
          }
         </Button>
         </div>



    </>
  )
}

export default LoginForm