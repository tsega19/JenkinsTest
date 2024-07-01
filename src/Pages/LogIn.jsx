/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import kispay from "../assets/image/logo.png";
import { FaRegEye } from "react-icons/fa";
import { RxEyeClosed } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validator";
import { loginAPI } from "@/Service/Auth/login";
import useAuth from "@/Hooks/useAuth";
import { AppModal, triggerModal } from "@/Components/UseModal";
export const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const redirectUrl = location.state?.redirectUrl || "/";
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const navigate = useNavigate();
    const { loginAuth } = useAuth();
    const modal = async (title, content) => {
        setModalTitle(title);
        setModalContent(content);
        return await triggerModal();
    };
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({ resolver: zodResolver(loginSchema) });
    const onSubmit = async (data) => {
        try {
            const response = await loginAPI(data.email, data.password);
            console.log("response", response);
            if (response.status === 200) {
                const jsonData = await response.json();
                console.log("jsonData", jsonData.body.token, jsonData.body.user);
                loginAuth(jsonData.body.user, jsonData.body.token);
                navigate(redirectUrl);
            }
            else {
                const jsonData = await response.json();
                console.log("Error", jsonData.message);
                modal("Oops", jsonData.message);
            }
        }
        catch (error) {
            console.log(error);
            modal("Oops", "something went wrong please try again");
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (<>
      <section className="h-screen w-full flex justify-center items-center">
        <div className="absolute text-[#784724] font-bold  left-0 top-0 p-10 z-50 ">
          <h1 className="text-3xl font-medium cursor-pointer" onClick={() => navigate("/")}>
            Kispay
          </h1>
        </div>
        <div className="custom-shape-divider-top-1714647113">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
          </svg>
        </div>
        <div className="shadow-xl bg-white lg:w-[30%] md:w-2/3 px-5 py-[5rem] rounded-lg z-10 ">
          <div>
            <img className="mx-auto h-10 w-auto" src={kispay} alt="Your Company"/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-secondary">
              Sign in to Your Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-neutral-800">
                  Email address
                </label>
                <div className="mt-2">
                  <input {...register("email")} id="email" name="email" type="email" autoComplete="email" placeholder="Enter your email" className="px-2 block w-full rounded-md border-0 py-2  text-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none  sm:text-sm sm:leading-6"/>
                </div>
                {errors.email && (<div className="text-red-500">{errors.email.message}</div>)}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-neutral-800">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-secondary hover:text-secondary/75">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <input {...register("password")} id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" className={`px-2 block w-full rounded-md border-0 ${errors.password ? "ring-red-500" : "ring-gray-300"} px-2 py-2 text-secondary shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6`}/>
                  <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
                    {showPassword ? <FaRegEye /> : <RxEyeClosed />}
                  </button>
                </div>
                {errors.password && (<div className="text-red-500">{errors.password.message}</div>)}
              </div>

              <div>
                {" "}
                <button type="submit" className="w-full py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary/60 focus:outline-none">
                  {isSubmitting ? "Loging in ..." : "Login"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an Account ?
              <a href="#" className="font-semibold leading-6 text-neutral-800 hover:text-secondary p-10 hover:underline" onClick={() => navigate("/signup")}>
                Create Account
              </a>
            </p>
          </div>
        </div>
      </section>
      <AppModal title={modalTitle} content={modalContent} onClose={() => { }}/>
    </>);
};
//# sourceMappingURL=LogIn.jsx.map