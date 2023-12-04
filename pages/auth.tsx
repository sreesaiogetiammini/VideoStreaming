import { isValidElement, useCallback, useState } from "react";
import Input from "@/components/input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";


const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [name, setName] = useState("");
  const [loginSwitch, setloginSwitch] = useState("login");
  const toggleLoginSwitch = useCallback(() => {
    setloginSwitch((currentToggle) =>
      currentToggle === "login" ? "register" : "login"
    );
  }, []);

  const [credentialsErrorMessage,setCredentialsErrorMessage] = useState("")

  const login = useCallback(async () => {
    try {
    
        const loginResponse =   await signIn("credentials", {
        email,
        password,
        redirect:false,
        
      });
      
      if(loginResponse?.error){
        console.log(loginResponse.error)
        setCredentialsErrorMessage(loginResponse.error);
      }
      else{
        window.location.href = '/userprofiles';
      }


    } 
    
    catch (error) {
        console.error("Sign-in error:", error);
      
    }
  }, [email, password]);

  const guestLogin = useCallback(async () => {
    try {
    
      const guestEmail = "guest@gmail.com";
      const guestPassword = "123456";
      const loginResponse =   await signIn("credentials", {
        email:guestEmail,
        password:guestPassword,
        redirect:false,
        
      });
      
      if(loginResponse?.error){
        console.log(loginResponse.error)
        setCredentialsErrorMessage(loginResponse.error);
      }
      else{
        window.location.href = '/userprofiles';
      }


    } 
    
    catch (error) {
        console.error("Sign-in error:", error);
      
    }
  }, []);


  const register = useCallback(async () => {
    let registerResponse;
    try {
      registerResponse = await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      setCredentialsErrorMessage("There is an issue in Register Please try again");
      //console.log("Resister Response Error  ", error.response?.data.error);
    }
  }, [email, name, password, login]);


  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

  const validateEmail = (input: any) => {
    // Regular expression for a simple email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(input);
  };

  const handleEmailChange = (e: any) => {
    setCredentialsErrorMessage("")
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handlePasswordChange = (e: any) => {
    setCredentialsErrorMessage("")
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValidPassword(newPassword.length >= 6);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setCredentialsErrorMessage("")
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
    setIsValidConfirmPassword(newPassword.length >= 6 && password === newPassword);
  };

  return (
    <div className="relative h-full w-full bg-[url('/images/auth_screen_bg_image.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-15 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12"></img>
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-50 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {loginSwitch === "login" ? "Login" : "Sign Up"}
            </h2>
            <div className="flex flex-col gap-5">
              {loginSwitch === "register" && (
                <Input
                  id="firstname"
                  type="text"
                  label="Name*"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}

              <Input
                id="email"
                type="email"
                label="Email address"
                value={email}
                onChange={handleEmailChange}
              />
              {!isValidEmail && (
                <div style={{ color: "red" }}>
                  Please enter a valid email address.
                </div>
              )}
              <Input
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {!isValidPassword && (
                <div style={{ color: "red" }}>
                  Password length must be atleast 6 characters.
                </div>
              )}

              {loginSwitch === "register" && (
                <Input
                  type="password"
                  id="confirmpassword"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              )}
               {!isValidConfirmPassword && (
                <div style={{ color: "red" }}>
                  Password Do Not Match.
                </div>
              )}
            </div>
            <button
              onClick={
                loginSwitch === "login" ? login : register
            }
              className="bg-slate-700 py-3 text-white rounded-md w-full mt-10 hover:bg-slate-950 transition"
            >
              {loginSwitch === "login" ? "Login" : "Sign up"}
            </button>
            <div style={{ color: "red" }}>
             {credentialsErrorMessage && <div>{credentialsErrorMessage}</div>}
                </div>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() =>
                  signIn("google", { callbackUrl: "/userprofiles" })
                }
                className="
                            w-10
                            h-10
                            bg-white
                            rounded-full
                            items-center
                            justify-center
                            cursor-pointer
                            hover:opacity-80
                            transition
                            "
              >
                <FcGoogle size={40} />
              </div>
            {/* <div 
                          onClick={()=> signIn('facebook', { callbackUrl:'/userprofiles'})}
                          className="
                          w-10
                          h-10
                          bg-white
                          rounded-full
                          items-center
                          justify-center
                          cursor-pointer
                          hover:opacity-80
                          transition
                          "   >
                          <FaFacebook size= {40}/>    
                        </div>  */}
            </div>

            <p className="text-white mt-12">
              {" "}
              {loginSwitch === "login"
                ? "First Time User ?"
                : "Already Have a Account ?"}
              <span
                onClick={toggleLoginSwitch}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {loginSwitch === "login"
                  ? "Create the Account"
                  : "Login with Existing Account"}
              </span>
            </p>
            <p  className="text-white px-16 py-5 hover:underline cursor-pointer"
            onClick={guestLogin}
            >
              Continue as Guest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
